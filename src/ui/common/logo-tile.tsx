import Image from "next/image";
import type { CSSProperties } from "react";

interface LogoTileProps {
  shortLabel: string;
  label: string;
  imagePath?: string | null;
  size?: "sm" | "md";
  className?: string;
  style?: CSSProperties;
}

const sizeClassNames = {
  sm: "h-10 w-10 rounded-[1.1rem] text-[11px] tracking-[0.26em]",
  md: "h-12 w-12 rounded-[1.2rem] text-xs tracking-[0.28em]"
} as const;

export function LogoTile({
  shortLabel,
  label,
  imagePath,
  size = "md",
  className = "",
  style
}: LogoTileProps) {
  return (
    <span
      aria-label={label}
      className={`logo-tile ${sizeClassNames[size]} ${className}`.trim()}
      style={style}
    >
      <span className="logo-tile__halo" />
      {imagePath ? (
        <Image
          src={imagePath}
          alt=""
          aria-hidden="true"
          width={56}
          height={56}
          unoptimized
          className="logo-tile__image"
        />
      ) : (
        <span className="relative z-10">{shortLabel}</span>
      )}
    </span>
  );
}
