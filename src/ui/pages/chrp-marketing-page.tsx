"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";

import { getProjectThemeStyle } from "@/config/site.config";
import type { SiteMessages } from "@/messages/types";

const DISCORD_URL = "https://discord.gg/mdZjSdJMGh";
const TIKTOK_URL = "https://www.tiktok.com/@chrp_rus?_r=1&_t=ZS-956NBcGxB12";
const galleryVariants = ["wide", "tall", "square", "square", "wide", "tall"] as const;
const sessionVisuals = [
  { key: "county", src: "/projects/chrp/main/county-view.png" },
  { key: "scottsdale", src: "/projects/chrp/main/scottsdale.png" },
  { key: "yorktown", src: "/projects/chrp/main/yorktown.png" }
] as const;
const galleryVisuals = [
  "/projects/chrp/gallery/county-overview.png",
  "/projects/chrp/gallery/scottsdale-street.png",
  "/projects/chrp/gallery/yorktown-storefronts.png",
  "/projects/chrp/gallery/concert-session.png",
  "/projects/chrp/gallery/day-traffic.png",
  "/projects/chrp/gallery/evening-session.png"
] as const;

type SessionVisualKey = (typeof sessionVisuals)[number]["key"];

interface ChrpMarketingPageProps {
  messages: SiteMessages;
}

interface ChrpVisualSurfaceProps {
  alt: string;
  className: string;
  priority?: boolean;
  sizes: string;
  src: string;
}

function ChrpVisualSurface({ alt, className, priority = false, sizes, src }: ChrpVisualSurfaceProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  return (
    <div className={className}>
      <div className="chrp-visual-surface__placeholder" aria-hidden="true" />
      {!hasError ? (
        <Image
          fill
          alt={alt}
          className="chrp-visual-surface__image"
          onError={() => setHasError(true)}
          priority={priority}
          sizes={sizes}
          src={src}
        />
      ) : null}
    </div>
  );
}

