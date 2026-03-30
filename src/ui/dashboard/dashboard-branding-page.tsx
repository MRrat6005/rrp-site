import type { Locale } from "@/config/site.config";
import type { DashboardServer } from "@/lib/dashboard-mock";
import { getDashboardCopy } from "@/ui/dashboard/dashboard-copy";
import {
  DashboardMetricGrid,
  DashboardPanel,
  DashboardSectionIntro,
  DashboardStatusPill
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
    <div className="space-y-5">
      <DashboardPanel className="p-5 sm:p-6 lg:p-7">
        <DashboardSectionIntro
          eyebrow={copy.branding.eyebrow}
          title={copy.branding.title}
          body={copy.branding.body}
          aside={<DashboardStatusPill tone="muted">{copy.shared.previewLabel}</DashboardStatusPill>}
        />
      </DashboardPanel>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,0.92fr)_minmax(22rem,1.08fr)]">
        <DashboardPanel className="p-5 sm:p-6">
          <div className="space-y-5">
            {server.brandingFields.map((field) => (
              <div key={field.label} className="space-y-2 rounded-[1rem] border border-white/8 bg-white/[0.03] px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">{field.label}</p>
                <p className="text-base font-medium text-white/84">{field.value}</p>
                <p className="text-sm leading-6 text-white/54">{field.hint}</p>
              </div>
            ))}
          </div>
        </DashboardPanel>

        <DashboardPanel className="p-5 sm:p-6">
          <div className="space-y-4">
            <div className="rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
              <div
                className="rounded-[1.2rem] border border-white/10 p-4"
                style={{ background: `linear-gradient(135deg, ${server.accent}55, rgba(255,255,255,0.05))` }}
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-4">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-[1.1rem] border border-white/12 text-sm font-semibold text-white"
                      style={{ backgroundColor: `${server.accent}33` }}
                    >
                      {server.iconLabel}
                    </div>
                    <DashboardStatusPill tone="info">{server.environment}</DashboardStatusPill>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/46">
                      {server.plan}
                    </p>
                    <h2 className="[font-family:var(--font-display)] text-3xl font-semibold text-white">
                      {server.name}
                    </h2>
                    <p className="max-w-xl text-sm leading-7 text-white/70">{server.brandingPreviewNote}</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm leading-7 text-white/60">
              The preview stays product-focused and deliberately static. It exists to validate tone, hierarchy, and asset placement before any live upload or sync work is introduced.
            </p>
          </div>
        </DashboardPanel>
      </div>

      <DashboardMetricGrid items={server.brandingAssets} columns="md:grid-cols-3" />
    </div>
  );
}
