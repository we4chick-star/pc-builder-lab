import type { CatalogPart, RamPart, TierRank } from "@/lib/types";
import { IMG, slug } from "./constants";

function ramTier(speed: number): TierRank {
  if (speed >= 7200) return "Extreme";
  if (speed >= 6000) return "High-End";
  return "Mid-Range";
}

const DDR5_SPEEDS = [5200, 5600, 6000, 6200, 6400, 6600, 7200, 7600, 8000] as const;
const DDR5_GB = [16, 32, 48, 64] as const;

type LineDef = { brand: string; line: string; mul: number };

const LINES: LineDef[] = [
  { brand: "G.Skill", line: "Trident Z5 RGB", mul: 1.14 },
  { brand: "G.Skill", line: "Trident Z5 Neo RGB", mul: 1.08 },
  { brand: "Corsair", line: "Dominator Titanium RGB", mul: 1.28 },
  { brand: "Corsair", line: "Dominator Platinum RGB", mul: 1.2 },
  { brand: "Corsair", line: "Vengeance RGB", mul: 1.02 },
  { brand: "Kingston", line: "Fury Renegade RGB", mul: 1.12 },
  { brand: "Kingston", line: "Fury Beast RGB", mul: 0.98 },
];

export function buildRamCatalog(): CatalogPart[] {
  const out: RamPart[] = [];

  for (const { brand, line, mul } of LINES) {
    for (const speed of DDR5_SPEEDS) {
      for (const gb of DDR5_GB) {
        if (speed >= 7200 && gb < 32) continue;
        if (speed === 8000 && gb > 48) continue;
        if (speed === 5200 && gb > 32) continue;
        const base = 48 + gb * 2.1 + (speed - 5200) * 0.055;
        const name = `${brand} ${line} ${gb}GB DDR5-${speed}`;
        const tier = ramTier(speed);
        const isWhite =
          (line.includes("Titanium") || line.includes("Platinum")) && gb === 32 && speed <= 6400;
        out.push({
          id: slug(`ram-${brand}-${line}-${gb}-d5-${speed}`),
          name,
          category: "ram",
          brand,
          tier,
          retailerQuery: name,
          priceUsd: Math.round(base * mul),
          isWhite,
          image: IMG,
          specsSummary: `DDR5-${speed} · ${gb} GB`,
          ddrGeneration: "DDR5",
          capacityGb: gb,
        });
      }
    }
  }

  const ddr4: { gb: number; speed: number; base: number }[] = [
    { gb: 16, speed: 3200, base: 49 },
    { gb: 32, speed: 3600, base: 89 },
    { gb: 32, speed: 4000, base: 109 },
    { gb: 64, speed: 3600, base: 189 },
  ];
  for (const { gb, speed, base } of ddr4) {
    for (const { brand, line, mul } of [
      { brand: "G.Skill", line: "Ripjaws V", mul: 0.95 },
      { brand: "Corsair", line: "Vengeance LPX", mul: 0.92 },
      { brand: "Kingston", line: "Fury Beast", mul: 0.96 },
    ] as LineDef[]) {
      const name = `${brand} ${line} ${gb}GB DDR4-${speed}`;
      out.push({
        id: slug(`ram-${brand}-${line}-${gb}-d4-${speed}`),
        name,
        category: "ram",
        brand,
        tier: "Mid-Range" as TierRank,
        retailerQuery: name,
        priceUsd: Math.round(base * mul),
        image: IMG,
        specsSummary: `DDR4-${speed} · ${gb} GB`,
        ddrGeneration: "DDR4",
        capacityGb: gb,
      });
    }
  }

  return out;
}
