import type { SiteMessages } from "@/messages/types";

interface FaqPageProps {
  messages: SiteMessages;
}

export function FaqPage({ messages }: FaqPageProps) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      <section className="section-frame">
        <p className="eyebrow">FAQ</p>
        <h1 className="display-title max-w-3xl">{messages.faq.title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-muted sm:text-lg">
          {messages.faq.intro}
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {messages.faq.items.map((item) => (
          <article key={item.title} className="glass-panel">
            <h2 className="[font-family:var(--font-display)] text-xl font-semibold text-ink">
              {item.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">{item.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

