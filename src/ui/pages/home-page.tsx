"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import {
  getProjectThemeStyle,
  projectOrder,
  siteConfig,
  type Locale
} from "@/config/site.config";
import { getLocalizedPath } from "@/lib/i18n";
import type { SiteMessages } from "@/messages/types";
import { LogoTile } from "@/ui/common/logo-tile";
import { ConfigurableBackdrop } from "@/ui/layout/configurable-backdrop";

interface HomePageProps {
  locale: Locale;
  messages: SiteMessages;
}

type HeroMotionStyle = CSSProperties & Record<"--hero-delay", string>;

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

function buildProjects(locale: Locale, messages: SiteMessages) {
  return projectOrder.map((projectId) => {
    const project = siteConfig.projects[projectId];
    const copy = messages.projects.items[projectId];
    const surface =
      projectId === "crown"
        ? siteConfig.visuals.backgrounds.dashboardEntry
        : siteConfig.visuals.backgrounds.publicSite;

    return {
      ...project,
      href: getLocalizedPath(locale, siteConfig.ctaRoutes.projects[projectId]),
      markPath: siteConfig.visuals.projects[projectId].markPath,
      mediaSurface: surface,
      themeStyle: getProjectThemeStyle(projectId),
      categoryLabel: copy.categoryLabel,
      tagline: copy.tagline,
      summary: copy.summary,
      sections: copy.sections,
      surfaceEyebrow: copy.surface.eyebrow,
      surfaceTitle: copy.surface.title
    };
  });
}

interface SpotlightSectionProps {
  project: ReturnType<typeof buildProjects>[number];
  eyebrow: string;
  ctaHref: string;
  ctaLabel: string;
  reverse?: boolean;
}

