import Link from "next/link";

import {
  getProjectThemeStyle,
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
      markPath: siteConfig.visuals.projects[projectId].markPath,
      themeStyle: getProjectThemeStyle(projectId),
      ...copy
    };
  });

  const [leadProject, supportProject] = projects;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 pb-16 pt-10 sm:px-8 lg:gap-20 lg:px-10 lg:pb-20 lg:pt-14">
      <section className="section-frame reveal-up overflow-hidden">
        <div className="hero-aurora" />
        <div className="relative grid gap-10 xl:grid-cols-[minmax(0,1.08fr)_minmax(19rem,0.92fr)] xl:items-end">
          <div className="max-w-4xl space-y-7">
            <div className="space-y-5">
              <p className="eyebrow">{messages.home.eyebrow}</p>
              <h1 className="display-title max-w-4xl">{messages.home.title}</h1>
              <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
                {messages.home.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <Link href={dashboardHref} className="button-primary">
                {messages.home.primaryCta}
              </Link>
              <Link href={docsHref} className="button-secondary">
                {messages.home.secondaryCta}
              </Link>
            </div>
          </div>

          <aside className="glass-panel reveal-up reveal-delay-1">
            <div className="relative z-10">
              <p className="eyebrow">{messages.home.frameEyebrow}</p>
              <h2 className="mt-4 [font-family:var(--font-display)] text-2xl font-semibold text-ink sm:text-[2rem]">
                {messages.home.frameTitle}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
                {messages.home.frameBody}
              </p>
              <div className="section-divider mt-6 space-y-3 pt-5">
                {messages.home.stats.map((stat) => (
                  <div key={stat.label} className="project-stat-row">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/34">
                      {stat.label}
                    </span>
                    <span className="text-sm font-medium text-ink">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="space-y-7">
        <div className="max-w-3xl space-y-4 reveal-up">
          <p className="eyebrow">{messages.home.directionsEyebrow}</p>
          <h2 className="[font-family:var(--font-display)] text-3xl font-semibold text-ink sm:text-4xl">
            {messages.home.directionsTitle}
          </h2>
          <p className="text-base leading-8 text-muted">{messages.home.directionsIntro}</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)]">
          <Link
            href={leadProject.href}
            className="project-card project-card--feature hover-lift reveal-up reveal-delay-1"
            style={leadProject.themeStyle}
          >
            <div className="relative flex items-start justify-between gap-5">
              <div className="flex items-center gap-4">
                <LogoTile
                  shortLabel={leadProject.asset.shortLabel}
                  label={leadProject.asset.label}
                  imagePath={leadProject.markPath}
                />
                <div>
                  <p className="[font-family:var(--font-display)] text-2xl font-semibold text-ink">
                    {leadProject.title}
                  </p>
                  <p className="mt-2 text-sm text-white/54">{leadProject.categoryLabel}</p>
                </div>
              </div>
              <span className="project-tag">01</span>
            </div>

            <p className="relative mt-10 max-w-2xl text-2xl leading-9 text-ink">
              {leadProject.tagline}
            </p>
            <p className="relative mt-4 max-w-2xl text-sm leading-7 text-muted">
              {leadProject.summary}
            </p>
          </Link>

          <Link
            href={supportProject.href}
            className="project-card project-card--compact hover-lift reveal-up reveal-delay-2"
            style={supportProject.themeStyle}
          >
            <div className="relative flex items-start justify-between gap-5">
              <div className="flex items-center gap-4">
                <LogoTile
                  shortLabel={supportProject.asset.shortLabel}
                  label={supportProject.asset.label}
                  imagePath={supportProject.markPath}
                />
                <div>
                  <p className="[font-family:var(--font-display)] text-2xl font-semibold text-ink">
                    {supportProject.title}
                  </p>
                  <p className="mt-2 text-sm text-white/54">{supportProject.categoryLabel}</p>
                </div>
              </div>
              <span className="project-tag">02</span>
            </div>

            <p className="relative mt-10 max-w-2xl text-xl leading-8 text-ink">
              {supportProject.tagline}
            </p>
            <p className="relative mt-4 max-w-2xl text-sm leading-7 text-muted">
              {supportProject.summary}
            </p>
          </Link>
        </div>
      </section>

      <section className="section-divider reveal-up reveal-delay-2 grid gap-5 pt-8 md:grid-cols-3">
        {messages.home.notes.map((note) => (
          <article key={note.title} className="quiet-surface h-full p-6">
            <h2 className="relative [font-family:var(--font-display)] text-xl font-semibold text-ink">
              {note.title}
            </h2>
            <p className="relative mt-4 text-sm leading-7 text-muted">{note.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
