import type { Locale } from "@/config/site.config";
import type { DashboardServer, DashboardSettingGroup } from "@/lib/dashboard-model";
import { DashboardAuthProfileCard } from "@/ui/dashboard/dashboard-auth-profile-card";
import { getDashboardCopy } from "@/ui/dashboard/dashboard-copy";
import { DashboardMessagePanel, DashboardPanel, DashboardSectionHeading } from "@/ui/dashboard/dashboard-primitives";

function renderRows(rows: DashboardSettingGroup[]) {
  return <div className="divide-y divide-white/[0.05]">{rows.map((row) => <div key={row.label} className="py-4"><p className="text-[11px] uppercase tracking-[0.2em] text-white/32">{row.label}</p><p className="mt-2 text-sm font-medium text-white/82">{row.value}</p><p className="mt-1 text-sm leading-6 text-white/50">{row.note}</p></div>)}</div>;
}

function renderCard(label: string, value: string) {
  return <div className="rounded-[1rem] border border-white/[0.05] bg-white/[0.02] p-4"><p className="text-[11px] uppercase tracking-[0.2em] text-white/32">{label}</p><p className="mt-2 text-sm text-white/78">{value}</p></div>;
}

function formatPolicy(value: string | null | undefined) {
  if (!value) return "-";
  switch (value) {
    case "read_write": return "Read & write";
    case "read_only": return "Read only";
    case "none": return "No access";
    default: return value;
  }
}

function formatFlag(value: boolean | null | undefined) {
  if (value === true) return "Allowed";
  if (value === false) return "Blocked";
  return "-";
}

export function DashboardAccessPage({ locale, server }: { locale: Locale; server: DashboardServer }) {
  const copy = getDashboardCopy(locale);
  const access = server.settingsData?.access;

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
            <div className="grid gap-3 border-t border-white/[0.05] pt-4 sm:grid-cols-2">
              {renderCard("Owner policy", formatPolicy(access?.ownerAccess))}
              {renderCard("Admin policy", formatPolicy(access?.adminAccess))}
              {renderCard("Owners", access?.ownerCount !== null && access?.ownerCount !== undefined ? String(access.ownerCount) : "-")}
              {renderCard("Admins", access?.adminCount !== null && access?.adminCount !== undefined ? String(access.adminCount) : "-")}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1rem] border border-white/[0.05] bg-white/[0.02] p-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/32">Role groups</p>
                <div className="mt-3 space-y-2 text-sm leading-6 text-white/64">
                  <p><span className="text-white/42">Dashboard admins:</span> {access?.dashboardAdminRoles?.join(", ") || "-"}</p>
                  <p><span className="text-white/42">Bot managers:</span> {access?.botManagerRoles?.join(", ") || "-"}</p>
                </div>
              </div>
              <div className="rounded-[1rem] border border-white/[0.05] bg-white/[0.02] p-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/32">Write gates</p>
                <div className="mt-3 space-y-2 text-sm leading-6 text-white/64">
                  <p><span className="text-white/42">Dashboard:</span> {formatFlag(access?.allowDashboardWrite)}</p>
                  <p><span className="text-white/42">Bot:</span> {formatFlag(access?.allowBotWrite)}</p>
                  <p><span className="text-white/42">Policy version:</span> {access?.policyVersion ?? "-"}</p>
                </div>
              </div>
            </div>
          </div>
        </DashboardPanel>
      </div>
    </div>
  );
}

