import { notFound } from "next/navigation";

import { resolveLocale } from "@/lib/i18n";
import { getDashboardServer } from "@/lib/dashboard-mock";
import { DashboardStatusPage } from "@/ui/dashboard/dashboard-status-page";

interface DashboardStatusRouteProps {
  params: {
    locale: string;
    id: string;
  };
}

export default function DashboardStatusRoute({ params }: DashboardStatusRouteProps) {
  const locale = resolveLocale(params.locale);
  const server = getDashboardServer(params.id);

  if (!server) {
    notFound();
  }

  return <DashboardStatusPage locale={locale} server={server} />;
}
