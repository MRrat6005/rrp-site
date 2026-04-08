import type {
  DashboardAccessLevel,
  DashboardAccessSettings,
  DashboardBrandingModule,
  DashboardGeneralSettings,
  DashboardIdentityField,
  DashboardLocalizationSettings,
  DashboardModule,
  DashboardModuleKey,
  DashboardNotice,
  DashboardServer,
  DashboardServerState,
  DashboardSettingGroup,
  DashboardStatusGroup,
  DashboardStatusItem,
  DashboardTone
} from "@/lib/dashboard-model";

export type DashboardServerRoutePage =
  | "overview"
  | "general"
  | "access"
  | "localization"
  | "branding"
  | "license"
  | "status";

type DashboardApiSectionPage = "overview" | "settings" | "modules" | "licenses" | "status";
export type DashboardApiErrorKind = "config" | "network" | "http" | "parse" | "contract";
type DashboardRawRecord = Record<string, unknown>;
interface DashboardApiResponse<T> { data: T; path: string; }
type DashboardSettingsData = NonNullable<DashboardServer["settingsData"]>;

declare global {
  interface Window { __RRP_RUNTIME_CONFIG__?: { dashboardApiBaseUrl?: string }; }
}

export class DashboardApiError extends Error {
  kind: DashboardApiErrorKind;
  path?: string;
  status?: number;
  constructor(kind: DashboardApiErrorKind, message: string, options?: { path?: string; status?: number }) {
    super(message);
    this.name = "DashboardApiError";
    this.kind = kind;
    this.path = options?.path;
    this.status = options?.status;
  }
}

function normalizeBaseUrl(value?: string | null): string | null {
  const normalized = value?.trim();
  return normalized ? normalized.replace(/\/+$/, "") : null;
}

function isLocalDashboardHostname(hostname?: string | null): boolean {
  const normalized = hostname?.trim().toLowerCase();
  return Boolean(normalized && ["localhost", "127.0.0.1", "0.0.0.0", "::1"].includes(normalized));
}

export function getDashboardApiBaseUrl(): string | null {
  const envBaseUrl = normalizeBaseUrl(process.env.NEXT_PUBLIC_DASHBOARD_API_BASE_URL ?? null);
  if (typeof window !== "undefined") {
    if (envBaseUrl && isLocalDashboardHostname(window.location.hostname)) return envBaseUrl;
    const runtimeBaseUrl = normalizeBaseUrl(window.__RRP_RUNTIME_CONFIG__?.dashboardApiBaseUrl);
    if (runtimeBaseUrl) return runtimeBaseUrl;
  }
  return envBaseUrl;
}

function buildDashboardApiUrl(baseUrl: string, path: string): string {
  const url = new URL(baseUrl);
  const baseSegments = url.pathname.split("/").filter(Boolean);
  const normalizedPath = path.split("/").filter(Boolean);
  const endsWithApiV1 = baseSegments.at(-2)?.toLowerCase() === "api" && baseSegments.at(-1)?.toLowerCase() === "v1";
  const endsWithApi = baseSegments.at(-1)?.toLowerCase() === "api";
  const routeSegments = endsWithApiV1 ? normalizedPath : endsWithApi ? ["v1", ...normalizedPath] : ["api", "v1", ...normalizedPath];
  url.pathname = `/${[...baseSegments, ...routeSegments].join("/")}`;
  return url.toString();
}