function SpotlightSection({
  project,
  eyebrow,
  ctaHref,
  ctaLabel,
  reverse = false
}: SpotlightSectionProps) {
  return (
    <section
      className={`home-editorial-feature reveal-section ${reverse ? "home-editorial-feature--reverse" : ""}`.trim()}
      data-reveal
    >
      <div className="home-editorial-feature__layout">
        <div className="home-editorial-feature__copy">
          <p className="eyebrow">{eyebrow}</p>
          <div className="space-y-5">
            <h2 className="home-editorial-feature__headline">{project.surfaceTitle}</h2>
            <p className="home-editorial-feature__kicker">{project.tagline}</p>
            <p className="max-w-2xl text-base leading-8 text-muted">{project.summary}</p>
          </div>

          <div className="home-editorial-feature__note">
            <p className="home-editorial-feature__note-title">{project.sections[0]?.title}</p>
            <p className="text-sm leading-7 text-muted sm:text-base">{project.sections[0]?.body}</p>
          </div>

          <div className="pt-2">
            <Link href={ctaHref} className="home-button-secondary">
              {ctaLabel}
            </Link>
          </div>
        </div>

        <div className="home-editorial-feature__media" style={project.themeStyle}>
          <ConfigurableBackdrop background={project.mediaSurface} className="absolute inset-0" />
          <div
            className={`home-editorial-feature__media-shade home-editorial-feature__media-shade--${project.id}`}
          />

          <div className="home-editorial-feature__media-inner">
            <div className="space-y-3">
              <p className="eyebrow text-white/48">{project.categoryLabel}</p>
              <p className="home-editorial-feature__media-title">{project.title}</p>
            </div>

            <div className="home-editorial-feature__mark-shell">
              {project.markPath ? (
                <Image
                  src={project.markPath}
                  alt=""
                  aria-hidden="true"
                  width={420}
                  height={420}
                  unoptimized
                  className="home-editorial-feature__mark"
                />
              ) : (
                <span className="home-editorial-feature__fallback-mark">{project.shortTitle}</span>
              )}
            </div>

            <div className="home-editorial-feature__media-caption">
              <p>{project.sections[1]?.title ?? project.sections[0]?.title}</p>
              <p>{project.surfaceEyebrow}</p>
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
  const projects = buildProjects(locale, messages);
  const [chrpProject, crownProject] = projects;

  return (
    <main className="mx-auto flex w-full max-w-[84rem] flex-col gap-16 px-6 pb-20 pt-10 sm:px-8 lg:gap-24 lg:px-10 lg:pb-28 lg:pt-14">
      <section className="home-editorial-hero" data-reveal>
        <div className="max-w-4xl space-y-7">
          <p className="eyebrow">
            <HeroRevealLine delay="0.04s">{messages.home.eyebrow}</HeroRevealLine>
          </p>

          <div className="space-y-6">
            <h1 className="home-editorial-hero__title">
              <HeroRevealLine delay="0.12s">{messages.home.title}</HeroRevealLine>
            </h1>
            <p className="home-editorial-hero__subtitle">
              <HeroRevealLine delay="0.2s">{messages.home.subtitle}</HeroRevealLine>
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-1 hero-intro-item" style={heroDelayStyle("0.28s")}>
            <Link href={dashboardHref} className="home-button-primary">
              {messages.home.primaryCta}
            </Link>
            <Link href={chrpHref} className="home-button-secondary">
              {messages.home.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="hero-intro-item home-editorial-hero__media" style={heroDelayStyle("0.18s")}>
          <ConfigurableBackdrop
            background={siteConfig.visuals.backgrounds.publicSite}
            className="absolute inset-0"
          />
          <div className="home-editorial-hero__media-shade" />

          <div className="home-editorial-hero__media-dashboard">
            <ConfigurableBackdrop
              background={siteConfig.visuals.backgrounds.dashboardEntry}
              className="absolute inset-0"
            />
            <div className="home-editorial-hero__media-dashboard-shade" />
          </div>

          <div className="home-editorial-hero__media-inner">
            <div className="home-editorial-hero__brand">
              <LogoTile
                shortLabel={siteConfig.assetPlaceholders.brand.shortLabel}
                label={siteConfig.assetPlaceholders.brand.label}
                imagePath={siteConfig.visuals.brand.markPath}
                className="h-16 w-16 rounded-[1.6rem] sm:h-20 sm:w-20 sm:rounded-[1.9rem]"
              />

              <div className="space-y-3">
                <p className="eyebrow text-white/46">{messages.home.frameEyebrow}</p>
                <h2 className="home-editorial-hero__media-title">{messages.home.frameTitle}</h2>
                <p className="max-w-2xl text-sm leading-7 text-white/68 sm:text-base">
                  {messages.home.frameBody}
                </p>
              </div>
            </div>

            <div className="home-editorial-hero__marks">
              {siteConfig.visuals.brand.markPath ? (
                <Image
                  src={siteConfig.visuals.brand.markPath}
                  alt=""
                  aria-hidden="true"
                  width={360}
                  height={360}
                  unoptimized
                  className="home-editorial-hero__brand-mark"
                />
              ) : null}
            </div>

            <div className="home-editorial-hero__rail">
              {projects.map((project) => (
                <div key={project.id} className="home-editorial-hero__rail-item">
                  <p className="home-editorial-hero__rail-label">{project.title}</p>
                  <p className="home-editorial-hero__rail-copy">{project.tagline}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SpotlightSection
        project={chrpProject}
        eyebrow={chrpProject.categoryLabel}
        ctaHref={chrpHref}
        ctaLabel={messages.home.secondaryCta}
      />

      <SpotlightSection
        project={crownProject}
        eyebrow={crownProject.categoryLabel}
        ctaHref={dashboardHref}
        ctaLabel={messages.home.primaryCta}
        reverse
      />

      <section className="home-editorial-brand reveal-section" data-reveal>
        <div className="home-editorial-brand__intro">
          <p className="eyebrow">{messages.home.brandEyebrow}</p>
          <h2 className="home-editorial-brand__title">{messages.home.brandTitle}</h2>
          <p className="max-w-3xl text-base leading-8 text-muted">{messages.home.brandBody}</p>
        </div>

        <div className="home-editorial-brand__notes">
          {messages.home.notes.map((note) => (
            <div key={note.title} className="home-editorial-brand__note">
              <p className="home-editorial-brand__note-title">{note.title}</p>
              <p className="text-sm leading-7 text-muted sm:text-base">{note.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-editorial-final reveal-section" data-reveal>
        <div className="max-w-3xl space-y-5">
          <p className="eyebrow">{messages.home.finalEyebrow}</p>
          <h2 className="home-editorial-final__title">{messages.home.finalTitle}</h2>
          <p className="text-base leading-8 text-muted">{messages.home.finalBody}</p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
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