export function ChrpMarketingPage({ messages }: ChrpMarketingPageProps) {
  const copy = messages.chrpPage;
  const themeStyle = getProjectThemeStyle("chrp");
  const [activeVisual, setActiveVisual] = useState<SessionVisualKey>("county");
  const [activeTimelineTitle, setActiveTimelineTitle] = useState(
    copy.timeline.stages.find((stage) => stage.isCurrent)?.title ?? copy.timeline.stages[0]?.title ?? ""
  );

  const activeSessionIndex = sessionVisuals.findIndex((item) => item.key === activeVisual);
  const activeSessionVisual = sessionVisuals[activeSessionIndex === -1 ? 0 : activeSessionIndex];
  const activeSessionLabel = copy.heroVisualItems[activeSessionIndex === -1 ? 0 : activeSessionIndex] ?? activeSessionVisual.key;
  const activeTimelineStage =
    copy.timeline.stages.find((stage) => stage.title === activeTimelineTitle) ?? copy.timeline.stages[0];

  const galleryItems = copy.visuals.placeholders.map((label, index) => ({
    label,
    src: galleryVisuals[Math.min(index, galleryVisuals.length - 1)],
    variant: galleryVariants[index % galleryVariants.length]
  }));

  useEffect(() => {
    setActiveTimelineTitle(copy.timeline.stages.find((stage) => stage.isCurrent)?.title ?? copy.timeline.stages[0]?.title ?? "");
  }, [copy.timeline.stages]);

  return (
    <main
      className="chrp-marketing-page mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pb-16 pt-10 sm:px-8 lg:gap-14 lg:px-10 lg:pb-24 lg:pt-14"
      style={themeStyle}
    >
      <section className="chrp-hero reveal-up" data-reveal>
        <div className="chrp-hero__copy">
          <p className="eyebrow">{copy.heroEyebrow}</p>
          <h1 className="chrp-hero__title">{copy.heroTitle}</h1>
          <p className="chrp-hero__subtitle">{copy.heroSubtitle}</p>
          <p className="chrp-hero__body">{copy.heroBody}</p>

          <div className="chrp-cta-row">
            <Link href={DISCORD_URL} className="button-primary" target="_blank" rel="noreferrer">
              {copy.primaryCta}
            </Link>
            <Link href={TIKTOK_URL} className="chrp-button-secondary" target="_blank" rel="noreferrer">
              {copy.secondaryCta}
            </Link>
          </div>

          <dl className="chrp-hero__stats">
            {copy.heroStats.map((item) => (
              <div key={item.label} className="chrp-hero__stat">
                <dt className="chrp-hero__stat-label">{item.label}</dt>
                <dd className="chrp-hero__stat-value">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="chrp-hero__visual">
          <div className="chrp-session-visual">
            <ChrpVisualSurface
              alt={`${copy.heroTitle} - ${activeSessionLabel}`}
              className="chrp-visual-surface chrp-session-visual__media"
              priority
              sizes="(min-width: 1024px) 44vw, 100vw"
              src={activeSessionVisual.src}
            />

            <div
              className="chrp-session-visual__tabs"
              role="tablist"
              aria-label={copy.heroVisualTitle}
              style={
                {
                  "--chrp-session-index": activeSessionIndex === -1 ? 0 : activeSessionIndex,
                  "--chrp-session-count": sessionVisuals.length
                } as CSSProperties
              }
            >
              <span className="chrp-session-visual__indicator" aria-hidden="true" />
              {sessionVisuals.map((item, index) => {
                const isActive = activeVisual === item.key;

                return (
                  <button
                    key={item.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`chrp-session-tab ${isActive ? "is-active" : ""}`}
                    onClick={() => setActiveVisual(item.key)}
                  >
                    {copy.heroVisualItems[index] ?? item.key}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="chrp-section chrp-timeline-section reveal-up reveal-delay-1" data-reveal>
        <div className="chrp-section__intro">
          <h2 className="chrp-section__title">{copy.timeline.title}</h2>
          <p className="chrp-section__body">{copy.timeline.intro}</p>
        </div>

        <div className="chrp-timeline-shell">
          <div className="chrp-timeline" aria-label={copy.timeline.title}>
            <span className="chrp-timeline__rail" aria-hidden="true" />

            {copy.timeline.stages.map((stage) => {
              const isActive = activeTimelineStage?.title === stage.title;

              return (
                <button
                  key={stage.title}
                  type="button"
                  className={`chrp-timeline__point ${isActive ? "is-active" : ""} ${stage.isCurrent ? "is-current" : ""}`}
                  aria-pressed={isActive}
                  aria-controls="chrp-timeline-panel"
                  onClick={() => setActiveTimelineTitle(stage.title)}
                >
                  <span className="chrp-timeline__marker" aria-hidden="true">
                    <span className="chrp-timeline__marker-core" />
                  </span>
                  <span className="chrp-timeline__point-copy">
                    <span className="chrp-timeline__point-title">{stage.title}</span>
                    <span className="chrp-timeline__point-years">{stage.years}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {activeTimelineStage ? (
            <div className="chrp-timeline-card-wrap">
              <article
                key={activeTimelineStage.title}
                id="chrp-timeline-panel"
                className={`chrp-timeline-card ${activeTimelineStage.isCurrent ? "is-current" : ""}`}
                aria-live="polite"
              >
                <h3 className="chrp-timeline-card__title">{activeTimelineStage.title}</h3>
                <p className="chrp-timeline-card__meta">
                  <span className="chrp-timeline-card__meta-label">{copy.timeline.yearsLabel}</span>
                  <span className="chrp-timeline-card__meta-value">{activeTimelineStage.years}</span>
                </p>
                <p className="chrp-timeline-card__body">{activeTimelineStage.body}</p>
              </article>
            </div>
          ) : null}
        </div>
      </section>

      <section className="chrp-section reveal-up reveal-delay-1" data-reveal>
        <div className="chrp-section__intro">
          <h2 className="chrp-section__title">{copy.start.title}</h2>
          <p className="chrp-section__body">{copy.start.intro}</p>
        </div>

        <div className="chrp-steps">
          {copy.start.steps.map((step, index) => (
            <article key={step.title} className="chrp-step">
              <span className="chrp-step__number">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="chrp-step__title">{step.title}</h3>
              <p className="chrp-step__body">{step.body}</p>
              <div className="chrp-step__actions">
                <Link href={step.actionHref} className="chrp-button-secondary" target="_blank" rel="noreferrer">
                  {step.actionLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="chrp-message-panel reveal-up reveal-delay-1" data-reveal>
        <h2 className="chrp-section__title">{copy.mediumRp.title}</h2>
        <p className="chrp-section__body max-w-4xl">{copy.mediumRp.body}</p>
      </section>

      <section className="chrp-section reveal-up reveal-delay-2" data-reveal>
        <div className="chrp-section__intro">
          <h2 className="chrp-section__title">{copy.desiredRp.title}</h2>
          <p className="chrp-section__body">{copy.desiredRp.intro}</p>
        </div>

        <div className="chrp-focus-grid">
          {copy.desiredRp.points.map((point) => (
            <article key={point.title} className="chrp-focus-card">
              <h3 className="chrp-focus-card__title">{point.title}</h3>
              <p className="chrp-focus-card__body">{point.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="chrp-section reveal-up reveal-delay-2" data-reveal>
        <div className="chrp-section__intro">
          <h2 className="chrp-section__title">{copy.visuals.title}</h2>
          <p className="chrp-section__body">{copy.visuals.intro}</p>
        </div>

        <div className="chrp-gallery">
          {galleryItems.map((item) => (
            <article key={item.label} className={`chrp-gallery__item chrp-gallery__item--${item.variant}`}>
              <ChrpVisualSurface
                alt={`${copy.visuals.title} - ${item.label}`}
                className="chrp-visual-surface chrp-gallery__media"
                sizes="(min-width: 1024px) 32vw, (min-width: 700px) 48vw, 100vw"
                src={item.src}
              />
              <span className="chrp-gallery__label">{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="chrp-section reveal-up reveal-delay-2" data-reveal>
        <div className="chrp-section__intro">
          <h2 className="chrp-section__title">{copy.comparison.title}</h2>
          <p className="chrp-section__body">{copy.comparison.intro}</p>
        </div>

        <div className="chrp-table-wrap">
          <table className="chrp-comparison-table">
            <thead>
              <tr>
                <th scope="col" className="chrp-comparison-table__feature" />
                <th scope="col">{copy.comparison.libertyLabel}</th>
                <th scope="col" className="is-highlighted">
                  {copy.comparison.chrpLabel}
                </th>
                <th scope="col">{copy.comparison.othersLabel}</th>
              </tr>
            </thead>
            <tbody>
              {copy.comparison.rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="chrp-comparison-table__feature">
                    {row.label}
                  </th>
                  <td>{row.liberty}</td>
                  <td className="is-highlighted">{row.chrp}</td>
                  <td>{row.others}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="chrp-message-panel reveal-up reveal-delay-2" data-reveal>
        <h2 className="chrp-section__title">{copy.rebirth.title}</h2>
        <p className="chrp-section__body max-w-4xl">{copy.rebirth.body}</p>
      </section>

      <section className="chrp-verify reveal-up reveal-delay-2" data-reveal>
        <div className="chrp-section__intro">
          <h2 className="chrp-section__title">{copy.verification.title}</h2>
        </div>

        <div className="chrp-verify__list">
          {copy.verification.items.map((item) => (
            <article key={item} className="chrp-verify__item">
              {item}
            </article>
          ))}

          <Link href={DISCORD_URL} className="chrp-verify__item chrp-verify__item--cta" target="_blank" rel="noreferrer">
            <span>{copy.verification.discordCardButtonLabel}</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

