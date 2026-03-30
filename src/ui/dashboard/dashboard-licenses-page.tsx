import type { Locale } from "@/config/site.config";
import type { DashboardServer } from "@/lib/dashboard-mock";
import { getDashboardCopy } from "@/ui/dashboard/dashboard-copy";
import {
  DashboardPanel,
  DashboardSectionIntro,
  DashboardStatusPill
} from "@/ui/dashboard/dashboard-primitives";

interface DashboardLicensesPageProps {
  locale: Locale;
  server: DashboardServer;
}

export function DashboardLicensesPage({
  locale,
  server
}: DashboardLicensesPageProps) {
  const copy = getDashboardCopy(locale);

  return (
    <div className="space-y-5">
      <DashboardPanel className="p-5 sm:p-6 lg:p-7">
        <DashboardSectionIntro
          eyebrow={copy.licenses.eyebrow}
          title={copy.licenses.title}
          body={copy.licenses.body}
          aside={<DashboardStatusPill tone="muted">{server.plan}</DashboardStatusPill>}
        />
      </DashboardPanel>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(22rem,1.1fr)]">
        <DashboardPanel className="p-5 sm:p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">Current plan</p>
              <h2 className="[font-family:var(--font-display)] text-3xl font-semibold text-white">{server.plan}</h2>
              <p className="text-sm leading-7 text-white/62">{server.licenseSummary}</p>
            </div>
            <div className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-4 py-4 text-sm text-white/72">
              {server.licenseRenewal}
            </div>
            <button
              type="button"
              className="rounded-[1rem] border border-white/12 bg-white/[0.07] px-4 py-3 text-sm text-white transition hover:border-white/18 hover:bg-white/[0.1]"
            >
              {copy.shared.upgradeCta}
            </button>
          </div>
        </DashboardPanel>

        <DashboardPanel className="p-0 overflow-hidden">
          <div className="grid grid-cols-[minmax(10rem,1fr)_minmax(10rem,0.72fr)_minmax(10rem,0.9fr)] border-b border-white/8 bg-white/[0.03] px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/42 sm:px-6">
            <div>Feature</div>
            <div>{copy.licenses.freeLabel}</div>
            <div>{copy.licenses.fullLabel}</div>
          </div>
          {server.licenseRows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[minmax(10rem,1fr)_minmax(10rem,0.72fr)_minmax(10rem,0.9fr)] gap-4 border-b border-white/8 px-5 py-4 text-sm text-white/72 last:border-b-0 sm:px-6"
            >
              <div className="font-medium text-white">{row.label}</div>
              <div>{row.free}</div>
              <div>{row.full}</div>
            </div>
          ))}
        </DashboardPanel>
      </div>

      <DashboardPanel className="p-5 sm:p-6">
        <DashboardSectionIntro title={copy.shared.seatLabel} body="Show entitlements as a premium summary rather than a billing flow in this shell pass." />
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {server.entitlements.map((item) => (
            <div key={item.label} className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-4 py-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <DashboardStatusPill tone={item.included ? "positive" : "muted"}>{item.value}</DashboardStatusPill>
              </div>
            </div>
          ))}
        </div>
      </DashboardPanel>
    </div>
  );
}
