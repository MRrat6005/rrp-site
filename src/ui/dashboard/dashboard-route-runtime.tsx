"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";

import type { Locale } from "@/config/site.config";
import {
  fetchDashboardServerPage,
  fetchDashboardServers,
  type DashboardApiError,
  type DashboardServerRoutePage
} from "@/lib/dashboard-api";
import type { DashboardServer } from "@/lib/dashboard-mock";
import { DashboardBrandingPage } from "@/ui/dashboard/dashboard-branding-page";
import { getDashboardCopy } from "@/ui/dashboard/dashboard-copy";
import { DashboardLicensesPage } from "@/ui/dashboard/dashboard-licenses-page";
import { DashboardModulesPage } from "@/ui/dashboard/dashboard-modules-page";
import { DashboardOverviewPage } from "@/ui/dashboard/dashboard-overview-page";
import {
  DashboardMessagePanel,
  DashboardPanel
} from "@/ui/dashboard/dashboard-primitives";
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
  fallbackData: T | null,
  load: (signal?: AbortSignal) => Promise<T>
) {
  const [state, setState] = useState<DashboardResourceState<T>>({
    data: fallbackData,
    error: null,
    isLoading: true,
    isFallback: fallbackData !== null
  });

  useEffect(() => {
    const controller = new AbortController();

    setState({
      data: fallbackData,
      error: null,
      isLoading: true,
      isFallback: fallbackData !== null
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

        setState({
          data: fallbackData,
          error: error as DashboardApiError,
          isLoading: false,
          isFallback: fallbackData !== null
        });
      });

    return () => controller.abort();
  }, [fallbackData, load]);

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

export function DashboardServersRoute({
  fallbackServers,
  locale
}: DashboardServersRouteProps) {
  const copy = getDashboardCopy(locale);
  const load = useCallback(
    (signal?: AbortSignal) => fetchDashboardServers(locale, signal),
    [locale]
  );
  const state = useDashboardResource(fallbackServers, load);

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

interface DashboardServerRouteProps {
  fallbackServer: DashboardServer | null;
  locale: Locale;
  page: DashboardServerRoutePage;
  serverId: string;
}

export function DashboardServerRoute({
  fallbackServer,
  locale,
  page,
  serverId
}: DashboardServerRouteProps) {
  const copy = getDashboardCopy(locale);
  const load = useCallback(
    (signal?: AbortSignal) =>
      fetchDashboardServerPage(serverId, page, locale, signal),
    [locale, page, serverId]
  );
  const state = useDashboardResource(fallbackServer, load);

  const server = state.data ?? fallbackServer;

  return (
    <DashboardServerShell locale={locale} server={server ?? undefined}>
      <DashboardRouteNotice
        locale={locale}
        error={state.error}
        isFallback={state.isFallback}
        isLoading={state.isLoading}
      />
      {server ? (
        renderDashboardServerPage(page, locale, server)
      ) : (
        <DashboardMessagePanel
          title={copy.runtime.unavailableTitle}
          body={copy.runtime.unavailableBody}
        />
      )}
    </DashboardServerShell>
  );
}
