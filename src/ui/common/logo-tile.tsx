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
  sm: "h-11 w-11 rounded-[1.2rem] text-[11px] tracking-[0.24em]",
  md: "h-14 w-14 rounded-[1.45rem] text-xs tracking-[0.26em]"
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
