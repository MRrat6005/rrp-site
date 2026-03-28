import type { SiteMessages } from "@/messages/types";

export const enMessages = {
  localeName: "English",
  nav: {
    projects: "Projects",
    about: "About",
    faq: "FAQ",
    docs: "Docs",
    openDashboard: "Open Dashboard",
    switchLanguage: "Language",
    menu: "Menu",
    close: "Close",
    backToSite: "Back to site"
  },
  home: {
    eyebrow: "Static-first product surface",
    title: "A dark, premium foundation for CHRP and CROWN.",
    subtitle:
      "Export-safe Next.js marketing shell prepared for GitHub Pages, bilingual navigation, and a clear path into the dashboard.",
    primaryCta: "Open Dashboard",
    secondaryCta: "Read Docs",
    spotlightTitle: "Built for static delivery",
    spotlightBody:
      "App Router, Tailwind, locale-aware pages, and export-ready routing without backend coupling.",
    stats: [
      { label: "Locales", value: "RU / EN" },
      { label: "Primary surfaces", value: "11 pages" },
      { label: "Theme mode", value: "Dark only" }
    ],
    pillars: [
      {
        title: "Structured for launch",
        body: "The layout is intentionally sparse, premium, and ready for real product copy instead of placeholder illustration clutter."
      },
      {
        title: "Static export aligned",
        body: "The root route redirects client-side, each locale path is prebuilt, and GitHub Pages base paths can be configured safely."
      },
      {
        title: "Config-driven foundation",
        body: "Projects, locales, footer routes, and dashboard entry points live in one typed config layer."
      }
    ]
  },
  about: {
    title: "About",
    intro: "RRP is presented here as a focused delivery layer for infrastructure-facing products and documentation.",
    sections: [
      {
        title: "Positioning",
        body: "This foundation keeps the product site concise: strong hierarchy, minimal motion, and room for technical credibility."
      },
      {
        title: "Design system",
        body: "Surfaces use a restrained dark palette, glass panels, and typography-led emphasis instead of icon-heavy marketing blocks."
      },
      {
        title: "Operational fit",
        body: "The codebase is organized so content, routes, and project metadata can evolve without touching deployment assumptions."
      }
    ]
  },
  faq: {
    title: "FAQ",
    intro: "Short placeholders prepared for final operational answers.",
    items: [
      {
        title: "Is this site fully static?",
        body: "Yes. The foundation is configured for Next.js static export and does not require a backend."
      },
      {
        title: "How is locale selection handled?",
        body: "The root page redirects on the client using browser language, with Russian as the default fallback."
      },
      {
        title: "Can GitHub Pages use a custom domain?",
        body: "Yes. Place a public/CNAME file to disable repository base path assumptions for custom-domain deployments."
      }
    ]
  },
  docs: {
    title: "Docs",
    intro: "Documentation can expand here without changing the shared shell.",
    sections: [
      {
        title: "Quick start",
        body: "Install dependencies, run the Next.js build, and publish the generated out directory to GitHub Pages."
      },
      {
        title: "Content model",
        body: "Edit typed config in src/config/site.config.ts and locale copy in src/messages to evolve navigation and text."
      },
      {
        title: "Deployment notes",
        body: "Use NEXT_PUBLIC_BASE_PATH for repository pages when needed, or add public/CNAME for a custom domain flow."
      }
    ]
  },
  login: {
    title: "Login",
    intro: "Authentication UI is intentionally represented as a placeholder entry point only.",
    panelTitle: "Access placeholder",
    panelBody: "Connect SSO, invite flow, or external auth later. This static foundation does not ship any backend logic."
  },
  privacy: {
    title: "Privacy",
    intro: "Placeholder policy page prepared for legal copy.",
    sections: [
      {
        title: "Data scope",
        body: "Document what telemetry, logs, or contact information is collected once production policy language is finalized."
      },
      {
        title: "Retention",
        body: "Add retention windows and operational ownership here."
      }
    ]
  },
  filePolicy: {
    title: "File Policy",
    intro: "Placeholder page for upload, retention, and storage constraints.",
    sections: [
      {
        title: "Allowed content",
        body: "Define permitted file classes, review requirements, and size limits."
      },
      {
        title: "Handling rules",
        body: "Clarify storage zones, deletion workflow, and audit expectations."
      }
    ]
  },
  terms: {
    title: "Terms",
    intro: "Placeholder terms page prepared for contractual language.",
    sections: [
      {
        title: "Service boundaries",
        body: "Outline commercial scope, acceptable use, and support assumptions."
      },
      {
        title: "Change management",
        body: "Describe how updates to terms are communicated and when they take effect."
      }
    ]
  },
  contacts: {
    title: "Contacts",
    intro: "Operational contact points can be finalized here.",
    sections: [
      {
        title: "Primary channel",
        body: "Replace this placeholder with a production email, ticket portal, or support form."
      },
      {
        title: "Escalations",
        body: "Add escalation owners, response windows, and regional availability details."
      }
    ]
  },
  servers: {
    title: "Servers",
    intro: "Dashboard surface placeholder for server inventory and environment summaries.",
    panels: [
      {
        title: "Fleet overview",
        body: "Reserve this area for environment counts, health summaries, and rollout snapshots."
      },
      {
        title: "Recent changes",
        body: "Use this panel for deployment notes, maintenance windows, or operator messages."
      },
      {
        title: "Access control",
        body: "Add role-based links and server actions once application logic is connected elsewhere."
      }
    ]
  },
  projects: {
    introLabel: "Project focus",
    items: {
      chrp: {
        tagline: "Control plane surface for operational routing.",
        summary:
          "CHRP is positioned as a high-clarity control layer with room for technical architecture, rollout notes, and server-facing detail.",
        specs: [
          { label: "Category", value: "Control plane" },
          { label: "State", value: "Placeholder content" },
          { label: "Surface", value: "Static detail page" }
        ]
      },
      crown: {
        tagline: "Premium workspace for policy and orchestration.",
        summary:
          "CROWN is framed as the governance-facing product layer with documentation and operator onboarding ready to expand.",
        specs: [
          { label: "Category", value: "Workspace" },
          { label: "State", value: "Placeholder content" },
          { label: "Surface", value: "Static detail page" }
        ]
      }
    }
  },
  footer: {
    privacy: "Privacy",
    filePolicy: "File Policy",
    terms: "Terms",
    contacts: "Contacts",
    copyright: "RRP Platform"
  },
  redirect: {
    title: "Choosing language",
    body: "The site is redirecting based on browser preferences.",
    fallback: "Continue manually"
  }
} satisfies SiteMessages;

