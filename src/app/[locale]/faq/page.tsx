import { getMessages, getLocalizedPath, resolveLocale } from "@/lib/i18n";
import { SimpleSectionPage } from "@/ui/pages/simple-section-page";

interface FaqRoutePageProps {
  params: {
    locale: string;
  };
}

export default function FaqRoutePage({ params }: FaqRoutePageProps) {
  const locale = resolveLocale(params.locale);
  const messages = getMessages(locale);

  return (
    <SimpleSectionPage
      eyebrow={messages.faq.eyebrow}
      title={messages.faq.title}
      intro={messages.faq.intro}
      sections={messages.faq.sections}
      aside={messages.faq.aside}
      actions={[
        {
          href: getLocalizedPath(locale, "docs"),
          label: messages.nav.docs,
          variant: "secondary"
        },
        {
          href: getLocalizedPath(locale, "contacts"),
          label: messages.footer.contacts
        }
      ]}
    />
  );
}
