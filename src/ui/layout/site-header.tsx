"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  getProjectThemeStyle,
  projectOrder,
  siteConfig,
  type Locale
} from "@/config/site.config";
import { getAlternateLocale, getLocalizedPath, swapLocaleInPath } from "@/lib/i18n";
import type { SiteMessages } from "@/messages/types";
import { LogoTile } from "@/ui/common/logo-tile";

interface SiteHeaderProps {
  locale: Locale;
  messages: SiteMessages;
}

function isCurrentPath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader({ locale, messages }: SiteHeaderProps) {
  const pathname = usePathname() ?? `/${locale}`;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsProjectsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const syncScrollState = () => setIsScrolled(window.scrollY > 10);

    syncScrollState();
    window.addEventListener("scroll", syncScrollState, { passive: true });

    return () => window.removeEventListener("scroll", syncScrollState);
  }, []);

  useEffect(() => {
    if (!isMenuOpen && !isProjectsOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setIsProjectsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setIsProjectsOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen, isProjectsOpen]);

  const headerLinks = siteConfig.navigation.header.map((item) => ({
    ...item,
    href: getLocalizedPath(locale, item.segment),
    label: messages.nav[item.key]
  }));

  const projectLinks = projectOrder.map((projectId) => {
    const project = siteConfig.projects[projectId];

    return {
      ...project,
      asset: siteConfig.assetPlaceholders.projects[projectId],
      href: getLocalizedPath(locale, siteConfig.ctaRoutes.projects[projectId]),
      markPath: siteConfig.visuals.projects[projectId].markPath,
      themeStyle: getProjectThemeStyle(projectId),
      description: messages.projects.items[projectId].navDescription
    };
  });

  const alternateLocale = getAlternateLocale(locale);
  const localeSwitch = {
    locale: alternateLocale,
    href: swapLocaleInPath(pathname, alternateLocale)
  };

  const dashboardHref = getLocalizedPath(locale, siteConfig.ctaRoutes.dashboard);
  const isProjectsRoute = pathname.includes("/projects/");

  return (
    <header ref={headerRef} className="sticky top-0 z-50 px-4 pt-3 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className={`site-header-shell ${isScrolled ? "site-header-shell--scrolled" : ""}`.trim()}>
          <Link href={getLocalizedPath(locale)} className="brand-lockup pr-2">
            <LogoTile
              shortLabel={siteConfig.assetPlaceholders.brand.shortLabel}
              label={siteConfig.assetPlaceholders.brand.label}
              imagePath={siteConfig.visuals.brand.markPath}
            />
            <span className="brand-copy">
              <span className="block truncate [font-family:var(--font-display)] text-[1.02rem] font-semibold tracking-[0.01em] text-ink sm:text-lg">
                {siteConfig.brand.fullName}
              </span>
              <span className="block truncate text-xs text-white/38">
                {siteConfig.brand.shortName} / {siteConfig.brand.domain}
              </span>
            </span>
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-end gap-4 lg:flex xl:gap-5">
            <nav className="header-nav">
              {siteConfig.featureFlags.showProjectsDropdown ? (
                <div className="relative">
                  <button
                    type="button"
                    aria-expanded={isProjectsOpen}
                    className={`nav-link ${isProjectsRoute || isProjectsOpen ? "nav-link-active" : ""}`}
                    onClick={() => setIsProjectsOpen((current) => !current)}
                  >
                    {messages.nav.projects}
                  </button>
                  {isProjectsOpen ? (
                    <div className="dropdown-panel menu-enter absolute left-0 top-[calc(100%+0.8rem)] w-[min(24rem,calc(100vw-6rem))]">
                      <div className="grid gap-2">
                        {projectLinks.map((project) => (
                          <Link
                            key={project.id}
                            href={project.href}
                            className="dropdown-project-item group"
                            style={project.themeStyle}
                          >
                            <div className="relative flex items-center gap-3">
                              <LogoTile
                                shortLabel={project.asset.shortLabel}
                                label={project.asset.label}
                                imagePath={project.markPath}
                                size="sm"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="[font-family:var(--font-display)] text-base font-semibold text-ink">
                                  {project.title}
                                </p>
                                <p className="mt-1.5 text-sm leading-6 text-muted">
                                  {project.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {headerLinks.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`nav-link ${isCurrentPath(pathname, item.href) ? "nav-link-active" : ""}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="header-actions">
              <div className="locale-switcher" aria-label={messages.nav.switchLanguage}>
                <Link
                  href={localeSwitch.href}
                  aria-label={`${messages.nav.switchLanguage}: ${localeSwitch.locale.toUpperCase()}`}
                  className={`locale-pill ${localeSwitch.locale === "ru" ? "locale-pill--ru" : "locale-pill--en"}`}
                >
                  <span className="relative z-10">{localeSwitch.locale}</span>
                </Link>
              </div>

              <Link href={dashboardHref} className="button-primary button-primary--header">
                <span>{messages.nav.openDashboard}</span>
                <span className="hidden text-[10px] uppercase tracking-[0.24em] text-slate-600 xl:inline">
                  {siteConfig.brand.dashboardBrand}
                </span>
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 lg:hidden">
            <Link href={dashboardHref} className="button-primary button-primary--header">
              <span>{messages.nav.openDashboard}</span>
            </Link>
            <button
              type="button"
              className="glass-control inline-flex rounded-full px-4 py-2.5 text-sm text-ink transition duration-300 hover:border-white/[0.14] hover:bg-white/[0.06]"
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              {isMenuOpen ? messages.nav.close : messages.nav.menu}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && siteConfig.featureFlags.useMobileMenuSheet ? (
        <div className="px-1 pb-2 pt-3 lg:hidden sm:px-2">
          <div className="mx-auto max-w-7xl">
            <div className="menu-sheet menu-enter">
              <div className="grid gap-5">
                <div className="grid gap-3">
                  <p className="eyebrow px-1">{messages.nav.projects}</p>
                  {projectLinks.map((project) => (
                    <Link
                      key={project.id}
                      href={project.href}
                      className="dropdown-project-item"
                      style={project.themeStyle}
                    >
                      <div className="relative flex items-center gap-3">
                        <LogoTile
                          shortLabel={project.asset.shortLabel}
                          label={project.asset.label}
                          imagePath={project.markPath}
                          size="sm"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="[font-family:var(--font-display)] text-base font-semibold text-ink">
                            {project.title}
                          </p>
                          <p className="mt-1.5 text-sm leading-6 text-muted">{project.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="grid gap-2">
                  {headerLinks.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      className={`${isCurrentPath(pathname, item.href) ? "glass-panel" : "quiet-surface"} hover-lift-sm px-4 py-3 text-sm`}
                    >
                      <span className="relative z-10">{item.label}</span>
                    </Link>
                  ))}
                </div>

                <div className="glass-panel p-4">
                  <p className="relative z-10 eyebrow">{messages.nav.switchLanguage}</p>
                  <div className="relative z-10 mt-3 flex flex-wrap gap-2">
                    <Link
                      href={localeSwitch.href}
                      aria-label={`${messages.nav.switchLanguage}: ${localeSwitch.locale.toUpperCase()}`}
                      className={`locale-pill ${localeSwitch.locale === "ru" ? "locale-pill--ru" : "locale-pill--en"}`}
                    >
                      <span className="relative z-10">{localeSwitch.locale}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
