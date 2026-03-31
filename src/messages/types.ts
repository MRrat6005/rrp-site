import type {
  ContactChannelId,
  FooterRouteKey,
  ProjectId
} from "@/config/site.config";

export interface LabeledValue {
  label: string;
  value: string;
}

export interface StepCopy {
  title: string;
  body: string;
}

export interface ChrpStartStepCopy extends StepCopy {
  actionLabel: string;
  actionHref: string;
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

export interface AboutDirectionCopy extends EyebrowSectionCopy {
  key: ProjectId;
  ctaLabel: string;
}

export interface AboutTeamMemberCopy {
  nickname: string;
  role: string;
  description: string;
  imagePath: string;
  isPrimary?: boolean;
}

export interface AboutPageCopy {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    summary: string;
    primaryCta: string;
    secondaryCta: string;
    highlights: readonly string[];
    visualTitle: string;
    visualBody: string;
    visualStats: readonly LabeledValue[];
  };
  creates: {
    eyebrow: string;
    title: string;
    intro: string;
    layers: readonly SectionCopy[];
  };
  directions: {
    eyebrow: string;
    title: string;
    intro: string;
    items: readonly AboutDirectionCopy[];
  };
  approach: {
    eyebrow: string;
    title: string;
    intro: string;
    principles: readonly SectionCopy[];
  };
  team: {
    title: string;
    members: readonly AboutTeamMemberCopy[];
  };
  finalCta: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
}

export interface ComparisonRowCopy {
  label: string;
  liberty: string;
  chrp: string;
  others: string;
}

export interface ChrpTimelineStageCopy {
  title: string;
  years: string;
  body: string;
  isCurrent?: boolean;
}

export interface ChrpPageCopy {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBody: string;
  heroStats: readonly LabeledValue[];
  heroVisualTitle: string;
  heroVisualBody: string;
  heroVisualItems: readonly string[];
  primaryCta: string;
  secondaryCta: string;
  timeline: {
    title: string;
    intro: string;
    yearsLabel: string;
    stages: readonly ChrpTimelineStageCopy[];
  };
  start: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: readonly ChrpStartStepCopy[];
  };
  mediumRp: EyebrowSectionCopy;
  desiredRp: {
    eyebrow: string;
    title: string;
    intro: string;
    points: readonly SectionCopy[];
  };
  visuals: {
    eyebrow: string;
    title: string;
    intro: string;
    placeholders: readonly string[];
  };
  comparison: {
    eyebrow: string;
    title: string;
    intro: string;
    libertyLabel: string;
    chrpLabel: string;
    othersLabel: string;
    rows: readonly ComparisonRowCopy[];
  };
  rebirth: EyebrowSectionCopy;
  verification: {
    eyebrow: string;
    title: string;
    items: readonly string[];
    discordCardTitle: string;
    discordCardBody: string;
    discordCardButtonLabel: string;
  };

  finalCta: {
    eyebrow: string;
    title: string;
    body: string;
    buttonLabel: string;
  };
}

export interface CrownFeatureGroupCopy {
  title: string;
  body: string;
  items: readonly string[];
}

export interface CrownModuleItemCopy extends SectionCopy {
  shortBody?: string;
  slotPath: string;
}

export interface CrownStatusSignalCopy {
  label: string;
  value: string;
  note: string;
}

export interface CrownComparisonRowCopy {
  label: string;
  free: string;
  full: string;
  others: string;
}

export interface CrownVisualSlotCopy {
  eyebrow: string;
  title: string;
  body: string;
  slotLabel: string;
  slotPath: string;
}

export interface CrownPageCopy {
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    summary: string;
    primaryCta: string;
    secondaryCta: string;
    proofStrip: readonly string[];
    stats: readonly LabeledValue[];
    visual: CrownVisualSlotCopy;
  };
  status: {
    eyebrow: string;
    title: string;
    intro: string;
    summaryLabel: string;
    summaryValue: string;
    signals: readonly CrownStatusSignalCopy[];
    issueCtaLabel: string;
    issueCtaMeta: string;
    visual: CrownVisualSlotCopy;
  };
  capabilities: {
    eyebrow: string;
    title: string;
    intro: string;
    groups: readonly CrownFeatureGroupCopy[];
  };
  showcase: {
    eyebrow: string;
    title: string;
    intro: string;
    highlights: readonly string[];
    summaryTitle: string;
    summaryRows: readonly string[];
    visual: CrownVisualSlotCopy;
  };
  modules: {
    eyebrow: string;
    title: string;
    intro: string;
    items: readonly CrownModuleItemCopy[];
    footnote: string;
  };
  governance: {
    eyebrow: string;
    title: string;
    intro: string;
    pillars: readonly SectionCopy[];
    visual: CrownVisualSlotCopy;
  };
  comparison: {
    eyebrow: string;
    title: string;
    intro: string;
    freeLabel: string;
    fullLabel: string;
    othersLabel: string;
    priceLabel: string;
    priceFullNote: string;
    rows: readonly CrownComparisonRowCopy[];
  };

  finalCta: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
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
  about: AboutPageCopy;
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
  crownEntry: CrownPageCopy;
  chrpPage: ChrpPageCopy;
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

