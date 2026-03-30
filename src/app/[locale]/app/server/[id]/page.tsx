import { notFound } from "next/navigation";

import { resolveLocale } from "@/lib/i18n";
import { getDashboardServer } from "@/lib/dashboard-mock";
import { DashboardWorkspacePage } from "@/ui/dashboard/dashboard-workspace-page";

interface DashboardServerPageProps {
  params: {
    locale: string;
    id: string;
  };
}

export default function DashboardServerPage({ params }: DashboardServerPageProps) {
  const locale = resolveLocale(params.locale);
  const server = getDashboardServer(params.id);

  if (!server) {
    notFound();
  }

  return <DashboardWorkspacePage locale={locale} server={server} />;
}
