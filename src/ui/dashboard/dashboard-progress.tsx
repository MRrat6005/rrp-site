"use client";

import Link from "next/link";

import { siteConfig, type Locale } from "@/config/site.config";
import type { DashboardProgressJob, DashboardProgressPhaseState, DashboardServer } from "@/lib/dashboard-model";
import { getLocalizedPath } from "@/lib/i18n";
import { LogoTile } from "@/ui/common/logo-tile";
import { DashboardStatusPill, cx } from "@/ui/dashboard/dashboard-primitives";

const progressCopy = {
  en: {
    entryEyebrow: "RRP live sync",
    applyEyebrow: "Live apply",
    retry: "Retry",
    dismiss: "Dismiss",
    backToServers: "Back to servers"
  },
  ru: {
    entryEyebrow: "RRP live sync",
    applyEyebrow: "Live apply",
    retry: "Повторить",
    dismiss: "Закрыть",
    backToServers: "К серверам"
  }
} as const;

function getCopy(locale: Locale) {
  return progressCopy[locale];
}

function getPhaseClassName(state: DashboardProgressPhaseState) {
  switch (state) {
    case "complete":
      return "border-white/18 bg-white/72 shadow-[0_0_18px_rgba(255,255,255,0.12)]";
    case "active":
      return "border-white/20 bg-[linear-gradient(90deg,rgba(255,255,255,0.36),rgba(255,255,255,0.9),rgba(255,255,255,0.36))] shadow-[0_0_22px_rgba(255,255,255,0.18)]";
    case "error":
      return "border-rose-200/26 bg-rose-200/72 shadow-[0_0_18px_rgba(251,113,133,0.16)]";
    default:
      return "border-white/[0.05] bg-white/[0.08]";
  }
}

function getLabelClassName(state: DashboardProgressPhaseState) {
  switch (state) {
    case "complete":
      return "text-white/72";
    case "active":
      return "text-white/92";
    case "error":
      return "text-rose-100/88";
    default:
      return "text-white/28";
  }
}

function DashboardPhaseBar({ progress }: { progress: DashboardProgressJob }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
        {progress.phases.map((phase) => (
          <div key={phase.key} className="space-y-2">
            <div className={cx("h-2 rounded-full border transition duration-300", getPhaseClassName(phase.state))} />
            <p className={cx("text-[10px] uppercase tracking-[0.22em] transition", getLabelClassName(phase.state))}>{phase.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardServerEntryGate({
  locale,
  onRetry,
  progress,
  server
}: {
  locale: Locale;
  onRetry?: (() => void) | undefined;
  progress: DashboardProgressJob;
  server?: DashboardServer | null;
}) {
  const copy = getCopy(locale);
  const backHref = getLocalizedPath(locale, "dashboard/servers");

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07080a] text-white">
      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(7, 8, 10, 0.48) 0%, rgba(7, 8, 10, 0.88) 100%), url(${siteConfig.visuals.backgrounds.dashboardEntry.image})`,
          backgroundPosition: siteConfig.visuals.backgrounds.dashboardEntry.position,
          backgroundSize: siteConfig.visuals.backgrounds.dashboardEntry.size
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_28%),rgba(8,9,11,0.76)] backdrop-blur-2xl" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1240px] items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-[720px] rounded-[2rem] border border-white/[0.08] bg-[rgba(10,11,13,0.72)] p-6 shadow-[0_24px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <div className="space-y-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <LogoTile
                  shortLabel={siteConfig.brand.shortName}
                  label={siteConfig.brand.fullName}
                  imagePath={siteConfig.visuals.brand.markPath}
                  size="md"
                  className="bg-white/[0.06]"
                />
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-white/34">{copy.entryEyebrow}</p>
                  <div className="space-y-1">
                    <h1 className="text-[1.8rem] font-medium leading-tight text-white/94 sm:text-[2.2rem]">{progress.title}</h1>
                    <p className="max-w-[36rem] text-sm leading-6 text-white/58">{progress.detail ?? (server ? server.syncNote || server.description : null) ?? "Live status is being refreshed before the workspace opens."}</p>
                  </div>
                </div>
              </div>
              <DashboardStatusPill tone={progress.isFailure ? "warning" : progress.isTerminal ? "positive" : "info"}>{progress.statusLabel}</DashboardStatusPill>
            </div>

            <div className="rounded-[1.5rem] border border-white/[0.06] bg-white/[0.03] p-5 sm:p-6">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-3 text-sm text-white/64">
                  <span>{server?.name ?? siteConfig.brand.dashboardBrand}</span>
                  {server?.plan ? <span className="text-white/18">/</span> : null}
                  {server?.plan ? <span>{server.plan}</span> : null}
                </div>
                <DashboardPhaseBar progress={progress} />
              </div>
            </div>

            {progress.isFailure && onRetry ? (
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={onRetry}
                  className="inline-flex items-center justify-center rounded-full border border-white/[0.08] bg-white px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-black transition hover:bg-white/90"
                >
                  {copy.retry}
                </button>
                <Link href={backHref} className="inline-flex items-center justify-center rounded-full border border-white/[0.08] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/72 transition hover:bg-white/[0.03] hover:text-white">
                  {copy.backToServers}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardPageApplyOverlay({
  locale,
  onDismiss,
  onRetry,
  progress
}: {
  locale: Locale;
  onDismiss?: () => void;
  onRetry?: () => void;
  progress: DashboardProgressJob;
}) {
  const copy = getCopy(locale);

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center rounded-[1.6rem] bg-[rgba(7,8,10,0.68)] p-4 backdrop-blur-xl">
      <div className="w-full max-w-[540px] rounded-[1.5rem] border border-white/[0.08] bg-[rgba(10,11,13,0.82)] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.34)] sm:p-6">
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/34">{copy.applyEyebrow}</p>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1">
                <h2 className="text-lg font-medium text-white/94">{progress.title}</h2>
                <p className="text-sm leading-6 text-white/56">{progress.detail ?? "The current page is waiting for the live apply job to finish."}</p>
              </div>
              <DashboardStatusPill tone={progress.isFailure ? "warning" : progress.isTerminal ? "positive" : "info"}>{progress.statusLabel}</DashboardStatusPill>
            </div>
          </div>
          <DashboardPhaseBar progress={progress} />
          {progress.isFailure && onRetry ? (
            <div className="flex flex-wrap gap-3 pt-1">
              {onRetry ? (
                <button
                  type="button"
                  onClick={onRetry}
                  className="inline-flex items-center justify-center rounded-full border border-white/[0.08] bg-white px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-black transition hover:bg-white/90"
                >
                  {copy.retry}
                </button>
              ) : null}
              {onDismiss ? (
                <button
                  type="button"
                  onClick={onDismiss}
                  className="inline-flex items-center justify-center rounded-full border border-white/[0.08] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/72 transition hover:bg-white/[0.03] hover:text-white"
                >
                  {copy.dismiss}
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

