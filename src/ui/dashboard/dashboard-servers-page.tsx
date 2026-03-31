"use client";

import Link from "next/link";
import { useState } from "react";

import type { Locale } from "@/config/site.config";
import type { DashboardServer } from "@/lib/dashboard-mock";
import { getLocalizedPath } from "@/lib/i18n";
import {
  getDashboardCopy,
  getDashboardStateAction,
  getDashboardStateLabel
} from "@/ui/dashboard/dashboard-copy";
import {
  DashboardPanel,
  DashboardStatusPill
} from "@/ui/dashboard/dashboard-primitives";
import { DashboardServerShell } from "@/ui/dashboard/dashboard-server-shell";

interface DashboardServersPageProps {
  locale: Locale;
  servers: DashboardServer[];
}

function getStateTone(server: DashboardServer) {
  switch (server.state) {
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

export function DashboardServersPage({
  locale,
  servers
}: DashboardServersPageProps) {
  const copy = getDashboardCopy(locale);
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const filteredServers = servers.filter((server) => {
    if (!normalizedQuery) {
      return true;
    }

    const haystack = [server.name, server.environment, server.region, server.plan]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });

  return (
    <DashboardServerShell locale={locale}>
      <DashboardPanel className="p-4 sm:p-5">
        <label className="block">
          <span className="sr-only">{copy.servers.searchPlaceholder}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.servers.searchPlaceholder}
            className="w-full rounded-[1rem] border border-white/[0.06] bg-white/[0.015] px-4 py-3 text-sm text-white/84 outline-none transition placeholder:text-white/24 focus:border-white/[0.1] focus:bg-white/[0.02]"
          />
        </label>
      </DashboardPanel>

      {filteredServers.length ? (
        <section className="grid gap-4 xl:grid-cols-2">
          {filteredServers.map((server) => (
            <Link
              key={server.id}
              href={getLocalizedPath(locale, `dashboard/server/${server.id}/overview`)}
              className="group"
            >
              <DashboardPanel className="h-full p-5 transition hover:border-white/[0.09] hover:bg-[linear-gradient(180deg,rgba(19,20,23,0.95),rgba(13,14,16,0.95))] sm:p-6">
                <div className="flex h-full flex-col gap-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-3">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.9rem] border border-white/[0.06] text-sm font-medium text-white/84"
                        style={{ backgroundColor: `${server.accent}20` }}
                      >
                        {server.iconLabel}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-base font-semibold text-white">
                          {server.name}
                        </p>
                        <p className="text-sm text-white/48">{server.syncNote}</p>
                      </div>
                    </div>

                    <DashboardStatusPill tone={getStateTone(server)}>
                      {getDashboardStateLabel(locale, server.state)}
                    </DashboardStatusPill>
                  </div>

                  <p className="text-sm leading-6 text-white/58">{server.description}</p>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-[1rem] border border-white/[0.06] bg-white/[0.015] px-3 py-3">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-white/36">
                        {copy.servers.members}
                      </p>
                      <p className="mt-2 text-sm text-white/76">{server.members}</p>
                    </div>
                    <div className="rounded-[1rem] border border-white/[0.06] bg-white/[0.015] px-3 py-3">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-white/36">
                        {copy.servers.region}
                      </p>
                      <p className="mt-2 text-sm text-white/76">{server.region}</p>
                    </div>
                    <div className="rounded-[1rem] border border-white/[0.06] bg-white/[0.015] px-3 py-3">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-white/36">
                        {copy.servers.environment}
                      </p>
                      <p className="mt-2 text-sm text-white/76">{server.environment}</p>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
                    <span className="text-sm text-white/44">{server.plan}</span>
                    <span className="text-sm text-white/60 transition group-hover:text-white/78">
                      {getDashboardStateAction(locale, server.state)}
                    </span>
                  </div>
                </div>
              </DashboardPanel>
            </Link>
          ))}
        </section>
      ) : (
        <DashboardPanel className="p-6 sm:p-8">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-white">{copy.servers.emptyTitle}</h2>
            <p className="text-sm leading-6 text-white/56">{copy.servers.emptyBody}</p>
          </div>
        </DashboardPanel>
      )}
    </DashboardServerShell>
  );
}


