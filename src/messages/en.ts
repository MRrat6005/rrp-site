import type { SiteMessages } from "@/messages/types";

export const enMessages = {
  localeName: "English",
  nav: {
    projects: "Projects",
    about: "About",
    faq: "FAQ",
    docs: "Materials",
    openDashboard: "Open Dashboard",
    switchLanguage: "Language",
    menu: "Menu",
    close: "Close",
    backToSite: "Back to site"
  },
  common: {
    projectDirections: "Main directions",
    specs: "Key details",
    contactChannels: "Contact channels",
    currentLocale: "Current locale"
  },
  home: {
    eyebrow: "The RRP creative team",
    title: "Royal Rats Productions brings worlds, projects, and workspaces into one calm public surface.",
    subtitle:
      "This is the clearest way into RRP: CHRP carries the roleplay and community direction, while CROWN holds the internal workspace and project systems behind it.",
    primaryCta: "Open Dashboard",
    secondaryCta: "View materials",
    frameEyebrow: "How RRP is framed",
    frameTitle: "The public site should feel clear and deliberate, not crowded.",
    frameBody:
      "That is why the layout leaves more room to breathe, uses a steadier hierarchy, and keeps the dark tone without leaning on noise or decorative pressure.",
    directionsEyebrow: "Two directions",
    directionsTitle: "CHRP and CROWN do different work, but belong to the same language.",
    directionsIntro:
      "One direction is community-facing and shaped by atmosphere. The other keeps order, access, and internal coordination behind the scenes.",
    notes: [
      {
        title: "Less noise",
        body: "The interface now feels lighter: fewer heavy frames, fewer utility accents, and more room for the actual directions to lead the page."
      },
      {
        title: "Human copy",
        body: "The public text reads like it belongs to a real team. It avoids startup filler, technical throat-clearing, and generic landing-page phrasing."
      },
      {
        title: "Built to grow",
        body: "The shell still leaves space for future material, direction pages, and a fuller CROWN workspace without changing the site’s structure."
      }
    ],
    stats: [
      { label: "Focus", value: "Creative work and systems" },
      { label: "Directions", value: "CHRP and CROWN" },
      { label: "Format", value: "Public site and dashboard entry" }
    ]
  },
  about: {
    eyebrow: "About RRP",
    title: "RRP is a creative team holding together project worlds, working discipline, and a careful public presence.",
    intro:
      "This is not framed as a corporate brochure or a legal façade. It is a calm front door into the RRP ecosystem, showing how the public side, the internal workspace, and the broader team voice fit together.",
    sections: [
      {
        title: "Creative foundation",
        body: "RRP is presented as a team rather than a faceless brand. That keeps atmosphere, project character, and reader respect at the center of the public site."
      },
      {
        title: "Shared system",
        body: "CHRP, CROWN, and the supporting public pages live inside one visual environment, so the site feels authored as a whole even when each direction serves a different role."
      },
      {
        title: "Working discipline",
        body: "Routes, pages, and copy stay simple and predictable. That makes the shell easier to extend without rebuilding the foundation later."
      }
    ],
    aside: {
      eyebrow: "What matters",
      title: "The site should already feel maintained and alive.",
      body: "RRP is presented without corporate theater and without startup noise. The goal is clarity, restraint, and the sense that a real team stands behind the work.",
      items: [
        { label: "Position", value: "Creative team" },
        { label: "Surfaces", value: "Public site and CROWN" },
        { label: "Tone", value: "Restrained and confident" }
      ]
    }
  },
  faq: {
    eyebrow: "FAQ",
    title: "Short answers to the questions most visitors ask first.",
    intro:
      "This section exists to orient people quickly. It explains what the site is for, where the main directions live, and what this public shell is meant to do right now.",
    sections: [
      {
        title: "Is this a fully public site?",
        body: "Yes. The public side of RRP works as a standalone external surface, with a home page, supporting materials, direction pages, and an entry point into CROWN."
      },
      {
        title: "Why are there two locales?",
        body: "Russian and English are both visible so visitors can open the site in the right language without losing context or relying on hidden switching."
      },
      {
        title: "What is CHRP?",
        body: "CHRP is the roleplay and community direction inside RRP. It carries the outward-facing atmosphere of the project and the public point of entry for that side of the ecosystem."
      },
      {
        title: "What is CROWN?",
        body: "CROWN is the dashboard and internal workspace. On the public site it is framed as a distinct direction and remains the main CTA."
      },
      {
        title: "Will the site keep growing?",
        body: "Yes. The foundation is already shaped to accept more material, richer direction pages, and more CROWN detail without changing the overall shell."
      },
      {
        title: "Is RRP a company site?",
        body: "No. RRP is framed here as a creative team with its own projects, internal systems, and public-facing voice."
      }
    ],
    aside: {
      eyebrow: "Reading guide",
      title: "These are the questions that help visitors orient themselves fastest.",
      body: "The FAQ stays away from filler. Its job is to make the role of the site, CHRP, and CROWN immediately understandable.",
      items: [
        { label: "Audience", value: "Visitors and participants" },
        { label: "Focus", value: "Purpose and structure" },
        { label: "Format", value: "Short answers" }
      ]
    }
  },
  docs: {
    eyebrow: "Materials",
    title: "This is where supporting material can explain the RRP directions and their wider context.",
    intro:
      "The section does not try to behave like a heavy documentation hub. It is a calmer layer of notes, references, and orientation that can expand with the site over time.",
    sections: [
      {
        title: "Shared context",
        body: "This is the right place for plain-language explanations around RRP, CHRP, and CROWN, so visitors can quickly understand how the directions differ and connect."
      },
      {
        title: "Working notes",
        body: "As the site grows, this section can hold concise guides, editorial notes, and supporting material without needing a separate tone or layout system."
      },
      {
        title: "A useful anchor",
        body: "Materials help the website feel like a maintained environment around a team and its projects, rather than a one-screen showcase with nowhere else to go."
      }
    ],
    aside: {
      eyebrow: "Section role",
      title: "The materials should add clarity, not weight.",
      body: "If someone wants to understand RRP quickly, this section should offer real context in a quiet, readable form instead of turning into a technical dump.",
      items: [
        { label: "Purpose", value: "Context and notes" },
        { label: "Tone", value: "Calm and direct" },
        { label: "Format", value: "Short materials" }
      ]
    }
  },
  login: {
    title: "Login",
    intro:
      "This remains an entry point only. The public site does not pretend to be the full application and keeps the external layer separate from internal access.",
    panelTitle: "Workspace access",
    panelBody:
      "Later on, this area can connect to a real access system for CROWN without changing the character or structure of the public site."
  },
  privacy: {
    eyebrow: "Privacy",
    title: "This page can later hold a clear explanation of how RRP handles data on the public side.",
    intro:
      "For now it is an honest placeholder rather than a performance of finished legal language. The route already belongs to the site and can mature gradually.",
    sections: [
      {
        title: "What can live here",
        body: "Later versions can describe contact forms, messages, analytics, or any other data visitors may leave on the public surface."
      },
      {
        title: "Why the route exists now",
        body: "Even before the final text is ready, it matters that the site has a visible place for transparent rules instead of an afterthought in the footer."
      },
      {
        title: "How it should read",
        body: "The page should stay plain and legible so important wording remains easy to absorb without decorative distraction."
      }
    ],
    aside: {
      eyebrow: "Status",
      title: "The structure is ready; the final text can follow when needed.",
      body: "If a fuller policy is added later, it already has a proper route and a public-facing place inside the same shell.",
      items: [
        { label: "Type", value: "Future policy page" },
        { label: "Style", value: "Readable and calm" },
        { label: "Role", value: "Public transparency" }
      ]
    }
  },
  filePolicy: {
    eyebrow: "Files",
    title: "This route leaves space for file-handling rules if those scenarios become part of the public site or CROWN.",
    intro:
      "There is no invented policy language here. The page simply reserves a clear place for practical rules if file flows later become part of the ecosystem.",
    sections: [
      {
        title: "What could be clarified",
        body: "A later version could cover accepted formats, size limits, storage expectations, and removal flow for uploaded or shared material."
      },
      {
        title: "Why it matters early",
        body: "A public site feels more complete when it already has room for important rules, even before those rules need to be fully written out."
      },
      {
        title: "What should stay true",
        body: "Even if this page grows later, it should remain brief, legible, and aligned with the rest of the site instead of falling into dry utility language."
      }
    ],
    aside: {
      eyebrow: "Intent",
      title: "A normal place for future rules, without unnecessary theater.",
      body: "If RRP later opens public file flows, the relevant expectations will already have a natural place in the site structure."
    }
  },
  terms: {
    eyebrow: "Terms",
    title: "This page can later hold the general terms for using the public side of RRP and its related directions.",
    intro:
      "Right now it is an honest placeholder route. It shows that rules belong in the structure, without pretending final wording already exists.",
    sections: [
      {
        title: "General boundaries",
        body: "Future revisions can define basic expectations around the site, shared materials, and the separate directions inside the RRP ecosystem."
      },
      {
        title: "Changes over time",
        body: "If the rules evolve, this route gives them a clean place for versioning and public updates without turning the site into bureaucracy."
      },
      {
        title: "One shared language",
        body: "Even semi-formal pages should still feel like part of the same website, so the public shell does not fracture into unrelated tones."
      }
    ],
    aside: {
      eyebrow: "Route role",
      title: "A quiet service page inside the same public environment.",
      body: "When the final text arrives, it will already have the right place and presentation inside the broader RRP shell.",
      items: [
        { label: "Surface", value: "Public route" },
        { label: "Purpose", value: "Future terms" },
        { label: "Presentation", value: "Calm and clear" }
      ]
    }
  },
  contacts: {
    eyebrow: "Contacts",
    title: "If you want to reach the RRP team, this page keeps the first routes clear and easy to read.",
    intro:
      "The contact page is not turned into a sales panel or a support maze. It exists to offer a respectful first point of contact for the team and its directions.",
    sections: [
      {
        title: "General questions",
        body: "Use the main inbox for questions about the site, the RRP directions, or the public-facing material."
      },
      {
        title: "Studio line",
        body: "A separate address can carry conversations around creative direction, collaboration, and the more authored side of the work."
      },
      {
        title: "CROWN route",
        body: "The CROWN contact keeps the workspace side distinct from the broader public voice and makes it easier to reach the right part of the project."
      }
    ],
    aside: {
      eyebrow: "Contact tone",
      title: "Short, clear, and low-friction.",
      body: "If someone is writing to RRP for the first time, it should be obvious where to go and what each route is for.",
      items: [
        { label: "Format", value: "Email routes" },
        { label: "Tone", value: "Respectful and direct" },
        { label: "Purpose", value: "First contact" }
      ]
    },
    channels: {
      general: {
        label: "General inbox",
        note: "For questions about the site, the RRP directions, and public-facing material."
      },
      studio: {
        label: "Studio line",
        note: "For creative direction, collaboration, and authored topics."
      },
      partners: {
        label: "CROWN route",
        note: "For workspace-side questions, coordination, and internal follow-up."
      }
    }
  },
  servers: {
    title: "CROWN workspace",
    intro:
      "This early CROWN surface points toward the internal workspace: summaries, notes, and access points that can later expand into a fuller operating layer.",
    panels: [
      {
        title: "Shared overview",
        body: "This panel can hold the broad picture of the internal environment, giving the team a clear starting point inside the operational layer."
      },
      {
        title: "Current changes",
        body: "Use this area for maintenance notes, important updates, and short operating messages inside CROWN."
      },
      {
        title: "Access and actions",
        body: "As CROWN grows, this is where the tools and actions that belong to the internal workspace can start to live."
      }
    ]
  },
  projects: {
    introLabel: "Direction",
    items: {
      chrp: {
        navDescription: "Roleplay direction and community.",
        categoryLabel: "Roleplay direction",
        tagline: "A direction for worldbuilding, roleplay, and community life shaped by atmosphere and internal continuity.",
        summary:
          "CHRP is the more open and public side of RRP. It carries the mood of the project, its longer rhythm, and the sense of a community worth returning to.",
        sections: [
          {
            title: "An entry into the world",
            body: "The CHRP page should help visitors feel the direction from the first screen, without collapsing into product language or generic spectacle."
          },
          {
            title: "Community rhythm",
            body: "This direction is built around people, tone, and long-term continuity. It needs a more attentive and living voice because of that."
          },
          {
            title: "Part of the wider RRP shell",
            body: "CHRP keeps its own character while still belonging naturally inside the larger RRP environment."
          }
        ],
        specs: [
          { label: "Focus", value: "Roleplay and community" },
          { label: "Format", value: "Public-facing direction" },
          { label: "Route", value: "/projects/chrp" }
        ],
        surface: {
          eyebrow: "CHRP posture",
          title: "This is an entry into a living direction, not a card for an abstract product.",
          body: "CHRP should feel like a distinct world inside RRP, with its own atmosphere, voice, and public point of entry for the community."
        }
      },
      crown: {
        navDescription: "Dashboard and workspace.",
        categoryLabel: "Dashboard workspace",
        tagline: "An internal direction for access, coordination, and the order behind the public side of the project.",
        summary:
          "CROWN is the control workspace inside the RRP ecosystem. It carries the more disciplined, operational side of the work and the systems that usually stay behind the curtain.",
        sections: [
          {
            title: "Working surface",
            body: "CROWN exists for calm organization: notes, access, routing, and the internal panels that can gradually become part of a fuller workspace."
          },
          {
            title: "Clear hierarchy",
            body: "This direction values order over spectacle. That is why it leans on a clear structure and a composed tone rather than heavy theatrics."
          },
          {
            title: "Connected to the public site",
            body: "The public side of RRP points toward CROWN as a real working layer, without pretending the full workspace already lives on this surface."
          }
        ],
        specs: [
          { label: "Focus", value: "Dashboard and control" },
          { label: "Format", value: "Workspace shell" },
          { label: "Route", value: "/projects/crown" }
        ],
        surface: {
          eyebrow: "CROWN posture",
          title: "This is the internal room for coordination, not a showcase built for effect.",
          body: "CROWN is presented with discipline and restraint so it carries the weight of a real workspace instead of reading like another marketing block."
        }
      }
    }
  },
  footer: {
    privacy: "Privacy",
    filePolicy: "Files",
    terms: "Terms",
    contacts: "Contacts",
    faq: "FAQ",
    docs: "Materials",
    subtitle: "The public RRP site, with CHRP for community-facing work and CROWN for the internal operating layer.",
    copyright: "Royal Rats Productions"
  },
  redirect: {
    title: "Choosing language",
    body: "The site is opening the closest locale and taking you into the public RRP shell.",
    fallback: "Continue manually"
  }
} satisfies SiteMessages;
