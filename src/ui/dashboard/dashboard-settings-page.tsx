import type { Locale } from "@/config/site.config";
import type { DashboardServer } from "@/lib/dashboard-model";
import { DashboardMessagePanel } from "@/ui/dashboard/dashboard-primitives";

export function DashboardSettingsPage({ locale }: { locale: Locale; server: DashboardServer }) {
  return (
    <DashboardMessagePanel
      title={locale === "en" ? "Settings" : "Настройки"}
      body={locale === "en" ? "Legacy settings surface has been replaced by General, Access, and Localization." : "Legacy-поверхность Settings заменена на General, Access и Localization."}
    />
  );
}