async function fetchDashboardJson<T>(path: string, signal?: AbortSignal): Promise<DashboardApiResponse<T>> {
  const baseUrl = getDashboardApiBaseUrl();
  if (!baseUrl) throw new DashboardApiError("config", "Dashboard API base URL is not configured.", { path });
  let response: Response;
  try {
    response = await fetch(buildDashboardApiUrl(baseUrl, path), {
      method: "GET",
      headers: { Accept: "application/json" },
      credentials: "include",
      cache: "no-store",
      signal
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw new DashboardApiError("network", "Dashboard API is unreachable.", { path });
  }
  if (!response.ok) throw new DashboardApiError("http", "Dashboard API request failed.", { path, status: response.status });
  try {
    return { data: (await response.json()) as T, path };
  } catch {
    throw new DashboardApiError("parse", "Dashboard API returned invalid JSON.", { path });
  }
}

function asArray(value: unknown): unknown[] | null { return Array.isArray(value) ? value : null; }
function asRecord(value: unknown): DashboardRawRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as DashboardRawRecord) : null;
}
function asRecordArray(value: unknown): DashboardRawRecord[] {
  return (asArray(value) ?? []).map((item) => asRecord(item)).filter((item): item is DashboardRawRecord => item !== null);
}
function getPathValue(value: unknown, path: readonly string[]): unknown {
  let current: unknown = value;
  for (const segment of path) {
    const record = asRecord(current);
    if (!record || !(segment in record)) return undefined;
    current = record[segment];
  }
  return current;
}
function pickPathValue(value: unknown, paths: readonly (readonly string[])[]): unknown {
  for (const path of paths) {
    const resolved = getPathValue(value, path);
    if (resolved !== undefined) return resolved;
  }
  return undefined;
}
function asString(value: unknown): string | null {
  if (typeof value === "string") {
    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }
  return typeof value === "number" || typeof value === "boolean" ? String(value) : null;
}
function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const normalized = Number(value);
    return Number.isFinite(normalized) ? normalized : null;
  }
  return null;
}
function asBoolean(value: unknown): boolean | null {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  const normalized = asString(value)?.toLowerCase();
  if (!normalized) return null;
  if (["true", "1", "yes", "active", "enabled", "connected", "healthy", "ready"].includes(normalized)) return true;
  if (["false", "0", "no", "inactive", "disabled", "disconnected", "locked", "denied"].includes(normalized)) return false;
  return null;
}
function pickString(value: unknown, paths: readonly (readonly string[])[]): string | null { return asString(pickPathValue(value, paths)); }
function pickNumber(value: unknown, paths: readonly (readonly string[])[]): number | null { return asNumber(pickPathValue(value, paths)); }
function pickRecordArray(value: unknown, paths: readonly (readonly string[])[]): DashboardRawRecord[] {
  for (const path of paths) {
    const candidate = getPathValue(value, path);
    const items = asRecordArray(candidate);
    if (items.length > 0 || Array.isArray(candidate)) return items;
  }
  return [];
}
function toTitleCase(value: string): string {
  return value.replace(/[_-]+/g, " ").split(/\s+/).filter(Boolean).map((item) => item[0]?.toUpperCase() + item.slice(1).toLowerCase()).join(" ");
}
function normalizeTone(value: unknown, fallback: DashboardTone = "muted"): DashboardTone {
  const normalized = asString(value)?.toLowerCase();
  if (!normalized) return fallback;
  if (["healthy", "ready", "active", "enabled", "connected", "ok"].includes(normalized)) return "positive";
  if (["warning", "attention", "pending", "review", "degraded"].includes(normalized)) return "warning";
  if (["info", "setup", "trial", "detected", "visible"].includes(normalized)) return "info";
  if (["muted", "inactive", "locked", "hidden", "disabled", "archived"].includes(normalized)) return "muted";
  return fallback;
}
function formatTimestamp(value: unknown): string | null {
  const normalized = asString(value);
  if (!normalized) return null;
  const parsed = new Date(normalized);
  if (Number.isNaN(parsed.getTime())) return normalized;
  const pad = (part: number) => String(part).padStart(2, "0");
  return `${parsed.getUTCFullYear()}-${pad(parsed.getUTCMonth() + 1)}-${pad(parsed.getUTCDate())} ${pad(parsed.getUTCHours())}:${pad(parsed.getUTCMinutes())} UTC`;
}
function formatLocaleLabel(value: unknown): string | null {
  const normalized = asString(value)?.replace(/_/g, "-");
  if (!normalized) return null;
  const [language, region] = normalized.split("-");
  try {
    const languageName = new Intl.DisplayNames(["en"], { type: "language" }).of(language.toLowerCase());
    const regionName = region ? new Intl.DisplayNames(["en"], { type: "region" }).of(region.toUpperCase()) : null;
    if (languageName && regionName) return `${languageName} (${regionName})`;
    if (languageName) return languageName;
  } catch {
    return normalized;
  }
  return normalized;
}
function buildSyncNote(value: unknown): string {
  return formatTimestamp(pickPathValue(value, [["latest_status", "captured_at"], ["latestStatus", "captured_at"], ["captured_at"], ["capturedAt"]])) ?? formatTimestamp(pickPathValue(value, [["latest_status", "last_sync_at"], ["latestStatus", "last_sync_at"], ["last_sync_at"], ["lastSyncAt"]])) ?? pickString(value, [["sync_note"], ["syncNote"], ["updated_at"], ["updatedAt"]]) ?? "";
}
function normalizeServerState(value: unknown): DashboardServerState {
  const normalized = asString(value)?.toLowerCase();
  switch (normalized) {
    case "connected": case "active": case "enabled": case "healthy": case "ready": return "connected";
    case "invite": case "invited": case "pending": case "setup": return "invite";
    case "test": case "testing": case "sandbox": case "staging": return "test";
    default: return "inactive";
  }
}
function resolveServerState(value: unknown): DashboardServerState {
  return normalizeServerState(pickString(value, [["state"], ["status"], ["connection_state"], ["connectionState"], ["latest_status", "status"], ["latestStatus", "status"]]));
}
function normalizeAccess(value: unknown): DashboardAccessLevel | null {
  const normalized = asString(value)?.toLowerCase().replace(/[\s-]+/g, "_");
  switch (normalized) {
    case "owner": case "server_owner": case "guild_owner": return "owner";
    case "admin": case "administrator": case "staff": case "moderator": case "editor": return "admin";
    case "none": case "read_only": case "locked": case "denied": case "forbidden": case "viewer": return "none";
    default: return null;
  }
}
function resolveAccessLevel(value: unknown): DashboardAccessLevel {
  const explicit = normalizeAccess(pickString(value, [["permissions", "access_level"], ["permissions", "accessLevel"], ["access_level"], ["accessLevel"], ["access"], ["role"]]));
  if (explicit) return explicit;
  if (asBoolean(pickPathValue(value, [["permissions", "is_owner"], ["is_owner"], ["isOwner"]])) === true) return "owner";
  if (asBoolean(pickPathValue(value, [["permissions", "is_admin"], ["is_admin"], ["isAdmin"]])) === true || asBoolean(pickPathValue(value, [["permissions", "allow_dashboard_write"], ["allow_dashboard_write"]])) === true || asBoolean(pickPathValue(value, [["permissions", "allow_bot_write"], ["allow_bot_write"]])) === true) return "admin";
  return "none";
}
function normalizeModuleKey(value: unknown): DashboardModuleKey | null {
  const normalized = asString(value)?.toLowerCase().replace(/[\s-]+/g, "_");
  switch (normalized) {
    case "bank": case "social": case "weather": case "sessions": case "radio": case "rentals": case "branding": case "dashboard": case "licenses": return normalized;
    default: return null;
  }
}
const moduleMetadata: Record<DashboardModuleKey, { name: string; description: string }> = {
  bank: { name: "Bank", description: "Economy and balance surfaces." },
  social: { name: "Social", description: "Profiles and social-facing surfaces." },
  weather: { name: "Weather", description: "Forecast and environment surfaces." },
  sessions: { name: "Sessions", description: "Session cadence and event structure." },
  radio: { name: "Radio", description: "Channels and operator-facing radio flows." },
  rentals: { name: "Rentals", description: "Property and rentals surfaces." },
  branding: { name: "Branding", description: "Module-facing branding surface." },
  dashboard: { name: "Dashboard", description: "Shell, access, and workspace routing." },
  licenses: { name: "Licenses", description: "License visibility and entitlements." }
};
function mapModuleRecord(item: DashboardRawRecord): DashboardModule | null {
  const key = normalizeModuleKey(pickString(item, [["key"], ["module_key"], ["moduleKey"], ["slug"], ["name"], ["module"]]));
  if (!key) return null;
  const stateLabel = pickString(item, [["state"], ["status"], ["value"], ["state_label"], ["stateLabel"]]) ?? "Detected";
  return { key, name: moduleMetadata[key].name, description: pickString(item, [["description"], ["summary"], ["detail"]]) ?? moduleMetadata[key].description, stateLabel: toTitleCase(stateLabel), tone: normalizeTone(pickString(item, [["tone"], ["status_tone"], ["statusTone"], ["state"]]) ?? stateLabel, "info"), actionLabel: "Module scaffold" };
}
function mapModules(value: unknown): DashboardModule[] {
  const items = pickRecordArray(value, [["items"], ["modules"], ["module_summary"], ["moduleSummary"]]);
  if (items.length > 0) return items.map((item) => mapModuleRecord(item)).filter((item): item is DashboardModule => item !== null);
  const record = asRecord(pickPathValue(value, [["module_summary"], ["moduleSummary"]])) ?? asRecord(value);
  if (!record) return [];
  return Object.entries(record).map(([key, state]) => mapModuleRecord({ module_key: key, state })).filter((item): item is DashboardModule => item !== null);
}
function mapBrandingModules(value: unknown, fallbackModules: DashboardModule[]): DashboardBrandingModule[] {
  const modules = mapModules(value);
  const source = modules.length > 0 ? modules : fallbackModules;
  return source.map((module) => ({
    key: module.key,
    name: module.name,
    description: module.description,
    stateLabel: module.stateLabel,
    tone: module.tone,
    availability: module.tone === "positive" ? "Available later" : module.tone === "warning" ? "Coming soon" : "Not connected yet",
    note: module.tone === "positive" ? "Module is present on the server, but its branding editor is not connected yet." : module.tone === "warning" ? "Module remains visible as a future branding category." : "Module branding is kept as a scaffold until module editors are connected."
  }));
}
function asStringArray(value: unknown): string[] {
  return (asArray(value) ?? []).map((item) => asString(item)).filter((item): item is string => Boolean(item));
}

