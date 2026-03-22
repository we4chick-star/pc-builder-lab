import type { CatalogPart, GpuPart, TierRank } from "@/lib/types";
import { IMG, slug } from "./constants";

type Aib = {
  brand: string;
  line: string;
  tier: TierRank;
  lenAdd: number;
  priceMul: number;
  white?: boolean;
};

const NVIDIA_AIBS: Aib[] = [
  { brand: "ASUS", line: "ROG Strix OC", tier: "Extreme", lenAdd: 28, priceMul: 1.22, white: true },
  { brand: "ASUS", line: "TUF Gaming OC", tier: "High-End", lenAdd: 12, priceMul: 1.05 },
  { brand: "MSI", line: "Suprim X", tier: "Extreme", lenAdd: 22, priceMul: 1.18 },
  { brand: "MSI", line: "Suprim Liquid X", tier: "Extreme", lenAdd: 20, priceMul: 1.25 },
  { brand: "MSI", line: "Gaming X Trio", tier: "High-End", lenAdd: 18, priceMul: 1.08 },
  { brand: "Gigabyte", line: "Aorus Master", tier: "Extreme", lenAdd: 24, priceMul: 1.15 },
  { brand: "Gigabyte", line: "Aorus Xtreme", tier: "Extreme", lenAdd: 26, priceMul: 1.28 },
  { brand: "Gigabyte", line: "Gaming OC", tier: "Mid-Range", lenAdd: 10, priceMul: 1.02 },
];

const AMD_AIBS: Aib[] = [
  { brand: "ASUS", line: "ROG Strix OC", tier: "Extreme", lenAdd: 26, priceMul: 1.2 },
  { brand: "ASUS", line: "TUF OC", tier: "High-End", lenAdd: 10, priceMul: 1.04 },
  { brand: "MSI", line: "Gaming X Trio", tier: "High-End", lenAdd: 16, priceMul: 1.06 },
  { brand: "Gigabyte", line: "Aorus Elite", tier: "High-End", lenAdd: 8, priceMul: 1.0 },
  { brand: "Sapphire", line: "Nitro+", tier: "Extreme", lenAdd: 14, priceMul: 1.1 },
  { brand: "PowerColor", line: "Red Devil", tier: "Extreme", lenAdd: 18, priceMul: 1.08 },
];

type Row = [string, number, number, number];

const RTX_30: Row[] = [
  ["GeForce RTX 3050", 232, 450, 249],
  ["GeForce RTX 3060", 242, 550, 329],
  ["GeForce RTX 3060 Ti", 248, 600, 399],
  ["GeForce RTX 3070", 286, 650, 499],
  ["GeForce RTX 3070 Ti", 300, 650, 599],
  ["GeForce RTX 3080", 320, 750, 699],
  ["GeForce RTX 3080 Ti", 336, 850, 1199],
  ["GeForce RTX 3090", 336, 850, 1499],
  ["GeForce RTX 3090 Ti", 340, 1000, 1999],
];

const RTX_40: Row[] = [
  ["GeForce RTX 4050", 220, 400, 299],
  ["GeForce RTX 4060", 240, 550, 299],
  ["GeForce RTX 4060 Ti", 244, 550, 399],
  ["GeForce RTX 4070", 285, 650, 599],
  ["GeForce RTX 4070 Super", 288, 650, 599],
  ["GeForce RTX 4070 Ti", 310, 700, 799],
  ["GeForce RTX 4070 Ti Super", 318, 700, 799],
  ["GeForce RTX 4080", 320, 750, 1199],
  ["GeForce RTX 4080 Super", 304, 750, 999],
  ["GeForce RTX 4090", 340, 850, 1599],
];

const RX_6000: Row[] = [
  ["Radeon RX 6600", 240, 500, 279],
  ["Radeon RX 6600 XT", 248, 550, 329],
  ["Radeon RX 6650 XT", 250, 550, 359],
  ["Radeon RX 6700 XT", 268, 650, 429],
  ["Radeon RX 6750 XT", 272, 650, 469],
  ["Radeon RX 6800", 290, 650, 579],
  ["Radeon RX 6800 XT", 300, 750, 649],
  ["Radeon RX 6900 XT", 310, 850, 999],
  ["Radeon RX 6950 XT", 312, 850, 1099],
];

