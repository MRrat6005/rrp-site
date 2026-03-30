import { notFound } from "next/navigation";

import { resolveLocale } from "@/lib/i18n";
import { getDashboardServer } from "@/lib/dashboard-mock";
import { DashboardSettingsPage } from "@/ui/dashboard/dashboard-settings-page";

interface DashboardSettingsRouteProps {
  params: {
    locale: string;
    id: string;
  };
}

export default function DashboardSettingsRoute({ params }: DashboardSettingsRouteProps) {
  const locale = resolveLocale(params.locale);
  const server = getDashboardServer(params.id);

  if (!server) {
    notFound();
  }

  return <DashboardSettingsPage locale={locale} server={server} />;
}
