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

function getPreviewImage(path: AssetPath) {
  if (!path) {
    return undefined;
  }

  return [{ url: path }];
}

export function getSiteMetadataIcons(): Metadata["icons"] {
  const { icons } = siteConfig.visuals.brand;

  return {
    icon: toIconDescriptor(icons.icon),
    shortcut: toIconDescriptor(icons.shortcut),
    apple: toIconDescriptor(icons.apple)
  };
}

export function getSharedPreviewMetadata(): Metadata {
  const { preview } = siteConfig;
  const previewImage = getPreviewImage(preview.ogImage);

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: {
      default: preview.defaultTitle,
      template: `%s | ${preview.siteName}`
    },
    description: preview.defaultDescription,
    applicationName: preview.siteName,
    icons: getSiteMetadataIcons(),
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: preview.siteName,
      title: preview.defaultTitle,
      description: preview.defaultDescription,
      images: previewImage
    },
    twitter: {
      card: preview.twitterCard,
      title: preview.twitterTitle ?? preview.defaultTitle,
      description: preview.twitterDescription ?? preview.defaultDescription,
      images: previewImage
    }
  };
}
