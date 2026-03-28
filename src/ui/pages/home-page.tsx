"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect } from "react";

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

function heroDelayStyle(delay: string): CSSProperties {
  return { animationDelay: delay };
}

export function HomePage({ locale, messages }: HomePageProps) {
  const dashboardHref = getLocalizedPath(locale, siteConfig.ctaRoutes.dashboard);
  const heroSecondaryHref = getLocalizedPath(locale, siteConfig.ctaRoutes.projects.chrp);
  const heroBackdrop = siteConfig.visuals.backgrounds.publicSite.image;

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

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const revealNodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-home-reveal]")
    );

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      revealNodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    revealNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [locale]);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 pb-16 pt-10 sm:px-8 lg:gap-24 lg:px-10 lg:pb-24 lg:pt-14">
      <section className="section-frame home-hero overflow-hidden">
        <div className="hero-aurora" />
        <div className="relative grid gap-10 xl:grid-cols-[minmax(0,0.92fr)_minmax(21rem,1.08fr)] xl:items-center">
          <div className="max-w-3xl space-y-7">
            <p className="eyebrow hero-intro-item" style={heroDelayStyle("0.04s")}>
              {messages.home.eyebrow}
            </p>

            <div className="space-y-5">
              <h1 className="display-title max-w-3xl hero-intro-item home-hero__title" style={heroDelayStyle("0.12s")}>
                {messages.home.title}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg hero-intro-item home-hero__support" style={heroDelayStyle("0.2s")}>
                {messages.home.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-1 hero-intro-item" style={heroDelayStyle("0.28s")}>
              <Link href={dashboardHref} className="button-primary">
                {messages.home.primaryCta}
              </Link>
              <Link href={heroSecondaryHref} className="button-secondary button-secondary--home">
                {messages.home.secondaryCta}
              </Link>
            </div>
          </div>

          <aside className="hero-intro-item home-hero-banner" style={heroDelayStyle("0.18s")}>
            <div
              className="home-hero-banner__backdrop"
              style={heroBackdrop ? { backgroundImage: `url(${heroBackdrop})` } : undefined}
            />
            <div className="home-hero-banner__shade" />
            <div className="home-hero-banner__grid" />

            <div className="relative z-10 flex h-full flex-col gap-6">
              <div className="space-y-4">
                <p className="eyebrow">{messages.home.frameEyebrow}</p>
                <div className="space-y-3">
                  <h2 className="[font-family:var(--font-display)] text-[1.9rem] font-semibold leading-tight text-ink sm:text-[2.2rem]">
                    {messages.home.frameTitle}
                  </h2>
                  <p className="max-w-xl text-sm leading-7 text-white/64 sm:text-base">
                    {messages.home.frameBody}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    href={project.href}
                    className="home-route-card"
                    style={project.themeStyle}
                  >
                    <div className="relative flex items-center gap-3">
                      <LogoTile
                        shortLabel={project.asset.shortLabel}
                        label={project.asset.label}
                        imagePath={project.markPath}
                      />
                      <div className="min-w-0">
                        <p className="[font-family:var(--font-display)] text-lg font-semibold text-ink">
                          {project.title}
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-[0.22em] text-white/42">
                          {project.categoryLabel}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {messages.home.stats.map((stat) => (
                  <div key={stat.label} className="home-hero-stat">
                    <span className="home-hero-stat__label">{stat.label}</span>
                    <span className="relative z-10 text-sm font-medium text-ink">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="space-y-8 reveal-section" data-home-reveal>
        <div className="max-w-3xl space-y-4">
          <p className="eyebrow">{messages.home.directionsEyebrow}</p>
          <h2 className="[font-family:var(--font-display)] text-3xl font-semibold text-ink sm:text-4xl lg:text-[2.8rem]">
            {messages.home.directionsTitle}
          </h2>
          <p className="max-w-2xl text-base leading-8 text-muted">{messages.home.directionsIntro}</p>
        </div>

        <div className="home-spotlight-stack">
          {[leadProject, supportProject].map((project, index) => {
            const visual = (
              <div className={`home-spotlight-card__visual home-spotlight-card__visual--${project.id}`}>
                <div className="home-spotlight-card__visual-top">
                  <span className="project-tag">{project.categoryLabel}</span>
                </div>

                <div className="home-spotlight-mark-shell">
                  {project.markPath ? (
                    <Image
                      src={project.markPath}
                      alt=""
                      aria-hidden="true"
                      width={320}
                      height={320}
                      unoptimized
                      className="home-spotlight-mark"
                    />
                  ) : (
                    <span className="[font-family:var(--font-display)] text-5xl font-semibold text-ink">
                      {project.shortTitle}
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <p className="eyebrow text-white/48">{project.sections[0]?.title}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.specs.map((spec) => (
                      <span key={spec.label} className="home-spotlight-chip">
                        {spec.value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );

            const body = (
              <div className="home-spotlight-card__body">
                <div className="space-y-4">
                  <p className="eyebrow">{messages.common.projectDirections}</p>
                  <div className="space-y-4">
                    <h3 className="[font-family:var(--font-display)] text-3xl font-semibold text-ink sm:text-[2.45rem]">
                      {project.title}
                    </h3>
                    <p className="text-xl leading-8 text-ink/90 sm:text-2xl sm:leading-9">
                      {project.tagline}
                    </p>
                    <p className="max-w-2xl text-sm leading-7 text-muted sm:text-base">
                      {project.summary}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="grid gap-3 sm:grid-cols-3">
                    {project.sections.map((section) => (
                      <div key={section.title} className="home-spotlight-point">
                        <p className="text-sm font-medium text-ink">{section.title}</p>
                        <p className="mt-2 text-sm leading-6 text-white/56">{section.body}</p>
                      </div>
                    ))}
                  </div>

                  <span className="home-spotlight-cta">
                    <span>{project.title}</span>
                    <span aria-hidden="true">/</span>
                    <span>{project.categoryLabel}</span>
                  </span>
                </div>
              </div>
            );

            return (
              <Link
                key={project.id}
                href={project.href}
                className={`home-spotlight-card ${index % 2 === 0 ? "home-spotlight-card--visual-first" : "home-spotlight-card--visual-last"}`}
                style={project.themeStyle}
              >
                <div className="grid gap-8 xl:items-center xl:gap-12 xl:grid-cols-[minmax(19rem,0.9fr)_minmax(0,1.1fr)]">
                  {index % 2 === 0 ? (
                    <>
                      {visual}
                      {body}
                    </>
                  ) : (
                    <>
                      {body}
                      {visual}
                    </>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section-frame reveal-section home-brand-section" data-home-reveal>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(20rem,1.12fr)] lg:items-start">
          <div className="max-w-2xl space-y-5">
            <p className="eyebrow">{messages.home.brandEyebrow}</p>
            <h2 className="[font-family:var(--font-display)] text-3xl font-semibold text-ink sm:text-4xl">
              {messages.home.brandTitle}
            </h2>
            <p className="text-base leading-8 text-muted">{messages.home.brandBody}</p>

            <div className="flex items-center gap-4 pt-2">
              <LogoTile
                shortLabel={siteConfig.assetPlaceholders.brand.shortLabel}
                label={siteConfig.assetPlaceholders.brand.label}
                imagePath={siteConfig.visuals.brand.markPath}
                className="h-14 w-14 rounded-[1.35rem]"
              />
              <div>
                <p className="[font-family:var(--font-display)] text-lg font-semibold text-ink">
                  {siteConfig.brand.fullName}
                </p>
                <p className="mt-1 text-sm text-white/44">{siteConfig.brand.domain}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 lg:pl-6">
            {messages.home.notes.map((note) => (
              <div key={note.title} className="home-brand-row">
                <p className="text-sm font-medium text-ink">{note.title}</p>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">{note.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal-section home-cta-panel" data-home-reveal>
        <div className="max-w-3xl space-y-5">
          <p className="eyebrow">{messages.home.finalEyebrow}</p>
          <h2 className="[font-family:var(--font-display)] text-3xl font-semibold text-ink sm:text-4xl lg:text-[2.75rem]">
            {messages.home.finalTitle}
          </h2>
          <p className="text-base leading-8 text-muted">{messages.home.finalBody}</p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href={heroSecondaryHref} className="button-primary">
            {messages.home.secondaryCta}
          </Link>
          <Link href={dashboardHref} className="button-secondary button-secondary--home">
            {messages.home.primaryCta}
          </Link>
        </div>
      </section>
    </main>
  );
}


