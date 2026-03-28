"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { siteConfig, type Locale } from "@/config/site.config";
import {
  getAlternateLocale,
  getLocalizedPath,
  swapLocaleInPath
} from "@/lib/i18n";
import type { SiteMessages } from "@/messages/types";

interface SiteHeaderProps {
  locale: Locale;
  messages: SiteMessages;
}

export function SiteHeader({ locale, messages }: SiteHeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const alternateLocale = getAlternateLocale(locale);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsProjectsOpen(false);
  }, [pathname]);

  const navigationLinks = siteConfig.navigation.map((item) => ({
    href: getLocalizedPath(locale, item.segment),
    label: messages.nav[item.key]
  }));

  const projectLinks = siteConfig.projects.map((project) => ({
    href: getLocalizedPath(locale, `projects/${project.slug}`),
    mark: project.mark,
    title: project.title,
    description: messages.projects.items[project.id].tagline
  }));

  const localeHref = swapLocaleInPath(pathname || `/${locale}`, alternateLocale);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(6,8,14,0.78)] backdrop-blur-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(122,172,255,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(141,243,209,0.10),transparent_28%)]" />
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-8 lg:px-10">
        <Link
          href={getLocalizedPath(locale)}
          className="flex items-center gap-3"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/5 [font-family:var(--font-display)] text-sm font-semibold tracking-[0.24em] text-ink shadow-halo">
            RRP
          </span>
          <span className="space-y-0.5">
            <span className="block [font-family:var(--font-display)] text-sm font-semibold uppercase tracking-[0.32em] text-white/80">
              {siteConfig.name}
            </span>
            <span className="block text-xs text-muted">
              Static foundation
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          <div className="relative">
            <button
              type="button"
              className="nav-link"
              onClick={() => setIsProjectsOpen((current) => !current)}
            >
              {messages.nav.projects}
            </button>
            {isProjectsOpen ? (
              <div className="absolute left-0 top-[calc(100%+1rem)] w-[30rem] rounded-3xl border border-white/10 bg-[rgba(10,13,20,0.96)] p-3 shadow-halo">
                <div className="grid gap-3">
                  {projectLinks.map((project) => (
                    <Link
                      key={project.href}
                      href={project.href}
                      className="group flex items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-white/15 hover:bg-white/[0.04]"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(122,172,255,0.22),rgba(255,255,255,0.04))] [font-family:var(--font-display)] text-sm font-semibold tracking-[0.18em] text-ink">
                        {project.mark}
                      </span>
                      <span className="space-y-1">
                        <span className="block [font-family:var(--font-display)] text-sm font-semibold text-ink">
                          {project.title}
                        </span>
                        <span className="block text-sm leading-6 text-muted">
                          {project.description}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {navigationLinks.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}

          <Link href={localeHref} className="nav-link">
            {messages.nav.switchLanguage}
            <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-white/70">
              {alternateLocale}
            </span>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={getLocalizedPath(locale, siteConfig.dashboardSegment)}
            className="hidden rounded-full border border-white/10 bg-white px-5 py-2.5 text-sm font-medium text-slate-950 transition hover:opacity-90 lg:inline-flex"
          >
            {messages.nav.openDashboard}
          </Link>
          <button
            type="button"
            className="inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-ink lg:hidden"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? messages.nav.close : messages.nav.menu}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="relative border-t border-white/10 bg-[rgba(7,9,15,0.96)] px-6 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-3">
              <p className="px-2 pb-2 text-xs uppercase tracking-[0.22em] text-white/45">
                {messages.nav.projects}
              </p>
              <div className="grid gap-2">
                {projectLinks.map((project) => (
                  <Link
                    key={project.href}
                    href={project.href}
                    className="flex items-start gap-3 rounded-2xl border border-white/5 px-3 py-3 transition hover:border-white/15"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xs font-semibold tracking-[0.18em] text-ink">
                      {project.mark}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-ink">
                        {project.title}
                      </span>
                      <span className="block text-sm text-muted">
                        {project.description}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {navigationLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-ink transition hover:border-white/20"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href={localeHref}
              className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-ink transition hover:border-white/20"
            >
              {messages.nav.switchLanguage}: {alternateLocale.toUpperCase()}
            </Link>

            <Link
              href={getLocalizedPath(locale, siteConfig.dashboardSegment)}
              className="rounded-2xl bg-white px-4 py-3 text-sm font-medium text-slate-950"
            >
              {messages.nav.openDashboard}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
