import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/app/globals.css";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.brand.fullName,
    template: `%s | ${siteConfig.brand.fullName}`
  },
  description: siteConfig.description
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={siteConfig.defaultLocale} className="dark">
      <body>{children}</body>
    </html>
  );
}
