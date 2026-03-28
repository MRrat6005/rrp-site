"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  projectOrder,
  siteConfig,
  type Locale
} from "@/config/site.config";
import {
  getLocalizedPath,
  swapLocaleInPath
} from "@/lib/i18n";
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
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsProjectsOpen(false);
  }, [pathname]);

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
      description: messages.projects.items[projectId].navDescription,
      categoryLabel: messages.projects.items[projectId].categoryLabel
    };
  });

  const localeLinks = siteConfig.locales.map((targetLocale) => ({
    locale: targetLocale,
    href: swapLocaleInPath(pathname, targetLocale)
  }));

  const dashboardHref = getLocalizedPath(locale, siteConfig.ctaRoutes.dashboard);
  const isProjectsRoute = pathname.includes("/projects/");

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-white/[0.08] bg-[rgba(5,7,11,0.38)] backdrop-blur-2xl"
    >
      <div className="relative mx-auto w-full max-w-7xl px-6 py-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between gap-5 xl:gap-8">
          <Link
            href={getLocalizedPath(locale)}
            className="flex min-w-0 items-center gap-4 pr-2"
          >
            <LogoTile
              shortLabel={siteConfig.assetPlaceholders.brand.shortLabel}
              label={siteConfig.assetPlaceholders.brand.label}
            />
            <span className="min-w-0">
              <span className="block truncate [font-family:var(--font-display)] text-[1.05rem] font-semibold tracking-[0.01em] text-ink sm:text-lg">
                {siteConfig.brand.fullName}
              </span>
              <span className="block truncate text-xs text-white/46">
                {siteConfig.brand.shortName} / {siteConfig.brand.domain}
              </span>
            </span>
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-between gap-8 lg:flex">
            <nav className="flex min-w-0 items-center gap-1 xl:gap-3">
              {siteConfig.featureFlags.showProjectsDropdown ? (
                <div className="relative">
                  <button
                    type="button"
                    aria-expanded={isProjectsOpen}
                    className={`nav-link ${isProjectsRoute || isProjectsOpen ? "nav-link-active" : ""}`}
                    onClick={() => setIsProjectsOpen((current) => !current)}
                  >
                    {messages.nav.projects}
                    <span className="text-[11px] uppercase tracking-[0.26em] text-white/36">
                      {projectLinks.length.toString().padStart(2, "0")}
                    </span>
                  </button>
                  {isProjectsOpen ? (
                    <div className="dropdown-panel menu-enter absolute left-0 top-[calc(100%+0.95rem)] w-[min(36rem,calc(100vw-5rem))]">
                      <div className="grid gap-3 sm:grid-cols-2">
                        {projectLinks.map((project, index) => (
                          <Link
                            key={project.id}
                            href={project.href}
                            className={`${index === 0 ? "glass-panel glass-panel-strong" : "quiet-surface"} hover-lift-sm group p-4`}
                          >
                            <div className="relative flex items-start gap-3">
                              <LogoTile
                                shortLabel={project.asset.shortLabel}
                                label={project.asset.label}
                                size="sm"
                              />
                              <div className="min-w-0">
                                <p className="[font-family:var(--font-display)] text-sm font-semibold text-ink">
                                  {project.title}
                                </p>
                                <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-white/38">
                                  {project.categoryLabel}
                                </p>
                                <p className="mt-3 text-sm leading-6 text-muted">
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

            <div className="flex items-center gap-3 xl:gap-4">
              <div className="glass-control inline-flex items-center p-1">
                {localeLinks.map((item) => (
                  <Link
                    key={item.locale}
                    href={item.href}
                    aria-label={`${messages.nav.switchLanguage}: ${item.locale.toUpperCase()}`}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[0.24em] transition duration-300 ${item.locale === locale ? "bg-white/92 text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.88),0_10px_24px_rgba(255,255,255,0.1)]" : "text-white/60 hover:text-ink"}`}
                  >
                    {item.locale}
                  </Link>
                ))}
              </div>

              <Link href={dashboardHref} className="button-primary">
                <span>{messages.nav.openDashboard}</span>
                <span className="hidden text-[10px] uppercase tracking-[0.26em] text-slate-600 xl:inline">
                  {siteConfig.brand.dashboardBrand}
                </span>
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 lg:hidden">
            <Link href={dashboardHref} className="button-primary">
              <span>{messages.nav.openDashboard}</span>
              <span className="hidden text-[10px] uppercase tracking-[0.26em] text-slate-600 sm:inline">
                {siteConfig.brand.dashboardBrand}
              </span>
            </Link>
            <button
              type="button"
              className="glass-control inline-flex rounded-full px-4 py-2 text-sm text-ink transition duration-300 hover:border-white/[0.16] hover:bg-white/[0.08]"
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              {isMenuOpen ? messages.nav.close : messages.nav.menu}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && siteConfig.featureFlags.useMobileMenuSheet ? (
        <div className="relative border-t border-white/[0.08] px-4 pb-4 lg:hidden sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="menu-sheet menu-enter">
              <div className="grid gap-5">
                <div className="grid gap-3">
                  <p className="eyebrow px-1">{messages.nav.projects}</p>
                  {projectLinks.map((project, index) => (
                    <Link
                      key={project.id}
                      href={project.href}
                      className={`${index === 0 ? "glass-panel glass-panel-strong" : "quiet-surface"} hover-lift-sm p-4`}
                    >
                      <div className="relative flex items-start gap-3">
                        <LogoTile
                          shortLabel={project.asset.shortLabel}
                          label={project.asset.label}
                          size="sm"
                        />
                        <div>
                          <p className="[font-family:var(--font-display)] text-sm font-semibold text-ink">
                            {project.title}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-muted">
                            {project.description}
                          </p>
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
                    {localeLinks.map((item) => (
                      <Link
                        key={item.locale}
                        href={item.href}
                        className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] ${item.locale === locale ? "bg-white text-slate-950" : "border border-white/[0.1] text-ink"}`}
                      >
                        {item.locale}
                      </Link>
                    ))}
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
