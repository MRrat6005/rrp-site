import { resolveLocale } from "@/lib/i18n";
import { getDashboardServers } from "@/lib/dashboard-mock";
import { DashboardServersPage } from "@/ui/dashboard/dashboard-servers-page";

interface ServersRoutePageProps {
  params: {
    locale: string;
  };
}

export default function ServersRoutePage({ params }: ServersRoutePageProps) {
  const locale = resolveLocale(params.locale);

  return <DashboardServersPage locale={locale} servers={getDashboardServers()} />;
}
