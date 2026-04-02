import { notFound } from "next/navigation";

import { getDashboardServer } from "@/lib/dashboard-mock";
import { resolveLocale } from "@/lib/i18n";
import { DashboardBrandingPage } from "@/ui/dashboard/dashboard-branding-page";

interface DashboardBrandingRoutePageProps {
  params: {
    locale: string;
    id: string;
  };
}

export default function DashboardBrandingRoutePage({
  params
}: DashboardBrandingRoutePageProps) {
  const locale = resolveLocale(params.locale);
  const server = getDashboardServer(params.id, locale);

  if (!server) {
    notFound();
  }

  return <DashboardBrandingPage locale={locale} server={server} />;
}

