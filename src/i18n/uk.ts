import type { MessageDict } from "./en";

export const uk: MessageDict = {
  meta: {
    title: "Lab Configurator · Збірка ПК преміум-класу",
  },
  app: {
    tagline: "Той, хто збирає",
    titleLab: "Lab",
    titleConfigurator: "Configurator",
    subtitle:
      "Деталі Tier-1 / Tier-2, перевірка сокета та довжини GPU, магазини за регіоном і поради Волтера щодо БЖ.",
  },
  categories: {
    cpu: "Процесор",
    gpu: "Відеокарта",
    motherboard: "Материнська плата",
    ram: "ОЗП",
    storage: "Накопичувач",
    psu: "Блок живлення",
    case: "Корпус",
    cooling: "Охолодження",
    peripheral: "Периферія",
  },
  buttons: {
    addToBuild: "До збірки",
    selected: "Обрано",
    buyNow: "Купити",
    clearBuild: "Очистити",
    reviewBuild: "Перегляд збірки",
    checkout: "Оформити",
    close: "Закрити",
    allBrands: "Усі бренди",
    pickParts: "Обрати комплектуючі",
    showMore: "Показати ще",
  },
  search: {
    placeholder: "Пошук: назва, бренд, характеристики…",
    noResults: "Нічого не знайдено — змініть запит або бренд.",
    bestMatch: "Найкраща відповідність",
    topBrandsNote: "Спочатку білі збірки та топ-бренди.",
    tierFilter: "Рівень",
    tierAll: "Усі рівні",
  },
  badges: {
    white: "Біле виконання",
    tierExtreme: "Екстремальний",
    tierHighEnd: "Топ",
    tierMidRange: "Середній клас",
  },
  compat: {
    title: "Сумісність",
    hint: "Сокет CPU ↔ плата; довжина GPU ↔ корпус.",
    ok: "Конфліктів сокета та довжини GPU немає.",
    incompatible: "Несумісно",
    socketTitle: "Невідповідність сокета CPU та плати",
    socketDetail: "{{cpuName}} — сокет {{cpuSocket}}, а {{mbName}} очікує {{mbSocket}}.",
    gpuTitle: "GPU довша за допустиму в корпусі",
    gpuDetail: "{{gpuName}} — {{gpuLen}} мм; {{caseName}} дозволяє до {{clearance}} мм.",
    resolveHint: "Виправте сумісність перед фіналом.",
    socketCardHint: "Сокет не збігається з обраним CPU/платою.",
    gpuCardHint: "GPU може не влізти в цей корпус.",
  },
  cart: {
    label: "Разом",
    parts: "{{count}} позиція",
    partsPlural: "{{count}} позицій",
    issues: "{{count}} проблема сумісності — виправте перед оплатою.",
    issuesPlural: "{{count}} проблем сумісності — виправте перед оплатою.",
  },
  walter: {
    title: "Порада Волтера",
    powerTitle: "Перевірка БЖ",
    pickBoth: "Оберіть GPU та БЖ — Волтер оцінить запас потужності.",
    ok: "БЖ відповідає мінімуму Волтера для цієї GPU. Можна дихати.",
    warn:
      "Ця GPU просить щонайменше {{gpuW}} В. Ваш {{psuW}} В — ризик; краще сильніший БЖ.",
    target: "Ціль GPU: {{gpuW}} В · Ваш БЖ: {{psuW}} В",
    tooltipWeak:
      "{{gpuName}} ~{{gpuW}} В. Цей БЖ на {{psuW}} В слабкий для неї — один стрибок навантаження і жалкуватимеш.",
  },
  region: {
    label: "Регіон і мова",
  },
  ui: {
    featured: "У фокусі",
    godTierBadge: "Збірка God Tier",
  },
  whiteBuild: {
    title: "Біла збірка",
    hint: "Підсилити білі SKU в пошуку та підсвітці.",
  },
  brandFilter: {
    title: "Фільтр бренду",
    hint: "Для відкритої категорії. CPU завжди показує всі Intel / AMD.",
  },
  specs: {
    socket: "Сокет {{socket}}",
    gpuLen: "{{mm}} мм · ≥{{w}} В БЖ",
    clearance: "Під GPU до {{mm}} мм",
    psuW: "{{w}} В",
    ram: "{{ddr}} · {{gb}} ГБ",
    coolingAio: "СВО {{mm}} мм",
    coolingAir: "Повітряне охолодження",
  },
  tier: {
    Extreme: "Екстремальний",
    HighEnd: "Топ",
    MidRange: "Середній клас",
  },
};
