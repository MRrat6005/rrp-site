"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";

import { siteConfig, type Locale } from "@/config/site.config";
import {
  DashboardApiError,
  createDashboardPendingProgress,
  createDashboardTimeoutProgress,
  fetchDashboardProgressStatus,
  fetchDashboardServerPageLoad,
  fetchDashboardServers,
  isDashboardProgressSuccess,
  isDashboardUnauthorizedError,
  shouldUseDashboardFallback,
  type DashboardServerRoutePage
} from "@/lib/dashboard-api";
import { getDashboardServer, type DashboardProgressJob, type DashboardServer } from "@/lib/dashboard-model";
import { getLocalizedPath } from "@/lib/i18n";
import { DashboardAccessPage } from "@/ui/dashboard/dashboard-access-page";
import { DashboardBrandingPage } from "@/ui/dashboard/dashboard-branding-page";
import { getDashboardCopy } from "@/ui/dashboard/dashboard-copy";
import { DashboardGeneralPage } from "@/ui/dashboard/dashboard-general-page";
import { DashboardLicensesPage } from "@/ui/dashboard/dashboard-licenses-page";
import { DashboardLocalizationPage } from "@/ui/dashboard/dashboard-localization-page";
import { DashboardOverviewPage } from "@/ui/dashboard/dashboard-overview-page";
import { DashboardServerEntryGate } from "@/ui/dashboard/dashboard-progress";
import { DashboardLockGlyph, DashboardMessagePanel, DashboardPanel } from "@/ui/dashboard/dashboard-primitives";
import { resolveDashboardServerRoutePage } from "@/ui/dashboard/dashboard-routing";
import { DashboardServerShell } from "@/ui/dashboard/dashboard-server-shell";
import { DashboardServersPage } from "@/ui/dashboard/dashboard-servers-page";
import { DashboardStatusPage } from "@/ui/dashboard/dashboard-status-page";

interface DashboardResourceState<T> {
  data: T | null;
  error: DashboardApiError | null;
  isLoading: boolean;
  isFallback: boolean;
}

interface DashboardServerPageState {
  data: DashboardServer | null;
  entryProgress: DashboardProgressJob | null;
  error: DashboardApiError | null;
  isLoading: boolean;
}

const ENTRY_TIMEOUT_MS = 90000;

function useDashboardResource<T>(enabled: boolean, fallbackData: T | null, load: (signal?: AbortSignal) => Promise<T>) {
  const [state, setState] = useState<DashboardResourceState<T>>({ data: null, error: null, isLoading: enabled, isFallback: false });

  useEffect(() => {
    if (!enabled) {
      setState({ data: null, error: null, isLoading: false, isFallback: false });
      return;
    }

    const controller = new AbortController();
    setState({ data: null, error: null, isLoading: true, isFallback: false });

    load(controller.signal)
      .then((data) => setState({ data, error: null, isLoading: false, isFallback: false }))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        const apiError = error instanceof DashboardApiError ? error : new DashboardApiError("contract", "Dashboard API returned an invalid resource payload.");
        const isFallback = fallbackData !== null && shouldUseDashboardFallback(apiError);
        setState({ data: isFallback ? fallbackData : null, error: apiError, isLoading: false, isFallback });
      });

    return () => controller.abort();
  }, [enabled, fallbackData, load]);

  return state;
}

