import Link from "next/link";

import type { LabeledValue, SectionCopy } from "@/messages/types";

interface PageAction {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
}

interface PageAside {
  eyebrow: string;
  title: string;
  body: string;
  items?: readonly LabeledValue[];
}

interface SimpleSectionPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  sections: readonly SectionCopy[];
  aside: PageAside;
  actions?: readonly PageAction[];
}

export function SimpleSectionPage({
  eyebrow,
  title,
  intro,
  sections,
  aside,
  actions = []
}: SimpleSectionPageProps) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-10 sm:px-8 lg:px-10 lg:gap-14 lg:py-14">
      <section className="section-frame overflow-hidden reveal-up">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(122,172,255,0.1),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(141,243,209,0.06),transparent_26%)]" />
        <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.18fr)_minmax(19rem,0.82fr)] lg:gap-10">
          <div className="space-y-5">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="display-title max-w-4xl">{title}</h1>
            <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
              {intro}
            </p>
            {actions.length ? (
              <div className="flex flex-wrap gap-3 pt-2">
                {actions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className={
                      action.variant === "secondary"
                        ? "button-secondary"
                        : "button-primary"
                    }
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <aside className="glass-panel">
            <p className="eyebrow">{aside.eyebrow}</p>
            <p className="mt-4 [font-family:var(--font-display)] text-2xl font-semibold text-ink">
              {aside.title}
            </p>
            <p className="mt-4 text-sm leading-7 text-muted">{aside.body}</p>
            {aside.items?.length ? (
              <div className="mt-6 space-y-3">
                {aside.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-4 rounded-[1.2rem] border border-white/[0.08] bg-white/[0.02] px-4 py-3"
                  >
                    <span className="text-sm text-muted">{item.label}</span>
                    <span className="text-sm font-medium text-ink">{item.value}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((section, index) => (
          <article
            key={section.title}
            className={`glass-panel h-full reveal-up ${index === 1 ? "reveal-delay-1" : index === 2 ? "reveal-delay-2" : ""}`}
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
