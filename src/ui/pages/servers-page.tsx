import Link from "next/link";

import { type Locale } from "@/config/site.config";
import { getLocalizedPath } from "@/lib/i18n";
import type { SiteMessages } from "@/messages/types";

interface ServersPageProps {
  locale: Locale;
  messages: SiteMessages;
}

export function ServersPage({ locale, messages }: ServersPageProps) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      <section className="section-frame">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1 className="display-title max-w-3xl">{messages.servers.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted sm:text-lg">
              {messages.servers.intro}
            </p>
          </div>
          <Link href={getLocalizedPath(locale)} className="button-secondary">
            {messages.nav.backToSite}
          </Link>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {messages.servers.panels.map((panel) => (
          <article key={panel.title} className="glass-panel">
            <div className="flex items-center justify-between">
              <h2 className="[font-family:var(--font-display)] text-xl font-semibold text-ink">
                {panel.title}
              </h2>
              <span className="h-3 w-3 rounded-full bg-[rgba(141,243,209,0.85)]" />
            </div>
            <p className="mt-4 text-sm leading-7 text-muted">{panel.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

