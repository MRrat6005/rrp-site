import { getDashboardServer } from "@/lib/dashboard-mock";
import { resolveLocale } from "@/lib/i18n";
import { DashboardServerRoute } from "@/ui/dashboard/dashboard-route-runtime";

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

  return (
    <DashboardServerRoute
      locale={locale}
      page="modules"
      serverId={params.id}
      fallbackServer={getDashboardServer(params.id, locale)}
    />
  );
}
