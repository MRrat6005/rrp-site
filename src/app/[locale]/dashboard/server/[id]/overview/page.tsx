import { getDashboardServer } from "@/lib/dashboard-mock";
import { resolveLocale } from "@/lib/i18n";
import { DashboardServerRoute } from "@/ui/dashboard/dashboard-route-runtime";

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

  return (
    <DashboardServerRoute
      locale={locale}
      page="overview"
      serverId={params.id}
      fallbackServer={getDashboardServer(params.id, locale)}
    />
  );
}