function normalizeLocaleCode(value: unknown): string | null {
  return asString(value)?.replace(/_/g, "-") ?? null;
}

function normalizeLocaleCodes(value: unknown): string[] {
  return (asArray(value) ?? []).map((item) => normalizeLocaleCode(item)).filter((item): item is string => Boolean(item));
}

function normalizeSettingsPolicy(value: unknown): string | null {
  return asString(value)?.toLowerCase().replace(/[\s-]+/g, "_") ?? null;
}

function formatOptionalValue(value: string | number | null | undefined, emptyValue = "Not set"): string {
  if (value === null || value === undefined) return emptyValue;
  const normalized = `${value}`.trim();
  return normalized.length > 0 ? normalized : emptyValue;
}

function formatBooleanValue(value: boolean | null, trueLabel = "Enabled", falseLabel = "Disabled", emptyValue = "Not provided"): string {
  if (value === true) return trueLabel;
  if (value === false) return falseLabel;
  return emptyValue;
}

function formatPolicyValue(value: string | null): string {
  switch (normalizeSettingsPolicy(value)) {
    case "read_write": return "Read & write";
    case "read_only": return "Read only";
    case "none": return "No access";
    default: return value ? toTitleCase(value) : "Not provided";
  }
}

function formatListValue(values: string[], emptyValue = "None"): string {
  return values.length > 0 ? values.join(", ") : emptyValue;
}

