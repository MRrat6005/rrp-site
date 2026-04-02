import Link from "next/link";

import { siteConfig, type Locale } from "@/config/site.config";
import { getLocalizedPath } from "@/lib/i18n";
import type { SiteMessages } from "@/messages/types";
import { LogoTile } from "@/ui/common/logo-tile";
import { ConfigurableBackdrop } from "@/ui/layout/configurable-backdrop";

interface LoginPageProps {
  locale: Locale;
  messages: SiteMessages;
}

export function LoginPage({ locale, messages }: LoginPageProps) {
  const workspaceHref = getLocalizedPath(locale, siteConfig.ctaRoutes.workspace);
  const publicCrownHref = getLocalizedPath(locale, siteConfig.ctaRoutes.projects.crown);
  const crownAsset = siteConfig.assetPlaceholders.projects.crown;
  const crownMarkPath = siteConfig.visuals.projects.crown.markPath;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      <section
        className="workspace-shell reveal-up isolate overflow-hidden px-6 py-7 sm:px-7 sm:py-8 lg:px-8 lg:py-9"
        data-reveal
      >
        <ConfigurableBackdrop background={siteConfig.visuals.backgrounds.dashboardEntry} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_24%),linear-gradient(120deg,rgba(4,6,10,0.16),rgba(6,8,12,0.58)_45%,rgba(6,8,11,0.88))]" />
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)]" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(21.5rem,0.92fr)] lg:items-center lg:gap-12">
          <div className="flex min-h-full flex-col gap-8 lg:py-2">
            <div className="max-w-2xl space-y-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/38">
                {messages.login.eyebrow}
              </p>

              <div className="max-w-2xl rounded-full border border-white/[0.08] bg-[rgba(10,12,17,0.56)] px-4 py-3 backdrop-blur-xl sm:px-5">
                <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] sm:gap-4">
                  <span className="text-white/42">{messages.login.bridgeFrom}</span>
                  <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(255,255,255,0.1),rgba(255,255,255,0.03))]" />
                  <span className="text-white/82">Discord</span>
                  <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(255,255,255,0.1),rgba(255,255,255,0.03))]" />
                  <span className="text-right text-white/54">{messages.login.bridgeTo}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="display-title max-w-[12ch]">{messages.login.title}</h1>
                <p className="max-w-xl text-base leading-8 text-white/64 sm:text-lg">
                  {messages.login.intro}
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(9,11,15,0.82),rgba(9,10,13,0.6))] p-4 backdrop-blur-xl sm:p-5">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_18%),radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_26%)]" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <LogoTile
                      shortLabel={crownAsset.shortLabel}
                      label={crownAsset.label}
                      imagePath={crownMarkPath}
                      size="sm"
                      className="bg-white/[0.02]"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white/84">
                        {siteConfig.brand.dashboardBrand}
                      </p>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/30">
                        {messages.login.transitionNote}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/30">
                    {messages.login.bridgeTo}
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-[11rem_minmax(0,1fr)]">
                  <div className="rounded-[1.15rem] border border-white/[0.05] bg-white/[0.025] p-3">
                    <div className="space-y-2.5">
                      <span className="block h-8 rounded-[0.85rem] border border-white/[0.06] bg-white/[0.03]" />
                      <span className="block h-8 rounded-[0.85rem] border border-white/[0.04] bg-white/[0.015]" />
                      <span className="block h-8 rounded-[0.85rem] border border-white/[0.04] bg-white/[0.015]" />
                      <span className="block h-8 rounded-[0.85rem] border border-white/[0.04] bg-white/[0.015]" />
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <div className="rounded-[1.15rem] border border-white/[0.05] bg-[rgba(255,255,255,0.03)] p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-3">
                          <span className="h-2 w-2 rounded-full bg-white/28" />
                          <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(255,255,255,0.08),transparent)]" />
                          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/32">
                            {siteConfig.brand.dashboardBrand}
                          </span>
                        </div>
                        <span className="block h-3.5 w-40 rounded-full bg-white/[0.08]" />
                        <span className="block h-2.5 w-full max-w-[18rem] rounded-full bg-white/[0.05]" />
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[1.15rem] border border-white/[0.05] bg-white/[0.02] p-4">
                        <span className="block h-2.5 w-16 rounded-full bg-white/[0.06]" />
                        <span className="mt-3 block h-7 rounded-[0.8rem] border border-white/[0.04] bg-white/[0.025]" />
                      </div>
                      <div className="rounded-[1.15rem] border border-white/[0.05] bg-white/[0.02] p-4">
                        <span className="block h-2.5 w-20 rounded-full bg-white/[0.06]" />
                        <span className="mt-3 block h-7 rounded-[0.8rem] border border-white/[0.04] bg-white/[0.025]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="self-center" data-reveal>
            <div className="glass-panel glass-panel-strong overflow-hidden rounded-[1.75rem] border-white/[0.08] bg-[linear-gradient(180deg,rgba(11,13,17,0.94),rgba(9,10,13,0.98))] p-6 sm:p-7">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_20%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_32%)]" />

              <div className="relative z-10 flex h-full flex-col gap-6">
                <div className="space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <LogoTile
                        shortLabel={crownAsset.shortLabel}
                        label={crownAsset.label}
                        imagePath={crownMarkPath}
                        size="md"
                        className="bg-white/[0.02]"
                      />
                      <div className="min-w-0">
                        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/36">
                          {messages.login.panelTitle}
                        </p>
                        <p className="[font-family:var(--font-display)] text-2xl font-semibold tracking-[-0.04em] text-ink sm:text-[2.15rem]">
                          {siteConfig.brand.dashboardBrand}
                        </p>
                      </div>
                    </div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/34">
                      Discord
                    </p>
                  </div>

                  <p className="max-w-sm text-sm leading-7 text-white/66 sm:text-base">
                    {messages.login.panelBody}
                  </p>

                  <div className="grid gap-3 border-y border-white/[0.06] py-4 sm:grid-cols-2">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/28">
                        {messages.login.bridgeFrom}
                      </p>
                      <p className="mt-2 text-sm text-white/70">Discord</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/28">
                        {messages.login.bridgeTo}
                      </p>
                      <p className="mt-2 text-sm text-white/70">{siteConfig.brand.dashboardBrand}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/34">
                    {messages.login.authNotice}
                  </p>
                  <button
                    type="button"
                    aria-label={messages.login.primaryCta}
                    aria-disabled="true"
                    className="button-primary flex w-full cursor-default items-center justify-between px-5 py-4"
                  >
                    <span>{messages.login.primaryCta}</span>
                    <span className="text-[10px] uppercase tracking-[0.24em] text-slate-600">
                      Discord
                    </span>
                  </button>
                  <p className="text-sm leading-6 text-white/48">{messages.login.summary}</p>
                </div>

                <div className="space-y-3 border-t border-white/[0.06] pt-4">
                  <Link
                    href={workspaceHref}
                    className="button-secondary flex w-full justify-between px-5 py-3.5"
                  >
                    <span>{messages.login.secondaryCta}</span>
                    <span className="text-[10px] uppercase tracking-[0.24em] text-white/38">
                      {siteConfig.brand.dashboardBrand}
                    </span>
                  </Link>
                  <Link
                    href={publicCrownHref}
                    className="inline-flex items-center justify-between gap-3 rounded-full px-1 text-sm text-white/48 transition duration-300 hover:text-white/72"
                  >
                    <span>{messages.nav.backToSite}</span>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-white/28">
                      {messages.login.bridgeFrom}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
