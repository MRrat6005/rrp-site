import type { Metadata } from "next";

import { siteConfig } from "@/config/site.config";

export function getSiteMetadataIcons(): Metadata["icons"] {
  const { icons } = siteConfig.visuals.brand;

  return {
    icon: icons.icon ?? undefined,
    shortcut: icons.shortcut ?? undefined,
    apple: icons.apple ?? undefined
  };
}
