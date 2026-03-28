import type { Metadata } from "next";

import { siteConfig, type AssetPath } from "@/config/site.config";

function getIconType(path: Exclude<AssetPath, null>) {
  const normalizedPath = path.toLowerCase();

  if (normalizedPath.endsWith(".png")) {
    return "image/png";
  }

  if (normalizedPath.endsWith(".svg")) {
    return "image/svg+xml";
  }

  if (normalizedPath.endsWith(".ico")) {
    return "image/x-icon";
  }

  return undefined;
}

function toIconDescriptor(path: AssetPath) {
  if (!path) {
    return undefined;
  }

  return {
    url: path,
    type: getIconType(path)
  };
}

export function getSiteMetadataIcons(): Metadata["icons"] {
  const { icons } = siteConfig.visuals.brand;

  return {
    icon: toIconDescriptor(icons.icon),
    shortcut: toIconDescriptor(icons.shortcut),
    apple: toIconDescriptor(icons.apple)
  };
}
