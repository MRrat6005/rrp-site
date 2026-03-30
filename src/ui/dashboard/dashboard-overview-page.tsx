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

interface DashboardOverviewPageProps {
  locale: Locale;
  server: DashboardServer;
}

export function DashboardOverviewPage({
  locale,
  server
}: DashboardOverviewPageProps) {
  const copy = getDashboardCopy(locale);

  return (
    <div className="space-y-5">
      <DashboardPanel className="p-5 sm:p-6 lg:p-7">
        <DashboardSectionIntro
          eyebrow={copy.overview.eyebrow}
          title={server.name}
          body={server.statusNote}
          aside={<DashboardStatusPill tone="muted">{server.plan}</DashboardStatusPill>}
        />
      </DashboardPanel>

      <DashboardMetricGrid items={server.overviewStats} />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(20rem,1.1fr)]">
        <DashboardPanel className="p-5 sm:p-6">
          <DashboardSectionIntro
            title={copy.overview.modulesTitle}
            body="Keep module presence readable at a glance before diving into the dedicated module page."
          />
          <div className="mt-5 grid gap-3">
            {server.modules.map((module) => (
              <div
                key={module.key}
                className="flex items-start justify-between gap-4 rounded-[1rem] border border-white/8 bg-white/[0.03] px-4 py-4"
              >
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-white">{module.name}</p>
                  <p className="text-sm leading-6 text-white/56">{module.note}</p>
                </div>
                <DashboardStatusPill tone={module.status}>
                  {module.enabled ? copy.modules.stateEnabled : copy.modules.stateDisabled}
                </DashboardStatusPill>
              </div>
            ))}
          </div>
        </DashboardPanel>

        <DashboardPanel className="p-5 sm:p-6">
          <DashboardSectionIntro
            title={copy.overview.activityTitle}
            body="Use placeholders that feel operational without implying real telemetry or audit wiring."
          />
          <div className="mt-5 grid gap-3">
            {server.recentActivity.map((item) => (
              <div
                key={`${item.title}-${item.time}`}
                className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-4 py-4"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <DashboardStatusPill tone={item.tone}>{item.time}</DashboardStatusPill>
                </div>
                <p className="mt-3 text-sm leading-6 text-white/58">{item.detail}</p>
              </div>
            ))}
          </div>
        </DashboardPanel>
      </div>

      <DashboardPanel className="p-5 sm:p-6">
        <DashboardSectionIntro
          title={copy.overview.actionsTitle}
          body="Quick actions are navigational shortcuts into the rest of the shell, not live operations."
        />
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {server.quickActions.map((action) => (
            <Link
              key={action.title}
              href={
                action.target === "workspace"
                  ? getLocalizedPath(locale, `app/server/${server.id}`)
                  : getLocalizedPath(locale, `app/server/${server.id}/${action.target}`)
              }
              className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-4 transition hover:-translate-y-1 hover:border-white/16 hover:bg-white/[0.05]"
            >
              <div className="space-y-2">
                <p className="text-lg font-semibold text-white">{action.title}</p>
                <p className="text-sm leading-6 text-white/58">{action.body}</p>
              </div>
            </Link>
          ))}
        </div>
      </DashboardPanel>
    </div>
  );
}
