import { notFound } from "next/navigation";

import { resolveLocale } from "@/lib/i18n";
import { getDashboardServer } from "@/lib/dashboard-mock";
import { DashboardLicensesPage } from "@/ui/dashboard/dashboard-licenses-page";

interface DashboardLicensesRouteProps {
  params: {
    locale: string;
    id: string;
  };
}

export default function DashboardLicensesRoute({ params }: DashboardLicensesRouteProps) {
  const locale = resolveLocale(params.locale);
  const server = getDashboardServer(params.id);

  if (!server) {
    notFound();
  }

  return <DashboardLicensesPage locale={locale} server={server} />;
}
