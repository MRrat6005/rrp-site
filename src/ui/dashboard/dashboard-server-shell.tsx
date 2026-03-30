"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useState } from "react";

import { siteConfig, type Locale } from "@/config/site.config";
import type {
  DashboardPageKey,
  DashboardServer,
  DashboardServerState,
  DashboardTone
} from "@/lib/dashboard-mock";
import { getLocalizedPath } from "@/lib/i18n";
import { LogoTile } from "@/ui/common/logo-tile";
import {
  DashboardPanel,
  DashboardStatusPill,
  cx
} from "@/ui/dashboard/dashboard-primitives";

interface DashboardServerShellProps {
  locale: Locale;
  server: DashboardServer;
  children: ReactNode;
}

const shellCopy = {
  en: {
    brand: "CROWN Control",
    subtitle: "Server workspace shell",
    nav: {
      workspace: "Workspace",
      overview: "Overview",
      modules: "Modules",
      settings: "Settings",
      branding: "Branding",
      licenses: "Licenses",
      status: "Status"
    },
    descriptions: {
      workspace: "Entry page for the selected server with links into every app section.",
      overview: "Quick stats, module coverage, recent activity, and action shortcuts.",
      modules: "Feature-by-feature module state with clean action rows and placeholders.",
      settings: "Central settings hub for language, roles, modules, branding, and permissions.",
      branding: "Preview-focused identity controls for logo, banner, accents, and copy.",
      licenses: "Plan summary, entitlements, and upgrade framing without billing logic.",
      status: "Calm grouped status surfaces for bot, dashboard, modules, and API placeholders."
    },
    backToServers: "All servers",
    backToSite: "Public site",
    serverState: "Server state",
    environment: "Environment",
    menu: "Menu"
  },
  ru: {
    brand: "CROWN Control",
    subtitle: "Shell серверного workspace",
    nav: {
      workspace: "Workspace",
      overview: "Overview",
      modules: "Modules",
      settings: "Settings",
      branding: "Branding",
      licenses: "Licenses",
      status: "Status"
    },
    descriptions: {
      workspace: "Входная страница выбранного сервера со ссылками на все app-разделы.",
      overview: "Быстрые метрики, покрытие модулей, recent activity и action shortcuts.",
      modules: "Состояние модулей по функциям с чистыми action-строками и placeholder'ами.",
      settings: "Центральный settings hub для языка, ролей, модулей, брендинга и прав.",
      branding: "Preview-focused управление логотипом, баннером, акцентами и текстом.",
      licenses: "Сводка плана, entitlements и upgrade-рамка без billing-логики.",
      status: "Спокойные групповые статус-поверхности для бота, dashboard, модулей и API-placeholder'ов."
    },
    backToServers: "Все серверы",
    backToSite: "Публичный сайт",
    serverState: "Состояние сервера",
    environment: "Среда",
    menu: "Меню"
  }
} as const;

function getStateTone(state: DashboardServerState): DashboardTone {
  switch (state) {
    case "connected":
      return "positive";
    case "invite":
      return "warning";
    case "test":
      return "info";
    default:
      return "muted";
  }
}

function getStateLabel(locale: Locale, state: DashboardServerState): string {
  const labels = {
    en: {
      connected: "Connected",
      invite: "Invite bot",
      inactive: "Inactive",
      test: "Test server"
    },
    ru: {
      connected: "Connected",
      invite: "Invite bot",
      inactive: "Inactive",
      test: "Test server"
    }
  } as const;

  return labels[locale][state];
}

