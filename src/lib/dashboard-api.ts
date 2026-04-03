import type {
  DashboardBrandAsset,
  DashboardEntitlement,
  DashboardIdentityField,
  DashboardModule,
  DashboardModuleKey,
  DashboardNotice,
  DashboardServer,
  DashboardServerState,
  DashboardSettingGroup,
  DashboardStatusGroup,
  DashboardStatusItem,
  DashboardTone
} from "@/lib/dashboard-mock";

export type DashboardServerRoutePage =
  | "overview"
  | "settings"
  | "modules"
  | "branding"
  | "licenses"
  | "status";

export type DashboardApiErrorKind =
  | "config"
  | "network"
  | "http"
  | "parse"
  | "contract";

type DashboardRawRecord = Record<string, unknown>;

interface DashboardApiResponse<T> {
  data: T;
  path: string;
}

declare global {
  interface Window {
    __RRP_RUNTIME_CONFIG__?: {
      dashboardApiBaseUrl?: string;
    };
  }
}

export class DashboardApiError extends Error {
  kind: DashboardApiErrorKind;
  path?: string;
  status?: number;

  constructor(
    kind: DashboardApiErrorKind,
    message: string,
    options?: { path?: string; status?: number }
  ) {
    super(message);
    this.name = "DashboardApiError";
    this.kind = kind;
    this.path = options?.path;
    this.status = options?.status;
  }
}

function normalizeBaseUrl(value?: string | null): string | null {
  const normalized = value?.trim();

  if (!normalized) {
    return null;
  }

  return normalized.replace(/\/+$/, "");
}

export function getDashboardApiBaseUrl(): string | null {
  if (typeof window !== "undefined") {
    const runtimeBaseUrl = normalizeBaseUrl(
      window.__RRP_RUNTIME_CONFIG__?.dashboardApiBaseUrl
    );

    if (runtimeBaseUrl) {
      return runtimeBaseUrl;
    }
  }

  return normalizeBaseUrl(process.env.NEXT_PUBLIC_DASHBOARD_API_BASE_URL ?? null);
}

function buildDashboardApiUrl(baseUrl: string, path: string): string {
  const url = new URL(baseUrl);
  const baseSegments = url.pathname.split("/").filter(Boolean);
  const normalizedPath = path.split("/").filter(Boolean);
  const endsWithApiV1 =
    baseSegments.at(-2)?.toLowerCase() === "api" &&
    baseSegments.at(-1)?.toLowerCase() === "v1";
  const endsWithApi = baseSegments.at(-1)?.toLowerCase() === "api";
  const routeSegments = endsWithApiV1
    ? normalizedPath
    : endsWithApi
      ? ["v1", ...normalizedPath]
      : ["api", "v1", ...normalizedPath];

  url.pathname = `/${[...baseSegments, ...routeSegments].join("/")}`;

  return url.toString();
}

async function fetchDashboardJson<T>(
  path: string,
  signal?: AbortSignal
): Promise<DashboardApiResponse<T>> {
  const baseUrl = getDashboardApiBaseUrl();

  if (!baseUrl) {
    throw new DashboardApiError(
      "config",
      "Dashboard API base URL is not configured.",
      { path }
    );
  }

  const url = buildDashboardApiUrl(baseUrl, path);
  let response: Response;

  try {
    response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json"
      },
      cache: "no-store",
      signal
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }

    throw new DashboardApiError("network", "Dashboard API is unreachable.", {
      path
    });
  }

  if (!response.ok) {
    throw new DashboardApiError("http", "Dashboard API request failed.", {
      path,
      status: response.status
    });
  }

  try {
    return {
      data: (await response.json()) as T,
      path
    };
  } catch {
    throw new DashboardApiError(
      "parse",
      "Dashboard API returned invalid JSON.",
      { path }
    );
  }
}

function asArray(value: unknown): unknown[] | null {
  return Array.isArray(value) ? value : null;
}

function asRecord(value: unknown): DashboardRawRecord | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  return value as DashboardRawRecord;
}

function getPathValue(value: unknown, path: readonly string[]): unknown {
  let current: unknown = value;

  for (const segment of path) {
    const record = asRecord(current);

    if (!record || !(segment in record)) {
      return undefined;
    }

    current = record[segment];
  }

  return current;
}

function pickPathValue(
  value: unknown,
  paths: readonly (readonly string[])[]
): unknown {
  for (const path of paths) {
    const resolved = getPathValue(value, path);

    if (resolved !== undefined) {
      return resolved;
    }
  }

  return undefined;
}

function asString(value: unknown): string | null {
  if (typeof value === "string") {
    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return null;
}

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const normalized = Number(value);
    return Number.isFinite(normalized) ? normalized : null;
  }

  return null;
}

function asRecordArray(value: unknown): DashboardRawRecord[] {
  return (asArray(value) ?? [])
    .map((item) => asRecord(item))
    .filter((item): item is DashboardRawRecord => item !== null);
}

