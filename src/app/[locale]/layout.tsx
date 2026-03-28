import type { ReactNode } from "react";

import { siteConfig } from "@/config/site.config";
import { getMessages, resolveLocale } from "@/lib/i18n";
import { SiteShell } from "@/ui/layout/site-shell";

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

export default function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const locale = resolveLocale(params.locale);
  const messages = getMessages(locale);

  return (
    <SiteShell locale={locale} messages={messages}>
      {children}
    </SiteShell>
  );
}
