import { notFound } from "next/navigation";

import { getDashboardServer } from "@/lib/dashboard-mock";
import { resolveLocale } from "@/lib/i18n";
import { DashboardModulesPage } from "@/ui/dashboard/dashboard-modules-page";

interface DashboardModulesRoutePageProps {
  params: {
    locale: string;
    id: string;
  };
}

export default function DashboardModulesRoutePage({
  params
}: DashboardModulesRoutePageProps) {
  const locale = resolveLocale(params.locale);
  const server = getDashboardServer(params.id);

  if (!server) {
    notFound();
  }

  return <DashboardModulesPage locale={locale} server={server} />;
}
