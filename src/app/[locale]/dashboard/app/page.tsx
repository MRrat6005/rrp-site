import { Suspense } from "react";

import type { Locale } from "@/config/site.config";
import { resolveLocale } from "@/lib/i18n";
import { getDashboardCopy } from "@/ui/dashboard/dashboard-copy";
import { DashboardAppRoute } from "@/ui/dashboard/dashboard-route-runtime";

interface DashboardAppRoutePageProps {
  params: {
    locale: string;
  };
}

function DashboardAppFallback({ locale }: { locale: Locale }) {
  const copy = getDashboardCopy(locale);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_24%),linear-gradient(180deg,#0d0e10_0%,#090a0b_100%)] px-4 py-10 text-white sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto w-full max-w-[1500px] rounded-[1.25rem] border border-white/[0.05] bg-[rgba(13,14,16,0.84)] px-6 py-8 text-sm text-white/56 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] backdrop-blur-sm sm:px-8">
        {copy.runtime.loading}
      </div>
    </div>
  );
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
