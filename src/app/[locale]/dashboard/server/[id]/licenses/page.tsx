import { getDashboardServer } from "@/lib/dashboard-mock";
import { resolveLocale } from "@/lib/i18n";
import { DashboardServerRoute } from "@/ui/dashboard/dashboard-route-runtime";

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

  return (
    <DashboardServerRoute
      locale={locale}
      page="licenses"
      serverId={params.id}
      fallbackServer={getDashboardServer(params.id, locale)}
    />
  );
}
