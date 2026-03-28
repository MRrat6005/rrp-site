import { getMessages, getLocalizedPath, resolveLocale } from "@/lib/i18n";
import { SimpleSectionPage } from "@/ui/pages/simple-section-page";

interface AboutPageProps {
  params: {
    locale: string;
  };
}

export default function AboutPage({ params }: AboutPageProps) {
  const locale = resolveLocale(params.locale);
  const messages = getMessages(locale);

  return (
    <SimpleSectionPage
      eyebrow="About"
      title={messages.about.title}
      intro={messages.about.intro}
      sections={messages.about.sections}
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
