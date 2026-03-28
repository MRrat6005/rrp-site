import { getMessages, resolveLocale } from "@/lib/i18n";
import { SimpleSectionPage } from "@/ui/pages/simple-section-page";

interface FilePolicyPageProps {
  params: {
    locale: string;
  };
}

export default function FilePolicyPage({ params }: FilePolicyPageProps) {
  const locale = resolveLocale(params.locale);
  const messages = getMessages(locale);

  return (
    <SimpleSectionPage
      eyebrow="Policy"
      title={messages.filePolicy.title}
      intro={messages.filePolicy.intro}
      sections={messages.filePolicy.sections}
    />
  );
}
