import type {
  DashboardAccessLevel,
  DashboardPageKey,
  DashboardServerState,
  DashboardTone
} from "@/lib/dashboard-mock";
import type { Locale } from "@/config/site.config";

const dashboardCopy = {
  en: {
    brand: "CROWN Dashboard",
    subtitle: "Server workspace",
    nav: {
      servers: "Servers",
      overview: "Overview",
      settings: "Settings",
      modules: "Modules",
      branding: "Branding",
      licenses: "Licenses",
      status: "Status"
    },
    descriptions: {
      servers: "Select a server to open its workspace.",
      overview: "Identity, current state, modules, and recent updates.",
      settings: "Core server settings and access context.",
      modules: "Module states and primary actions.",
      branding: "Identity fields and visual assets.",
      licenses: "Plan details and enabled access.",
      status: "Current service signals in one view."
    },
    sidebar: {
      allServers: "All servers",
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
      none: "No access"
    },
    runtime: {
      loadingTitle: "Loading workspace",
      loading: "Loading live data.",
      fallback: "Live data is unavailable right now. Showing preview data.",
      selectServerTitle: "Select a server",
      selectServerBody: "Open a server from the servers list to load its workspace.",
      lockedTitle: "No access",
      lockedBody:
        "This server is still visible in your workspace, but dashboard actions are locked for this account.",
      unavailableTitle: "Live data unavailable",
      unavailableBody: "This dashboard view could not be loaded right now."
    },
    servers: {
      searchPlaceholder: "Search servers",
      emptyTitle: "No servers yet",
      emptyBody: "Servers will appear here once the dashboard API returns them.",
      searchEmptyTitle: "No matching servers",
      searchEmptyBody: "Try another name, region, or plan.",
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
      modules: "Modules",
      notices: "Recent updates",
      emptyTitle: "Overview is empty",
      emptyBody: "No overview data is available for this server yet."
    },
    settings: {
      title: "Server settings",
      noteTitle: "Read-only",
      note: "Settings are shown for reference in this pass.",
      detail:
        "Localization, roles, enabled modules, and access remain visible here without edit flows.",
      emptyTitle: "No settings yet",
      emptyBody: "Settings will appear here when the backend returns them."
    },
    modules: {
      title: "Modules",
      note: "Module states and actions stay concise by design.",
      emptyTitle: "No modules yet",
      emptyBody: "Module data will appear here when the backend returns it."
    },
    branding: {
      assets: "Assets",
      identity: "Identity",
      note: "Live sync is not part of this pass.",
      emptyTitle: "No branding data yet",
      emptyBody: "Branding assets and identity fields will appear here when available."
    },
    licenses: {
      current: "Current plan",
      available: "Available access",
      summary: "Access summary",
      emptyTitle: "No license data yet",
      emptyBody: "License and entitlement details will appear here when available."
    },
    status: {
      note: "Current service signals for this server.",
      emptyTitle: "No status signals yet",
      emptyBody: "Status groups will appear here when the backend returns them."
    }
  },
  ru: {
    brand: "CROWN Dashboard",
    subtitle: "Панель серверов",
    nav: {
      servers: "Серверы",
      overview: "Обзор",
      settings: "Настройки",
      modules: "Модули",
      branding: "Брендинг",
      licenses: "Лицензии",
      status: "Статус"
    },
    descriptions: {
      servers: "Выберите сервер, чтобы открыть его рабочее пространство.",
      overview: "Данные сервера, текущее состояние, модули и последние обновления.",
      settings: "Базовые настройки сервера и контекст доступа.",
      modules: "Состояния модулей и основные действия.",
      branding: "Поля идентичности и визуальные материалы.",
      licenses: "План и доступные возможности.",
      status: "Текущие сигналы системы в одном представлении."
    },
    sidebar: {
      allServers: "Все серверы",
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
      none: "Нет доступа"
    },
    runtime: {
      loadingTitle: "Загрузка рабочего пространства",
      loading: "Загрузка живых данных.",
      fallback: "Живые данные сейчас недоступны. Показан режим предпросмотра.",
      selectServerTitle: "Выберите сервер",
      selectServerBody: "Откройте сервер из списка, чтобы загрузить его рабочее пространство.",
      lockedTitle: "Нет доступа",
      lockedBody:
        "Этот сервер остается видимым в рабочем пространстве, но действия dashboard для этой учетной записи закрыты.",
      unavailableTitle: "Живые данные недоступны",
      unavailableBody: "Сейчас не удалось загрузить это представление панели."
    },
    servers: {
      searchPlaceholder: "Поиск серверов",
      emptyTitle: "Серверов пока нет",
      emptyBody: "Серверы появятся здесь, когда dashboard API вернет данные.",
      searchEmptyTitle: "Подходящие серверы не найдены",
      searchEmptyBody: "Попробуйте другое имя, регион или план.",
      resultsLabel: "Серверы",
      members: "Сводка",
      region: "Регион",
      environment: "Локаль",
      plan: "План",
      lockedAction: "Открыть заблокированный экран",
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
      modules: "Модули",
      notices: "Последние обновления",
      emptyTitle: "Обзор пока пуст",
      emptyBody: "Для этого сервера пока нет данных обзора."
    },
    settings: {
      title: "Настройки сервера",
      noteTitle: "Только просмотр",
      note: "В этом проходе настройки показаны без редактирования.",
      detail:
        "Здесь остаются видимыми локализация, роли, состав модулей и доступ, без форм записи и проверок.",
      emptyTitle: "Настроек пока нет",
      emptyBody: "Настройки появятся здесь, когда backend вернет данные."
    },
    modules: {
      title: "Модули",
      note: "Состояния модулей и действия показаны в коротком рабочем формате.",
      emptyTitle: "Модулей пока нет",
      emptyBody: "Данные модулей появятся здесь, когда backend их вернет."
    },
    branding: {
      assets: "Материалы",
      identity: "Идентичность",
      note: "Синхронизация в реальном времени в этот проход не входит.",
      emptyTitle: "Данных брендинга пока нет",
      emptyBody: "Материалы и поля идентичности появятся здесь, когда будут доступны."
    },
    licenses: {
      current: "Текущий план",
      available: "Доступные возможности",
      summary: "Сводка доступа",
      emptyTitle: "Данных лицензий пока нет",
      emptyBody: "Лицензии и права доступа появятся здесь, когда будут доступны."
    },
    status: {
      note: "Текущие сигналы системы для этого сервера.",
      emptyTitle: "Сигналов статуса пока нет",
      emptyBody: "Группы статуса появятся здесь, когда backend вернет данные."
    }
  }
} as const;

