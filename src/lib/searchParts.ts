import type { CatalogPart, TierRank } from "./types";
import { topBrandRank } from "@/data/catalog/constants";

/**
 * Filters by search, brand, and tier; sorts white SKUs and top brands first when requested.
 */
export function filterAndSortParts(
  parts: CatalogPart[],
  opts: {
    query: string;
    brand: string | null;
    tier: TierRank | null;
    boostWhite: boolean;
    boostTopBrands: boolean;
  }
): CatalogPart[] {
  let list = parts;
  if (opts.brand) {
    list = list.filter((p) => p.brand === opts.brand);
  }
  if (opts.tier) {
    list = list.filter((p) => p.tier === opts.tier);
  }
  const q = opts.query.trim().toLowerCase();
  if (q) {
    list = list.filter((p) => {
      const hay = `${p.name} ${p.brand} ${p.specsSummary} ${p.retailerQuery}`.toLowerCase();
      return hay.includes(q);
    });
  }
  list = [...list].sort((a, b) => {
    if (opts.boostWhite) {
      if (a.isWhite && !b.isWhite) return -1;
      if (!a.isWhite && b.isWhite) return 1;
    }
    if (opts.boostTopBrands) {
      const ra = topBrandRank(a.brand);
      const rb = topBrandRank(b.brand);
      if (ra !== rb) return ra - rb;
    }
    return a.name.localeCompare(b.name);
  });
  return list;
}
