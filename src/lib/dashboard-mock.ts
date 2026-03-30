export type DashboardServerState = "connected" | "invite" | "inactive" | "test";
export type DashboardTone = "positive" | "warning" | "muted" | "info";
export type DashboardModuleKey =
  | "bank"
  | "social"
  | "weather"
  | "sessions"
  | "radio"
  | "rentals";
export type DashboardPageKey =
  | "workspace"
  | "overview"
  | "modules"
  | "settings"
  | "branding"
  | "licenses"
  | "status";

export interface DashboardMetric {
  label: string;
  value: string;
  note: string;
}

export interface DashboardActivity {
  title: string;
  detail: string;
  time: string;
  tone: DashboardTone;
}

export interface DashboardQuickAction {
  title: string;
  body: string;
  target: DashboardPageKey;
}

export interface DashboardModule {
  key: DashboardModuleKey;
  name: string;
  description: string;
  enabled: boolean;
  status: DashboardTone;
  note: string;
  actionLabel: string;
  lastEdited: string;
}

export interface DashboardSettingGroup {
  label: string;
  value: string;
  note: string;
}

export interface DashboardBrandingField {
  label: string;
  value: string;
  hint: string;
}

export interface DashboardLicenseRow {
  label: string;
  free: string;
  full: string;
}

export interface DashboardEntitlement {
  label: string;
  value: string;
  included: boolean;
}

export interface DashboardStatusEntry {
  label: string;
  value: string;
  note: string;
  tone: DashboardTone;
}

export interface DashboardServer {
  id: string;
  name: string;
  iconLabel: string;
  accent: string;
  state: DashboardServerState;
  description: string;
  region: string;
  memberCount: string;
  adminCount: string;
  channelCount: string;
  environment: string;
  plan: string;
  statusNote: string;
  syncLabel: string;
  overviewStats: DashboardMetric[];
  recentActivity: DashboardActivity[];
  quickActions: DashboardQuickAction[];
  modules: DashboardModule[];
  settingsGroups: DashboardSettingGroup[];
  brandingFields: DashboardBrandingField[];
  brandingAssets: DashboardMetric[];
  brandingPreviewNote: string;
  licenseSummary: string;
  licenseRenewal: string;
  licenseRows: DashboardLicenseRow[];
  entitlements: DashboardEntitlement[];
  statusGroups: {
    core: DashboardStatusEntry[];
    dashboard: DashboardStatusEntry[];
    modules: DashboardStatusEntry[];
    integrations: DashboardStatusEntry[];
  };
}

const moduleCatalog: Record<DashboardModuleKey, Pick<DashboardModule, "key" | "name" | "description">> = {
  bank: {
    key: "bank",
    name: "Bank",
    description: "Balances, salary rules, transfers, and economy-facing controls."
  },
  social: {
    key: "social",
    name: "Social",
    description: "Profiles, reactions, lightweight progression, and social prompts."
  },
  weather: {
    key: "weather",
    name: "Weather",
    description: "Forecast cards, location presets, and atmospheric display surfaces."
  },
  sessions: {
    key: "sessions",
    name: "Sessions",
    description: "Structured event timing, reminders, and session management tools."
  },
  radio: {
    key: "radio",
    name: "Radio",
    description: "Station presets, queue placeholders, and audio access control surfaces."
  },
  rentals: {
    key: "rentals",
    name: "Rentals",
    description: "Lease records, property states, and reminder-driven collections."
  }
};

function createModules(
  items: Array<{
    key: DashboardModuleKey;
    enabled: boolean;
    status: DashboardTone;
    note: string;
    actionLabel: string;
    lastEdited: string;
  }>
): DashboardModule[] {
  return items.map((item) => ({
    ...moduleCatalog[item.key],
    enabled: item.enabled,
    status: item.status,
    note: item.note,
    actionLabel: item.actionLabel,
    lastEdited: item.lastEdited
  }));
}

