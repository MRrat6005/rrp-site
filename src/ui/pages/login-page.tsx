import Link from "next/link";

import { siteConfig, type Locale } from "@/config/site.config";
import { getLocalizedPath } from "@/lib/i18n";
import type { SiteMessages } from "@/messages/types";

interface LoginPageProps {
  locale: Locale;
  messages: SiteMessages;
}

export function LoginPage({ locale, messages }: LoginPageProps) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      <section className="section-frame grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.85fr)]">
        <div className="space-y-5">
          <p className="eyebrow">Entry</p>
          <h1 className="display-title">{messages.login.title}</h1>
          <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
            {messages.login.intro}
          </p>
          <Link
            href={getLocalizedPath(locale, siteConfig.dashboardSegment)}
            className="button-primary"
          >
            {messages.nav.openDashboard}
          </Link>
        </div>

        <div className="glass-panel space-y-5">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-white/45">
              {messages.login.panelTitle}
            </p>
            <p className="mt-4 text-sm leading-7 text-muted">
              {messages.login.panelBody}
            </p>
          </div>
          <div className="grid gap-3">
            <div className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/45">
              Workspace Email
            </div>
            <div className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/45">
              Access Key
            </div>
            <div className="rounded-2xl bg-white px-4 py-3 text-center text-sm font-medium text-slate-950">
              Placeholder Submit
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
