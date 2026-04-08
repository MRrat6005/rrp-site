import type { Locale } from "@/config/site.config";
import type { DashboardServer } from "@/lib/dashboard-model";
import { DashboardMessagePanel } from "@/ui/dashboard/dashboard-primitives";

export function DashboardModulesPage({ locale }: { locale: Locale; server: DashboardServer }) {
  return (
    <DashboardMessagePanel
      title={locale === "en" ? "Modules" : "Модули"}
      body={locale === "en" ? "Modules are not exposed as a standalone dashboard section in this pass." : "В этот проход модули не выводятся как отдельный dashboard-раздел."}
    />
  );
}