const servers: DashboardServer[] = [
  {
    id: "crown-main",
    name: "CROWN Main",
    iconLabel: "CM",
    accent: "#d3ba7a",
    state: "connected",
    description: "Primary production server with a polished control surface and full mock coverage.",
    region: "EU Central",
    memberCount: "18,240",
    adminCount: "12",
    channelCount: "96",
    environment: "Production",
    plan: "CROWN Full",
    statusNote: "Bot connected and represented with static snapshot data only.",
    syncLabel: "Synced 2 minutes ago",
    overviewStats: [
      { label: "Enabled modules", value: "5 / 6", note: "Radio remains paused for review." },
      { label: "Config coverage", value: "94%", note: "Core settings already mapped into the shell." },
      { label: "Brand assets", value: "4", note: "Logo, banner, accents, and identity copy." },
      { label: "Pending reviews", value: "3", note: "Mock approvals for new economy perks." }
    ],
    recentActivity: [
      {
        title: "Brand accent refreshed",
        detail: "Preview tokens were adjusted without touching the public marketing site.",
        time: "14 minutes ago",
        tone: "info"
      },
      {
        title: "Sessions ruleset staged",
        detail: "The overview reflects handoff status without any live sync plumbing.",
        time: "1 hour ago",
        tone: "positive"
      },
      {
        title: "Radio held in review",
        detail: "Audio tools stay visible as a disabled-but-designed placeholder path.",
        time: "Today",
        tone: "warning"
      }
    ],
    quickActions: [
      {
        title: "Review modules",
        body: "Check enabled states and quick entry points for each feature area.",
        target: "modules"
      },
      {
        title: "Open branding",
        body: "Validate preview assets and text fields before a future rollout.",
        target: "branding"
      },
      {
        title: "Inspect status",
        body: "See grouped health cards for core, dashboard, modules, and API placeholders.",
        target: "status"
      }
    ],
    modules: createModules([
      { key: "bank", enabled: true, status: "positive", note: "Using the premium economy preset.", actionLabel: "Open bank shell", lastEdited: "Edited today" },
      { key: "social", enabled: true, status: "positive", note: "Profile and reaction surfaces are ready.", actionLabel: "Open social shell", lastEdited: "Edited yesterday" },
      { key: "weather", enabled: true, status: "info", note: "Mock forecast cards only in this pass.", actionLabel: "Open weather shell", lastEdited: "Edited yesterday" },
      { key: "sessions", enabled: true, status: "positive", note: "Structured around event moderation flows.", actionLabel: "Open sessions shell", lastEdited: "Edited 2 days ago" },
      { key: "radio", enabled: false, status: "warning", note: "Paused while permissions are reviewed.", actionLabel: "Review radio shell", lastEdited: "Edited 4 days ago" },
      { key: "rentals", enabled: true, status: "positive", note: "Attached to the active district inventory preset.", actionLabel: "Open rentals shell", lastEdited: "Edited 3 days ago" }
    ]),
    settingsGroups: [
      { label: "Localization", value: "English primary, Russian fallback", note: "Shell copy is ready before real locale sync." },
      { label: "Admin role", value: "CROWN Council", note: "Access groups are mock assignments only." },
      { label: "Enabled modules", value: "Bank, Social, Weather, Sessions, Rentals", note: "Radio remains intentionally disabled." },
      { label: "Branding", value: "Gold slate preset v2", note: "Applies to preview surfaces only." },
      { label: "Permissions and license", value: "Full plan mapped to 3 admin seats", note: "No purchase logic exists in this pass." }
    ],
    brandingFields: [
      { label: "Display name", value: "CROWN Main District", hint: "Used in headers and invite preview text." },
      { label: "Short tagline", value: "Structured city economy and premium RP utilities", hint: "Preview only, not synced anywhere yet." },
      { label: "Welcome footer", value: "Managed with CROWN Full workspace tools", hint: "Useful for future card and embed identity." }
    ],
    brandingAssets: [
      { label: "Logo slot", value: "1 / 1", note: "Square icon ready." },
      { label: "Banner slot", value: "1 / 1", note: "Current preview banner active." },
      { label: "Accent palettes", value: "3", note: "Gold, slate, and muted cloud." }
    ],
    brandingPreviewNote: "Preview surfaces stay static and intentionally disconnected from live Discord assets.",
    licenseSummary: "Full plan active with expanded branding, module, and grouped status surfaces.",
    licenseRenewal: "Next renewal placeholder: April 18",
    licenseRows: [
      { label: "Module access", free: "Core only", full: "All premium surfaces" },
      { label: "Branding control", free: "Logo only", full: "Logo, banner, accents, copy" },
      { label: "Status detail", free: "Basic cards", full: "Expanded grouped health view" }
    ],
    entitlements: [
      { label: "Branding preview", value: "Included", included: true },
      { label: "Grouped status view", value: "Included", included: true },
      { label: "Live sync", value: "Not in this pass", included: false }
    ],
    statusGroups: {
      core: [
        { label: "Bot core", value: "Healthy", note: "Mock heartbeat within expected range.", tone: "positive" },
        { label: "Command router", value: "Stable", note: "No live telemetry wired yet.", tone: "info" }
      ],
      dashboard: [
        { label: "Dashboard shell", value: "Ready", note: "Static-export compatible routes and mock content.", tone: "positive" },
        { label: "Auth integration", value: "Pending", note: "Kept intentionally out of scope.", tone: "warning" }
      ],
      modules: [
        { label: "Economy stack", value: "Mapped", note: "Bank and Rentals shells are prepared.", tone: "positive" },
        { label: "Radio stack", value: "Paused", note: "Held in a reviewed-but-disabled state.", tone: "warning" }
      ],
      integrations: [
        { label: "REST API", value: "Placeholder", note: "Visual slot only. No backend calls.", tone: "muted" },
        { label: "OAuth", value: "Not started", note: "Reserved for a later implementation pass.", tone: "muted" }
      ]
    }
  },
  {
    id: "night-arcade",
    name: "Night Arcade",
    iconLabel: "NA",
    accent: "#d47d4f",
    state: "invite",
    description: "A launch-prep server waiting for bot invite and first-pass configuration.",
    region: "US East",
    memberCount: "3,420",
    adminCount: "4",
    channelCount: "41",
    environment: "Launch prep",
    plan: "Free",
    statusNote: "Bot not connected yet. The shell uses setup defaults and invite placeholders.",
    syncLabel: "Awaiting first sync",
    overviewStats: [
      { label: "Invite readiness", value: "82%", note: "Core pages scaffolded." },
      { label: "Default modules", value: "3", note: "Bank, Social, and Weather suggested." },
      { label: "Admin seats", value: "2", note: "Placeholder seats only." },
      { label: "Branding state", value: "Draft", note: "No uploaded assets yet." }
    ],
    recentActivity: [
      { title: "Invite path prepared", detail: "Cards open the workspace before any live install exists.", time: "Just now", tone: "info" },
      { title: "Default admin role assigned", detail: "Uses a shell-only review role.", time: "Today", tone: "positive" },
      { title: "Upgrade path kept visible", detail: "License and branding pages show premium placeholders without checkout.", time: "Today", tone: "warning" }
    ],
    quickActions: [
      { title: "Invite bot", body: "Open the setup-friendly workspace and review module defaults.", target: "workspace" },
      { title: "Check settings hub", body: "Confirm localization, roles, and enabled areas before launch.", target: "settings" },
      { title: "Review license options", body: "Compare the free shell against the full entitlement surface.", target: "licenses" }
    ],
    modules: createModules([
      { key: "bank", enabled: true, status: "info", note: "Uses a minimal launch preset.", actionLabel: "Open starter flow", lastEdited: "Draft preset" },
      { key: "social", enabled: true, status: "info", note: "Kept light for first launch.", actionLabel: "Review defaults", lastEdited: "Draft preset" },
      { key: "weather", enabled: true, status: "info", note: "No external data sources yet.", actionLabel: "Open weather shell", lastEdited: "Draft preset" },
      { key: "sessions", enabled: false, status: "warning", note: "Locked until bot access is granted.", actionLabel: "Review locked state", lastEdited: "Not configured" },
      { key: "radio", enabled: false, status: "muted", note: "Shown as a premium-only surface.", actionLabel: "See premium path", lastEdited: "Premium placeholder" },
      { key: "rentals", enabled: false, status: "muted", note: "Visible but inactive until launch expansion.", actionLabel: "Review placeholder", lastEdited: "Premium placeholder" }
    ]),
    settingsGroups: [
      { label: "Localization", value: "English only for launch", note: "Fallback locale planned later." },
      { label: "Admin role", value: "Night Leads", note: "Shell-only placeholder assignment." },
      { label: "Enabled modules", value: "Bank, Social, Weather", note: "Launch-safe starter pack." },
      { label: "Branding", value: "Text-first draft", note: "Logo and banner remain empty." },
      { label: "Permissions and license", value: "Free plan, invite pending", note: "Upgrade CTA shown as a placeholder." }
    ],
    brandingFields: [
      { label: "Display name", value: "Night Arcade", hint: "Pulled from local mock data." },
      { label: "Short tagline", value: "Late-night events with structured tools", hint: "Draft wording for the shell preview." },
      { label: "Welcome footer", value: "Invite CROWN to unlock full controls", hint: "Works as a premium upgrade nudge." }
    ],
    brandingAssets: [
      { label: "Logo slot", value: "0 / 1", note: "Using initials fallback." },
      { label: "Banner slot", value: "0 / 1", note: "Banner not uploaded yet." },
      { label: "Accent palettes", value: "1", note: "Default amber starter palette." }
    ],
    brandingPreviewNote: "This preview shows how a server can feel polished before any assets are live.",
    licenseSummary: "Free plan keeps the shell functional while pointing to the premium branding and module path.",
    licenseRenewal: "No renewal on free plan",
    licenseRows: [
      { label: "Module access", free: "Starter pack", full: "Expanded full suite" },
      { label: "Branding control", free: "Text only", full: "Visual assets and accents" },
      { label: "Status detail", free: "Starter summary", full: "Grouped health surfaces" }
    ],
    entitlements: [
      { label: "Workspace shell", value: "Included", included: true },
      { label: "Premium branding", value: "Upgrade required", included: false },
      { label: "Live sync", value: "Not in this pass", included: false }
    ],
    statusGroups: {
      core: [
        { label: "Bot core", value: "Invite pending", note: "No live install yet.", tone: "warning" },
        { label: "Command router", value: "Draft", note: "UI only in this pass.", tone: "muted" }
      ],
      dashboard: [
        { label: "Dashboard shell", value: "Ready", note: "Multi-page shell available before install.", tone: "positive" },
        { label: "Server sync", value: "Not connected", note: "Backend intentionally omitted.", tone: "warning" }
      ],
      modules: [
        { label: "Starter pack", value: "Prepared", note: "Bank, Social, and Weather are visible.", tone: "info" },
        { label: "Premium pack", value: "Locked", note: "Shown through licenses and settings only.", tone: "muted" }
      ],
      integrations: [
        { label: "REST API", value: "Placeholder", note: "No requests made.", tone: "muted" },
        { label: "OAuth", value: "Deferred", note: "Reserved for a future pass.", tone: "muted" }
      ]
    }
  },
  {
    id: "archive-station",
    name: "Archive Station",
    iconLabel: "AS",
    accent: "#77839a",
    state: "inactive",
    description: "Closed and preserved as a read-only shell for cleanup and migration planning.",
    region: "EU West",
    memberCount: "7,118",
    adminCount: "3",
    channelCount: "58",
    environment: "Archived",
    plan: "Legacy Free",
    statusNote: "The shell is intentionally quiet and read-only for archive review.",
    syncLabel: "Last snapshot from January 12",
    overviewStats: [
      { label: "Active modules", value: "2", note: "Only legacy economy surfaces remain visible." },
      { label: "Archive scope", value: "58 channels", note: "Static reference only." },
      { label: "Export status", value: "Ready", note: "Prepared for later migration work." },
      { label: "Open tasks", value: "1", note: "Final role cleanup note remains." }
    ],
    recentActivity: [
      { title: "Archive banner pinned", detail: "The branding page reflects a closed-state presentation.", time: "This month", tone: "muted" },
      { title: "Legacy bank entries retained", detail: "Enough structure remains for future migration planning.", time: "This quarter", tone: "info" },
      { title: "Live actions disabled", detail: "Buttons stay as navigation placeholders only.", time: "Static shell", tone: "warning" }
    ],
    quickActions: [
      { title: "Open archive overview", body: "See what remains visible before any migration work starts.", target: "overview" },
      { title: "Inspect settings", body: "Review legacy localization and permission notes.", target: "settings" },
      { title: "Review status", body: "Use calm archive-specific status groups.", target: "status" }
    ],
    modules: createModules([
      { key: "bank", enabled: true, status: "info", note: "Read-only in the archive shell.", actionLabel: "View archive state", lastEdited: "Frozen" },
      { key: "social", enabled: true, status: "muted", note: "Social records preserved as a visual ledger only.", actionLabel: "View archive state", lastEdited: "Frozen" },
      { key: "weather", enabled: false, status: "muted", note: "Left as a placeholder slot only.", actionLabel: "Review placeholder", lastEdited: "Archived" },
      { key: "sessions", enabled: false, status: "muted", note: "Historical note only.", actionLabel: "Review placeholder", lastEdited: "Archived" },
      { key: "radio", enabled: false, status: "muted", note: "Disabled and archived with no live routing.", actionLabel: "Review placeholder", lastEdited: "Archived" },
      { key: "rentals", enabled: false, status: "muted", note: "Data kept as a reference note.", actionLabel: "Review placeholder", lastEdited: "Archived" }
    ]),
    settingsGroups: [
      { label: "Localization", value: "Legacy RU with EN notes", note: "Preserved for migration reference." },
      { label: "Admin role", value: "Archive Custodian", note: "Read-only reviewer role." },
      { label: "Enabled modules", value: "Bank, Social", note: "Shown for visibility only." },
      { label: "Branding", value: "Muted archive presentation", note: "Used to communicate a closed state." },
      { label: "Permissions and license", value: "Legacy free archive", note: "No entitlement checks remain active." }
    ],
    brandingFields: [
      { label: "Display name", value: "Archive Station", hint: "Frozen with the archive shell." },
      { label: "Short tagline", value: "Reference workspace for legacy server state", hint: "Maintained only for historical clarity." },
      { label: "Welcome footer", value: "Archived configuration snapshot", hint: "Displayed as a quiet archival note." }
    ],
    brandingAssets: [
      { label: "Logo slot", value: "1 / 1", note: "Legacy square icon retained." },
      { label: "Banner slot", value: "0 / 1", note: "No active banner." },
      { label: "Accent palettes", value: "1", note: "Muted archive palette only." }
    ],
    brandingPreviewNote: "Archive previews stay intentionally quiet to communicate read-only status.",
    licenseSummary: "Legacy free archive with no upgrade push. The focus is review, not conversion.",
    licenseRenewal: "Legacy license retired",
    licenseRows: [
      { label: "Module access", free: "Archive snapshot", full: "Not relevant" },
      { label: "Branding control", free: "Read-only", full: "Not relevant" },
      { label: "Status detail", free: "Archive summary", full: "Not relevant" }
    ],
    entitlements: [
      { label: "Archive visibility", value: "Included", included: true },
      { label: "Upgrade path", value: "Suppressed", included: false },
      { label: "Live sync", value: "Removed", included: false }
    ],
    statusGroups: {
      core: [
        { label: "Bot core", value: "Offline", note: "Archive reference only.", tone: "muted" },
        { label: "Command router", value: "Retired", note: "No active routing remains.", tone: "muted" }
      ],
      dashboard: [
        { label: "Dashboard shell", value: "Read-only", note: "Preserved for historical review.", tone: "info" },
        { label: "Edits", value: "Blocked", note: "Actions navigate only.", tone: "warning" }
      ],
      modules: [
        { label: "Legacy modules", value: "Visible", note: "Bank and Social remain for reference.", tone: "info" },
        { label: "Inactive modules", value: "Archived", note: "No operational state remains.", tone: "muted" }
      ],
      integrations: [
        { label: "REST API", value: "Removed", note: "No live integration planned.", tone: "muted" },
        { label: "OAuth", value: "Removed", note: "No auth flow in the archive shell.", tone: "muted" }
      ]
    }
  },
  {
    id: "sandbox-labs",
    name: "Sandbox Labs",
    iconLabel: "SL",
    accent: "#68a8d9",
    state: "test",
    description: "Internal test server used to try layout variants, module shells, and QA-focused flows.",
    region: "Local / QA",
    memberCount: "186",
    adminCount: "6",
    channelCount: "28",
    environment: "Test",
    plan: "Internal",
    statusNote: "Safe sandbox for trying modules and navigation without touching production shells.",
    syncLabel: "Mock data refreshed on every build",
    overviewStats: [
      { label: "Experiment tracks", value: "6", note: "All modules visible for QA coverage." },
      { label: "Preview variants", value: "3", note: "Used across settings and branding surfaces." },
      { label: "Status checks", value: "9", note: "Grouped across core, dashboard, modules, and integrations." },
      { label: "Review notes", value: "5", note: "Shell-only TODO placeholders." }
    ],
    recentActivity: [
      { title: "Drawer navigation tested", detail: "Mobile and tablet sidebar states use the same shell.", time: "Today", tone: "positive" },
      { title: "Status cards regrouped", detail: "Calmer monitoring surfaces replaced noisier panels.", time: "Today", tone: "info" },
      { title: "Module shell kept mock-only", detail: "No runtime plumbing added in this pass.", time: "Today", tone: "warning" }
    ],
    quickActions: [
      { title: "Open workspace", body: "Use the entry page as a shell checkpoint before drilling deeper.", target: "workspace" },
      { title: "Stress the modules page", body: "Review enabled, disabled, and test-specific states together.", target: "modules" },
      { title: "Inspect branding preview", body: "Validate hierarchy and spacing with the preview-focused layout.", target: "branding" }
    ],
    modules: createModules([
      { key: "bank", enabled: true, status: "info", note: "Used for layout stress testing.", actionLabel: "Open QA shell", lastEdited: "Edited in sandbox" },
      { key: "social", enabled: true, status: "positive", note: "Stable for UI review.", actionLabel: "Open QA shell", lastEdited: "Edited in sandbox" },
      { key: "weather", enabled: true, status: "info", note: "Mock source only.", actionLabel: "Open QA shell", lastEdited: "Edited in sandbox" },
      { key: "sessions", enabled: true, status: "positive", note: "Used to test dense administrative layouts.", actionLabel: "Open QA shell", lastEdited: "Edited in sandbox" },
      { key: "radio", enabled: true, status: "warning", note: "Visible to validate warning surfaces.", actionLabel: "Review test shell", lastEdited: "Edited in sandbox" },
      { key: "rentals", enabled: true, status: "info", note: "QA-only sample data.", actionLabel: "Open QA shell", lastEdited: "Edited in sandbox" }
    ]),
    settingsGroups: [
      { label: "Localization", value: "EN and RU test copy", note: "Used to validate route-level locale handling." },
      { label: "Admin role", value: "QA Operators", note: "Permission language kept explicit for UI review." },
      { label: "Enabled modules", value: "All modules visible", note: "Test state allowed for Radio." },
      { label: "Branding", value: "Experimental preview set", note: "Used to pressure-test hierarchy and spacing." },
      { label: "Permissions and license", value: "Internal plan", note: "Used for layout validation only." }
    ],
    brandingFields: [
      { label: "Display name", value: "Sandbox Labs", hint: "A safe target for experimental preview copy." },
      { label: "Short tagline", value: "Internal preview surface for CROWN shell development", hint: "Long enough to pressure-test spacing." },
      { label: "Welcome footer", value: "Sandbox copy only", hint: "Not intended for public output." }
    ],
    brandingAssets: [
      { label: "Logo slot", value: "1 / 1", note: "Using initials plus a test accent." },
      { label: "Banner slot", value: "1 / 1", note: "Temporary QA banner active." },
      { label: "Accent palettes", value: "4", note: "Used for shell contrast checks." }
    ],
    brandingPreviewNote: "This preview exists to validate hierarchy, rhythm, and asset placement before any live data arrives.",
    licenseSummary: "Internal plan exposes the entire shell so QA can review every surface without external dependencies.",
    licenseRenewal: "Internal plan does not expire",
    licenseRows: [
      { label: "Module access", free: "N/A", full: "All test surfaces" },
      { label: "Branding control", free: "N/A", full: "All preview slots" },
      { label: "Status detail", free: "N/A", full: "Expanded QA groups" }
    ],
    entitlements: [
      { label: "All app pages", value: "Included", included: true },
      { label: "Test-specific module states", value: "Included", included: true },
      { label: "External sync", value: "Not in this pass", included: false }
    ],
    statusGroups: {
      core: [
        { label: "Bot core", value: "Sandbox stable", note: "Used only as a UI placeholder.", tone: "positive" },
        { label: "Command router", value: "Test routing", note: "Represents edge states in the shell.", tone: "info" }
      ],
      dashboard: [
        { label: "Dashboard shell", value: "Under review", note: "Used as the QA reference environment.", tone: "positive" },
        { label: "Responsive drawer", value: "Checked", note: "Mobile and tablet states covered.", tone: "info" }
      ],
      modules: [
        { label: "Module shell coverage", value: "Full", note: "All six modules are visible.", tone: "positive" },
        { label: "Warning states", value: "Visible", note: "Radio stays in a test-warning state.", tone: "warning" }
      ],
      integrations: [
        { label: "REST API", value: "Placeholder", note: "UI slot only, no requests.", tone: "muted" },
        { label: "OAuth", value: "Placeholder", note: "Visible for future planning.", tone: "muted" }
      ]
    }
  }
];

export function getDashboardServerIds(): string[] {
  return servers.map((server) => server.id);
}

export function getDashboardServers(): DashboardServer[] {
  return servers;
}

export function getDashboardServer(id: string): DashboardServer | null {
  return servers.find((server) => server.id === id) ?? null;
}
