"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { siteConfig } from "@/config/site.config";

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

export default function DashboardBridgePage() {
  const router = useRouter();

  useEffect(() => {
    const locale = detectLocale();
    const nextSearch = window.location.search.replace(/^\?/, "");
    const target = `/${locale}/dashboard/servers`;

    router.replace(nextSearch ? `${target}?${nextSearch}` : target);
  }, [router]);

  return null;
}