function formatLocaleValue(value: string | null, emptyValue = "Not set"): string {
  return value ?? emptyValue;
}

function formatLocaleNote(value: string | null, fallback: string): string {
  if (!value) return fallback;
  const label = formatLocaleLabel(value);
  return label && label !== value ? `Resolved label: ${label}.` : fallback;
}

function buildGeneralSettingsSection(value: unknown): DashboardGeneralSettings | null {
  const section = asRecord(value);
  if (!section) return null;
  const general: DashboardGeneralSettings = {
    id: pickString(section, [["id"]]) ?? "",
    guildId: pickString(section, [["guild_id"], ["guildId"]]) ?? "",
    slug: pickString(section, [["slug"]]) ?? "",
    name: pickString(section, [["name"]]) ?? "",
    iconUrl: pickString(section, [["icon_url"], ["iconUrl"]]),
    isActive: asBoolean(pickPathValue(section, [["is_active"], ["isActive"]])),
    contactEmail: pickString(section, [["contact_email"], ["contactEmail"]]),
    supportUrl: pickString(section, [["support_url"], ["supportUrl"]]),
    dashboardEnabled: asBoolean(pickPathValue(section, [["dashboard_enabled"], ["dashboardEnabled"]])),
    botSyncEnabled: asBoolean(pickPathValue(section, [["bot_sync_enabled"], ["botSyncEnabled"]])),
    notes: pickString(section, [["notes"]])
  };
  return Object.values(general).some((item) => item !== null && item !== "") ? general : null;
}

function buildAccessSettingsSection(value: unknown): DashboardAccessSettings | null {
  const section = asRecord(value);
  if (!section) return null;
  const access: DashboardAccessSettings = {
    ownerAccess: pickString(section, [["owner_access"], ["ownerAccess"]]),
    adminAccess: pickString(section, [["admin_access"], ["adminAccess"]]),
    ownerCount: pickNumber(section, [["owner_count"], ["ownerCount"]]),
    adminCount: pickNumber(section, [["admin_count"], ["adminCount"]]),
    dashboardAdminRoles: asStringArray(pickPathValue(section, [["dashboard_admin_roles"], ["dashboardAdminRoles"]])),
    botManagerRoles: asStringArray(pickPathValue(section, [["bot_manager_roles"], ["botManagerRoles"]])),
    allowDashboardWrite: asBoolean(pickPathValue(section, [["allow_dashboard_write"], ["allowDashboardWrite"]])),
    allowBotWrite: asBoolean(pickPathValue(section, [["allow_bot_write"], ["allowBotWrite"]])),
    policyVersion: pickNumber(section, [["policy_version"], ["policyVersion"]])
  };
  return Object.values(access).some((item) => Array.isArray(item) ? item.length > 0 : item !== null && item !== "") ? access : null;
}

function buildLocalizationSettingsSection(value: unknown): DashboardLocalizationSettings | null {
  const section = asRecord(value);
  if (!section) return null;
  const localization: DashboardLocalizationSettings = {
    timezone: pickString(section, [["timezone"]]),
    preferredLocale: normalizeLocaleCode(pickPathValue(section, [["preferred_locale"], ["preferredLocale"]])),
    defaultLocale: normalizeLocaleCode(pickPathValue(section, [["default_locale"], ["defaultLocale"]])),
    fallbackLocale: normalizeLocaleCode(pickPathValue(section, [["fallback_locale"], ["fallbackLocale"]])),
    supportedLocales: normalizeLocaleCodes(pickPathValue(section, [["supported_locales"], ["supportedLocales"]])),
    translationsVersion: pickString(section, [["translations_version"], ["translationsVersion"]])
  };
  return Object.values(localization).some((item) => Array.isArray(item) ? item.length > 0 : item !== null && item !== "") ? localization : null;
}

function buildSettingsData(value: unknown): DashboardSettingsData {
  const payload = asRecord(value);
  return {
    general: buildGeneralSettingsSection(payload?.general),
    access: buildAccessSettingsSection(payload?.access),
    localization: buildLocalizationSettingsSection(payload?.localization)
  };
}

function getSettingsEnvironment(localization: DashboardLocalizationSettings | null): string {
  const locale = localization?.preferredLocale ?? localization?.defaultLocale ?? localization?.fallbackLocale;
  return locale ? formatLocaleLabel(locale) ?? locale : "";
}

