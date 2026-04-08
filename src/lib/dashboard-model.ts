import type { Locale } from "@/config/site.config";

export type DashboardServerState = "connected" | "invite" | "inactive" | "test";
export type DashboardAccessLevel = "owner" | "admin" | "none";
export type DashboardTone = "positive" | "warning" | "muted" | "info";
export type DashboardModuleKey =
  | "bank"
  | "social"
  | "weather"
  | "sessions"
  | "radio"
  | "rentals"
  | "branding"
  | "dashboard"
  | "licenses";
export type DashboardPageKey =
  | "servers"
  | "overview"
  | "general"
  | "access"
  | "localization"
  | "branding"
  | "license"
  | "status";

export interface DashboardNotice {
  title: string;
  detail: string;
  time: string;
}

export interface DashboardIdentityField {
  label: string;
  value: string;
}

export interface DashboardStatusItem {
  label: string;
  value: string;
  note: string;
  tone: DashboardTone;
}

export interface DashboardModule {
  key: DashboardModuleKey;
  name: string;
  description: string;
  stateLabel: string;
  tone: DashboardTone;
  actionLabel: string;
}

export interface DashboardBrandingModule {
  key: DashboardModuleKey;
  name: string;
  description: string;
  stateLabel: string;
  tone: DashboardTone;
  availability: string;
  note: string;
}

export interface DashboardSettingGroup {
  label: string;
  value: string;
  note: string;
}

export interface DashboardGeneralSettings {
  id: string;
  guildId: string;
  slug: string;
  name: string;
  iconUrl: string | null;
  isActive: boolean | null;
  contactEmail: string | null;
  supportUrl: string | null;
  dashboardEnabled: boolean | null;
  botSyncEnabled: boolean | null;
  notes: string | null;
}

export interface DashboardAccessSettings {
  ownerAccess: string | null;
  adminAccess: string | null;
  ownerCount: number | null;
  adminCount: number | null;
  dashboardAdminRoles: string[];
  botManagerRoles: string[];
  allowDashboardWrite: boolean | null;
  allowBotWrite: boolean | null;
  policyVersion: number | null;
}

export interface DashboardLocalizationSettings {
  timezone: string | null;
  preferredLocale: string | null;
  defaultLocale: string | null;
  fallbackLocale: string | null;
  supportedLocales: string[];
  translationsVersion: string | null;
}

export type DashboardDiscordEntityStatus = "active" | "missing" | "unresolved";
export type DashboardDiscordRefreshState = "idle" | "requested" | "in_progress";
export type DashboardDiscordEntityKind = "role" | "channel" | "category";
export type DashboardDiscordChannelKind = "category" | "text" | "voice" | "forum" | "announcement" | "stage" | "unknown";

export interface DashboardDiscordRoleOption {
  id: string;
  name: string;
  isEveryone: boolean;
  isManaged: boolean;
  position: number | null;
}

export interface DashboardDiscordChannelOption {
  id: string;
  name: string;
  kind: DashboardDiscordChannelKind;
  parentId: string | null;
  parentName: string | null;
}

export interface DashboardDiscordResolvedEntity {
  kind: DashboardDiscordEntityKind;
  value: string;
  id: string | null;
  name: string;
  status: DashboardDiscordEntityStatus;
}

export interface DashboardDiscordAccessAutofill {
  dashboardAdminRoles: DashboardDiscordResolvedEntity[];
  botManagerRoles: DashboardDiscordResolvedEntity[];
}

export interface DashboardDiscordSyncState {
  lastSyncAt: string | null;
  isStale: boolean;
  staleReason: string | null;
  refreshRequestedAt: string | null;
  refreshStartedAt: string | null;
  refreshState: DashboardDiscordRefreshState;
  status: string | null;
  note: string | null;
}

export interface DashboardDiscordStructure {
  guildId: string | null;
  roleOptions: DashboardDiscordRoleOption[];
  channelOptions: DashboardDiscordChannelOption[];
  categoryOptions: DashboardDiscordChannelOption[];
  accessAutofill: DashboardDiscordAccessAutofill;
  sync: DashboardDiscordSyncState;
}

