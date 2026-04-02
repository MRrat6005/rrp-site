import { notFound } from "next/navigation";

import { getDashboardServer } from "@/lib/dashboard-mock";
import { resolveLocale } from "@/lib/i18n";
import { DashboardLicensesPage } from "@/ui/dashboard/dashboard-licenses-page";

interface DashboardLicensesRoutePageProps {
  params: {
    locale: string;
    id: string;
  };
}

export default function DashboardLicensesRoutePage({
  params
}: DashboardLicensesRoutePageProps) {
  const locale = resolveLocale(params.locale);
  const server = getDashboardServer(params.id, locale);

  if (!server) {
    notFound();
  }

  return <DashboardLicensesPage locale={locale} server={server} />;
}

