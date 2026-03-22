import { CATALOG } from "@/lib/catalog";
import type { BuildSelection, CatalogPart, PartCategory } from "@/lib/types";

function inCat(category: PartCategory) {
  return CATALOG.filter((p) => p.category === category);
}

/** Spotlight SKU shown when a category slot is empty (same picks as God Tier marketing). */
export function getFeaturedPart(category: PartCategory): CatalogPart | undefined {
  switch (category) {
    case "cpu":
      return inCat("cpu").find((p) => p.name.includes("i7-13700KF")) ?? inCat("cpu").find((p) => p.name.includes("13700K"));
    case "gpu":
      return (
        inCat("gpu").find((p) => p.isWhite && p.name.includes("4080") && p.name.includes("Strix")) ??
        inCat("gpu").find((p) => p.name.includes("4080") && p.name.includes("Strix"))
      );
    case "motherboard":
      return (
        inCat("motherboard").find((p) => p.id === "mb-asus-strix-z790-e") ??
        inCat("motherboard").find((p) => p.name.includes("Strix Z790-E"))
      );
    case "ram":
      return (
        inCat("ram").find(
          (p) => p.brand === "Corsair" && p.name.includes("Dominator") && p.name.includes("64GB") && p.name.includes("DDR5")
        ) ??
        inCat("ram").find((p) => p.brand === "Corsair" && p.name.includes("Dominator") && p.name.includes("DDR5"))
      );
    case "storage":
      return inCat("storage").find((p) => p.id === "ssd-990pro-2tb");
    case "psu":
      return inCat("psu").find((p) => p.id === "psu-asus-thor");
    case "case":
      return inCat("case").find((p) => p.id === "case-asus-hyperion");
    case "cooling":
      return (
        inCat("cooling").find((p) => p.id === "cooling-asus-ryujin-360") ??
        inCat("cooling").find((p) => p.id === "cooling-corsair-h150i")
      );
    case "peripheral":
      return inCat("peripheral").find((p) => p.id === "peri-logitech-superlight");
    default:
      return undefined;
  }
}

/** Pre-loaded “God Tier” build (~179k ₴ class in UA when totaled). */
export function buildGodTierSelection(): BuildSelection {
  const categories: PartCategory[] = [
    "cpu",
    "gpu",
    "motherboard",
    "ram",
    "storage",
    "psu",
    "case",
    "cooling",
    "peripheral",
  ];
  const sel: BuildSelection = {};
  for (const c of categories) {
    const p = getFeaturedPart(c);
    if (p) sel[c] = p;
  }
  return sel;
}