export interface DashboardBrandAsset {
  label: string;
  value: string;
  note: string;
}

export interface DashboardEntitlement {
  label: string;
  value: string;
  tone: DashboardTone;
}

export interface DashboardStatusGroup {
  key: "core" | "dashboard" | "modules" | "integrations";
  title: string;
  items: DashboardStatusItem[];
}

export interface DashboardServer {
  id: string;
  name: string;
  iconLabel: string;
  iconUrl?: string;
  accent: string;
  state: DashboardServerState;
  accessLevel: DashboardAccessLevel;
  description: string;
  environment: string;
  region: string;
  members: string;
  plan: string;
  syncNote: string;
  overview: {
    identity: DashboardIdentityField[];
    systemStatus: DashboardStatusItem[];
    moduleSummary: DashboardModule[];
    notices: DashboardNotice[];
  };
  settings: DashboardSettingGroup[];
  general: DashboardSettingGroup[];
  access: DashboardSettingGroup[];
  localization: DashboardSettingGroup[];
  settingsData?: {
    general: DashboardGeneralSettings | null;
    access: DashboardAccessSettings | null;
    localization: DashboardLocalizationSettings | null;
  };
  modules: DashboardModule[];
  brandingModules: DashboardBrandingModule[];
  branding: {
    assets: DashboardBrandAsset[];
    fields: DashboardIdentityField[];
    note: string;
  };
  licenses: {
    currentPlan: string;
    availableLevel: string;
    entitlementSummary: string;
    entitlements: DashboardEntitlement[];
  };
  status: DashboardStatusGroup[];
}

type LocalizedString = Record<Locale, string>;

type LocalizedField = {
  label: LocalizedString;
  value: LocalizedString;
  note: LocalizedString;
};

type LocalizedModuleSeed = {
  key: DashboardModuleKey;
  stateLabel: LocalizedString;
  tone: DashboardTone;
  actionLabel: LocalizedString;
  availability: LocalizedString;
  note: LocalizedString;
};

type LocalizedEntitlement = {
  label: LocalizedString;
  value: LocalizedString;
  tone: DashboardTone;
};

type LocalizedStatusGroup = {
  key: DashboardStatusGroup["key"];
  title: LocalizedString;
  items: Array<{
    label: LocalizedString;
    value: LocalizedString;
    note: LocalizedString;
    tone: DashboardTone;
  }>;
};

type LocalizedNotice = {
  title: LocalizedString;
  detail: LocalizedString;
  time: LocalizedString;
};

type ServerSeed = {
  id: string;
  name: LocalizedString;
  iconLabel: string;
  accent: string;
  state: DashboardServerState;
  accessLevel: DashboardAccessLevel;
  description: LocalizedString;
  environment: LocalizedString;
  region: LocalizedString;
  members: string;
  plan: LocalizedString;
  syncNote: LocalizedString;
  general: LocalizedField[];
  access: LocalizedField[];
  localization: LocalizedField[];
  notices: LocalizedNotice[];
  entitlements: LocalizedEntitlement[];
  status: LocalizedStatusGroup[];
  brandingNote: LocalizedString;
  modules: LocalizedModuleSeed[];
};

function text(en: string, ru: string): LocalizedString {
  return { en, ru };
}

function pick(locale: Locale, value: LocalizedString): string {
  return value[locale];
}

const moduleDescriptions: Record<DashboardModuleKey, LocalizedString> = {
  bank: text("Economy and balance surfaces.", "Экономика и финансовые поверхности."),
  social: text("Profiles and social-facing surfaces.", "Профили и социальные поверхности."),
  weather: text("Forecast and environment surfaces.", "Погода и поверхности окружения."),
  sessions: text("Session cadence and event structure.", "Сессии и событийная структура."),
  radio: text("Channels and operator-facing radio flows.", "Каналы и операторские radio-flow."),
  rentals: text("Property and rentals surfaces.", "Недвижимость и аренда."),
  branding: text("Module-facing branding surface.", "Модульная branding-поверхность."),
  dashboard: text("Shell, access, and workspace routing.", "Shell, доступ и маршрутизация workspace."),
  licenses: text("License visibility and entitlements.", "Видимость лицензии и права доступа.")
};

