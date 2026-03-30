import type { Locale } from "@/config/site.config";

const dashboardCopy = {
  en: {
    servers: {
      eyebrow: "Server selection",
      title: "Choose a server before opening the dashboard shell.",
      body: "A clean Juniper-style server list comes first: search, review state, and step into an app workspace without touching live integrations.",
      searchPlaceholder: "Search servers, plans, or regions",
      emptyTitle: "No servers matched",
      emptyBody: "Adjust the search input or clear the filter to see the full mock list.",
      resultsLabel: "Visible servers",
      openCta: "Open dashboard",
      inviteCta: "Invite bot",
      inactiveCta: "Review archive",
      testCta: "Open sandbox",
      members: "Members",
      region: "Region",
      modules: "Modules",
      status: {
        connected: "Connected",
        invite: "Invite bot",
        inactive: "Inactive",
        test: "Test server"
      }
    },
    workspace: {
      eyebrow: "Workspace entry",
      title: "Start from a clear server entry, then branch into the app sections.",
      body: "This page acts as the first stop after selecting a server, giving you a fast summary and a disciplined set of section links instead of dumping everything into one screen.",
      routesTitle: "Dashboard sections",
      routesBody: "Each section is a separate route with the same shell, sidebar, and title bar.",
      profileTitle: "Server profile",
      summaryTitle: "Selection summary"
    },
    overview: {
      eyebrow: "Overview",
      modulesTitle: "Module overview",
      activityTitle: "Recent activity",
      actionsTitle: "Quick actions"
    },
    modules: {
      eyebrow: "Modules",
      title: "Feature modules",
      body: "List each module with clear state, short context, and a direct placeholder action.",
      stateEnabled: "Enabled",
      stateDisabled: "Disabled"
    },
    settings: {
      eyebrow: "Settings hub",
      title: "Central settings",
      body: "Group the key administrative areas so the shell reads like a product dashboard, not a landing page."
    },
    branding: {
      eyebrow: "Branding preview",
      title: "Preview identity surfaces before any live asset sync exists.",
      body: "The layout favors preview and hierarchy first, with supporting slots for logo, banner, accents, and text fields."
    },
    licenses: {
      eyebrow: "License summary",
      title: "Compare plan level and entitlement coverage.",
      body: "Keep the upgrade framing premium and clear, but stop short of real commerce or seat management logic.",
      freeLabel: "Free",
      fullLabel: "Full"
    },
    status: {
      eyebrow: "Status view",
      title: "Grouped health surfaces for core, dashboard, modules, and integrations.",
      body: "A calm operational view is enough for this shell pass: no noisy charts, just structured status cards.",
      core: "Bot and core",
      dashboard: "Dashboard shell",
      modules: "Module status",
      integrations: "API and integrations"
    },
    shared: {
      mockBadge: "Mock data",
      previewLabel: "Preview",
      upgradeCta: "Upgrade placeholder",
      seatLabel: "Entitlements",
      noteLabel: "Current note"
    }
  },
  ru: {
    servers: {
      eyebrow: "Выбор сервера",
      title: "Сначала выберите сервер, потом открывайте dashboard shell.",
      body: "Список серверов идет первым: поиск, понятные состояния карточек и вход в app-workspace без live-интеграций.",
      searchPlaceholder: "Искать серверы, планы или регионы",
      emptyTitle: "Ничего не найдено",
      emptyBody: "Измените запрос или очистите фильтр, чтобы снова увидеть весь mock-список.",
      resultsLabel: "Видимые серверы",
      openCta: "Открыть dashboard",
      inviteCta: "Invite bot",
      inactiveCta: "Открыть архив",
      testCta: "Открыть sandbox",
      members: "Участники",
      region: "Регион",
      modules: "Модули",
      status: {
        connected: "Connected",
        invite: "Invite bot",
        inactive: "Inactive",
        test: "Test server"
      }
    },
    workspace: {
      eyebrow: "Точка входа",
      title: "Начните с серверного entry-point, затем переходите в отдельные app-разделы.",
      body: "Эта страница работает как первый шаг после выбора сервера: краткое summary и дисциплинированные переходы по разделам вместо одного перегруженного экрана.",
      routesTitle: "Разделы dashboard",
      routesBody: "Каждый раздел живет на отдельном маршруте, но использует общий shell, sidebar и title bar.",
      profileTitle: "Профиль сервера",
      summaryTitle: "Selection summary"
    },
    overview: {
      eyebrow: "Overview",
      modulesTitle: "Обзор модулей",
      activityTitle: "Recent activity",
      actionsTitle: "Быстрые действия"
    },
    modules: {
      eyebrow: "Модули",
      title: "Feature-модули",
      body: "Покажите каждый модуль с понятным состоянием, коротким контекстом и прямым placeholder-действием.",
      stateEnabled: "Enabled",
      stateDisabled: "Disabled"
    },
    settings: {
      eyebrow: "Settings hub",
      title: "Центральные настройки",
      body: "Сгруппируйте ключевые административные блоки так, чтобы shell ощущался как продуктовый dashboard, а не как landing page."
    },
    branding: {
      eyebrow: "Branding preview",
      title: "Сначала preview identity-поверхностей, потом live-sync ассетов.",
      body: "Композиция смещена в сторону preview и иерархии, а рядом остаются слоты для logo, banner, accents и text-fields."
    },
    licenses: {
      eyebrow: "Сводка лицензии",
      title: "Сравните уровень плана и покрытие entitlements.",
      body: "Upgrade-путь должен быть премиальным и ясным, но без реальной коммерции и seat-логики.",
      freeLabel: "Free",
      fullLabel: "Full"
    },
    status: {
      eyebrow: "Статус",
      title: "Групповые health-поверхности для core, dashboard, модулей и интеграций.",
      body: "Для shell-этапа достаточно спокойного operational-view: без шумных графиков, только структурированные карточки статусов.",
      core: "Bot и core",
      dashboard: "Dashboard shell",
      modules: "Статус модулей",
      integrations: "API и интеграции"
    },
    shared: {
      mockBadge: "Mock data",
      previewLabel: "Preview",
      upgradeCta: "Upgrade placeholder",
      seatLabel: "Entitlements",
      noteLabel: "Текущая заметка"
    }
  }
} as const;

export function getDashboardCopy(locale: Locale) {
  return dashboardCopy[locale];
}
