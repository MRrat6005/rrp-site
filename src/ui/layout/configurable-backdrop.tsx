import type { CSSProperties } from "react";

import type { BackgroundSurfaceConfig } from "@/config/site.config";

type BackdropStyle = CSSProperties & Record<`--${string}`, string>;

interface ConfigurableBackdropProps {
  background: BackgroundSurfaceConfig;
  className?: string;
}

function clampUnitInterval(value: number) {
  return Math.min(1, Math.max(0, value));
}

function createBackdropStyle(background: BackgroundSurfaceConfig): BackdropStyle {
  const overlayOpacity = clampUnitInterval(background.overlayOpacity);
  const gradientStrength = clampUnitInterval(background.gradientStrength);

  return {
    "--backdrop-image": background.image ? `url("${background.image}")` : "none",
    "--backdrop-position": String(background.position),
    "--backdrop-size": String(background.size),
    "--backdrop-overlay-opacity": overlayOpacity.toFixed(3),
    "--backdrop-gradient-strength": gradientStrength.toFixed(3)
  };
}

export function ConfigurableBackdrop({
  background,
  className = ""
}: ConfigurableBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className={`configurable-backdrop ${className}`.trim()}
      style={createBackdropStyle(background)}
    >
      <div className="configurable-backdrop__image" />
      <div className="configurable-backdrop__aurora" />
      <div className="configurable-backdrop__shade" />
      <div className="configurable-backdrop__grid" />
    </div>
  );
}

