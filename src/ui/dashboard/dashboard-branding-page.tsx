import type { Locale } from "@/config/site.config";
import type { DashboardServer } from "@/lib/dashboard-model";
import { getDashboardCopy } from "@/ui/dashboard/dashboard-copy";
import { DashboardMessagePanel, DashboardPanel, DashboardSectionHeading, DashboardStatusPill } from "@/ui/dashboard/dashboard-primitives";

export function DashboardBrandingPage({ locale, server }: { locale: Locale; server: DashboardServer }) {
  const copy = getDashboardCopy(locale);
  if (server.brandingModules.length === 0) return <DashboardMessagePanel title={copy.branding.emptyTitle} body={copy.branding.emptyBody} />;
  return (
    <div className="space-y-4">
      <DashboardPanel className="p-5 sm:p-6">
        <DashboardSectionHeading title={copy.branding.title} body={copy.branding.note} />
      </DashboardPanel>
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {server.brandingModules.map((module) => (
          <DashboardPanel key={module.key} className="p-5 sm:p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-base font-medium text-white/90">{module.name}</p>
                  <DashboardStatusPill tone={module.tone}>{module.stateLabel}</DashboardStatusPill>
                </div>
                <p className="text-sm leading-6 text-white/54">{module.description}</p>
              </div>
              <div className="rounded-[1rem] border border-white/[0.05] bg-white/[0.02] p-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/32">Availability</p>
                <p className="mt-2 text-sm font-medium text-white/82">{module.availability}</p>
                <p className="mt-1 text-sm leading-6 text-white/50">{module.note}</p>
              </div>
            </div>
          </DashboardPanel>
        ))}
      </div>
    </div>
  );
}
