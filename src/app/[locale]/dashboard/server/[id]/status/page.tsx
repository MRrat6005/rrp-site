import { getDashboardServer } from "@/lib/dashboard-mock";
import { resolveLocale } from "@/lib/i18n";
import { DashboardServerRoute } from "@/ui/dashboard/dashboard-route-runtime";

interface DashboardStatusRoutePageProps {
  params: {
    locale: string;
    id: string;
  };
}

export default function DashboardStatusRoutePage({
  params
}: DashboardStatusRoutePageProps) {
  const locale = resolveLocale(params.locale);

  return (
    <DashboardServerRoute
      locale={locale}
      page="status"
      serverId={params.id}
      fallbackServer={getDashboardServer(params.id, locale)}
    />
  );
}
