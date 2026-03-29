import { getMessages, resolveLocale } from "@/lib/i18n";
import { ChrpMarketingPage } from "@/ui/pages/chrp-marketing-page";

interface ProjectRoutePageProps {
  params: {
    locale: string;
  };
}

export default function ChrpPage({ params }: ProjectRoutePageProps) {
  const locale = resolveLocale(params.locale);
  const messages = getMessages(locale);

  return <ChrpMarketingPage messages={messages} />;
}
