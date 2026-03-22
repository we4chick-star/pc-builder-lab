import type { TierRank } from "@/lib/types";

export const IMG = "/placeholders/part.svg";

/** Brands surfaced first in smart search */
export const TOP_BRANDS = [
  "ASUS",
  "MSI",
  "Gigabyte",
  "NVIDIA",
  "AMD",
  "Intel",
  "Corsair",
  "Samsung",
  "G.Skill",
  "Kingston",
  "Seasonic",
  "Lian Li",
  "NZXT",
  "Fractal Design",
  "be quiet!",
  "EVGA",
  "TeamGroup",
  "WD",
  "Crucial",
  "Arctic",
  "Noctua",
  "Logitech",
  "Razer",
  "SteelSeries",
  "VGN",
  "Sapphire",
  "PowerColor",
  "EKWB",
  "Deepcool",
  "Keychron",
  "HyperX",
  "Glorious",
  "ZOWIE",
  "Wooting",
  "Seagate",
  "Sabrent",
  "SK hynix",
  "TeamGroup",
] as const;

export function topBrandRank(brand: string): number {
  const i = TOP_BRANDS.indexOf(brand as (typeof TOP_BRANDS)[number]);
  return i === -1 ? 999 : i;
}

export function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
