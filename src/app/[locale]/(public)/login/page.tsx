import { getMessages, resolveLocale } from "@/lib/i18n";
import { LoginPage } from "@/ui/pages/login-page";

interface LoginRoutePageProps {
  params: {
    locale: string;
  };
}

export default function LoginRoutePage({ params }: LoginRoutePageProps) {
  const locale = resolveLocale(params.locale);
  const messages = getMessages(locale);

  return <LoginPage locale={locale} messages={messages} />;
}