function useDashboardServerPageState(enabled: boolean, page: DashboardServerRoutePage, serverId: string, retryKey: number) {
  const [state, setState] = useState<DashboardServerPageState>({
    data: null,
    entryProgress: enabled ? createDashboardPendingProgress("entry") : null,
    error: null,
    isLoading: enabled
  });

  useEffect(() => {
    if (!enabled || !serverId) {
      setState({ data: null, entryProgress: null, error: null, isLoading: false });
      return;
    }

    const controller = new AbortController();
    let cancelled = false;
    let pollTimeout: ReturnType<typeof setTimeout> | null = null;
    const startedAt = Date.now();

    const clearPoll = () => {
      if (!pollTimeout) return;
      clearTimeout(pollTimeout);
      pollTimeout = null;
    };

    const schedulePoll = (progress: DashboardProgressJob, server: DashboardServer | null) => {
      const timeoutReached = Date.now() - startedAt >= ENTRY_TIMEOUT_MS;
      if (timeoutReached) {
        setState({ data: server, entryProgress: createDashboardTimeoutProgress("entry", progress), error: null, isLoading: false });
        return;
      }
      pollTimeout = setTimeout(run, progress.pollIntervalMs ?? 1200, progress, server);
    };

    const run = async (progressOverride?: DashboardProgressJob | null, serverOverride?: DashboardServer | null) => {
      try {
        if (!progressOverride?.pollPath) {
          const result = await fetchDashboardServerPageLoad(serverId, page, controller.signal);
          if (cancelled) return;
          if (result.entryProgress && !isDashboardProgressSuccess(result.entryProgress)) {
            setState({ data: result.server, entryProgress: result.entryProgress, error: null, isLoading: false });
            schedulePoll(result.entryProgress, result.server);
            return;
          }
          setState({ data: result.server, entryProgress: null, error: null, isLoading: false });
          return;
        }

        const progress = await fetchDashboardProgressStatus(progressOverride.pollPath, "entry", controller.signal);
        if (cancelled) return;
        if (!progress) {
          const result = await fetchDashboardServerPageLoad(serverId, page, controller.signal);
          if (cancelled) return;
          if (result.entryProgress && !isDashboardProgressSuccess(result.entryProgress)) {
            setState({ data: result.server ?? serverOverride ?? null, entryProgress: result.entryProgress, error: null, isLoading: false });
            schedulePoll(result.entryProgress, result.server ?? serverOverride ?? null);
            return;
          }
          setState({ data: result.server ?? serverOverride ?? null, entryProgress: null, error: null, isLoading: false });
          return;
        }

        if (isDashboardProgressSuccess(progress)) {
          const result = await fetchDashboardServerPageLoad(serverId, page, controller.signal);
          if (cancelled) return;
          setState({ data: result.server ?? serverOverride ?? null, entryProgress: null, error: null, isLoading: false });
          return;
        }

        setState({ data: serverOverride ?? null, entryProgress: progress, error: null, isLoading: false });
        schedulePoll(progress, serverOverride ?? null);
      } catch (error) {
        if (cancelled) return;
        if (error instanceof DOMException && error.name === "AbortError") return;
        const apiError = error instanceof DashboardApiError ? error : new DashboardApiError("contract", "Dashboard API returned an invalid resource payload.");
        setState((current) => ({ ...current, error: apiError, isLoading: false }));
      }
    };

    setState({ data: null, entryProgress: createDashboardPendingProgress("entry"), error: null, isLoading: true });
    void run();

    return () => {
      cancelled = true;
      clearPoll();
      controller.abort();
    };
  }, [enabled, page, retryKey, serverId]);

  return state;
}

function DashboardRouteNotice({ locale, error, isFallback, isLoading }: { locale: Locale; error: DashboardApiError | null; isFallback: boolean; isLoading: boolean }) {
  const copy = getDashboardCopy(locale);
  let message: string | null = null;
  if (isLoading) message = copy.runtime.loading;
  else if (error && isFallback) message = copy.runtime.fallback;
  else if (error) message = copy.runtime.unavailableBody;
  if (!message) return null;
  return <DashboardPanel className="px-4 py-3 sm:px-5"><p className="text-sm leading-6 text-white/54">{message}</p></DashboardPanel>;
}

function renderDashboardServerPage(page: DashboardServerRoutePage, locale: Locale, server: DashboardServer, onServerChange: (nextServer: DashboardServer) => void): ReactNode {
  if (server.accessLevel === "none") {
    const copy = getDashboardCopy(locale);
    return <DashboardPanel className="p-6 sm:p-8"><div className="space-y-4"><DashboardLockGlyph className="h-10 w-10" /><div className="space-y-2"><h2 className="text-lg font-semibold text-white">{copy.runtime.lockedTitle}</h2><p className="max-w-2xl text-sm leading-6 text-white/56">{copy.runtime.lockedBody}</p></div></div></DashboardPanel>;
  }

  switch (page) {
    case "overview": return <DashboardOverviewPage locale={locale} server={server} />;
    case "general": return <DashboardGeneralPage locale={locale} server={server} onServerChange={onServerChange} />;
    case "access": return <DashboardAccessPage locale={locale} server={server} onServerChange={onServerChange} />;
    case "localization": return <DashboardLocalizationPage locale={locale} server={server} onServerChange={onServerChange} />;
    case "branding": return <DashboardBrandingPage locale={locale} server={server} />;
    case "license": return <DashboardLicensesPage locale={locale} server={server} />;
    case "status": return <DashboardStatusPage locale={locale} server={server} />;
    default: return null;
  }
}

