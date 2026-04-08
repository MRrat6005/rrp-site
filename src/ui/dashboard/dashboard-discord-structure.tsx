"use client";

import { useEffect, useState } from "react";

import type { Locale } from "@/config/site.config";
import type { DashboardApiError } from "@/lib/dashboard-api";
import type { DashboardDiscordResolvedEntity, DashboardDiscordStructure, DashboardTone } from "@/lib/dashboard-model";
import { DashboardField, DashboardInlineState, DashboardSelect } from "@/ui/dashboard/dashboard-settings-editor";
import { DashboardSectionHeading, DashboardStatusPill, cx } from "@/ui/dashboard/dashboard-primitives";

export interface DashboardDiscordSelectorOption {
  value: string;
  label: string;
  description?: string;
}

const discordCopy = {
  en: {
    syncTitle: "Discord sync",
    syncBody: "Cached Discord structure for selectors and missing-state detection.",
    lastSync: "Last sync",
    rolesCached: "Roles cached",
    channelsCached: "Channels cached",
    guild: "Guild",
    notSet: "Not set",
    stale: "Data stale",
    cached: "Cache ready",
    refreshRequested: "Refresh requested",
    refreshInProgress: "Refresh in progress",
    refresh: "Refresh Discord data",
    refreshing: "Requesting refresh...",
    loading: "Loading Discord structure.",
    unavailable: "Discord structure is unavailable right now.",
    add: "Add",
    active: "Active",
    missing: "Missing in Discord",
    unresolved: "Unresolved",
    noOptions: "No cached Discord values available yet."
  },
  ru: {
    syncTitle: "Discord sync",
    syncBody: "Кэшированная Discord structure для live selectors и missing-state detection.",
    lastSync: "Last sync",
    rolesCached: "Roles cached",
    channelsCached: "Channels cached",
    guild: "Guild",
    notSet: "Not set",
    stale: "Data stale",
    cached: "Cache ready",
    refreshRequested: "Refresh requested",
    refreshInProgress: "Refresh in progress",
    refresh: "Refresh Discord data",
    refreshing: "Отправка refresh...",
    loading: "Загрузка Discord structure.",
    unavailable: "Сейчас не удалось загрузить Discord structure.",
    add: "Add",
    active: "Active",
    missing: "Missing in Discord",
    unresolved: "Unresolved",
    noOptions: "В кэше пока нет Discord values."
  }
} as const;

function getCopy(locale: Locale) {
  return discordCopy[locale];
}

function formatTimestamp(value: string | null | undefined, emptyLabel: string): string {
  if (!value) return emptyLabel;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  const pad = (part: number) => String(part).padStart(2, "0");
  return `${parsed.getUTCFullYear()}-${pad(parsed.getUTCMonth() + 1)}-${pad(parsed.getUTCDate())} ${pad(parsed.getUTCHours())}:${pad(parsed.getUTCMinutes())} UTC`;
}

function getSelectionTone(status: DashboardDiscordResolvedEntity["status"]): DashboardTone {
  switch (status) {
    case "active":
      return "positive";
    case "missing":
      return "warning";
    default:
      return "info";
  }
}

function getSelectionStatusLabel(locale: Locale, status: DashboardDiscordResolvedEntity["status"]): string {
  const copy = getCopy(locale);
  switch (status) {
    case "active":
      return copy.active;
    case "missing":
      return copy.missing;
    default:
      return copy.unresolved;
  }
}

function renderSyncMetric(label: string, value: string) {
  return (
    <div className="rounded-[1rem] border border-white/[0.05] bg-white/[0.02] p-4">
      <p className="text-[11px] uppercase tracking-[0.2em] text-white/32">{label}</p>
      <p className="mt-2 text-sm text-white/78">{value}</p>
    </div>
  );
}

