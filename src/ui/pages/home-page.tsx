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

  const [leadProject, supportProject] = projects;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 py-12 sm:px-8 lg:px-10 lg:gap-20 lg:py-16">
      <section className="relative overflow-hidden pt-4 lg:pt-10">
        <div className="absolute -left-28 top-0 h-72 w-72 rounded-full bg-[rgba(122,172,255,0.1)] blur-3xl" />
        <div className="absolute right-0 top-16 h-56 w-56 rounded-full bg-[rgba(141,243,209,0.05)] blur-3xl" />

        <div className="relative max-w-5xl space-y-7 reveal-up">
          <div className="space-y-6">
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

        <dl className="reveal-up reveal-delay-1 mt-12 grid gap-6 border-t border-white/[0.08] pt-6 sm:grid-cols-3">
          {messages.home.stats.map((stat) => (
            <div key={stat.label} className="space-y-2">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/36">
                {stat.label}
              </dt>
              <dd className="[font-family:var(--font-display)] text-lg font-medium text-ink">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="grid gap-10 xl:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
        <div className="space-y-4 reveal-up">
          <p className="eyebrow">{messages.home.directionsEyebrow}</p>
          <h2 className="[font-family:var(--font-display)] text-3xl font-semibold text-ink sm:text-4xl">
            {messages.home.directionsTitle}
          </h2>
          <p className="max-w-xl text-base leading-8 text-muted">
            {messages.home.directionsIntro}
          </p>
        </div>

        <div className="grid gap-5">
          <Link
            href={leadProject.href}
            className="reveal-up reveal-delay-1 group rounded-[2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(12,16,25,0.82),rgba(8,11,18,0.92))] p-7 transition duration-300 hover:-translate-y-px hover:border-white/[0.16] sm:p-8"
          >
            <div className="flex items-start justify-between gap-5">
              <div className="flex items-center gap-4">
                <LogoTile
                  shortLabel={leadProject.asset.shortLabel}
                  label={leadProject.asset.label}
                />
                <div>
                  <p className="[font-family:var(--font-display)] text-2xl font-semibold text-ink">
                    {leadProject.title}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-white/38">
                    {leadProject.categoryLabel}
                  </p>
                </div>
              </div>
              <span className="text-sm text-white/34 transition duration-300 group-hover:text-white/56">
                01
              </span>
            </div>

            <p className="mt-8 max-w-2xl text-2xl leading-9 text-ink">
              {leadProject.tagline}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
              {leadProject.summary}
            </p>
          </Link>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[minmax(17rem,0.38fr)_minmax(0,0.62fr)]">
        <div className="reveal-up reveal-delay-1 rounded-[1.75rem] border border-white/[0.08] bg-white/[0.02] p-6 sm:p-7">
          <p className="eyebrow">{messages.home.frameEyebrow}</p>
          <h2 className="mt-4 [font-family:var(--font-display)] text-2xl font-semibold text-ink sm:text-[2rem]">
            {messages.home.frameTitle}
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
            {messages.home.frameBody}
          </p>
        </div>

        <Link
          href={supportProject.href}
          className="reveal-up reveal-delay-2 group rounded-[2rem] border border-white/[0.08] bg-[rgba(10,13,20,0.64)] p-7 transition duration-300 hover:-translate-y-px hover:border-white/[0.16] sm:p-8"
        >
          <div className="flex items-start justify-between gap-5">
            <div className="flex items-center gap-4">
              <LogoTile
                shortLabel={supportProject.asset.shortLabel}
                label={supportProject.asset.label}
              />
              <div>
                <p className="[font-family:var(--font-display)] text-2xl font-semibold text-ink">
                  {supportProject.title}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-white/38">
                  {supportProject.categoryLabel}
                </p>
              </div>
            </div>
            <span className="text-sm text-white/34 transition duration-300 group-hover:text-white/56">
              02
            </span>
          </div>

          <p className="mt-8 max-w-2xl text-xl leading-8 text-ink">
            {supportProject.tagline}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            {supportProject.summary}
          </p>
        </Link>
      </section>

      <section className="reveal-up reveal-delay-2 grid gap-5 border-t border-white/[0.08] pt-8 md:grid-cols-3">
        {messages.home.notes.map((note) => (
          <article
            key={note.title}
            className="rounded-[1.4rem] border border-white/[0.07] bg-white/[0.02] p-5"
          >
            <h2 className="[font-family:var(--font-display)] text-xl font-semibold text-ink">
              {note.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">{note.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
