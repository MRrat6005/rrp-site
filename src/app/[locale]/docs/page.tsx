import { getMessages, getLocalizedPath, resolveLocale } from "@/lib/i18n";
import { SimpleSectionPage } from "@/ui/pages/simple-section-page";

interface DocsPageProps {
  params: {
    locale: string;
  };
}

export default function DocsPage({ params }: DocsPageProps) {
  const locale = resolveLocale(params.locale);
  const messages = getMessages(locale);

  return (
    <SimpleSectionPage
      eyebrow="Docs"
      title={messages.docs.title}
      intro={messages.docs.intro}
      sections={messages.docs.sections}
      actions={[
        {
          href: getLocalizedPath(locale, "login"),
          label: messages.login.title,
          variant: "secondary"
        },
        {
          href: getLocalizedPath(locale, "app/servers"),
          label: messages.nav.openDashboard
        }
      ]}
    />
  );
}
