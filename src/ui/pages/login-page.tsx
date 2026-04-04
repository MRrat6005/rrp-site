"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";

import { siteConfig, type Locale } from "@/config/site.config";
import {
  fetchDashboardAuthState,
  getDashboardDiscordLoginUrl,
  logoutDashboardAuth,
  type DashboardAuthIdentity,
  type DashboardAuthState
} from "@/lib/dashboard-auth";
import { getLocalizedPath } from "@/lib/i18n";
import type { SiteMessages } from "@/messages/types";
import { LogoTile } from "@/ui/common/logo-tile";
import { ConfigurableBackdrop } from "@/ui/layout/configurable-backdrop";

interface LoginPageProps {
  locale: Locale;
  messages: SiteMessages;
}

function getIdentityName(
  identity: DashboardAuthIdentity | null,
  fallback: string
): string {
  return identity?.displayName ?? identity?.username ?? fallback;
}

function getIdentityMeta(identity: DashboardAuthIdentity | null): string | null {
  if (!identity?.username) {
    return null;
  }

  if (identity.displayName && identity.displayName !== identity.username) {
    return `@${identity.username}`;
  }

  return null;
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

function getIdentityPanelStyle(accentColor: string | null): CSSProperties | null {
  const normalized = normalizeAccentColor(accentColor);

  if (!normalized) {
    return null;
  }

  const rgb = normalized.startsWith("#") ? hexToRgb(normalized) : null;

  if (rgb) {
    return {
      borderColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.18)`,
      backgroundImage: `linear-gradient(135deg, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.09), rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.025) 46%, rgba(255,255,255,0.02) 100%)`,
      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.025), 0 0 0 1px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.04)`
    };
  }

  return {
    borderColor: "rgba(255,255,255,0.08)",
    backgroundImage: `linear-gradient(135deg, ${normalized}14, rgba(255,255,255,0.02) 56%, rgba(255,255,255,0.015) 100%)`
  };
}

function getIdentityAvatarStyle(accentColor: string | null): CSSProperties | null {
  const normalized = normalizeAccentColor(accentColor);

  if (!normalized) {
    return null;
  }

  const rgb = normalized.startsWith("#") ? hexToRgb(normalized) : null;

  if (rgb) {
    return {
      borderColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.24)`,
      backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.12)`,
      boxShadow: `0 10px 24px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.12)`
    };
  }

  return {
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: `${normalized}16`
  };
}

function getIdentityAccentDotStyle(accentColor: string | null): CSSProperties | null {
  const normalized = normalizeAccentColor(accentColor);

  if (!normalized) {
    return null;
  }

  const rgb = normalized.startsWith("#") ? hexToRgb(normalized) : null;

  if (rgb) {
    return {
      backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.18)`,
      borderColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.28)`
    };
  }

  return {
    backgroundColor: `${normalized}20`,
    borderColor: `${normalized}42`
  };
}

function LoginIdentityPlaceholder() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 text-white/60"
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

