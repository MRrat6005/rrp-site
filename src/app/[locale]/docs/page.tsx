import { siteConfig } from "@/config/site.config";
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
      eyebrow={messages.docs.eyebrow}
      title={messages.docs.title}
      intro={messages.docs.intro}
      sections={messages.docs.sections}
      aside={messages.docs.aside}
      actions={[
        {
          href: getLocalizedPath(locale, siteConfig.ctaRoutes.contacts),
          label: messages.footer.contacts,
          variant: "secondary"
        },
        {
          href: getLocalizedPath(locale, siteConfig.ctaRoutes.dashboard),
          label: messages.nav.openDashboard
        }
      ]}
    />
  );
}
