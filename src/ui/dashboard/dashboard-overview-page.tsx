import type { Locale } from "@/config/site.config";
import type { DashboardServer } from "@/lib/dashboard-mock";
import { getDashboardCopy } from "@/ui/dashboard/dashboard-copy";
import {
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

  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <DashboardPanel className="p-5 sm:p-6">
          <div className="space-y-5">
            <DashboardSectionHeading
              title={copy.overview.identity}
              body={server.description}
            />

            <div className="grid gap-3 sm:grid-cols-2">
              {server.overview.identity.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1rem] bg-white/[0.015] px-4 py-3"
                >
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/34">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm text-white/78">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </DashboardPanel>

        <DashboardPanel className="p-5 sm:p-6">
          <div className="space-y-4">
            <DashboardSectionHeading title={copy.overview.status} />
            <div className="space-y-3">
              {server.overview.systemStatus.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1rem] bg-white/[0.015] px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-3">
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

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <DashboardPanel className="p-5 sm:p-6">
          <div className="space-y-4">
            <DashboardSectionHeading title={copy.overview.modules} />
            <div className="space-y-2">
              {server.overview.moduleSummary.map((module) => (
                <div
                  key={module.key}
                  className="flex items-start justify-between gap-3 rounded-[1rem] bg-white/[0.015] px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-white/88">{module.name}</p>
                    <p className="mt-1 text-sm leading-6 text-white/50">
                      {module.description}
                    </p>
                  </div>
                  <DashboardStatusPill tone={module.tone}>
                    {module.stateLabel}
                  </DashboardStatusPill>
                </div>
              ))}
            </div>
          </div>
        </DashboardPanel>

        <DashboardPanel className="p-5 sm:p-6">
          <div className="space-y-4">
            <DashboardSectionHeading title={copy.overview.notices} />
            <div className="space-y-2">
              {server.overview.notices.map((notice) => (
                <div
                  key={`${notice.title}-${notice.time}`}
                  className="rounded-[1rem] bg-white/[0.015] px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-3">
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



