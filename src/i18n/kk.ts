import type { MessageDict } from "./en";

/** Kazakh (Latin) — UI strings */
export const kk: MessageDict = {
  meta: {
    title: "Lab Configurator · Premium PC qurastyru",
  },
  app: {
    tagline: "Qurastyruşı",
    titleLab: "Lab",
    titleConfigurator: "Configurator",
    subtitle:
      "Tier-1 / Tier-2 bөlimder, soket jäne GPU uzyndyğy, aymaktyq dүkender jäne Walterdıń Qūat keńesi.",
  },
  categories: {
    cpu: "CPU",
    gpu: "GPU",
    motherboard: "Ana plata",
    ram: "RAM",
    storage: "Qūyym",
    psu: "Qūat bölegі",
    case: "Korpus",
    cooling: "Sалқындату",
    peripheral: "Periferiya",
  },
  buttons: {
    addToBuild: "Qūrastyruğa",
    selected: "Tańdalğan",
    buyNow: "Satuğa ótiw",
    clearBuild: "Tazalaw",
    reviewBuild: "Qūrastyrudı qaraw",
    checkout: "Satuğa ótiw",
    close: "Jabuw",
    allBrands: "Barlıq brendter",
    pickParts: "Bөlimderdi tańdaw",
    showMore: "Kөbirek kórsetw",
  },
  search: {
    placeholder: "Izlew: at, brend, sın…",
    noResults: "Tabyłmadı — soraw nemese brendti ózgertińiz.",
    bestMatch: "Eń jaqsy säýkes",
    topBrandsNote: "Aq qurastyru jäne top brendter aldyda.",
    tierFilter: "Deńgeı",
    tierAll: "Barlıq deńgeıler",
  },
  badges: {
    white: "Aq nusqasy",
    tierExtreme: "Ekstremaldy",
    tierHighEnd: "Joğary",
    tierMidRange: "Orta synyp",
  },
  compat: {
    title: "Úılesіmdіlіk",
    hint: "CPU soketi ↔ plata; GPU uzyndyğy ↔ korpus.",
    ok: "Soket pen GPU uzyndyğy qaqısı joq.",
    incompatible: "Úılesіmsіz",
    socketTitle: "CPU jäne plata soketerі säýkes emes",
    socketDetail: "{{cpuName}} — {{cpuSocket}}, al {{mbName}} {{mbSocket}} kútedі.",
    gpuTitle: "GPU korpusqa úlken",
    gpuDetail: "{{gpuName}} — {{gpuLen}} mm; {{caseName}} deıin {{clearance}} mm.",
    resolveHint: "Ayaqtamastan búrin úılesіmdіlіktі túzetіńіz.",
    socketCardHint: "Tańdalğan CPU/plata menen soket säýkes emes.",
    gpuCardHint: "GPU bul korpusqa sığbawı mümkіn.",
  },
  cart: {
    label: "Barlyğy",
    parts: "{{count}} tarmaq",
    partsPlural: "{{count}} tarmaq",
    issues: "{{count}} úılesіmdіlіk müshesі — tolew aldında túzetіńіz.",
    issuesPlural: "{{count}} úılesіmdіlіk müshesі — tolew aldında túzetіńіz.",
  },
  walter: {
    title: "Walterdıń keńesi",
    powerTitle: "Qūat tekserіlіmі",
    pickBoth: "GPU jäne Qūat bölegіn tańdańyz — Walter qūat basymın baǵalaydı.",
    ok: "Qūat bölegі bul GPU úshin Walterdıń minimumyna jaqyndaydı.",
    warn: "Bul GPU keminde {{gpuW}} W talap etedі. Sіzdіń {{psuW}} W — qater; küshіre Qūat bölegіn alıńyz.",
    target: "GPU maqsaty: {{gpuW}} W · Sіzdіń Qūat: {{psuW}} W",
    tooltipWeak:
      "{{gpuName}} ~{{gpuW}} W. Bul {{psuW}} W Qūat bölegі óte álsız — bir sekіrіs jäne ókenіs.",
  },
  region: {
    label: "Aýmaq jäne til",
  },
  ui: {
    featured: "Négizgi",
    godTierBadge: "God Tier qurastyru",
  },
  whiteBuild: {
    title: "Aq qurastyru",
    hint: "Izlewde jäne belgіleude aq SKU basymy.",
  },
  brandFilter: {
    title: "Brend süzgisі",
    hint: "Ashylǵan sanat úshin. CPU barlıq Intel / AMD kórsetedі.",
  },
  specs: {
    socket: "Soket {{socket}}",
    gpuLen: "{{mm}} mm · ≥{{w}} W Qūat",
    clearance: "GPU deıin {{mm}} mm",
    psuW: "{{w}} W",
    ram: "{{ddr}} · {{gb}} GB",
    coolingAio: "{{mm}} mm SJO",
    coolingAir: "Aýa salqyndatqış",
  },
  tier: {
    Extreme: "Ekstremaldy",
    HighEnd: "Joğary",
    MidRange: "Orta synyp",
  },
};
