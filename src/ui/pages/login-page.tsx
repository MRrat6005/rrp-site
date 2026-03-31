import Link from "next/link";

import { siteConfig, type Locale } from "@/config/site.config";
import { getLocalizedPath } from "@/lib/i18n";
import type { SiteMessages } from "@/messages/types";
import { ConfigurableBackdrop } from "@/ui/layout/configurable-backdrop";

interface LoginPageProps {
  locale: Locale;
  messages: SiteMessages;
}

export function LoginPage({ locale, messages }: LoginPageProps) {
  const workspaceHref = getLocalizedPath(locale, siteConfig.ctaRoutes.workspace);
  const legalLinks = siteConfig.legalRoutes.map((route) => ({
    href: getLocalizedPath(locale, route.segment),
    label: messages.footer[route.key]
  }));

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10 lg:gap-10 lg:py-14">
      <section className="workspace-shell reveal-up isolate overflow-hidden" data-reveal>
        <ConfigurableBackdrop background={siteConfig.visuals.backgrounds.dashboardEntry} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,6,10,0.08),rgba(5,7,11,0.28)_44%,rgba(5,7,11,0.62))]" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(20rem,0.88fr)] lg:gap-12">
          <div className="flex min-h-full flex-col justify-between gap-10">
            <div className="max-w-2xl space-y-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/38">
                {messages.login.eyebrow}
              </p>
              <h1 className="display-title max-w-3xl">{messages.login.title}</h1>
              <p className="max-w-xl text-base leading-8 text-ink sm:text-lg">
                {messages.login.intro}
              </p>
              <p className="max-w-xl text-sm leading-7 text-white/54 sm:text-base">
                {messages.login.summary}
              </p>
            </div>

            <div className="max-w-2xl rounded-[1.35rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,13,18,0.54),rgba(9,11,16,0.34))] px-5 py-4 backdrop-blur-xl sm:px-6">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/34">
                  {messages.login.bridgeFrom}
                </span>
                <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/58">
                  {messages.login.bridgeTo}
                </span>
              </div>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">
                {messages.login.transitionNote}
              </p>
            </div>
          </div>

          <aside
            className="glass-panel glass-panel-strong hover-lift-sm self-start overflow-hidden rounded-[1.55rem] border-white/[0.1] bg-[linear-gradient(180deg,rgba(12,14,18,0.92),rgba(9,10,13,0.94))] p-6 sm:p-7"
            data-reveal
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_20%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_34%)]" />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/36">
                    {messages.login.panelTitle}
                  </p>
                  <p className="[font-family:var(--font-display)] text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-[2.3rem]">
                    {siteConfig.brand.dashboardBrand}
                  </p>
                </div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/34">
                  Discord
                </p>
              </div>

              <p className="mt-5 max-w-sm text-sm leading-7 text-white/66 sm:text-base">
                {messages.login.panelBody}
              </p>

              <div className="mt-6 rounded-[1.2rem] border border-white/[0.08] bg-white/[0.03] p-4">
                <p className="text-xs leading-6 text-white/52">{messages.login.authNotice}</p>
                <button
                  type="button"
                  disabled
                  aria-label={messages.login.primaryCta}
                  className="button-primary mt-4 flex w-full cursor-not-allowed items-center justify-between px-5 py-4 opacity-100"
                >
                  <span>{messages.login.primaryCta}</span>
                  <span className="text-[10px] uppercase tracking-[0.24em] text-slate-600">
                    Discord
                  </span>
                </button>
                <Link
                  href={workspaceHref}
                  className="button-secondary mt-3 flex w-full justify-between px-5 py-3.5"
                >
                  <span>{messages.login.secondaryCta}</span>
                  <span className="text-[10px] uppercase tracking-[0.24em] text-white/38">
                    CROWN
                  </span>
                </Link>
              </div>

              <p className="mt-5 text-xs leading-6 text-white/42">{messages.login.legalNote}</p>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/[0.08] pt-4 text-sm text-white/56">
                {legalLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="transition duration-300 hover:text-ink"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
