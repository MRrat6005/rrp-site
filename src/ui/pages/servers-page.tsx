import Link from "next/link";

import { siteConfig, type Locale } from "@/config/site.config";
import { getLocalizedPath } from "@/lib/i18n";
import type { SiteMessages } from "@/messages/types";

interface ServersPageProps {
  locale: Locale;
  messages: SiteMessages;
}

const serversLabels = {
  ru: {
    loginButton: "Страница входа",
    serverSlot: "Слот сервера",
    futureServer: "Будущий сервер",
    queued: "в очереди",
    workspaceOutline: "Контур workspace",
    spaces: "Spaces",
    spacesValue: "пусто, готово",
    access: "Доступ",
    accessValue: "учтён pending",
    servers: "Servers",
    serversValue: "зарезервировано"
  },
  en: {
    loginButton: "Entry page",
    serverSlot: "Server slot",
    futureServer: "Future server",
    queued: "queued",
    workspaceOutline: "Workspace outline",
    spaces: "Spaces",
    spacesValue: "empty, ready",
    access: "Access",
    accessValue: "pending-aware",
    servers: "Servers",
    serversValue: "reserved next"
  }
} as const;

export function ServersPage({ locale, messages }: ServersPageProps) {
  const loginHref = getLocalizedPath(locale, siteConfig.ctaRoutes.dashboard);
  const homeHref = getLocalizedPath(locale);
  const [spacesState, accessState, futureState] = messages.servers.states;
  const placeholderRows = ["01", "02", "03"];
  const labels = serversLabels[locale];

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8 sm:px-8 lg:px-10 lg:gap-8 lg:py-10">
      <section className="workspace-shell reveal-up overflow-hidden">
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="eyebrow">{messages.servers.eyebrow}</p>
            <h1 className="display-title max-w-3xl">{messages.servers.title}</h1>
            <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
              {messages.servers.intro}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href={loginHref} className="button-secondary">
              {labels.loginButton}
            </Link>
            <Link href={homeHref} className="button-secondary">
              {messages.nav.backToSite}
            </Link>
          </div>
        </div>

        <dl className="relative z-10 mt-8 grid gap-3 border-t border-white/[0.08] pt-5 sm:grid-cols-3">
          {messages.servers.status.map((item) => (
            <div key={item.label} className="workspace-slot min-h-[7rem] justify-between">
              <dt className="workspace-label">{item.label}</dt>
              <dd className="[font-family:var(--font-display)] text-lg font-medium text-ink">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.28fr)_minmax(20rem,0.72fr)]">
        <article className="workspace-panel reveal-up reveal-delay-1 overflow-hidden p-0">
          <div className="relative flex items-center justify-between border-b border-white/[0.08] px-6 py-4 sm:px-7">
            <div>
              <p className="workspace-label">{spacesState.eyebrow}</p>
              <h2 className="mt-3 [font-family:var(--font-display)] text-2xl font-semibold text-ink">
                {spacesState.title}
              </h2>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/14" />
              <span className="h-2.5 w-2.5 rounded-full bg-[rgba(141,243,209,0.42)]" />
            </div>
          </div>

          <div className="relative px-6 py-6 sm:px-7 sm:py-7">
            <p className="max-w-2xl text-sm leading-7 text-muted sm:text-base">
              {spacesState.body}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {placeholderRows.map((row) => (
                <div key={row} className="workspace-slot min-h-[8.5rem] justify-between">
                  <span className="workspace-label">
                    {labels.serverSlot} {row}
                  </span>
                  <div className="space-y-2">
                    <div className="h-2 rounded-full bg-white/[0.08]" />
                    <div className="h-2 w-4/5 rounded-full bg-white/[0.06]" />
                    <div className="h-2 w-3/5 rounded-full bg-white/[0.05]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        <div className="grid gap-5">
          <article className="workspace-panel reveal-up reveal-delay-2">
            <div className="relative z-10">
              <p className="workspace-label">{accessState.eyebrow}</p>
              <h2 className="mt-4 [font-family:var(--font-display)] text-2xl font-semibold text-ink">
                {accessState.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
                {accessState.body}
              </p>
              <Link href={loginHref} className="button-secondary mt-6">
                {labels.loginButton}
              </Link>
            </div>
          </article>

          <article className="workspace-panel reveal-up reveal-delay-2">
            <div className="relative z-10">
              <p className="workspace-label">{futureState.eyebrow}</p>
              <h2 className="mt-4 [font-family:var(--font-display)] text-2xl font-semibold text-ink">
                {futureState.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
                {futureState.body}
              </p>
              <div className="mt-6 space-y-3">
                {placeholderRows.map((row) => (
                  <div
                    key={row}
                    className="flex items-center justify-between rounded-[1rem] border border-white/[0.08] bg-white/[0.02] px-4 py-3"
                  >
                    <span className="text-sm text-muted">
                      {labels.futureServer} {row}
                    </span>
                    <span className="text-xs uppercase tracking-[0.24em] text-white/34">
                      {labels.queued}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[minmax(0,0.68fr)_minmax(20rem,0.32fr)]">
        <article className="workspace-panel reveal-up reveal-delay-2">
          <div className="relative z-10">
            <p className="workspace-label">{labels.workspaceOutline}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div className="workspace-slot min-h-[7.5rem] justify-between">
                <span className="workspace-label">{labels.spaces}</span>
                <span className="text-sm font-medium text-ink">{labels.spacesValue}</span>
              </div>
              <div className="workspace-slot min-h-[7.5rem] justify-between">
                <span className="workspace-label">{labels.access}</span>
                <span className="text-sm font-medium text-ink">{labels.accessValue}</span>
              </div>
              <div className="workspace-slot min-h-[7.5rem] justify-between">
                <span className="workspace-label">{labels.servers}</span>
                <span className="text-sm font-medium text-ink">{labels.serversValue}</span>
              </div>
            </div>
          </div>
        </article>

        <aside className="workspace-panel reveal-up reveal-delay-2">
          <div className="relative z-10">
            <p className="eyebrow">{messages.servers.rail.eyebrow}</p>
            <p className="mt-4 [font-family:var(--font-display)] text-2xl font-semibold text-ink">
              {messages.servers.rail.title}
            </p>
            <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
              {messages.servers.rail.body}
            </p>
            <div className="mt-6 space-y-3">
              {messages.servers.rail.items?.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-4 rounded-[1rem] border border-white/[0.08] bg-white/[0.02] px-4 py-3"
                >
                  <span className="text-sm text-muted">{item.label}</span>
                  <span className="text-sm font-medium text-ink">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
