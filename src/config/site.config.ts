export const locales = ["ru", "en"] as const;
export const projectOrder = ["chrp", "crown"] as const;

export type Locale = (typeof locales)[number];
export type ProjectId = (typeof projectOrder)[number];
export type HeaderNavKey = "about" | "faq" | "docs";
export type LegalRouteKey = "privacy" | "filePolicy" | "terms" | "contacts";
export type FooterRouteKey = LegalRouteKey | "faq" | "docs";
export type ContactChannelId = "general" | "studio" | "partners";

export interface AssetPlaceholder {
  label: string;
  shortLabel: string;
}

export interface HeaderNavItemConfig {
  key: HeaderNavKey;
  segment: string;
}

export interface FooterNavItemConfig {
  key: FooterRouteKey;
  segment: string;
}

export interface LegalRouteConfig {
  key: LegalRouteKey;
  segment: string;
}

export interface ContactPlaceholderConfig {
  id: ContactChannelId;
  value: string;
}

export interface ProjectConfig {
  id: ProjectId;
  slug: string;
  title: string;
  shortTitle: string;
  mark: string;
  category: string;
  routeSegment: string;
  ctaSegment: string;
}

export interface SiteConfig {
  brand: {
    fullName: string;
    shortName: string;
    domain: string;
    dashboardBrand: string;
  };
  description: string;
  siteUrl: string;
  defaultLocale: Locale;
  locales: readonly Locale[];
  assetPlaceholders: {
    brand: AssetPlaceholder;
    projects: Record<ProjectId, AssetPlaceholder>;
  };
  navigation: {
    header: readonly HeaderNavItemConfig[];
    footer: readonly FooterNavItemConfig[];
  };
  legalRoutes: readonly LegalRouteConfig[];
  contacts: readonly ContactPlaceholderConfig[];
  projects: Record<ProjectId, ProjectConfig>;
  ctaRoutes: {
    dashboard: string;
    docs: string;
    contacts: string;
    projects: Record<ProjectId, string>;
  };
  featureFlags: {
    showProjectsDropdown: boolean;
    showFooterDocsLink: boolean;
    showFooterFaqLink: boolean;
    useMobileMenuSheet: boolean;
  };
}

export const siteConfig: SiteConfig = {
  brand: {
    fullName: "Royal Rats Productions",
    shortName: "RRP",
    domain: "royalratsproductions.ru",
    dashboardBrand: "CROWN"
  },
  description:
    "Dark bilingual static shell for the Royal Rats Productions public website and dashboard entry points.",
  siteUrl: "https://royalratsproductions.ru",
  defaultLocale: "ru",
  locales,
  assetPlaceholders: {
    brand: {
      label: "Royal Rats Productions",
      shortLabel: "RRP"
    },
    projects: {
      chrp: {
        label: "CHRP project mark",
        shortLabel: "CH"
      },
      crown: {
        label: "CROWN workspace mark",
        shortLabel: "CR"
      }
    }
  },
  navigation: {
    header: [
      { key: "about", segment: "about" },
      { key: "faq", segment: "faq" },
      { key: "docs", segment: "docs" }
    ],
    footer: [
      { key: "privacy", segment: "privacy" },
      { key: "filePolicy", segment: "file-policy" },
      { key: "terms", segment: "terms" },
      { key: "contacts", segment: "contacts" },
      { key: "faq", segment: "faq" },
      { key: "docs", segment: "docs" }
    ]
  },
  legalRoutes: [
    { key: "privacy", segment: "privacy" },
    { key: "filePolicy", segment: "file-policy" },
    { key: "terms", segment: "terms" },
    { key: "contacts", segment: "contacts" }
  ],
  contacts: [
    { id: "general", value: "hello@royalratsproductions.ru" },
    { id: "studio", value: "studio@royalratsproductions.ru" },
    { id: "partners", value: "crown@royalratsproductions.ru" }
  ],
  projects: {
    chrp: {
      id: "chrp",
      slug: "chrp",
      title: "CHRP",
      shortTitle: "CHRP",
      mark: "CH",
      category: "Roleplay direction",
      routeSegment: "projects/chrp",
      ctaSegment: "projects/chrp"
    },
    crown: {
      id: "crown",
      slug: "crown",
      title: "CROWN",
      shortTitle: "CROWN",
      mark: "CR",
      category: "Dashboard workspace",
      routeSegment: "projects/crown",
      ctaSegment: "projects/crown"
    }
  },
  ctaRoutes: {
    dashboard: "app/servers",
    docs: "docs",
    contacts: "contacts",
    projects: {
      chrp: "projects/chrp",
      crown: "projects/crown"
    }
  },
  featureFlags: {
    showProjectsDropdown: true,
    showFooterDocsLink: true,
    showFooterFaqLink: true,
    useMobileMenuSheet: true
  }
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
