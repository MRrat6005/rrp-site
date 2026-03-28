import { getMessages, resolveLocale } from "@/lib/i18n";
import { ContactsPage } from "@/ui/pages/contacts-page";

interface ContactsPageProps {
  params: {
    locale: string;
  };
}

export default function ContactsRoutePage({ params }: ContactsPageProps) {
  const locale = resolveLocale(params.locale);
  const messages = getMessages(locale);

  return <ContactsPage locale={locale} messages={messages} />;
}
