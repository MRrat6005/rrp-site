interface LogoTileProps {
  shortLabel: string;
  label: string;
  size?: "sm" | "md";
}

const sizeClassNames = {
  sm: "h-10 w-10 rounded-2xl text-[11px] tracking-[0.26em]",
  md: "h-12 w-12 rounded-[1.15rem] text-xs tracking-[0.28em]"
} as const;

export function LogoTile({
  shortLabel,
  label,
  size = "md"
}: LogoTileProps) {
  return (
    <span
      aria-label={label}
      className={`flex items-center justify-center border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.06)] [font-family:var(--font-display)] font-semibold uppercase text-ink ${sizeClassNames[size]}`}
    >
      {shortLabel}
    </span>
  );
}
