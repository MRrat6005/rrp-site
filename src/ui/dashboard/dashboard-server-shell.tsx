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
    <div className="flex h-full flex-col">
      <div className="border-b border-white/[0.05] px-1 pb-5 pt-1">
        <div className="flex items-center gap-3">
          <LogoTile
            shortLabel="CR"
            label={siteConfig.brand.dashboardBrand}
            imagePath={siteConfig.visuals.projects.crown.markPath}
            size="sm"
            className="bg-white/[0.02]"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white/88">{copy.brand}</p>
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/30">
              {copy.subtitle}
            </p>
          </div>
        </div>
      </div>

      {server ? (
        <div className="border-b border-white/[0.05] px-1 py-5">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.9rem] border border-white/[0.05] text-sm font-medium text-white/82"
                style={{ backgroundColor: `${server.accent}18` }}
              >
                {server.iconLabel}
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <p className="truncate text-sm font-medium text-white/88">{server.name}</p>
                <p className="text-sm leading-6 text-white/46">{server.description}</p>
              </div>
            </div>

            <div className="space-y-2.5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/30">
                {copy.sidebar.shellState}
              </p>
              <div className="flex flex-wrap gap-1.5">
                <DashboardStatusPill tone={stateTone}>
                  {getDashboardStateLabel(locale, server.state)}
                </DashboardStatusPill>
                <DashboardStatusPill tone="muted">{server.environment}</DashboardStatusPill>
                <DashboardStatusPill tone="muted">{server.plan}</DashboardStatusPill>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-b border-white/[0.05] px-1 py-5">
          <div className="space-y-2.5">
            <p className="text-sm font-medium text-white/86">{copy.nav.servers}</p>
            <p className="text-sm leading-6 text-white/46">{copy.descriptions.servers}</p>
            <DashboardStatusPill tone="muted">{copy.sidebar.mockMode}</DashboardStatusPill>
          </div>
        </div>
      )}

      <div className="flex-1 px-1 py-5">
        <nav className="grid gap-1">
          {navItems.map((item) => {
            const isActive = item.key === activePage;

            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setDrawerOpen(false)}
                className={cx(
                  "group relative rounded-[0.95rem] px-3 py-2.5 text-sm transition",
                  isActive
                    ? "bg-white/[0.04] text-white/82"
                    : "text-white/48 hover:bg-white/[0.02] hover:text-white/68"
                )}
              >
                {isActive ? (
                  <span className="absolute inset-y-2 left-0 w-px rounded-full bg-white/24" />
                ) : null}
                <span className="block pl-2">{getDashboardPageTitle(locale, item.key)}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-white/[0.05] pt-4">
        <Link
          href={getLocalizedPath(locale)}
          className="block rounded-[0.95rem] px-4 py-3 text-sm text-white/46 transition hover:bg-white/[0.02] hover:text-white/68"
        >
          {copy.sidebar.publicSite}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_24%),linear-gradient(180deg,#0d0e10_0%,#090a0b_100%)] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1500px] gap-4 px-4 py-4 sm:px-6 lg:gap-6 lg:px-8 lg:py-6">
        <aside className="hidden w-[280px] shrink-0 lg:block">{sidebar}</aside>

        <div className="min-w-0 flex-1 space-y-5">
          <div className="border-b border-white/[0.05] px-1 pb-5 pt-1">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  className="rounded-full border border-white/[0.05] px-4 py-2 text-sm text-white/62 transition hover:bg-white/[0.02] hover:text-white/76 lg:hidden"
                >
                  {copy.sidebar.menu}
                </button>
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-white/30">
                    <span>{copy.nav.servers}</span>
                    {server ? (
                      <>
                        <span className="text-white/18">/</span>
                        <span>{server.name}</span>
                      </>
                    ) : null}
                  </div>
                  <h1 className="text-2xl font-medium text-white/92 sm:text-[2rem]">
                    {getDashboardPageTitle(locale, activePage)}
                  </h1>
                </div>
              </div>

              <div className="flex flex-wrap justify-end gap-1.5">
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

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/52">
              {copy.descriptions[activePage]}
            </p>
          </div>

          <main className="space-y-5">{children}</main>
        </div>

        {drawerOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setDrawerOpen(false)}
              className="absolute inset-0 bg-[rgba(0,0,0,0.52)]"
            />
            <div className="absolute left-0 top-0 h-full w-[min(21rem,88vw)] border-r border-white/[0.06] bg-[#0c0d0f] p-4">
              {sidebar}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
