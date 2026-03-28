"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { siteConfig } from "@/config/site.config";
import { enMessages } from "@/messages/en";

function detectLocale() {
  const browserLanguages =
    typeof navigator === "undefined"
      ? []
      : navigator.languages?.length
        ? navigator.languages
        : [navigator.language];

  const match = browserLanguages.find((language) => {
    const normalized = language.toLowerCase();
    return normalized.startsWith("ru") || normalized.startsWith("en");
  });

  return match?.toLowerCase().startsWith("en") ? "en" : siteConfig.defaultLocale;
}

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${detectLocale()}`);
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="section-frame max-w-xl text-center">
        <p className="eyebrow">{enMessages.redirect.title}</p>
        <h1 className="mt-4 [font-family:var(--font-display)] text-4xl font-semibold text-ink">
          {enMessages.redirect.body}
        </h1>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/ru" className="button-secondary">
            {enMessages.redirect.fallback}: RU
          </Link>
          <Link href="/en" className="button-primary">
            {enMessages.redirect.fallback}: EN
          </Link>
        </div>
      </div>
    </main>
  );
}

