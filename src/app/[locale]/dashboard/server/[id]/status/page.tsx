import { notFound } from "next/navigation";

import { getDashboardServer } from "@/lib/dashboard-mock";
import { resolveLocale } from "@/lib/i18n";
import { DashboardStatusPage } from "@/ui/dashboard/dashboard-status-page";

interface DashboardStatusRoutePageProps {
  params: {
    locale: string;
    id: string;
  };
}

export default function DashboardStatusRoutePage({
  params
}: DashboardStatusRoutePageProps) {
  const locale = resolveLocale(params.locale);
  const server = getDashboardServer(params.id, locale);

  if (!server) {
    notFound();
  }

  return <DashboardStatusPage locale={locale} server={server} />;
}

