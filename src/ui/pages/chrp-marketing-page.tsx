import Link from "next/link";

import { getProjectThemeStyle } from "@/config/site.config";
import type { SiteMessages } from "@/messages/types";

const DISCORD_URL = "https://discord.gg/mdZjSdJMGh";
const galleryVariants = ["wide", "tall", "square", "square", "wide", "tall"] as const;

interface ChrpMarketingPageProps {
  messages: SiteMessages;
}

export function ChrpMarketingPage({ messages }: ChrpMarketingPageProps) {
  const copy = messages.chrpPage;
  const themeStyle = getProjectThemeStyle("chrp");

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

          <div className="flex flex-wrap gap-3 pt-1">
            <Link href={DISCORD_URL} className="button-primary" target="_blank" rel="noreferrer">
              {copy.primaryCta}
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
          <div className="chrp-placeholder chrp-placeholder--hero">
            <div className="chrp-placeholder__top">
              <span className="project-tag">{copy.visuals.eyebrow}</span>
              <span className="chrp-placeholder__swap">CHRP</span>
            </div>

            <div className="chrp-placeholder__canvas" />

            <div className="chrp-placeholder__footer">
              <div className="space-y-3">
                <h2 className="chrp-placeholder__title">{copy.heroVisualTitle}</h2>
                <p className="chrp-placeholder__body">{copy.heroVisualBody}</p>
              </div>

              <div className="chrp-placeholder__chips">
                {copy.heroVisualItems.map((item) => (
                  <span key={item} className="chrp-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="chrp-section reveal-up reveal-delay-1" data-reveal>
        <div className="chrp-section__intro">
          <p className="eyebrow">{copy.start.eyebrow}</p>
          <h2 className="chrp-section__title">{copy.start.title}</h2>
          <p className="chrp-section__body">{copy.start.intro}</p>
        </div>

        <div className="chrp-steps">
          {copy.start.steps.map((step, index) => (
            <article key={step.title} className="chrp-step">
              <span className="chrp-step__number">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="chrp-step__title">{step.title}</h3>
              <p className="chrp-step__body">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="chrp-message-panel reveal-up reveal-delay-1" data-reveal>
        <p className="eyebrow">{copy.mediumRp.eyebrow}</p>
        <h2 className="chrp-section__title">{copy.mediumRp.title}</h2>
        <p className="chrp-section__body max-w-4xl">{copy.mediumRp.body}</p>
      </section>

      <section className="chrp-section reveal-up reveal-delay-2" data-reveal>
        <div className="chrp-section__intro">
          <p className="eyebrow">{copy.desiredRp.eyebrow}</p>
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
          <p className="eyebrow">{copy.visuals.eyebrow}</p>
          <h2 className="chrp-section__title">{copy.visuals.title}</h2>
          <p className="chrp-section__body">{copy.visuals.intro}</p>
        </div>

        <div className="chrp-gallery">
          {copy.visuals.placeholders.map((item, index) => (
            <article
              key={item}
              className={`chrp-gallery__item chrp-gallery__item--${galleryVariants[index % galleryVariants.length]}`}
            >
              <span className="chrp-gallery__label">{item}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="chrp-section reveal-up reveal-delay-2" data-reveal>
        <div className="chrp-section__intro">
          <p className="eyebrow">{copy.comparison.eyebrow}</p>
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
        <p className="eyebrow">{copy.rebirth.eyebrow}</p>
        <h2 className="chrp-section__title">{copy.rebirth.title}</h2>
        <p className="chrp-section__body max-w-4xl">{copy.rebirth.body}</p>
      </section>

      <section className="chrp-verify reveal-up reveal-delay-2" data-reveal>
        <div className="chrp-section__intro">
          <p className="eyebrow">{copy.verification.eyebrow}</p>
          <h2 className="chrp-section__title">{copy.verification.title}</h2>
        </div>

        <div className="chrp-verify__list">
          {copy.verification.items.map((item) => (
            <article key={item} className="chrp-verify__item">
              {item}
            </article>
          ))}
        </div>
      </section>

      <section className="chrp-cta reveal-up reveal-delay-2" data-reveal>
        <div className="chrp-section__intro">
          <p className="eyebrow">{copy.finalCta.eyebrow}</p>
          <h2 className="chrp-section__title">{copy.finalCta.title}</h2>
          <p className="chrp-section__body max-w-3xl">{copy.finalCta.body}</p>
        </div>

        <Link href={DISCORD_URL} className="button-primary" target="_blank" rel="noreferrer">
          {copy.finalCta.buttonLabel}
        </Link>
      </section>
    </main>
  );
}