interface DashboardServersRouteProps {
  fallbackServers: DashboardServer[];
  locale: Locale;
}

function getDashboardLoginPath(locale: Locale): string {
  return getLocalizedPath(locale, siteConfig.ctaRoutes.dashboard);
}

export function DashboardServersRoute({ fallbackServers, locale }: DashboardServersRouteProps) {
  const copy = getDashboardCopy(locale);
  const router = useRouter();
  const load = useCallback((signal?: AbortSignal) => fetchDashboardServers(signal), []);
  const state = useDashboardResource(true, fallbackServers, load);

  useEffect(() => {
    if (!state.isLoading && isDashboardUnauthorizedError(state.error)) router.replace(getDashboardLoginPath(locale));
  }, [locale, router, state.error, state.isLoading]);

  const servers = state.data ?? [];
  const emptyState = state.error && servers.length === 0 ? { title: copy.runtime.unavailableTitle, body: copy.runtime.unavailableBody } : undefined;

  return <DashboardServersPage locale={locale} servers={servers} isFallback={state.isFallback} notice={<DashboardRouteNotice locale={locale} error={state.error} isFallback={state.isFallback} isLoading={state.isLoading} />} emptyState={emptyState} />;
}

export function DashboardAppRoute({ locale }: { locale: Locale }) {
  const copy = getDashboardCopy(locale);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawSearch = searchParams.toString();
  const rawServerId = searchParams.get("server");
  const serverId = rawServerId?.trim() ?? "";
  const page = resolveDashboardServerRoutePage(searchParams.get("section"));
  const fallbackServer = serverId ? getDashboardServer(serverId, locale) : null;
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const nextSearchParams = new URLSearchParams(rawSearch);
    let changed = false;
    if (serverId) {
      if (nextSearchParams.get("server") !== serverId) { nextSearchParams.set("server", serverId); changed = true; }
      if (nextSearchParams.get("section") !== page) { nextSearchParams.set("section", page); changed = true; }
    } else {
      if (nextSearchParams.has("server")) { nextSearchParams.delete("server"); changed = true; }
      if (nextSearchParams.has("section")) { nextSearchParams.delete("section"); changed = true; }
    }
    if (!changed) return;
    const nextSearch = nextSearchParams.toString();
    router.replace(nextSearch ? `${pathname}?${nextSearch}` : pathname, { scroll: false });
  }, [page, pathname, rawSearch, router, serverId]);

  const state = useDashboardServerPageState(Boolean(serverId), page, serverId, retryKey);

  useEffect(() => {
    if (!state.isLoading && isDashboardUnauthorizedError(state.error)) router.replace(getDashboardLoginPath(locale));
  }, [locale, router, state.error, state.isLoading]);

  const [serverOverride, setServerOverride] = useState<DashboardServer | null>(null);

  useEffect(() => {
    setServerOverride(null);
  }, [page, serverId, state.data]);

  const server = serverOverride ?? state.data ?? fallbackServer;
  const entryProgress = state.entryProgress ?? (serverId && state.isLoading ? createDashboardPendingProgress("entry") : null);

  if (serverId && entryProgress) {
    return <DashboardServerEntryGate locale={locale} progress={entryProgress} server={server} onRetry={() => setRetryKey((current) => current + 1)} />;
  }

  return (
    <DashboardServerShell activePage={serverId ? page : "servers"} isFallback={false} locale={locale} server={server ?? undefined} serverId={serverId || undefined}>
      {serverId ? <DashboardRouteNotice locale={locale} error={state.error} isFallback={false} isLoading={false} /> : null}
      {!serverId ? <DashboardMessagePanel title={copy.runtime.selectServerTitle} body={copy.runtime.selectServerBody} /> : server ? renderDashboardServerPage(page, locale, server, setServerOverride) : state.isLoading ? <DashboardMessagePanel title={copy.runtime.loadingTitle} body={copy.runtime.loading} /> : <DashboardMessagePanel title={copy.runtime.unavailableTitle} body={copy.runtime.unavailableBody} />}
    </DashboardServerShell>
  );
}

