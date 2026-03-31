import Image from "next/image";
import Link from "next/link";

import { getProjectThemeStyle, siteConfig, type Locale } from "@/config/site.config";
import { getLocalizedPath } from "@/lib/i18n";
import type { SiteMessages } from "@/messages/types";

interface AboutMarketingPageProps {
  locale: Locale;
  messages: SiteMessages;
}

export function AboutMarketingPage({ locale, messages }: AboutMarketingPageProps) {
  const copy = messages.about;
  const brandMarkPath = siteConfig.visuals.brand.markPath;
  const chrpHref = getLocalizedPath(locale, siteConfig.ctaRoutes.projects.chrp);
  const crownHref = getLocalizedPath(locale, siteConfig.ctaRoutes.projects.crown);
  const teamRevealDelays = ["", "reveal-delay-1", "reveal-delay-2", "reveal-delay-1", "reveal-delay-2"];

  return (
    <main className="about-page mx-auto flex w-full max-w-[84rem] flex-col gap-14 px-6 pb-20 pt-10 sm:px-8 lg:gap-20 lg:px-10 lg:pb-28 lg:pt-14">
      <section className="section-frame about-hero reveal-up" data-reveal>
        <div className="hero-aurora" />

        <div className="about-hero__copy">
          <p className="about-kicker">{copy.hero.eyebrow}</p>
          <h1 className="about-hero__title">{copy.hero.title}</h1>
          <p className="about-hero__subtitle">{copy.hero.subtitle}</p>
          <p className="about-hero__body">{copy.hero.summary}</p>

          <div className="about-hero__actions">
            <Link href={chrpHref} className="button-primary">
              {copy.hero.primaryCta}
            </Link>
            <Link href={crownHref} className="button-secondary">
              {copy.hero.secondaryCta}
            </Link>
          </div>
        </div>

        <aside className="about-hero-panel glass-panel glass-panel-strong reveal-up reveal-delay-1" data-reveal>
          <div className="about-hero-panel__brand">
            <div className="about-hero-panel__mark-shell">
              {brandMarkPath ? (
                <Image
                  src={brandMarkPath}
                  alt=""
                  aria-hidden="true"
                  width={220}
                  height={220}
                  unoptimized
                  className="about-hero-panel__mark"
                />
              ) : (
                <span className="about-hero-panel__fallback-mark">RRP</span>
              )}
            </div>

            <div className="about-hero-panel__intro">
              <p className="about-kicker">{copy.hero.visualTitle}</p>
              <p className="about-hero-panel__body">{copy.hero.visualBody}</p>
            </div>
          </div>

          <div className="about-hero-panel__routes">
            {copy.directions.items.map((item) => {
              const markPath = siteConfig.visuals.projects[item.key].markPath;
              const projectTitle = siteConfig.projects[item.key].title;

              return (
                <div
                  key={item.key}
                  className="about-hero-route"
                  style={getProjectThemeStyle(item.key)}
                >
                  <div className="about-hero-route__mark-shell">
                    {markPath ? (
                      <Image
                        src={markPath}
                        alt=""
                        aria-hidden="true"
                        width={84}
                        height={84}
                        unoptimized
                        className="about-hero-route__mark"
                      />
                    ) : (
                      <span className="about-hero-route__fallback">{projectTitle}</span>
                    )}
                  </div>
                  <div className="about-hero-route__copy">
                    <p className="about-hero-route__name">{projectTitle}</p>
                    <p className="about-hero-route__meta">{item.title}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <dl className="about-hero-panel__stats">
            {copy.hero.visualStats.map((item) => (
              <div key={item.label} className="about-hero-panel__stat">
                <dt className="about-hero-panel__stat-label">{item.label}</dt>
                <dd className="about-hero-panel__stat-value">{item.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      <section className="about-section">
        <div className="about-section__lead reveal-up" data-reveal>
          <p className="about-kicker">{copy.creates.eyebrow}</p>
          <h2 className="about-section__title">{copy.creates.title}</h2>
          <p className="about-section__body">{copy.creates.intro}</p>
        </div>

        <div className="about-creates-grid">
          {copy.creates.layers.map((item, index) => (
            <article
              key={item.title}
              className={`quiet-surface hover-lift reveal-up ${index === 1 ? "reveal-delay-1" : index === 2 ? "reveal-delay-2" : ""}`.trim()}
              data-reveal
            >
              <h3 className="about-card__title">{item.title}</h3>
              <p className="about-card__body">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section">
        <div className="about-section__lead reveal-up" data-reveal>
          <p className="about-kicker">{copy.directions.eyebrow}</p>
          <h2 className="about-section__title">{copy.directions.title}</h2>
          <p className="about-section__body">{copy.directions.intro}</p>
        </div>

        <div className="about-directions-grid">
          {copy.directions.items.map((item, index) => {
            const href = item.key === "chrp" ? chrpHref : crownHref;
            const project = siteConfig.projects[item.key];
            const markPath = siteConfig.visuals.projects[item.key].markPath;

            return (
              <article
                key={item.key}
                className={`project-card about-direction-card hover-lift reveal-up ${index === 1 ? "reveal-delay-1" : ""}`.trim()}
                data-reveal
                style={getProjectThemeStyle(item.key)}
              >
                <div className="about-direction-card__top">
                  <div>
                    <p className="about-kicker">{item.eyebrow}</p>
                    <h3 className="about-direction-card__title">{item.title}</h3>
                  </div>

                  <div className="about-direction-card__mark-shell">
                    {markPath ? (
                      <Image
                        src={markPath}
                        alt=""
                        aria-hidden="true"
                        width={132}
                        height={132}
                        unoptimized
                        className="about-direction-card__mark"
                      />
                    ) : (
                      <span className="about-direction-card__fallback-mark">{project.shortTitle}</span>
                    )}
                  </div>
                </div>

                <p className="about-direction-card__body">{item.body}</p>

                <div className="about-direction-card__footer">
                  <p className="about-direction-card__name">{project.title}</p>
                  <Link href={href} className="button-secondary about-direction-card__cta">
                    {item.ctaLabel}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="about-section">
        <div className="about-section__lead reveal-up" data-reveal>
          <p className="about-kicker">{copy.approach.eyebrow}</p>
          <h2 className="about-section__title">{copy.approach.title}</h2>
          <p className="about-section__body">{copy.approach.intro}</p>
        </div>

        <div className="about-principles-grid">
          {copy.approach.principles.map((item, index) => (
            <article
              key={item.title}
              className={`quiet-surface hover-lift-sm reveal-up ${index === 1 ? "reveal-delay-1" : index >= 2 ? "reveal-delay-2" : ""}`.trim()}
              data-reveal
            >
              <h3 className="about-card__title">{item.title}</h3>
              <p className="about-card__body">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section about-team-section">
        <div className="about-team__lead reveal-up" data-reveal>
          <h2 className="about-section__title about-team__title">{copy.team.title}</h2>
        </div>

        <div className="about-team-grid">
          {copy.team.members.map((member, index) => (
            <article
              key={member.nickname}
              className={`about-team-card ${member.isPrimary ? "about-team-card--featured" : "about-team-card--accent"} reveal-up ${teamRevealDelays[index]}`.trim()}
              data-reveal
              tabIndex={0}
            >
              <div
                className="about-team-card__media"
                aria-hidden="true"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.04)), url('${member.imagePath}')`
                }}
              />

              <div className="about-team-card__copy">
                <h3 className="about-team-card__nickname">{member.nickname}</h3>
                <p className="about-team-card__role">{member.role}</p>
              </div>

              <div className="about-team-card__description-shell">
                <p className="about-team-card__description">{member.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-frame about-final reveal-up reveal-delay-2" data-reveal>
        <div className="about-final__copy">
          <p className="about-kicker">{copy.finalCta.eyebrow}</p>
          <h2 className="about-section__title">{copy.finalCta.title}</h2>
          <p className="about-section__body">{copy.finalCta.body}</p>
        </div>

        <div className="about-final__actions">
          <Link href={chrpHref} className="button-primary">
            {copy.finalCta.primaryCta}
          </Link>
          <Link href={crownHref} className="button-secondary">
            {copy.finalCta.secondaryCta}
          </Link>
        </div>
      </section>
    </main>
  );
}

