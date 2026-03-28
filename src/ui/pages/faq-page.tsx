import type { SiteMessages } from "@/messages/types";
import { SimpleSectionPage } from "@/ui/pages/simple-section-page";

interface FaqPageProps {
  messages: SiteMessages;
}

export function FaqPage({ messages }: FaqPageProps) {
  return (
    <SimpleSectionPage
      eyebrow={messages.faq.eyebrow}
      title={messages.faq.title}
      intro={messages.faq.intro}
      sections={messages.faq.sections}
      aside={messages.faq.aside}
    />
  );
}
