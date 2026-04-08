import type { Locale } from "@/config/site.config";
import type { DashboardServerRoutePage } from "@/lib/dashboard-api";
import { getLocalizedPath } from "@/lib/i18n";

const dashboardServerRoutePages = [
  "overview",
  "general",
  "access",
  "localization",
  "branding",
  "license",
  "status"
] as const satisfies readonly DashboardServerRoutePage[];

export function isDashboardServerRoutePage(value: string | null | undefined): value is DashboardServerRoutePage {
  return dashboardServerRoutePages.includes(value as (typeof dashboardServerRoutePages)[number]);
}

export function resolveDashboardServerRoutePage(value: string | null | undefined): DashboardServerRoutePage {
  return isDashboardServerRoutePage(value) ? value : "overview";
}

export function getDashboardAppPath(locale: Locale, serverId?: string | null, section?: DashboardServerRoutePage): string {
  const href = getLocalizedPath(locale, "dashboard/app");
  const normalizedServerId = serverId?.trim();
  if (!normalizedServerId) return href;
  const searchParams = new URLSearchParams();
  searchParams.set("server", normalizedServerId);
  searchParams.set("section", section ?? "overview");
  return `${href}?${searchParams.toString()}`;
}
