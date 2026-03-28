import { notFound } from "next/navigation";

import { isLocale, siteConfig, type Locale } from "@/config/site.config";
import { enMessages } from "@/messages/en";
import { ruMessages } from "@/messages/ru";
import type { SiteMessages } from "@/messages/types";

const messageMap: Record<Locale, SiteMessages> = {
  en: enMessages,
  ru: ruMessages
};

export function getMessages(locale: Locale): SiteMessages {
  return messageMap[locale];
}

export function resolveLocale(localeParam: string): Locale {
  if (!isLocale(localeParam)) {
    notFound();
  }

  return localeParam;
}

export function getLocalizedPath(locale: Locale, segment = ""): string {
  const normalized = segment.replace(/^\/+|\/+$/g, "");
  return normalized ? `/${locale}/${normalized}` : `/${locale}`;
}

export function swapLocaleInPath(pathname: string, locale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  const localeIndex = segments.findIndex((segment) => isLocale(segment));

  if (localeIndex >= 0) {
    segments[localeIndex] = locale;
    return `/${segments.join("/")}`;
  }

  return segments.length ? `/${locale}/${segments.join("/")}` : `/${locale}`;
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === siteConfig.defaultLocale ? "en" : siteConfig.defaultLocale;
}
