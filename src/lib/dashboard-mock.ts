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
  | "servers"
  | "overview"
  | "settings"
  | "modules"
  | "branding"
  | "licenses"
  | "status";

export interface DashboardNotice {
  title: string;
  detail: string;
  time: string;
}

export interface DashboardIdentityField {
  label: string;
  value: string;
}

export interface DashboardStatusItem {
  label: string;
  value: string;
  note: string;
  tone: DashboardTone;
}

export interface DashboardModule {
  key: DashboardModuleKey;
  name: string;
  description: string;
  stateLabel: string;
  tone: DashboardTone;
  actionLabel: string;
}

export interface DashboardSettingGroup {
  label: string;
  value: string;
  note: string;
}

export interface DashboardBrandAsset {
  label: string;
  value: string;
  note: string;
}

export interface DashboardEntitlement {
  label: string;
  value: string;
  tone: DashboardTone;
}

export interface DashboardStatusGroup {
  key: "core" | "dashboard" | "modules" | "integrations";
  title: string;
  items: DashboardStatusItem[];
}

export interface DashboardServer {
  id: string;
  name: string;
  iconLabel: string;
  accent: string;
  state: DashboardServerState;
  description: string;
  environment: string;
  region: string;
  members: string;
  plan: string;
  syncNote: string;
  overview: {
    identity: DashboardIdentityField[];
    systemStatus: DashboardStatusItem[];
    moduleSummary: DashboardModule[];
    notices: DashboardNotice[];
  };
  settings: DashboardSettingGroup[];
  modules: DashboardModule[];
  branding: {
    assets: DashboardBrandAsset[];
    fields: DashboardIdentityField[];
    note: string;
  };
  licenses: {
    currentPlan: string;
    availableLevel: string;
    entitlementSummary: string;
    entitlements: DashboardEntitlement[];
  };
  status: DashboardStatusGroup[];
}

const moduleCatalog: Record<
  DashboardModuleKey,
  Pick<DashboardModule, "key" | "name" | "description">
> = {
  bank: { key: "bank", name: "Bank", description: "Balances, transfers, and salary rules." },
  social: { key: "social", name: "Social", description: "Profiles, reactions, and progression." },
  weather: { key: "weather", name: "Weather", description: "Forecast cards and location presets." },
  sessions: { key: "sessions", name: "Sessions", description: "Session timing and event structure." },
  radio: { key: "radio", name: "Radio", description: "Station presets and access placeholders." },
  rentals: { key: "rentals", name: "Rentals", description: "Lease records and property states." }
};

function createModules(
  items: Array<{
    key: DashboardModuleKey;
    stateLabel: string;
    tone: DashboardTone;
    actionLabel: string;
  }>
): DashboardModule[] {
  return items.map((item) => ({
    ...moduleCatalog[item.key],
    stateLabel: item.stateLabel,
    tone: item.tone,
    actionLabel: item.actionLabel
  }));
}

