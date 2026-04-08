import type { HTMLAttributes, ReactNode } from "react";

import type { DashboardTone } from "@/lib/dashboard-model";

export function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

interface DashboardPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function DashboardPanel({ className, children, ...props }: DashboardPanelProps) {
  return (
    <section
      className={cx(
        "rounded-[1.25rem] border border-white/[0.06] bg-[rgba(13,14,16,0.84)] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

interface DashboardStatusPillProps {
  tone: DashboardTone;
  children: ReactNode;
}

const toneClasses: Record<DashboardTone, string> = {
  positive: "border-emerald-400/20 bg-emerald-400/10 text-emerald-100/90",
  warning: "border-amber-300/18 bg-amber-300/10 text-amber-100/85",
  info: "border-sky-300/16 bg-sky-300/10 text-sky-100/82",
  muted: "border-white/[0.05] bg-white/[0.03] text-white/48"
};

export function DashboardStatusPill({ tone, children }: DashboardStatusPillProps) {
  return (
    <span className={cx("inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] uppercase", toneClasses[tone])}>
      {children}
    </span>
  );
}

export function DashboardLockGlyph({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cx("inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03] text-white/58", className)}>
      <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 10V7.75a3.5 3.5 0 1 1 7 0V10" />
        <rect x="6.5" y="10" width="11" height="8.5" rx="2.2" />
        <path d="M12 13.25v2.25" />
      </svg>
    </span>
  );
}

export function DashboardSectionHeading({ title, body }: { title: string; body?: string }) {
  return (
    <div className="space-y-1.5">
      <h2 className="text-sm font-medium text-white/88">{title}</h2>
      {body ? <p className="text-sm leading-6 text-white/52">{body}</p> : null}
    </div>
  );
}

export function DashboardMessagePanel({ body, className, title }: { body: string; className?: string; title: string }) {
  return (
    <DashboardPanel className={cx("p-6 sm:p-8", className)}>
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <p className="text-sm leading-6 text-white/56">{body}</p>
      </div>
    </DashboardPanel>
  );
}
