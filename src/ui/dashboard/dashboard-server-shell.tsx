"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useState } from "react";

import { siteConfig, type Locale } from "@/config/site.config";
import type { DashboardPageKey, DashboardServer } from "@/lib/dashboard-mock";
import { getLocalizedPath } from "@/lib/i18n";
import { LogoTile } from "@/ui/common/logo-tile";
import {
  getDashboardCopy,
  getDashboardPageTitle,
  getDashboardStateLabel
} from "@/ui/dashboard/dashboard-copy";
import {
  DashboardPanel,
  DashboardStatusPill,
  cx
} from "@/ui/dashboard/dashboard-primitives";

interface DashboardServerShellProps {
  locale: Locale;
  server?: DashboardServer;
  children: ReactNode;
}

function getServerStateTone(server?: DashboardServer) {
  if (!server) {
    return "muted" as const;
  }

  switch (server.state) {
    case "connected":
      return "positive" as const;
    case "invite":
      return "warning" as const;
    case "test":
      return "info" as const;
    default:
      return "muted" as const;
  }
}

function getActivePage(pathname: string | null, hasServer: boolean): DashboardPageKey {
  const normalized = pathname?.replace(/\/+$/, "") ?? "";

  if (normalized.endsWith("/dashboard/servers")) {
    return "servers";
  }

  if (normalized.endsWith("/overview")) {
    return "overview";
  }

  if (normalized.endsWith("/settings")) {
    return "settings";
  }

  if (normalized.endsWith("/modules")) {
    return "modules";
  }

  if (normalized.endsWith("/branding")) {
    return "branding";
  }

  if (normalized.endsWith("/licenses")) {
    return "licenses";
  }

  if (normalized.endsWith("/status")) {
    return "status";
  }

  return hasServer ? "overview" : "servers";
}

export function DashboardServerShell({
  locale,
  server,
  children
}: DashboardServerShellProps) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const copy = getDashboardCopy(locale);
  const activePage = getActivePage(pathname, Boolean(server));
  const stateTone = getServerStateTone(server);

  const baseServerPath = server
    ? getLocalizedPath(locale, `dashboard/server/${server.id}`)
    : null;

  const navItems: Array<{ key: DashboardPageKey; href: string }> = server
    ? [
        { key: "servers", href: getLocalizedPath(locale, "dashboard/servers") },
        { key: "overview", href: `${baseServerPath}/overview` },
        { key: "settings", href: `${baseServerPath}/settings` },
        { key: "modules", href: `${baseServerPath}/modules` },
        { key: "branding", href: `${baseServerPath}/branding` },
        { key: "licenses", href: `${baseServerPath}/licenses` },
        { key: "status", href: `${baseServerPath}/status` }
      ]
    : [{ key: "servers", href: getLocalizedPath(locale, "dashboard/servers") }];

  const sidebar = (
    <div className="flex h-full flex-col gap-4">
      <DashboardPanel className="p-4">
        <div className="flex items-center gap-3">
          <LogoTile
            shortLabel="CR"
            label={siteConfig.brand.dashboardBrand}
            imagePath={siteConfig.visuals.projects.crown.markPath}
            size="sm"
            className="bg-white/[0.04]"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{copy.brand}</p>
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/42">
              {copy.subtitle}
            </p>
          </div>
        </div>
      </DashboardPanel>

      {server ? (
        <DashboardPanel className="p-4">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.95rem] border border-white/10 text-sm font-semibold text-white"
                style={{ backgroundColor: `${server.accent}20` }}
              >
                {server.iconLabel}
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <p className="truncate text-sm font-semibold text-white">{server.name}</p>
                <p className="text-sm leading-6 text-white/52">{server.description}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/38">
                {copy.sidebar.shellState}
              </p>
              <div className="flex flex-wrap gap-2">
                <DashboardStatusPill tone={stateTone}>
                  {getDashboardStateLabel(locale, server.state)}
                </DashboardStatusPill>
                <DashboardStatusPill tone="muted">{server.plan}</DashboardStatusPill>
              </div>
            </div>
          </div>
        </DashboardPanel>
      ) : (
        <DashboardPanel className="p-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-white">{copy.nav.servers}</p>
            <p className="text-sm leading-6 text-white/52">{copy.descriptions.servers}</p>
            <DashboardStatusPill tone="muted">{copy.sidebar.mockMode}</DashboardStatusPill>
          </div>
        </DashboardPanel>
      )}

      <DashboardPanel className="flex-1 p-2.5">
        <nav className="grid gap-1.5">
          {navItems.map((item) => {
            const isActive = item.key === activePage;

            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setDrawerOpen(false)}
                className={cx(
                  "rounded-[1rem] border px-3 py-3 text-sm transition",
                  isActive
                    ? "border-white/16 bg-white/[0.07] text-white"
                    : "border-transparent text-white/56 hover:border-white/10 hover:bg-white/[0.03] hover:text-white"
                )}
              >
                {getDashboardPageTitle(locale, item.key)}
              </Link>
            );
          })}
        </nav>
      </DashboardPanel>

      <div className="grid gap-2">
        <Link
          href={getLocalizedPath(locale, "dashboard/servers")}
          className="rounded-[1rem] border border-white/10 px-4 py-3 text-sm text-white/68 transition hover:border-white/14 hover:text-white"
        >
          {copy.sidebar.allServers}
        </Link>
        <Link
          href={getLocalizedPath(locale)}
          className="rounded-[1rem] border border-white/10 px-4 py-3 text-sm text-white/52 transition hover:border-white/14 hover:text-white/78"
        >
          {copy.sidebar.publicSite}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_24%),linear-gradient(180deg,#0f1012_0%,#0b0c0d_100%)] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1500px] gap-4 px-4 py-4 sm:px-6 lg:gap-6 lg:px-8 lg:py-6">
        <aside className="hidden w-[280px] shrink-0 lg:block">{sidebar}</aside>

        <div className="min-w-0 flex-1 space-y-4">
          <DashboardPanel className="p-4 sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/68 transition hover:border-white/14 hover:text-white lg:hidden"
                >
                  {copy.sidebar.menu}
                </button>
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.26em] text-white/38">
                    {server ? server.name : copy.brand}
                  </p>
                  <div className="space-y-1">
                    <h1 className="text-2xl font-semibold text-white sm:text-[2rem]">
                      {getDashboardPageTitle(locale, activePage)}
                    </h1>
                    <p className="max-w-2xl text-sm leading-6 text-white/56">
                      {copy.descriptions[activePage]}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-end gap-2">
                {server ? (
                  <>
                    <DashboardStatusPill tone={stateTone}>
                      {getDashboardStateLabel(locale, server.state)}
                    </DashboardStatusPill>
                    <DashboardStatusPill tone="muted">{server.environment}</DashboardStatusPill>
                  </>
                ) : (
                  <DashboardStatusPill tone="muted">{copy.sidebar.mockMode}</DashboardStatusPill>
                )}
              </div>
            </div>
          </DashboardPanel>

          <main className="space-y-4">{children}</main>
        </div>

        {drawerOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setDrawerOpen(false)}
              className="absolute inset-0 bg-[rgba(0,0,0,0.58)]"
            />
            <div className="absolute left-0 top-0 h-full w-[min(21rem,88vw)] border-r border-white/10 bg-[#0d0e10] p-4">
              {sidebar}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
