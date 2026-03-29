import Image from "next/image";
import Link from "next/link";

import { getProjectThemeStyle, siteConfig, type Locale } from "@/config/site.config";
import { getLocalizedPath } from "@/lib/i18n";
import type { SiteMessages } from "@/messages/types";
import { LogoTile } from "@/ui/common/logo-tile";
import { ConfigurableBackdrop } from "@/ui/layout/configurable-backdrop";

interface CrownEntryPageProps {
  locale: Locale;
  messages: SiteMessages;
}

export function CrownEntryPage({ locale, messages }: CrownEntryPageProps) {
  const dashboardHref = getLocalizedPath(locale, siteConfig.ctaRoutes.dashboard);
  const project = siteConfig.projects.crown;
  const asset = siteConfig.assetPlaceholders.projects.crown;
  const themeStyle = getProjectThemeStyle("crown");
  const surface = siteConfig.visuals.backgrounds.dashboardEntry;
  const markPath = siteConfig.visuals.projects.crown.markPath;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 pb-16 pt-10 sm:px-8 lg:gap-14 lg:px-10 lg:pb-20 lg:pt-14">
      <section className="project-hero-section reveal-up" style={themeStyle} data-reveal>
        <div className="hero-aurora" />
        <div className="project-hero">
          <div className="space-y-6">
            <p className="eyebrow">{messages.crownEntry.eyebrow}</p>

            <div className="flex items-center gap-4 sm:gap-5">
              <LogoTile
                shortLabel={asset.shortLabel}
                label={asset.label}
                imagePath={markPath}
              />
              <div>
                <p className="[font-family:var(--font-display)] text-2xl font-semibold text-ink sm:text-3xl">
                  {project.title}
                </p>
                <p className="mt-2 text-sm text-white/52">{messages.projects.items.crown.categoryLabel}</p>
              </div>
            </div>

            <h1 className="display-title max-w-4xl text-[clamp(2.8rem,6vw,4.75rem)]">
              {messages.crownEntry.title}
            </h1>
            <p className="max-w-3xl text-xl leading-8 text-ink sm:text-2xl sm:leading-9">{messages.crownEntry.intro}</p>
            <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">{messages.crownEntry.summary}</p>
            <div className="pt-2">
              <Link href={dashboardHref} className="button-primary">
                {messages.nav.openDashboard}
              </Link>
            </div>
          </div>

          <aside className="project-hero-media project-hero-media--crown">
            <ConfigurableBackdrop background={surface} className="absolute inset-0" />
            <div className="project-hero-media__shade project-hero-media__shade--crown" />
            <div className="relative z-10 flex h-full flex-col justify-between gap-8">
              <div className="flex items-start justify-between gap-4">
                <span className="project-tag">{messages.projects.items.crown.categoryLabel}</span>
                <span className="text-[10px] uppercase tracking-[0.26em] text-white/44">
                  {messages.crownEntry.stats[0]?.label}
                </span>
              </div>

              <div className="project-hero-media__mark-shell">
                {markPath ? (
                  <Image
                    src={markPath}
                    alt=""
                    aria-hidden="true"
                    width={320}
                    height={320}
                    unoptimized
                    className="project-hero-media__mark"
                  />
                ) : null}
              </div>

              <div className="space-y-3">
                <p className="eyebrow text-white/48">{messages.crownEntry.shell.eyebrow}</p>
                <h2 className="[font-family:var(--font-display)] text-2xl font-semibold text-ink sm:text-[2.15rem]">
                  {messages.crownEntry.shell.title}
                </h2>
                <p className="max-w-xl text-sm leading-7 text-white/62 sm:text-base">
                  {messages.crownEntry.shell.body}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="project-story-section" style={themeStyle}>
        <div className="project-story-overview reveal-up reveal-delay-1" data-reveal>
          <p className="eyebrow">{messages.projects.items.crown.surface.eyebrow}</p>
          <h2 className="mt-4 [font-family:var(--font-display)] text-3xl font-semibold text-ink sm:text-4xl">
            {messages.projects.items.crown.surface.title}
          </h2>
          <p className="max-w-xl text-base leading-8 text-muted">{messages.projects.items.crown.surface.body}</p>

          <div className="mt-5 space-y-4">
            {messages.crownEntry.stats.map((stat) => (
              <div key={stat.label} className="project-story-stat">
                <p className="project-story-stat__label">{stat.label}</p>
                <p className="project-story-stat__value">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="project-storyboard reveal-up reveal-delay-2" data-reveal>
          {messages.crownEntry.capabilities.map((item) => (
            <article key={item.title} className="project-story-row">
              <h2 className="[font-family:var(--font-display)] text-2xl font-semibold text-ink">
                {item.title}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-muted sm:text-base">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="project-flow-section" style={themeStyle}>
        <div className="project-flow-visual reveal-up reveal-delay-1" data-reveal>
          <ConfigurableBackdrop background={surface} className="absolute inset-0" />
          <div className="project-flow-visual__shade" />
          <div className="relative z-10 flex h-full flex-col justify-between gap-8">
            <div className="space-y-3">
              <p className="eyebrow">{messages.crownEntry.shell.eyebrow}</p>
              <h2 className="[font-family:var(--font-display)] text-3xl font-semibold text-ink sm:text-[2.4rem]">
                {messages.crownEntry.shell.title}
              </h2>
            </div>

            <div className="project-flow-visual__mark-shell">
              {markPath ? (
                <Image
                  src={markPath}
                  alt=""
                  aria-hidden="true"
                  width={220}
                  height={220}
                  unoptimized
                  className="project-flow-visual__mark"
                />
              ) : null}
            </div>
          </div>
        </div>

        <div className="project-storyboard reveal-up reveal-delay-2" data-reveal>
          {messages.crownEntry.flow.map((item) => (
            <article key={item.title} className="project-story-row">
              <h2 className="[font-family:var(--font-display)] text-2xl font-semibold text-ink">
                {item.title}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-muted sm:text-base">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