const moduleNames: Record<DashboardModuleKey, string> = {
  bank: "Bank",
  social: "Social",
  weather: "Weather",
  sessions: "Sessions",
  radio: "Radio",
  rentals: "Rentals",
  branding: "Branding",
  dashboard: "Dashboard",
  licenses: "Licenses"
};

const seeds: ServerSeed[] = [
  {
    id: "crown-main",
    name: text("CROWN Main", "CROWN Main"),
    iconLabel: "CM",
    accent: "#d1c5ad",
    state: "connected",
    accessLevel: "owner",
    description: text(
      "Primary production server with the new dashboard shell.",
      "Основной рабочий сервер с новой dashboard shell."
    ),
    environment: text("English (US)", "Английский (США)"),
    region: text("Europe/Kaliningrad", "Europe/Kaliningrad"),
    members: "6 modules tracked",
    plan: text("Full · Active", "Full · Active"),
    syncNote: text("Captured 3 minutes ago", "Снимок 3 минуты назад"),
    general: [
      { label: text("Server ID", "Server ID"), value: text("crown-main", "crown-main"), note: text("Uses the current backend server record.", "Использует текущую server-запись backend.") },
      { label: text("Display name", "Отображаемое имя"), value: text("CROWN Main", "CROWN Main"), note: text("Shown without a global branding editor.", "Показывается без глобального branding editor.") },
      { label: text("Plan", "План"), value: text("Full · Active", "Full · Active"), note: text("Detailed separately on the License page.", "Детально показывается на странице License.") }
    ],
    access: [
      { label: text("Dashboard scope", "Dashboard scope"), value: text("Owner access", "Owner access"), note: text("Read surfaces are open for this account.", "Read-поверхности открыты для этой учетной записи.") },
      { label: text("Write path", "Write path"), value: text("Not in scope", "Вне скоупа"), note: text("Heavy forms and write actions stay disabled.", "Тяжелые формы и write-action остаются отключены.") }
    ],
    localization: [
      { label: text("Primary locale", "Основная локаль"), value: text("English (US)", "Английский (США)"), note: text("Main dashboard locale for the server.", "Основная локаль dashboard для сервера.") },
      { label: text("Supported locales", "Поддерживаемые локали"), value: text("English, Russian", "Английский, русский"), note: text("Shown as a light scaffold when payloads are partial.", "Показывается как легкий scaffold при частичных payload.") },
      { label: text("Timezone", "Часовой пояс"), value: text("Europe/Kaliningrad", "Europe/Kaliningrad"), note: text("Part of server-level localization context.", "Часть server-level localization context.") }
    ],
    notices: [
      { title: text("Dashboard shell enabled", "Dashboard shell включен"), detail: text("Navigation, top context, and summary surfaces are active.", "Навигация, верхний контекст и summary-поверхности активны."), time: text("Today", "Сегодня") },
      { title: text("Branding stays module-based", "Branding остается модульным"), detail: text("No server-wide branding editor is exposed here.", "Server-wide branding editor здесь не показывается."), time: text("This pass", "Этот проход") }
    ],
    entitlements: [
      { label: text("Overview", "Overview"), value: text("Included", "Включено"), tone: "positive" },
      { label: text("Status", "Status"), value: text("Included", "Включено"), tone: "positive" },
      { label: text("Write actions", "Write actions"), value: text("Hidden", "Скрыты"), tone: "muted" }
    ],
    status: [
      {
        key: "core",
        title: text("Core", "Ядро"),
        items: [
          { label: text("Backend API", "Backend API"), value: text("Healthy", "Норма"), note: text("Overview contract is available.", "Контракт overview доступен."), tone: "positive" },
          { label: text("Bot session", "Сессия бота"), value: text("Connected", "Подключена"), note: text("Bot presence is visible in summary form.", "Присутствие бота видно в summary-форме."), tone: "positive" }
        ]
      },
      {
        key: "dashboard",
        title: text("Dashboard", "Панель"),
        items: [
          { label: text("Shell", "Shell"), value: text("Ready", "Готов"), note: text("Navigation and top context are loaded.", "Навигация и верхний контекст загружены."), tone: "info" },
          { label: text("Branding route", "Маршрут Branding"), value: text("Scaffolded", "Собран"), note: text("Branding is module-based only.", "Branding только модульный."), tone: "info" }
        ]
      }
    ],
    brandingNote: text(
      "Branding stays a module catalog in this pass.",
      "Branding в этот проход остается каталогом модулей."
    ),
    modules: [
      { key: "bank", stateLabel: text("Connected", "Подключен"), tone: "positive", actionLabel: text("Tracked in overview", "Отслеживается в overview"), availability: text("Available later", "Будет доступен позже"), note: text("Module is present, but editor is not connected yet.", "Модуль присутствует, но editor пока не подключен.") },
      { key: "social", stateLabel: text("Connected", "Подключен"), tone: "positive", actionLabel: text("Tracked in overview", "Отслеживается в overview"), availability: text("Available later", "Будет доступен позже"), note: text("Social branding remains a future module surface.", "Брендинг Social останется будущей модульной поверхностью.") },
      { key: "weather", stateLabel: text("Detected", "Обнаружен"), tone: "info", actionLabel: text("Tracked in overview", "Отслеживается в overview"), availability: text("Not connected yet", "Пока не подключен"), note: text("Visible as module-based scaffold only.", "Виден только как module-based scaffold.") },
      { key: "sessions", stateLabel: text("Detected", "Обнаружен"), tone: "info", actionLabel: text("Tracked in overview", "Отслеживается в overview"), availability: text("Not connected yet", "Пока не подключен"), note: text("Will be connected with module editors later.", "Будет подключен позже вместе с module editors.") },
      { key: "radio", stateLabel: text("Review", "Проверка"), tone: "warning", actionLabel: text("Needs backend detail", "Нужна детализация backend"), availability: text("Coming soon", "Скоро"), note: text("Visible as a future branding category.", "Виден как будущая branding-категория.") },
      { key: "rentals", stateLabel: text("Connected", "Подключен"), tone: "positive", actionLabel: text("Tracked in overview", "Отслеживается в overview"), availability: text("Available later", "Будет доступен позже"), note: text("Remains module-based once editors connect.", "Останется модульным после подключения editors.") }
    ]
  },
  {
    id: "north-falls",
    name: text("North Falls", "North Falls"),
    iconLabel: "NF",
    accent: "#aab7d3",
    state: "invite",
    accessLevel: "admin",
    description: text(
      "Setup-stage server used to validate scaffold states.",
      "Сервер на этапе настройки для проверки scaffold-состояний."
    ),
    environment: text("Russian", "Русский"),
    region: text("Europe/Kaliningrad", "Europe/Kaliningrad"),
    members: "4 modules tracked",
    plan: text("Setup · Trial", "Setup · Trial"),
    syncNote: text("Captured 17 minutes ago", "Снимок 17 минут назад"),
    general: [
      { label: text("Server ID", "Server ID"), value: text("north-falls", "north-falls"), note: text("Server can be opened from the list.", "Сервер можно открыть из списка.") },
      { label: text("Stage", "Этап"), value: text("Setup", "Setup"), note: text("Used to verify incomplete payload handling.", "Используется для проверки неполных payload.") }
    ],
    access: [
      { label: text("Dashboard scope", "Dashboard scope"), value: text("Admin access", "Admin access"), note: text("Admin-level read visibility is available.", "Доступна read-видимость уровня admin.") },
      { label: text("Change flow", "Change flow"), value: text("Deferred", "Отложен"), note: text("Write flows remain absent.", "Write-flow остаются отключены." ) }
    ],
    localization: [
      { label: text("Primary locale", "Основная локаль"), value: text("Russian", "Русский"), note: text("Localization remains concise for setup-stage servers.", "Локализация остается компактной для setup-stage серверов.") }
    ],
    notices: [
      { title: text("General shell verified", "General shell проверен"), detail: text("Overview, General, Access, and Localization routes are ready.", "Маршруты Overview, General, Access и Localization готовы."), time: text("Today", "Сегодня") }
    ],
    entitlements: [
      { label: text("Server shell", "Server shell"), value: text("Included", "Включено"), tone: "positive" },
      { label: text("Branding editor", "Branding editor"), value: text("Deferred", "Отложен"), tone: "muted" }
    ],
    status: [
      {
        key: "dashboard",
        title: text("Dashboard", "Панель"),
        items: [
          { label: text("Workspace shell", "Workspace shell"), value: text("Ready", "Готов"), note: text("Used to validate setup-stage density.", "Используется для проверки плотности setup-stage."), tone: "info" }
        ]
      }
    ],
    brandingNote: text(
      "Branding here is only a future module catalog.",
      "Branding здесь только каталог будущих модулей."
    ),
    modules: [
      { key: "bank", stateLabel: text("Detected", "Обнаружен"), tone: "info", actionLabel: text("Summary only", "Только summary"), availability: text("Not connected yet", "Пока не подключен"), note: text("Brand entry exists but editor is unavailable.", "Brand entry существует, но editor недоступен.") },
      { key: "social", stateLabel: text("Detected", "Обнаружен"), tone: "info", actionLabel: text("Summary only", "Только summary"), availability: text("Not connected yet", "Пока не подключен"), note: text("Module branding stays in scaffold mode.", "Брендинг модуля остается в scaffold-режиме.") },
      { key: "radio", stateLabel: text("Pending", "Ожидание"), tone: "warning", actionLabel: text("Needs connection", "Требует подключения"), availability: text("Coming soon", "Скоро"), note: text("Radio will appear once module connection is ready.", "Radio появится после готовности модульного подключения.") },
      { key: "rentals", stateLabel: text("Pending", "Ожидание"), tone: "muted", actionLabel: text("Awaiting backend detail", "Ожидает детализацию backend"), availability: text("Coming soon", "Скоро"), note: text("Rentals branding is intentionally deferred.", "Брендинг Rentals намеренно отложен.") }
    ]
  },
  {
    id: "archive-station",
    name: text("Archive Station", "Archive Station"),
    iconLabel: "AS",
    accent: "#8f96a6",
    state: "inactive",
    accessLevel: "none",
    description: text(
      "Archive server used to confirm locked visibility.",
      "Архивный сервер для проверки locked-видимости."
    ),
    environment: text("Archive", "Архив"),
    region: text("Read-only", "Только чтение"),
    members: "2 modules retained",
    plan: text("Legacy", "Legacy"),
    syncNote: text("Archive snapshot", "Архивный снимок"),
    general: [],
    access: [],
    localization: [],
    notices: [
      { title: text("Locked view available", "Locked view доступен"), detail: text("Server remains visible from the list, but actions stay closed.", "Сервер остается видимым из списка, но действия закрыты."), time: text("Static", "Статично") }
    ],
    entitlements: [
      { label: text("Visibility", "Видимость"), value: text("Included", "Включено"), tone: "info" }
    ],
    status: [],
    brandingNote: text(
      "Archive branding is intentionally quiet and non-editable.",
      "Архивный branding намеренно спокойный и не редактируется."
    ),
    modules: [
      { key: "bank", stateLabel: text("Archived", "Архив"), tone: "muted", actionLabel: text("Reference only", "Только справка"), availability: text("Available later", "Будет доступен позже"), note: text("Archive keeps the category visible without editor access.", "Архив сохраняет категорию видимой без доступа к editor.") },
      { key: "social", stateLabel: text("Archived", "Архив"), tone: "muted", actionLabel: text("Reference only", "Только справка"), availability: text("Available later", "Будет доступен позже"), note: text("Social branding remains a reference slot.", "Брендинг Social остается справочным слотом.") }
    ]
  }
];

