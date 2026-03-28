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
    <footer className="border-t border-white/[0.08] bg-[rgba(4,6,11,0.32)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10 sm:px-8 lg:px-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-2xl space-y-4 reveal-up">
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

          <div className="flex max-w-2xl flex-wrap gap-x-6 gap-y-3 text-sm reveal-up reveal-delay-1">
            {siteConfig.navigation.footer.map((item) => (
              <Link
                key={item.key}
                href={getLocalizedPath(locale, item.segment)}
                className="text-white/62 transition duration-200 hover:text-ink"
              >
                {messages.footer[item.key]}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/[0.08] pt-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{messages.footer.copyright}</p>
          <p>
            {new Date().getFullYear()} / {siteConfig.brand.domain}
          </p>
        </div>
      </div>
    </footer>
  );
}
