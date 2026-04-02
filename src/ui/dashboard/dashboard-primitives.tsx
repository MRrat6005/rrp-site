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
        "rounded-[1.25rem] border border-white/[0.05] bg-[rgba(13,14,16,0.84)] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] backdrop-blur-sm",
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
  positive: "border-white/[0.06] bg-white/[0.04] text-white/72",
  warning: "border-white/[0.05] bg-white/[0.028] text-white/64",
  info: "border-white/[0.05] bg-white/[0.024] text-white/60",
  muted: "border-white/[0.05] bg-white/[0.015] text-white/44"
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
    <div className="space-y-1">
      <h2 className="text-sm font-medium text-white/88">{title}</h2>
      {body ? <p className="text-sm leading-6 text-white/52">{body}</p> : null}
    </div>
  );
}
