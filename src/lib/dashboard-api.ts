import type { Locale } from "@/config/site.config";
import type { DashboardServer } from "@/lib/dashboard-mock";

export type DashboardServerRoutePage =
  | "overview"
  | "settings"
  | "modules"
  | "branding"
  | "licenses"
  | "status";

export type DashboardApiErrorKind = "config" | "network" | "http" | "parse";

declare global {
  interface Window {
    __RRP_RUNTIME_CONFIG__?: {
      dashboardApiBaseUrl?: string;
    };
  }
}

export class DashboardApiError extends Error {
  kind: DashboardApiErrorKind;
  status?: number;

  constructor(kind: DashboardApiErrorKind, message: string, status?: number) {
    super(message);
    this.name = "DashboardApiError";
    this.kind = kind;
    this.status = status;
  }
}

function normalizeBaseUrl(value?: string | null): string | null {
  const normalized = value?.trim();

  if (!normalized) {
    return null;
  }

  return normalized.replace(/\/+$/, "");
}

export function getDashboardApiBaseUrl(): string | null {
  if (typeof window !== "undefined") {
    const runtimeBaseUrl = normalizeBaseUrl(
      window.__RRP_RUNTIME_CONFIG__?.dashboardApiBaseUrl
    );

    if (runtimeBaseUrl) {
      return runtimeBaseUrl;
    }
  }

  return normalizeBaseUrl(process.env.NEXT_PUBLIC_DASHBOARD_API_BASE_URL ?? null);
}

function buildDashboardApiUrl(path: string, locale: Locale): string {
  const baseUrl = getDashboardApiBaseUrl();

  if (!baseUrl) {
    throw new DashboardApiError(
      "config",
      "Dashboard API base URL is not configured."
    );
  }

  const url = new URL(path.replace(/^\/+/, ""), `${baseUrl}/`);
  url.searchParams.set("locale", locale);

  return url.toString();
}

async function fetchDashboardJson<T>(
  path: string,
  locale: Locale,
  signal?: AbortSignal
): Promise<T> {
  const url = buildDashboardApiUrl(path, locale);
  let response: Response;

  try {
    response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json"
      },
      cache: "no-store",
      signal
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }

    throw new DashboardApiError("network", "Dashboard API is unreachable.");
  }

  if (!response.ok) {
    throw new DashboardApiError(
      "http",
      "Dashboard API request failed.",
      response.status
    );
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new DashboardApiError("parse", "Dashboard API returned invalid JSON.");
  }
}

function getDashboardServerPagePath(
  serverId: string,
  page: DashboardServerRoutePage
): string {
  return `dashboard/server/${encodeURIComponent(serverId)}/${page}`;
}

export function fetchDashboardServers(locale: Locale, signal?: AbortSignal) {
  return fetchDashboardJson<DashboardServer[]>("dashboard/servers", locale, signal);
}

export function fetchDashboardServerPage(
  serverId: string,
  page: DashboardServerRoutePage,
  locale: Locale,
  signal?: AbortSignal
) {
  return fetchDashboardJson<DashboardServer>(
    getDashboardServerPagePath(serverId, page),
    locale,
    signal
  );
}
