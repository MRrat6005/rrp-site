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
  common: {
    projectDirections: "Project directions",
    specs: "Specs",
    contactChannels: "Contact channels",
    currentLocale: "Current locale"
  },
  home: {
    eyebrow: "Creative team and public shell",
    title: "Royal Rats Productions builds quiet worlds, tools, and control surfaces.",
    subtitle:
      "RRP is presented here as a creative ecosystem: one direction shaped around community roleplay, another around the dashboard workspace that keeps everything aligned behind the scenes.",
    primaryCta: "Open Dashboard",
    secondaryCta: "Read Docs",
    frameEyebrow: "Studio note",
    frameTitle: "Dark, static, and built to hold real projects without feeling like a template.",
    frameBody:
      "The shell stays export-safe for GitHub Pages, keeps bilingual routing intact, and leaves room for authored copy instead of borrowed startup patterns.",
    directionsEyebrow: "Main directions",
    directionsTitle: "Two different surfaces, one shared language.",
    directionsIntro:
      "CHRP and CROWN are framed as the two visible directions inside the RRP ecosystem: one outward-facing and community-shaped, one operational and workspace-driven.",
    notes: [
      {
        title: "Hand-built composition",
        body: "Spacing, borders, and typography carry most of the identity. The interface avoids loud gradients, ornamental iconography, and stock SaaS rhythms."
      },
      {
        title: "Static by intent",
        body: "Everything on the public side remains compatible with Next.js static export, locale pre-rendering, and GitHub Pages delivery."
      },
      {
        title: "Prepared for growth",
        body: "Brand metadata, project routes, footer structure, contacts placeholders, and CTA targets are centralized so the shell can evolve without reworking the layout."
      }
    ],
    stats: [
      { label: "Locale routing", value: "RU / EN" },
      { label: "Main directions", value: "CHRP + CROWN" },
      { label: "Delivery mode", value: "Static export" }
    ]
  },
  about: {
    eyebrow: "About RRP",
    title: "A small ecosystem with room for atmosphere, systems, and operations.",
    intro:
      "Royal Rats Productions is framed here less like a company brochure and more like a carefully maintained front door for a creative team and its connected projects.",
    sections: [
      {
        title: "Creative posture",
        body: "The public shell speaks in a restrained voice. It leaves room for tone, lore, process, and documentation without collapsing into either corporate copy or marketing noise."
      },
      {
        title: "Shared structure",
        body: "The same dark visual language ties together public pages, project entries, and the dashboard path, so the site feels authored as one system instead of assembled from parts."
      },
      {
        title: "Operational discipline",
        body: "Routing, links, and content models are kept predictable. That makes the shell easy to expand while preserving static delivery constraints."
      }
    ],
    aside: {
      eyebrow: "Why this shell",
      title: "Designed to feel maintained, not generated.",
      body: "The structure is intentionally calm: clear hierarchy, a durable dark palette, and enough detail to feel public-ready before final production copy arrives.",
      items: [
        { label: "Position", value: "Creative team" },
        { label: "Surface", value: "Public + dashboard" },
        { label: "Tone", value: "Quiet / premium" }
      ]
    }
  },
  faq: {
    eyebrow: "FAQ",
    title: "Short answers for the questions visitors are most likely to ask first.",
    intro:
      "This section is still a first-pass layer, but it already reflects the technical and editorial boundaries of the site instead of using filler copy.",
    sections: [
      {
        title: "Is the public site fully static?",
        body: "Yes. The public shell is built for Next.js static export and GitHub Pages delivery, with no backend dependencies introduced here."
      },
      {
        title: "Why are there two locales in the URL?",
        body: "Russian and English are both preserved as explicit route segments so the static build stays predictable and the language context is always visible."
      },
      {
        title: "What is CHRP in this structure?",
        body: "CHRP is framed as the community and roleplay direction inside the RRP ecosystem. Its public page acts as a focused entry point rather than a generic product card."
      },
      {
        title: "What is CROWN in this structure?",
        body: "CROWN is presented as the dashboard and control workspace. On the public side it works as the operational counterpart to the community-facing surface."
      },
      {
        title: "Can this deploy on a custom domain?",
        body: "Yes. The project keeps static export compatibility and now includes a public/CNAME file for the custom domain flow."
      },
      {
        title: "Does this shell include auth or server logic?",
        body: "No. The site intentionally stops at the public shell and dashboard entry surfaces without introducing backend, auth, or server dependencies."
      }
    ],
    aside: {
      eyebrow: "Reading guide",
      title: "Built to answer practical questions quickly.",
      body: "The FAQ keeps to routing, deployment, positioning, and project boundaries, which are the parts most likely to matter before deeper docs are written.",
      items: [
        { label: "Audience", value: "Visitors / contributors" },
        { label: "Focus", value: "Routing / purpose" },
        { label: "State", value: "First-pass copy" }
      ]
    }
  },
  docs: {
    eyebrow: "Docs",
    title: "A restrained place for setup notes, project context, and deployment references.",
    intro:
      "The docs section is structured as a calm technical layer. It is ready for real instructions without needing a different layout language from the rest of the site.",
    sections: [
      {
        title: "Foundation",
        body: "The site runs on Next.js App Router with Tailwind and static export enabled, keeping the public shell lightweight and predictable."
      },
      {
        title: "Content model",
        body: "Brand metadata, route segments, project definitions, and CTA targets live in the typed site config, while locale-specific copy stays in the message files."
      },
      {
        title: "Deployment",
        body: "GitHub Pages remains the target. Repository base paths are still supported, and the custom-domain path now resolves through the project CNAME file."
      }
    ],
    aside: {
      eyebrow: "What lives here",
      title: "Operational notes without a heavy documentation framework.",
      body: "This page is meant to hold setup guidance, publishing notes, and editorial references while staying visually aligned with the rest of the site.",
      items: [
        { label: "Build target", value: "Static export" },
        { label: "Hosting", value: "GitHub Pages" },
        { label: "Config style", value: "Typed / centralized" }
      ]
    }
  },
  login: {
    title: "Login",
    intro:
      "Authentication remains a placeholder doorway only. The public shell stays static and avoids shipping backend logic in this foundation.",
    panelTitle: "Access placeholder",
    panelBody:
      "This area can later connect to SSO, invite flows, or external identity without changing the public-facing shell."
  },
  privacy: {
    eyebrow: "Privacy",
    title: "A first-pass privacy page prepared for later policy language.",
    intro:
      "The current copy stays deliberately restrained: enough structure for publication, without pretending legal text already exists where it does not.",
    sections: [
      {
        title: "Scope",
        body: "This page is where collection boundaries, contact data handling, and site-level analytics notes can be documented once final policy wording is approved."
      },
      {
        title: "Storage",
        body: "Retention windows, storage locations, and deletion expectations can be added here without changing the shared shell or route map."
      },
      {
        title: "Transparency",
        body: "The structure is intentionally plain so later legal text can remain readable instead of being hidden inside decorative layout patterns."
      }
    ],
    aside: {
      eyebrow: "Status",
      title: "Structured now, finalized later.",
      body: "The legal pages are already part of the public route map so they can mature gradually instead of appearing as an afterthought.",
      items: [
        { label: "Page type", value: "Legal placeholder" },
        { label: "Tone", value: "Clear / minimal" },
        { label: "Purpose", value: "Public readiness" }
      ]
    }
  },
  filePolicy: {
    eyebrow: "File policy",
    title: "A public note on how uploaded or shared files may eventually be handled.",
    intro:
      "This first-pass version creates a stable place for future storage and moderation rules without inventing details that are not defined yet.",
    sections: [
      {
        title: "Accepted material",
        body: "Use this space later for file classes, size limits, and moderation expectations tied to community or dashboard workflows."
      },
      {
        title: "Handling rules",
        body: "Storage zones, review ownership, and removal procedures can be added here as the operational model becomes more concrete."
      },
      {
        title: "Publication fit",
        body: "Keeping the route public now makes the site feel complete, while still leaving room for future policy detail."
      }
    ],
    aside: {
      eyebrow: "Intent",
      title: "A placeholder with real structure.",
      body: "The page avoids legal theater. It simply reserves the place where file handling expectations will live when they are ready to be published."
    }
  },
  terms: {
    eyebrow: "Terms",
    title: "A compact route for future rules, boundaries, and public operating terms.",
    intro:
      "Like the other legal pages, this section is intentionally modest. It establishes where final terms will live without overstating what is already defined.",
    sections: [
      {
        title: "Use boundaries",
        body: "Later revisions can describe acceptable use, participation boundaries, and project-specific rules for public and dashboard-facing surfaces."
      },
      {
        title: "Change handling",
        body: "This is the right place to note how updated terms are announced, versioned, and made effective over time."
      },
      {
        title: "Shared language",
        body: "The visual treatment stays consistent with the rest of the site so the legal area feels integrated rather than attached on the side."
      }
    ],
    aside: {
      eyebrow: "Route role",
      title: "A quiet placeholder that still belongs in the main shell.",
      body: "Bringing terms into the same visual system keeps the public website cohesive even before final legal copy is complete.",
      items: [
        { label: "Surface", value: "Public route" },
        { label: "Purpose", value: "Future terms" },
        { label: "Style", value: "Minimal / legible" }
      ]
    }
  },
  contacts: {
    eyebrow: "Contacts",
    title: "A small set of placeholder channels for the public-facing shell.",
    intro:
      "The contacts page stays simple and deliberate. It reads like a maintained studio entry rather than a sales funnel or support center.",
    sections: [
      {
        title: "General reach",
        body: "Use the general inbox for broad questions about the site, project direction, or public documentation."
      },
      {
        title: "Studio notes",
        body: "The studio channel can later hold press, collaboration, or worldbuilding-related correspondence once the team wants that surface public."
      },
      {
        title: "Workspace route",
        body: "The CROWN-facing placeholder keeps the operational path separate from the broader public voice of the site."
      }
    ],
    aside: {
      eyebrow: "Contact posture",
      title: "Present, but intentionally low-noise.",
      body: "This page favors a few clear channels and short expectations over a long list of corporate departments or canned sales language.",
      items: [
        { label: "Primary mode", value: "Email placeholders" },
        { label: "Tone", value: "Studio-facing" },
        { label: "State", value: "Editable later" }
      ]
    },
    channels: {
      general: {
        label: "General inbox",
        note: "For broad questions, site notes, and public-facing communication."
      },
      studio: {
        label: "Studio line",
        note: "For creative direction, collaboration, and authored updates."
      },
      partners: {
        label: "CROWN route",
        note: "For dashboard-side coordination and workspace-related follow-up."
      }
    }
  },
  servers: {
    title: "CROWN workspace",
    intro:
      "Dashboard placeholder for the control surface: server inventory, environment summaries, and operator-facing notes.",
    panels: [
      {
        title: "Fleet overview",
        body: "Reserve this panel for environment counts, status summaries, and system-wide visibility."
      },
      {
        title: "Current changes",
        body: "Use this space for maintenance windows, rollout notes, and operational messages once the dashboard is connected."
      },
      {
        title: "Workspace access",
        body: "Role-based tools and actions can be attached later without changing the public shell structure."
      }
    ]
  },
  projects: {
    introLabel: "Project focus",
    items: {
      chrp: {
        navDescription: "Roleplay project and community direction.",
        categoryLabel: "Roleplay direction",
        tagline: "A roleplay world and community direction with room for atmosphere, structure, and continuity.",
        summary:
          "CHRP is the outward-facing side of the ecosystem: a public project surface shaped around community presence, setting, and long-term direction rather than generic product language.",
        sections: [
          {
            title: "Community-facing",
            body: "The CHRP page is meant to feel like an entry into a living project direction. It can later expand into lore, access notes, timelines, or participation guidance."
          },
          {
            title: "Narrative discipline",
            body: "Even as a placeholder, the page keeps a deliberate tone and avoids overexplaining. The structure leaves room for atmosphere without turning abstract."
          },
          {
            title: "Shared shell",
            body: "CHRP still belongs to the same visual system as the rest of RRP, which keeps the ecosystem coherent while allowing the content voice to stay distinct."
          }
        ],
        specs: [
          { label: "Direction", value: "Roleplay / community" },
          { label: "Current state", value: "Public-first page" },
          { label: "CTA route", value: "/projects/chrp" }
        ],
        surface: {
          eyebrow: "Page posture",
          title: "Framed as a project world, not a SaaS feature.",
          body: "The composition gives CHRP enough presence to feel like a standalone direction while still sitting naturally inside the larger RRP shell."
        }
      },
      crown: {
        navDescription: "Dashboard and control workspace.",
        categoryLabel: "Dashboard workspace",
        tagline: "A dashboard workspace for control, routing, and the operational layer behind the public surface.",
        summary:
          "CROWN is framed as the internal-facing workspace: the place where control surfaces, server summaries, and disciplined operational context begin to take shape.",
        sections: [
          {
            title: "Control surface",
            body: "CROWN is positioned as the dashboard-side layer, suited to summaries, access-aware tooling, and the calm structure expected from an operator workspace."
          },
          {
            title: "Clear hierarchy",
            body: "The page emphasizes panels, notes, and routing rather than spectacle. That keeps the project premium and credible instead of theatrical."
          },
          {
            title: "Bridge to the shell",
            body: "The public site points into CROWN without pretending to implement the full application. The boundary stays clean and static-export friendly."
          }
        ],
        specs: [
          { label: "Direction", value: "Dashboard / control" },
          { label: "Current state", value: "Workspace shell" },
          { label: "CTA route", value: "/projects/crown" }
        ],
        surface: {
          eyebrow: "Workspace posture",
          title: "Framed as the operational room behind the curtain.",
          body: "CROWN is intentionally presented with discipline: compact, legible, and ready to expand into a real control workspace without changing the visual language."
        }
      }
    }
  },
  footer: {
    privacy: "Privacy",
    filePolicy: "File Policy",
    terms: "Terms",
    contacts: "Contacts",
    faq: "FAQ",
    docs: "Docs",
    subtitle: "A quiet shell for the projects, notes, and control surfaces gathered under RRP.",
    copyright: "Royal Rats Productions"
  },
  redirect: {
    title: "Choosing language",
    body: "The site is selecting the nearest locale and opening the public shell.",
    fallback: "Continue manually"
  }
} satisfies SiteMessages;
