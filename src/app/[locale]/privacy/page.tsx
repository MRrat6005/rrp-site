import { getMessages, getLocalizedPath, resolveLocale } from "@/lib/i18n";
import { SimpleSectionPage } from "@/ui/pages/simple-section-page";

interface PrivacyPageProps {
  params: {
    locale: string;
  };
}

export default function PrivacyPage({ params }: PrivacyPageProps) {
  const locale = resolveLocale(params.locale);
  const messages = getMessages(locale);

  return (
    <SimpleSectionPage
      eyebrow={messages.privacy.eyebrow}
      title={messages.privacy.title}
      intro={messages.privacy.intro}
      sections={messages.privacy.sections}
      aside={messages.privacy.aside}
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
