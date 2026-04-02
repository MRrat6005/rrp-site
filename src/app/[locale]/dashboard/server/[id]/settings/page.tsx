import { getDashboardServer } from "@/lib/dashboard-mock";
import { resolveLocale } from "@/lib/i18n";
import { DashboardServerRoute } from "@/ui/dashboard/dashboard-route-runtime";

interface DashboardSettingsRoutePageProps {
  params: {
    locale: string;
    id: string;
  };
}

export default function DashboardSettingsRoutePage({
  params
}: DashboardSettingsRoutePageProps) {
  const locale = resolveLocale(params.locale);

  return (
    <DashboardServerRoute
      locale={locale}
      page="settings"
      serverId={params.id}
      fallbackServer={getDashboardServer(params.id, locale)}
    />
  );
}
