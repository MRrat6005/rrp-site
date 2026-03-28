import Link from "next/link";

import {
  siteConfig,
  type Locale,
  type ProjectId
} from "@/config/site.config";
import { getLocalizedPath } from "@/lib/i18n";
import type { SiteMessages } from "@/messages/types";
import { LogoTile } from "@/ui/common/logo-tile";

interface ProjectPageProps {
  locale: Locale;
  projectId: ProjectId;
  messages: SiteMessages;
}

export function ProjectPage({
  locale,
  projectId,
  messages
}: ProjectPageProps) {
  const project = siteConfig.projects[projectId];
  const copy = messages.projects.items[projectId];
  const asset = siteConfig.assetPlaceholders.projects[projectId];

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-10 sm:px-8 lg:px-10 lg:gap-14 lg:py-14">
      <section className="section-frame overflow-hidden reveal-up">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(122,172,255,0.1),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(141,243,209,0.06),transparent_24%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.16fr)_minmax(19rem,0.84fr)]">
          <div className="space-y-5">
            <p className="eyebrow">{messages.projects.introLabel}</p>
            <div className="flex items-center gap-4">
              <LogoTile shortLabel={asset.shortLabel} label={asset.label} />
              <div>
                <h1 className="display-title">{project.title}</h1>
                <p className="mt-2 text-xs uppercase tracking-[0.28em] text-white/42">
                  {copy.categoryLabel}
                </p>
              </div>
            </div>
            <p className="text-xl leading-8 text-ink">{copy.tagline}</p>
            <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
              {copy.summary}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={getLocalizedPath(locale, siteConfig.ctaRoutes.dashboard)}
                className="button-primary"
              >
                {messages.nav.openDashboard}
              </Link>
              <Link
                href={getLocalizedPath(locale, siteConfig.ctaRoutes.docs)}
                className="button-secondary"
              >
                {messages.nav.docs}
              </Link>
            </div>
          </div>

          <aside className="glass-panel">
            <p className="eyebrow">{copy.surface.eyebrow}</p>
            <p className="mt-4 [font-family:var(--font-display)] text-2xl font-semibold text-ink">
              {copy.surface.title}
            </p>
            <p className="mt-4 text-sm leading-7 text-muted">
              {copy.surface.body}
            </p>
            <div className="mt-6 space-y-3">
              {copy.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between gap-4 rounded-[1.2rem] border border-white/[0.08] bg-white/[0.02] px-4 py-3"
                >
                  <span className="text-sm text-muted">{spec.label}</span>
                  <span className="text-sm font-medium text-ink">{spec.value}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {copy.sections.map((section, index) => (
          <article
            key={section.title}
            className={`glass-panel h-full reveal-up ${index === 1 ? "reveal-delay-1" : index === 2 ? "reveal-delay-2" : ""}`}
          >
            <h2 className="[font-family:var(--font-display)] text-xl font-semibold text-ink">
              {section.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">{section.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
