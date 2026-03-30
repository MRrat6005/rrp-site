import type { ReactNode } from "react";

import { getMessages, resolveLocale } from "@/lib/i18n";
import { SiteShell } from "@/ui/layout/site-shell";

interface PublicLayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export default function PublicLayout({
  children,
  params
}: PublicLayoutProps) {
  const locale = resolveLocale(params.locale);
  const messages = getMessages(locale);

  return (
    <SiteShell locale={locale} messages={messages}>
      {children}
    </SiteShell>
  );
}
