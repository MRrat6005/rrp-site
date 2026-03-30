import Link from "next/link";

import type { Locale } from "@/config/site.config";
import type { DashboardServer } from "@/lib/dashboard-mock";
import { getLocalizedPath } from "@/lib/i18n";
import { getDashboardCopy } from "@/ui/dashboard/dashboard-copy";
import {
  DashboardMetricGrid,
  DashboardPanel,
  DashboardSectionIntro,
  DashboardStatusPill
} from "@/ui/dashboard/dashboard-primitives";

interface DashboardWorkspacePageProps {
  locale: Locale;
  server: DashboardServer;
}

export function DashboardWorkspacePage({
  locale,
  server
}: DashboardWorkspacePageProps) {
  const copy = getDashboardCopy(locale);
  const routes = [
    {
      label: copy.overview.eyebrow,
      title: copy.overview.modulesTitle,
      body: "Stats, recent activity, and quick actions stay close together.",
      href: getLocalizedPath(locale, `app/server/${server.id}/overview`)
    },
    {
      label: copy.modules.eyebrow,
      title: copy.modules.title,
      body: "Feature modules sit in list-card hybrids with quiet hierarchy.",
      href: getLocalizedPath(locale, `app/server/${server.id}/modules`)
    },
    {
      label: copy.settings.eyebrow,
      title: copy.settings.title,
      body: "Configuration areas are grouped into a readable settings hub.",
      href: getLocalizedPath(locale, `app/server/${server.id}/settings`)
    },
    {
      label: copy.branding.eyebrow,
      title: "Branding",
      body: "Preview-oriented identity controls stay separated from the public site.",
      href: getLocalizedPath(locale, `app/server/${server.id}/branding`)
    },
    {
      label: copy.licenses.eyebrow,
      title: "Licenses",
      body: "Plan level and entitlements remain premium but mock-only.",
      href: getLocalizedPath(locale, `app/server/${server.id}/licenses`)
    },
    {
      label: copy.status.eyebrow,
      title: "Status",
      body: "Core and integration placeholders stay calm and grouped.",
      href: getLocalizedPath(locale, `app/server/${server.id}/status`)
    }
  ];

  return (
    <div className="space-y-5">
      <DashboardPanel className="p-5 sm:p-6 lg:p-7">
        <DashboardSectionIntro
          eyebrow={copy.workspace.eyebrow}
          title={copy.workspace.title}
          body={copy.workspace.body}
          aside={<DashboardStatusPill tone="muted">{copy.shared.mockBadge}</DashboardStatusPill>}
        />
      </DashboardPanel>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.04fr)_minmax(20rem,0.96fr)]">
        <DashboardPanel className="p-5 sm:p-6">
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/42">
                {copy.workspace.profileTitle}
              </p>
              <h3 className="[font-family:var(--font-display)] text-2xl font-semibold text-white">
                {server.name}
              </h3>
              <p className="max-w-2xl text-sm leading-7 text-white/62">{server.statusNote}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">Plan</p>
                <p className="mt-2 text-sm font-medium text-white/78">{server.plan}</p>
              </div>
              <div className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">Sync</p>
                <p className="mt-2 text-sm font-medium text-white/78">{server.syncLabel}</p>
              </div>
              <div className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">Members</p>
                <p className="mt-2 text-sm font-medium text-white/78">{server.memberCount}</p>
              </div>
              <div className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">Environment</p>
                <p className="mt-2 text-sm font-medium text-white/78">{server.environment}</p>
              </div>
            </div>
          </div>
        </DashboardPanel>

        <DashboardPanel className="p-5 sm:p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/42">
                {copy.workspace.summaryTitle}
              </p>
              <h3 className="[font-family:var(--font-display)] text-2xl font-semibold text-white">
                {server.description}
              </h3>
            </div>
            <p className="text-sm leading-7 text-white/62">
              The selected server state drives the card treatment, module defaults, license framing, and status tone across the rest of the shell.
            </p>
            <div className="flex flex-wrap gap-2">
              <DashboardStatusPill tone="info">{server.region}</DashboardStatusPill>
              <DashboardStatusPill tone="muted">{server.channelCount} channels</DashboardStatusPill>
              <DashboardStatusPill tone="muted">{server.adminCount} admins</DashboardStatusPill>
            </div>
          </div>
        </DashboardPanel>
      </div>

      <DashboardMetricGrid items={server.overviewStats.slice(0, 4)} />

      <DashboardPanel className="p-5 sm:p-6 lg:p-7">
        <DashboardSectionIntro
          title={copy.workspace.routesTitle}
          body={copy.workspace.routesBody}
        />
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-4 transition hover:-translate-y-1 hover:border-white/16 hover:bg-white/[0.05]"
            >
              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
                  {route.label}
                </p>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-white">{route.title}</p>
                  <p className="text-sm leading-6 text-white/58">{route.body}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </DashboardPanel>
    </div>
  );
}
