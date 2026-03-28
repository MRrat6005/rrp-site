import type { CSSProperties } from "react";

export const locales = ["ru", "en"] as const;
export const projectOrder = ["chrp", "crown"] as const;

export type Locale = (typeof locales)[number];
export type ProjectId = (typeof projectOrder)[number];
export type HeaderNavKey = "about" | "faq" | "docs";
export type LegalRouteKey = "privacy" | "filePolicy" | "terms" | "contacts";
export type FooterRouteKey = LegalRouteKey | "faq" | "docs";
export type ContactChannelId = "general" | "studio" | "partners";
export type AssetPath = `/${string}` | `https://${string}` | `http://${string}` | null;
export type BackgroundImagePath = AssetPath;
export type BackgroundPosition = NonNullable<CSSProperties["backgroundPosition"]>;
export type BackgroundSize = NonNullable<CSSProperties["backgroundSize"]>;

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

export interface BackgroundSurfaceConfig {
  image: BackgroundImagePath;
  overlayOpacity: number;
  position: BackgroundPosition;
  size: BackgroundSize;
  gradientStrength: number;
}

export interface SiteIconConfig {
  icon: AssetPath;
  shortcut: AssetPath;
  apple: AssetPath;
}

export interface ProjectThemeConfig {
  surfaceTop: string;
  surfaceBottom: string;
  border: string;
  highlight: string;
  glow: string;
  accent: string;
  accentSoft: string;
  tag: string;
  tileTop: string;
  tileBottom: string;
  tileBorder: string;
  tileGlow: string;
}

export interface BrandVisualConfig {
  markPath: AssetPath;
  icons: SiteIconConfig;
}

export interface ProjectVisualConfig {
  markPath: AssetPath;
  theme: ProjectThemeConfig;
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
    workspace: string;
    docs: string;
    contacts: string;
    projects: Record<ProjectId, string>;
  };
  visuals: {
    brand: BrandVisualConfig;
    backgrounds: {
      publicSite: BackgroundSurfaceConfig;
      dashboardEntry: BackgroundSurfaceConfig;
    };
    projects: Record<ProjectId, ProjectVisualConfig>;
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
    "Public-facing site for Royal Rats Productions, with CHRP and CROWN as its main directions.",
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
    dashboard: "login",
    workspace: "app/servers",
    docs: "docs",
    contacts: "contacts",
    projects: {
      chrp: "projects/chrp",
      crown: "projects/crown"
    }
  },
  visuals: {
    brand: {
      markPath: "/marks/rrp-mark.svg",
      icons: {
        icon: "/marks/rrp-favicon.svg",
        shortcut: "/marks/rrp-favicon.svg",
        apple: "/marks/rrp-favicon.svg"
      }
    },
    backgrounds: {
      publicSite: {
        image: "/backgrounds/rrp-public-aurora.svg",
        overlayOpacity: 0.62,
        position: "center top",
        size: "cover",
        gradientStrength: 0.74
      },
      dashboardEntry: {
        image: "/backgrounds/rrp-dashboard-entry.svg",
        overlayOpacity: 0.74,
        position: "center center",
        size: "cover",
        gradientStrength: 0.82
      }
    },
    projects: {
      chrp: {
        markPath: "/marks/chrp-mark.svg",
        theme: {
          surfaceTop: "rgba(11, 24, 34, 0.78)",
          surfaceBottom: "rgba(7, 13, 20, 0.92)",
          border: "rgba(109, 164, 145, 0.24)",
          highlight: "rgba(245, 234, 209, 0.12)",
          glow: "rgba(73, 132, 122, 0.24)",
          accent: "rgba(213, 235, 223, 0.18)",
          accentSoft: "rgba(117, 185, 153, 0.18)",
          tag: "rgba(233, 225, 207, 0.78)",
          tileTop: "rgba(233, 241, 232, 0.2)",
          tileBottom: "rgba(105, 151, 132, 0.08)",
          tileBorder: "rgba(182, 215, 198, 0.24)",
          tileGlow: "rgba(229, 220, 193, 0.16)"
        }
      },
      crown: {
        markPath: "/marks/crown-mark.svg",
        theme: {
          surfaceTop: "rgba(25, 25, 29, 0.82)",
          surfaceBottom: "rgba(10, 10, 13, 0.94)",
          border: "rgba(255, 255, 255, 0.14)",
          highlight: "rgba(245, 242, 235, 0.12)",
          glow: "rgba(255, 255, 255, 0.08)",
          accent: "rgba(239, 236, 228, 0.18)",
          accentSoft: "rgba(177, 182, 191, 0.14)",
          tag: "rgba(234, 230, 223, 0.8)",
          tileTop: "rgba(246, 242, 235, 0.18)",
          tileBottom: "rgba(118, 121, 126, 0.07)",
          tileBorder: "rgba(255, 255, 255, 0.16)",
          tileGlow: "rgba(255, 255, 255, 0.12)"
        }
      }
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

type ThemeStyle = CSSProperties & Record<`--${string}`, string>;

export function getProjectThemeStyle(projectId: ProjectId): ThemeStyle {
  const theme = siteConfig.visuals.projects[projectId].theme;

  return {
    "--project-surface-top": theme.surfaceTop,
    "--project-surface-bottom": theme.surfaceBottom,
    "--project-border": theme.border,
    "--project-highlight": theme.highlight,
    "--project-glow": theme.glow,
    "--project-accent": theme.accent,
    "--project-accent-soft": theme.accentSoft,
    "--project-tag": theme.tag,
    "--tile-bg-top": theme.tileTop,
    "--tile-bg-bottom": theme.tileBottom,
    "--tile-border": theme.tileBorder,
    "--tile-glow": theme.tileGlow
  };
}
