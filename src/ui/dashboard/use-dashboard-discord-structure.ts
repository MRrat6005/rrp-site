"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { DashboardApiError, fetchDashboardDiscordStructure, refreshDashboardDiscordStructure } from "@/lib/dashboard-api";
import type { DashboardDiscordStructure } from "@/lib/dashboard-model";

interface DashboardDiscordStructureState {
  data: DashboardDiscordStructure | null;
  error: DashboardApiError | null;
  isLoading: boolean;
  isRefreshing: boolean;
}

const POLL_INTERVAL_MS = 4000;
const MAX_POLL_ATTEMPTS = 8;

function shouldKeepPolling(structure: DashboardDiscordStructure, baselineLastSyncAt: string | null, attempt: number): boolean {
  if (structure.sync.refreshState !== "idle") return true;
  if (baselineLastSyncAt && structure.sync.lastSyncAt && structure.sync.lastSyncAt !== baselineLastSyncAt) return false;
  if (!baselineLastSyncAt && structure.sync.lastSyncAt) return false;
  return attempt < 2;
}

export function useDashboardDiscordStructure(serverId: string | null | undefined, enabled = true) {
  const [state, setState] = useState<DashboardDiscordStructureState>({
    data: null,
    error: null,
    isLoading: Boolean(serverId) && enabled,
    isRefreshing: false
  });
  const pollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pollAttemptsRef = useRef(0);
  const activeRequestRef = useRef<AbortController | null>(null);

  const clearPoll = useCallback(() => {
    if (pollTimeoutRef.current) {
      clearTimeout(pollTimeoutRef.current);
      pollTimeoutRef.current = null;
    }
  }, []);

  const abortActiveRequest = useCallback(() => {
    activeRequestRef.current?.abort();
    activeRequestRef.current = null;
  }, []);

  const loadStructure = useCallback(async () => {
    if (!serverId || !enabled) return null;
    abortActiveRequest();
    const controller = new AbortController();
    activeRequestRef.current = controller;
    try {
      return await fetchDashboardDiscordStructure(serverId, controller.signal);
    } finally {
      if (activeRequestRef.current === controller) activeRequestRef.current = null;
    }
  }, [abortActiveRequest, enabled, serverId]);

  const schedulePoll = useCallback((baselineLastSyncAt: string | null) => {
    if (!serverId || !enabled) return;
    clearPoll();
    pollTimeoutRef.current = setTimeout(async () => {
      pollAttemptsRef.current += 1;
      try {
        const nextStructure = await loadStructure();
        if (!nextStructure) return;
        setState((current) => ({ ...current, data: nextStructure, error: null, isLoading: false }));
        if (pollAttemptsRef.current < MAX_POLL_ATTEMPTS && shouldKeepPolling(nextStructure, baselineLastSyncAt, pollAttemptsRef.current)) {
          schedulePoll(baselineLastSyncAt);
          return;
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        const apiError = error instanceof DashboardApiError ? error : new DashboardApiError("contract", "Dashboard API returned an invalid Discord structure payload.");
        setState((current) => ({ ...current, error: apiError, isLoading: false }));
        if (pollAttemptsRef.current < MAX_POLL_ATTEMPTS) {
          schedulePoll(baselineLastSyncAt);
          return;
        }
      }
      pollAttemptsRef.current = 0;
      clearPoll();
    }, POLL_INTERVAL_MS);
  }, [clearPoll, enabled, loadStructure, serverId]);

  useEffect(() => {
    if (!serverId || !enabled) {
      clearPoll();
      abortActiveRequest();
      pollAttemptsRef.current = 0;
      setState({ data: null, error: null, isLoading: false, isRefreshing: false });
      return;
    }

    let cancelled = false;
    pollAttemptsRef.current = 0;
    clearPoll();
    setState((current) => ({ ...current, error: null, isLoading: true }));

    loadStructure()
      .then((data) => {
        if (cancelled || !data) return;
        setState({ data, error: null, isLoading: false, isRefreshing: false });
        if (data.sync.refreshState !== "idle") schedulePoll(data.sync.lastSyncAt);
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        if (error instanceof DOMException && error.name === "AbortError") return;
        const apiError = error instanceof DashboardApiError ? error : new DashboardApiError("contract", "Dashboard API returned an invalid Discord structure payload.");
        setState({ data: null, error: apiError, isLoading: false, isRefreshing: false });
      });

    return () => {
      cancelled = true;
      clearPoll();
      abortActiveRequest();
    };
  }, [abortActiveRequest, clearPoll, enabled, loadStructure, schedulePoll, serverId]);

  const requestRefresh = useCallback(async () => {
    if (!serverId || !enabled) return;
    const baselineLastSyncAt = state.data?.sync.lastSyncAt ?? null;
    setState((current) => ({
      ...current,
      error: null,
      isRefreshing: true,
      data: current.data
        ? {
            ...current.data,
            sync: {
              ...current.data.sync,
              refreshState: current.data.sync.refreshState === "in_progress" ? "in_progress" : "requested",
              refreshRequestedAt: current.data.sync.refreshRequestedAt ?? new Date().toISOString()
            }
          }
        : current.data
    }));

    try {
      const nextStructure = await refreshDashboardDiscordStructure(serverId);
      if (nextStructure) {
        setState({ data: nextStructure, error: null, isLoading: false, isRefreshing: false });
        pollAttemptsRef.current = 0;
        schedulePoll(baselineLastSyncAt ?? nextStructure.sync.lastSyncAt ?? null);
        return;
      }
      setState((current) => ({ ...current, error: null, isLoading: false, isRefreshing: false }));
      pollAttemptsRef.current = 0;
      schedulePoll(baselineLastSyncAt);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      const apiError = error instanceof DashboardApiError ? error : new DashboardApiError("contract", "Dashboard API returned an invalid Discord refresh payload.");
      setState((current) => ({ ...current, error: apiError, isLoading: false, isRefreshing: false }));
    }
  }, [enabled, schedulePoll, serverId, state.data]);

  return {
    data: state.data,
    error: state.error,
    isLoading: state.isLoading,
    isRefreshing: state.isRefreshing,
    requestRefresh
  };
}
