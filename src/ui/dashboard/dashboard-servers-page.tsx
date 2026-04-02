"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";

import type { Locale } from "@/config/site.config";
import type { DashboardServer, DashboardServerState } from "@/lib/dashboard-mock";
import { getLocalizedPath } from "@/lib/i18n";
import {
  getDashboardCopy,
  getDashboardStateAction,
  getDashboardStateLabel
} from "@/ui/dashboard/dashboard-copy";
import {
  DashboardMessagePanel,
  DashboardPanel,
  DashboardStatusPill
} from "@/ui/dashboard/dashboard-primitives";
import { DashboardServerShell } from "@/ui/dashboard/dashboard-server-shell";

interface DashboardServersPageProps {
  locale: Locale;
  servers: DashboardServer[];
  notice?: ReactNode;
  emptyState?: {
    title: string;
    body: string;
  };
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
  servers,
  notice,
  emptyState
}: DashboardServersPageProps) {
  const copy = getDashboardCopy(locale);
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const orderedStates: DashboardServerState[] = [
    "connected",
    "invite",
    "inactive",
    "test"
  ];

  const filteredServers = servers.filter((server) => {
    if (!normalizedQuery) {
      return true;
    }

    const haystack = [server.name, server.environment, server.region, server.plan]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });

  const groupedServers = orderedStates.map((state) => ({
    state,
    servers: filteredServers.filter((server) => server.state === state)
  }));

  const resolvedEmptyState =
    emptyState ??
    (normalizedQuery
      ? {
          title: copy.servers.searchEmptyTitle,
          body: copy.servers.searchEmptyBody
        }
      : {
          title: copy.servers.emptyTitle,
          body: copy.servers.emptyBody
        });

  return (
    <DashboardServerShell locale={locale}>
      {notice}
      <DashboardPanel className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/30">
              {copy.servers.resultsLabel}
            </p>
            <p className="text-sm text-white/60">{filteredServers.length}</p>
          </div>

          <label className="block w-full max-w-md">
            <span className="sr-only">{copy.servers.searchPlaceholder}</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.servers.searchPlaceholder}
              className="w-full rounded-[0.95rem] border border-white/[0.04] bg-white/[0.015] px-4 py-3 text-sm text-white/84 outline-none transition placeholder:text-white/24 focus:border-white/[0.08] focus:bg-white/[0.02]"
            />
          </label>
        </div>
      </DashboardPanel>

      {filteredServers.length ? (
        <div className="space-y-6">
          {groupedServers.map((group) =>
            group.servers.length ? (
              <section key={group.state} className="space-y-3">
                <div className="flex flex-col gap-2 border-b border-white/[0.05] pb-3 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-sm font-medium text-white/80">
                    {copy.servers.groups[group.state]}
                  </h2>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-white/32">
                    {group.servers.length}
                  </span>
                </div>

                <div className="grid gap-3 lg:grid-cols-2">
                  {group.servers.map((server) => (
                    <Link
                      key={server.id}
                      href={getLocalizedPath(locale, `dashboard/server/${server.id}/overview`)}
                      className="group"
                    >
                      <DashboardPanel className="h-full p-5 transition hover:border-white/[0.08] hover:bg-[rgba(15,16,18,0.92)] sm:p-6">
                        <div className="flex h-full flex-col gap-5">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex min-w-0 items-start gap-3">
                              <div
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.9rem] border border-white/[0.05] text-sm font-medium text-white/84"
                                style={{ backgroundColor: `${server.accent}18` }}
                              >
                                {server.iconLabel}
                              </div>
                              <div className="min-w-0">
                                <p className="truncate text-base font-medium text-white/92">
                                  {server.name}
                                </p>
                                <p className="text-sm text-white/44">{server.syncNote}</p>
                              </div>
                            </div>

                            <DashboardStatusPill tone={getStateTone(server)}>
                              {getDashboardStateLabel(locale, server.state)}
                            </DashboardStatusPill>
                          </div>

                          <p className="text-sm leading-6 text-white/56">{server.description}</p>

                          <div className="grid gap-x-4 gap-y-3 border-y border-white/[0.05] py-4 text-sm sm:grid-cols-2 xl:grid-cols-4">
                            <div>
                              <p className="text-[11px] uppercase tracking-[0.2em] text-white/32">
                                {copy.servers.environment}
                              </p>
                              <p className="mt-2 text-white/72">{server.environment}</p>
                            </div>
                            <div>
                              <p className="text-[11px] uppercase tracking-[0.2em] text-white/32">
                                {copy.servers.region}
                              </p>
                              <p className="mt-2 text-white/72">{server.region}</p>
                            </div>
                            <div>
                              <p className="text-[11px] uppercase tracking-[0.2em] text-white/32">
                                {copy.servers.members}
                              </p>
                              <p className="mt-2 text-white/72">{server.members}</p>
                            </div>
                            <div>
                              <p className="text-[11px] uppercase tracking-[0.2em] text-white/32">
                                {copy.servers.plan}
                              </p>
                              <p className="mt-2 text-white/72">{server.plan}</p>
                            </div>
                          </div>

                          <div className="mt-auto flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
                            <span className="text-sm text-white/40">{server.id}</span>
                            <span className="text-sm text-white/60 transition group-hover:text-white/76">
                              {getDashboardStateAction(locale, server.state)}
                            </span>
                          </div>
                        </div>
                      </DashboardPanel>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null
          )}
        </div>
      ) : (
        <DashboardMessagePanel
          title={resolvedEmptyState.title}
          body={resolvedEmptyState.body}
        />
      )}
    </DashboardServerShell>
  );
}
