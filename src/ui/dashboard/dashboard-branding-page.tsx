import type { Locale } from "@/config/site.config";
import type { DashboardServer } from "@/lib/dashboard-mock";
import { getDashboardCopy } from "@/ui/dashboard/dashboard-copy";
import {
  DashboardPanel,
  DashboardSectionHeading
} from "@/ui/dashboard/dashboard-primitives";

interface DashboardBrandingPageProps {
  locale: Locale;
  server: DashboardServer;
}

export function DashboardBrandingPage({
  locale,
  server
}: DashboardBrandingPageProps) {
  const copy = getDashboardCopy(locale);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <DashboardPanel className="p-5 sm:p-6">
          <div className="space-y-4">
            <DashboardSectionHeading title={copy.branding.assets} />
            <div className="space-y-2">
              {server.branding.assets.map((asset) => (
                <div
                  key={asset.label}
                  className="rounded-[1rem] bg-white/[0.015] px-4 py-4"
                >
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/34">
                    {asset.label}
                  </p>
                  <p className="mt-2 text-sm font-medium text-white/82">{asset.value}</p>
                  <p className="mt-1 text-sm leading-6 text-white/50">{asset.note}</p>
                </div>
              ))}
            </div>
          </div>
        </DashboardPanel>

        <DashboardPanel className="p-5 sm:p-6">
          <div className="space-y-4">
            <DashboardSectionHeading title={copy.branding.identity} />
            <div className="space-y-2">
              {server.branding.fields.map((field) => (
                <div
                  key={field.label}
                  className="rounded-[1rem] bg-white/[0.015] px-4 py-4"
                >
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/34">
                    {field.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/76">{field.value}</p>
                </div>
              ))}
            </div>
          </div>
        </DashboardPanel>
      </div>

      <DashboardPanel className="p-5 sm:p-6">
        <p className="text-sm leading-6 text-white/54">
          {server.branding.note} {copy.branding.note}
        </p>
      </DashboardPanel>
    </div>
  );
}


