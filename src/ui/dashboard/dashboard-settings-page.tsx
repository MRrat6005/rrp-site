import type { Locale } from "@/config/site.config";
import type { DashboardServer } from "@/lib/dashboard-mock";
import { getDashboardCopy } from "@/ui/dashboard/dashboard-copy";
import {
  DashboardPanel,
  DashboardSectionIntro,
  DashboardStatusPill
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
    <div className="space-y-5">
      <DashboardPanel className="p-5 sm:p-6 lg:p-7">
        <DashboardSectionIntro
          eyebrow={copy.settings.eyebrow}
          title={copy.settings.title}
          body={copy.settings.body}
          aside={<DashboardStatusPill tone="muted">{server.settingsGroups.length} areas</DashboardStatusPill>}
        />
      </DashboardPanel>

      <div className="grid gap-4 xl:grid-cols-2">
        {server.settingsGroups.map((group) => (
          <DashboardPanel key={group.label} className="p-5 sm:p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
                  {group.label}
                </p>
                <h2 className="[font-family:var(--font-display)] text-2xl font-semibold text-white">
                  {group.value}
                </h2>
              </div>
              <p className="text-sm leading-7 text-white/60">{group.note}</p>
            </div>
          </DashboardPanel>
        ))}
      </div>

      <DashboardPanel className="p-5 sm:p-6">
        <DashboardSectionIntro
          title="Readability first"
          body="The settings hub stays centralized and scannable so new server owners can move between localization, admin access, enabled modules, branding, and license context without hunting for controls."
        />
      </DashboardPanel>
    </div>
  );
}
