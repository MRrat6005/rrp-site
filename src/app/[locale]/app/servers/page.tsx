import { getMessages, resolveLocale } from "@/lib/i18n";
import { ServersPage } from "@/ui/pages/servers-page";

interface ServersRoutePageProps {
  params: {
    locale: string;
  };
}

export default function ServersRoutePage({
  params
}: ServersRoutePageProps) {
  const locale = resolveLocale(params.locale);
  const messages = getMessages(locale);

  return <ServersPage locale={locale} messages={messages} />;
}
