import type { MessageDict } from "./en";

export const ru: MessageDict = {
  meta: {
    title: "Lab Configurator · Сборка премиум ПК",
  },
  app: {
    tagline: "Тот, кто собирает",
    titleLab: "Lab",
    titleConfigurator: "Configurator",
    subtitle:
      "Комплектующие Tier-1 / Tier-2, проверка сокета и длины GPU, магазины по региону и советы Уолтера по БП.",
  },
  categories: {
    cpu: "Процессор",
    gpu: "Видеокарта",
    motherboard: "Материнская плата",
    ram: "ОЗУ",
    storage: "Накопитель",
    psu: "Блок питания",
    case: "Корпус",
    cooling: "Охлаждение",
    peripheral: "Периферия",
  },
  buttons: {
    addToBuild: "В сборку",
    selected: "Выбрано",
    buyNow: "Купить",
    clearBuild: "Сбросить",
    reviewBuild: "Просмотр сборки",
    checkout: "Оформить",
    close: "Закрыть",
    allBrands: "Все бренды",
    pickParts: "Выбрать комплектующие",
    showMore: "Показать ещё",
  },
  search: {
    placeholder: "Поиск: название, бренд, характеристики…",
    noResults: "Ничего не найдено — измените запрос или бренд.",
    bestMatch: "Лучшее совпадение",
    topBrandsNote: "Сначала белые сборки и топ-бренды.",
    tierFilter: "Уровень",
    tierAll: "Все уровни",
  },
  badges: {
    white: "Белое исполнение",
    tierExtreme: "Экстремальный",
    tierHighEnd: "Топ",
    tierMidRange: "Средний класс",
  },
  compat: {
    title: "Совместимость",
    hint: "Сокет CPU ↔ плата; длина GPU ↔ корпус.",
    ok: "Конфликтов сокета и длины GPU нет.",
    incompatible: "Несовместимо",
    socketTitle: "Несовпадение сокета CPU и платы",
    socketDetail: "{{cpuName}} — сокет {{cpuSocket}}, а {{mbName}} ожидает {{mbSocket}}.",
    gpuTitle: "GPU длиннее допустимого в корпусе",
    gpuDetail: "{{gpuName}} — {{gpuLen}} мм; {{caseName}} допускает до {{clearance}} мм.",
    resolveHint: "Исправьте совместимость перед финалом.",
    socketCardHint: "Сокет не совпадает с выбранным CPU/платой.",
    gpuCardHint: "GPU может не поместиться в этот корпус.",
  },
  cart: {
    label: "Итого",
    parts: "{{count}} позиция",
    partsPlural: "{{count}} позиций",
    issues: "{{count}} проблема совместимости — исправьте перед оплатой.",
    issuesPlural: "{{count}} проблем совместимости — исправьте перед оплатой.",
  },
  walter: {
    title: "Совет Уолтера",
    powerTitle: "Проверка БП",
    pickBoth: "Выберите GPU и БП — Уолтер оценит запас мощности.",
    ok: "БП соответствует минимуму Уолтера для этой GPU. Спокойно.",
    warn:
      "Эта GPU просит минимум {{gpuW}} В. Ваш {{psuW}} В — риск; лучше мощнее БП.",
    target: "Цель GPU: {{gpuW}} В · Ваш БП: {{psuW}} В",
    tooltipWeak:
      "{{gpuName}} ~{{gpuW}} В. Этот БП на {{psuW}} В слаб для неё — один скачок нагрузки и пожалеешь.",
  },
  region: {
    label: "Регион и язык",
  },
  ui: {
    featured: "В фокусе",
    godTierBadge: "Сборка God Tier",
  },
  whiteBuild: {
    title: "Белая сборка",
    hint: "Приоритет белых SKU в поиске и подсветке.",
  },
  brandFilter: {
    title: "Фильтр бренда",
    hint: "Для открытой категории. CPU всегда показывает все Intel / AMD.",
  },
  specs: {
    socket: "Сокет {{socket}}",
    gpuLen: "{{mm}} мм · ≥{{w}} В БП",
    clearance: "GPU до {{mm}} мм",
    psuW: "{{w}} В",
    ram: "{{ddr}} · {{gb}} ГБ",
    coolingAio: "СЖО {{mm}} мм",
    coolingAir: "Воздушное охлаждение",
  },
  tier: {
    Extreme: "Экстремальный",
    HighEnd: "Топ",
    MidRange: "Средний класс",
  },
};
