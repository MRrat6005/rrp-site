import type {
  DashboardPageKey,
  DashboardServerState,
  DashboardTone
} from "@/lib/dashboard-mock";
import type { Locale } from "@/config/site.config";

const dashboardCopy = {
  en: {
    brand: "CROWN Dashboard",
    subtitle: "Server control surface",
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
      servers: "Select a server first, then enter its dashboard.",
      overview: "Identity, short status, modules, and recent notices.",
      settings: "Core server settings kept intentionally shallow.",
      modules: "Minimal module management rows for the main feature set.",
      branding: "Sparse identity controls for visual assets and naming.",
      licenses: "Plan and entitlement structure without billing logic.",
      status: "Grouped health placeholders with a restrained system view."
    },
    sidebar: {
      allServers: "All servers",
      publicSite: "Public site",
      shellState: "Shell state",
      mockMode: "Mock data only",
      menu: "Menu"
    },
    servers: {
      searchPlaceholder: "Search servers",
      emptyTitle: "No servers found",
      emptyBody: "Try a different name, region, or plan.",
      members: "Members",
      region: "Region",
      environment: "Environment"
    },
    overview: {
      identity: "Server identity",
      status: "System status",
      modules: "Module summary",
      notices: "Recent notices"
    },
    settings: {
      title: "Core settings",
      note: "This page is structural only. No deep configuration or write flows are wired yet."
    },
    modules: {
      title: "Main modules",
      note: "Rows stay compact so the page reads like a utility panel, not a feature gallery."
    },
    branding: {
      assets: "Assets",
      identity: "Identity",
      note: "Branding stays preview-only in this pass."
    },
    licenses: {
      current: "Current plan",
      available: "Available level",
      summary: "Entitlement summary"
    },
    status: {
      note: "All system values are local placeholders."
    }
  },
  ru: {
    brand: "CROWN Dashboard",
    subtitle: "Server control surface",
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
      servers: "Сначала выберите сервер, затем войдите в его dashboard.",
      overview: "Идентичность, короткий статус, модули и недавние заметки.",
      settings: "Базовые server settings без глубокой формы.",
      modules: "Минимальный список основных модулей.",
      branding: "Сдержанные identity-поля и preview-активы.",
      licenses: "Структура плана и entitlements без billing-логики.",
      status: "Групповые health-placeholder'ы в спокойной системе."
    },
    sidebar: {
      allServers: "Все серверы",
      publicSite: "Публичный сайт",
      shellState: "Состояние shell",
      mockMode: "Только mock data",
      menu: "Меню"
    },
    servers: {
      searchPlaceholder: "Поиск серверов",
      emptyTitle: "Серверы не найдены",
      emptyBody: "Попробуйте другое имя, регион или план.",
      members: "Участники",
      region: "Регион",
      environment: "Среда"
    },
    overview: {
      identity: "Идентичность сервера",
      status: "Системный статус",
      modules: "Сводка модулей",
      notices: "Недавние заметки"
    },
    settings: {
      title: "Базовые настройки",
      note: "Страница пока структурная. Глубокой конфигурации и записи данных здесь нет."
    },
    modules: {
      title: "Основные модули",
      note: "Список намеренно компактный и утилитарный."
    },
    branding: {
      assets: "Активы",
      identity: "Identity",
      note: "Branding в этом проходе остается только preview."
    },
    licenses: {
      current: "Текущий план",
      available: "Доступный уровень",
      summary: "Сводка entitlements"
    },
    status: {
      note: "Все системные значения здесь локальные placeholder'ы."
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
      invite: "Invite bot",
      inactive: "Inactive",
      test: "Test"
    },
    ru: {
      connected: "Connected",
      invite: "Invite bot",
      inactive: "Inactive",
      test: "Test"
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
      connected: "Open dashboard",
      invite: "Open setup",
      inactive: "Review shell",
      test: "Open test shell"
    },
    ru: {
      connected: "Open dashboard",
      invite: "Open setup",
      inactive: "Review shell",
      test: "Open test shell"
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
      muted: "Placeholder"
    },
    ru: {
      positive: "Healthy",
      warning: "Attention",
      info: "Ready",
      muted: "Placeholder"
    }
  } as const;

  return labels[locale][tone];
}
