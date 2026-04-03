"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";

import { siteConfig, type Locale } from "@/config/site.config";
import {
  DashboardApiError,
  fetchDashboardServerPage,
  fetchDashboardServers,
  isDashboardUnauthorizedError,
  shouldUseDashboardFallback,
  type DashboardServerRoutePage
} from "@/lib/dashboard-api";
import {
  getDashboardServer,
  type DashboardServer
} from "@/lib/dashboard-mock";
import { getLocalizedPath } from "@/lib/i18n";
import { DashboardBrandingPage } from "@/ui/dashboard/dashboard-branding-page";
import { getDashboardCopy } from "@/ui/dashboard/dashboard-copy";
import { DashboardLicensesPage } from "@/ui/dashboard/dashboard-licenses-page";
import { DashboardModulesPage } from "@/ui/dashboard/dashboard-modules-page";
import { DashboardOverviewPage } from "@/ui/dashboard/dashboard-overview-page";
import {
  DashboardMessagePanel,
  DashboardPanel
} from "@/ui/dashboard/dashboard-primitives";
import { resolveDashboardServerRoutePage } from "@/ui/dashboard/dashboard-routing";
import { DashboardServerShell } from "@/ui/dashboard/dashboard-server-shell";
import { DashboardServersPage } from "@/ui/dashboard/dashboard-servers-page";
import { DashboardSettingsPage } from "@/ui/dashboard/dashboard-settings-page";
import { DashboardStatusPage } from "@/ui/dashboard/dashboard-status-page";

interface DashboardResourceState<T> {
  data: T | null;
  error: DashboardApiError | null;
  isLoading: boolean;
  isFallback: boolean;
}

function useDashboardResource<T>(
  enabled: boolean,
  fallbackData: T | null,
  load: (signal?: AbortSignal) => Promise<T>
) {
  const [state, setState] = useState<DashboardResourceState<T>>({
    data: null,
    error: null,
    isLoading: enabled,
    isFallback: false
  });

  useEffect(() => {
    if (!enabled) {
      setState({
        data: null,
        error: null,
        isLoading: false,
        isFallback: false
      });
      return;
    }

    const controller = new AbortController();

    setState({
      data: null,
      error: null,
      isLoading: true,
      isFallback: false
    });

    load(controller.signal)
      .then((data) => {
        setState({
          data,
          error: null,
          isLoading: false,
          isFallback: false
        });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        const apiError =
          error instanceof DashboardApiError
            ? error
            : new DashboardApiError(
                "contract",
                "Dashboard API returned an invalid resource payload."
              );
        const isFallback =
          fallbackData !== null && shouldUseDashboardFallback(apiError);

        setState({
          data: isFallback ? fallbackData : null,
          error: apiError,
          isLoading: false,
          isFallback
        });
      });

    return () => controller.abort();
  }, [enabled, fallbackData, load]);

  return state;
}

interface DashboardRouteNoticeProps {
  locale: Locale;
  error: DashboardApiError | null;
  isFallback: boolean;
  isLoading: boolean;
}

function DashboardRouteNotice({
  locale,
  error,
  isFallback,
  isLoading
}: DashboardRouteNoticeProps) {
  const copy = getDashboardCopy(locale);

  let message: string | null = null;

  if (isLoading) {
    message = copy.runtime.loading;
  } else if (error && isFallback) {
    message = copy.runtime.fallback;
  } else if (error) {
    message = copy.runtime.unavailableBody;
  }

  if (!message) {
    return null;
  }

  return (
    <DashboardPanel className="px-4 py-3 sm:px-5">
      <p className="text-sm leading-6 text-white/54">{message}</p>
    </DashboardPanel>
  );
}

function renderDashboardServerPage(
  page: DashboardServerRoutePage,
  locale: Locale,
  server: DashboardServer
): ReactNode {
  switch (page) {
    case "overview":
      return <DashboardOverviewPage locale={locale} server={server} />;
    case "settings":
      return <DashboardSettingsPage locale={locale} server={server} />;
    case "modules":
      return <DashboardModulesPage locale={locale} server={server} />;
    case "branding":
      return <DashboardBrandingPage locale={locale} server={server} />;
    case "licenses":
      return <DashboardLicensesPage locale={locale} server={server} />;
    case "status":
      return <DashboardStatusPage locale={locale} server={server} />;
    default:
      return null;
  }
}

