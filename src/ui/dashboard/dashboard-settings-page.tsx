import type { Locale } from "@/config/site.config";
import type { DashboardServer } from "@/lib/dashboard-mock";
import { getDashboardCopy } from "@/ui/dashboard/dashboard-copy";
import {
  DashboardPanel,
  DashboardSectionHeading
} from "@/ui/dashboard/dashboard-primitives";

interface DashboardSettingsPageProps {
  locale: Locale;
  server: DashboardServer;
}

export function DashboardSettingsPage({
  locale,
  server
}: DashboardSettingsPageProps) {
  const copy = getDashboardCopy(locale);

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
      <DashboardPanel className="p-5 sm:p-6">
        <div className="space-y-4">
          <DashboardSectionHeading title={copy.settings.title} />
          <div className="divide-y divide-white/[0.05]">
            {server.settings.map((group) => (
              <div key={group.label} className="py-4">
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/32">
                    {group.label}
                  </p>
                  <p className="text-sm font-medium text-white/82">{group.value}</p>
                  <p className="text-sm leading-6 text-white/50">{group.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardPanel>

      <DashboardPanel className="p-5 sm:p-6">
        <div className="space-y-4">
          <DashboardSectionHeading title="Read-only note" body={copy.settings.note} />
          <div className="border-t border-white/[0.05] pt-4 text-sm leading-6 text-white/54">
            The groups on this page are deliberately shallow. They establish where
            localization, admin role, enabled modules, and access controls will
            live later, without pretending real writes or permission checks exist now.
          </div>
        </div>
      </DashboardPanel>
    </div>
  );
}
