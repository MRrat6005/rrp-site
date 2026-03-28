import Link from "next/link";

import { siteConfig, type Locale } from "@/config/site.config";
import { getLocalizedPath } from "@/lib/i18n";
import type { SiteMessages } from "@/messages/types";

interface LoginPageProps {
  locale: Locale;
  messages: SiteMessages;
}

const loginLabels = {
  ru: {
    surface: "Поверхность",
    surfaceValue: "Вход в dashboard",
    nextRoute: "Следующий маршрут"
  },
  en: {
    surface: "Surface",
    surfaceValue: "Dashboard entry",
    nextRoute: "Next route"
  }
} as const;

export function LoginPage({ locale, messages }: LoginPageProps) {
  const workspaceHref = getLocalizedPath(locale, siteConfig.ctaRoutes.workspace);
  const legalLinks = siteConfig.legalRoutes.map((route) => ({
    href: getLocalizedPath(locale, route.segment),
    label: messages.footer[route.key]
  }));
  const labels = loginLabels[locale];

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10 lg:gap-10 lg:py-14">
      <section className="workspace-shell reveal-up overflow-hidden">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(19rem,0.92fr)] lg:gap-10">
          <div className="space-y-6">
            <p className="eyebrow">{messages.login.eyebrow}</p>
            <h1 className="display-title max-w-3xl">{messages.login.title}</h1>
            <p className="max-w-2xl text-base leading-8 text-ink sm:text-lg">
              {messages.login.intro}
            </p>
            <p className="max-w-2xl text-sm leading-7 text-muted sm:text-base">
              {messages.login.summary}
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              {messages.login.highlights.map((highlight) => (
                <span key={highlight} className="workspace-chip">
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          <aside className="workspace-panel reveal-up reveal-delay-1 self-start">
            <p className="eyebrow">{messages.login.panelTitle}</p>
            <p className="mt-4 [font-family:var(--font-display)] text-2xl font-semibold text-ink sm:text-[2rem]">
              {siteConfig.brand.dashboardBrand}
            </p>
            <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
              {messages.login.panelBody}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="workspace-slot min-h-[6.25rem] justify-between">
                <span className="workspace-label">{labels.surface}</span>
                <span className="text-sm font-medium text-ink">{labels.surfaceValue}</span>
              </div>
              <div className="workspace-slot min-h-[6.25rem] justify-between">
                <span className="workspace-label">{labels.nextRoute}</span>
                <span className="text-sm font-medium text-ink">/app/servers</span>
              </div>
            </div>

            <Link href={workspaceHref} className="button-primary mt-8 w-full sm:w-auto">
              {messages.nav.openDashboard}
            </Link>

            <p className="mt-4 text-xs leading-6 text-white/42">
              {messages.login.legalNote}
            </p>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/[0.08] pt-4 text-sm text-white/56">
              {legalLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition duration-200 hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
