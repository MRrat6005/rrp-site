import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import { siteConfig, getProjectThemeStyle, type Locale } from "@/config/site.config";
import { getLocalizedPath } from "@/lib/i18n";
import type { CrownVisualSlotCopy, SiteMessages } from "@/messages/types";
import { LogoTile } from "@/ui/common/logo-tile";
import { ConfigurableBackdrop } from "@/ui/layout/configurable-backdrop";

interface CrownEntryPageProps {
  locale: Locale;
  messages: SiteMessages;
}

type CrownVisualVariant = "hero" | "status" | "settings" | "modules" | "branding";

interface CrownVisualSurfaceProps {
  copy: CrownVisualSlotCopy;
  variant: CrownVisualVariant;
  markPath: string | null;
}

function CrownVisualSurface({ copy, variant, markPath }: CrownVisualSurfaceProps) {
  const surface = siteConfig.visuals.backgrounds.dashboardEntry;

  return (
    <article className={`crown-visual crown-visual--${variant}`}>
      <ConfigurableBackdrop background={surface} className="absolute inset-0" />
      <div className={`crown-visual__shade crown-visual__shade--${variant}`} />

      <div className="crown-visual__content">
        <div className="crown-visual__header">
          <div className="space-y-3">
            <p className="eyebrow text-white/46">{copy.eyebrow}</p>
            <h3 className="crown-visual__title">{copy.title}</h3>
          </div>
          <span className="crown-slot-chip">{copy.slotLabel}</span>
        </div>

        <div className={`crown-visual__canvas crown-visual__canvas--${variant}`}>
          {variant === "hero" ? (
            <div className="crown-wire crown-wire--hero">
              <div className="crown-wire__topbar">
                <span className="crown-wire__signal" />
                <span className="crown-wire__signal" />
                <span className="crown-wire__signal crown-wire__signal--wide" />
              </div>

              <div className="crown-wire__hero-shell">
                <div className="crown-wire__sidebar">
                  <span className="crown-wire__nav" />
                  <span className="crown-wire__nav" />
                  <span className="crown-wire__nav crown-wire__nav--active" />
                  <span className="crown-wire__nav" />
                </div>

                <div className="crown-wire__hero-main">
                  <div className="crown-wire__hero-grid">
                    <span className="crown-wire__card crown-wire__card--compact" />
                    <span className="crown-wire__card crown-wire__card--compact" />
                    <span className="crown-wire__card crown-wire__card--compact" />
                  </div>

                  <div className="crown-wire__mark-stage">
                    {markPath ? (
                      <Image
                        src={markPath}
                        alt=""
                        aria-hidden="true"
                        width={240}
                        height={240}
                        unoptimized
                        className="crown-wire__mark"
                      />
                    ) : null}
                  </div>

                  <div className="crown-wire__hero-grid crown-wire__hero-grid--wide">
                    <span className="crown-wire__card crown-wire__card--wide" />
                    <span className="crown-wire__card crown-wire__card--tall" />
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {variant === "status" ? (
            <div className="crown-wire crown-wire--status">
              <div className="crown-wire__status-rail">
                <span className="crown-wire__badge">Core</span>
                <span className="crown-wire__badge">UI</span>
                <span className="crown-wire__badge">Licenses</span>
              </div>
              <div className="crown-wire__status-grid">
                <div className="crown-wire__status-card">
                  <span className="crown-wire__pulse" />
                  <span className="crown-wire__line crown-wire__line--lg" />
                  <span className="crown-wire__line" />
                </div>
                <div className="crown-wire__status-bars">
                  <span className="crown-wire__bar crown-wire__bar--1" />
                  <span className="crown-wire__bar crown-wire__bar--2" />
                  <span className="crown-wire__bar crown-wire__bar--3" />
                  <span className="crown-wire__bar crown-wire__bar--4" />
                </div>
                <div className="crown-wire__status-card crown-wire__status-card--stacked">
                  <span className="crown-wire__line crown-wire__line--lg" />
                  <span className="crown-wire__line" />
                  <span className="crown-wire__line" />
                </div>
              </div>
            </div>
          ) : null}

          {variant === "settings" ? (
            <div className="crown-wire crown-wire--settings">
              <div className="crown-wire__settings-sidebar">
                <span className="crown-wire__nav crown-wire__nav--active" />
                <span className="crown-wire__nav" />
                <span className="crown-wire__nav" />
                <span className="crown-wire__nav" />
              </div>
              <div className="crown-wire__settings-main">
                <div className="crown-wire__settings-header">
                  <span className="crown-wire__line crown-wire__line--lg" />
                  <span className="crown-wire__line crown-wire__line--sm" />
                </div>
                <div className="crown-wire__settings-grid">
                  <div className="crown-wire__panel-group">
                    <span className="crown-wire__field" />
                    <span className="crown-wire__field" />
                    <span className="crown-wire__field crown-wire__field--wide" />
                  </div>
                  <div className="crown-wire__panel-group crown-wire__panel-group--tall">
                    <span className="crown-wire__field" />
                    <span className="crown-wire__field" />
                    <span className="crown-wire__field" />
                    <span className="crown-wire__field crown-wire__field--wide" />
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {variant === "modules" ? (
            <div className="crown-wire crown-wire--modules">
              <div className="crown-wire__modules-grid">
                <span className="crown-wire__module-tile">Bank</span>
                <span className="crown-wire__module-tile">Social</span>
                <span className="crown-wire__module-tile">Weather</span>
                <span className="crown-wire__module-tile">Sessions</span>
                <span className="crown-wire__module-tile">Rentals</span>
                <span className="crown-wire__module-tile crown-wire__module-tile--muted">More</span>
              </div>
            </div>
          ) : null}

          {variant === "branding" ? (
            <div className="crown-wire crown-wire--branding">
              <div className="crown-wire__branding-header">
                <span className="crown-wire__locale-pill">RU</span>
                <span className="crown-wire__locale-pill crown-wire__locale-pill--active">EN</span>
                <span className="crown-wire__badge crown-wire__badge--ghost">Entitlements</span>
              </div>
              <div className="crown-wire__branding-grid">
                <div className="crown-wire__branding-card">
                  <span className="crown-wire__line crown-wire__line--lg" />
                  <span className="crown-wire__line" />
                  <span className="crown-wire__line crown-wire__line--sm" />
                </div>
                <div className="crown-wire__branding-card crown-wire__branding-card--accent">
                  <span className="crown-wire__line crown-wire__line--lg" />
                  <span className="crown-wire__line" />
                  <span className="crown-wire__line" />
                </div>
                <div className="crown-wire__branding-card crown-wire__branding-card--wide">
                  <span className="crown-wire__line crown-wire__line--lg" />
                  <span className="crown-wire__line" />
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="crown-visual__footer">
          <p className="crown-visual__body">{copy.body}</p>
          <p className="crown-visual__slot-path">
            <span>{copy.slotLabel}</span>
            {copy.slotPath}
          </p>
        </div>
      </div>
    </article>
  );
}

export function CrownEntryPage({ locale, messages }: CrownEntryPageProps) {
  const copy = messages.crownEntry;
  const dashboardHref = getLocalizedPath(locale, siteConfig.ctaRoutes.dashboard);
  const learnMoreHref = "#crown-features";
  const themeStyle = getProjectThemeStyle("crown");
  const asset = siteConfig.assetPlaceholders.projects.crown;
  const markPath = siteConfig.visuals.projects.crown.markPath;
  const categoryLabel = messages.projects.items.crown.categoryLabel;

  return (
    <main
      className="crown-page mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 pb-16 pt-10 sm:px-8 lg:gap-8 lg:px-10 lg:pb-24 lg:pt-14"
      style={themeStyle}
    >
      <section className="crown-hero reveal-up" data-reveal>
        <div className="crown-hero__copy">
          <p className="eyebrow">{copy.hero.eyebrow}</p>

          <div className="crown-hero__identity">
            <LogoTile shortLabel={asset.shortLabel} label={asset.label} imagePath={markPath} />
            <div className="space-y-1">
              <p className="crown-hero__product">{siteConfig.projects.crown.title}</p>
              <p className="crown-hero__category">{categoryLabel}</p>
            </div>
          </div>

          <h1 className="crown-hero__title">{copy.hero.title}</h1>
          <p className="crown-hero__intro">{copy.hero.intro}</p>
          <p className="crown-hero__summary">{copy.hero.summary}</p>

          <div className="crown-cta-row">
            <Link href={dashboardHref} className="button-primary">
              {copy.hero.primaryCta}
            </Link>
            <Link href={learnMoreHref} className="crown-button-secondary">
              {copy.hero.secondaryCta}
            </Link>
          </div>

          <dl className="crown-hero__stats">
            {copy.hero.stats.map((item) => (
              <div key={item.label} className="crown-hero__stat">
                <dt className="crown-hero__stat-label">{item.label}</dt>
                <dd className="crown-hero__stat-value">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <CrownVisualSurface copy={copy.hero.visual} variant="hero" markPath={markPath} />
      </section>

      <section className="crown-proof-strip reveal-up reveal-delay-1" data-reveal>
        {copy.hero.proofStrip.map((item) => (
          <span key={item} className="crown-proof-pill">
            {item}
          </span>
        ))}
      </section>

      <section className="crown-section reveal-up reveal-delay-1" data-reveal>
        <div className="crown-section__intro">
          <p className="eyebrow">{copy.status.eyebrow}</p>
          <h2 className="crown-section__title">{copy.status.title}</h2>
          <p className="crown-section__body">{copy.status.intro}</p>
        </div>

        <div className="crown-status-grid">
          <div className="crown-status-panel">
            <div className="crown-status-panel__summary">
              <p className="crown-status-panel__label">{copy.status.summaryLabel}</p>
              <p className="crown-status-panel__value">{copy.status.summaryValue}</p>
            </div>

            <div className="crown-status-panel__signals">
              {copy.status.signals.map((item) => (
                <article key={item.label} className="crown-status-signal">
                  <div>
                    <p className="crown-status-signal__label">{item.label}</p>
                    <p className="crown-status-signal__value">{item.value}</p>
                  </div>
                  <p className="crown-status-signal__note">{item.note}</p>
                </article>
              ))}
            </div>
          </div>

          <CrownVisualSurface copy={copy.status.visual} variant="status" markPath={markPath} />
        </div>
      </section>

      <section id="crown-features" className="crown-section reveal-up reveal-delay-1" data-reveal>
        <div className="crown-section__intro">
          <p className="eyebrow">{copy.capabilities.eyebrow}</p>
          <h2 className="crown-section__title">{copy.capabilities.title}</h2>
          <p className="crown-section__body">{copy.capabilities.intro}</p>
        </div>

        <div className="crown-capability-grid">
          {copy.capabilities.groups.map((group) => (
            <article key={group.title} className="crown-capability-card">
              <div className="space-y-3">
                <h3 className="crown-subtitle">{group.title}</h3>
                <p className="crown-copy">{group.body}</p>
              </div>

              <ul className="crown-detail-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="crown-section reveal-up reveal-delay-2" data-reveal>
        <div className="crown-section__intro">
          <p className="eyebrow">{copy.showcase.eyebrow}</p>
          <h2 className="crown-section__title">{copy.showcase.title}</h2>
          <p className="crown-section__body">{copy.showcase.intro}</p>
        </div>

        <div className="crown-showcase-grid">
          <CrownVisualSurface copy={copy.showcase.visual} variant="settings" markPath={markPath} />

          <div className="crown-showcase-panel">
            <div className="crown-highlight-stack">
              {copy.showcase.highlights.map((item) => (
                <article key={item} className="crown-highlight-row">
                  <span className="crown-highlight-row__dot" aria-hidden="true" />
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="crown-section reveal-up reveal-delay-2" data-reveal>
        <div className="crown-section__intro">
          <p className="eyebrow">{copy.modules.eyebrow}</p>
          <h2 className="crown-section__title">{copy.modules.title}</h2>
          <p className="crown-section__body">{copy.modules.intro}</p>
        </div>

        <div className="crown-modules-grid">
          <div className="crown-module-list">
            {copy.modules.items.map((item) => (
              <article key={item.title} className="crown-module-row">
                <h3 className="crown-subtitle">{item.title}</h3>
                <p className="crown-copy">{item.body}</p>
              </article>
            ))}
          </div>

          <CrownVisualSurface copy={copy.modules.visual} variant="modules" markPath={markPath} />
        </div>

        <p className="crown-section__footnote">{copy.modules.footnote}</p>
      </section>

      <section className="crown-section reveal-up reveal-delay-2" data-reveal>
        <div className="crown-section__intro">
          <p className="eyebrow">{copy.governance.eyebrow}</p>
          <h2 className="crown-section__title">{copy.governance.title}</h2>
          <p className="crown-section__body">{copy.governance.intro}</p>
        </div>

        <div className="crown-governance-grid">
          <CrownVisualSurface copy={copy.governance.visual} variant="branding" markPath={markPath} />

          <div className="crown-pillar-grid">
            {copy.governance.pillars.map((item) => (
              <article key={item.title} className="crown-pillar-card">
                <h3 className="crown-subtitle">{item.title}</h3>
                <p className="crown-copy">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="crown-comparison" className="crown-section reveal-up reveal-delay-2" data-reveal>
        <div className="crown-section__intro">
          <p className="eyebrow">{copy.comparison.eyebrow}</p>
          <h2 className="crown-section__title">{copy.comparison.title}</h2>
          <p className="crown-section__body">{copy.comparison.intro}</p>
        </div>

        <div className="crown-comparison-table">
          <div className="crown-comparison-table__head crown-comparison-table__head--feature" />
          <div className="crown-comparison-table__head">{copy.comparison.genericLabel}</div>
          <div className="crown-comparison-table__head crown-comparison-table__head--accent">
            {copy.comparison.crownLabel}
          </div>

          {copy.comparison.rows.map((row) => (
            <Fragment key={row.label}>
              <div className="crown-comparison-table__cell crown-comparison-table__cell--label">{row.label}</div>
              <div className="crown-comparison-table__cell">{row.generic}</div>
              <div className="crown-comparison-table__cell crown-comparison-table__cell--accent">{row.crown}</div>
            </Fragment>
          ))}
        </div>
      </section>

      <section className="crown-final-cta reveal-up reveal-delay-2" data-reveal>
        <div className="space-y-4">
          <p className="eyebrow">{copy.finalCta.eyebrow}</p>
          <h2 className="crown-final-cta__title">{copy.finalCta.title}</h2>
          <p className="crown-final-cta__body">{copy.finalCta.body}</p>
        </div>

        <div className="crown-cta-row crown-cta-row--final">
          <Link href={dashboardHref} className="button-primary">
            {copy.finalCta.primaryCta}
          </Link>
          <Link href={learnMoreHref} className="crown-button-secondary">
            {copy.finalCta.secondaryCta}
          </Link>
        </div>
      </section>
    </main>
  );
}