function applySettingsData(server: DashboardServer, settingsData: DashboardSettingsData): DashboardServer {
  const general = buildGeneralSettings(settingsData.general);
  const access = buildAccessSettings(settingsData.access);
  const localization = buildLocalizationSettings(settingsData.localization);
  return {
    ...server,
    name: settingsData.general?.name || server.name,
    iconUrl: settingsData.general?.iconUrl ?? server.iconUrl,
    description: settingsData.general?.notes ?? server.description,
    environment: getSettingsEnvironment(settingsData.localization) || server.environment,
    region: settingsData.localization?.timezone ?? server.region,
    settingsData,
    settings: [...general, ...access, ...localization],
    general,
    access,
    localization
  };
}

function buildGeneralSettings(general: DashboardGeneralSettings | null): DashboardSettingGroup[] {
  if (!general) return [];
  return [
    { label: "ID", value: formatOptionalValue(general.id), note: "Settings record id returned by settings.general.id." },
    { label: "Guild ID", value: formatOptionalValue(general.guildId), note: "Discord guild id returned by settings.general.guild_id." },
    { label: "Slug", value: formatOptionalValue(general.slug), note: "Stable workspace slug from settings.general.slug." },
    { label: "Name", value: formatOptionalValue(general.name), note: "Current server name from settings.general.name." },
    { label: "Icon URL", value: formatOptionalValue(general.iconUrl), note: general.iconUrl ? "Current icon URL returned by settings.general.icon_url." : "Backend returned no icon URL." },
    { label: "Active", value: formatBooleanValue(general.isActive, "Active", "Inactive"), note: "Mirrors settings.general.is_active." },
    { label: "Contact email", value: formatOptionalValue(general.contactEmail), note: "Primary contact from settings.general.contact_email." },
    { label: "Support URL", value: formatOptionalValue(general.supportUrl), note: "Support entry point from settings.general.support_url." },
    { label: "Dashboard enabled", value: formatBooleanValue(general.dashboardEnabled), note: "Mirrors settings.general.dashboard_enabled." },
    { label: "Bot sync enabled", value: formatBooleanValue(general.botSyncEnabled), note: "Mirrors settings.general.bot_sync_enabled." },
    { label: "Notes", value: formatOptionalValue(general.notes, "No notes"), note: "Read-only notes from settings.general.notes." }
  ];
}

function buildAccessSettings(access: DashboardAccessSettings | null): DashboardSettingGroup[] {
  if (!access) return [];
  return [
    { label: "Owner access", value: formatPolicyValue(access.ownerAccess), note: "Policy from settings.access.owner_access." },
    { label: "Admin access", value: formatPolicyValue(access.adminAccess), note: "Policy from settings.access.admin_access." },
    { label: "Owner count", value: access.ownerCount !== null ? String(access.ownerCount) : "Not provided", note: "Summary count from settings.access.owner_count." },
    { label: "Admin count", value: access.adminCount !== null ? String(access.adminCount) : "Not provided", note: "Summary count from settings.access.admin_count." },
    { label: "Dashboard admin roles", value: formatListValue(access.dashboardAdminRoles), note: "Role list from settings.access.dashboard_admin_roles." },
    { label: "Bot manager roles", value: formatListValue(access.botManagerRoles), note: "Role list from settings.access.bot_manager_roles." },
    { label: "Dashboard write", value: formatBooleanValue(access.allowDashboardWrite, "Allowed", "Blocked"), note: "Write gate from settings.access.allow_dashboard_write." },
    { label: "Bot write", value: formatBooleanValue(access.allowBotWrite, "Allowed", "Blocked"), note: "Write gate from settings.access.allow_bot_write." },
    { label: "Policy version", value: access.policyVersion !== null ? String(access.policyVersion) : "Not provided", note: "Policy revision from settings.access.policy_version." }
  ];
}

function buildLocalizationSettings(localization: DashboardLocalizationSettings | null): DashboardSettingGroup[] {
  if (!localization) return [];
  return [
    { label: "Timezone", value: formatOptionalValue(localization.timezone), note: "IANA timezone from settings.localization.timezone." },
    { label: "Preferred locale", value: formatLocaleValue(localization.preferredLocale), note: formatLocaleNote(localization.preferredLocale, "Mirrors settings.localization.preferred_locale.") },
    { label: "Default locale", value: formatLocaleValue(localization.defaultLocale), note: formatLocaleNote(localization.defaultLocale, "Mirrors settings.localization.default_locale.") },
    { label: "Fallback locale", value: formatLocaleValue(localization.fallbackLocale), note: formatLocaleNote(localization.fallbackLocale, "Mirrors settings.localization.fallback_locale.") },
    { label: "Supported locales", value: formatListValue(localization.supportedLocales), note: localization.translationsVersion ? `Translations version ${localization.translationsVersion}.` : "List returned by settings.localization.supported_locales." },
    { label: "Translations version", value: formatOptionalValue(localization.translationsVersion), note: "Mirrors settings.localization.translations_version." }
  ];
}

