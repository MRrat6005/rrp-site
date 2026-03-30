import type { Locale } from "@/config/site.config";
import type { DashboardServer, DashboardStatusEntry } from "@/lib/dashboard-mock";
import { getDashboardCopy } from "@/ui/dashboard/dashboard-copy";
import {
  DashboardPanel,
  DashboardSectionIntro,
  DashboardStatusPill
} from "@/ui/dashboard/dashboard-primitives";

interface DashboardStatusPageProps {
  locale: Locale;
  server: DashboardServer;
}

function StatusGroup({
  title,
  items
}: {
  title: string;
  items: DashboardStatusEntry[];
}) {
  return (
    <DashboardPanel className="h-full p-5 sm:p-6">
      <div className="space-y-4">
        <h2 className="[font-family:var(--font-display)] text-2xl font-semibold text-white">
          {title}
        </h2>
        <div className="grid gap-3">
          {items.map((item) => (
            <div key={item.label} className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-4 py-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <DashboardStatusPill tone={item.tone}>{item.value}</DashboardStatusPill>
              </div>
              <p className="mt-3 text-sm leading-6 text-white/56">{item.note}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardPanel>
  );
}

export function DashboardStatusPage({
  locale,
  server
}: DashboardStatusPageProps) {
  const copy = getDashboardCopy(locale);

  return (
    <div className="space-y-5">
      <DashboardPanel className="p-5 sm:p-6 lg:p-7">
        <DashboardSectionIntro
          eyebrow={copy.status.eyebrow}
          title={copy.status.title}
          body={copy.status.body}
          aside={<DashboardStatusPill tone="muted">{copy.shared.mockBadge}</DashboardStatusPill>}
        />
      </DashboardPanel>

      <div className="grid gap-5 xl:grid-cols-2">
        <StatusGroup title={copy.status.core} items={server.statusGroups.core} />
        <StatusGroup title={copy.status.dashboard} items={server.statusGroups.dashboard} />
        <StatusGroup title={copy.status.modules} items={server.statusGroups.modules} />
        <StatusGroup title={copy.status.integrations} items={server.statusGroups.integrations} />
      </div>
    </div>
  );
}
