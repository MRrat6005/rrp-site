import { notFound } from "next/navigation";

import { getDashboardServer } from "@/lib/dashboard-mock";
import { resolveLocale } from "@/lib/i18n";
import { DashboardSettingsPage } from "@/ui/dashboard/dashboard-settings-page";

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
  const server = getDashboardServer(params.id, locale);

  if (!server) {
    notFound();
  }

  return <DashboardSettingsPage locale={locale} server={server} />;
}

