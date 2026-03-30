import { getMessages, getLocalizedPath, resolveLocale } from "@/lib/i18n";
import { SimpleSectionPage } from "@/ui/pages/simple-section-page";

interface TermsPageProps {
  params: {
    locale: string;
  };
}

export default function TermsPage({ params }: TermsPageProps) {
  const locale = resolveLocale(params.locale);
  const messages = getMessages(locale);

  return (
    <SimpleSectionPage
      eyebrow={messages.terms.eyebrow}
      title={messages.terms.title}
      intro={messages.terms.intro}
      sections={messages.terms.sections}
      aside={messages.terms.aside}
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