function buildOverviewIdentity(value: unknown, baseServer: DashboardServer): DashboardIdentityField[] {
  const displayName = pickString(value, [["branding", "display_name"], ["server", "name"], ["name"]]) ?? baseServer.name;
  const locale = formatLocaleLabel(pickPathValue(value, [["profile", "preferred_locale"], ["preferred_locale"], ["localization", "default_locale"]])) ?? baseServer.environment;
  return [{ label: "Server", value: displayName }, { label: "Plan", value: baseServer.plan }, { label: "Locale", value: locale }];
}

function buildOverviewStatus(value: unknown, baseServer: DashboardServer): DashboardStatusItem[] {
  const systemHealth = pickString(value, [["latest_status", "status"], ["latestStatus", "status"], ["status"]]) ?? baseServer.state;
  return [{ label: "Workspace", value: toTitleCase(systemHealth), note: buildSyncNote(value) || baseServer.description, tone: normalizeTone(systemHealth, "info") }];
}

function buildOverviewNotices(value: unknown): DashboardNotice[] {
  const items = pickRecordArray(value, [["notices"], ["updates"], ["items"], ["events"]]);
  if (items.length > 0) {
    return items.map((item) => ({ title: pickString(item, [["title"], ["label"], ["name"]]) ?? "Update", detail: pickString(item, [["detail"], ["description"], ["message"], ["summary"]]) ?? "", time: pickString(item, [["time"], ["timestamp"], ["updated_at"], ["updatedAt"]]) ?? "" })).filter((item) => item.title || item.detail || item.time);
  }
  const note = pickString(value, [["profile", "notes"], ["notes"]]);
  return note ? [{ title: "Server note", detail: note, time: "" }] : [];
}

function mapOverview(baseServer: DashboardServer, value: unknown): DashboardServer["overview"] {
  const payload = getSectionPayload(value, "overview");
  const modules = mapModules(payload);
  return { identity: buildOverviewIdentity(payload, baseServer), systemStatus: buildOverviewStatus(payload, baseServer), moduleSummary: modules.length > 0 ? modules : baseServer.modules, notices: buildOverviewNotices(payload) };
}

function mapLicenses(value: unknown, baseServer: DashboardServer): DashboardServer["licenses"] {
  const payload = asRecord(value) ?? {};
  const tier = pickString(payload, [["active_license", "tier"], ["activeLicense", "tier"], ["plan"], ["plan_name"], ["planName"]]) ?? baseServer.plan;
  const status = pickString(payload, [["active_license", "status"], ["activeLicense", "status"], ["status"]]);
  const seats = pickNumber(payload, [["active_license", "seats"], ["activeLicense", "seats"]]);
  const entitlements = pickRecordArray(payload, [["entitlements"], ["items"]]).map((item) => ({ label: pickString(item, [["label"], ["name"], ["title"]]) ?? "Entitlement", value: pickString(item, [["value"], ["state"], ["status"]]) ?? "", tone: normalizeTone(pickString(item, [["tone"], ["status_tone"], ["statusTone"], ["state"]]) ?? pickString(item, [["value"], ["state"], ["status"]]), "info") })).filter((item) => item.value.trim().length > 0);
  return {
    currentPlan: toTitleCase(tier),
    availableLevel: seats !== null ? `${seats} seats` : status ? toTitleCase(status) : baseServer.licenses.availableLevel,
    entitlementSummary: [toTitleCase(tier), status ? toTitleCase(status) : null, seats !== null ? `${seats} seats` : null].filter((item): item is string => Boolean(item)).join(" · ") || baseServer.licenses.entitlementSummary,
    entitlements: entitlements.length > 0 ? entitlements : baseServer.licenses.entitlements
  };
}

function mapStatusGroups(value: unknown, baseServer: DashboardServer): DashboardStatusGroup[] {
  const groups = pickRecordArray(value, [["groups"], ["items"], ["status"]]);
  if (groups.length > 0) {
    return groups.map((group) => ({ key: "dashboard" as const, title: pickString(group, [["title"], ["label"], ["name"]]) ?? "Status", items: pickRecordArray(group, [["items"], ["status"]]).map((item) => ({ label: pickString(item, [["label"], ["name"], ["title"]]) ?? "Signal", value: pickString(item, [["value"], ["status"], ["state"]]) ?? "Unknown", note: pickString(item, [["note"], ["description"], ["detail"], ["message"]]) ?? "", tone: normalizeTone(pickString(item, [["tone"], ["status_tone"], ["statusTone"], ["state"]]) ?? pickString(item, [["value"], ["status"], ["state"]]), "info") })) })).filter((group) => group.items.length > 0);
  }
  const fallback = buildOverviewStatus(value, baseServer);
  return fallback.length > 0 ? [{ key: "dashboard", title: "Status", items: fallback }] : [];
}