export function getDashboardCopy(locale: Locale) {
  return dashboardCopy[locale];
}

export function getDashboardStateLabel(
  locale: Locale,
  state: DashboardServerState
): string {
  const labels = {
    en: {
      connected: "Connected",
      invite: "Setup",
      inactive: "Archive",
      test: "Test"
    },
    ru: {
      connected: "Подключен",
      invite: "Подключение",
      inactive: "Архив",
      test: "Тест"
    }
  } as const;

  return labels[locale][state];
}

export function getDashboardStateAction(
  locale: Locale,
  state: DashboardServerState
): string {
  const labels = {
    en: {
      connected: "Open workspace",
      invite: "Continue setup",
      inactive: "Open archive",
      test: "Open test view"
    },
    ru: {
      connected: "Открыть рабочее пространство",
      invite: "Продолжить настройку",
      inactive: "Открыть архив",
      test: "Открыть тестовый режим"
    }
  } as const;

  return labels[locale][state];
}

export function getDashboardAccessLabel(
  locale: Locale,
  accessLevel: DashboardAccessLevel
): string {
  return getDashboardCopy(locale).access[accessLevel];
}

export function getDashboardPageTitle(
  locale: Locale,
  key: DashboardPageKey
): string {
  return getDashboardCopy(locale).nav[key];
}

export function getDashboardToneLabel(locale: Locale, tone: DashboardTone): string {
  const labels = {
    en: {
      positive: "Healthy",
      warning: "Attention",
      info: "Ready",
      muted: "Limited"
    },
    ru: {
      positive: "Норма",
      warning: "Внимание",
      info: "Готово",
      muted: "Ограничено"
    }
  } as const;

  return labels[locale][tone];
}

