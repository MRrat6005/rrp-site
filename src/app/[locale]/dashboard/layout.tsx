import type { ReactNode } from "react";

import { resolveLocale } from "@/lib/i18n";

interface DashboardLayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export default function DashboardLayout({
  children,
  params
}: DashboardLayoutProps) {
  resolveLocale(params.locale);

  return children;
}
