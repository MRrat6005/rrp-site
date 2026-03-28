import type { ReactNode } from "react";

import type { Locale } from "@/config/site.config";
import type { SiteMessages } from "@/messages/types";
import { SiteFooter } from "@/ui/layout/site-footer";
import { SiteHeader } from "@/ui/layout/site-header";

interface SiteShellProps {
  locale: Locale;
  messages: SiteMessages;
  children: ReactNode;
}

export function SiteShell({ locale, messages, children }: SiteShellProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader locale={locale} messages={messages} />
      <div className="flex-1">{children}</div>
      <SiteFooter locale={locale} messages={messages} />
    </div>
  );
}

