import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { resolveLocale } from "@/lib/i18n";
import { getDashboardServer, getDashboardServerIds } from "@/lib/dashboard-mock";
import { DashboardServerShell } from "@/ui/dashboard/dashboard-server-shell";

interface ServerLayoutProps {
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

export default function ServerLayout({ children, params }: ServerLayoutProps) {
  const locale = resolveLocale(params.locale);
  const server = getDashboardServer(params.id);

  if (!server) {
    notFound();
  }

  return (
    <DashboardServerShell locale={locale} server={server}>
      {children}
    </DashboardServerShell>
  );
}
