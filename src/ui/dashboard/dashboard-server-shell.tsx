"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { siteConfig, type Locale } from "@/config/site.config";
import type { DashboardPageKey, DashboardServer } from "@/lib/dashboard-mock";
import { getLocalizedPath } from "@/lib/i18n";
import { LogoTile } from "@/ui/common/logo-tile";
import {
  getDashboardAccessLabel,
  getDashboardCopy,
  getDashboardPageTitle,
  getDashboardStateLabel
} from "@/ui/dashboard/dashboard-copy";
import { getDashboardAppPath } from "@/ui/dashboard/dashboard-routing";
import {
  DashboardLockGlyph,
  DashboardStatusPill,
  cx
} from "@/ui/dashboard/dashboard-primitives";

interface DashboardServerShellProps {
  activePage: DashboardPageKey;
  isFallback?: boolean;
  locale: Locale;
  server?: DashboardServer;
  serverId?: string;
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

function getServerAccessTone(server?: DashboardServer) {
  switch (server?.accessLevel) {
    case "owner":
      return "positive" as const;
    case "admin":
      return "info" as const;
    default:
      return "muted" as const;
  }
}

export function DashboardServerShell({
  activePage,
  isFallback = false,
  locale,
  server,
  serverId,
  children
}: DashboardServerShellProps) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const copy = getDashboardCopy(locale);
  const resolvedServerId = server?.id ?? serverId?.trim() ?? null;
  const stateTone = getServerStateTone(server);
  const accessTone = getServerAccessTone(server);
  const isLocked = server?.accessLevel === "none";

