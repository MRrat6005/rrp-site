import type { ReactNode } from "react";

import type { DashboardMetric, DashboardTone } from "@/lib/dashboard-mock";

export function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

const toneClassNames: Record<DashboardTone, string> = {
  positive: "border-emerald-400/30 bg-emerald-400/10 text-emerald-100",
  warning: "border-amber-400/30 bg-amber-400/10 text-amber-100",
  muted: "border-white/10 bg-white/5 text-white/58",
  info: "border-sky-400/30 bg-sky-400/10 text-sky-100"
};

export function DashboardPanel({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cx(
        "relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,13,19,0.94),rgba(7,10,16,0.88))] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-6",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_28%)]" />
      <div className="relative z-10">{children}</div>
    </section>
  );
}

export function DashboardSectionIntro({
  eyebrow,
  title,
  body,
  aside
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  aside?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl space-y-3">
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/44">
            {eyebrow}
          </p>
        ) : null}
        <div className="space-y-2">
          <h2 className="[font-family:var(--font-display)] text-2xl font-semibold text-white sm:text-[2rem]">
            {title}
          </h2>
          {body ? <p className="max-w-2xl text-sm leading-7 text-white/64 sm:text-[15px]">{body}</p> : null}
        </div>
      </div>
      {aside ? <div>{aside}</div> : null}
    </div>
  );
}

export function DashboardStatusPill({
  tone,
  children,
  className = ""
}: {
  tone: DashboardTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]",
        toneClassNames[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function DashboardMetricGrid({
  items,
  columns = "md:grid-cols-2 xl:grid-cols-4"
}: {
  items: DashboardMetric[];
  columns?: string;
}) {
  return (
    <div className={cx("grid gap-4", columns)}>
      {items.map((item) => (
        <DashboardPanel key={item.label} className="h-full p-4 sm:p-5">
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/44">
              {item.label}
            </p>
            <p className="[font-family:var(--font-display)] text-3xl font-semibold text-white">
              {item.value}
            </p>
            <p className="text-sm leading-6 text-white/58">{item.note}</p>
          </div>
        </DashboardPanel>
      ))}
    </div>
  );
}
