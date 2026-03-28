import { getMessages, resolveLocale } from "@/lib/i18n";
import { ProjectPage } from "@/ui/pages/project-page";

interface ProjectRoutePageProps {
  params: {
    locale: string;
  };
}

export default function ChrpPage({ params }: ProjectRoutePageProps) {
  const locale = resolveLocale(params.locale);
  const messages = getMessages(locale);

  return <ProjectPage locale={locale} projectId="chrp" messages={messages} />;
}
