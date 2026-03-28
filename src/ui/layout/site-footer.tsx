import Link from "next/link";

import { siteConfig, type Locale } from "@/config/site.config";
import { getLocalizedPath } from "@/lib/i18n";
import type { SiteMessages } from "@/messages/types";

interface SiteFooterProps {
  locale: Locale;
  messages: SiteMessages;
}

export function SiteFooter({ locale, messages }: SiteFooterProps) {
  const footerLabels = {
    contacts: messages.footer.contacts,
    filePolicy: messages.footer.filePolicy,
    privacy: messages.footer.privacy,
    terms: messages.footer.terms
  };

  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="[font-family:var(--font-display)] text-lg font-semibold text-ink">
              {siteConfig.legalName}
            </p>
            <p className="max-w-2xl text-sm text-muted">
              {siteConfig.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {siteConfig.footer.map((item) => (
              <Link
                key={item.key}
                href={getLocalizedPath(locale, item.segment)}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-muted transition hover:border-white/20 hover:text-ink"
              >
                {footerLabels[item.key]}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-white/10 pt-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{messages.footer.copyright}</p>
          <p>{new Date().getFullYear()} / GitHub Pages ready</p>
        </div>
      </div>
    </footer>
  );
}


