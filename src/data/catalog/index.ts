import type { CatalogPart } from "@/lib/types";
import { BRAND_ORDER } from "./sortBrands";
import { buildCpuCatalog } from "./cpus";
import { buildGpuCatalog } from "./gpus";
import { buildRamCatalog } from "./ram";
import { buildMotherboardCatalog } from "./motherboards";
import { MISC_PARTS } from "./misc";

export const CATALOG: CatalogPart[] = [
  ...buildCpuCatalog(),
  ...buildGpuCatalog(),
  ...buildRamCatalog(),
  ...buildMotherboardCatalog(),
  ...MISC_PARTS,
];

export const CATALOG_BRANDS: string[] = (() => {
  const set = new Set(CATALOG.map((p) => p.brand));
  const list = [...set];
  list.sort((a, b) => {
    const ia = (BRAND_ORDER as readonly string[]).indexOf(a);
    const ib = (BRAND_ORDER as readonly string[]).indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
  return list;
})();
