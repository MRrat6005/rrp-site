import type { ReactNode } from "react";

import { getDashboardServerIds } from "@/lib/dashboard-mock";
import { resolveLocale } from "@/lib/i18n";

interface DashboardServerLayoutProps {
  children: ReactNode;
  params: {
    locale: string;
    id: string;
  };
}

export function generateStaticParams() {
  return getDashboardServerIds().map((id) => ({ id }));
}

export const dynamicParams = false;

export default function DashboardServerLayout({
  children,
  params
}: DashboardServerLayoutProps) {
  resolveLocale(params.locale);

  return children;
}
