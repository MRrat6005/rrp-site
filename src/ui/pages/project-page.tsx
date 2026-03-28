import Link from "next/link";

import { siteConfig, type Locale, type ProjectId } from "@/config/site.config";
import { getLocalizedPath } from "@/lib/i18n";
import type { SiteMessages } from "@/messages/types";

interface ProjectPageProps {
  locale: Locale;
  projectId: ProjectId;
  messages: SiteMessages;
}

export function ProjectPage({
  locale,
  projectId,
  messages
}: ProjectPageProps) {
  const project = siteConfig.projects.find((entry) => entry.id === projectId);

  if (!project) {
    return null;
  }

  const copy = messages.projects.items[projectId];

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      <section className="section-frame grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
        <div className="space-y-5">
          <p className="eyebrow">{messages.projects.introLabel}</p>
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(122,172,255,0.22),rgba(255,255,255,0.04))] [font-family:var(--font-display)] text-sm font-semibold tracking-[0.22em] text-ink">
              {project.mark}
            </span>
            <h1 className="display-title">{project.title}</h1>
          </div>
          <p className="text-xl text-ink">{copy.tagline}</p>
          <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
            {copy.summary}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href={getLocalizedPath(locale, siteConfig.dashboardSegment)}
              className="button-primary"
            >
              {messages.nav.openDashboard}
            </Link>
            <Link href={getLocalizedPath(locale, "docs")} className="button-secondary">
              {messages.nav.docs}
            </Link>
          </div>
        </div>

        <aside className="glass-panel">
          <p className="eyebrow">Specs</p>
          <div className="mt-5 space-y-4">
            {copy.specs.map((spec) => (
              <div
                key={spec.label}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-4"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                  {spec.label}
                </p>
                <p className="mt-3 [font-family:var(--font-display)] text-lg font-semibold text-ink">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}

