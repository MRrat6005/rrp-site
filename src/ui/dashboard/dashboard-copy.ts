import type { Locale } from "@/config/site.config";
import type { DashboardAccessLevel, DashboardPageKey, DashboardServerState, DashboardTone } from "@/lib/dashboard-model";

const dashboardCopy = {
  en: {
    brand: "CROWN Dashboard",
    subtitle: "Server workspace",
    nav: {
      servers: "Servers",
      overview: "Overview",
      general: "General",
      access: "Access",
      localization: "Localization",
      branding: "Branding",
      license: "License",
      status: "Status"
    },
    descriptions: {
      servers: "Select a server to open its workspace.",
      overview: "Identity, health, license, and a compact server summary.",
      general: "Normalized server identity and dashboard flags from backend settings.",
      access: "Owner and admin policies, role groups, and write gates from backend settings.",
      localization: "Timezone, locale chain, and supported locales from backend settings.",
      branding: "Module-based branding catalog. No server-wide branding editor.",
      license: "License summary and visible entitlements.",
      status: "Backend, bot, and workspace signals in one view."
    },
    sidebar: {
      publicSite: "Public site",
      shellState: "Workspace state",
      mockMode: "Preview mode",
      menu: "Menu",
      close: "Close",
      closeMenu: "Close menu"
    },
    access: {
      owner: "Owner",
      admin: "Admin",
      none: "Locked"
    },
    runtime: {
      loadingTitle: "Loading workspace",
      loading: "Loading live data.",
      fallback: "Live data is unavailable right now. Showing preview data.",
      selectServerTitle: "Select a server",
      selectServerBody: "Open a server from the list to load its workspace.",
      lockedTitle: "Access is locked",
      lockedBody: "This server remains visible in your workspace, but detailed dashboard surfaces are locked for this account.",
      unavailableTitle: "Live data unavailable",
      unavailableBody: "This dashboard view could not be loaded right now."
    },
    servers: {
      searchPlaceholder: "Search servers",
      emptyTitle: "No servers yet",
      emptyBody: "Servers will appear here once the dashboard API returns them.",
      searchEmptyTitle: "No matching servers",
      searchEmptyBody: "Try another name, locale, or plan.",
      resultsLabel: "Servers",
      members: "Summary",
      region: "Region",
      environment: "Locale",
      plan: "Plan",
      lockedAction: "Open locked view",
      groups: {
        connected: "Active",
        invite: "Setup",
        inactive: "Archive",
        test: "Test"
      }
    },
    overview: {
      viewerLabel: "Signed in as",
      viewerFallbackName: "Discord member",
      identity: "Server details",
      status: "Current state",
      modules: "Module summary",
      notices: "Recent updates",
      emptyTitle: "Overview is empty",
      emptyBody: "No overview data is available for this server yet."
    },
    general: {
      title: "General",
      noteTitle: "Backend summary",
      note: "Normalized fields from settings.general are shown here in read-only form.",
      emptyTitle: "No general data yet",
      emptyBody: "General server data will appear here when the backend returns it."
    },
    accessPage: {
      title: "Access",
      noteTitle: "Policies",
      note: "Owner and admin policies are shown directly from settings.access without write flows.",
      emptyTitle: "No access data yet",
      emptyBody: "Access details will appear here when the backend returns them."
    },
    localizationPage: {
      title: "Localization",
      noteTitle: "Locale chain",
      note: "Timezone and locale fields are shown directly from settings.localization.",
      emptyTitle: "No localization data yet",
      emptyBody: "Localization details will appear here when the backend returns them."
    },
    branding: {
      title: "Branding modules",
      note: "Branding remains module-based. Server-wide branding stays out of scope.",
      emptyTitle: "No branding modules yet",
      emptyBody: "Module categories will appear here when the backend returns them."
    },
    licenses: {
      current: "Current plan",
      available: "Available access",
      summary: "Access summary",
      emptyTitle: "No license data yet",
      emptyBody: "License details will appear here when the backend returns them."
    },
    status: {
      note: "Current service signals for this server.",
      emptyTitle: "No status signals yet",
      emptyBody: "Status groups will appear here when the backend returns them."
    }
  },
  ru: {
    brand: "CROWN Dashboard",
    subtitle: "Панель сервера",
    nav: {
      servers: "Серверы",
      overview: "Обзор",
      general: "General",
      access: "Access",
      localization: "Localization",
      branding: "Branding",
      license: "License",
      status: "Status"
    },
    descriptions: {
      servers: "Выберите сервер, чтобы открыть его рабочее пространство.",
      overview: "Идентичность, состояние, лицензия и краткая серверная сводка.",
      general: "Нормализованные server identity и dashboard-флаги из backend settings.",
      access: "Owner/admin policies, role groups и write-gates из backend settings.",
      localization: "Timezone, locale chain и supported locales из backend settings.",
      branding: "Модульный branding-каталог. Без server-wide branding editor.",
      license: "Сводка лицензии и видимые права доступа.",
      status: "Сигналы backend, bot и workspace в одном месте."
    },
    sidebar: {
      publicSite: "Публичный сайт",
      shellState: "Состояние",
      mockMode: "Режим предпросмотра",
      menu: "Меню",
      close: "Закрыть",
      closeMenu: "Закрыть меню"
    },
    access: {
      owner: "Владелец",
      admin: "Админ",
      none: "Закрыт"
    },
    runtime: {
      loadingTitle: "Загрузка workspace",
      loading: "Загрузка живых данных.",
      fallback: "Живые данные сейчас недоступны. Показан режим предпросмотра.",
      selectServerTitle: "Выберите сервер",
      selectServerBody: "Откройте сервер из списка, чтобы загрузить его workspace.",
      lockedTitle: "Доступ закрыт",
      lockedBody: "Этот сервер остается видимым в workspace, но детальные dashboard-поверхности закрыты для этой учетной записи.",
      unavailableTitle: "Живые данные недоступны",
      unavailableBody: "Сейчас не удалось загрузить это представление панели."
    },
    servers: {
      searchPlaceholder: "Поиск серверов",
      emptyTitle: "Серверов пока нет",
      emptyBody: "Серверы появятся здесь, когда dashboard API вернет данные.",
      searchEmptyTitle: "Подходящие серверы не найдены",
      searchEmptyBody: "Попробуйте другое имя, локаль или план.",
      resultsLabel: "Серверы",
      members: "Сводка",
      region: "Регион",
      environment: "Локаль",
      plan: "План",
      lockedAction: "Открыть locked view",
      groups: {
        connected: "Активные",
        invite: "Подключение",
        inactive: "Архив",
        test: "Тест"
      }
    },
    overview: {
      viewerLabel: "Вы вошли как",
      viewerFallbackName: "Участник Discord",
      identity: "Данные сервера",
      status: "Текущее состояние",
      modules: "Сводка модулей",
      notices: "Последние обновления",
      emptyTitle: "Обзор пока пуст",
      emptyBody: "Для этого сервера пока нет данных обзора."
    },
    general: {
      title: "General",
      noteTitle: "Backend summary",
      note: "Здесь в read-only виде показаны нормализованные поля из settings.general.",
      emptyTitle: "Данных General пока нет",
      emptyBody: "Базовые данные сервера появятся здесь, когда backend их вернет."
    },
    accessPage: {
      title: "Access",
      noteTitle: "Policies",
      note: "Owner/admin policies показываются напрямую из settings.access без write-flow.",
      emptyTitle: "Данных Access пока нет",
      emptyBody: "Детали доступа появятся здесь, когда backend их вернет."
    },
    localizationPage: {
      title: "Localization",
      noteTitle: "Locale chain",
      note: "Timezone и locale-поля показываются напрямую из settings.localization.",
      emptyTitle: "Данных Localization пока нет",
      emptyBody: "Детали локализации появятся здесь, когда backend их вернет."
    },
    branding: {
      title: "Branding modules",
      note: "Branding остается модульным. Server-wide branding остается вне скоупа.",
      emptyTitle: "Branding-модулей пока нет",
      emptyBody: "Категории модулей появятся здесь, когда backend вернет данные."
    },
    licenses: {
      current: "Текущий план",
      available: "Доступные возможности",
      summary: "Сводка доступа",
      emptyTitle: "Данных лицензии пока нет",
      emptyBody: "Детали лицензии появятся здесь, когда backend их вернет."
    },
    status: {
      note: "Текущие сервисные сигналы для этого сервера.",
      emptyTitle: "Сигналов статуса пока нет",
      emptyBody: "Группы статуса появятся здесь, когда backend вернет данные."
    }
  }
} as const;

