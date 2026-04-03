import { getDashboardApiBaseUrl } from "@/lib/dashboard-api";

export interface DashboardAuthIdentity {
  id: string | null;
  displayName: string | null;
  username: string | null;
  avatarUrl: string | null;
}

export type DashboardAuthState =
  | {
      status: "authenticated";
      identity: DashboardAuthIdentity | null;
    }
  | {
      status: "unauthenticated";
    }
  | {
      status: "unavailable";
    };

type AuthRecord = Record<string, unknown>;

function buildDashboardAuthUrl(baseUrl: string, path: string): string {
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

function asRecord(value: unknown): AuthRecord | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  return value as AuthRecord;
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

  if (["true", "1", "yes", "authenticated", "active"].includes(normalized)) {
    return true;
  }

  if (["false", "0", "no", "unauthenticated", "inactive"].includes(normalized)) {
    return false;
  }

  return null;
}

function pickString(
  value: unknown,
  paths: readonly (readonly string[])[]
): string | null {
  return asString(pickPathValue(value, paths));
}

function mapDashboardAuthIdentity(value: unknown): DashboardAuthIdentity | null {
  const payload =
    pickPathValue(value, [
      ["user"],
      ["member"],
      ["account"],
      ["profile"],
      ["identity"],
      ["discord"],
      ["data", "user"],
      ["data", "member"],
      ["data", "account"],
      ["data", "profile"],
      ["data", "identity"],
      ["data", "discord"]
    ]) ?? value;
  const id = pickString(payload, [
    ["id"],
    ["discord_id"],
    ["discordId"],
    ["user_id"],
    ["userId"]
  ]);
  const username = pickString(payload, [["username"], ["login"], ["tag"], ["handle"]]);
  const discriminator = pickString(payload, [["discriminator"], ["suffix"]]);
  const avatarUrl = pickString(payload, [
    ["avatar_url"],
    ["avatarUrl"],
    ["avatar"],
    ["image_url"],
    ["imageUrl"],
    ["picture"]
  ]);
  const displayName =
    pickString(payload, [
      ["display_name"],
      ["displayName"],
      ["global_name"],
      ["globalName"],
      ["name"],
      ["full_name"],
      ["fullName"]
    ]) ??
    (username && discriminator && discriminator !== "0"
      ? `${username}#${discriminator}`
      : username);

  if (!id && !displayName && !username && !avatarUrl) {
    return null;
  }

  return {
    id,
    displayName,
    username,
    avatarUrl
  };
}

function resolveDashboardAuthUrl(path: string): string | null {
  const baseUrl = getDashboardApiBaseUrl();

  if (!baseUrl) {
    return null;
  }

  return buildDashboardAuthUrl(baseUrl, path);
}

function normalizeDashboardLoginNextPath(nextPath?: string | null): string {
  const normalized = nextPath?.trim();

  if (!normalized || !normalized.startsWith("/")) {
    return "/dashboard";
  }

  return normalized;
}

export function getDashboardDiscordLoginUrl(nextPath = "/dashboard"): string | null {
  const resolvedUrl = resolveDashboardAuthUrl("auth/discord/login");

  if (!resolvedUrl) {
    return null;
  }

  const url = new URL(resolvedUrl);
  url.searchParams.set("next", normalizeDashboardLoginNextPath(nextPath));

  return url.toString();
}

export async function fetchDashboardAuthState(
  signal?: AbortSignal
): Promise<DashboardAuthState> {
  const url = resolveDashboardAuthUrl("auth/me");

  if (!url) {
    return { status: "unavailable" };
  }

  let response: Response;

  try {
    response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json"
      },
      credentials: "include",
      cache: "no-store",
      signal
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }

    return { status: "unavailable" };
  }

  if (response.status === 401 || response.status === 403) {
    return { status: "unauthenticated" };
  }

  if (!response.ok) {
    return { status: "unavailable" };
  }

  let payload: unknown;

  try {
    payload = await response.json();
  } catch {
    return { status: "unavailable" };
  }

  const explicitlyAuthenticated = asBoolean(
    pickPathValue(payload, [
      ["authenticated"],
      ["is_authenticated"],
      ["isAuthenticated"],
      ["session", "authenticated"],
      ["data", "authenticated"],
      ["data", "is_authenticated"],
      ["data", "isAuthenticated"]
    ])
  );
  const identity = mapDashboardAuthIdentity(payload);

  if (explicitlyAuthenticated === false) {
    return { status: "unauthenticated" };
  }

  if (explicitlyAuthenticated === true || identity) {
    return {
      status: "authenticated",
      identity
    };
  }

  return { status: "unauthenticated" };
}

export async function logoutDashboardAuth(signal?: AbortSignal): Promise<void> {
  const url = resolveDashboardAuthUrl("auth/logout");

  if (!url) {
    throw new Error("Dashboard auth base URL is unavailable.");
  }

  let response: Response;

  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      credentials: "include",
      cache: "no-store",
      signal
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }

    throw new Error("Dashboard logout request failed.");
  }

  if (response.status === 401 || response.status === 403) {
    return;
  }

  if (!response.ok) {
    throw new Error("Dashboard logout request failed.");
  }
}

