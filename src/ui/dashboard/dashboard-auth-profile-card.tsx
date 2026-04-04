"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState, type CSSProperties } from "react";

import { type Locale } from "@/config/site.config";
import {
  fetchDashboardAuthState,
  type DashboardAuthIdentity,
  type DashboardAuthState
} from "@/lib/dashboard-auth";
import { getDashboardCopy } from "@/ui/dashboard/dashboard-copy";
import { DashboardPanel } from "@/ui/dashboard/dashboard-primitives";

interface DashboardAuthProfileCardProps {
  locale: Locale;
}

function getIdentityName(
  identity: DashboardAuthIdentity | null,
  fallback: string
): string {
  return identity?.displayName ?? identity?.username ?? fallback;
}

function getIdentityHandle(identity: DashboardAuthIdentity | null): string | null {
  if (!identity?.username) {
    return null;
  }

  return `@${identity.username}`;
}

function normalizeAccentColor(value: string | null): string | null {
  const normalized = value?.trim();

  if (!normalized) {
    return null;
  }

  if (/^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(normalized)) {
    return normalized;
  }

  if (/^([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(normalized)) {
    return `#${normalized}`;
  }

  if (/^(rgb|rgba|hsl|hsla)\(/i.test(normalized)) {
    return normalized;
  }

  return null;
}

function hexToRgb(value: string) {
  const hex = value.replace("#", "");
  const expanded =
    hex.length === 3 || hex.length === 4
      ? hex
          .slice(0, 3)
          .split("")
          .map((segment) => segment + segment)
          .join("")
      : hex.slice(0, 6);

  if (!/^[0-9a-f]{6}$/i.test(expanded)) {
    return null;
  }

  const numeric = Number.parseInt(expanded, 16);

  return {
    r: (numeric >> 16) & 255,
    g: (numeric >> 8) & 255,
    b: numeric & 255
  };
}

function getPanelAccentStyle(accentColor: string | null): CSSProperties | null {
  const normalized = normalizeAccentColor(accentColor);

  if (!normalized) {
    return null;
  }

  const rgb = normalized.startsWith("#") ? hexToRgb(normalized) : null;

  if (rgb) {
    return {
      borderColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.22)`,
      backgroundImage: `linear-gradient(135deg, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1), rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.02) 45%, rgba(255,255,255,0.01) 100%)`,
      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.03), 0 16px 40px rgba(0,0,0,0.2), 0 0 0 1px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.05)`
    };
  }

  return {
    borderColor: "rgba(255,255,255,0.09)",
    backgroundImage: `linear-gradient(135deg, ${normalized}16, rgba(255,255,255,0.015) 58%, rgba(255,255,255,0.01) 100%)`
  };
}

function getFallbackPanelStyle(): CSSProperties {
  return {
    backgroundImage:
      "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01) 45%, rgba(255,255,255,0) 100%)"
  };
}

function getAccentGlowStyle(accentColor: string | null): CSSProperties | null {
  const normalized = normalizeAccentColor(accentColor);

  if (!normalized) {
    return null;
  }

  const rgb = normalized.startsWith("#") ? hexToRgb(normalized) : null;

  if (rgb) {
    return {
      background: `radial-gradient(circle, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2) 0%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.08) 36%, transparent 72%)`
    };
  }

  return {
    background: `radial-gradient(circle, ${normalized}24 0%, transparent 72%)`
  };
}

function getAccentBadgeStyle(accentColor: string | null): CSSProperties | null {
  const normalized = normalizeAccentColor(accentColor);

  if (!normalized) {
    return null;
  }

  const rgb = normalized.startsWith("#") ? hexToRgb(normalized) : null;

  if (rgb) {
    return {
      backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.16)`,
      borderColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`,
      color: "rgba(255,255,255,0.86)"
    };
  }

  return {
    backgroundColor: `${normalized}18`,
    borderColor: `${normalized}40`,
    color: "rgba(255,255,255,0.86)"
  };
}

