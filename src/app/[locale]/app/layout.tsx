import type { ReactNode } from "react";

import { siteConfig } from "@/config/site.config";
import { resolveLocale } from "@/lib/i18n";
import { ConfigurableBackdrop } from "@/ui/layout/configurable-backdrop";

interface AppLayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export default function AppLayout({ children, params }: AppLayoutProps) {
  resolveLocale(params.locale);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05070b]">
      <ConfigurableBackdrop
        background={siteConfig.visuals.backgrounds.dashboardEntry}
        className="fixed inset-0"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,10,0.18),rgba(4,6,10,0.56)_68%,rgba(4,6,10,0.82))]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