interface DashboardServersRouteProps {
  fallbackServers: DashboardServer[];
  locale: Locale;
}

function getDashboardLoginPath(locale: Locale): string {
  return getLocalizedPath(locale, siteConfig.ctaRoutes.dashboard);
}

export function DashboardServersRoute({
  fallbackServers,
  locale
}: DashboardServersRouteProps) {
  const copy = getDashboardCopy(locale);
  const router = useRouter();
  const load = useCallback(
    (signal?: AbortSignal) => fetchDashboardServers(signal),
    []
  );
  const state = useDashboardResource(true, fallbackServers, load);

  useEffect(() => {
    if (!state.isLoading && isDashboardUnauthorizedError(state.error)) {
      router.replace(getDashboardLoginPath(locale));
    }
  }, [locale, router, state.error, state.isLoading]);

  const servers = state.data ?? [];
  const emptyState =
    state.error && servers.length === 0
      ? {
          title: copy.runtime.unavailableTitle,
          body: copy.runtime.unavailableBody
        }
      : undefined;

  return (
    <DashboardServersPage
      locale={locale}
      servers={servers}
      isFallback={state.isFallback}
      notice={
        <DashboardRouteNotice
          locale={locale}
          error={state.error}
          isFallback={state.isFallback}
          isLoading={state.isLoading}
        />
      }
      emptyState={emptyState}
    />
  );
}

interface DashboardAppRouteProps {
  locale: Locale;
}

export function DashboardAppRoute({ locale }: DashboardAppRouteProps) {
  const copy = getDashboardCopy(locale);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawSearch = searchParams.toString();
  const rawServerId = searchParams.get("server");
  const serverId = rawServerId?.trim() ?? "";
  const page = resolveDashboardServerRoutePage(searchParams.get("section"));
  const fallbackServer = serverId ? getDashboardServer(serverId, locale) : null;

  useEffect(() => {
    const nextSearchParams = new URLSearchParams(rawSearch);
    let changed = false;

    if (serverId) {
      if (nextSearchParams.get("server") !== serverId) {
        nextSearchParams.set("server", serverId);
        changed = true;
      }

      if (nextSearchParams.get("section") !== page) {
        nextSearchParams.set("section", page);
        changed = true;
      }
    } else {
      if (nextSearchParams.has("server")) {
        nextSearchParams.delete("server");
        changed = true;
      }

      if (nextSearchParams.has("section")) {
        nextSearchParams.delete("section");
        changed = true;
      }
    }

    if (!changed) {
      return;
    }

    const nextSearch = nextSearchParams.toString();
    router.replace(nextSearch ? `${pathname}?${nextSearch}` : pathname, {
      scroll: false
    });
  }, [page, pathname, rawSearch, router, serverId]);

  const load = useCallback(
    (signal?: AbortSignal) =>
      serverId
        ? fetchDashboardServerPage(serverId, page, signal)
        : Promise.resolve<DashboardServer | null>(null),
    [page, serverId]
  );
  const state = useDashboardResource<DashboardServer | null>(
    Boolean(serverId),
    fallbackServer,
    load
  );

  useEffect(() => {
    if (!state.isLoading && isDashboardUnauthorizedError(state.error)) {
      router.replace(getDashboardLoginPath(locale));
    }
  }, [locale, router, state.error, state.isLoading]);

  const server = state.data ?? fallbackServer;

  return (
    <DashboardServerShell
      activePage={serverId ? page : "servers"}
      isFallback={state.isFallback}
      locale={locale}
      server={server ?? undefined}
      serverId={serverId || undefined}
    >
      {serverId ? (
        <DashboardRouteNotice
          locale={locale}
          error={state.error}
          isFallback={state.isFallback}
          isLoading={state.isLoading}
        />
      ) : null}
      {!serverId ? (
        <DashboardMessagePanel
          title={copy.runtime.selectServerTitle}
          body={copy.runtime.selectServerBody}
        />
      ) : server ? (
        renderDashboardServerPage(page, locale, server)
      ) : state.isLoading ? (
        <DashboardMessagePanel
          title={copy.runtime.loadingTitle}
          body={copy.runtime.loading}
        />
      ) : (
        <DashboardMessagePanel
          title={copy.runtime.unavailableTitle}
          body={copy.runtime.unavailableBody}
        />
      )}
    </DashboardServerShell>
  );
}