function getAvatarFrameStyle(accentColor: string | null): CSSProperties | null {
  const normalized = normalizeAccentColor(accentColor);

  if (!normalized) {
    return null;
  }

  const rgb = normalized.startsWith("#") ? hexToRgb(normalized) : null;

  if (rgb) {
    return {
      borderColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.28)`,
      backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.12)`,
      boxShadow: `0 12px 30px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.12)`
    };
  }

  return {
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: `${normalized}16`
  };
}

function DashboardAvatarPlaceholder() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 text-white/60 sm:h-6 sm:w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 12.25a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" />
      <path d="M5.75 19.25a6.25 6.25 0 0 1 12.5 0" />
    </svg>
  );
}

export function DashboardAuthProfileCard({
  locale
}: DashboardAuthProfileCardProps) {
  const copy = getDashboardCopy(locale);
  const [authState, setAuthState] = useState<DashboardAuthState | null>(null);
  const identity = authState?.status === "authenticated" ? authState.identity : null;
  const avatarUrl = identity?.avatarUrl ?? null;
  const [showAvatar, setShowAvatar] = useState(Boolean(avatarUrl));

  useEffect(() => {
    const controller = new AbortController();

    void (async () => {
      try {
        const nextState = await fetchDashboardAuthState(controller.signal);
        setAuthState(nextState);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setAuthState({ status: "unavailable" });
      }
    })();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    setShowAvatar(Boolean(avatarUrl));
  }, [avatarUrl]);

  const accentColor = identity?.accentColor ?? null;
  const displayName = getIdentityName(identity, copy.overview.viewerFallbackName);
  const username = getIdentityHandle(identity);
  const panelStyle = getPanelAccentStyle(accentColor) ?? getFallbackPanelStyle();
  const glowStyle = getAccentGlowStyle(accentColor);
  const avatarFrameStyle = getAvatarFrameStyle(accentColor);
  const accentBadgeStyle = getAccentBadgeStyle(accentColor);

  return (
    <DashboardPanel
      className="relative isolate overflow-hidden border p-4 sm:p-5"
      style={panelStyle}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,14,0.18),rgba(10,11,14,0.04))]" />
      <div className="absolute inset-y-3 left-0 w-px bg-white/10" />
      {glowStyle ? (
        <div
          aria-hidden="true"
          className="absolute -right-8 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full blur-2xl sm:h-28 sm:w-28"
          style={glowStyle}
        />
      ) : null}

      <div className="relative z-10 flex min-h-[5.25rem] items-center gap-3 sm:min-h-[5.75rem] sm:gap-4">
        <div
          className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[1rem] border border-white/[0.09] bg-white/[0.04] sm:h-14 sm:w-14"
          style={avatarFrameStyle ?? undefined}
        >
          {showAvatar && avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="h-full w-full object-cover"
              onError={() => setShowAvatar(false)}
            />
          ) : (
            <DashboardAvatarPlaceholder />
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-[11px] uppercase tracking-[0.24em] text-white/44">
            {copy.overview.viewerLabel}
          </p>

          {authState === null ? (
            <div className="space-y-2">
              <span className="block h-6 max-w-[11rem] rounded-full bg-white/[0.11]" />
              <span className="block h-3.5 w-24 rounded-full bg-white/[0.08]" />
            </div>
          ) : (
            <div className="min-w-0 space-y-1">
              <h2 className="truncate text-lg font-medium leading-tight tracking-[-0.03em] text-white/92 sm:text-[1.15rem]">
                {displayName}
              </h2>
              {username ? (
                <p className="truncate text-sm text-white/60">{username}</p>
              ) : null}
            </div>
          )}
        </div>

        <div className="shrink-0 self-start sm:self-center">
          <span
            className="inline-flex h-2.5 w-2.5 rounded-full border border-white/[0.12] bg-white/[0.08] shadow-[0_0_0_4px_rgba(255,255,255,0.02)]"
            style={accentBadgeStyle ?? undefined}
            aria-hidden="true"
          />
        </div>
      </div>
    </DashboardPanel>
  );
}
