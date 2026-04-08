import type { Locale } from "@/config/site.config";
import type { DashboardServer, DashboardSettingGroup } from "@/lib/dashboard-model";
import { getDashboardCopy } from "@/ui/dashboard/dashboard-copy";
import { DashboardMessagePanel, DashboardPanel, DashboardSectionHeading } from "@/ui/dashboard/dashboard-primitives";

function renderRows(rows: DashboardSettingGroup[]) {
  return <div className="divide-y divide-white/[0.05]">{rows.map((row) => <div key={row.label} className="py-4"><p className="text-[11px] uppercase tracking-[0.2em] text-white/32">{row.label}</p><p className="mt-2 text-sm font-medium text-white/82">{row.value}</p><p className="mt-1 text-sm leading-6 text-white/50">{row.note}</p></div>)}</div>;
}

function renderCard(label: string, value: string) {
  return <div className="rounded-[1rem] border border-white/[0.05] bg-white/[0.02] p-4"><p className="text-[11px] uppercase tracking-[0.2em] text-white/32">{label}</p><p className="mt-2 text-sm text-white/78">{value}</p></div>;
}

function formatFlag(value: boolean | null | undefined, trueLabel: string, falseLabel: string) {
  if (value === true) return trueLabel;
  if (value === false) return falseLabel;
  return "-";
}

export function DashboardGeneralPage({ locale, server }: { locale: Locale; server: DashboardServer }) {
  const copy = getDashboardCopy(locale);
  const general = server.settingsData?.general;

  if (server.general.length === 0) return <DashboardMessagePanel title={copy.general.emptyTitle} body={copy.general.emptyBody} />;

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
      <DashboardPanel className="p-5 sm:p-6">
        <div className="space-y-4">
          <DashboardSectionHeading title={copy.general.title} />
          {renderRows(server.general)}
        </div>
      </DashboardPanel>
      <DashboardPanel className="p-5 sm:p-6">
        <div className="space-y-4">
          <DashboardSectionHeading title={copy.general.noteTitle} body={copy.general.note} />
          <div className="grid gap-3 border-t border-white/[0.05] pt-4 sm:grid-cols-2">
            {renderCard("State", formatFlag(general?.isActive, "Active", "Inactive"))}
            {renderCard("Dashboard", formatFlag(general?.dashboardEnabled, "Enabled", "Disabled"))}
            {renderCard("Bot sync", formatFlag(general?.botSyncEnabled, "Enabled", "Disabled"))}
            {renderCard("Contact", general?.contactEmail ?? general?.supportUrl ?? "-")}
            {renderCard("Slug", general?.slug || "-")}
            {renderCard("Guild ID", general?.guildId || "-")}
          </div>
        </div>
      </DashboardPanel>
    </div>
  );
}

