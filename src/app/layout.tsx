import type { Metadata } from "next";
import Script from "next/script";
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
      <body>
        <Script src="/runtime-config.js" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  );
}
