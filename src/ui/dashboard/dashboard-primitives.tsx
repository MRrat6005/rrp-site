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
        "rounded-[1.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,19,22,0.98),rgba(12,13,15,0.98))] shadow-[0_12px_32px_rgba(0,0,0,0.16)]",
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
  positive: "border-white/16 bg-white/[0.06] text-white",
  warning: "border-white/14 bg-white/[0.04] text-white/78",
  info: "border-white/12 bg-white/[0.035] text-white/72",
  muted: "border-white/10 bg-transparent text-white/54"
};

export function DashboardStatusPill({
  tone,
  children
}: DashboardStatusPillProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border px-3 py-1.5 text-[11px] font-medium tracking-[0.16em] uppercase",
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
      <h2 className="text-base font-semibold text-white">{title}</h2>
      {body ? <p className="text-sm leading-6 text-white/56">{body}</p> : null}
    </div>
  );
}