const serverModules = {
  production: createModules([
    { key: "bank", stateLabel: "Enabled", tone: "positive", actionLabel: "Manage" },
    { key: "social", stateLabel: "Enabled", tone: "positive", actionLabel: "Manage" },
    { key: "weather", stateLabel: "Enabled", tone: "info", actionLabel: "Manage" },
    { key: "sessions", stateLabel: "Enabled", tone: "positive", actionLabel: "Manage" },
    { key: "radio", stateLabel: "Review", tone: "warning", actionLabel: "Open" },
    { key: "rentals", stateLabel: "Enabled", tone: "positive", actionLabel: "Manage" }
  ]),
  setup: createModules([
    { key: "bank", stateLabel: "Starter", tone: "info", actionLabel: "Open" },
    { key: "social", stateLabel: "Starter", tone: "info", actionLabel: "Open" },
    { key: "weather", stateLabel: "Starter", tone: "info", actionLabel: "Open" },
    { key: "sessions", stateLabel: "Locked", tone: "warning", actionLabel: "Review" },
    { key: "radio", stateLabel: "Locked", tone: "muted", actionLabel: "Review" },
    { key: "rentals", stateLabel: "Locked", tone: "muted", actionLabel: "Review" }
  ]),
  archive: createModules([
    { key: "bank", stateLabel: "Archive", tone: "info", actionLabel: "Open" },
    { key: "social", stateLabel: "Archive", tone: "muted", actionLabel: "Open" },
    { key: "weather", stateLabel: "Hidden", tone: "muted", actionLabel: "Review" },
    { key: "sessions", stateLabel: "Hidden", tone: "muted", actionLabel: "Review" },
    { key: "radio", stateLabel: "Hidden", tone: "muted", actionLabel: "Review" },
    { key: "rentals", stateLabel: "Hidden", tone: "muted", actionLabel: "Review" }
  ]),
  test: createModules([
    { key: "bank", stateLabel: "Test", tone: "info", actionLabel: "Open" },
    { key: "social", stateLabel: "Test", tone: "positive", actionLabel: "Open" },
    { key: "weather", stateLabel: "Test", tone: "info", actionLabel: "Open" },
    { key: "sessions", stateLabel: "Test", tone: "positive", actionLabel: "Open" },
    { key: "radio", stateLabel: "Warning", tone: "warning", actionLabel: "Review" },
    { key: "rentals", stateLabel: "Test", tone: "info", actionLabel: "Open" }
  ])
};

