import type { Locale } from "@/config/site.config";

export type DashboardServerState = "connected" | "invite" | "inactive" | "test";
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
  | "settings"
  | "modules"
  | "branding"
  | "licenses"
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

export interface DashboardSettingGroup {
  label: string;
  value: string;
  note: string;
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
  modules: DashboardModule[];
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

type LocalizedIdentityField = {
  label: LocalizedString;
  value: LocalizedString;
};

type LocalizedStatusItem = {
  label: LocalizedString;
  value: LocalizedString;
  note: LocalizedString;
  tone: DashboardTone;
};

type LocalizedModuleSeed = {
  key: DashboardModuleKey;
  stateLabel: LocalizedString;
  tone: DashboardTone;
  actionLabel: LocalizedString;
};

type LocalizedSettingGroup = {
  label: LocalizedString;
  value: LocalizedString;
  note: LocalizedString;
};

type LocalizedBrandAsset = {
  label: LocalizedString;
  value: LocalizedString;
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
  items: LocalizedStatusItem[];
};

type LocalizedNotice = {
  title: LocalizedString;
  detail: LocalizedString;
  time: LocalizedString;
};

type ModuleSetKey = "production" | "setup" | "archive" | "test";

type DashboardServerSeed = {
  id: string;
  name: LocalizedString;
  iconLabel: string;
  iconUrl?: string;
  accent: string;
  state: DashboardServerState;
  description: LocalizedString;
  environment: LocalizedString;
  region: LocalizedString;
  members: string;
  plan: LocalizedString;
  syncNote: LocalizedString;
  moduleSet: ModuleSetKey;
  overview: {
    identity: LocalizedIdentityField[];
    systemStatus: LocalizedStatusItem[];
    notices: LocalizedNotice[];
  };
  settings: LocalizedSettingGroup[];
  branding: {
    assets: LocalizedBrandAsset[];
    fields: LocalizedIdentityField[];
    note: LocalizedString;
  };
  licenses: {
    currentPlan: LocalizedString;
    availableLevel: LocalizedString;
    entitlementSummary: LocalizedString;
    entitlements: LocalizedEntitlement[];
  };
  status: LocalizedStatusGroup[];
};

function text(en: string, ru: string): LocalizedString {
  return { en, ru };
}

function pick(locale: Locale, value: LocalizedString): string {
  return value[locale];
}

const moduleCatalog: Record<
  DashboardModuleKey,
  { key: DashboardModuleKey; name: string; description: LocalizedString }
> = {
  bank: {
    key: "bank",
    name: "Bank",
    description: text(
      "Balances, transfers, and salary rules.",
      "Балансы, переводы и правила выплат."
    )
  },
  social: {
    key: "social",
    name: "Social",
    description: text(
      "Profiles, reactions, and player progression.",
      "Профили, реакции и прогресс игроков."
    )
  },
  weather: {
    key: "weather",
    name: "Weather",
    description: text(
      "Forecast controls and saved locations.",
      "Погода, прогнозы и сохраненные локации."
    )
  },
  sessions: {
    key: "sessions",
    name: "Sessions",
    description: text(
      "Session timing and event structure.",
      "Расписание сессий и рабочая структура событий."
    )
  },
  radio: {
    key: "radio",
    name: "Radio",
    description: text(
      "Channel presets and radio access.",
      "Каналы связи и доступ к радиосетке."
    )
  },
  rentals: {
    key: "rentals",
    name: "Rentals",
    description: text(
      "Lease records and property states.",
      "Аренда, объекты и их текущее состояние."
    )
  },
  branding: {
    key: "branding",
    name: "Branding",
    description: text(
      "Brand assets, display name, and visual identity.",
      "Материалы бренда, отображаемое имя и визуальная идентичность."
    )
  },
  dashboard: {
    key: "dashboard",
    name: "Dashboard",
    description: text(
      "Workspace access, overview, and dashboard routing.",
      "Доступ к рабочему пространству, обзор и маршруты dashboard."
    )
  },
  licenses: {
    key: "licenses",
    name: "Licenses",
    description: text(
      "License status, seats, and access entitlements.",
      "Статус лицензии, места и доступные права."
    )
  }
};

const moduleSets: Record<ModuleSetKey, LocalizedModuleSeed[]> = {
  production: [
    { key: "bank", stateLabel: text("Enabled", "Включен"), tone: "positive", actionLabel: text("Open", "Открыть") },
    { key: "social", stateLabel: text("Enabled", "Включен"), tone: "positive", actionLabel: text("Open", "Открыть") },
    { key: "weather", stateLabel: text("Enabled", "Включен"), tone: "info", actionLabel: text("Open", "Открыть") },
    { key: "sessions", stateLabel: text("Enabled", "Включен"), tone: "positive", actionLabel: text("Open", "Открыть") },
    { key: "radio", stateLabel: text("Review", "Проверка"), tone: "warning", actionLabel: text("Review", "Проверить") },
    { key: "rentals", stateLabel: text("Enabled", "Включен"), tone: "positive", actionLabel: text("Open", "Открыть") }
  ],
  setup: [
    { key: "bank", stateLabel: text("Ready", "Готов"), tone: "info", actionLabel: text("Open", "Открыть") },
    { key: "social", stateLabel: text("Ready", "Готов"), tone: "info", actionLabel: text("Open", "Открыть") },
    { key: "weather", stateLabel: text("Ready", "Готов"), tone: "info", actionLabel: text("Open", "Открыть") },
    { key: "sessions", stateLabel: text("Limited", "Ограничен"), tone: "warning", actionLabel: text("Review", "Проверить") },
    { key: "radio", stateLabel: text("Limited", "Ограничен"), tone: "muted", actionLabel: text("Review", "Проверить") },
    { key: "rentals", stateLabel: text("Limited", "Ограничен"), tone: "muted", actionLabel: text("Review", "Проверить") }
  ],
  archive: [
    { key: "bank", stateLabel: text("Archived", "Архив"), tone: "info", actionLabel: text("Open", "Открыть") },
    { key: "social", stateLabel: text("Archived", "Архив"), tone: "muted", actionLabel: text("Open", "Открыть") },
    { key: "weather", stateLabel: text("Hidden", "Скрыт"), tone: "muted", actionLabel: text("Review", "Проверить") },
    { key: "sessions", stateLabel: text("Hidden", "Скрыт"), tone: "muted", actionLabel: text("Review", "Проверить") },
    { key: "radio", stateLabel: text("Hidden", "Скрыт"), tone: "muted", actionLabel: text("Review", "Проверить") },
    { key: "rentals", stateLabel: text("Hidden", "Скрыт"), tone: "muted", actionLabel: text("Review", "Проверить") }
  ],
  test: [
    { key: "bank", stateLabel: text("Test", "Тест"), tone: "info", actionLabel: text("Open", "Открыть") },
    { key: "social", stateLabel: text("Test", "Тест"), tone: "positive", actionLabel: text("Open", "Открыть") },
    { key: "weather", stateLabel: text("Test", "Тест"), tone: "info", actionLabel: text("Open", "Открыть") },
    { key: "sessions", stateLabel: text("Test", "Тест"), tone: "positive", actionLabel: text("Open", "Открыть") },
    { key: "radio", stateLabel: text("Review", "Проверка"), tone: "warning", actionLabel: text("Review", "Проверить") },
    { key: "rentals", stateLabel: text("Test", "Тест"), tone: "info", actionLabel: text("Open", "Открыть") }
  ]
};

function buildModules(locale: Locale, setKey: ModuleSetKey): DashboardModule[] {
  return moduleSets[setKey].map((item) => ({
    ...moduleCatalog[item.key],
    description: pick(locale, moduleCatalog[item.key].description),
    stateLabel: pick(locale, item.stateLabel),
    tone: item.tone,
    actionLabel: pick(locale, item.actionLabel)
  }));
}

function mapIdentityField(locale: Locale, item: LocalizedIdentityField): DashboardIdentityField {
  return {
    label: pick(locale, item.label),
    value: pick(locale, item.value)
  };
}

function mapStatusItem(locale: Locale, item: LocalizedStatusItem): DashboardStatusItem {
  return {
    label: pick(locale, item.label),
    value: pick(locale, item.value),
    note: pick(locale, item.note),
    tone: item.tone
  };
}

function mapNotice(locale: Locale, item: LocalizedNotice): DashboardNotice {
  return {
    title: pick(locale, item.title),
    detail: pick(locale, item.detail),
    time: pick(locale, item.time)
  };
}

function mapSettingGroup(locale: Locale, item: LocalizedSettingGroup): DashboardSettingGroup {
  return {
    label: pick(locale, item.label),
    value: pick(locale, item.value),
    note: pick(locale, item.note)
  };
}

function mapBrandAsset(locale: Locale, item: LocalizedBrandAsset): DashboardBrandAsset {
  return {
    label: pick(locale, item.label),
    value: pick(locale, item.value),
    note: pick(locale, item.note)
  };
}

function mapEntitlement(locale: Locale, item: LocalizedEntitlement): DashboardEntitlement {
  return {
    label: pick(locale, item.label),
    value: pick(locale, item.value),
    tone: item.tone
  };
}

function mapStatusGroup(locale: Locale, item: LocalizedStatusGroup): DashboardStatusGroup {
  return {
    key: item.key,
    title: pick(locale, item.title),
    items: item.items.map((status) => mapStatusItem(locale, status))
  };
}

const serverSeeds: DashboardServerSeed[] = [
  {
    id: "crown-main",
    name: text("CROWN Main", "CROWN Main"),
    iconLabel: "CM",
    accent: "#d2c7b0",
    state: "connected",
    description: text(
      "Primary server with full module coverage and steady daily operations.",
      "Основной сервер с полным набором модулей и стабильным рабочим контуром."
    ),
    environment: text("Production", "Рабочая"),
    region: text("EU Central", "Центральная Европа"),
    members: "18,240",
    plan: text("Full", "Полный"),
    syncNote: text("Updated 2 minutes ago", "Обновлено 2 минуты назад"),
    moduleSet: "production",
    overview: {
      identity: [
        { label: text("Server", "Сервер"), value: text("CROWN Main", "CROWN Main") },
        { label: text("Plan", "План"), value: text("Full", "Полный") },
        { label: text("Environment", "Среда"), value: text("Production", "Рабочая") },
        { label: text("Region", "Регион"), value: text("EU Central", "Центральная Европа") }
      ],
      systemStatus: [
        {
          label: text("Bot core", "Ядро бота"),
          value: text("Connected", "Подключено"),
          note: text("The current preview snapshot is available.", "Доступен актуальный снимок предпросмотра."),
          tone: "positive"
        },
        {
          label: text("Dashboard", "Панель"),
          value: text("Ready", "Готов"),
          note: text("The workspace is available on all pages.", "Рабочее пространство доступно на всех страницах."),
          tone: "info"
        },
        {
          label: text("Permissions", "Доступ"),
          value: text("Limited", "Ограничено"),
          note: text("Write actions are not enabled in this pass.", "Действия с записью в этот проход не входят."),
          tone: "muted"
        }
      ],
      notices: [
        {
          title: text("Branding profile updated", "Профиль брендинга обновлен"),
          detail: text("Identity fields were aligned with the current preset.", "Поля идентичности выровнены под текущий профиль."),
          time: text("14m ago", "14 мин назад")
        },
        {
          title: text("Radio remains under review", "Radio остается на проверке"),
          detail: text("The module stays visible with limited attention.", "Модуль остается доступным в сдержанном режиме."),
          time: text("Today", "Сегодня")
        }
      ]
    },
    settings: [
      {
        label: text("Localization", "Локализация"),
        value: text("English primary, Russian secondary", "Английский основной, русский дополнительный"),
        note: text("Routes follow the selected locale.", "Маршруты следуют выбранной локали.")
      },
      {
        label: text("Admin role", "Роль администрации"),
        value: text("CROWN Council", "CROWN Council"),
        note: text("Shown as the primary server role.", "Показана как основная роль сервера.")
      },
      {
        label: text("Enabled modules", "Подключенные модули"),
        value: text("Bank, Social, Weather, Sessions, Rentals", "Bank, Social, Weather, Sessions, Rentals"),
        note: text("Radio remains available for review.", "Radio остается доступным для проверки.")
      },
      {
        label: text("Access", "Доступ"),
        value: text("Three admin seats", "Три административных места"),
        note: text("Permissions remain visible in preview mode.", "Права доступа остаются в режиме предпросмотра.")
      }
    ],
    branding: {
      assets: [
        {
          label: text("Logo", "Логотип"),
          value: text("Available", "Загружен"),
          note: text("Shown in the current preview slot.", "Показан в текущем слоте предпросмотра.")
        },
        {
          label: text("Banner", "Баннер"),
          value: text("Available", "Загружен"),
          note: text("Stored as the active wide asset.", "Сохранен как основной широкий материал.")
        },
        {
          label: text("Accent color", "Акцентный цвет"),
          value: text("Graphite / warm silver", "Графит / теплое серебро"),
          note: text("Used across the current dashboard view.", "Используется в текущем виде панели.")
        }
      ],
      fields: [
        { label: text("Display name", "Отображаемое имя"), value: text("CROWN Main District", "CROWN Main District") },
        { label: text("Tagline", "Короткое описание"), value: text("Structured city economy and roleplay utilities", "Структурированная городская экономика и ролевые инструменты") },
        { label: text("Footer line", "Нижняя подпись"), value: text("Managed through the CROWN dashboard", "Управляется через панель CROWN") }
      ],
      note: text("Assets and naming stay in preview mode.", "Материалы и названия остаются в режиме предпросмотра.")
    },
    licenses: {
      currentPlan: text("Full", "Полный"),
      availableLevel: text("Expanded branding and module access", "Расширенный брендинг и доступ к модулям"),
      entitlementSummary: text("Includes full branding access and the main module set.", "Включает полный доступ к брендингу и основному набору модулей."),
      entitlements: [
        { label: text("Branding", "Брендинг"), value: text("Included", "Включено"), tone: "positive" },
        { label: text("Module management", "Управление модулями"), value: text("Included", "Включено"), tone: "positive" },
        { label: text("Live sync", "Онлайн-синхронизация"), value: text("Not included", "Не входит"), tone: "muted" }
      ]
    },
    status: [
      {
        key: "core",
        title: text("Core", "Ядро"),
        items: [
          {
            label: text("Bot core", "Ядро бота"),
            value: text("Healthy", "Норма"),
            note: text("The preview environment is stable.", "Среда предпросмотра работает стабильно."),
            tone: "positive"
          },
          {
            label: text("Command routing", "Маршрутизация команд"),
            value: text("Stable", "Стабильно"),
            note: text("The current route map is loaded.", "Текущая карта маршрутов загружена."),
            tone: "info"
          }
        ]
      },
      {
        key: "dashboard",
        title: text("Dashboard", "Панель"),
        items: [
          {
            label: text("App shell", "Оболочка"),
            value: text("Ready", "Готово"),
            note: text("The shared layout is active.", "Общая оболочка активна."),
            tone: "positive"
          },
          {
            label: text("Authentication", "Авторизация"),
            value: text("Deferred", "Позже"),
            note: text("Reserved for a later pass.", "Оставлено на следующий проход."),
            tone: "warning"
          }
        ]
      },
      {
        key: "modules",
        title: text("Modules", "Модули"),
        items: [
          {
            label: text("Primary set", "Основной набор"),
            value: text("Available", "Доступен"),
            note: text("Core modules are shown in the workspace.", "Ключевые модули показаны в рабочем пространстве."),
            tone: "positive"
          },
          {
            label: text("Radio", "Radio"),
            value: text("Review", "Проверка"),
            note: text("The module remains visible with limited emphasis.", "Модуль остается видимым без лишнего акцента."),
            tone: "warning"
          }
        ]
      },
      {
        key: "integrations",
        title: text("Integrations", "Интеграции"),
        items: [
          {
            label: text("External sync", "Внешняя синхронизация"),
            value: text("Inactive", "Неактивна"),
            note: text("No external connections are used in this pass.", "В этом проходе внешние подключения не используются."),
            tone: "muted"
          },
          {
            label: text("Exports", "Экспорт"),
            value: text("Inactive", "Неактивен"),
            note: text("Export flows are outside the current scope.", "Сценарии экспорта остаются вне текущего объема."),
            tone: "muted"
          }
        ]
      }
    ]
  },
  {
    id: "night-arcade",
    name: text("Night Arcade", "Night Arcade"),
    iconLabel: "NA",
    accent: "#d6d1c6",
    state: "invite",
    description: text("Server waiting for first connection and initial setup.", "Сервер ожидает первое подключение и начальную настройку."),
    environment: text("Setup", "Подготовка"),
    region: text("US East", "Восток США"),
    members: "3,420",
    plan: text("Free", "Базовый"),
    syncNote: text("Waiting for first connection", "Ожидает первое подключение"),
    moduleSet: "setup",
    overview: {
      identity: [
        { label: text("Server", "Сервер"), value: text("Night Arcade", "Night Arcade") },
        { label: text("Plan", "План"), value: text("Free", "Базовый") },
        { label: text("Environment", "Среда"), value: text("Setup", "Подготовка") },
        { label: text("Region", "Регион"), value: text("US East", "Восток США") }
      ],
      systemStatus: [
        {
          label: text("Bot core", "Ядро бота"),
          value: text("Setup required", "Требуется подключение"),
          note: text("The workspace is available before connection.", "Рабочее пространство доступно до подключения."),
          tone: "warning"
        },
        {
          label: text("Dashboard", "Панель"),
          value: text("Ready", "Готов"),
          note: text("Initial configuration can begin now.", "Начальную настройку можно начать уже сейчас."),
          tone: "info"
        },
        {
          label: text("Permissions", "Доступ"),
          value: text("Pending", "Ожидается"),
          note: text("Access rules are shown as part of setup.", "Правила доступа показаны как часть настройки."),
          tone: "muted"
        }
      ],
      notices: [
        {
          title: text("Connection pending", "Подключение ожидается"),
          detail: text("The server is ready for the first invite step.", "Сервер готов к первому шагу подключения."),
          time: text("Now", "Сейчас")
        },
        {
          title: text("Starter modules prepared", "Стартовые модули подготовлены"),
          detail: text("Bank, Social, and Weather are already available.", "Bank, Social и Weather уже доступны."),
          time: text("Today", "Сегодня")
        }
      ]
    },
    settings: [
      {
        label: text("Localization", "Локализация"),
        value: text("English at launch", "Английский на запуске"),
        note: text("A second locale can be added later.", "Вторую локаль можно добавить позже.")
      },
      {
        label: text("Admin role", "Роль администрации"),
        value: text("Night Leads", "Night Leads"),
        note: text("Shown as the primary setup role.", "Показана как основная роль этапа настройки.")
      },
      {
        label: text("Enabled modules", "Подключенные модули"),
        value: text("Bank, Social, Weather", "Bank, Social, Weather"),
        note: text("The starter set is ready for the first pass.", "Стартовый набор готов к первому проходу.")
      },
      {
        label: text("Access", "Доступ"),
        value: text("Initial access groups", "Начальные группы доступа"),
        note: text("The server remains in setup mode.", "Сервер остается в режиме настройки.")
      }
    ],
    branding: {
      assets: [
        {
          label: text("Logo", "Логотип"),
          value: text("Not added", "Не добавлен"),
          note: text("The initials tile is used for now.", "Пока используется иконка с инициалами.")
        },
        {
          label: text("Banner", "Баннер"),
          value: text("Not added", "Не добавлен"),
          note: text("A wide asset has not been uploaded yet.", "Широкий материал пока не загружен.")
        },
        {
          label: text("Accent color", "Акцентный цвет"),
          value: text("Default graphite", "Базовый графит"),
          note: text("A neutral palette is used during setup.", "Во время настройки используется нейтральная палитра.")
        }
      ],
      fields: [
        { label: text("Display name", "Отображаемое имя"), value: text("Night Arcade", "Night Arcade") },
        { label: text("Tagline", "Короткое описание"), value: text("Late-night events with structured tools", "Ночные события и структурированные инструменты") },
        { label: text("Footer line", "Нижняя подпись"), value: text("Invite CROWN to unlock the full workspace", "Подключите CROWN, чтобы открыть полное рабочее пространство") }
      ],
      note: text("Brand assets stay minimal until the first connection.", "Брендинг остается минимальным до первого подключения.")
    },
    licenses: {
      currentPlan: text("Free", "Базовый"),
      availableLevel: text("Expanded modules and branding", "Расширенные модули и брендинг"),
      entitlementSummary: text("The current plan covers the starter shell and basic modules.", "Текущий план покрывает стартовую оболочку и базовые модули."),
      entitlements: [
        { label: text("Core workspace", "Базовая оболочка"), value: text("Included", "Включено"), tone: "positive" },
        { label: text("Advanced branding", "Расширенный брендинг"), value: text("Available later", "Доступно позже"), tone: "info" },
        { label: text("Live sync", "Онлайн-синхронизация"), value: text("Not included", "Не входит"), tone: "muted" }
      ]
    },
    status: [
      {
        key: "core",
        title: text("Core", "Ядро"),
        items: [
          {
            label: text("Bot core", "Ядро бота"),
            value: text("Setup pending", "Ожидает настройки"),
            note: text("The first install step has not been completed.", "Первый шаг подключения еще не выполнен."),
            tone: "warning"
          },
          {
            label: text("Command routing", "Маршрутизация команд"),
            value: text("Waiting", "Ожидает"),
            note: text("Routes will appear after connection.", "Маршруты появятся после подключения."),
            tone: "muted"
          }
        ]
      },
      {
        key: "dashboard",
        title: text("Dashboard", "Панель"),
        items: [
          {
            label: text("App shell", "Оболочка"),
            value: text("Ready", "Готово"),
            note: text("Pages are available before launch.", "Страницы доступны еще до запуска."),
            tone: "positive"
          },
          {
            label: text("Authentication", "Авторизация"),
            value: text("Deferred", "Позже"),
            note: text("Reserved for a later pass.", "Оставлено на следующий проход."),
            tone: "muted"
          }
        ]
      },
      {
        key: "modules",
        title: text("Modules", "Модули"),
        items: [
          {
            label: text("Starter set", "Стартовый набор"),
            value: text("Ready", "Готов"),
            note: text("Core modules are prepared for setup.", "Основные модули подготовлены к настройке."),
            tone: "info"
          },
          {
            label: text("Extended set", "Расширенный набор"),
            value: text("Limited", "Ограничен"),
            note: text("Additional modules remain outside the starter plan.", "Дополнительные модули пока не входят в стартовый план."),
            tone: "warning"
          }
        ]
      },
      {
        key: "integrations",
        title: text("Integrations", "Интеграции"),
        items: [
          {
            label: text("External sync", "Внешняя синхронизация"),
            value: text("Inactive", "Неактивна"),
            note: text("No external connections are active yet.", "Внешние подключения пока не активны."),
            tone: "muted"
          },
          {
            label: text("Exports", "Экспорт"),
            value: text("Inactive", "Неактивен"),
            note: text("Export flows are not part of setup.", "Сценарии экспорта не входят в этап настройки."),
            tone: "muted"
          }
        ]
      }
    ]
  },
  {
    id: "archive-station",
    name: text("Archive Station", "Archive Station"),
    iconLabel: "AS",
    accent: "#c7c9ce",
    state: "inactive",
    description: text("Reference server kept for review and migration planning.", "Справочный сервер для просмотра и подготовки миграции."),
    environment: text("Archive", "Архив"),
    region: text("EU West", "Западная Европа"),
    members: "7,118",
    plan: text("Legacy", "Legacy"),
    syncNote: text("Archived on January 12", "Архив от 12 января"),
    moduleSet: "archive",
    overview: {
      identity: [
        { label: text("Server", "Сервер"), value: text("Archive Station", "Archive Station") },
        { label: text("Plan", "План"), value: text("Legacy", "Legacy") },
        { label: text("Environment", "Среда"), value: text("Archive", "Архив") },
        { label: text("Region", "Регион"), value: text("EU West", "Западная Европа") }
      ],
      systemStatus: [
        {
          label: text("Bot core", "Ядро бота"),
          value: text("Offline", "Отключено"),
          note: text("Shown as a reference state only.", "Показано только как справочное состояние."),
          tone: "muted"
        },
        {
          label: text("Dashboard", "Панель"),
          value: text("Read-only", "Только просмотр"),
          note: text("The server stays available for quiet review.", "Сервер остается доступным для спокойного просмотра."),
          tone: "info"
        },
        {
          label: text("Permissions", "Доступ"),
          value: text("Frozen", "Заморожено"),
          note: text("No active change path is expected.", "Активный сценарий изменений не предполагается."),
          tone: "muted"
        }
      ],
      notices: [
        {
          title: text("Archive preserved", "Архив сохранен"),
          detail: text("The server remains available as a reference snapshot.", "Сервер остается доступным как справочный снимок."),
          time: text("This month", "В этом месяце")
        },
        {
          title: text("Editing is disabled", "Редактирование отключено"),
          detail: text("The page stays informational only.", "Страница остается только информационной."),
          time: text("Static", "Статично")
        }
      ]
    },
    settings: [
      {
        label: text("Localization", "Локализация"),
        value: text("Legacy RU, EN notes", "Legacy RU и EN-заметки"),
        note: text("Kept as part of the original archive snapshot.", "Сохранено как часть исходного архивного снимка.")
      },
      {
        label: text("Admin role", "Роль администрации"),
        value: text("Archive Custodian", "Archive Custodian"),
        note: text("Shown as the archive reviewer role.", "Показана как роль архивного просмотра.")
      },
      {
        label: text("Enabled modules", "Подключенные модули"),
        value: text("Bank, Social", "Bank, Social"),
        note: text("Visible for reference only.", "Показаны только для справки.")
      },
      {
        label: text("Access", "Доступ"),
        value: text("Frozen", "Заморожен"),
        note: text("No edit path is planned for this server.", "Для этого сервера не планируется сценарий редактирования.")
      }
    ],
    branding: {
      assets: [
        {
          label: text("Logo", "Логотип"),
          value: text("Retained", "Сохранен"),
          note: text("Shown as part of the archive record.", "Показан как часть архивной записи.")
        },
        {
          label: text("Banner", "Баннер"),
          value: text("Not used", "Не используется"),
          note: text("No active wide asset remains.", "Активный широкий материал не используется.")
        },
        {
          label: text("Accent color", "Акцентный цвет"),
          value: text("Muted neutral", "Спокойный нейтральный"),
          note: text("Preserved for visual context.", "Сохранен для визуального контекста.")
        }
      ],
      fields: [
        { label: text("Display name", "Отображаемое имя"), value: text("Archive Station", "Archive Station") },
        { label: text("Tagline", "Короткое описание"), value: text("Reference workspace for legacy state", "Справочное пространство для legacy-состояния") },
        { label: text("Footer line", "Нижняя подпись"), value: text("Archived configuration snapshot", "Архивный снимок конфигурации") }
      ],
      note: text("Brand context is kept for reference.", "Контекст брендинга сохранен для справки.")
    },
    licenses: {
      currentPlan: text("Legacy", "Legacy"),
      availableLevel: text("Reference access only", "Только справочный доступ"),
      entitlementSummary: text("The route stays informational and avoids upgrade prompts.", "Раздел остается информационным и не подталкивает к апгрейду."),
      entitlements: [
        { label: text("Archive visibility", "Видимость архива"), value: text("Included", "Включено"), tone: "positive" },
        { label: text("Upgrade prompts", "Подсказки по апгрейду"), value: text("Disabled", "Отключены"), tone: "muted" },
        { label: text("Live sync", "Онлайн-синхронизация"), value: text("Removed", "Отключена"), tone: "muted" }
      ]
    },
    status: [
      {
        key: "core",
        title: text("Core", "Ядро"),
        items: [
          {
            label: text("Bot core", "Ядро бота"),
            value: text("Offline", "Отключено"),
            note: text("Shown as archive reference data.", "Показано как архивные справочные данные."),
            tone: "muted"
          },
          {
            label: text("Command routing", "Маршрутизация команд"),
            value: text("Retired", "Выведено"),
            note: text("Active routing is no longer maintained.", "Активная маршрутизация больше не поддерживается."),
            tone: "muted"
          }
        ]
      },
      {
        key: "dashboard",
        title: text("Dashboard", "Панель"),
        items: [
          {
            label: text("App shell", "Оболочка"),
            value: text("Read-only", "Только просмотр"),
            note: text("Kept for historical review.", "Сохранена для исторического просмотра."),
            tone: "info"
          },
          {
            label: text("Editing", "Редактирование"),
            value: text("Disabled", "Отключено"),
            note: text("No live action path remains.", "Активный сценарий действий отсутствует."),
            tone: "warning"
          }
        ]
      },
      {
        key: "modules",
        title: text("Modules", "Модули"),
        items: [
          {
            label: text("Archive set", "Архивный набор"),
            value: text("Visible", "Показан"),
            note: text("The retained modules stay available for reference.", "Сохраненные модули остаются доступными для справки."),
            tone: "info"
          },
          {
            label: text("Inactive modules", "Неактивные модули"),
            value: text("Hidden", "Скрыты"),
            note: text("The rest of the set stays out of view.", "Остальная часть набора скрыта из основного вида."),
            tone: "muted"
          }
        ]
      },
      {
        key: "integrations",
        title: text("Integrations", "Интеграции"),
        items: [
          {
            label: text("External sync", "Внешняя синхронизация"),
            value: text("Removed", "Отключена"),
            note: text("External connections were retired with the archive.", "Внешние подключения были сняты вместе с архивированием."),
            tone: "muted"
          },
          {
            label: text("Exports", "Экспорт"),
            value: text("Removed", "Отключен"),
            note: text("Export flows are no longer used here.", "Сценарии экспорта здесь больше не используются."),
            tone: "muted"
          }
        ]
      }
    ]
  },
  {
    id: "sandbox-labs",
    name: text("Sandbox Labs", "Sandbox Labs"),
    iconLabel: "SL",
    accent: "#d0d4db",
    state: "test",
    description: text("Internal server for layout, copy, and state checks.", "Внутренний сервер для проверки верстки, текста и состояний."),
    environment: text("Test", "Тестовая"),
    region: text("Internal", "Внутренняя"),
    members: "186",
    plan: text("Internal", "Внутренний"),
    syncNote: text("Refreshed at build time", "Обновляется при сборке"),
    moduleSet: "test",
    overview: {
      identity: [
        { label: text("Server", "Сервер"), value: text("Sandbox Labs", "Sandbox Labs") },
        { label: text("Plan", "План"), value: text("Internal", "Внутренний") },
        { label: text("Environment", "Среда"), value: text("Test", "Тестовая") },
        { label: text("Region", "Регион"), value: text("Internal", "Внутренняя") }
      ],
      systemStatus: [
        {
          label: text("Bot core", "Ядро бота"),
          value: text("Sandbox", "Тестовая среда"),
          note: text("Used to validate interface states.", "Используется для проверки состояний интерфейса."),
          tone: "info"
        },
        {
          label: text("Dashboard", "Панель"),
          value: text("Review", "Проверка"),
          note: text("Used for copy and spacing review.", "Используется для проверки текста и отступов."),
          tone: "positive"
        },
        {
          label: text("Permissions", "Доступ"),
          value: text("Local", "Локально"),
          note: text("No external checks are applied.", "Внешние проверки не применяются."),
          tone: "muted"
        }
      ],
      notices: [
        {
          title: text("Drawer states checked", "Состояния меню проверены"),
          detail: text("Mobile and tablet navigation are reviewed here.", "Здесь проверяются мобильная и планшетная навигация."),
          time: text("Today", "Сегодня")
        },
        {
          title: text("Status copy simplified", "Тексты статуса упрощены"),
          detail: text("System notes were tightened for easier scanning.", "Системные заметки сокращены для более быстрого чтения."),
          time: text("Today", "Сегодня")
        }
      ]
    },
    settings: [
      {
        label: text("Localization", "Локализация"),
        value: text("English and Russian", "Русский и английский"),
        note: text("Used to verify both dashboard locales.", "Используется для проверки обеих локалей панели.")
      },
      {
        label: text("Admin role", "Роль администрации"),
        value: text("QA Operators", "QA Operators"),
        note: text("Shown as the review role.", "Показана как роль для проверки.")
      },
      {
        label: text("Enabled modules", "Подключенные модули"),
        value: text("All modules visible", "Все модули видимы"),
        note: text("Used to cover the full page set.", "Используется для покрытия полного набора страниц.")
      },
      {
        label: text("Access", "Доступ"),
        value: text("Internal review", "Внутренняя проверка"),
        note: text("The server is limited to workspace review.", "Сервер ограничен сценарием внутреннего просмотра.")
      }
    ],
    branding: {
      assets: [
        {
          label: text("Logo", "Логотип"),
          value: text("Preview asset", "Тестовый материал"),
          note: text("Used for layout checks.", "Используется для проверки верстки.")
        },
        {
          label: text("Banner", "Баннер"),
          value: text("Preview asset", "Тестовый материал"),
          note: text("Shown only inside the preview surface.", "Показывается только внутри поверхности предпросмотра.")
        },
        {
          label: text("Accent color", "Акцентный цвет"),
          value: text("Neutral graphite", "Нейтральный графит"),
          note: text("Used for contrast and spacing checks.", "Используется для проверки контраста и отступов.")
        }
      ],
      fields: [
        { label: text("Display name", "Отображаемое имя"), value: text("Sandbox Labs", "Sandbox Labs") },
        { label: text("Tagline", "Короткое описание"), value: text("Internal preview surface for the dashboard", "Внутренняя поверхность предпросмотра для панели") },
        { label: text("Footer line", "Нижняя подпись"), value: text("Internal review content", "Контент для внутренней проверки") }
      ],
      note: text("This server keeps the dashboard honest under test content.", "Этот сервер нужен для проверки панели на тестовом контенте.")
    },
    licenses: {
      currentPlan: text("Internal", "Внутренний"),
      availableLevel: text("Full workspace access", "Полный доступ к панели"),
      entitlementSummary: text("Internal mode exposes every page for review.", "Внутренний режим открывает все страницы для проверки."),
      entitlements: [
        { label: text("All pages", "Все страницы"), value: text("Included", "Включено"), tone: "positive" },
        { label: text("Test states", "Тестовые состояния"), value: text("Included", "Включено"), tone: "positive" },
        { label: text("External sync", "Внешняя синхронизация"), value: text("Not included", "Не входит"), tone: "muted" }
      ]
    },
    status: [
      {
        key: "core",
        title: text("Core", "Ядро"),
        items: [
          {
            label: text("Bot core", "Ядро бота"),
            value: text("Stable", "Стабильно"),
            note: text("Used as a controlled preview state.", "Используется как контролируемое состояние предпросмотра."),
            tone: "positive"
          },
          {
            label: text("Command routing", "Маршрутизация команд"),
            value: text("Test path", "Тестовый маршрут"),
            note: text("Keeps edge cases visible in review.", "Сохраняет пограничные сценарии видимыми при проверке."),
            tone: "info"
          }
        ]
      },
      {
        key: "dashboard",
        title: text("Dashboard", "Панель"),
        items: [
          {
            label: text("App shell", "Оболочка"),
            value: text("Review", "Проверка"),
            note: text("Primary environment for interface review.", "Основная среда для проверки интерфейса."),
            tone: "positive"
          },
          {
            label: text("Responsive menu", "Адаптивное меню"),
            value: text("Checked", "Проверено"),
            note: text("Mobile and tablet states are covered.", "Мобильные и планшетные состояния покрыты."),
            tone: "info"
          }
        ]
      },
      {
        key: "modules",
        title: text("Modules", "Модули"),
        items: [
          {
            label: text("Coverage", "Покрытие"),
            value: text("Full", "Полное"),
            note: text("All modules are visible in this server.", "На этом сервере показаны все модули."),
            tone: "positive"
          },
          {
            label: text("Warning state", "Предупреждение"),
            value: text("Visible", "Показано"),
            note: text("Radio keeps the review state visible.", "Radio сохраняет видимое состояние проверки."),
            tone: "warning"
          }
        ]
      },
      {
        key: "integrations",
        title: text("Integrations", "Интеграции"),
        items: [
          {
            label: text("External sync", "Внешняя синхронизация"),
            value: text("Inactive", "Неактивна"),
            note: text("No external connections are used here.", "Внешние подключения здесь не используются."),
            tone: "muted"
          },
          {
            label: text("Exports", "Экспорт"),
            value: text("Inactive", "Неактивен"),
            note: text("Export flows remain outside the test pass.", "Сценарии экспорта остаются вне тестового прохода."),
            tone: "muted"
          }
        ]
      }
    ]
  }
];

function materializeServer(locale: Locale, seed: DashboardServerSeed): DashboardServer {
  const modules = buildModules(locale, seed.moduleSet);

  return {
    id: seed.id,
    name: pick(locale, seed.name),
    iconLabel: seed.iconLabel,
    iconUrl: "",
    accent: seed.accent,
    state: seed.state,
    description: pick(locale, seed.description),
    environment: pick(locale, seed.environment),
    region: pick(locale, seed.region),
    members: seed.members,
    plan: pick(locale, seed.plan),
    syncNote: pick(locale, seed.syncNote),
    overview: {
      identity: seed.overview.identity.map((item) => mapIdentityField(locale, item)),
      systemStatus: seed.overview.systemStatus.map((item) => mapStatusItem(locale, item)),
      moduleSummary: modules,
      notices: seed.overview.notices.map((item) => mapNotice(locale, item))
    },
    settings: seed.settings.map((item) => mapSettingGroup(locale, item)),
    modules,
    branding: {
      assets: seed.branding.assets.map((item) => mapBrandAsset(locale, item)),
      fields: seed.branding.fields.map((item) => mapIdentityField(locale, item)),
      note: pick(locale, seed.branding.note)
    },
    licenses: {
      currentPlan: pick(locale, seed.licenses.currentPlan),
      availableLevel: pick(locale, seed.licenses.availableLevel),
      entitlementSummary: pick(locale, seed.licenses.entitlementSummary),
      entitlements: seed.licenses.entitlements.map((item) => mapEntitlement(locale, item))
    },
    status: seed.status.map((item) => mapStatusGroup(locale, item))
  };
}

export function getDashboardServerIds(): string[] {
  return serverSeeds.map((server) => server.id);
}

export function getDashboardServers(locale: Locale = "en"): DashboardServer[] {
  return serverSeeds.map((server) => materializeServer(locale, server));
}

export function getDashboardServer(id: string, locale: Locale = "en"): DashboardServer | null {
  const server = serverSeeds.find((item) => item.id === id);
  return server ? materializeServer(locale, server) : null;
}

