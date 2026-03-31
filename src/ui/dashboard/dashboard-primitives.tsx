import type { HTMLAttributes, ReactNode } from "react";

import type { DashboardTone } from "@/lib/dashboard-mock";

export function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

interface DashboardPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function DashboardPanel({
  className,
  children,
  ...props
}: DashboardPanelProps) {
  return (
    <section
      className={cx(
        "rounded-[1.4rem] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(17,18,20,0.94),rgba(12,13,15,0.94))] shadow-[0_8px_24px_rgba(0,0,0,0.12)]",
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
  positive: "border-white/[0.08] bg-white/[0.035] text-white/76",
  warning: "border-white/[0.07] bg-white/[0.025] text-white/66",
  info: "border-white/[0.06] bg-white/[0.02] text-white/62",
  muted: "border-white/[0.06] bg-transparent text-white/44"
};

export function DashboardStatusPill({
  tone,
  children
}: DashboardStatusPillProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] uppercase",
        toneClasses[tone]
      )}
    >
      {children}
    </span>
  );
}

interface DashboardSectionHeadingProps {
  title: string;
  body?: string;
}

export function DashboardSectionHeading({
  title,
  body
}: DashboardSectionHeadingProps) {
  return (
    <div className="space-y-1.5">
      <h2 className="text-base font-medium text-white/92">{title}</h2>
      {body ? <p className="text-sm leading-6 text-white/52">{body}</p> : null}
    </div>
  );
}
