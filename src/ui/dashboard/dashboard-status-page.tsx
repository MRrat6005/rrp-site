import type { Locale } from "@/config/site.config";
import type { DashboardServer } from "@/lib/dashboard-mock";
import { getDashboardCopy } from "@/ui/dashboard/dashboard-copy";
import {
  DashboardMessagePanel,
  DashboardPanel,
  DashboardSectionHeading,
  DashboardStatusPill
} from "@/ui/dashboard/dashboard-primitives";

interface DashboardStatusPageProps {
  locale: Locale;
  server: DashboardServer;
}

export function DashboardStatusPage({
  locale,
  server
}: DashboardStatusPageProps) {
  const copy = getDashboardCopy(locale);

  if (server.status.length === 0) {
    return (
      <DashboardMessagePanel
        title={copy.status.emptyTitle}
        body={copy.status.emptyBody}
      />
    );
  }

  return (
    <div className="space-y-4">
      <DashboardPanel className="p-5 sm:p-6">
        <p className="text-sm leading-6 text-white/54">{copy.status.note}</p>
      </DashboardPanel>

      <div className="grid gap-4 lg:grid-cols-2">
        {server.status.map((group) => (
          <DashboardPanel key={group.key} className="p-5 sm:p-6">
            <div className="space-y-4">
              <DashboardSectionHeading title={group.title} />
              <div className="divide-y divide-white/[0.05]">
                {group.items.map((item) => (
                  <div key={item.label} className="py-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-white/88">{item.label}</p>
                        <p className="mt-1 text-sm leading-6 text-white/50">
                          {item.note}
                        </p>
                      </div>
                      <DashboardStatusPill tone={item.tone}>{item.value}</DashboardStatusPill>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DashboardPanel>
        ))}
      </div>
    </div>
  );
}
