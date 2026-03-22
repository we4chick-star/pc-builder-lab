import type { CatalogPart, CpuPart, TierRank } from "@/lib/types";
import { IMG, slug } from "./constants";

type C = { name: string; socket: "LGA1700" | "AM4" | "AM5"; tier: TierRank; price: number };

const INTEL_BUDGET: C[] = [
  { name: "Intel Core i3-12100", socket: "LGA1700", tier: "Mid-Range", price: 119 },
  { name: "Intel Core i3-12100F", socket: "LGA1700", tier: "Mid-Range", price: 109 },
  { name: "Intel Core i5-12400", socket: "LGA1700", tier: "Mid-Range", price: 169 },
  { name: "Intel Core i5-12400F", socket: "LGA1700", tier: "Mid-Range", price: 179 },
];

const AMD_BUDGET: C[] = [
  { name: "AMD Ryzen 3 4100", socket: "AM4", tier: "Mid-Range", price: 79 },
  { name: "AMD Ryzen 5 5600G", socket: "AM4", tier: "Mid-Range", price: 129 },
  { name: "AMD Ryzen 5 5500", socket: "AM4", tier: "Mid-Range", price: 129 },
];

const INTEL_12_13_14: C[] = [
  { name: "Intel Core i3-12100F", socket: "LGA1700", tier: "Mid-Range", price: 109 },
  { name: "Intel Core i5-12400F", socket: "LGA1700", tier: "Mid-Range", price: 179 },
  { name: "Intel Core i5-12600K", socket: "LGA1700", tier: "High-End", price: 289 },
  { name: "Intel Core i7-12700K", socket: "LGA1700", tier: "High-End", price: 399 },
  { name: "Intel Core i9-12900K", socket: "LGA1700", tier: "Extreme", price: 589 },
  { name: "Intel Core i5-13400F", socket: "LGA1700", tier: "Mid-Range", price: 219 },
  { name: "Intel Core i5-13600K", socket: "LGA1700", tier: "High-End", price: 319 },
  { name: "Intel Core i5-13600KF", socket: "LGA1700", tier: "High-End", price: 299 },
  { name: "Intel Core i7-13700K", socket: "LGA1700", tier: "Extreme", price: 419 },
  { name: "Intel Core i7-13700KF", socket: "LGA1700", tier: "Extreme", price: 399 },
  { name: "Intel Core i9-13900K", socket: "LGA1700", tier: "Extreme", price: 589 },
  { name: "Intel Core i9-13900KS", socket: "LGA1700", tier: "Extreme", price: 699 },
  { name: "Intel Core i5-14600K", socket: "LGA1700", tier: "High-End", price: 329 },
  { name: "Intel Core i5-14600KF", socket: "LGA1700", tier: "High-End", price: 309 },
  { name: "Intel Core i7-14700K", socket: "LGA1700", tier: "Extreme", price: 439 },
  { name: "Intel Core i7-14700KF", socket: "LGA1700", tier: "Extreme", price: 419 },
  { name: "Intel Core i9-14900K", socket: "LGA1700", tier: "Extreme", price: 579 },
  { name: "Intel Core i9-14900KF", socket: "LGA1700", tier: "Extreme", price: 549 },
  { name: "Intel Core i9-14900KS", socket: "LGA1700", tier: "Extreme", price: 689 },
];

const AMD_5000: C[] = [
  { name: "AMD Ryzen 5 5500", socket: "AM4", tier: "Mid-Range", price: 129 },
  { name: "AMD Ryzen 5 5600", socket: "AM4", tier: "Mid-Range", price: 159 },
  { name: "AMD Ryzen 5 5600X", socket: "AM4", tier: "High-End", price: 199 },
  { name: "AMD Ryzen 7 5700X", socket: "AM4", tier: "High-End", price: 249 },
  { name: "AMD Ryzen 7 5800X", socket: "AM4", tier: "High-End", price: 329 },
  { name: "AMD Ryzen 7 5800X3D", socket: "AM4", tier: "Extreme", price: 449 },
  { name: "AMD Ryzen 9 5900X", socket: "AM4", tier: "Extreme", price: 499 },
  { name: "AMD Ryzen 9 5950X", socket: "AM4", tier: "Extreme", price: 599 },
];

const AMD_7000: C[] = [
  { name: "AMD Ryzen 5 7600", socket: "AM5", tier: "Mid-Range", price: 229 },
  { name: "AMD Ryzen 5 7600X", socket: "AM5", tier: "High-End", price: 249 },
  { name: "AMD Ryzen 7 7700", socket: "AM5", tier: "Mid-Range", price: 329 },
  { name: "AMD Ryzen 7 7700X", socket: "AM5", tier: "High-End", price: 349 },
  { name: "AMD Ryzen 7 7800X3D", socket: "AM5", tier: "Extreme", price: 449 },
  { name: "AMD Ryzen 9 7900", socket: "AM5", tier: "High-End", price: 429 },
  { name: "AMD Ryzen 9 7900X", socket: "AM5", tier: "Extreme", price: 499 },
  { name: "AMD Ryzen 9 7900X3D", socket: "AM5", tier: "Extreme", price: 549 },
  { name: "AMD Ryzen 9 7950X", socket: "AM5", tier: "Extreme", price: 599 },
  { name: "AMD Ryzen 9 7950X3D", socket: "AM5", tier: "Extreme", price: 699 },
];

const AMD_9000: C[] = [
  { name: "AMD Ryzen 5 9600X", socket: "AM5", tier: "High-End", price: 279 },
  { name: "AMD Ryzen 7 9700X", socket: "AM5", tier: "High-End", price: 359 },
  { name: "AMD Ryzen 9 9900X", socket: "AM5", tier: "Extreme", price: 499 },
  { name: "AMD Ryzen 9 9950X", socket: "AM5", tier: "Extreme", price: 649 },
];

function row(c: C): CpuPart {
  const brand = c.name.startsWith("Intel") ? "Intel" : "AMD";
  return {
    id: slug(`cpu-${c.name}`),
    name: c.name,
    category: "cpu",
    brand,
    tier: c.tier,
    retailerQuery: c.name,
    priceUsd: c.price,
    image: IMG,
    specsSummary: `Socket ${c.socket}`,
    socket: c.socket,
  };
}

export function buildCpuCatalog(): CatalogPart[] {
  return [...INTEL_BUDGET, ...AMD_BUDGET, ...INTEL_12_13_14, ...AMD_5000, ...AMD_7000, ...AMD_9000].map(row);
}
