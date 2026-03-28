import type {
  ContactChannelId,
  FooterRouteKey,
  ProjectId
} from "@/config/site.config";

export interface LabeledValue {
  label: string;
  value: string;
}

export interface SectionCopy {
  title: string;
  body: string;
}

export interface EyebrowSectionCopy extends SectionCopy {
  eyebrow: string;
}

export interface PageAsideCopy {
  eyebrow: string;
  title: string;
  body: string;
  items?: readonly LabeledValue[];
}

export interface StructuredPageCopy {
  eyebrow: string;
  title: string;
  intro: string;
  sections: readonly SectionCopy[];
  aside: PageAsideCopy;
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
  common: {
    projectDirections: string;
    specs: string;
    contactChannels: string;
    currentLocale: string;
  };
  home: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    frameEyebrow: string;
    frameTitle: string;
    frameBody: string;
    directionsEyebrow: string;
    directionsTitle: string;
    directionsIntro: string;
    brandEyebrow: string;
    brandTitle: string;
    brandBody: string;
    finalEyebrow: string;
    finalTitle: string;
    finalBody: string;
    notes: readonly SectionCopy[];
    stats: readonly LabeledValue[];
  };
  about: StructuredPageCopy;
  faq: StructuredPageCopy;
  docs: StructuredPageCopy;
  login: {
    eyebrow: string;
    title: string;
    intro: string;
    summary: string;
    panelTitle: string;
    panelBody: string;
    highlights: readonly string[];
    legalNote: string;
  };
  privacy: StructuredPageCopy;
  filePolicy: StructuredPageCopy;
  terms: StructuredPageCopy;
  contacts: StructuredPageCopy & {
    channels: Record<
      ContactChannelId,
      {
        label: string;
        note: string;
      }
    >;
  };
  servers: {
    eyebrow: string;
    title: string;
    intro: string;
    status: readonly LabeledValue[];
    states: readonly EyebrowSectionCopy[];
    rail: PageAsideCopy;
  };
  crownEntry: {
    eyebrow: string;
    title: string;
    intro: string;
    summary: string;
    stats: readonly LabeledValue[];
    capabilities: readonly SectionCopy[];
    flow: readonly SectionCopy[];
    shell: PageAsideCopy;
  };
  projects: {
    introLabel: string;
    items: Record<
      ProjectId,
      {
        navDescription: string;
        categoryLabel: string;
        tagline: string;
        summary: string;
        sections: readonly SectionCopy[];
        specs: readonly LabeledValue[];
        surface: PageAsideCopy;
      }
    >;
  };
  footer: Record<FooterRouteKey, string> & {
    subtitle: string;
    copyright: string;
  };
  redirect: {
    title: string;
    body: string;
    fallback: string;
  };
}

