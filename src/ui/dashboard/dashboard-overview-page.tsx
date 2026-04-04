"use client";

import type { Locale } from "@/config/site.config";
import type { DashboardServer } from "@/lib/dashboard-mock";
import { DashboardAuthProfileCard } from "@/ui/dashboard/dashboard-auth-profile-card";
import { getDashboardCopy } from "@/ui/dashboard/dashboard-copy";
import {
  DashboardMessagePanel,
  DashboardPanel,
  DashboardSectionHeading,
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
  const isEmpty =
    server.overview.identity.length === 0 &&
    server.overview.systemStatus.length === 0 &&
    server.overview.moduleSummary.length === 0 &&
    server.overview.notices.length === 0;

  if (isEmpty) {
    return (
      <div className="space-y-4">
        <DashboardAuthProfileCard locale={locale} />
        <DashboardMessagePanel
          title={copy.overview.emptyTitle}
          body={copy.overview.emptyBody}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <DashboardAuthProfileCard locale={locale} />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <DashboardPanel className="p-5 sm:p-6">
          <div className="space-y-5">
            <DashboardSectionHeading
              title={copy.overview.identity}
              body={server.description}
            />

            <div className="divide-y divide-white/[0.05]">
              {server.overview.identity.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-1.5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/32">
                    {item.label}
                  </p>
                  <p className="text-sm text-white/76 sm:text-right">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </DashboardPanel>

        <DashboardPanel className="p-5 sm:p-6">
          <div className="space-y-4">
            <DashboardSectionHeading title={copy.overview.status} />
            <div className="divide-y divide-white/[0.05]">
              {server.overview.systemStatus.map((item) => (
                <div key={item.label} className="py-3">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/88">{item.label}</p>
                      <p className="mt-1 text-sm leading-6 text-white/52">{item.note}</p>
                    </div>
                    <DashboardStatusPill tone={item.tone}>{item.value}</DashboardStatusPill>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DashboardPanel>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <DashboardPanel className="p-5 sm:p-6">
          <div className="space-y-4">
            <DashboardSectionHeading title={copy.overview.modules} />
            <div className="divide-y divide-white/[0.05]">
              {server.overview.moduleSummary.map((module) => (
                <div
                  key={module.key}
                  className="flex flex-col gap-3 py-3 md:flex-row md:items-start md:justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-white/88">{module.name}</p>
                    <p className="mt-1 text-sm leading-6 text-white/50">
                      {module.description}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-wrap items-center gap-3">
                    <DashboardStatusPill tone={module.tone}>
                      {module.stateLabel}
                    </DashboardStatusPill>
                    <span className="text-sm text-white/44">{module.actionLabel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DashboardPanel>

        <DashboardPanel className="p-5 sm:p-6">
          <div className="space-y-4">
            <DashboardSectionHeading title={copy.overview.notices} />
            <div className="divide-y divide-white/[0.05]">
              {server.overview.notices.map((notice) => (
                <div key={`${notice.title}-${notice.time}`} className="py-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/88">{notice.title}</p>
                      <p className="mt-1 text-sm leading-6 text-white/50">
                        {notice.detail}
                      </p>
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.18em] text-white/32">
                      {notice.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DashboardPanel>
      </div>
    </div>
  );
}

