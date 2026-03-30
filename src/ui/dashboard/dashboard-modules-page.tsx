import type { Locale } from "@/config/site.config";
import type { DashboardServer } from "@/lib/dashboard-mock";
import { getDashboardCopy } from "@/ui/dashboard/dashboard-copy";
import {
  DashboardPanel,
  DashboardSectionIntro,
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
    <div className="space-y-5">
      <DashboardPanel className="p-5 sm:p-6 lg:p-7">
        <DashboardSectionIntro
          eyebrow={copy.modules.eyebrow}
          title={copy.modules.title}
          body={copy.modules.body}
          aside={<DashboardStatusPill tone="muted">6 modules</DashboardStatusPill>}
        />
      </DashboardPanel>

      <div className="grid gap-4">
        {server.modules.map((module) => (
          <DashboardPanel key={module.key} className="p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="[font-family:var(--font-display)] text-2xl font-semibold text-white">
                    {module.name}
                  </h2>
                  <DashboardStatusPill tone={module.status}>
                    {module.enabled ? copy.modules.stateEnabled : copy.modules.stateDisabled}
                  </DashboardStatusPill>
                </div>
                <p className="text-sm leading-7 text-white/62">{module.description}</p>
                <p className="text-sm leading-6 text-white/48">{module.note}</p>
              </div>

              <div className="grid min-w-[16rem] gap-3 lg:max-w-[18rem]">
                <div className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/38">Last edited</p>
                  <p className="mt-2 text-sm font-medium text-white/76">{module.lastEdited}</p>
                </div>
                <button
                  type="button"
                  className="rounded-[1rem] border border-white/12 bg-white/[0.06] px-4 py-3 text-left text-sm text-white transition hover:border-white/18 hover:bg-white/[0.09]"
                >
                  {module.actionLabel}
                </button>
              </div>
            </div>
          </DashboardPanel>
        ))}
      </div>
    </div>
  );
}