function pickString(
  value: unknown,
  paths: readonly (readonly string[])[]
): string | null {
  return asString(pickPathValue(value, paths));
}

function pickNumber(
  value: unknown,
  paths: readonly (readonly string[])[]
): number | null {
  return asNumber(pickPathValue(value, paths));
}

function pickRecord(
  value: unknown,
  paths: readonly (readonly string[])[]
): DashboardRawRecord | null {
  return asRecord(pickPathValue(value, paths));
}

function pickRecordArray(
  value: unknown,
  paths: readonly (readonly string[])[]
): DashboardRawRecord[] {
  for (const path of paths) {
    const candidate = getPathValue(value, path);
    const items = asRecordArray(candidate);

    if (items.length > 0 || Array.isArray(candidate)) {
      return items;
    }
  }

  return [];
}

function toInitials(value: string): string {
  const initials = value
    .split(/[\s_-]+/)
    .map((item) => item[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);

  return initials || value.slice(0, 2).toUpperCase();
}

function asBoolean(value: unknown): boolean | null {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    return value !== 0;
  }

  const normalized = asString(value)?.toLowerCase();

  if (!normalized) {
    return null;
  }

  if (["true", "1", "yes", "enabled", "active", "connected", "healthy", "reachable"].includes(normalized)) {
    return true;
  }

  if (["false", "0", "no", "disabled", "inactive", "disconnected", "unreachable"].includes(normalized)) {
    return false;
  }

  return null;
}

