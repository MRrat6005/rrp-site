import Link from "next/link";

import { siteConfig, type Locale } from "@/config/site.config";
import { getLocalizedPath } from "@/lib/i18n";
import type { SiteMessages } from "@/messages/types";
import { LogoTile } from "@/ui/common/logo-tile";

interface CrownEntryPageProps {
  locale: Locale;
  messages: SiteMessages;
}

export function CrownEntryPage({
  locale,
  messages
}: CrownEntryPageProps) {
  const dashboardHref = getLocalizedPath(locale, siteConfig.ctaRoutes.dashboard);
  const project = siteConfig.projects.crown;
  const asset = siteConfig.assetPlaceholders.projects.crown;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-10 sm:px-8 lg:px-10 lg:gap-14 lg:py-14">
      <section className="section-frame overflow-hidden reveal-up">
        <div className="hero-aurora" />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.16fr)_minmax(19rem,0.84fr)] lg:gap-10">
          <div className="space-y-6">
            <p className="eyebrow">{messages.crownEntry.eyebrow}</p>
            <div className="flex items-center gap-4">
              <LogoTile shortLabel={asset.shortLabel} label={asset.label} />
              <div>
                <p className="[font-family:var(--font-display)] text-2xl font-semibold text-ink sm:text-3xl">
                  {project.title}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-white/42">
                  {messages.projects.items.crown.categoryLabel}
                </p>
              </div>
            </div>
            <h1 className="display-title max-w-4xl text-[clamp(2.8rem,6vw,4.75rem)]">
              {messages.crownEntry.title}
            </h1>
            <p className="max-w-3xl text-xl leading-8 text-ink sm:text-2xl sm:leading-9">
              {messages.crownEntry.intro}
            </p>
            <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
              {messages.crownEntry.summary}
            </p>
            <div className="pt-2">
              <Link href={dashboardHref} className="button-primary">
                {messages.nav.openDashboard}
              </Link>
            </div>
          </div>

          <aside className="glass-panel reveal-up reveal-delay-1">
            <div className="relative z-10">
              <p className="eyebrow">{messages.crownEntry.shell.eyebrow}</p>
              <p className="mt-4 [font-family:var(--font-display)] text-2xl font-semibold text-ink sm:text-[2rem]">
                {messages.crownEntry.shell.title}
              </p>
              <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
                {messages.crownEntry.shell.body}
              </p>
              <div className="mt-6 space-y-3">
                {messages.crownEntry.shell.items?.map((item) => (
                  <div
                    key={item.label}
                    className="quiet-surface flex items-center justify-between gap-4 px-4 py-3"
                  >
                    <span className="text-sm text-muted">{item.label}</span>
                    <span className="text-sm font-medium text-ink">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {messages.crownEntry.capabilities.map((item, index) => (
          <article
            key={item.title}
            className={`quiet-surface hover-lift h-full reveal-up ${index === 1 ? "reveal-delay-1" : index === 2 ? "reveal-delay-2" : ""}`}
          >
            <h2 className="relative [font-family:var(--font-display)] text-xl font-semibold text-ink">
              {item.title}
            </h2>
            <p className="relative mt-4 text-sm leading-7 text-muted">{item.body}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(16rem,0.34fr)_minmax(0,0.66fr)] lg:gap-8">
        <div className="reveal-up reveal-delay-1 space-y-4">
          <p className="eyebrow">{messages.projects.items.crown.surface.eyebrow}</p>
          <h2 className="[font-family:var(--font-display)] text-3xl font-semibold text-ink sm:text-4xl">
            {messages.projects.items.crown.surface.title}
          </h2>
          <p className="max-w-xl text-base leading-8 text-muted">
            {messages.projects.items.crown.surface.body}
          </p>
          <div className="grid gap-3 pt-1 sm:grid-cols-3 lg:grid-cols-1">
            {messages.crownEntry.stats.map((stat) => (
              <div key={stat.label} className="quiet-surface px-4 py-4">
                <p className="relative text-[10px] uppercase tracking-[0.28em] text-white/36">
                  {stat.label}
                </p>
                <p className="relative mt-3 [font-family:var(--font-display)] text-lg font-medium text-ink">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="quiet-surface reveal-up reveal-delay-2 overflow-hidden rounded-[2rem] p-0 backdrop-blur-xl">
          {messages.crownEntry.flow.map((item, index) => (
            <article
              key={item.title}
              className={`relative px-6 py-6 sm:px-7 ${index > 0 ? "border-t border-white/[0.08]" : ""}`}
            >
              <h2 className="[font-family:var(--font-display)] text-2xl font-semibold text-ink">
                {item.title}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-muted sm:text-base">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
