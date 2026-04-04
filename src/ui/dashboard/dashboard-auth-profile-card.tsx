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

function getIdentityInitial(identity: DashboardAuthIdentity | null, fallback: string) {
  const source = getIdentityName(identity, fallback).replace(/^@+/, "").trim();

  if (!source) {
    return "D";
  }

  return source.charAt(0).toUpperCase();
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

function getAccentBackgroundStyle(accentColor: string | null): CSSProperties | null {
  const normalized = normalizeAccentColor(accentColor);

  if (!normalized) {
    return null;
  }

  const rgb = normalized.startsWith("#") ? hexToRgb(normalized) : null;

  if (rgb) {
    return {
      backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.34)`,
      backgroundImage: `radial-gradient(circle at top left, rgba(255,255,255,0.18), transparent 34%), linear-gradient(135deg, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.72), rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.28) 58%, rgba(7,9,12,0.84) 100%)`
    };
  }

  return {
    backgroundColor: normalized,
    backgroundImage:
      "radial-gradient(circle at top left, rgba(255,255,255,0.16), transparent 34%), linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0) 55%)"
  };
}

function getFallbackBackgroundStyle(): CSSProperties {
  return {
    backgroundImage:
      "radial-gradient(circle at top left, rgba(255,255,255,0.08), transparent 26%), linear-gradient(135deg, rgba(255,255,255,0.03), transparent 58%), linear-gradient(180deg, rgba(18,19,22,0.94), rgba(10,11,14,0.98))"
  };
}

export function DashboardAuthProfileCard({
  locale
}: DashboardAuthProfileCardProps) {
  const copy = getDashboardCopy(locale);
  const [authState, setAuthState] = useState<DashboardAuthState | null>(null);
  const identity = authState?.status === "authenticated" ? authState.identity : null;
  const bannerUrl = identity?.bannerUrl ?? null;
  const avatarUrl = identity?.avatarUrl ?? null;
  const [showBanner, setShowBanner] = useState(Boolean(bannerUrl));
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
    setShowBanner(Boolean(bannerUrl));
  }, [bannerUrl]);

  useEffect(() => {
    setShowAvatar(Boolean(avatarUrl));
  }, [avatarUrl]);

  const accentBackgroundStyle = getAccentBackgroundStyle(identity?.accentColor ?? null);
  const displayName = getIdentityName(identity, copy.overview.viewerFallbackName);
  const username = getIdentityHandle(identity);
  const avatarInitial = getIdentityInitial(identity, copy.overview.viewerFallbackName);

  return (
    <DashboardPanel className="relative isolate overflow-hidden p-5 sm:p-6">
      <div className="absolute inset-0">
        {showBanner && bannerUrl ? (
          <img
            src={bannerUrl}
            alt=""
            className="h-full w-full object-cover object-center"
            onError={() => setShowBanner(false)}
          />
        ) : (
          <div
            className="h-full w-full"
            style={accentBackgroundStyle ?? getFallbackBackgroundStyle()}
          />
        )}
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(8,10,14,0.9)_0%,rgba(8,10,14,0.7)_46%,rgba(8,10,14,0.92)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_30%)]" />

      <div className="relative z-10 grid min-h-[13rem] gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div className="min-w-0 space-y-3">
          <p className="text-[11px] uppercase tracking-[0.24em] text-white/56">
            {copy.overview.viewerLabel}
          </p>

          {authState === null ? (
            <div className="space-y-2.5">
              <span className="block h-8 max-w-[18rem] rounded-full bg-white/[0.11]" />
              <span className="block h-4 w-28 rounded-full bg-white/[0.08]" />
            </div>
          ) : (
            <div className="space-y-2">
              <h2 className="max-w-[16ch] break-words text-[1.9rem] font-semibold leading-tight tracking-[-0.04em] text-white sm:text-[2.2rem]">
                {displayName}
              </h2>
              {username ? (
                <p className="text-sm text-white/72 sm:text-base">{username}</p>
              ) : null}
            </div>
          )}
        </div>

        <div className="flex justify-start sm:justify-end">
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[1.35rem] border border-white/[0.12] bg-[rgba(255,255,255,0.06)] shadow-[0_12px_36px_rgba(0,0,0,0.24)] sm:h-24 sm:w-24">
            {showAvatar && avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="h-full w-full object-cover"
                onError={() => setShowAvatar(false)}
              />
            ) : (
              <span className="text-2xl font-semibold tracking-[-0.04em] text-white/84 sm:text-[1.75rem]">
                {avatarInitial}
              </span>
            )}
          </div>
        </div>
      </div>
    </DashboardPanel>
  );
}