export function DashboardServerShell({
  locale,
  server,
  children
}: DashboardServerShellProps) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const copy = shellCopy[locale];
  const basePath = getLocalizedPath(locale, `app/server/${server.id}`);
  const navItems: Array<{ key: DashboardPageKey; href: string; label: string }> = [
    { key: "workspace", href: basePath, label: copy.nav.workspace },
    { key: "overview", href: `${basePath}/overview`, label: copy.nav.overview },
    { key: "modules", href: `${basePath}/modules`, label: copy.nav.modules },
    { key: "settings", href: `${basePath}/settings`, label: copy.nav.settings },
    { key: "branding", href: `${basePath}/branding`, label: copy.nav.branding },
    { key: "licenses", href: `${basePath}/licenses`, label: copy.nav.licenses },
    { key: "status", href: `${basePath}/status`, label: copy.nav.status }
  ];

  const normalizedPath = pathname?.replace(/\/+$/, "") ?? "";
  const activeKey =
    navItems.find((item) => normalizedPath === item.href.replace(/\/+$/, ""))?.key ??
    (normalizedPath.endsWith("/overview")
      ? "overview"
      : normalizedPath.endsWith("/modules")
        ? "modules"
        : normalizedPath.endsWith("/settings")
          ? "settings"
          : normalizedPath.endsWith("/branding")
            ? "branding"
            : normalizedPath.endsWith("/licenses")
              ? "licenses"
              : normalizedPath.endsWith("/status")
                ? "status"
                : "workspace");

  const activeTitle = copy.nav[activeKey];
  const activeDescription = copy.descriptions[activeKey];
  const stateTone = getStateTone(server.state);

  const sidebar = (
    <div className="flex h-full flex-col gap-5">
      <DashboardPanel className="p-4">
        <div className="flex items-center gap-3">
          <LogoTile
            shortLabel="CR"
            label={siteConfig.brand.dashboardBrand}
            imagePath={siteConfig.visuals.projects.crown.markPath}
            size="sm"
            className="bg-white/[0.06]"
          />
          <div>
            <p className="text-sm font-semibold text-white">{copy.brand}</p>
            <p className="text-xs tracking-[0.16em] text-white/44 uppercase">{copy.subtitle}</p>
          </div>
        </div>
      </DashboardPanel>

      <DashboardPanel className="p-4">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-white/10 text-sm font-semibold text-white"
              style={{ backgroundColor: `${server.accent}22`, boxShadow: `inset 0 0 0 1px ${server.accent}33` }}
            >
              {server.iconLabel}
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <p className="truncate text-base font-semibold text-white">{server.name}</p>
              <p className="text-sm leading-6 text-white/56">{server.description}</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-3 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/42">
                {copy.serverState}
              </p>
              <div className="mt-2">
                <DashboardStatusPill tone={stateTone}>{getStateLabel(locale, server.state)}</DashboardStatusPill>
              </div>
            </div>
            <div className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-3 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/42">
                {copy.environment}
              </p>
              <p className="mt-2 text-sm font-medium text-white/74">{server.environment}</p>
            </div>
          </div>
        </div>
      </DashboardPanel>

      <DashboardPanel className="flex-1 p-3">
        <nav className="grid gap-1.5">
          {navItems.map((item) => {
            const isActive = item.key === activeKey;

            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setDrawerOpen(false)}
                className={cx(
                  "rounded-[1rem] border px-3 py-3 text-sm transition duration-200",
                  isActive
                    ? "border-white/14 bg-white/[0.08] text-white shadow-[0_12px_32px_rgba(0,0,0,0.18)]"
                    : "border-transparent bg-transparent text-white/58 hover:border-white/10 hover:bg-white/[0.04] hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </DashboardPanel>

      <div className="grid gap-2">
        <Link
          href={getLocalizedPath(locale, "app/servers")}
          className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/72 transition hover:bg-white/[0.06] hover:text-white"
        >
          {copy.backToServers}
        </Link>
        <Link
          href={getLocalizedPath(locale)}
          className="rounded-[1rem] border border-white/10 px-4 py-3 text-sm text-white/56 transition hover:border-white/16 hover:text-white/80"
        >
          {copy.backToSite}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1440px] gap-6 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
      <aside className="hidden w-[290px] shrink-0 lg:block">{sidebar}</aside>

      <div className="min-w-0 flex-1 space-y-5">
        <DashboardPanel className="p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/72 transition hover:bg-white/[0.06] hover:text-white lg:hidden"
              >
                {copy.menu}
              </button>
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/42">
                  {server.name}
                </p>
                <div className="space-y-1">
                  <h1 className="[font-family:var(--font-display)] text-2xl font-semibold text-white sm:text-[2rem]">
                    {activeTitle}
                  </h1>
                  <p className="max-w-2xl text-sm leading-7 text-white/60">{activeDescription}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <DashboardStatusPill tone={stateTone}>{getStateLabel(locale, server.state)}</DashboardStatusPill>
              <DashboardStatusPill tone="muted">{server.plan}</DashboardStatusPill>
            </div>
          </div>
        </DashboardPanel>

        <main className="space-y-5">{children}</main>
      </div>

      {drawerOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-[rgba(2,4,8,0.72)] backdrop-blur-sm"
          />
          <div className="absolute left-0 top-0 h-full w-[min(22rem,88vw)] border-r border-white/10 bg-[rgba(6,9,14,0.96)] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.38)]">
            {sidebar}
          </div>
        </div>
      ) : null}
    </div>
  );
}



