import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteConfig } from "@/config/site.config";
import { resolveLocale } from "@/lib/i18n";
import { getSharedPreviewMetadata } from "@/lib/site-metadata";

interface LocaleLayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export function generateStaticParams() {
  return siteConfig.locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export function generateMetadata(): Metadata {
  return getSharedPreviewMetadata();
}

export default function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  resolveLocale(params.locale);

  return children;
}
