import { notFound } from "next/navigation";

import { resolveLocale } from "@/lib/i18n";
import { getDashboardServer } from "@/lib/dashboard-mock";
import { DashboardModulesPage } from "@/ui/dashboard/dashboard-modules-page";

interface DashboardModulesRouteProps {
  params: {
    locale: string;
    id: string;
  };
}

export default function DashboardModulesRoute({ params }: DashboardModulesRouteProps) {
  const locale = resolveLocale(params.locale);
  const server = getDashboardServer(params.id);

  if (!server) {
    notFound();
  }

  return <DashboardModulesPage locale={locale} server={server} />;
}
