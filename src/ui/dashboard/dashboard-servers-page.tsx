"use client";

import Link from "next/link";
import { useState } from "react";

import { siteConfig, type Locale } from "@/config/site.config";
import type { DashboardServer, DashboardServerState } from "@/lib/dashboard-mock";
import { getLocalizedPath } from "@/lib/i18n";
import { LogoTile } from "@/ui/common/logo-tile";
import { getDashboardCopy } from "@/ui/dashboard/dashboard-copy";
import {
  DashboardPanel,
  DashboardStatusPill,
  cx
} from "@/ui/dashboard/dashboard-primitives";

function getStateTone(state: DashboardServerState) {
  switch (state) {
    case "connected":
      return "positive" as const;
    case "invite":
      return "warning" as const;
    case "test":
      return "info" as const;
    default:
      return "muted" as const;
  }
}

interface DashboardServersPageProps {
  locale: Locale;
  servers: DashboardServer[];
}

export function DashboardServersPage({
  locale,
  servers
}: DashboardServersPageProps) {
  const copy = getDashboardCopy(locale);
  const [query, setQuery] = useState("");

  const filteredServers = servers.filter((server) => {
    const haystack = `${server.name} ${server.plan} ${server.region} ${server.environment}`.toLowerCase();
    return haystack.includes(query.trim().toLowerCase());
  });

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1380px] flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
      <DashboardPanel className="p-5 sm:p-6 lg:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <LogoTile
                shortLabel="CR"
                label={siteConfig.brand.dashboardBrand}
                imagePath={siteConfig.visuals.projects.crown.markPath}
                size="sm"
                className="bg-white/[0.06]"
              />
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/42">
                {copy.servers.eyebrow}
              </p>
            </div>
            <div className="space-y-3">
              <h1 className="max-w-4xl [font-family:var(--font-display)] text-3xl font-semibold text-white sm:text-[3.2rem] sm:leading-[1.02]">
                {copy.servers.title}
              </h1>
              <p className="max-w-3xl text-sm leading-7 text-white/62 sm:text-base">
                {copy.servers.body}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={getLocalizedPath(locale)}
              className="rounded-full border border-white/10 px-4 py-2.5 text-sm text-white/64 transition hover:border-white/16 hover:text-white"
            >
              {siteConfig.brand.fullName}
            </Link>
            <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white/74">
              {copy.servers.resultsLabel}: {filteredServers.length}
            </div>
          </div>
        </div>
      </DashboardPanel>

      <DashboardPanel className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="block w-full lg:max-w-[28rem]">
            <span className="sr-only">{copy.servers.searchPlaceholder}</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.servers.searchPlaceholder}
              className="w-full rounded-[1rem] border border-white/10 bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/32 focus:border-white/18 focus:bg-white/[0.06]"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {(["connected", "invite", "inactive", "test"] as const).map((state) => (
              <DashboardStatusPill key={state} tone={getStateTone(state)}>
                {copy.servers.status[state]}
              </DashboardStatusPill>
            ))}
          </div>
        </div>
      </DashboardPanel>

      {filteredServers.length ? (
        <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {filteredServers.map((server) => {
            const stateTone = getStateTone(server.state);
            const modulesEnabled = server.modules.filter((item) => item.enabled).length;
            const ctaLabel =
              server.state === "invite"
                ? copy.servers.inviteCta
                : server.state === "inactive"
                  ? copy.servers.inactiveCta
                  : server.state === "test"
                    ? copy.servers.testCta
                    : copy.servers.openCta;

            return (
              <Link
                key={server.id}
                href={getLocalizedPath(locale, `app/server/${server.id}`)}
                className="group"
              >
                <DashboardPanel className="h-full p-0 transition duration-300 group-hover:-translate-y-1 group-hover:border-white/16 group-hover:bg-[linear-gradient(180deg,rgba(13,17,25,0.96),rgba(8,12,19,0.92))]">
                  <div className="flex h-full flex-col gap-5 p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-start gap-3">
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] border border-white/10 text-sm font-semibold text-white"
                          style={{ backgroundColor: `${server.accent}26`, boxShadow: `inset 0 0 0 1px ${server.accent}44` }}
                        >
                          {server.iconLabel}
                        </div>
                        <div className="min-w-0 space-y-1">
                          <p className="truncate text-lg font-semibold text-white">{server.name}</p>
                          <p className="text-sm text-white/48">{server.plan}</p>
                        </div>
                      </div>
                      <DashboardStatusPill tone={stateTone}>{copy.servers.status[server.state]}</DashboardStatusPill>
                    </div>

                    <p className="text-sm leading-7 text-white/62">{server.description}</p>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-3 py-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/38">{copy.servers.members}</p>
                        <p className="mt-2 text-sm font-medium text-white/78">{server.memberCount}</p>
                      </div>
                      <div className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-3 py-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/38">{copy.servers.region}</p>
                        <p className="mt-2 text-sm font-medium text-white/78">{server.region}</p>
                      </div>
                      <div className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-3 py-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/38">{copy.servers.modules}</p>
                        <p className="mt-2 text-sm font-medium text-white/78">{modulesEnabled} active</p>
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/8 pt-4">
                      <p className="text-sm text-white/48">{server.syncLabel}</p>
                      <span
                        className={cx(
                          "rounded-full border px-4 py-2 text-sm text-white transition",
                          server.state === "inactive"
                            ? "border-white/10 bg-white/[0.04]"
                            : "border-white/16 bg-white/[0.08] group-hover:bg-white/[0.12]"
                        )}
                      >
                        {ctaLabel}
                      </span>
                    </div>
                  </div>
                </DashboardPanel>
              </Link>
            );
          })}
        </section>
      ) : (
        <DashboardPanel className="p-8 text-center">
          <div className="mx-auto max-w-xl space-y-3">
            <h2 className="[font-family:var(--font-display)] text-2xl font-semibold text-white">
              {copy.servers.emptyTitle}
            </h2>
            <p className="text-sm leading-7 text-white/58">{copy.servers.emptyBody}</p>
          </div>
        </DashboardPanel>
      )}
    </main>
  );
}