function mapField(locale: Locale, item: LocalizedField): DashboardSettingGroup {
  return { label: pick(locale, item.label), value: pick(locale, item.value), note: pick(locale, item.note) };
}

function mapModule(locale: Locale, item: LocalizedModuleSeed): DashboardModule {
  return {
    key: item.key,
    name: moduleNames[item.key],
    description: pick(locale, moduleDescriptions[item.key]),
    stateLabel: pick(locale, item.stateLabel),
    tone: item.tone,
    actionLabel: pick(locale, item.actionLabel)
  };
}

function mapBrandingModule(locale: Locale, item: LocalizedModuleSeed): DashboardBrandingModule {
  return {
    key: item.key,
    name: moduleNames[item.key],
    description: pick(locale, moduleDescriptions[item.key]),
    stateLabel: pick(locale, item.stateLabel),
    tone: item.tone,
    availability: pick(locale, item.availability),
    note: pick(locale, item.note)
  };
}

function materializeServer(locale: Locale, seed: ServerSeed): DashboardServer {
  const modules = seed.modules.map((item) => mapModule(locale, item));
  const general = seed.general.map((item) => mapField(locale, item));
  const access = seed.access.map((item) => mapField(locale, item));
  const localization = seed.localization.map((item) => mapField(locale, item));

  return {
    id: seed.id,
    name: pick(locale, seed.name),
    iconLabel: seed.iconLabel,
    iconUrl: "",
    accent: seed.accent,
    state: seed.state,
    accessLevel: seed.accessLevel,
    description: pick(locale, seed.description),
    environment: pick(locale, seed.environment),
    region: pick(locale, seed.region),
    members: seed.members,
    plan: pick(locale, seed.plan),
    syncNote: pick(locale, seed.syncNote),
    overview: {
      identity: [
        { label: locale === "en" ? "Server" : "Сервер", value: pick(locale, seed.name) },
        { label: locale === "en" ? "Plan" : "План", value: pick(locale, seed.plan) },
        { label: locale === "en" ? "Locale" : "Локаль", value: pick(locale, seed.environment) }
      ],
      systemStatus: [
        {
          label: locale === "en" ? "Workspace" : "Workspace",
          value: seed.state === "connected" ? (locale === "en" ? "Ready" : "Готов") : seed.state === "invite" ? (locale === "en" ? "Setup" : "Настройка") : seed.state === "test" ? (locale === "en" ? "Review" : "Проверка") : (locale === "en" ? "Locked" : "Закрыт"),
          note: pick(locale, seed.description),
          tone: seed.state === "connected" ? "positive" : seed.state === "inactive" ? "muted" : "info"
        }
      ],
      moduleSummary: modules,
      notices: seed.notices.map((item) => ({ title: pick(locale, item.title), detail: pick(locale, item.detail), time: pick(locale, item.time) }))
    },
    settings: [...general, ...access, ...localization],
    general,
    access,
    localization,
    modules,
    brandingModules: seed.modules.map((item) => mapBrandingModule(locale, item)),
    branding: {
      assets: [],
      fields: [],
      note: pick(locale, seed.brandingNote)
    },
    licenses: {
      currentPlan: pick(locale, seed.plan),
      availableLevel: seed.accessLevel === "owner" ? (locale === "en" ? "Server shell access" : "Доступ к server shell") : (locale === "en" ? "Read-only visibility" : "Только видимость"),
      entitlementSummary: pick(locale, seed.brandingNote),
      entitlements: seed.entitlements.map((item) => ({ label: pick(locale, item.label), value: pick(locale, item.value), tone: item.tone }))
    },
    status: seed.status.map((group) => ({
      key: group.key,
      title: pick(locale, group.title),
      items: group.items.map((item) => ({ label: pick(locale, item.label), value: pick(locale, item.value), note: pick(locale, item.note), tone: item.tone }))
    }))
  };
}

export function getDashboardServers(locale: Locale = "en"): DashboardServer[] {
  return seeds.map((seed) => materializeServer(locale, seed));
}

export function getDashboardServer(id: string, locale: Locale = "en"): DashboardServer | null {
  const seed = seeds.find((item) => item.id === id);
  return seed ? materializeServer(locale, seed) : null;
}


