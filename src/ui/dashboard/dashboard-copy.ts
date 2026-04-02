import type {
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
    servers: {
      searchPlaceholder: "Search servers",
      emptyTitle: "No matching servers",
      emptyBody: "Try another name, region, or plan.",
      resultsLabel: "Servers",
      members: "Members",
      region: "Region",
      environment: "Environment",
      plan: "Plan",
      groups: {
        connected: "Active",
        invite: "Setup",
        inactive: "Archive",
        test: "Test"
      }
    },
    overview: {
      identity: "Server details",
      status: "Current state",
      modules: "Modules",
      notices: "Recent updates"
    },
    settings: {
      title: "Server settings",
      noteTitle: "Read-only",
      note: "Settings are shown for reference in this pass.",
      detail:
        "Localization, roles, enabled modules, and access remain visible here without edit flows."
    },
    modules: {
      title: "Modules",
      note: "Module states and actions stay concise by design."
    },
    branding: {
      assets: "Assets",
      identity: "Identity",
      note: "Live sync is not part of this pass."
    },
    licenses: {
      current: "Current plan",
      available: "Available access",
      summary: "Access summary"
    },
    status: {
      note: "Status values are shown as local preview data."
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
    servers: {
      searchPlaceholder: "Поиск серверов",
      emptyTitle: "Подходящие серверы не найдены",
      emptyBody: "Попробуйте другое имя, регион или план.",
      resultsLabel: "Серверы",
      members: "Участники",
      region: "Регион",
      environment: "Среда",
      plan: "План",
      groups: {
        connected: "Активные",
        invite: "Подключение",
        inactive: "Архив",
        test: "Тест"
      }
    },
    overview: {
      identity: "Данные сервера",
      status: "Текущее состояние",
      modules: "Модули",
      notices: "Последние обновления"
    },
    settings: {
      title: "Настройки сервера",
      noteTitle: "Только просмотр",
      note: "В этом проходе настройки показаны без редактирования.",
      detail:
        "Здесь остаются видимыми локализация, роли, состав модулей и доступ, без форм записи и проверок."
    },
    modules: {
      title: "Модули",
      note: "Состояния модулей и действия показаны в коротком рабочем формате."
    },
    branding: {
      assets: "Материалы",
      identity: "Идентичность",
      note: "Синхронизация в реальном времени в этот проход не входит."
    },
    licenses: {
      current: "Текущий план",
      available: "Доступные возможности",
      summary: "Сводка доступа"
    },
    status: {
      note: "Значения статуса показаны как локальные данные предпросмотра."
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
