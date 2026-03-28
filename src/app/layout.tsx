import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/app/globals.css";
import { siteConfig } from "@/config/site.config";
import { getSharedPreviewMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = getSharedPreviewMetadata();

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
