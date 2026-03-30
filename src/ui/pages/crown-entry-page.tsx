"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { siteConfig, getProjectThemeStyle, type Locale } from "@/config/site.config";
import { getLocalizedPath } from "@/lib/i18n";
import type { SiteMessages } from "@/messages/types";
import { LogoTile } from "@/ui/common/logo-tile";
import { ConfigurableBackdrop } from "@/ui/layout/configurable-backdrop";

interface CrownEntryPageProps {
  locale: Locale;
  messages: SiteMessages;
}

type CrownVisualVariant = "hero" | "status" | "settings" | "branding" | "module";

interface CrownVisualSurfaceProps {
  alt: string;
  body: string;
  markPath: string | null;
  slotPath: string;
  title: string;
  variant: CrownVisualVariant;
  moduleLabel?: string;
}

function CrownHeroFallback({ markPath }: { markPath: string | null }) {
  return (
    <div className="crown-wire crown-wire--hero">
      <div className="crown-wire__toolbar">
        <span className="crown-wire__dot" />
        <span className="crown-wire__dot" />
        <span className="crown-wire__line crown-wire__line--toolbar" />
      </div>

      <div className="crown-wire__hero-layout">
        <div className="crown-wire__sidebar">
          <span className="crown-wire__nav is-active" />
          <span className="crown-wire__nav" />
          <span className="crown-wire__nav" />
          <span className="crown-wire__nav" />
        </div>

        <div className="crown-wire__hero-stage">
          <div className="crown-wire__cards crown-wire__cards--three">
            <span className="crown-wire__tile crown-wire__tile--compact" />
            <span className="crown-wire__tile crown-wire__tile--compact" />
            <span className="crown-wire__tile crown-wire__tile--compact" />
          </div>

          <div className="crown-wire__mark-stage">
            {markPath ? (
              <Image
                src={markPath}
                alt=""
                aria-hidden="true"
                width={220}
                height={220}
                unoptimized
                className="crown-wire__mark"
              />
            ) : (
              <span className="crown-wire__module-name">CROWN</span>
            )}
          </div>

          <div className="crown-wire__cards crown-wire__cards--wide">
            <span className="crown-wire__tile crown-wire__tile--wide" />
            <span className="crown-wire__tile crown-wire__tile--tall" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CrownStatusFallback() {
  return (
    <div className="crown-wire crown-wire--status">
      <div className="crown-wire__cards crown-wire__cards--three">
        <div className="crown-wire__panel">
          <span className="crown-wire__pulse" />
          <span className="crown-wire__line crown-wire__line--headline" />
          <span className="crown-wire__line crown-wire__line--mid" />
        </div>
        <div className="crown-wire__panel">
          <span className="crown-wire__line crown-wire__line--headline" />
          <span className="crown-wire__line crown-wire__line--mid" />
          <span className="crown-wire__line crown-wire__line--short" />
        </div>
        <div className="crown-wire__panel">
          <span className="crown-wire__line crown-wire__line--headline" />
          <span className="crown-wire__line crown-wire__line--mid" />
          <span className="crown-wire__line crown-wire__line--mid" />
        </div>
      </div>

      <div className="crown-wire__bars">
        <span className="crown-wire__bar crown-wire__bar--1" />
        <span className="crown-wire__bar crown-wire__bar--2" />
        <span className="crown-wire__bar crown-wire__bar--3" />
        <span className="crown-wire__bar crown-wire__bar--4" />
      </div>
    </div>
  );
}

function CrownSettingsFallback() {
  return (
    <div className="crown-wire crown-wire--settings">
      <div className="crown-wire__settings-layout">
        <div className="crown-wire__sidebar">
          <span className="crown-wire__nav is-active" />
          <span className="crown-wire__nav" />
          <span className="crown-wire__nav" />
          <span className="crown-wire__nav" />
        </div>

        <div className="crown-wire__settings-stage">
          <div className="crown-wire__panel crown-wire__panel--header">
            <span className="crown-wire__line crown-wire__line--headline" />
            <span className="crown-wire__line crown-wire__line--short" />
          </div>

          <div className="crown-wire__form-grid">
            <span className="crown-wire__field" />
            <span className="crown-wire__field" />
            <span className="crown-wire__field crown-wire__field--wide" />
            <span className="crown-wire__field" />
            <span className="crown-wire__field crown-wire__field--wide" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CrownBrandingFallback() {
  return (
    <div className="crown-wire crown-wire--branding">
      <div className="crown-wire__toolbar crown-wire__toolbar--start">
        <span className="crown-wire__chip">RU</span>
        <span className="crown-wire__chip crown-wire__chip--active">EN</span>
        <span className="crown-wire__chip">FULL</span>
      </div>

      <div className="crown-wire__cards crown-wire__cards--three">
        <div className="crown-wire__panel">
          <span className="crown-wire__line crown-wire__line--headline" />
          <span className="crown-wire__line crown-wire__line--mid" />
          <span className="crown-wire__line crown-wire__line--short" />
        </div>
        <div className="crown-wire__panel crown-wire__panel--accent">
          <span className="crown-wire__line crown-wire__line--headline" />
          <span className="crown-wire__line crown-wire__line--mid" />
          <span className="crown-wire__line crown-wire__line--mid" />
        </div>
        <div className="crown-wire__panel">
          <span className="crown-wire__line crown-wire__line--headline" />
          <span className="crown-wire__line crown-wire__line--mid" />
          <span className="crown-wire__line crown-wire__line--short" />
        </div>
      </div>
    </div>
  );
}

function CrownModuleFallback({ label }: { label: string }) {
  return (
    <div className="crown-wire crown-wire--module">
      <div className="crown-wire__module-stage">
        <span className="crown-wire__module-name">{label}</span>

        <div className="crown-wire__module-window">
          <div className="crown-wire__toolbar">
            <span className="crown-wire__dot" />
            <span className="crown-wire__dot" />
            <span className="crown-wire__line crown-wire__line--toolbar" />
          </div>

          <div className="crown-wire__module-grid">
            <span className="crown-wire__tile crown-wire__tile--wide" />
            <span className="crown-wire__tile crown-wire__tile--tall" />
            <span className="crown-wire__tile crown-wire__tile--compact" />
            <span className="crown-wire__tile crown-wire__tile--compact" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CrownVisualSurface({
  alt,
  body,
  markPath,
  slotPath,
  title,
  variant,
  moduleLabel
}: CrownVisualSurfaceProps) {
  const [hasError, setHasError] = useState(false);
  const surface = siteConfig.visuals.backgrounds.dashboardEntry;

  useEffect(() => {
    setHasError(false);
  }, [slotPath]);

  return (
    <article className={`crown-visual crown-visual--${variant}`}>
      <ConfigurableBackdrop background={surface} className="absolute inset-0" />
      <div className={`crown-visual__shade crown-visual__shade--${variant}`} />

      <div className="crown-visual__content">
        <div className="crown-visual__media">
          <div className="crown-visual__placeholder" aria-hidden="true" />
          {!hasError ? (
            <Image
              fill
              alt={alt}
              className="crown-visual__image"
              onError={() => setHasError(true)}
              priority={variant === "hero"}
              sizes={variant === "hero" ? "(min-width: 1024px) 48vw, 100vw" : "(min-width: 1024px) 52vw, 100vw"}
              src={slotPath}
            />
          ) : null}

          <div className="crown-visual__fallback" aria-hidden="true">
            {variant === "hero" ? <CrownHeroFallback markPath={markPath} /> : null}
            {variant === "status" ? <CrownStatusFallback /> : null}
            {variant === "settings" ? <CrownSettingsFallback /> : null}
            {variant === "branding" ? <CrownBrandingFallback /> : null}
            {variant === "module" ? <CrownModuleFallback label={moduleLabel ?? title} /> : null}
          </div>
        </div>

        <div className="crown-visual__footer">
          <h3 className="crown-visual__title">{title}</h3>
          <p className="crown-visual__body">{body}</p>
          <p className="crown-visual__slot-path">{slotPath}</p>
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
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);

  useEffect(() => {
    setActiveModuleIndex(0);
  }, [locale]);

  const activeModule =
    copy.modules.items[Math.min(activeModuleIndex, Math.max(copy.modules.items.length - 1, 0))] ??
    copy.modules.items[0];

  return (
    <main
      className="crown-page mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 pb-16 pt-10 sm:px-8 lg:gap-10 lg:px-10 lg:pb-24 lg:pt-14"
      style={themeStyle}
    >
      <section className="crown-hero reveal-up" data-reveal>
        <div className="crown-hero__copy">
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

        <CrownVisualSurface
          alt={`${siteConfig.projects.crown.title} hero visual`}
          body={copy.hero.visual.body}
          markPath={markPath}
          slotPath={copy.hero.visual.slotPath}
          title={copy.hero.visual.title}
          variant="hero"
        />
      </section>

      <section className="crown-section crown-section--status reveal-up reveal-delay-1" data-reveal>
        <div className="crown-status-grid">
          <div className="crown-status-panel">
            <div className="crown-section__copy">
              <h2 className="crown-section__title">{copy.status.title}</h2>
              <p className="crown-section__body">{copy.status.intro}</p>
            </div>

            <div className="crown-status-panel__summary">
              <p className="crown-status-panel__value">{copy.status.summaryValue}</p>
            </div>

            <div className="crown-status-panel__signals">
              {copy.status.signals.map((item) => (
                <article key={item.label} className="crown-status-signal">
                  <div className="crown-status-signal__top">
                    <p className="crown-status-signal__label">{item.label}</p>
                    <p className="crown-status-signal__value">{item.value}</p>
                  </div>
                  <p className="crown-status-signal__note">{item.note}</p>
                </article>
              ))}
            </div>
          </div>

          <CrownVisualSurface
            alt={`${siteConfig.projects.crown.title} status visual`}
            body={copy.status.visual.body}
            markPath={markPath}
            slotPath={copy.status.visual.slotPath}
            title={copy.status.visual.title}
            variant="status"
          />
        </div>
      </section>

      <section id="crown-features" className="crown-section crown-section--product reveal-up reveal-delay-1" data-reveal>
        <div className="crown-section__lead">
          <div className="crown-section__copy">
            <h2 className="crown-section__title">{copy.capabilities.title}</h2>
            <p className="crown-section__body">{copy.capabilities.intro}</p>
          </div>
        </div>

        <div className="crown-showcase-grid">
          <CrownVisualSurface
            alt={`${siteConfig.projects.crown.title} settings visual`}
            body={copy.showcase.visual.body}
            markPath={markPath}
            slotPath={copy.showcase.visual.slotPath}
            title={copy.showcase.visual.title}
            variant="settings"
          />

          <div className="crown-showcase-panel">
            <div className="crown-showcase-panel__copy">
              <h3 className="crown-subtitle">{copy.showcase.title}</h3>
              <p className="crown-copy">{copy.showcase.intro}</p>
            </div>

            <div className="crown-capability-grid">
              {copy.capabilities.groups.map((group) => (
                <article key={group.title} className="crown-capability-card">
                  <h4 className="crown-subtitle crown-subtitle--sm">{group.title}</h4>
                  <p className="crown-copy">{group.body}</p>

                  <ul className="crown-detail-list">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

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

      <section className="crown-section crown-section--modules reveal-up reveal-delay-2" data-reveal>
        <div className="crown-section__lead">
          <div className="crown-section__copy">
            <h2 className="crown-section__title">{copy.modules.title}</h2>
            <p className="crown-section__body">{copy.modules.intro}</p>
          </div>
          <p className="crown-section__footnote">{copy.modules.footnote}</p>
        </div>

        <div className="crown-modules-grid">
          <div className="crown-module-selector" role="tablist" aria-label={copy.modules.title}>
            {copy.modules.items.map((item, index) => {
              const isActive = index === activeModuleIndex;

              return (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`crown-module-tab ${isActive ? "is-active" : ""}`}
                  onClick={() => setActiveModuleIndex(index)}
                >
                  <span className="crown-module-tab__name">{item.title}</span>
                  <span className="crown-module-tab__body">{item.body}</span>
                </button>
              );
            })}
          </div>

          {activeModule ? (
            <CrownVisualSurface
              key={activeModule.slotPath}
              alt={`${siteConfig.projects.crown.title} ${activeModule.title} visual`}
              body={activeModule.body}
              markPath={markPath}
              moduleLabel={activeModule.title}
              slotPath={activeModule.slotPath}
              title={activeModule.title}
              variant="module"
            />
          ) : null}
        </div>
      </section>

      <section className="crown-section crown-section--governance reveal-up reveal-delay-2" data-reveal>
        <div className="crown-section__lead">
          <div className="crown-section__copy">
            <h2 className="crown-section__title">{copy.governance.title}</h2>
            <p className="crown-section__body">{copy.governance.intro}</p>
          </div>
        </div>

        <div className="crown-governance-grid">
          <CrownVisualSurface
            alt={`${siteConfig.projects.crown.title} governance visual`}
            body={copy.governance.visual.body}
            markPath={markPath}
            slotPath={copy.governance.visual.slotPath}
            title={copy.governance.visual.title}
            variant="branding"
          />

          <div className="crown-pillar-grid">
            {copy.governance.pillars.map((item) => (
              <article key={item.title} className="crown-pillar-card">
                <h3 className="crown-subtitle crown-subtitle--sm">{item.title}</h3>
                <p className="crown-copy">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="crown-comparison" className="crown-section crown-section--comparison reveal-up reveal-delay-2" data-reveal>
        <div className="crown-section__lead">
          <div className="crown-section__copy">
            <h2 className="crown-section__title">{copy.comparison.title}</h2>
            <p className="crown-section__body">{copy.comparison.intro}</p>
          </div>
        </div>

        <div className="crown-table-wrap">
          <table className="crown-comparison-table">
            <thead>
              <tr>
                <th scope="col" className="crown-comparison-table__feature" />
                <th scope="col">{copy.comparison.freeLabel}</th>
                <th scope="col" className="is-highlighted">
                  {copy.comparison.fullLabel}
                </th>
                <th scope="col">{copy.comparison.othersLabel}</th>
              </tr>
            </thead>
            <tbody>
              {copy.comparison.rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="crown-comparison-table__feature">
                    {row.label}
                  </th>
                  <td>{row.free}</td>
                  <td className="is-highlighted">{row.full}</td>
                  <td>{row.others}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="crown-final-cta reveal-up reveal-delay-2" data-reveal>
        <div className="space-y-4">
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
