import Link from "next/link";

import { siteConfig, type Locale } from "@/config/site.config";
import { getLocalizedPath } from "@/lib/i18n";
import type { SiteMessages } from "@/messages/types";
import { LogoTile } from "@/ui/common/logo-tile";

interface SiteFooterProps {
  locale: Locale;
  messages: SiteMessages;
}

export function SiteFooter({ locale, messages }: SiteFooterProps) {
  return (
    <footer className="border-t border-white/10 bg-[rgba(4,6,11,0.42)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10 lg:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-4">
              <LogoTile
                shortLabel={siteConfig.assetPlaceholders.brand.shortLabel}
                label={siteConfig.assetPlaceholders.brand.label}
                size="sm"
              />
              <div>
                <p className="[font-family:var(--font-display)] text-lg font-semibold text-ink">
                  {siteConfig.brand.fullName}
                </p>
                <p className="text-sm text-muted">{siteConfig.brand.domain}</p>
              </div>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted">
              {messages.footer.subtitle}
            </p>
          </div>

          <div className="flex max-w-2xl flex-wrap gap-2">
            {siteConfig.navigation.footer.map((item) => (
              <Link
                key={item.key}
                href={getLocalizedPath(locale, item.segment)}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-muted transition hover:border-white/18 hover:bg-white/[0.04] hover:text-ink"
              >
                {messages.footer[item.key]}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 pt-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{messages.footer.copyright}</p>
          <p>{new Date().getFullYear()} / static public shell</p>
        </div>
      </div>
    </footer>
  );
}
