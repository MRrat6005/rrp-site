import { getMessages, resolveLocale } from "@/lib/i18n";
import { SimpleSectionPage } from "@/ui/pages/simple-section-page";

interface ContactsPageProps {
  params: {
    locale: string;
  };
}

export default function ContactsPage({ params }: ContactsPageProps) {
  const locale = resolveLocale(params.locale);
  const messages = getMessages(locale);

  return (
    <SimpleSectionPage
      eyebrow="Contact"
      title={messages.contacts.title}
      intro={messages.contacts.intro}
      sections={messages.contacts.sections}
    />
  );
}
