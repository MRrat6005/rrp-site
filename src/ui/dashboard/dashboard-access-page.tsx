import type { Locale } from "@/config/site.config";
import type { DashboardServer, DashboardSettingGroup } from "@/lib/dashboard-model";
import { DashboardAuthProfileCard } from "@/ui/dashboard/dashboard-auth-profile-card";
import { getDashboardCopy } from "@/ui/dashboard/dashboard-copy";
import { DashboardMessagePanel, DashboardPanel, DashboardSectionHeading } from "@/ui/dashboard/dashboard-primitives";

function renderRows(rows: DashboardSettingGroup[]) {
  return <div className="divide-y divide-white/[0.05]">{rows.map((row) => <div key={row.label} className="py-4"><p className="text-[11px] uppercase tracking-[0.2em] text-white/32">{row.label}</p><p className="mt-2 text-sm font-medium text-white/82">{row.value}</p><p className="mt-1 text-sm leading-6 text-white/50">{row.note}</p></div>)}</div>;
}

export function DashboardAccessPage({ locale, server }: { locale: Locale; server: DashboardServer }) {
  const copy = getDashboardCopy(locale);
  if (server.access.length === 0) return <DashboardMessagePanel title={copy.accessPage.emptyTitle} body={copy.accessPage.emptyBody} />;
  return (
    <div className="space-y-4">
      <DashboardAuthProfileCard locale={locale} />
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <DashboardPanel className="p-5 sm:p-6">
          <div className="space-y-4">
            <DashboardSectionHeading title={copy.accessPage.title} />
            {renderRows(server.access)}
          </div>
        </DashboardPanel>
        <DashboardPanel className="p-5 sm:p-6">
          <div className="space-y-4">
            <DashboardSectionHeading title={copy.accessPage.noteTitle} body={copy.accessPage.note} />
            <div className="border-t border-white/[0.05] pt-4 text-sm leading-6 text-white/54">{server.accessLevel === "none" ? copy.runtime.lockedBody : copy.accessPage.note}</div>
          </div>
        </DashboardPanel>
      </div>
    </div>
  );
}
