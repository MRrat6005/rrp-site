import Link from "next/link";

import { siteConfig, type Locale } from "@/config/site.config";
import { getLocalizedPath } from "@/lib/i18n";
import type { SiteMessages } from "@/messages/types";

interface HomePageProps {
  locale: Locale;
  messages: SiteMessages;
}

export function HomePage({ locale, messages }: HomePageProps) {
  const dashboardHref = getLocalizedPath(locale, siteConfig.dashboardSegment);
  const docsHref = getLocalizedPath(locale, "docs");

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      <section className="section-frame overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(122,172,255,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(141,243,209,0.12),transparent_30%)]" />
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
          <div className="space-y-6">
            <p className="eyebrow">{messages.home.eyebrow}</p>
            <h1 className="display-title max-w-4xl">{messages.home.title}</h1>
            <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
              {messages.home.subtitle}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href={dashboardHref} className="button-primary">
                {messages.home.primaryCta}
              </Link>
              <Link href={docsHref} className="button-secondary">
                {messages.home.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="glass-panel min-h-full">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="eyebrow">{messages.projects.introLabel}</p>
                  <p className="mt-3 [font-family:var(--font-display)] text-2xl font-semibold text-ink">
                    {messages.home.spotlightTitle}
                  </p>
                </div>
                <div className="grid h-16 w-16 grid-cols-2 gap-2">
                  <span className="rounded-2xl border border-white/10 bg-white/5" />
                  <span className="rounded-2xl border border-white/10 bg-[rgba(122,172,255,0.24)]" />
                  <span className="rounded-2xl border border-white/10 bg-[rgba(141,243,209,0.16)]" />
                  <span className="rounded-2xl border border-white/10 bg-white/5" />
                </div>
              </div>
              <p className="pt-5 text-sm leading-7 text-muted">
                {messages.home.spotlightBody}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {messages.home.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                      {stat.label}
                    </p>
                    <p className="mt-3 [font-family:var(--font-display)] text-lg font-semibold text-ink">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.9fr)]">
        <div className="grid gap-4 md:grid-cols-3">
          {messages.home.pillars.map((pillar) => (
            <article key={pillar.title} className="glass-panel h-full">
              <h2 className="[font-family:var(--font-display)] text-xl font-semibold text-ink">
                {pillar.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">{pillar.body}</p>
            </article>
          ))}
        </div>

        <aside className="glass-panel">
          <p className="eyebrow">Projects</p>
          <div className="mt-6 grid gap-3">
            {siteConfig.projects.map((project) => (
              <Link
                key={project.id}
                href={getLocalizedPath(locale, `projects/${project.slug}`)}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(122,172,255,0.20),rgba(255,255,255,0.04))] text-xs font-semibold tracking-[0.22em] text-ink">
                    {project.mark}
                  </span>
                  <div>
                    <p className="[font-family:var(--font-display)] text-lg font-semibold text-ink">
                      {project.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      {messages.projects.items[project.id].tagline}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}