const servers: DashboardServer[] = [
  {
    id: "crown-main",
    name: "CROWN Main",
    iconLabel: "CM",
    accent: "#d2c7b0",
    state: "connected",
    description: "Primary production shell with restrained controls and a full module map.",
    environment: "Production",
    region: "EU Central",
    members: "18,240",
    plan: "Full",
    syncNote: "Snapshot refreshed 2 minutes ago",
    overview: {
      identity: [
        { label: "Server", value: "CROWN Main" },
        { label: "Plan", value: "Full" },
        { label: "Environment", value: "Production" },
        { label: "Region", value: "EU Central" }
      ],
      systemStatus: [
        { label: "Bot core", value: "Connected", note: "Local mock state only.", tone: "positive" },
        { label: "Dashboard", value: "Ready", note: "Static and export-safe.", tone: "info" },
        { label: "Permissions", value: "Placeholder", note: "No real checks yet.", tone: "muted" }
      ],
      moduleSummary: serverModules.production,
      notices: [
        { title: "Branding preset updated", detail: "Identity preview aligned with the reset.", time: "14m ago" },
        { title: "Radio left in review", detail: "Visible, but intentionally restrained.", time: "Today" }
      ]
    },
    settings: [
      { label: "Localization", value: "English primary, Russian fallback", note: "Locale-aware routes stay intact." },
      { label: "Admin role", value: "CROWN Council", note: "Placeholder role only." },
      { label: "Enabled modules", value: "Bank, Social, Weather, Sessions, Rentals", note: "Radio remains in review." },
      { label: "Permissions / access", value: "Three admin seats, mock permissions", note: "No OAuth or sync." }
    ],
    modules: serverModules.production,
    branding: {
      assets: [
        { label: "Logo", value: "Uploaded", note: "Square preview slot only." },
        { label: "Banner", value: "Uploaded", note: "Wide preview asset, no live sync." },
        { label: "Accent color", value: "Graphite / warm silver", note: "Restrained accent set." }
      ],
      fields: [
        { label: "Display name", value: "CROWN Main District" },
        { label: "Short tagline", value: "Structured city economy and roleplay utilities" },
        { label: "Identity footer", value: "Managed through the CROWN dashboard shell" }
      ],
      note: "Branding is preview-only and disconnected from Discord assets."
    },
    licenses: {
      currentPlan: "Full",
      availableLevel: "Expanded branding and module access",
      entitlementSummary: "The licenses view stays informational and avoids billing logic.",
      entitlements: [
        { label: "Branding controls", value: "Included", tone: "positive" },
        { label: "Module management", value: "Included", tone: "positive" },
        { label: "Live sync", value: "Not in this pass", tone: "muted" }
      ]
    },
    status: [
      {
        key: "core",
        title: "Bot / core",
        items: [
          { label: "Bot core", value: "Healthy", note: "Local status placeholder.", tone: "positive" },
          { label: "Command routing", value: "Stable", note: "No runtime telemetry.", tone: "info" }
        ]
      },
      {
        key: "dashboard",
        title: "Dashboard",
        items: [
          { label: "App shell", value: "Ready", note: "Shared layout active.", tone: "positive" },
          { label: "Auth", value: "Deferred", note: "Reserved for later.", tone: "warning" }
        ]
      },
      {
        key: "modules",
        title: "Modules",
        items: [
          { label: "Primary modules", value: "Mapped", note: "All six routes exist.", tone: "positive" },
          { label: "Radio", value: "Review", note: "Visible but restrained.", tone: "warning" }
        ]
      },
      {
        key: "integrations",
        title: "API / integrations",
        items: [
          { label: "API", value: "Placeholder", note: "No backend calls.", tone: "muted" },
          { label: "Discord sync", value: "Not started", note: "Out of scope.", tone: "muted" }
        ]
      }
    ]
  },
  {
    id: "night-arcade",
    name: "Night Arcade",
    iconLabel: "NA",
    accent: "#d6d1c6",
    state: "invite",
    description: "Launch-prep server waiting for invite and first configuration pass.",
    environment: "Setup",
    region: "US East",
    members: "3,420",
    plan: "Free",
    syncNote: "Awaiting first connection",
    overview: {
      identity: [
        { label: "Server", value: "Night Arcade" },
        { label: "Plan", value: "Free" },
        { label: "Environment", value: "Setup" },
        { label: "Region", value: "US East" }
      ],
      systemStatus: [
        { label: "Bot core", value: "Invite required", note: "Setup shell is still usable.", tone: "warning" },
        { label: "Dashboard", value: "Prepared", note: "Configuration can start now.", tone: "info" },
        { label: "Permissions", value: "Draft", note: "No backend enforcement.", tone: "muted" }
      ],
      moduleSummary: serverModules.setup,
      notices: [
        { title: "Invite flow pending", detail: "Entry page stays useful before connection.", time: "Now" },
        { title: "Starter modules suggested", detail: "Bank, Social, and Weather are enabled.", time: "Today" }
      ]
    },
    settings: [
      { label: "Localization", value: "English only for launch", note: "Secondary locale can come later." },
      { label: "Admin role", value: "Night Leads", note: "Displayed as a shell placeholder." },
      { label: "Enabled modules", value: "Bank, Social, Weather", note: "Starter configuration only." },
      { label: "Permissions / access", value: "Invite pending, minimal access groups", note: "No real permission logic." }
    ],
    modules: serverModules.setup,
    branding: {
      assets: [
        { label: "Logo", value: "Empty", note: "Initials fallback in use." },
        { label: "Banner", value: "Empty", note: "No banner asset uploaded." },
        { label: "Accent color", value: "Default graphite", note: "Neutral starter palette." }
      ],
      fields: [
        { label: "Display name", value: "Night Arcade" },
        { label: "Short tagline", value: "Late-night events with structured tools" },
        { label: "Identity footer", value: "Invite CROWN to unlock the full dashboard" }
      ],
      note: "Branding remains sparse until the bot is installed."
    },
    licenses: {
      currentPlan: "Free",
      availableLevel: "Expanded modules and branding",
      entitlementSummary: "The page frames availability without becoming a landing page.",
      entitlements: [
        { label: "Core shell", value: "Included", tone: "positive" },
        { label: "Premium branding", value: "Available later", tone: "info" },
        { label: "Live sync", value: "Not in this pass", tone: "muted" }
      ]
    },
    status: [
      {
        key: "core",
        title: "Bot / core",
        items: [
          { label: "Bot core", value: "Invite pending", note: "No live install yet.", tone: "warning" },
          { label: "Command routing", value: "Placeholder", note: "UI-only surface.", tone: "muted" }
        ]
      },
      {
        key: "dashboard",
        title: "Dashboard",
        items: [
          { label: "App shell", value: "Ready", note: "Pages exist before connection.", tone: "positive" },
          { label: "Auth", value: "Deferred", note: "No OAuth in this pass.", tone: "muted" }
        ]
      },
      {
        key: "modules",
        title: "Modules",
        items: [
          { label: "Starter set", value: "Prepared", note: "Three modules enabled.", tone: "info" },
          { label: "Extended set", value: "Locked", note: "Shown as placeholders.", tone: "warning" }
        ]
      },
      {
        key: "integrations",
        title: "API / integrations",
        items: [
          { label: "API", value: "Placeholder", note: "No requests are made.", tone: "muted" },
          { label: "Discord sync", value: "Not connected", note: "Reserved for later.", tone: "muted" }
        ]
      }
    ]
  },
  {
    id: "archive-station",
    name: "Archive Station",
    iconLabel: "AS",
    accent: "#c7c9ce",
    state: "inactive",
    description: "Read-only archive shell kept for cleanup and migration planning.",
    environment: "Archive",
    region: "EU West",
    members: "7,118",
    plan: "Legacy",
    syncNote: "Last archived January 12",
    overview: {
      identity: [
        { label: "Server", value: "Archive Station" },
        { label: "Plan", value: "Legacy" },
        { label: "Environment", value: "Archive" },
        { label: "Region", value: "EU West" }
      ],
      systemStatus: [
        { label: "Bot core", value: "Offline", note: "Archive view only.", tone: "muted" },
        { label: "Dashboard", value: "Read-only", note: "Used for quiet review.", tone: "info" },
        { label: "Permissions", value: "Frozen", note: "No changes expected.", tone: "muted" }
      ],
      moduleSummary: serverModules.archive,
      notices: [
        { title: "Archive state preserved", detail: "Pages stay intentionally quiet.", time: "This month" },
        { title: "Editing suppressed", detail: "Actions remain presentational only.", time: "Static" }
      ]
    },
    settings: [
      { label: "Localization", value: "Legacy RU with EN notes", note: "Retained for reference." },
      { label: "Admin role", value: "Archive Custodian", note: "Read-only reviewer role." },
      { label: "Enabled modules", value: "Bank, Social", note: "Visible for historical clarity." },
      { label: "Permissions / access", value: "Frozen", note: "No edit path is planned here." }
    ],
    modules: serverModules.archive,
    branding: {
      assets: [
        { label: "Logo", value: "Retained", note: "Legacy preview slot." },
        { label: "Banner", value: "None", note: "No active banner in archive mode." },
        { label: "Accent color", value: "Muted neutral", note: "Archive-only presentation." }
      ],
      fields: [
        { label: "Display name", value: "Archive Station" },
        { label: "Short tagline", value: "Reference workspace for legacy state" },
        { label: "Identity footer", value: "Archived configuration snapshot" }
      ],
      note: "Branding exists only to preserve context for later migration work."
    },
    licenses: {
      currentPlan: "Legacy",
      availableLevel: "Not emphasized",
      entitlementSummary: "This route is informational and avoids upgrade pressure.",
      entitlements: [
        { label: "Archive visibility", value: "Included", tone: "positive" },
        { label: "Upgrade messaging", value: "Suppressed", tone: "muted" },
        { label: "Live sync", value: "Removed", tone: "muted" }
      ]
    },
    status: [
      {
        key: "core",
        title: "Bot / core",
        items: [
          { label: "Bot core", value: "Offline", note: "Archive reference only.", tone: "muted" },
          { label: "Command routing", value: "Retired", note: "No active routing remains.", tone: "muted" }
        ]
      },
      {
        key: "dashboard",
        title: "Dashboard",
        items: [
          { label: "App shell", value: "Read-only", note: "Kept for historical review.", tone: "info" },
          { label: "Editing", value: "Suppressed", note: "No live action path.", tone: "warning" }
        ]
      },
      {
        key: "modules",
        title: "Modules",
        items: [
          { label: "Archive modules", value: "Visible", note: "A few reference surfaces remain.", tone: "info" },
          { label: "Inactive modules", value: "Hidden", note: "Shown as placeholders.", tone: "muted" }
        ]
      },
      {
        key: "integrations",
        title: "API / integrations",
        items: [
          { label: "API", value: "Removed", note: "No live integration remains.", tone: "muted" },
          { label: "Discord sync", value: "Removed", note: "No auth or sync path.", tone: "muted" }
        ]
      }
    ]
  },
  {
    id: "sandbox-labs",
    name: "Sandbox Labs",
    iconLabel: "SL",
    accent: "#d0d4db",
    state: "test",
    description: "Internal test shell used to validate layout, spacing, and edge states.",
    environment: "Test",
    region: "Internal",
    members: "186",
    plan: "Internal",
    syncNote: "Mock data refreshed at build time",
    overview: {
      identity: [
        { label: "Server", value: "Sandbox Labs" },
        { label: "Plan", value: "Internal" },
        { label: "Environment", value: "Test" },
        { label: "Region", value: "Internal" }
      ],
      systemStatus: [
        { label: "Bot core", value: "Sandbox", note: "Used only for UI validation.", tone: "info" },
        { label: "Dashboard", value: "Under review", note: "Spacing and drawer states are checked here.", tone: "positive" },
        { label: "Permissions", value: "Mock", note: "No backend enforcement.", tone: "muted" }
      ],
      moduleSummary: serverModules.test,
      notices: [
        { title: "Drawer navigation checked", detail: "Mobile sidebar is validated here.", time: "Today" },
        { title: "Status surfaces simplified", detail: "Monitoring noise was removed.", time: "Today" }
      ]
    },
    settings: [
      { label: "Localization", value: "EN and RU shell copy", note: "Used to verify locale-aware routing." },
      { label: "Admin role", value: "QA Operators", note: "Displayed to validate permission copy." },
      { label: "Enabled modules", value: "All modules visible", note: "Used for layout coverage." },
      { label: "Permissions / access", value: "Internal review only", note: "No real role checks." }
    ],
    modules: serverModules.test,
    branding: {
      assets: [
        { label: "Logo", value: "Test asset", note: "Used for layout review." },
        { label: "Banner", value: "Test asset", note: "Temporary preview slot." },
        { label: "Accent color", value: "Neutral graphite", note: "Used for contrast checks." }
      ],
      fields: [
        { label: "Display name", value: "Sandbox Labs" },
        { label: "Short tagline", value: "Internal preview surface for the dashboard reset" },
        { label: "Identity footer", value: "QA copy only" }
      ],
      note: "This route exists to keep the shell honest under test-state content."
    },
    licenses: {
      currentPlan: "Internal",
      availableLevel: "Full shell access",
      entitlementSummary: "Internal mode exposes every page for layout review.",
      entitlements: [
        { label: "All dashboard pages", value: "Included", tone: "positive" },
        { label: "Test-state modules", value: "Included", tone: "positive" },
        { label: "External sync", value: "Not in this pass", tone: "muted" }
      ]
    },
    status: [
      {
        key: "core",
        title: "Bot / core",
        items: [
          { label: "Bot core", value: "Sandbox stable", note: "UI placeholder only.", tone: "positive" },
          { label: "Command routing", value: "Test path", note: "Used for edge states.", tone: "info" }
        ]
      },
      {
        key: "dashboard",
        title: "Dashboard",
        items: [
          { label: "App shell", value: "Under review", note: "Primary QA environment.", tone: "positive" },
          { label: "Responsive drawer", value: "Checked", note: "Tablet and mobile covered.", tone: "info" }
        ]
      },
      {
        key: "modules",
        title: "Modules",
        items: [
          { label: "Coverage", value: "Full", note: "All six modules are visible.", tone: "positive" },
          { label: "Warning state", value: "Visible", note: "Radio carries the alert styling.", tone: "warning" }
        ]
      },
      {
        key: "integrations",
        title: "API / integrations",
        items: [
          { label: "API", value: "Placeholder", note: "No requests are made.", tone: "muted" },
          { label: "Discord sync", value: "Placeholder", note: "Reserved for future work.", tone: "muted" }
        ]
      }
    ]
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