const RX_7000: Row[] = [
  ["Radeon RX 7600", 242, 550, 269],
  ["Radeon RX 7600 XT", 246, 600, 329],
  ["Radeon RX 7700 XT", 278, 650, 429],
  ["Radeon RX 7800 XT", 288, 700, 499],
  ["Radeon RX 7900 GRE", 300, 750, 549],
  ["Radeon RX 7900 XT", 312, 750, 749],
  ["Radeon RX 7900 XTX", 318, 850, 999],
];

function feTier(model: string): TierRank {
  if (/4090|3090 Ti|4080 Super|4080|7900 XTX|7900 XT/.test(model)) return "Extreme";
  if (/4070 Ti|4070 Super|3090|7900 GRE|7800/.test(model)) return "High-End";
  if (/4060|4050|7600/.test(model)) return "Mid-Range";
  return "High-End";
}

function nvidiaRows(rows: Row[]): GpuPart[] {
  const out: GpuPart[] = [];
  for (const [model, baseLen, psu, basePrice] of rows) {
    const feName = `NVIDIA ${model} Founders Edition`;
    out.push({
      id: slug(`gpu-nvidia-fe-${model}`),
      name: feName,
      category: "gpu",
      brand: "NVIDIA",
      tier: feTier(model),
      retailerQuery: feName,
      priceUsd: Math.round(basePrice * 0.98),
      image: IMG,
      specsSummary: `${baseLen} mm · ${psu}W+ PSU`,
      lengthMm: baseLen,
      recommendedPsuWatts: psu,
    });
    for (const aib of NVIDIA_AIBS) {
      const len = Math.min(baseLen + aib.lenAdd, 390);
      const name = `${aib.brand} ${model.replace("GeForce ", "")} ${aib.line}`;
      out.push({
        id: slug(`gpu-${aib.brand}-${model}-${aib.line}`),
        name,
        category: "gpu",
        brand: aib.brand,
        tier: aib.tier,
        retailerQuery: name,
        priceUsd: Math.round(basePrice * aib.priceMul),
        isWhite: aib.white,
        image: IMG,
        specsSummary: `${len} mm · ${psu}W+ PSU`,
        lengthMm: len,
        recommendedPsuWatts: psu,
      });
    }
  }
  return out;
}

function amdRows(rows: Row[]): GpuPart[] {
  const out: GpuPart[] = [];
  for (const [model, baseLen, psu, basePrice] of rows) {
    for (const aib of AMD_AIBS) {
      const len = Math.min(baseLen + aib.lenAdd, 360);
      const short = model.replace("Radeon ", "");
      const name = `${aib.brand} ${short} ${aib.line}`;
      out.push({
        id: slug(`gpu-${aib.brand}-${short}-${aib.line}`),
        name,
        category: "gpu",
        brand: aib.brand,
        tier: aib.tier,
        retailerQuery: name,
        priceUsd: Math.round(basePrice * aib.priceMul),
        image: IMG,
        specsSummary: `${len} mm · ${psu}W+ PSU`,
        lengthMm: len,
        recommendedPsuWatts: psu,
      });
    }
  }
  return out;
}

