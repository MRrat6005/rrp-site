import { getMessages, resolveLocale } from "@/lib/i18n";
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
      eyebrow="Terms"
      title={messages.terms.title}
      intro={messages.terms.intro}
      sections={messages.terms.sections}
    />
  );
}
