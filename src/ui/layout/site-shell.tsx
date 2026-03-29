import type { ReactNode } from "react";

import { siteConfig, type Locale } from "@/config/site.config";
import type { SiteMessages } from "@/messages/types";
import { ConfigurableBackdrop } from "@/ui/layout/configurable-backdrop";
import { PublicMotion } from "@/ui/layout/public-motion";
import { SiteFooter } from "@/ui/layout/site-footer";
import { SiteHeader } from "@/ui/layout/site-header";

interface SiteShellProps {
  locale: Locale;
  messages: SiteMessages;
  children: ReactNode;
}

export function SiteShell({ locale, messages, children }: SiteShellProps) {
  return (
    <div className="site-stage">
      <ConfigurableBackdrop
        background={siteConfig.visuals.backgrounds.publicSite}
        className="fixed inset-0"
      />
      <PublicMotion />
      <div className="site-stage__content">
        <SiteHeader locale={locale} messages={messages} />
        <div className="flex-1">{children}</div>
        <SiteFooter locale={locale} messages={messages} />
      </div>
    </div>
  );
}
