import Link from "next/link";

interface PageAction {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
}

interface SimpleSection {
  title: string;
  body: string;
}

interface SimpleSectionPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  sections: readonly SimpleSection[];
  actions?: readonly PageAction[];
}

export function SimpleSectionPage({
  eyebrow,
  title,
  intro,
  sections,
  actions = []
}: SimpleSectionPageProps) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      <section className="section-frame grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
        <div className="space-y-5">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display-title max-w-3xl">{title}</h1>
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
        <div className="glass-panel flex flex-col justify-between gap-6">
          <div>
            <p className="eyebrow">Layout</p>
            <p className="mt-4 [font-family:var(--font-display)] text-xl font-semibold text-ink">
              Premium dark structure
            </p>
          </div>
          <p className="text-sm leading-7 text-muted">
            Each page uses the shared shell and keeps content intentionally
            minimal so production copy can replace placeholders without a
            layout rewrite.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => (
          <article key={section.title} className="glass-panel h-full">
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