export function getDashboardCopy(locale: Locale) {
  return dashboardCopy[locale];
}

export function getDashboardStateLabel(locale: Locale, state: DashboardServerState): string {
  const labels = {
    en: { connected: "Connected", invite: "Setup", inactive: "Archive", test: "Test" },
    ru: { connected: "Подключен", invite: "Подключение", inactive: "Архив", test: "Тест" }
  } as const;
  return labels[locale][state];
}

export function getDashboardStateAction(locale: Locale, state: DashboardServerState): string {
  const labels = {
    en: { connected: "Open workspace", invite: "Continue setup", inactive: "Open archive", test: "Open test view" },
    ru: { connected: "Открыть workspace", invite: "Продолжить настройку", inactive: "Открыть архив", test: "Открыть тестовый режим" }
  } as const;
  return labels[locale][state];
}

export function getDashboardAccessLabel(locale: Locale, accessLevel: DashboardAccessLevel): string {
  return getDashboardCopy(locale).access[accessLevel];
}

export function getDashboardPageTitle(locale: Locale, key: DashboardPageKey): string {
  return getDashboardCopy(locale).nav[key];
}

export function getDashboardToneLabel(locale: Locale, tone: DashboardTone): string {
  const labels = {
    en: { positive: "Healthy", warning: "Attention", info: "Ready", muted: "Limited" },
    ru: { positive: "Норма", warning: "Внимание", info: "Готово", muted: "Ограничено" }
  } as const;
  return labels[locale][tone];
}