function mapSummaryServer(value: unknown, options?: { expectedServerId?: string; path?: string }): DashboardServer {
  const payload = asRecord(value);
  if (!payload) throw new DashboardApiError("contract", "Dashboard API returned an invalid server payload.", { path: options?.path });
  const id = pickString(payload, [["server", "id"], ["id"], ["server_id"], ["serverId"]]) ?? options?.expectedServerId;
  if (!id) throw new DashboardApiError("contract", "Dashboard API server payload is missing an id.", { path: options?.path });
  const name = pickString(payload, [["branding", "display_name"], ["server", "name"], ["name"], ["title"]]) ?? id;
  const modules = mapModules(payload);
  const plan = pickString(payload, [["active_license", "tier"], ["activeLicense", "tier"], ["plan"], ["plan_name"], ["planName"]]) ?? "";
  const base: DashboardServer = {
    id,
    name,
    iconLabel: pickString(payload, [["icon_label"], ["iconLabel"], ["short_name"], ["icon"]]) ?? name.slice(0, 2).toUpperCase(),
    iconUrl: pickString(payload, [["icon_url"], ["iconUrl"], ["branding", "logo_url"]]) ?? "",
    accent: pickString(payload, [["branding", "accent_color"], ["accent_color"], ["accentColor"], ["accent"]]) ?? "#c4c9d4",
    state: resolveServerState(payload),
    accessLevel: resolveAccessLevel(payload),
    description: pickString(payload, [["profile", "notes"], ["notes"], ["description"], ["summary"]]) ?? "",
    environment: formatLocaleLabel(pickPathValue(payload, [["profile", "preferred_locale"], ["preferred_locale"], ["localization", "default_locale"]])) ?? "",
    region: pickString(payload, [["profile", "timezone"], ["timezone"], ["region"], ["location"]]) ?? "",
    members: modules.length > 0 ? `${modules.length} modules tracked` : pickNumber(payload, [["member_count"], ["memberCount"], ["members"]]) !== null ? `${pickNumber(payload, [["member_count"], ["memberCount"], ["members"]])} members` : "",
    plan: plan ? toTitleCase(plan) : "",
    syncNote: buildSyncNote(payload),
    overview: { identity: [], systemStatus: [], moduleSummary: modules, notices: [] },
    settings: [],
    general: [],
    access: [],
    localization: [],
    settingsData: { general: null, access: null, localization: null },
    modules,
    brandingModules: [],
    branding: { assets: [], fields: [], note: "" },
    licenses: { currentPlan: plan ? toTitleCase(plan) : "", availableLevel: "", entitlementSummary: "", entitlements: [] },
    status: []
  };
  base.general = [];
  base.access = [];
  base.localization = [];
  const withSettings = applySettingsData(base, buildSettingsData(payload));
  withSettings.overview = { identity: buildOverviewIdentity(payload, withSettings), systemStatus: buildOverviewStatus(payload, withSettings), moduleSummary: withSettings.modules, notices: buildOverviewNotices(payload) };
  withSettings.brandingModules = mapBrandingModules(payload, withSettings.modules);
  withSettings.branding.note = "Branding stays a module catalog in this pass.";
  withSettings.licenses = mapLicenses(payload, withSettings);
  withSettings.status = mapStatusGroups(payload, withSettings);
  return withSettings;
}
function mergeSummary(primary: DashboardServer, secondary: DashboardServer | null): DashboardServer {
  if (!secondary) return primary;
  return {
    ...primary,
    name: primary.name || secondary.name,
    iconLabel: primary.iconLabel || secondary.iconLabel,
    iconUrl: primary.iconUrl || secondary.iconUrl,
    accent: primary.accent || secondary.accent,
    state: primary.state !== "inactive" ? primary.state : secondary.state,
    accessLevel: primary.accessLevel !== "none" ? primary.accessLevel : secondary.accessLevel,
    description: primary.description || secondary.description,
    environment: primary.environment || secondary.environment,
    region: primary.region || secondary.region,
    members: primary.members || secondary.members,
    plan: primary.plan || secondary.plan,
    syncNote: primary.syncNote || secondary.syncNote,
    overview: {
      identity: primary.overview.identity.length > 0 ? primary.overview.identity : secondary.overview.identity,
      systemStatus: primary.overview.systemStatus.length > 0 ? primary.overview.systemStatus : secondary.overview.systemStatus,
      moduleSummary: primary.overview.moduleSummary.length > 0 ? primary.overview.moduleSummary : secondary.overview.moduleSummary,
      notices: primary.overview.notices.length > 0 ? primary.overview.notices : secondary.overview.notices
    },
    settings: primary.settings.length > 0 ? primary.settings : secondary.settings,
    general: primary.general.length > 0 ? primary.general : secondary.general,
    access: primary.access.length > 0 ? primary.access : secondary.access,
    localization: primary.localization.length > 0 ? primary.localization : secondary.localization,
    settingsData: {
      general: primary.settingsData?.general ?? secondary.settingsData?.general ?? null,
      access: primary.settingsData?.access ?? secondary.settingsData?.access ?? null,
      localization: primary.settingsData?.localization ?? secondary.settingsData?.localization ?? null
    },
    modules: primary.modules.length > 0 ? primary.modules : secondary.modules,
    brandingModules: primary.brandingModules.length > 0 ? primary.brandingModules : secondary.brandingModules,
    branding: {
      assets: primary.branding.assets.length > 0 ? primary.branding.assets : secondary.branding.assets,
      fields: primary.branding.fields.length > 0 ? primary.branding.fields : secondary.branding.fields,
      note: primary.branding.note || secondary.branding.note
    },
    licenses: {
      currentPlan: primary.licenses.currentPlan || secondary.licenses.currentPlan,
      availableLevel: primary.licenses.availableLevel || secondary.licenses.availableLevel,
      entitlementSummary: primary.licenses.entitlementSummary || secondary.licenses.entitlementSummary,
      entitlements: primary.licenses.entitlements.length > 0 ? primary.licenses.entitlements : secondary.licenses.entitlements
    },
    status: primary.status.length > 0 ? primary.status : secondary.status
  };
}

