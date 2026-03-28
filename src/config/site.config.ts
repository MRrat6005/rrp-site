export const locales = ["ru", "en"] as const;

export type Locale = (typeof locales)[number];
export type ProjectId = "chrp" | "crown";
export type NavKey = "about" | "faq" | "docs";
export type FooterKey = "privacy" | "filePolicy" | "terms" | "contacts";

export interface ProjectConfig {
  id: ProjectId;
  slug: string;
  title: string;
  mark: string;
}

export interface NavItemConfig {
  key: NavKey;
  segment: string;
}

export interface FooterItemConfig {
  key: FooterKey;
  segment: string;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  description: string;
  siteUrl: string;
  defaultLocale: Locale;
  locales: readonly Locale[];
  dashboardSegment: string;
  navigation: readonly NavItemConfig[];
  footer: readonly FooterItemConfig[];
  projects: readonly ProjectConfig[];
}

export const siteConfig: SiteConfig = {
  name: "RRP",
  legalName: "RRP Platform",
  description: "Static product-facing foundation for GitHub Pages deployments.",
  siteUrl: "https://example.com",
  defaultLocale: "ru",
  locales,
  dashboardSegment: "app/servers",
  navigation: [
    { key: "about", segment: "about" },
    { key: "faq", segment: "faq" },
    { key: "docs", segment: "docs" }
  ],
  footer: [
    { key: "privacy", segment: "privacy" },
    { key: "filePolicy", segment: "file-policy" },
    { key: "terms", segment: "terms" },
    { key: "contacts", segment: "contacts" }
  ],
  projects: [
    { id: "chrp", slug: "chrp", title: "CHRP", mark: "CH" },
    { id: "crown", slug: "crown", title: "CROWN", mark: "CR" }
  ]
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

