import { notFound } from "next/navigation";

import { resolveLocale } from "@/lib/i18n";
import { getDashboardServer } from "@/lib/dashboard-mock";
import { DashboardOverviewPage } from "@/ui/dashboard/dashboard-overview-page";

interface DashboardOverviewRouteProps {
  params: {
    locale: string;
    id: string;
  };
}

export default function DashboardOverviewRoute({ params }: DashboardOverviewRouteProps) {
  const locale = resolveLocale(params.locale);
  const server = getDashboardServer(params.id);

  if (!server) {
    notFound();
  }

  return <DashboardOverviewPage locale={locale} server={server} />;
}
