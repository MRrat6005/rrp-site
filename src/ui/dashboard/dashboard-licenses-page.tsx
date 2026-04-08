import type { Locale } from "@/config/site.config";
import type { DashboardServer } from "@/lib/dashboard-model";
import { getDashboardCopy } from "@/ui/dashboard/dashboard-copy";
import { DashboardMessagePanel, DashboardPanel, DashboardSectionHeading, DashboardStatusPill } from "@/ui/dashboard/dashboard-primitives";

export function DashboardLicensesPage({ locale, server }: { locale: Locale; server: DashboardServer }) {
  const copy = getDashboardCopy(locale);
  const isEmpty = server.licenses.currentPlan.trim().length === 0 && server.licenses.availableLevel.trim().length === 0 && server.licenses.entitlementSummary.trim().length === 0 && server.licenses.entitlements.length === 0;
  if (isEmpty) return <DashboardMessagePanel title={copy.licenses.emptyTitle} body={copy.licenses.emptyBody} />;
  return (
    <DashboardPanel className="p-5 sm:p-6">
      <div className="space-y-4">
        <DashboardSectionHeading title={copy.licenses.summary} />
        <div className="grid gap-4 border-y border-white/[0.05] py-4 sm:grid-cols-2 xl:grid-cols-3">
          <div><p className="text-[11px] uppercase tracking-[0.2em] text-white/32">{copy.licenses.current}</p><p className="mt-2 text-sm text-white/78">{server.licenses.currentPlan}</p></div>
          <div><p className="text-[11px] uppercase tracking-[0.2em] text-white/32">{copy.licenses.available}</p><p className="mt-2 text-sm text-white/78">{server.licenses.availableLevel}</p></div>
          <div><p className="text-[11px] uppercase tracking-[0.2em] text-white/32">{copy.licenses.summary}</p><p className="mt-2 text-sm leading-6 text-white/56">{server.licenses.entitlementSummary}</p></div>
        </div>
        <div className="divide-y divide-white/[0.05]">
          {server.licenses.entitlements.map((item) => <div key={item.label} className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between"><p className="text-sm text-white/76">{item.label}</p><DashboardStatusPill tone={item.tone}>{item.value}</DashboardStatusPill></div>)}
        </div>
      </div>
    </DashboardPanel>
  );
}
