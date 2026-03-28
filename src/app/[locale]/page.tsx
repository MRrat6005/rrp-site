import { getMessages, resolveLocale } from "@/lib/i18n";
import { HomePage } from "@/ui/pages/home-page";

interface LocaleHomePageProps {
  params: {
    locale: string;
  };
}

export default function LocaleHomePage({ params }: LocaleHomePageProps) {
  const locale = resolveLocale(params.locale);
  const messages = getMessages(locale);

  return <HomePage locale={locale} messages={messages} />;
}
