import { notFound } from "next/navigation";

import { resolveLocale } from "@/lib/i18n";
import { getDashboardServer } from "@/lib/dashboard-mock";
import { DashboardBrandingPage } from "@/ui/dashboard/dashboard-branding-page";

interface DashboardBrandingRouteProps {
  params: {
    locale: string;
    id: string;
  };
}

export default function DashboardBrandingRoute({ params }: DashboardBrandingRouteProps) {
  const locale = resolveLocale(params.locale);
  const server = getDashboardServer(params.id);

  if (!server) {
    notFound();
  }

  return <DashboardBrandingPage locale={locale} server={server} />;
}