function toTitleCase(value: string): string {
  return value
    .replace(/[_-]+/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((item) => item[0]?.toUpperCase() + item.slice(1).toLowerCase())
    .join(" ");
}

function formatTimestamp(value: unknown): string | null {
  const normalized = asString(value);

  if (!normalized) {
    return null;
  }

  const parsed = new Date(normalized);

  if (Number.isNaN(parsed.getTime())) {
    return normalized;
  }

  const pad = (part: number) => String(part).padStart(2, "0");

  return `${parsed.getUTCFullYear()}-${pad(parsed.getUTCMonth() + 1)}-${pad(parsed.getUTCDate())} ${pad(parsed.getUTCHours())}:${pad(parsed.getUTCMinutes())} UTC`;
}

function buildSyncNote(value: unknown): string {
  const capturedAt = formatTimestamp(
    pickPathValue(value, [["latest_status", "captured_at"], ["latestStatus", "captured_at"], ["captured_at"], ["capturedAt"]])
  );

  if (capturedAt) {
    return `Captured ${capturedAt}`;
  }

  const lastSyncAt = formatTimestamp(
    pickPathValue(value, [["latest_status", "last_sync_at"], ["latestStatus", "last_sync_at"], ["last_sync_at"], ["lastSyncAt"]])
  );

  if (lastSyncAt) {
    return `Last sync ${lastSyncAt}`;
  }

  return pickString(value, [["sync_note"], ["syncNote"], ["updated_at"], ["updatedAt"]]) ?? "";
}

function formatLocaleLabel(value: unknown): string | null {
  const normalized = asString(value)?.replace(/_/g, "-");

  if (!normalized) {
    return null;
  }

  const [language, region] = normalized.split("-");

  try {
    const languageName = new Intl.DisplayNames(["en"], { type: "language" }).of(language.toLowerCase());
    const regionName = region
      ? new Intl.DisplayNames(["en"], { type: "region" }).of(region.toUpperCase())
      : null;

    if (languageName && regionName) {
      return `${languageName} (${regionName})`;
    }

    if (languageName) {
      return languageName;
    }
  } catch {
    // Fallback to the raw locale code below.
  }

  return normalized;
}

function formatRegionLabel(value: unknown): string | null {
  const normalized = asString(value)?.replace(/_/g, "-");

  if (!normalized) {
    return null;
  }

  const [, region] = normalized.split("-");

  if (!region) {
    return null;
  }

  try {
    return (
      new Intl.DisplayNames(["en"], { type: "region" }).of(region.toUpperCase()) ??
      region.toUpperCase()
    );
  } catch {
    return region.toUpperCase();
  }
}

function formatModuleCount(modules: DashboardModule[]): string {
  if (modules.length === 0) {
    return "";
  }

  const enabledCount = modules.filter((module) => {
    const normalized = module.stateLabel.toLowerCase();
    return ["active", "connected", "enabled", "healthy", "ready"].includes(normalized);
  }).length;

  if (enabledCount === modules.length) {
    return `${modules.length} modules enabled`;
  }

  if (enabledCount > 0) {
    return `${enabledCount} of ${modules.length} modules enabled`;
  }

  return `${modules.length} modules tracked`;
}

function buildPlanLabel(value: unknown): string {
  const tier = pickString(value, [
    ["active_license", "tier"],
    ["activeLicense", "tier"],
    ["tier"],
    ["plan"],
    ["plan_name"],
    ["planName"]
  ]);
  const status = pickString(value, [
    ["active_license", "status"],
    ["activeLicense", "status"],
    ["license_status"],
    ["status"]
  ]);

  return [tier ? toTitleCase(tier) : null, status ? toTitleCase(status) : null]
    .filter((item): item is string => Boolean(item))
    .join(" · ");
}

const moduleMetadata: Record<
  DashboardModuleKey,
  { actionLabel: string; description: string; name: string }
> = {
  bank: {
    name: "Bank",
    description: "Balances, transfers, and salary rules.",
    actionLabel: "Open bank"
  },
  social: {
    name: "Social",
    description: "Profiles, reactions, and player progression.",
    actionLabel: "Open social"
  },
  weather: {
    name: "Weather",
    description: "Forecast controls and saved locations.",
    actionLabel: "Open weather"
  },
  sessions: {
    name: "Sessions",
    description: "Session timing and event structure.",
    actionLabel: "Open sessions"
  },
  radio: {
    name: "Radio",
    description: "Channel presets and radio access.",
    actionLabel: "Review radio"
  },
  rentals: {
    name: "Rentals",
    description: "Lease records and property states.",
    actionLabel: "Open rentals"
  },
  branding: {
    name: "Branding",
    description: "Brand assets, display name, and visual identity.",
    actionLabel: "Open branding"
  },
  dashboard: {
    name: "Dashboard",
    description: "Workspace access, overview, and dashboard routing.",
    actionLabel: "Open overview"
  },
  licenses: {
    name: "Licenses",
    description: "License status, seats, and access entitlements.",
    actionLabel: "Open licenses"
  }
};

function buildServerDescription(value: unknown, modules: DashboardModule[]): string {
  const note = pickString(value, [
    ["profile", "notes"],
    ["notes"],
    ["description"],
    ["summary"],
    ["detail"],
    ["note"]
  ]);

  if (note) {
    return note;
  }

  const status = pickString(value, [["latest_status", "status"], ["latestStatus", "status"]]);
  const moduleSummary = formatModuleCount(modules);
  const plan = buildPlanLabel(value);

  return [plan || null, status ? toTitleCase(status) : null, moduleSummary || null]
    .filter((item): item is string => Boolean(item))
    .join(". ");
}

function buildOverviewIdentity(
  value: unknown,
  baseServer?: DashboardServer
): DashboardIdentityField[] {
  const items: DashboardIdentityField[] = [];
  const pushItem = (label: string, itemValue: string | null) => {
    if (!itemValue || items.some((item) => item.label === label && item.value === itemValue)) {
      return;
    }

    items.push({ label, value: itemValue });
  };

  const locale = formatLocaleLabel(
    pickPathValue(value, [
      ["profile", "preferred_locale"],
      ["preferred_locale"],
      ["localization", "default_locale"],
      ["localization", "fallback_locale"]
    ])
  );
  const supportLink =
    pickString(value, [["profile", "support_url"], ["branding", "support_invite_url"]]) ??
    null;
  const seats = pickNumber(value, [["active_license", "seats"], ["activeLicense", "seats"]]);
  const plan = buildPlanLabel(value) || baseServer?.plan || null;

  pushItem(
    "Display name",
    pickString(value, [["branding", "display_name"], ["server", "name"], ["name"]]) ??
      baseServer?.name ??
      null
  );
  pushItem("Locale", locale ?? baseServer?.environment ?? null);
  pushItem("Timezone", pickString(value, [["profile", "timezone"], ["timezone"]]) ?? null);
  pushItem(
    "Contact",
    pickString(value, [["profile", "contact_email"], ["contact_email"]]) ?? null
  );
  pushItem("Support", supportLink);
  pushItem("Plan", plan);
  pushItem("Seats", seats !== null ? String(seats) : null);

  return items;
}

function buildOverviewStatus(
  value: unknown,
  baseServer?: DashboardServer
): DashboardStatusItem[] {
  const items: DashboardStatusItem[] = [];
  const pushItem = (
    label: string,
    itemValue: string | null,
    note: string,
    tone: DashboardTone
  ) => {
    if (!itemValue) {
      return;
    }

    items.push({ label, value: itemValue, note, tone });
  };

  const overallStatus = pickString(value, [["latest_status", "status"], ["latestStatus", "status"]]);
  const capturedAt = formatTimestamp(
    pickPathValue(value, [["latest_status", "captured_at"], ["latestStatus", "captured_at"]])
  );
  const lastSyncAt = formatTimestamp(
    pickPathValue(value, [["latest_status", "last_sync_at"], ["latestStatus", "last_sync_at"]])
  );
  const botConnected = asBoolean(
    pickPathValue(value, [["latest_status", "bot_connected"], ["latestStatus", "bot_connected"], ["profile", "bot_sync_enabled"]])
  );
  const dashboardReachable = asBoolean(
    pickPathValue(value, [["latest_status", "dashboard_reachable"], ["latestStatus", "dashboard_reachable"], ["profile", "dashboard_enabled"]])
  );

  pushItem(
    "System health",
    overallStatus ? toTitleCase(overallStatus) : baseServer ? toTitleCase(baseServer.state) : null,
    capturedAt ? `Captured ${capturedAt}` : "",
    normalizeTone(overallStatus ?? baseServer?.state, baseServer?.state === "connected" ? "positive" : "muted")
  );
  pushItem(
    "Bot connection",
    botConnected === null ? null : botConnected ? "Connected" : "Disconnected",
    botConnected === null ? "" : botConnected ? "Live bot session is active." : "Bot sync is not active.",
    botConnected ? "positive" : "muted"
  );
  pushItem(
    "Dashboard reachability",
    dashboardReachable === null ? null : dashboardReachable ? "Reachable" : "Unavailable",
    dashboardReachable === null ? "" : dashboardReachable ? "Dashboard heartbeat succeeded." : "Dashboard is not reachable.",
    dashboardReachable ? "positive" : "warning"
  );
  pushItem(
    "Last sync",
    lastSyncAt,
    capturedAt ? `Captured ${capturedAt}` : "",
    lastSyncAt ? "info" : "muted"
  );

  return items;
}

function buildOverviewNotices(value: unknown): DashboardNotice[] {
  const notices: DashboardNotice[] = [];
  const note = pickString(value, [["profile", "notes"], ["notes"]]);

  if (note) {
    notices.push({
      title: "Server note",
      detail: note,
      time: ""
    });
  }

  const startsAt = formatTimestamp(
    pickPathValue(value, [["active_license", "starts_at"], ["activeLicense", "starts_at"]])
  );
  const endsAt = formatTimestamp(
    pickPathValue(value, [["active_license", "ends_at"], ["activeLicense", "ends_at"]])
  );
  const plan = buildPlanLabel(value);

  if (startsAt || endsAt || plan) {
    notices.push({
      title: "License window",
      detail: [plan || null, startsAt ? `Starts ${startsAt}` : null, endsAt ? `Ends ${endsAt}` : null]
        .filter((item): item is string => Boolean(item))
        .join(". "),
      time: endsAt ?? startsAt ?? ""
    });
  }

  return notices;
}

function normalizeServerState(value: unknown): DashboardServerState {
  const normalized = asString(value)?.toLowerCase();

  switch (normalized) {
    case "connected":
    case "active":
    case "enabled":
    case "healthy":
    case "ready":
      return "connected";
    case "invite":
    case "invited":
    case "pending":
      return "invite";
    case "test":
    case "testing":
    case "sandbox":
    case "staging":
      return "test";
    default:
      return "inactive";
  }
}

function resolveServerState(value: unknown): DashboardServerState {
  const explicitState = normalizeServerState(
    pickString(value, [
      ["state"],
      ["status"],
      ["connection_state"],
      ["connectionState"],
      ["latest_status", "status"],
      ["latestStatus", "status"]
    ])
  );
  const activeFlag = asBoolean(
    pickPathValue(value, [["is_active"], ["isActive"], ["server", "is_active"], ["server", "isActive"]])
  );

  if (activeFlag === true) {
    return explicitState === "test" || explicitState === "invite" ? explicitState : "connected";
  }

  if (explicitState !== "inactive") {
    return explicitState;
  }

  if (activeFlag === false) {
    return "inactive";
  }

  return explicitState;
}

function normalizeTone(
  value: unknown,
  fallback: DashboardTone = "muted"
): DashboardTone {
  const normalized = asString(value)?.toLowerCase();

  switch (normalized) {
    case "positive":
    case "success":
    case "healthy":
    case "enabled":
    case "included":
    case "connected":
    case "ready":
    case "reachable":
      return "positive";
    case "warning":
    case "warn":
    case "review":
    case "limited":
    case "degraded":
    case "deferred":
    case "unavailable":
      return "warning";
    case "info":
    case "preview":
    case "testing":
    case "test":
      return "info";
    case "muted":
    case "inactive":
    case "disabled":
    case "disconnected":
    case "not_included":
    case "not included":
      return "muted";
    default:
      return fallback;
  }
}

function normalizeModuleKey(value: unknown): DashboardModuleKey | null {
  const normalized = asString(value)?.toLowerCase();

  switch (normalized) {
    case "bank":
      return "bank";
    case "social":
      return "social";
    case "weather":
      return "weather";
    case "sessions":
    case "session":
      return "sessions";
    case "radio":
      return "radio";
    case "rentals":
    case "rental":
      return "rentals";
    case "branding":
    case "brand":
      return "branding";
    case "dashboard":
      return "dashboard";
    case "license":
    case "licenses":
      return "licenses";
    default:
      return null;
  }
}

function normalizeStatusGroupKey(value: unknown): DashboardStatusGroup["key"] {
  const normalized = asString(value)?.toLowerCase();

  switch (normalized) {
    case "core":
      return "core";
    case "dashboard":
      return "dashboard";
    case "modules":
    case "module":
      return "modules";
    default:
      return "integrations";
  }
}

function ensureServerMatch(
  value: unknown,
  expectedServerId: string,
  path: string
) {
  const responseServerId = pickString(value, [
    ["server", "id"],
    ["server_id"],
    ["serverId"],
    ["guild_id"],
    ["guildId"]
  ]);

  if (responseServerId && responseServerId !== expectedServerId) {
    throw new DashboardApiError(
      "contract",
      "Dashboard API returned data for a different server.",
      { path }
    );
  }
}

function getSectionPayload(
  value: unknown,
  section: DashboardServerRoutePage
): unknown {
  return (
    pickPathValue(value, [
      [section],
      ["data", section],
      ["payload", section],
      ["data"]
    ]) ?? value
  );
}

function mapIdentityFields(value: unknown): DashboardIdentityField[] {
  const record = asRecord(value);
  const items = pickRecordArray(value, [["items"], ["fields"], ["identity"]]);

  if (items.length > 0) {
    return items
      .map((item) => {
        const label =
          pickString(item, [["label"], ["name"], ["title"], ["key"]]) ?? "";
        const itemValue = pickString(item, [["value"], ["detail"], ["text"]]) ?? "";

        if (!label && !itemValue) {
          return null;
        }

        return {
          label: label || "Value",
          value: itemValue
        };
      })
      .filter((item): item is DashboardIdentityField => item !== null);
  }

  if (!record) {
    return [];
  }

  return Object.entries(record).flatMap(([label, itemValue]) => {
    const normalizedValue = asString(itemValue);
    return normalizedValue ? [{ label, value: normalizedValue }] : [];
  });
}

function mapStatusItems(value: unknown): DashboardStatusItem[] {
  return pickRecordArray(value, [["items"], ["status"], ["system_status"], ["systemStatus"]])
    .map((item) => {
      const label = pickString(item, [["label"], ["name"], ["title"]]) ?? "";
      const itemValue =
        pickString(item, [["value"], ["status"], ["state"], ["result"]]) ?? "";
      const note =
        pickString(item, [["note"], ["detail"], ["description"], ["message"]]) ?? "";

      if (!label && !itemValue && !note) {
        return null;
      }

      return {
        label: label || "Status",
        value: itemValue || note || "Unknown",
        note,
        tone: normalizeTone(
          pickString(item, [["tone"], ["status_tone"], ["statusTone"], ["state"]]) ??
            itemValue
        )
      };
    })
    .filter((item): item is DashboardStatusItem => item !== null);
}

function mapModuleRecord(item: DashboardRawRecord): DashboardModule | null {
  const rawKey =
    pickString(item, [["key"], ["module_key"], ["moduleKey"], ["slug"], ["name"], ["title"], ["module"]]);
  const key = normalizeModuleKey(rawKey);

  if (!key) {
    return null;
  }

  const metadata = moduleMetadata[key];
  const stateLabel =
    pickString(item, [["state_label"], ["stateLabel"], ["status"], ["state"]]) ??
    "Unknown";

  return {
    key,
    name: pickString(item, [["name"], ["title"], ["module"]]) ?? metadata.name,
    description:
      pickString(item, [["description"], ["summary"], ["detail"]]) ?? metadata.description,
    stateLabel: toTitleCase(stateLabel),
    tone: normalizeTone(
      pickString(item, [["tone"], ["status_tone"], ["statusTone"], ["state"]]) ??
        stateLabel
    ),
    actionLabel:
      pickString(item, [["action_label"], ["actionLabel"], ["action"]]) ??
      metadata.actionLabel
  };
}

function mapModules(value: unknown): DashboardModule[] {
  const items = pickRecordArray(value, [["items"], ["modules"], ["module_summary"], ["moduleSummary"]]);

  if (items.length > 0) {
    return items
      .map((item) => mapModuleRecord(item))
      .filter((item): item is DashboardModule => item !== null);
  }

  const summaryRecord =
    asRecord(pickPathValue(value, [["module_summary"], ["moduleSummary"]])) ?? asRecord(value);

  if (!summaryRecord) {
    return [];
  }

  return Object.entries(summaryRecord)
    .map(([key, state]) =>
      mapModuleRecord({
        module_key: key,
        state
      })
    )
    .filter((item): item is DashboardModule => item !== null);
}

function mapNotices(value: unknown): DashboardNotice[] {
  return pickRecordArray(value, [["items"], ["notices"], ["updates"], ["events"]])
    .map((item) => {
      const title = pickString(item, [["title"], ["label"], ["name"]]) ?? "";
      const detail =
        pickString(item, [["detail"], ["description"], ["message"], ["summary"]]) ?? "";
      const time =
        pickString(item, [["time"], ["timestamp"], ["updated_at"], ["updatedAt"]]) ?? "";

      if (!title && !detail && !time) {
        return null;
      }

      return {
        title: title || "Update",
        detail,
        time
      };
    })
    .filter((item): item is DashboardNotice => item !== null);
}

function mapSettings(value: unknown): DashboardSettingGroup[] {
  return pickRecordArray(value, [["items"], ["settings"], ["groups"]])
    .map((item) => {
      const label = pickString(item, [["label"], ["name"], ["title"], ["key"]]) ?? "";
      const settingValue =
        pickString(item, [["value"], ["detail"], ["text"], ["state"]]) ?? "";
      const note =
        pickString(item, [["note"], ["description"], ["summary"], ["message"]]) ?? "";

      if (!label && !settingValue && !note) {
        return null;
      }

      return {
        label: label || "Setting",
        value: settingValue,
        note
      };
    })
    .filter((item): item is DashboardSettingGroup => item !== null);
}

function mapBrandAssets(value: unknown): DashboardBrandAsset[] {
  return pickRecordArray(value, [["items"], ["assets"]])
    .map((item) => {
      const label = pickString(item, [["label"], ["name"], ["title"], ["key"]]) ?? "";
      const assetValue =
        pickString(item, [["value"], ["state"], ["status"], ["detail"]]) ?? "";
      const note =
        pickString(item, [["note"], ["description"], ["summary"], ["message"]]) ?? "";

      if (!label && !assetValue && !note) {
        return null;
      }

      return {
        label: label || "Asset",
        value: assetValue,
        note
      };
    })
    .filter((item): item is DashboardBrandAsset => item !== null);
}

function mapEntitlements(value: unknown): DashboardEntitlement[] {
  return pickRecordArray(value, [["items"], ["entitlements"]])
    .map((item) => {
      const label = pickString(item, [["label"], ["name"], ["title"]]) ?? "";
      const entitlementValue =
        pickString(item, [["value"], ["state"], ["status"]]) ?? "";

      if (!label && !entitlementValue) {
        return null;
      }

      return {
        label: label || "Entitlement",
        value: entitlementValue,
        tone: normalizeTone(
          pickString(item, [["tone"], ["status_tone"], ["statusTone"], ["state"]]) ??
            entitlementValue
        )
      };
    })
    .filter((item): item is DashboardEntitlement => item !== null);
}

function mapStatusGroups(value: unknown): DashboardStatusGroup[] {
  const groups = pickRecordArray(value, [["items"], ["groups"], ["status"]]);

  if (groups.length > 0) {
    return groups
      .map((group) => {
        const items = mapStatusItems(group);
        const title = pickString(group, [["title"], ["label"], ["name"]]) ?? "";

        if (!title && items.length === 0) {
          return null;
        }

        return {
          key: normalizeStatusGroupKey(
            pickString(group, [["key"], ["slug"], ["name"], ["title"]]) ?? title
          ),
          title: title || "Status",
          items
        };
      })
      .filter((group): group is DashboardStatusGroup => group !== null);
  }

  const items = mapStatusItems(value);

  return items.length > 0
    ? [
        {
          key: "dashboard",
          title: "Status",
          items
        }
      ]
    : [];
}

function mapDashboardServerSummary(
  value: unknown,
  options?: { expectedServerId?: string; path?: string }
): DashboardServer {
  const payload = asRecord(value);

  if (!payload) {
    throw new DashboardApiError(
      "contract",
      "Dashboard API returned an invalid server payload.",
      { path: options?.path }
    );
  }

  const id =
    pickString(payload, [["server", "id"], ["id"], ["server_id"], ["serverId"]]) ??
    options?.expectedServerId;

  if (!id) {
    throw new DashboardApiError(
      "contract",
      "Dashboard API server payload is missing an id.",
      { path: options?.path }
    );
  }

  const name =
    pickString(payload, [["branding", "display_name"], ["server", "name"], ["name"], ["title"]]) ??
    id;
  const modules = mapModules(payload);
  const memberCount = pickNumber(payload, [
    ["member_count"],
    ["memberCount"],
    ["members"],
    ["users"]
  ]);
  const plan =
    buildPlanLabel(payload) ||
    pickString(payload, [["plan"], ["plan_name"], ["planName"], ["tier"]]) ||
    "";
  const seats = pickNumber(payload, [["active_license", "seats"], ["activeLicense", "seats"]]);
  const description = buildServerDescription(payload, modules);
  const overviewIdentity = buildOverviewIdentity(payload);
  const overviewStatus = buildOverviewStatus(payload);
  const overviewNotices = buildOverviewNotices(payload);

  return {
    id,
    name,
    iconLabel:
      pickString(payload, [["icon_label"], ["iconLabel"], ["server", "icon_label"], ["icon"], ["short_name"]]) ??
      toInitials(name),
    iconUrl:
      pickString(payload, [["icon_url"], ["server", "icon_url"], ["branding", "logo_url"]]) ??
      undefined,
    accent:
      pickString(payload, [["branding", "accent_color"], ["accent"], ["accent_color"], ["accentColor"], ["color"]]) ??
      "#c4c9d4",
    state: resolveServerState(payload),
    description,
    environment:
      formatLocaleLabel(
        pickPathValue(payload, [
          ["profile", "preferred_locale"],
          ["preferred_locale"],
          ["localization", "default_locale"],
          ["localization", "fallback_locale"]
        ])
      ) ??
      pickString(payload, [["environment"], ["environment_name"], ["environmentName"]]) ??
      "",
    region:
      formatRegionLabel(
        pickPathValue(payload, [
          ["profile", "preferred_locale"],
          ["preferred_locale"],
          ["localization", "default_locale"]
        ])
      ) ??
      pickString(payload, [["profile", "timezone"], ["region"], ["location"]]) ??
      "",
    members:
      formatModuleCount(modules) ||
      (memberCount !== null ? `${memberCount} members` : ""),
    plan,
    syncNote: buildSyncNote(payload),
    overview: {
      identity: overviewIdentity,
      systemStatus: overviewStatus,
      moduleSummary: modules,
      notices: overviewNotices
    },
    settings: [],
    modules,
    branding: {
      assets: [],
      fields: [],
      note: pickString(payload, [["profile", "notes"], ["branding", "support_invite_url"]]) ?? ""
    },
    licenses: {
      currentPlan: plan,
      availableLevel: seats !== null ? `${seats} seats` : "",
      entitlementSummary:
        [plan || null, seats !== null ? `${seats} seats` : null]
          .filter((item): item is string => Boolean(item))
          .join(" · "),
      entitlements: []
    },
    status: []
  };
}

function mergeDashboardServerSummary(
  primary: DashboardServer,
  secondary: DashboardServer | null
): DashboardServer {
  if (!secondary) {
    return primary;
  }

  return {
    ...primary,
    name: primary.name || secondary.name,
    iconLabel: primary.iconLabel || secondary.iconLabel,
    iconUrl: primary.iconUrl || secondary.iconUrl,
    accent: primary.accent || secondary.accent,
    state: primary.state !== "inactive" ? primary.state : secondary.state,
    description: primary.description || secondary.description,
    environment: primary.environment || secondary.environment,
    region: primary.region || secondary.region,
    members: primary.members || secondary.members,
    plan: primary.plan || secondary.plan,
    syncNote: primary.syncNote || secondary.syncNote,
    overview: {
      identity:
        primary.overview.identity.length > 0
          ? primary.overview.identity
          : secondary.overview.identity,
      systemStatus:
        primary.overview.systemStatus.length > 0
          ? primary.overview.systemStatus
          : secondary.overview.systemStatus,
      moduleSummary:
        primary.overview.moduleSummary.length > 0
          ? primary.overview.moduleSummary
          : secondary.overview.moduleSummary,
      notices:
        primary.overview.notices.length > 0
          ? primary.overview.notices
          : secondary.overview.notices
    },
    modules: primary.modules.length > 0 ? primary.modules : secondary.modules,
    branding: {
      assets: primary.branding.assets.length > 0 ? primary.branding.assets : secondary.branding.assets,
      fields: primary.branding.fields.length > 0 ? primary.branding.fields : secondary.branding.fields,
      note: primary.branding.note || secondary.branding.note
    },
    licenses: {
      currentPlan: primary.licenses.currentPlan || secondary.licenses.currentPlan,
      availableLevel: primary.licenses.availableLevel || secondary.licenses.availableLevel,
      entitlementSummary:
        primary.licenses.entitlementSummary || secondary.licenses.entitlementSummary,
      entitlements:
        primary.licenses.entitlements.length > 0
          ? primary.licenses.entitlements
          : secondary.licenses.entitlements
    },
    status: primary.status.length > 0 ? primary.status : secondary.status
  };
}

function mapOverview(
  baseServer: DashboardServer,
  value: unknown
): DashboardServer["overview"] {
  const payload = getSectionPayload(value, "overview");
  const identity = mapIdentityFields(
    pickPathValue(payload, [["identity"], ["fields"], ["items"]])
  );
  const systemStatus = mapStatusItems(
    pickPathValue(payload, [["system_status"], ["systemStatus"], ["status"]])
  );
  const moduleSummary = mapModules(
    pickPathValue(payload, [["module_summary"], ["moduleSummary"], ["modules"], ["items"]]) ??
      payload
  );
  const notices = mapNotices(pickPathValue(payload, [["notices"], ["updates"], ["items"]]));
  const derivedIdentity = buildOverviewIdentity(payload, baseServer);
  const derivedSystemStatus = buildOverviewStatus(payload, baseServer);
  const derivedNotices = buildOverviewNotices(payload);

  return {
    identity:
      identity.length > 0
        ? identity
        : derivedIdentity.length > 0
          ? derivedIdentity
          : baseServer.overview.identity,
    systemStatus:
      systemStatus.length > 0
        ? systemStatus
        : derivedSystemStatus.length > 0
          ? derivedSystemStatus
          : baseServer.overview.systemStatus,
    moduleSummary:
      moduleSummary.length > 0
        ? moduleSummary
        : baseServer.modules.length > 0
          ? baseServer.modules
          : baseServer.overview.moduleSummary,
    notices:
      notices.length > 0
        ? notices
        : derivedNotices.length > 0
          ? derivedNotices
          : baseServer.overview.notices
  };
}

function mapBranding(value: unknown): DashboardServer["branding"] {
  const payload = getSectionPayload(value, "branding");

  return {
    assets: mapBrandAssets(pickPathValue(payload, [["assets"], ["items"]])),
    fields: mapIdentityFields(pickPathValue(payload, [["fields"], ["identity"]])),
    note: pickString(payload, [["note"], ["summary"], ["description"]]) ?? ""
  };
}

function mapLicenses(value: unknown): DashboardServer["licenses"] {
  const payload =
    pickRecord(value, [["licenses"], ["license"], ["data", "licenses"], ["data"]]) ?? value;
  const plan = buildPlanLabel(payload);
  const seats = pickNumber(payload, [["active_license", "seats"], ["activeLicense", "seats"]]);

  return {
    currentPlan:
      pickString(payload, [["current_plan"], ["currentPlan"], ["plan"]]) ?? plan,
    availableLevel:
      pickString(payload, [["available_level"], ["availableLevel"], ["level"]]) ??
      (seats !== null ? `${seats} seats` : ""),
    entitlementSummary:
      pickString(payload, [["entitlement_summary"], ["entitlementSummary"], ["summary"]]) ??
      [plan || null, seats !== null ? `${seats} seats` : null]
        .filter((item): item is string => Boolean(item))
        .join(" · "),
    entitlements: mapEntitlements(
      pickPathValue(payload, [["entitlements"], ["items"]])
    )
  };
}

function mapServerPagePayload(
  page: DashboardServerRoutePage,
  baseServer: DashboardServer,
  value: unknown
): DashboardServer {
  const sectionServerPayload =
    pickPathValue(value, [["server"], ["data", "server"]]) ?? undefined;
  const mergedServer = mergeDashboardServerSummary(
    baseServer,
    sectionServerPayload
      ? mapDashboardServerSummary(sectionServerPayload, { expectedServerId: baseServer.id })
      : null
  );

  switch (page) {
    case "overview":
      return {
        ...mergedServer,
        overview: mapOverview(mergedServer, value)
      };
    case "settings":
      return {
        ...mergedServer,
        settings: mapSettings(
          pickPathValue(getSectionPayload(value, "settings"), [["items"], ["settings"], ["groups"]])
        )
      };
    case "modules": {
      const modules = mapModules(getSectionPayload(value, "modules"));

      return {
        ...mergedServer,
        modules,
        overview: {
          ...mergedServer.overview,
          moduleSummary: modules.length > 0 ? modules : mergedServer.overview.moduleSummary
        }
      };
    }
    case "branding":
      return {
        ...mergedServer,
        branding: mapBranding(value)
      };
    case "licenses":
      return {
        ...mergedServer,
        licenses: mapLicenses(value)
      };
    case "status":
      return {
        ...mergedServer,
        status: mapStatusGroups(getSectionPayload(value, "status"))
      };
    default:
      return mergedServer;
  }
}

function mapDashboardServerList(value: unknown, path: string): DashboardServer[] {
  const itemsSource =
    asArray(value) ??
    pickPathValue(value, [["items"], ["servers"], ["data", "items"], ["data", "servers"]]);
  const items = asRecordArray(itemsSource);

  if (!itemsSource || !Array.isArray(itemsSource)) {
    throw new DashboardApiError(
      "contract",
      "Dashboard API servers payload is missing an items array.",
      { path }
    );
  }

  return items.map((item) => mapDashboardServerSummary(item, { path }));
}

export function shouldUseDashboardFallback(error: DashboardApiError | null): boolean {
  if (!error) {
    return false;
  }

  if (error.kind === "config" || error.kind === "network") {
    return true;
  }

  if (error.kind === "http") {
    return (error.status ?? 0) >= 500;
  }

  return false;
}

export async function fetchDashboardServers(signal?: AbortSignal) {
  const response = await fetchDashboardJson<unknown>("servers", signal);
  return mapDashboardServerList(response.data, response.path);
}

export async function fetchDashboardServerPage(
  serverId: string,
  page: DashboardServerRoutePage,
  signal?: AbortSignal
) {
  const encodedServerId = encodeURIComponent(serverId);
  const [serverResponse, pageResponse] = await Promise.all([
    fetchDashboardJson<unknown>(`servers/${encodedServerId}`, signal),
    fetchDashboardJson<unknown>(`servers/${encodedServerId}/${page}`, signal)
  ]);

  ensureServerMatch(pageResponse.data, serverId, pageResponse.path);

  const baseServer = mapDashboardServerSummary(serverResponse.data, {
    expectedServerId: serverId,
    path: serverResponse.path
  });

  return mapServerPagePayload(page, baseServer, pageResponse.data);
}
