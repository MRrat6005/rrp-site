import Image from "next/image";
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
import { ConfigurableBackdrop } from "@/ui/layout/configurable-backdrop";

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
  const surface =
    projectId === "crown"
      ? siteConfig.visuals.backgrounds.dashboardEntry
      : siteConfig.visuals.backgrounds.publicSite;
  const markPath = siteConfig.visuals.projects[projectId].markPath;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 pb-16 pt-10 sm:px-8 lg:gap-14 lg:px-10 lg:pb-20 lg:pt-14">
      <section className="project-hero-section reveal-up" style={themeStyle} data-reveal>
        <div className="hero-aurora" />
        <div className="project-hero">
          <div className="space-y-5">
            <p className="eyebrow">{messages.projects.introLabel}</p>

            <div className="flex items-center gap-4 sm:gap-5">
              <LogoTile
                shortLabel={asset.shortLabel}
                label={asset.label}
                imagePath={markPath}
              />
              <div>
                <h1 className="display-title">{project.title}</h1>
                <p className="mt-2 text-sm text-white/52">{copy.categoryLabel}</p>
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

          <aside className={`project-hero-media project-hero-media--${projectId}`}>
            <ConfigurableBackdrop background={surface} className="absolute inset-0" />
            <div className={`project-hero-media__shade project-hero-media__shade--${projectId}`} />
            <div className="relative z-10 flex h-full flex-col justify-between gap-8">
              <div className="flex items-start justify-between gap-4">
                <span className="project-tag">{copy.categoryLabel}</span>
                <span className="text-[10px] uppercase tracking-[0.26em] text-white/44">
                  {copy.specs[0]?.label}
                </span>
              </div>

              <div className="project-hero-media__mark-shell">
                {markPath ? (
                  <Image
                    src={markPath}
                    alt=""
                    aria-hidden="true"
                    width={360}
                    height={360}
                    unoptimized
                    className="project-hero-media__mark"
                  />
                ) : (
                  <span className="[font-family:var(--font-display)] text-6xl font-semibold text-ink">
                    {project.shortTitle}
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <p className="eyebrow text-white/48">{copy.surface.eyebrow}</p>
                <h2 className="[font-family:var(--font-display)] text-2xl font-semibold text-ink sm:text-[2.15rem]">
                  {copy.surface.title}
                </h2>
                <p className="max-w-xl text-sm leading-7 text-white/62 sm:text-base">
                  {copy.surface.body}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="project-story-section" style={themeStyle}>
        <div className="project-story-overview reveal-up reveal-delay-1" data-reveal>
          <p className="eyebrow">{messages.common.specs}</p>
          <div className="mt-5 space-y-4">
            {copy.specs.map((spec) => (
              <div key={spec.label} className="project-story-stat">
                <span className="project-story-stat__label">{spec.label}</span>
                <span className="project-story-stat__value">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="project-storyboard reveal-up reveal-delay-2" data-reveal>
          {copy.sections.map((section) => (
            <article key={section.title} className="project-story-row">
              <h2 className="[font-family:var(--font-display)] text-2xl font-semibold text-ink">
                {section.title}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-muted sm:text-base">{section.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
