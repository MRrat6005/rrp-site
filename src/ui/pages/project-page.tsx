import Link from "next/link";

import {
  getProjectThemeStyle,
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

export function ProjectPage({ locale, projectId, messages }: ProjectPageProps) {
  const project = siteConfig.projects[projectId];
  const copy = messages.projects.items[projectId];
  const asset = siteConfig.assetPlaceholders.projects[projectId];
  const themeStyle = getProjectThemeStyle(projectId);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 pb-16 pt-10 sm:px-8 lg:gap-14 lg:px-10 lg:pb-20 lg:pt-14">
      <section className="project-card project-card--feature reveal-up overflow-hidden sm:p-10" style={themeStyle}>
        <div className="hero-aurora" />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.14fr)_minmax(19rem,0.86fr)] lg:gap-10">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow">{messages.projects.introLabel}</p>
              <span className="project-tag">{copy.categoryLabel}</span>
            </div>

            <div className="flex items-center gap-4">
              <LogoTile
                shortLabel={asset.shortLabel}
                label={asset.label}
                imagePath={siteConfig.visuals.projects[projectId].markPath}
              />
              <div>
                <h1 className="display-title">{project.title}</h1>
                <p className="mt-2 text-sm text-white/52">{project.category}</p>
              </div>
            </div>

            <p className="max-w-2xl text-xl leading-8 text-ink sm:text-2xl sm:leading-9">{copy.tagline}</p>
            <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">{copy.summary}</p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href={getLocalizedPath(locale, siteConfig.ctaRoutes.dashboard)} className="button-primary">
                {messages.nav.openDashboard}
              </Link>
              <Link href={getLocalizedPath(locale, siteConfig.ctaRoutes.docs)} className="button-secondary">
                {messages.nav.docs}
              </Link>
            </div>
          </div>

          <aside className="project-panel reveal-up reveal-delay-1 self-start" style={themeStyle}>
            <div className="relative z-10">
              <p className="eyebrow">{copy.surface.eyebrow}</p>
              <p className="mt-4 [font-family:var(--font-display)] text-2xl font-semibold text-ink sm:text-[2rem]">
                {copy.surface.title}
              </p>
              <p className="mt-4 text-sm leading-7 text-muted sm:text-base">{copy.surface.body}</p>
              <div className="mt-6 space-y-3">
                {copy.specs.map((spec) => (
                  <div key={spec.label} className="project-stat-row">
                    <span className="text-sm text-muted">{spec.label}</span>
                    <span className="text-sm font-medium text-ink">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" style={themeStyle}>
        {copy.sections.map((section, index) => (
          <article
            key={section.title}
            className={`project-section-card hover-lift h-full reveal-up ${index === 1 ? "reveal-delay-1" : index === 2 ? "reveal-delay-2" : ""}`}
          >
            <h2 className="relative [font-family:var(--font-display)] text-xl font-semibold text-ink">
              {section.title}
            </h2>
            <p className="relative mt-4 text-sm leading-7 text-muted">{section.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
