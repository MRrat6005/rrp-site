import { getMessages, resolveLocale } from "@/lib/i18n";
import { CrownEntryPage } from "@/ui/pages/crown-entry-page";

interface ProjectRoutePageProps {
  params: {
    locale: string;
  };
}

export default function CrownPage({ params }: ProjectRoutePageProps) {
  const locale = resolveLocale(params.locale);
  const messages = getMessages(locale);

  return <CrownEntryPage locale={locale} messages={messages} />;
}
