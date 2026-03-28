import { getMessages, resolveLocale } from "@/lib/i18n";
import { FaqPage } from "@/ui/pages/faq-page";

interface FaqRoutePageProps {
  params: {
    locale: string;
  };
}

export default function FaqRoutePage({ params }: FaqRoutePageProps) {
  const locale = resolveLocale(params.locale);
  const messages = getMessages(locale);

  return <FaqPage messages={messages} />;
}