export function LoginPage({ locale, messages }: LoginPageProps) {
  const workspaceHref = getLocalizedPath(locale, siteConfig.ctaRoutes.workspace);
  const publicCrownHref = getLocalizedPath(locale, siteConfig.ctaRoutes.projects.crown);
  const crownAsset = siteConfig.assetPlaceholders.projects.crown;
  const crownMarkPath = siteConfig.visuals.projects.crown.markPath;
  const [authState, setAuthState] = useState<DashboardAuthState | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutFailed, setLogoutFailed] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    void (async () => {
      try {
        const nextState = await fetchDashboardAuthState(controller.signal);
        setAuthState(nextState);
        setLogoutFailed(false);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setAuthState({ status: "unavailable" });
      }
    })();

    return () => controller.abort();
  }, []);

  const authStatus = authState?.status ?? "loading";
  const isAuthenticated = authStatus === "authenticated";
  const identity = authState?.status === "authenticated" ? authState.identity : null;
  const avatarUrl = identity?.avatarUrl ?? null;
  const accentColor = identity?.accentColor ?? null;
  const authNotice = isAuthenticated
    ? messages.login.authenticatedNotice
    : authStatus === "loading"
      ? messages.login.loadingNotice
      : authStatus === "unavailable"
        ? messages.login.unavailableNotice
        : messages.login.authNotice;
  const panelTitle = isAuthenticated
    ? messages.login.panelTitleAuthenticated
    : messages.login.panelTitle;
  const panelBody = isAuthenticated
    ? messages.login.panelBodyAuthenticated
    : authStatus === "unavailable"
      ? messages.login.panelBodyUnavailable
      : messages.login.panelBody;
  const summary = logoutFailed
    ? messages.login.logoutError
    : isAuthenticated
      ? messages.login.authenticatedSummary
      : authStatus === "loading"
        ? messages.login.loadingSummary
        : authStatus === "unavailable"
          ? messages.login.unavailableSummary
          : messages.login.summary;

  function handleDiscordLogin() {
    setLogoutFailed(false);

    const loginUrl = getDashboardDiscordLoginUrl("/dashboard");

    if (!loginUrl) {
      setAuthState({ status: "unavailable" });
      return;
    }

    window.location.assign(loginUrl);
  }

  useEffect(() => {
    setShowAvatar(Boolean(avatarUrl));
  }, [avatarUrl]);

  const identityPanelStyle = getIdentityPanelStyle(accentColor);
  const identityAvatarStyle = getIdentityAvatarStyle(accentColor);
  const identityAccentDotStyle = getIdentityAccentDotStyle(accentColor);

  async function handleLogout() {
    setIsLoggingOut(true);
    setLogoutFailed(false);

    try {
      await logoutDashboardAuth();
      setAuthState({ status: "unauthenticated" });
    } catch {
      setLogoutFailed(true);
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      <section
        className="workspace-shell reveal-up isolate overflow-hidden px-6 py-7 sm:px-7 sm:py-8 lg:px-8 lg:py-9"
        data-reveal
      >
        <ConfigurableBackdrop background={siteConfig.visuals.backgrounds.dashboardEntry} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_24%),linear-gradient(120deg,rgba(4,6,10,0.16),rgba(6,8,12,0.58)_45%,rgba(6,8,11,0.88))]" />
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)]" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(21.5rem,0.92fr)] lg:items-center lg:gap-12">
          <div className="flex min-h-full flex-col gap-8 lg:py-2">
            <div className="max-w-2xl space-y-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/38">
                {messages.login.eyebrow}
              </p>

              <div className="max-w-2xl rounded-full border border-white/[0.08] bg-[rgba(10,12,17,0.56)] px-4 py-3 backdrop-blur-xl sm:px-5">
                <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] sm:gap-4">
                  <span className="text-white/42">{messages.login.bridgeFrom}</span>
                  <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(255,255,255,0.1),rgba(255,255,255,0.03))]" />
                  <span className="text-white/82">Discord</span>
                  <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(255,255,255,0.1),rgba(255,255,255,0.03))]" />
                  <span className="text-right text-white/54">{messages.login.bridgeTo}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="display-title max-w-[12ch]">{messages.login.title}</h1>
                <p className="max-w-xl text-base leading-8 text-white/64 sm:text-lg">
                  {messages.login.intro}
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(9,11,15,0.82),rgba(9,10,13,0.6))] p-4 backdrop-blur-xl sm:p-5">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_18%),radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_26%)]" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <LogoTile
                      shortLabel={crownAsset.shortLabel}
                      label={crownAsset.label}
                      imagePath={crownMarkPath}
                      size="sm"
                      className="bg-white/[0.02]"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white/84">
                        {siteConfig.brand.dashboardBrand}
                      </p>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/30">
                        {messages.login.transitionNote}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/30">
                    {messages.login.bridgeTo}
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-[11rem_minmax(0,1fr)]">
                  <div className="rounded-[1.15rem] border border-white/[0.05] bg-white/[0.025] p-3">
                    <div className="space-y-2.5">
                      <span className="block h-8 rounded-[0.85rem] border border-white/[0.06] bg-white/[0.03]" />
                      <span className="block h-8 rounded-[0.85rem] border border-white/[0.04] bg-white/[0.015]" />
                      <span className="block h-8 rounded-[0.85rem] border border-white/[0.04] bg-white/[0.015]" />
                      <span className="block h-8 rounded-[0.85rem] border border-white/[0.04] bg-white/[0.015]" />
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <div className="rounded-[1.15rem] border border-white/[0.05] bg-[rgba(255,255,255,0.03)] p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-3">
                          <span className="h-2 w-2 rounded-full bg-white/28" />
                          <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(255,255,255,0.08),transparent)]" />
                          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/32">
                            {siteConfig.brand.dashboardBrand}
                          </span>
                        </div>
                        <span className="block h-3.5 w-40 rounded-full bg-white/[0.08]" />
                        <span className="block h-2.5 w-full max-w-[18rem] rounded-full bg-white/[0.05]" />
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[1.15rem] border border-white/[0.05] bg-white/[0.02] p-4">
                        <span className="block h-2.5 w-16 rounded-full bg-white/[0.06]" />
                        <span className="mt-3 block h-7 rounded-[0.8rem] border border-white/[0.04] bg-white/[0.025]" />
                      </div>
                      <div className="rounded-[1.15rem] border border-white/[0.05] bg-white/[0.02] p-4">
                        <span className="block h-2.5 w-20 rounded-full bg-white/[0.06]" />
                        <span className="mt-3 block h-7 rounded-[0.8rem] border border-white/[0.04] bg-white/[0.025]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="self-center" data-reveal>
            <div className="glass-panel glass-panel-strong overflow-hidden rounded-[1.75rem] border-white/[0.08] bg-[linear-gradient(180deg,rgba(11,13,17,0.94),rgba(9,10,13,0.98))] p-6 sm:p-7">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_20%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_32%)]" />

              <div className="relative z-10 flex h-full flex-col gap-6">
                <div className="space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <LogoTile
                        shortLabel={crownAsset.shortLabel}
                        label={crownAsset.label}
                        imagePath={crownMarkPath}
                        size="md"
                        className="bg-white/[0.02]"
                      />
                      <div className="min-w-0">
                        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/36">
                          {panelTitle}
                        </p>
                        <p className="[font-family:var(--font-display)] text-2xl font-semibold tracking-[-0.04em] text-ink sm:text-[2.15rem]">
                          {siteConfig.brand.dashboardBrand}
                        </p>
                      </div>
                    </div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/34">
                      Discord
                    </p>
                  </div>

                  <p className="max-w-sm text-sm leading-7 text-white/66 sm:text-base">
                    {panelBody}
                  </p>

                  <div className="grid gap-3 border-y border-white/[0.06] py-4 sm:grid-cols-2">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/28">
                        {messages.login.bridgeFrom}
                      </p>
                      <p className="mt-2 text-sm text-white/70">Discord</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/28">
                        {messages.login.bridgeTo}
                      </p>
                      <p className="mt-2 text-sm text-white/70">{siteConfig.brand.dashboardBrand}</p>
                    </div>
                  </div>

                  {isAuthenticated ? (
                    <div
                      className="relative overflow-hidden rounded-[1.15rem] border border-white/[0.05] bg-white/[0.03] p-4"
                      style={identityPanelStyle ?? undefined}
                    >
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_55%)]" />
                      <div className="relative z-10 flex items-center gap-3">
                        <div
                          className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[0.95rem] border border-white/[0.09] bg-white/[0.04]"
                          style={identityAvatarStyle ?? undefined}
                        >
                          {showAvatar && avatarUrl ? (
                            <img
                              src={avatarUrl}
                              alt={getIdentityName(identity, messages.login.identityFallback)}
                              className="h-full w-full object-cover"
                              onError={() => setShowAvatar(false)}
                            />
                          ) : (
                            <LoginIdentityPlaceholder />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/28">
                            {messages.login.identityLabel}
                          </p>
                          <p className="mt-2 truncate text-sm font-medium text-white/82">
                            {getIdentityName(identity, messages.login.identityFallback)}
                          </p>
                          {getIdentityMeta(identity) ? (
                            <p className="mt-1 truncate text-xs text-white/44">{getIdentityMeta(identity)}</p>
                          ) : null}
                        </div>

                        <span
                          className="inline-flex h-2.5 w-2.5 shrink-0 rounded-full border border-white/[0.12] bg-white/[0.08] shadow-[0_0_0_4px_rgba(255,255,255,0.02)]"
                          style={identityAccentDotStyle ?? undefined}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="space-y-3">
                  <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/34">
                    {authNotice}
                  </p>
                  {isAuthenticated ? (
                    <Link
                      href={workspaceHref}
                      className="button-primary flex w-full items-center justify-between px-5 py-4"
                    >
                      <span>{messages.login.continueCta}</span>
                      <span className="text-[10px] uppercase tracking-[0.24em] text-slate-600">
                        {siteConfig.brand.dashboardBrand}
                      </span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={handleDiscordLogin}
                      aria-label={messages.login.primaryCta}
                      className="button-primary flex w-full items-center justify-between px-5 py-4"
                    >
                      <span>{messages.login.primaryCta}</span>
                      <span className="text-[10px] uppercase tracking-[0.24em] text-slate-600">
                        Discord
                      </span>
                    </button>
                  )}
                  <p className="text-sm leading-6 text-white/48">{summary}</p>
                </div>

                <div className="space-y-3 border-t border-white/[0.06] pt-4">
                  {isAuthenticated ? (
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="button-secondary flex w-full justify-between px-5 py-3.5 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <span>
                        {isLoggingOut ? messages.login.logoutPending : messages.login.logoutCta}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.24em] text-white/38">
                        Discord
                      </span>
                    </button>
                  ) : (
                    <Link
                      href={workspaceHref}
                      className="button-secondary flex w-full justify-between px-5 py-3.5"
                    >
                      <span>{messages.login.secondaryCta}</span>
                      <span className="text-[10px] uppercase tracking-[0.24em] text-white/38">
                        {siteConfig.brand.dashboardBrand}
                      </span>
                    </Link>
                  )}
                  <Link
                    href={publicCrownHref}
                    className="inline-flex items-center justify-between gap-3 rounded-full px-1 text-sm text-white/48 transition duration-300 hover:text-white/72"
                  >
                    <span>{messages.nav.backToSite}</span>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-white/28">
                      {messages.login.bridgeFrom}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}



