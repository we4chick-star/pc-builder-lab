/** Recursive string-value dict — allows translations to use any string */
export type MessageDict = {
  [K: string]: string | MessageDict;
};

export const en: MessageDict = {
  meta: {
    title: "Lab Configurator · Premium PC Builder",
  },
  app: {
    tagline: "The one who configures",
    titleLab: "Lab",
    titleConfigurator: "Configurator",
    subtitle:
      "Tier-1 / Tier-2 parts, socket & clearance checks, regional shops, and Walter on PSU headroom.",
  },
  categories: {
    cpu: "CPU",
    gpu: "GPU",
    motherboard: "Motherboard",
    ram: "RAM",
    storage: "Storage",
    psu: "PSU",
    case: "Case",
    cooling: "Cooling",
    peripheral: "Peripherals",
  },
  buttons: {
    addToBuild: "Add to build",
    selected: "Selected",
    buyNow: "Buy now",
    clearBuild: "Clear build",
    reviewBuild: "Review build",
    checkout: "Checkout",
    close: "Close",
    allBrands: "All brands",
    pickParts: "Pick parts",
    showMore: "Show more",
  },
  search: {
    placeholder: "Search name, brand, specs…",
    noResults: "No matches — try another query or brand.",
    bestMatch: "Best match",
    topBrandsNote: "White builds & top brands surface first.",
    tierFilter: "Tier",
    tierAll: "All tiers",
  },
  badges: {
    white: "White edition",
    tierExtreme: "Extreme",
    tierHighEnd: "High-End",
    tierMidRange: "Mid-Range",
  },
  compat: {
    title: "Compatibility",
    hint: "CPU socket ↔ motherboard; GPU length ↔ case clearance.",
    ok: "No socket or GPU clearance conflicts in your current picks.",
    incompatible: "Incompatible",
    socketTitle: "CPU & motherboard socket mismatch",
    socketDetail: "{{cpuName}} uses {{cpuSocket}}, but {{mbName}} expects {{mbSocket}}.",
    gpuTitle: "GPU exceeds case clearance",
    gpuDetail: "{{gpuName}} is {{gpuLen}} mm long; {{caseName}} allows up to {{clearance}} mm.",
    resolveHint: "Resolve compatibility to finalize.",
    socketCardHint: "Socket mismatch with your pick.",
    gpuCardHint: "GPU may not fit this case.",
  },
  cart: {
    label: "Cart total",
    parts: "{{count}} part",
    partsPlural: "{{count}} parts",
    issues: "{{count}} compatibility issue — fix before checkout.",
    issuesPlural: "{{count}} compatibility issues — fix before checkout.",
  },
  walter: {
    title: "Walter's advice",
    powerTitle: "Power check",
    pickBoth: "Pick a GPU and PSU — Walter will weigh in on power headroom.",
    ok: "Power supply meets Walter's minimum for this GPU. You're in the clear.",
    warn: "This GPU wants at least {{gpuW}} W. Your {{psuW}} W unit is asking for trouble — upgrade the PSU before you cook anything.",
    target: "GPU target: {{gpuW}} W · Your PSU: {{psuW}} W",
    tooltipWeak:
      "{{gpuName}} wants ~{{gpuW}} W. This {{psuW}} W unit is undercooked for that GPU — you're one spike away from regret.",
  },
  region: {
    label: "Region & language",
  },
  ui: {
    featured: "Spotlight",
    godTierBadge: "God Tier loadout",
  },
  whiteBuild: {
    title: "White build",
    hint: "Prioritize white SKUs in search & highlights.",
  },
  brandFilter: {
    title: "Brand filter",
    hint: "Filter the open category. CPUs always show all Intel / AMD options.",
  },
  specs: {
    socket: "Socket {{socket}}",
    gpuLen: "{{mm}} mm · ≥{{w}} W PSU",
    clearance: "GPU clearance {{mm}} mm",
    psuW: "{{w}} W",
    ram: "{{ddr}} · {{gb}} GB",
    coolingAio: "{{mm}} mm AIO",
    coolingAir: "Air cooler",
  },
  tier: {
    Extreme: "Extreme",
    HighEnd: "High-End",
    MidRange: "Mid-Range",
  },
};
