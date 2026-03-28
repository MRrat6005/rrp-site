import Link from "next/link";

import {
  projectOrder,
  siteConfig,
  type Locale
} from "@/config/site.config";
import { getLocalizedPath } from "@/lib/i18n";
import type { SiteMessages } from "@/messages/types";
import { LogoTile } from "@/ui/common/logo-tile";

interface HomePageProps {
  locale: Locale;
  messages: SiteMessages;
}

export function HomePage({ locale, messages }: HomePageProps) {
  const dashboardHref = getLocalizedPath(locale, siteConfig.ctaRoutes.dashboard);
  const docsHref = getLocalizedPath(locale, siteConfig.ctaRoutes.docs);

  const projects = projectOrder.map((projectId) => {
    const project = siteConfig.projects[projectId];
    const copy = messages.projects.items[projectId];

    return {
      ...project,
      asset: siteConfig.assetPlaceholders.projects[projectId],
      href: getLocalizedPath(locale, siteConfig.ctaRoutes.projects[projectId]),
      ...copy
    };
  });

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      <section className="section-frame overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(122,172,255,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(141,243,209,0.08),transparent_26%)]" />
        <div className="relative grid gap-10 xl:grid-cols-[minmax(0,1.12fr)_minmax(21rem,0.88fr)]">
          <div className="space-y-6">
            <p className="eyebrow">{messages.home.eyebrow}</p>
            <h1 className="display-title max-w-5xl">{messages.home.title}</h1>
            <p className="max-w-3xl text-base leading-8 text-muted sm:text-lg">
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

          <aside className="glass-panel">
            <p className="eyebrow">{messages.home.frameEyebrow}</p>
            <p className="mt-4 [font-family:var(--font-display)] text-2xl font-semibold text-ink">
              {messages.home.frameTitle}
            </p>
            <p className="mt-4 text-sm leading-7 text-muted">
              {messages.home.frameBody}
            </p>
            <div className="mt-6 space-y-3">
              {messages.home.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between gap-4 rounded-[1.2rem] border border-white/10 bg-white/[0.03] px-4 py-3"
                >
                  <span className="text-sm text-muted">{stat.label}</span>
                  <span className="text-sm font-medium text-ink">{stat.value}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div className="space-y-4">
          <p className="eyebrow">{messages.home.directionsEyebrow}</p>
          <h2 className="[font-family:var(--font-display)] text-3xl font-semibold text-ink sm:text-4xl">
            {messages.home.directionsTitle}
          </h2>
          <p className="max-w-2xl text-base leading-8 text-muted">
            {messages.home.directionsIntro}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={project.href}
              className="section-frame block p-6 transition hover:border-white/20 hover:bg-[rgba(12,16,24,0.82)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <LogoTile
                    shortLabel={project.asset.shortLabel}
                    label={project.asset.label}
                    size="sm"
                  />
                  <div>
                    <p className="[font-family:var(--font-display)] text-xl font-semibold text-ink">
                      {project.title}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.24em] text-white/42">
                      {project.categoryLabel}
                    </p>
                  </div>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/56">
                  {siteConfig.brand.shortName}
                </span>
              </div>
              <p className="mt-6 text-lg leading-8 text-ink">{project.tagline}</p>
              <p className="mt-4 text-sm leading-7 text-muted">{project.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {messages.home.notes.map((note) => (
          <article key={note.title} className="glass-panel h-full">
            <h2 className="[font-family:var(--font-display)] text-xl font-semibold text-ink">
              {note.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">{note.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
