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
            <div className="divide-y divide-white/[0.05]">
              {server.branding.assets.map((asset) => (
                <div key={asset.label} className="py-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/32">
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
            <div className="divide-y divide-white/[0.05]">
              {server.branding.fields.map((field) => (
                <div key={field.label} className="py-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/32">
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
        <p className="border-t border-white/[0.05] pt-4 text-sm leading-6 text-white/54">
          {server.branding.note} {copy.branding.note}
        </p>
      </DashboardPanel>
    </div>
  );
}
