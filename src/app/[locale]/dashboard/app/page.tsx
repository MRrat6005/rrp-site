import { Suspense } from "react";

import type { Locale } from "@/config/site.config";
import { createDashboardPendingProgress } from "@/lib/dashboard-api";
import { resolveLocale } from "@/lib/i18n";
import { DashboardServerEntryGate } from "@/ui/dashboard/dashboard-progress";
import { DashboardAppRoute } from "@/ui/dashboard/dashboard-route-runtime";

interface DashboardAppRoutePageProps {
  params: {
    locale: string;
  };
}

function DashboardAppFallback({ locale }: { locale: Locale }) {
  return <DashboardServerEntryGate locale={locale} progress={createDashboardPendingProgress("entry")} />;
}

export default function DashboardAppRoutePage({
  params
}: DashboardAppRoutePageProps) {
  const locale = resolveLocale(params.locale);

  return (
    <Suspense fallback={<DashboardAppFallback locale={locale} />}>
      <DashboardAppRoute locale={locale} />
    </Suspense>
  );
}

