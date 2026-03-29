import Link from "next/link";

import { siteConfig, type Locale } from "@/config/site.config";
import { getLocalizedPath } from "@/lib/i18n";
import type { SiteMessages } from "@/messages/types";

interface ContactsPageProps {
  locale: Locale;
  messages: SiteMessages;
}

export function ContactsPage({ locale, messages }: ContactsPageProps) {
  const channels = siteConfig.contacts.map((channel) => ({
    value: channel.value,
    ...messages.contacts.channels[channel.id]
  }));

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      <section className="section-frame overflow-hidden" data-reveal>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(122,172,255,0.12),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(141,243,209,0.08),transparent_26%)]" />
        <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(19rem,0.88fr)] lg:gap-10">
          <div className="space-y-5">
            <p className="eyebrow">{messages.contacts.eyebrow}</p>
            <h1 className="display-title max-w-4xl">{messages.contacts.title}</h1>
            <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
              {messages.contacts.intro}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={getLocalizedPath(locale, siteConfig.ctaRoutes.docs)}
                className="button-secondary"
              >
                {messages.nav.docs}
              </Link>
              <Link
                href={getLocalizedPath(locale, siteConfig.ctaRoutes.dashboard)}
                className="button-primary"
              >
                {messages.nav.openDashboard}
              </Link>
            </div>
          </div>

          <aside className="glass-panel" data-reveal>
            <p className="eyebrow">{messages.contacts.aside.eyebrow}</p>
            <p className="mt-4 [font-family:var(--font-display)] text-2xl font-semibold text-ink">
              {messages.contacts.aside.title}
            </p>
            <p className="mt-4 text-sm leading-7 text-muted">
              {messages.contacts.aside.body}
            </p>
            <div className="mt-6 space-y-3">
              {messages.contacts.aside.items?.map((item) => (
                <div
                  key={item.label}
                  className="quiet-surface flex items-center justify-between gap-4 px-4 py-3"
                >
                  <span className="text-sm text-muted">{item.label}</span>
                  <span className="text-sm font-medium text-ink">{item.value}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3" data-reveal>
        {channels.map((channel, index) => (
          <article
            key={channel.value}
            className={`glass-panel h-full reveal-up ${index === 1 ? "reveal-delay-1" : index === 2 ? "reveal-delay-2" : ""}`}
            data-reveal
          >
            <p className="eyebrow">{messages.common.contactChannels}</p>
            <h2 className="mt-4 [font-family:var(--font-display)] text-xl font-semibold text-ink">
              {channel.label}
            </h2>
            <p className="mt-4 break-all text-sm font-medium text-ink">{channel.value}</p>
            <p className="mt-4 text-sm leading-7 text-muted">{channel.note}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" data-reveal>
        {messages.contacts.sections.map((section, index) => (
          <article
            key={section.title}
            className={`glass-panel h-full reveal-up ${index === 1 ? "reveal-delay-1" : index === 2 ? "reveal-delay-2" : ""}`}
            data-reveal
          >
            <h2 className="[font-family:var(--font-display)] text-xl font-semibold text-ink">
              {section.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">{section.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
