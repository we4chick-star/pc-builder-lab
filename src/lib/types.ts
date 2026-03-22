export type RegionCode = "UA" | "KZ" | "RU" | "EN";

export type PartCategory =
  | "cpu"
  | "motherboard"
  | "gpu"
  | "case"
  | "psu"
  | "ram"
  | "storage"
  | "peripheral"
  | "cooling";

/** UI locale (synced with region for currency/shops) */
export type LocaleCode = "en" | "uk" | "ru" | "kk";

export const REGION_TO_LOCALE: Record<RegionCode, LocaleCode> = {
  EN: "en",
  UA: "uk",
  RU: "ru",
  KZ: "kk",
};

/** Performance / price tier for badges and modal filter */
export type TierRank = "Extreme" | "High-End" | "Mid-Range";

export interface RetailerLink {
  label: string;
  href: string;
}

export interface BasePart {
  id: string;
  name: string;
  category: PartCategory;
  brand: string;
  tier: TierRank;
  retailerQuery: string;
  priceUsd: number;
  isWhite?: boolean;
  /** Product image URL or path under /public */
  image: string;
  /** Short spec line for cards / search */
  specsSummary: string;
}

export interface CpuPart extends BasePart {
  category: "cpu";
  socket: string;
}

export interface MotherboardPart extends BasePart {
  category: "motherboard";
  socket: string;
}

export interface GpuPart extends BasePart {
  category: "gpu";
  lengthMm: number;
  recommendedPsuWatts: number;
}

export interface CasePart extends BasePart {
  category: "case";
  gpuClearanceMm: number;
}

export interface PsuPart extends BasePart {
  category: "psu";
  wattage: number;
}

export interface RamPart extends BasePart {
  category: "ram";
  ddrGeneration: "DDR4" | "DDR5";
  capacityGb: number;
}

export interface StoragePart extends BasePart {
  category: "storage";
}

export interface PeripheralPart extends BasePart {
  category: "peripheral";
  peripheralKind: "mouse" | "keyboard" | "headset" | "other";
}

export interface CoolingPart extends BasePart {
  category: "cooling";
  kind: "aio" | "air";
  radiatorMm?: number;
}

export type CatalogPart =
  | CpuPart
  | MotherboardPart
  | GpuPart
  | CasePart
  | PsuPart
  | RamPart
  | StoragePart
  | PeripheralPart
  | CoolingPart;

export type BuildSelection = Partial<Record<PartCategory, CatalogPart>>;
