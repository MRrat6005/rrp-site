import { resolveLocale } from "@/lib/i18n";
import { getDashboardServers } from "@/lib/dashboard-model";
import { DashboardServersRoute } from "@/ui/dashboard/dashboard-route-runtime";

interface DashboardServersRoutePageProps {
  params: {
    locale: string;
  };
}

export default function DashboardServersRoutePage({ params }: DashboardServersRoutePageProps) {
  const locale = resolveLocale(params.locale);

  return (
    <DashboardServersRoute
      locale={locale}
      fallbackServers={getDashboardServers(locale)}
    />
  );
}
