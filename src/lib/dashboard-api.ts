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
      return "positive";
    case "warning":
    case "warn":
    case "review":
    case "limited":
    case "degraded":
    case "deferred":
      return "warning";
    case "info":
    case "preview":
    case "testing":
    case "test":
      return "info";
    case "muted":
    case "inactive":
    case "disabled":
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

function mapModules(value: unknown): DashboardModule[] {
  return pickRecordArray(value, [["items"], ["modules"], ["module_summary"], ["moduleSummary"]])
    .map((item) => {
      const name = pickString(item, [["name"], ["title"], ["module"]]);
      const key =
        normalizeModuleKey(
          pickString(item, [["key"], ["module_key"], ["moduleKey"], ["slug"]]) ?? name
        );

      if (!key) {
        return null;
      }

      const stateLabel =
        pickString(item, [["state_label"], ["stateLabel"], ["status"], ["state"]]) ??
        "Unknown";

      return {
        key,
        name: name ?? key[0].toUpperCase() + key.slice(1),
        description:
          pickString(item, [["description"], ["summary"], ["detail"]]) ?? "",
        stateLabel,
        tone: normalizeTone(
          pickString(item, [["tone"], ["status_tone"], ["statusTone"], ["state"]]) ??
            stateLabel
        ),
        actionLabel:
          pickString(item, [["action_label"], ["actionLabel"], ["action"]]) ?? ""
      };
    })
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
  const record =
    pickRecord(value, [["server"], ["data", "server"], ["data"]]) ?? asRecord(value);

  if (!record) {
    throw new DashboardApiError(
      "contract",
      "Dashboard API returned an invalid server payload.",
      { path: options?.path }
    );
  }

  const id =
    pickString(record, [["id"], ["server_id"], ["serverId"], ["guild_id"], ["guildId"]]) ??
    options?.expectedServerId;

  if (!id) {
    throw new DashboardApiError(
      "contract",
      "Dashboard API server payload is missing an id.",
      { path: options?.path }
    );
  }

  const name =
    pickString(record, [["name"], ["title"], ["display_name"], ["displayName"]]) ?? id;
  const memberCount = pickNumber(record, [
    ["member_count"],
    ["memberCount"],
    ["members"],
    ["users"]
  ]);
  const syncNote =
    pickString(record, [["sync_note"], ["syncNote"], ["updated_at"], ["updatedAt"]]) ?? "";

  return {
    id,
    name,
    iconLabel:
      pickString(record, [["icon_label"], ["iconLabel"], ["icon"], ["short_name"]]) ??
      toInitials(name),
    accent:
      pickString(record, [["accent"], ["accent_color"], ["accentColor"], ["color"]]) ??
      "#c4c9d4",
    state: normalizeServerState(
      pickString(record, [["state"], ["status"], ["connection_state"], ["connectionState"]])
    ),
    description:
      pickString(record, [["description"], ["summary"], ["detail"], ["note"]]) ?? "",
    environment:
      pickString(record, [["environment"], ["environment_name"], ["environmentName"]]) ??
      "",
    region: pickString(record, [["region"], ["location"]]) ?? "",
    members: memberCount !== null ? String(memberCount) : "",
    plan: pickString(record, [["plan"], ["plan_name"], ["planName"], ["tier"]]) ?? "",
    syncNote,
    overview: {
      identity: [],
      systemStatus: [],
      moduleSummary: [],
      notices: []
    },
    settings: [],
    modules: [],
    branding: {
      assets: [],
      fields: [],
      note: ""
    },
    licenses: {
      currentPlan: "",
      availableLevel: "",
      entitlementSummary: "",
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
    accent: primary.accent || secondary.accent,
    state: primary.state !== "inactive" ? primary.state : secondary.state,
    description: primary.description || secondary.description,
    environment: primary.environment || secondary.environment,
    region: primary.region || secondary.region,
    members: primary.members || secondary.members,
    plan: primary.plan || secondary.plan,
    syncNote: primary.syncNote || secondary.syncNote
  };
}

function mapOverview(
  baseServer: DashboardServer,
  value: unknown
): DashboardServer["overview"] {
  const payload = getSectionPayload(value, "overview");
  const moduleSummary = mapModules(
    pickPathValue(payload, [
      ["module_summary"],
      ["moduleSummary"],
      ["modules"],
      ["items"]
    ])
  );

  return {
    identity: mapIdentityFields(
      pickPathValue(payload, [["identity"], ["fields"], ["items"]])
    ),
    systemStatus: mapStatusItems(
      pickPathValue(payload, [["system_status"], ["systemStatus"], ["status"]])
    ),
    moduleSummary: moduleSummary.length > 0 ? moduleSummary : baseServer.modules,
    notices: mapNotices(pickPathValue(payload, [["notices"], ["updates"], ["items"]]))
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

  return {
    currentPlan:
      pickString(payload, [["current_plan"], ["currentPlan"], ["plan"]]) ?? "",
    availableLevel:
      pickString(payload, [["available_level"], ["availableLevel"], ["level"]]) ?? "",
    entitlementSummary:
      pickString(payload, [["entitlement_summary"], ["entitlementSummary"], ["summary"]]) ??
      "",
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