function resolveApiSection(page: DashboardServerRoutePage): DashboardApiSectionPage {
  switch (page) {
    case "overview": return "overview";
    case "general":
    case "access":
    case "localization": return "settings";
    case "branding": return "modules";
    case "license": return "licenses";
    case "status": return "status";
    default: return "overview";
  }
}

function getSectionPayload(value: unknown, section: DashboardApiSectionPage): unknown {
  return pickPathValue(value, [[section], ["data", section], ["payload", section], ["data"]]) ?? value;
}

function ensureServerMatch(value: unknown, serverId: string, path: string) {
  const payloadId = pickString(value, [["server", "id"], ["id"], ["server_id"], ["serverId"], ["general", "id"]]);
  if (payloadId && payloadId !== serverId) {
    throw new DashboardApiError("contract", "Dashboard API returned a mismatched server payload.", { path });
  }
}

function mapServerPagePayload(page: DashboardServerRoutePage, baseServer: DashboardServer, value: unknown): DashboardServer {
  const sectionServerPayload = pickPathValue(value, [["server"], ["data", "server"]]);
  const merged = mergeSummary(baseServer, sectionServerPayload ? mapSummaryServer(sectionServerPayload, { expectedServerId: baseServer.id }) : null);
  switch (page) {
    case "overview":
      return { ...merged, overview: mapOverview(merged, value) };
    case "general":
    case "access":
    case "localization": {
      const payload = getSectionPayload(value, "settings");
      return applySettingsData(merged, buildSettingsData(payload));
    }
    case "branding": {
      const payload = getSectionPayload(value, "modules");
      const modules = mapModules(payload);
      const brandingModules = mapBrandingModules(payload, merged.modules);
      return {
        ...merged,
        modules: modules.length > 0 ? modules : merged.modules,
        brandingModules,
        overview: { ...merged.overview, moduleSummary: modules.length > 0 ? modules : merged.overview.moduleSummary },
        branding: { ...merged.branding, note: "Branding stays a module catalog in this pass." }
      };
    }
    case "license":
      return { ...merged, licenses: mapLicenses(getSectionPayload(value, "licenses"), merged) };
    case "status":
      return { ...merged, status: mapStatusGroups(getSectionPayload(value, "status"), merged) };
    default:
      return merged;
  }
}

function mapServerList(value: unknown, path: string): DashboardServer[] {
  const itemsSource = asArray(value) ?? pickPathValue(value, [["items"], ["servers"], ["data", "items"], ["data", "servers"]]);
  if (!itemsSource || !Array.isArray(itemsSource)) {
    throw new DashboardApiError("contract", "Dashboard API servers payload is missing an items array.", { path });
  }
  return asRecordArray(itemsSource).map((item) => mapSummaryServer(item, { path }));
}

export function shouldUseDashboardFallback(error: DashboardApiError | null): boolean {
  if (!error) return false;
  if (error.kind === "config" || error.kind === "network") return true;
  return error.kind === "http" && (error.status ?? 0) >= 500;
}

export function isDashboardUnauthorizedError(error: DashboardApiError | null | undefined): boolean {
  return error?.kind === "http" && error.status === 401;
}

export async function fetchDashboardServers(signal?: AbortSignal): Promise<DashboardServer[]> {
  const response = await fetchDashboardJson<unknown>("servers", signal);
  return mapServerList(response.data, response.path);
}

export async function fetchDashboardServerPage(serverId: string, page: DashboardServerRoutePage, signal?: AbortSignal): Promise<DashboardServer> {
  const encodedServerId = encodeURIComponent(serverId);
  const serverResponse = await fetchDashboardJson<unknown>(`servers/${encodedServerId}`, signal);
  const baseServer = mapSummaryServer(serverResponse.data, { expectedServerId: serverId, path: serverResponse.path });
  if (baseServer.accessLevel === "none") return baseServer;
  const endpoint = resolveApiSection(page);
  let pageResponse: DashboardApiResponse<unknown>;
  try {
    pageResponse = await fetchDashboardJson<unknown>(`servers/${encodedServerId}/${endpoint}`, signal);
  } catch (error) {
    if (error instanceof DashboardApiError && error.status === 403) {
      return { ...baseServer, accessLevel: "none" };
    }
    throw error;
  }
  ensureServerMatch(pageResponse.data, serverId, pageResponse.path);
  return mapServerPagePayload(page, baseServer, pageResponse.data);
}