  const navItems: Array<{
    disabled?: boolean;
    href: string;
    key: DashboardPageKey;
  }> = resolvedServerId
    ? (
        [
          { key: "servers", href: getLocalizedPath(locale, "dashboard/servers") },
          { key: "overview", href: getDashboardAppPath(locale, resolvedServerId, "overview") },
          { key: "settings", href: getDashboardAppPath(locale, resolvedServerId, "settings") },
          { key: "modules", href: getDashboardAppPath(locale, resolvedServerId, "modules") },
          { key: "branding", href: getDashboardAppPath(locale, resolvedServerId, "branding") },
          { key: "licenses", href: getDashboardAppPath(locale, resolvedServerId, "licenses") },
          { key: "status", href: getDashboardAppPath(locale, resolvedServerId, "status") }
        ] as Array<{ href: string; key: DashboardPageKey }>
      ).map((item) => ({
        ...item,
        disabled:
          isLocked && item.key !== "servers" && item.key !== "overview"
      }))
    : [{ key: "servers", href: getLocalizedPath(locale, "dashboard/servers") }];

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setDrawerOpen(false);
      }
    };

    if (mediaQuery.matches) {
      setDrawerOpen(false);
    }

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!drawerOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDrawerOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [drawerOpen]);

  const sidebar = (isDrawer = false) => (
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="border-b border-white/[0.05] px-1 pb-5 pt-1">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
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
          {isDrawer ? (
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="rounded-full border border-white/[0.05] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/48 transition hover:bg-white/[0.02] hover:text-white/72"
            >
              {copy.sidebar.close}
            </button>
          ) : null}
        </div>
      </div>

      {server ? (
        <div className="border-b border-white/[0.05] px-1 py-5">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[0.9rem] border border-white/[0.05] text-sm font-medium text-white/82"
                style={{ backgroundColor: `${server.accent}18` }}
              >
                {server.iconUrl ? (
                  <img src={server.iconUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  server.iconLabel
                )}
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
                <DashboardStatusPill tone={accessTone}>
                  {isLocked ? (
                    <>
                      <DashboardLockGlyph className="mr-1 h-4 w-4 border-0 bg-transparent p-0 text-inherit" />
                      {getDashboardAccessLabel(locale, server.accessLevel)}
                    </>
                  ) : (
                    getDashboardAccessLabel(locale, server.accessLevel)
                  )}
                </DashboardStatusPill>
                {isFallback ? (
                  <DashboardStatusPill tone="muted">{copy.sidebar.mockMode}</DashboardStatusPill>
                ) : null}
                <DashboardStatusPill tone="muted">{server.environment}</DashboardStatusPill>
                <DashboardStatusPill tone="muted">{server.plan}</DashboardStatusPill>
              </div>
            </div>
          </div>
        </div>
      ) : resolvedServerId ? (
        <div className="border-b border-white/[0.05] px-1 py-5">
          <div className="space-y-2.5">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/30">
              {copy.sidebar.shellState}
            </p>
            <p className="text-sm font-medium text-white/86">{resolvedServerId}</p>
            <p className="text-sm leading-6 text-white/46">{copy.runtime.loading}</p>
          </div>
        </div>
      ) : (
        <div className="border-b border-white/[0.05] px-1 py-5">
          <div className="space-y-2.5">
            <p className="text-sm font-medium text-white/86">{copy.nav.servers}</p>
            <p className="text-sm leading-6 text-white/46">{copy.descriptions.servers}</p>
            {isFallback ? (
              <DashboardStatusPill tone="muted">{copy.sidebar.mockMode}</DashboardStatusPill>
            ) : null}
          </div>
        </div>
      )}

      <div className="flex-1 px-1 py-5">
        <nav className="grid gap-1">
          {navItems.map((item) => {
            const isActive = item.key === activePage;

            const className = cx(
              "group relative rounded-[0.95rem] px-3 py-2.5 text-sm transition",
              isActive
                ? "bg-white/[0.04] text-white/82"
                : item.disabled
                  ? "cursor-default text-white/26"
                  : "text-white/48 hover:bg-white/[0.02] hover:text-white/68"
            );

            const content = (
              <>
                {isActive ? (
                  <span className="absolute inset-y-2 left-0 w-px rounded-full bg-white/24" />
                ) : null}
                <span className="block pl-2">{getDashboardPageTitle(locale, item.key)}</span>
              </>
            );

            if (item.disabled) {
              return (
                <span
                  key={item.key}
                  aria-disabled="true"
                  className={className}
                >
                  {content}
                </span>
              );
            }

            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setDrawerOpen(false)}
                className={className}
              >
                {content}
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
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_24%),linear-gradient(180deg,#0d0e10_0%,#090a0b_100%)] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1500px] gap-4 px-4 py-4 sm:px-6 lg:gap-6 lg:px-8 lg:py-6">
        <aside className="hidden w-[280px] shrink-0 lg:block lg:self-start">
          <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">{sidebar()}</div>
        </aside>

        <div className="min-w-0 flex-1 space-y-5">
          <div className="border-b border-white/[0.05] px-1 pb-5 pt-1">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="min-w-0 flex-1 space-y-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <button
                    type="button"
                    aria-controls="dashboard-sidebar-drawer"
                    aria-expanded={drawerOpen}
                    onClick={() => setDrawerOpen(true)}
                    className="shrink-0 rounded-full border border-white/[0.05] px-4 py-2 text-sm text-white/62 transition hover:bg-white/[0.02] hover:text-white/76 lg:hidden"
                  >
                    {copy.sidebar.menu}
                  </button>
                  <div className="min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-white/30">
                      <span>{copy.nav.servers}</span>
                      {resolvedServerId ? (
                        <>
                          <span className="text-white/18">/</span>
                          <span className="truncate">{server?.name ?? resolvedServerId}</span>
                        </>
                      ) : null}
                    </div>
                    <h1 className="text-[1.9rem] font-medium leading-tight text-white/92 sm:text-[2.1rem]">
                      {getDashboardPageTitle(locale, activePage)}
                    </h1>
                  </div>
                </div>

                {server ? (
                  <div className="rounded-[1rem] border border-white/[0.05] bg-white/[0.02] px-4 py-3 lg:hidden">
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-white/30">
                          {copy.sidebar.shellState}
                        </p>
                        <p className="text-sm font-medium text-white/84">{server.name}</p>
                        <p className="text-sm leading-6 text-white/46">{server.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <DashboardStatusPill tone={stateTone}>
                          {getDashboardStateLabel(locale, server.state)}
                        </DashboardStatusPill>
                        <DashboardStatusPill tone={accessTone}>
                          {isLocked ? (
                            <>
                              <DashboardLockGlyph className="mr-1 h-4 w-4 border-0 bg-transparent p-0 text-inherit" />
                              {getDashboardAccessLabel(locale, server.accessLevel)}
                            </>
                          ) : (
                            getDashboardAccessLabel(locale, server.accessLevel)
                          )}
                        </DashboardStatusPill>
                        {isFallback ? (
                          <DashboardStatusPill tone="muted">
                            {copy.sidebar.mockMode}
                          </DashboardStatusPill>
                        ) : null}
                        <DashboardStatusPill tone="muted">{server.environment}</DashboardStatusPill>
                        <DashboardStatusPill tone="muted">{server.plan}</DashboardStatusPill>
                      </div>
                    </div>
                  </div>
                ) : null}

                <p className="max-w-2xl text-sm leading-6 text-white/52">
                  {copy.descriptions[activePage]}
                </p>
              </div>

              <div
                className={cx(
                  "flex flex-wrap gap-1.5 xl:max-w-[26rem] xl:justify-end",
                  server ? "hidden lg:flex" : "flex"
                )}
              >
                {server ? (
                  <>
                    <DashboardStatusPill tone={stateTone}>
                      {getDashboardStateLabel(locale, server.state)}
                    </DashboardStatusPill>
                    <DashboardStatusPill tone={accessTone}>
                      {isLocked ? (
                        <>
                          <DashboardLockGlyph className="mr-1 h-4 w-4 border-0 bg-transparent p-0 text-inherit" />
                          {getDashboardAccessLabel(locale, server.accessLevel)}
                        </>
                      ) : (
                        getDashboardAccessLabel(locale, server.accessLevel)
                      )}
                    </DashboardStatusPill>
                    {isFallback ? (
                      <DashboardStatusPill tone="muted">
                        {copy.sidebar.mockMode}
                      </DashboardStatusPill>
                    ) : null}
                    <DashboardStatusPill tone="muted">{server.environment}</DashboardStatusPill>
                    <DashboardStatusPill tone="muted">{server.plan}</DashboardStatusPill>
                  </>
                ) : isFallback ? (
                  <DashboardStatusPill tone="muted">{copy.sidebar.mockMode}</DashboardStatusPill>
                ) : null}
              </div>
            </div>
          </div>

          <main className="space-y-5">{children}</main>
        </div>

        <div
          className={cx(
            "fixed inset-0 z-50 lg:hidden",
            drawerOpen ? "pointer-events-auto" : "pointer-events-none"
          )}
        >
          <button
            type="button"
            aria-label={copy.sidebar.closeMenu}
            onClick={() => setDrawerOpen(false)}
            className={cx(
              "absolute inset-0 bg-[rgba(0,0,0,0.58)] backdrop-blur-[1px] transition duration-200",
              drawerOpen ? "opacity-100" : "opacity-0"
            )}
          />
          <div
            className={cx(
              "absolute inset-y-0 left-0 w-[min(23rem,calc(100vw-1rem))] transition duration-200 ease-out",
              drawerOpen ? "translate-x-0" : "-translate-x-5"
            )}
          >
            <div
              id="dashboard-sidebar-drawer"
              role="dialog"
              aria-modal="true"
              className="h-full rounded-r-[1.5rem] border-r border-white/[0.06] bg-[rgba(11,12,14,0.96)] px-4 py-4 shadow-[18px_0_50px_rgba(0,0,0,0.4)] backdrop-blur-xl"
            >
              {sidebar(true)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
