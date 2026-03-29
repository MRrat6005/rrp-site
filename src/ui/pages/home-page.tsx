"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import {
  getProjectThemeStyle,
  siteConfig,
  type BackgroundSurfaceConfig,
  type Locale,
  type ProjectId
} from "@/config/site.config";
import { getLocalizedPath } from "@/lib/i18n";
import type { SiteMessages } from "@/messages/types";

interface HomePageProps {
  locale: Locale;
  messages: SiteMessages;
}

type HeroMotionStyle = CSSProperties & Record<"--hero-delay", string>;
type MarketingSurfaceStyle = CSSProperties & Record<`--${string}`, string>;

function heroDelayStyle(delay: string): HeroMotionStyle {
  return {
    animationDelay: delay,
    "--hero-delay": delay
  };
}

function HeroRevealLine({
  children,
  className = "block",
  delay
}: {
  children: ReactNode;
  className?: string;
  delay: string;
}) {
  return (
    <span className={`text-reveal-line ${className}`.trim()} style={heroDelayStyle(delay)}>
      <span>{children}</span>
    </span>
  );
}

function createMarketingSurfaceStyle(
  background: BackgroundSurfaceConfig
): MarketingSurfaceStyle {
  return {
    "--marketing-surface-image": background.image
      ? `url("${background.image}")`
      : "none",
    "--marketing-surface-position": String(background.position),
    "--marketing-surface-size": String(background.size)
  };
}

function MarketingSurface({
  background,
  className = ""
}: {
  background: BackgroundSurfaceConfig;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`marketing-surface ${className}`.trim()}
      style={createMarketingSurfaceStyle(background)}
    >
      <div className="marketing-surface__image" />
    </div>
  );
}

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href);
}

