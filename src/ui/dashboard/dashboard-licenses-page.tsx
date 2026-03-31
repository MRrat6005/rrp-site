import type { Locale } from "@/config/site.config";
import type { DashboardServer } from "@/lib/dashboard-mock";
import { getDashboardCopy } from "@/ui/dashboard/dashboard-copy";
import {
  DashboardPanel,
  DashboardSectionHeading,
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
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-3">
        <DashboardPanel className="p-5 sm:p-6">
          <DashboardSectionHeading title={copy.licenses.current} />
          <p className="mt-4 text-lg font-semibold text-white">{server.licenses.currentPlan}</p>
        </DashboardPanel>

        <DashboardPanel className="p-5 sm:p-6">
          <DashboardSectionHeading title={copy.licenses.available} />
          <p className="mt-4 text-lg font-semibold text-white">
            {server.licenses.availableLevel}
          </p>
        </DashboardPanel>

        <DashboardPanel className="p-5 sm:p-6">
          <DashboardSectionHeading title={copy.licenses.summary} />
          <p className="mt-4 text-sm leading-6 text-white/56">
            {server.licenses.entitlementSummary}
          </p>
        </DashboardPanel>
      </div>

      <DashboardPanel className="p-5 sm:p-6">
        <div className="space-y-4">
          <DashboardSectionHeading title="Entitlements" />
          <div className="space-y-2">
            {server.licenses.entitlements.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-3 rounded-[1rem] border border-white/[0.06] bg-white/[0.015] px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <p className="text-sm text-white/76">{item.label}</p>
                <DashboardStatusPill tone={item.tone}>{item.value}</DashboardStatusPill>
              </div>
            ))}
          </div>
        </div>
      </DashboardPanel>
    </div>
  );
}