/** Dedicated white SKUs (MSI Suprim / Gigabyte Aorus White) for key RTX 40 chips */
function nvidiaWhiteExtras(): GpuPart[] {
  const chips: { model: string; baseLen: number; psu: number; base: number }[] = [
    { model: "GeForce RTX 4090", baseLen: 340, psu: 850, base: 1599 },
    { model: "GeForce RTX 4080 Super", baseLen: 304, psu: 750, base: 999 },
    { model: "GeForce RTX 4080", baseLen: 320, psu: 750, base: 1199 },
    { model: "GeForce RTX 4070 Ti Super", baseLen: 318, psu: 700, base: 799 },
    { model: "GeForce RTX 4070 Ti", baseLen: 310, psu: 700, base: 799 },
    { model: "GeForce RTX 4060 Ti", baseLen: 244, psu: 550, base: 399 },
    { model: "GeForce RTX 4060", baseLen: 240, psu: 550, base: 299 },
  ];
  const combos: { brand: string; line: string; lenAdd: number; mul: number; tier: TierRank }[] = [
    { brand: "MSI", line: "Suprim X White", lenAdd: 22, mul: 1.2, tier: "Extreme" },
    { brand: "MSI", line: "Gaming X Slim White", lenAdd: 14, mul: 1.08, tier: "High-End" },
    { brand: "Gigabyte", line: "Aorus Master White", lenAdd: 24, mul: 1.18, tier: "Extreme" },
    { brand: "Gigabyte", line: "Aero OC White", lenAdd: 12, mul: 1.06, tier: "High-End" },
  ];
  const out: GpuPart[] = [];
  for (const c of chips) {
    for (const co of combos) {
      const len = Math.min(c.baseLen + co.lenAdd, 390);
      const short = c.model.replace("GeForce ", "");
      const name = `${co.brand} ${short} ${co.line}`;
      out.push({
        id: slug(`gpu-white-${co.brand}-${c.model}-${co.line}`),
        name,
        category: "gpu",
        brand: co.brand,
        tier: co.tier,
        retailerQuery: name,
        priceUsd: Math.round(c.base * co.mul),
        isWhite: true,
        image: IMG,
        specsSummary: `${len} mm · ${c.psu}W+ · White`,
        lengthMm: len,
        recommendedPsuWatts: c.psu,
      });
    }
  }
  return out;
}

export function buildGpuCatalog(): CatalogPart[] {
  return [
    ...budgetGpus(),
    ...nvidiaRows(RTX_30),
    ...nvidiaRows(RTX_40),
    ...nvidiaWhiteExtras(),
    ...amdRows(RX_6000),
    ...amdRows(RX_7000),
  ];
}

function budgetGpus(): GpuPart[] {
  const items: { id: string; name: string; brand: string; len: number; psu: number; price: number }[] = [
    { id: "gpu-gt1030-asus", name: "ASUS GT 1030 2GB OC", brand: "ASUS", len: 145, psu: 300, price: 79 },
    { id: "gpu-gt1030-msi", name: "MSI GT 1030 2GH OC", brand: "MSI", len: 148, psu: 300, price: 75 },
    { id: "gpu-gtx1650-asus-oc", name: "ASUS GTX 1650 OC 4GB", brand: "ASUS", len: 195, psu: 350, price: 149 },
    { id: "gpu-gtx1650-msi-gaming", name: "MSI GTX 1650 Gaming X 4GB", brand: "MSI", len: 200, psu: 350, price: 155 },
    { id: "gpu-gtx1650-gigabyte-oc", name: "Gigabyte GTX 1650 OC 4GB", brand: "Gigabyte", len: 190, psu: 350, price: 145 },
    { id: "gpu-rx6400-asus", name: "ASUS Radeon RX 6400 4GB", brand: "ASUS", len: 170, psu: 350, price: 129 },
    { id: "gpu-rx6400-msi", name: "MSI Radeon RX 6400 Aero ITX 4GB", brand: "MSI", len: 167, psu: 350, price: 119 },
    { id: "gpu-rx6400-gigabyte", name: "Gigabyte Radeon RX 6400 Eagle 4GB", brand: "Gigabyte", len: 172, psu: 350, price: 125 },
  ];
  return items.map((g) => ({
    id: g.id,
    name: g.name,
    category: "gpu",
    brand: g.brand,
    tier: "Mid-Range" as const,
    retailerQuery: g.name,
    priceUsd: g.price,
    image: IMG,
    specsSummary: `${g.len} mm · ${g.psu}W+ PSU`,
    lengthMm: g.len,
    recommendedPsuWatts: g.psu,
  }));
}