function ActionLink({
  href,
  className,
  children
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  if (isExternalHref(href)) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function buildProject(locale: Locale, messages: SiteMessages, projectId: ProjectId) {
  const project = siteConfig.projects[projectId];
  const copy = messages.projects.items[projectId];

  return {
    ...project,
    href: getLocalizedPath(locale, siteConfig.ctaRoutes.projects[projectId]),
    background:
      projectId === "crown"
        ? siteConfig.visuals.backgrounds.dashboardEntry
        : siteConfig.visuals.backgrounds.publicSite,
    markPath: siteConfig.visuals.projects[projectId].markPath,
    themeStyle: getProjectThemeStyle(projectId),
    categoryLabel: copy.categoryLabel,
    tagline: copy.tagline,
    summary: copy.summary,
    sections: copy.sections,
    surfaceEyebrow: copy.surface.eyebrow,
    surfaceTitle: copy.surface.title
  };
}

function DirectionSpotlight({
  project,
  ctaHref,
  ctaLabel,
  reverse = false
}: {
  project: ReturnType<typeof buildProject>;
  ctaHref: string;
  ctaLabel: string;
  reverse?: boolean;
}) {
  return (
    <section
      className={`home-direction reveal-section ${reverse ? "home-direction--reverse" : ""}`.trim()}
      data-reveal
      style={project.themeStyle}
    >
      <div className="home-direction__grid">
        <div className="home-direction__copy">
          <p className="eyebrow">{project.categoryLabel}</p>
          <div className="space-y-5">
            <h2 className="home-direction__title">{project.surfaceTitle}</h2>
            <p className="home-direction__tagline">{project.tagline}</p>
            <p className="home-direction__summary">{project.summary}</p>
          </div>

          <div className="home-direction__points">
            {project.sections.slice(0, 2).map((section) => (
              <div key={section.title} className="home-direction__point">
                <p className="home-direction__point-title">{section.title}</p>
                <p className="text-sm leading-7 text-muted sm:text-base">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="pt-3">
            <ActionLink href={ctaHref} className="home-button-primary">
              {ctaLabel}
            </ActionLink>
          </div>
        </div>

        <div className={`home-direction-visual home-direction-visual--${project.id}`.trim()}>
          <MarketingSurface background={project.background} className="absolute inset-0" />
          <div
            className={`home-direction-visual__shade home-direction-visual__shade--${project.id}`.trim()}
          />

          <div className="home-direction-visual__content">
            <div className="home-direction-visual__header">
              <p className="eyebrow text-white/48">{project.surfaceEyebrow}</p>
              <p className="home-direction-visual__meta">{project.sections[0]?.title}</p>
            </div>

            <div className="home-direction-visual__mark-shell">
              {project.markPath ? (
                <Image
                  src={project.markPath}
                  alt=""
                  aria-hidden="true"
                  width={420}
                  height={420}
                  unoptimized
                  className="home-direction-visual__mark"
                />
              ) : (
                <span className="home-direction-visual__fallback-mark">{project.shortTitle}</span>
              )}
            </div>

            <div className="home-direction-visual__footer">
              <p className="home-direction-visual__name">{project.title}</p>
              <p className="home-direction-visual__body">
                {project.sections[1]?.body ?? project.summary}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePage({ locale, messages }: HomePageProps) {
  const dashboardHref = getLocalizedPath(locale, siteConfig.ctaRoutes.dashboard);
  const chrpHref = getLocalizedPath(locale, siteConfig.ctaRoutes.projects.chrp);
  const heroBackground = siteConfig.visuals.backgrounds.publicSite;
  const crownBackground = siteConfig.visuals.backgrounds.dashboardEntry;
  const chrpProject = buildProject(locale, messages, "chrp");
  const crownProject = buildProject(locale, messages, "crown");

  return (
    <main className="mx-auto flex w-full max-w-[84rem] flex-col gap-16 px-6 pb-20 pt-10 sm:px-8 lg:gap-24 lg:px-10 lg:pb-28 lg:pt-14">
      <section className="home-marketing-hero">
        <div className="home-marketing-hero__copy">
          <p className="eyebrow">
            <HeroRevealLine delay="0.04s">{messages.home.eyebrow}</HeroRevealLine>
          </p>

          <div className="space-y-6">
            <h1 className="home-marketing-hero__title">
              <HeroRevealLine delay="0.12s">{messages.home.title}</HeroRevealLine>
            </h1>
            <p className="home-marketing-hero__subtitle">
              <HeroRevealLine delay="0.2s">{messages.home.subtitle}</HeroRevealLine>
            </p>
          </div>

          <div className="home-marketing-hero__actions hero-intro-item" style={heroDelayStyle("0.28s")}>
            <Link href={dashboardHref} className="home-button-primary">
              {messages.home.primaryCta}
            </Link>
            <Link href={chrpHref} className="home-button-secondary">
              {messages.home.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="home-marketing-banner hero-intro-item" style={heroDelayStyle("0.18s")}>
          <MarketingSurface background={heroBackground} className="absolute inset-0" />
          <div className="home-marketing-banner__shade" />
          <div className="home-marketing-banner__glint" />

          <div className="home-marketing-banner__content">
            <div className="home-marketing-banner__intro">
              <div className="home-marketing-banner__story">
                <p className="eyebrow text-white/48">{messages.home.frameEyebrow}</p>
                <h2 className="home-marketing-banner__story-title">{messages.home.frameTitle}</h2>
                <p className="home-marketing-banner__story-body">{messages.home.frameBody}</p>
              </div>

              <div className="home-marketing-banner__mark-shell">
                {siteConfig.visuals.brand.markPath ? (
                  <Image
                    src={siteConfig.visuals.brand.markPath}
                    alt=""
                    aria-hidden="true"
                    width={360}
                    height={360}
                    unoptimized
                    className="home-marketing-banner__mark"
                  />
                ) : null}
              </div>
            </div>

            <div className="home-marketing-banner__routes">
              <div
                className="home-marketing-banner__route home-marketing-banner__route--chrp"
                style={chrpProject.themeStyle}
              >
                <div className="home-marketing-banner__route-shade home-marketing-banner__route-shade--chrp" />
                <div className="home-marketing-banner__route-content">
                  <div className="space-y-2">
                    <p className="home-marketing-banner__route-label">{chrpProject.title}</p>
                    <p className="home-marketing-banner__route-copy">{chrpProject.tagline}</p>
                  </div>

                  {chrpProject.markPath ? (
                    <Image
                      src={chrpProject.markPath}
                      alt=""
                      aria-hidden="true"
                      width={180}
                      height={180}
                      unoptimized
                      className="home-marketing-banner__route-mark"
                    />
                  ) : null}
                </div>
              </div>

              <div
                className="home-marketing-banner__route home-marketing-banner__route--crown"
                style={crownProject.themeStyle}
              >
                <MarketingSurface background={crownBackground} className="absolute inset-0" />
                <div className="home-marketing-banner__route-shade home-marketing-banner__route-shade--crown" />
                <div className="home-marketing-banner__route-content">
                  <div className="space-y-2">
                    <p className="home-marketing-banner__route-label">{crownProject.title}</p>
                    <p className="home-marketing-banner__route-copy">{crownProject.tagline}</p>
                  </div>

                  {crownProject.markPath ? (
                    <Image
                      src={crownProject.markPath}
                      alt=""
                      aria-hidden="true"
                      width={180}
                      height={180}
                      unoptimized
                      className="home-marketing-banner__route-mark"
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DirectionSpotlight
        project={chrpProject}
        ctaHref={chrpHref}
        ctaLabel={messages.home.secondaryCta}
      />

      <DirectionSpotlight
        project={crownProject}
        ctaHref={dashboardHref}
        ctaLabel={messages.home.primaryCta}
        reverse
      />

      <section className="home-support reveal-section" data-reveal>
        <div className="home-support__intro">
          <p className="eyebrow">{messages.home.brandEyebrow}</p>
          <h2 className="home-support__title">{messages.home.brandTitle}</h2>
          <p className="home-support__body">{messages.home.brandBody}</p>
        </div>

        <div className="home-support__notes">
          {messages.home.notes.map((note) => (
            <div key={note.title} className="home-support__note">
              <p className="home-support__note-title">{note.title}</p>
              <p className="text-sm leading-7 text-muted sm:text-base">{note.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-closing reveal-section" data-reveal>
        <div className="home-closing__copy">
          <p className="eyebrow">{messages.home.finalEyebrow}</p>
          <h2 className="home-closing__title">{messages.home.finalTitle}</h2>
          <p className="home-closing__body">{messages.home.finalBody}</p>
        </div>

        <div className="home-closing__actions">
          <Link href={chrpHref} className="home-button-secondary">
            {messages.home.secondaryCta}
          </Link>
          <Link href={dashboardHref} className="home-button-primary">
            {messages.home.primaryCta}
          </Link>
        </div>
      </section>
    </main>
  );
}
