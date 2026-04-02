import { notFound } from "next/navigation";

import { getDashboardServer } from "@/lib/dashboard-mock";
import { resolveLocale } from "@/lib/i18n";
import { DashboardOverviewPage } from "@/ui/dashboard/dashboard-overview-page";

interface DashboardOverviewRoutePageProps {
  params: {
    locale: string;
    id: string;
  };
}

export default function DashboardOverviewRoutePage({
  params
}: DashboardOverviewRoutePageProps) {
  const locale = resolveLocale(params.locale);
  const server = getDashboardServer(params.id, locale);

  if (!server) {
    notFound();
  }

  return <DashboardOverviewPage locale={locale} server={server} />;
}

