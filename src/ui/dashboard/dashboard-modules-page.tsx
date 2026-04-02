import type { Locale } from "@/config/site.config";
import type { DashboardServer } from "@/lib/dashboard-mock";
import { getDashboardCopy } from "@/ui/dashboard/dashboard-copy";
import {
  DashboardPanel,
  DashboardSectionHeading,
  DashboardStatusPill
} from "@/ui/dashboard/dashboard-primitives";

interface DashboardModulesPageProps {
  locale: Locale;
  server: DashboardServer;
}

export function DashboardModulesPage({
  locale,
  server
}: DashboardModulesPageProps) {
  const copy = getDashboardCopy(locale);

  return (
    <DashboardPanel className="p-5 sm:p-6">
      <div className="space-y-4">
        <DashboardSectionHeading title={copy.modules.title} body={copy.modules.note} />
        <div className="divide-y divide-white/[0.05]">
          {server.modules.map((module) => (
            <div
              key={module.key}
              className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-sm font-medium text-white/88">{module.name}</p>
                  <DashboardStatusPill tone={module.tone}>{module.stateLabel}</DashboardStatusPill>
                </div>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
                  {module.description}
                </p>
              </div>
              <span className="text-sm text-white/64">{module.actionLabel}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardPanel>
  );
}