export function DashboardDiscordSyncPanel({
  body,
  error,
  isLoading,
  isRefreshing,
  locale,
  onRefresh,
  structure,
  title
}: {
  body?: string;
  error: DashboardApiError | null;
  isLoading: boolean;
  isRefreshing: boolean;
  locale: Locale;
  onRefresh: () => void;
  structure: DashboardDiscordStructure | null;
  title?: string;
}) {
  const copy = getCopy(locale);
  const refreshState = structure?.sync.refreshState ?? "idle";
  const lastSyncLabel = formatTimestamp(structure?.sync.lastSyncAt, copy.notSet);
  const disableRefresh = isLoading || isRefreshing || refreshState !== "idle";
  const syncNote = structure?.sync.staleReason ?? structure?.sync.note ?? null;

  return (
    <div className="space-y-4">
      <DashboardSectionHeading title={title ?? copy.syncTitle} body={body ?? copy.syncBody} />
      <div className="grid gap-3 sm:grid-cols-2">
        {renderSyncMetric(copy.lastSync, lastSyncLabel)}
        {renderSyncMetric(copy.rolesCached, String(structure?.roleOptions.length ?? 0))}
        {renderSyncMetric(copy.channelsCached, String(structure?.channelOptions.length ?? 0))}
        {renderSyncMetric(copy.guild, structure?.guildId ?? copy.notSet)}
      </div>
      <div className="flex flex-wrap gap-2">
        <DashboardStatusPill tone={structure?.sync.isStale ? "warning" : "positive"}>{structure?.sync.isStale ? copy.stale : copy.cached}</DashboardStatusPill>
        {refreshState === "requested" ? <DashboardStatusPill tone="info">{copy.refreshRequested}</DashboardStatusPill> : null}
        {refreshState === "in_progress" ? <DashboardStatusPill tone="warning">{copy.refreshInProgress}</DashboardStatusPill> : null}
      </div>
      {syncNote ? <p className="text-sm leading-6 text-white/52">{syncNote}</p> : null}
      {error ? <DashboardInlineState tone="error">{copy.unavailable}</DashboardInlineState> : null}
      {!error && isLoading ? <DashboardInlineState tone="muted">{copy.loading}</DashboardInlineState> : null}
      <div className="border-t border-white/[0.05] pt-4">
        <button
          type="button"
          onClick={onRefresh}
          disabled={disableRefresh}
          className="inline-flex items-center justify-center rounded-full border border-white/[0.08] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/72 transition hover:bg-white/[0.03] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isRefreshing ? copy.refreshing : copy.refresh}
        </button>
      </div>
    </div>
  );
}

export function DashboardDiscordEntitySelector({
  emptyLabel,
  hint,
  label,
  locale,
  noOptionsLabel,
  onChange,
  options,
  selected
}: {
  emptyLabel?: string;
  hint: string;
  label: string;
  locale: Locale;
  noOptionsLabel?: string;
  onChange?: (nextValues: string[]) => void;
  options: DashboardDiscordSelectorOption[];
  selected: DashboardDiscordResolvedEntity[];
}) {
  const copy = getCopy(locale);
  const selectedValues = selected.map((item) => item.value);
  const availableOptions = options.filter((item) => !selectedValues.includes(item.value));
  const [draftValue, setDraftValue] = useState(availableOptions[0]?.value ?? "");

  useEffect(() => {
    if (!availableOptions.some((item) => item.value === draftValue)) {
      setDraftValue(availableOptions[0]?.value ?? "");
    }
  }, [availableOptions, draftValue]);

  const removeValue = (value: string) => {
    if (!onChange) return;
    onChange(selectedValues.filter((item) => item !== value));
  };

  const addValue = () => {
    if (!onChange || !draftValue) return;
    onChange([...selectedValues, draftValue]);
  };

  return (
    <DashboardField label={label} hint={hint}>
      <div className="space-y-3 rounded-[1rem] border border-white/[0.05] bg-white/[0.02] p-3.5">
        {selected.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selected.map((item) => (
              <span key={`${item.value}-${item.status}`} className={cx("inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs text-white/84", getSelectionTone(item.status) === "positive" ? "border-emerald-400/20 bg-emerald-400/10" : getSelectionTone(item.status) === "warning" ? "border-amber-300/18 bg-amber-300/10" : "border-sky-300/16 bg-sky-300/10")}>
                <span className="max-w-[18rem] truncate">{item.name}</span>
                {item.status !== "active" ? <span className="text-[10px] uppercase tracking-[0.16em] text-white/62">{getSelectionStatusLabel(locale, item.status)}</span> : null}
                {onChange ? (
                  <button type="button" onClick={() => removeValue(item.value)} className="rounded-full border border-white/[0.08] px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-white/56 transition hover:bg-white/[0.06] hover:text-white/86">
                    x
                  </button>
                ) : null}
              </span>
            ))}
          </div>
        ) : (
          <div className="rounded-[0.9rem] border border-dashed border-white/[0.08] px-3 py-3 text-sm text-white/42">{emptyLabel ?? copy.notSet}</div>
        )}

        {onChange ? (
          availableOptions.length > 0 ? (
            <div className="flex flex-col gap-2 sm:flex-row">
              <DashboardSelect value={draftValue} onChange={(event) => setDraftValue(event.target.value)} className="flex-1">
                {availableOptions.map((item) => (
                  <option key={item.value} value={item.value}>{item.description ? `${item.label} · ${item.description}` : item.label}</option>
                ))}
              </DashboardSelect>
              <button type="button" onClick={addValue} disabled={!draftValue} className="inline-flex items-center justify-center rounded-full border border-white/[0.08] bg-white px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40">
                {copy.add}
              </button>
            </div>
          ) : (
            <p className="text-sm leading-6 text-white/42">{noOptionsLabel ?? copy.noOptions}</p>
          )
        ) : null}
      </div>
    </DashboardField>
  );
}



