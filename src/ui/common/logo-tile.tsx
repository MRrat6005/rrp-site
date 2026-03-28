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
      className={`relative flex items-center justify-center overflow-hidden border border-white/[0.12] bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))] backdrop-blur-xl [box-shadow:inset_0_1px_0_rgba(255,255,255,0.16),0_14px_34px_rgba(4,8,16,0.2)] [font-family:var(--font-display)] font-semibold uppercase text-ink ${sizeClassNames[size]}`}
    >
      <span className="absolute inset-x-[14%] top-0 h-1/2 rounded-full bg-white/25 blur-xl" />
      <span className="relative z-10">{shortLabel}</span>
    </span>
  );
}
