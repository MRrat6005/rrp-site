import { getMessages, resolveLocale } from "@/lib/i18n";
import { AboutMarketingPage } from "@/ui/pages/about-marketing-page";

interface AboutPageProps {
  params: {
    locale: string;
  };
}

export default function AboutPage({ params }: AboutPageProps) {
  const locale = resolveLocale(params.locale);
  const messages = getMessages(locale);

  return <AboutMarketingPage locale={locale} messages={messages} />;
}
