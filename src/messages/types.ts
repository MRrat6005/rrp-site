import type { ProjectId } from "@/config/site.config";

export interface LabeledValue {
  label: string;
  value: string;
}

export interface SectionCopy {
  title: string;
  body: string;
}

export interface SiteMessages {
  localeName: string;
  nav: {
    projects: string;
    about: string;
    faq: string;
    docs: string;
    openDashboard: string;
    switchLanguage: string;
    menu: string;
    close: string;
    backToSite: string;
  };
  home: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    spotlightTitle: string;
    spotlightBody: string;
    stats: readonly LabeledValue[];
    pillars: readonly SectionCopy[];
  };
  about: {
    title: string;
    intro: string;
    sections: readonly SectionCopy[];
  };
  faq: {
    title: string;
    intro: string;
    items: readonly SectionCopy[];
  };
  docs: {
    title: string;
    intro: string;
    sections: readonly SectionCopy[];
  };
  login: {
    title: string;
    intro: string;
    panelTitle: string;
    panelBody: string;
  };
  privacy: {
    title: string;
    intro: string;
    sections: readonly SectionCopy[];
  };
  filePolicy: {
    title: string;
    intro: string;
    sections: readonly SectionCopy[];
  };
  terms: {
    title: string;
    intro: string;
    sections: readonly SectionCopy[];
  };
  contacts: {
    title: string;
    intro: string;
    sections: readonly SectionCopy[];
  };
  servers: {
    title: string;
    intro: string;
    panels: readonly SectionCopy[];
  };
  projects: {
    introLabel: string;
    items: Record<
      ProjectId,
      {
        tagline: string;
        summary: string;
        specs: readonly LabeledValue[];
      }
    >;
  };
  footer: {
    privacy: string;
    filePolicy: string;
    terms: string;
    contacts: string;
    copyright: string;
  };
  redirect: {
    title: string;
    body: string;
    fallback: string;
  };
}

