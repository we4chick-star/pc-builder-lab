"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { PartCategory, TierRank } from "@/lib/types";
import { CATALOG, CATALOG_BRANDS } from "@/lib/catalog";
import { filterAndSortParts } from "@/lib/searchParts";
import { useBuild } from "@/context/BuildContext";
import { PartCard } from "./PartCard";

const CATEGORY_KEYS: Record<PartCategory, string> = {
  cpu: "categories.cpu",
  gpu: "categories.gpu",
  motherboard: "categories.motherboard",
  ram: "categories.ram",
  storage: "categories.storage",
  psu: "categories.psu",
  case: "categories.case",
  cooling: "categories.cooling",
  peripheral: "categories.peripheral",
};

const TIER_FILTERS: TierRank[] = ["Extreme", "High-End", "Mid-Range"];

const PAGE_SIZE = 16;

export function CategoryModal({
  category,
  onClose,
}: {
  category: PartCategory | null;
  onClose: () => void;
}) {
  const { t, whiteBuildOnly } = useBuild();
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState<string | null>(null);
  const [tier, setTier] = useState<TierRank | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    if (category) {
      setQuery("");
      setBrand(null);
      setTier(null);
      setVisibleCount(PAGE_SIZE);
    }
  }, [category]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, brand, tier]);

  const pool = useMemo(
    () => CATALOG.filter((p) => p.category === category),
    [category]
  );

  const filtered = useMemo(
    () =>
      category
        ? filterAndSortParts(pool, {
            query,
            brand,
            tier,
            boostWhite: whiteBuildOnly || query.length > 0,
            boostTopBrands: true,
          })
        : [],
    [pool, category, query, brand, tier, whiteBuildOnly]
  );

  const visible = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);
  const canShowMore = visibleCount < filtered.length;

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!category) return;
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [category, onKey]);

  if (!category) return null;

  const titleKey = CATEGORY_KEYS[category];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="category-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        aria-label={t("buttons.close")}
        onClick={onClose}
      />
      <div className="relative flex max-h-[min(92vh,880px)] w-full max-w-5xl flex-col rounded-t-2xl border border-zinc-800 bg-[#070707] shadow-2xl sm:rounded-2xl">
        <header className="flex shrink-0 items-start justify-between gap-3 border-b border-zinc-800 p-4 sm:p-5">
          <div>
            <h2 id="category-modal-title" className="font-display text-xl font-bold text-zinc-100">
              {t(titleKey)}
            </h2>
            <p className="mt-1 text-xs text-zinc-500">{t("search.topBrandsNote")}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 hover:border-chemical/40 hover:text-chemical"
          >
            {t("buttons.close")}
          </button>
        </header>

        <div className="shrink-0 space-y-3 border-b border-zinc-800/80 p-4 sm:p-5">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search.placeholder")}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-chemical/50 focus:outline-none focus:ring-1 focus:ring-chemical/30"
            autoFocus
          />
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
              {t("search.tierFilter")}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setTier(null)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  tier === null
                    ? "bg-chemical/20 text-chemical ring-1 ring-chemical/40"
                    : "bg-zinc-900 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {t("search.tierAll")}
              </button>
              {TIER_FILTERS.map((tf) => (
                <button
                  key={tf}
                  type="button"
                  onClick={() => setTier(tf)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    tier === tf
                      ? "bg-chemical/20 text-chemical ring-1 ring-chemical/40"
                      : "bg-zinc-900 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {tf === "Extreme"
                    ? t("tier.Extreme")
                    : tf === "High-End"
                      ? t("tier.HighEnd")
                      : t("tier.MidRange")}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
              {t("brandFilter.title")}
            </p>
            <div className="flex max-h-24 flex-wrap gap-2 overflow-y-auto pr-1">
              <button
                type="button"
                onClick={() => setBrand(null)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  brand === null
                    ? "bg-chemical/20 text-chemical ring-1 ring-chemical/40"
                    : "bg-zinc-900 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {t("buttons.allBrands")}
              </button>
              {CATALOG_BRANDS.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBrand(b)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    brand === b
                      ? "bg-chemical/20 text-chemical ring-1 ring-chemical/40"
                      : "bg-zinc-900 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
          {filtered.length === 0 ? (
            <p className="py-12 text-center text-sm text-zinc-500">{t("search.noResults")}</p>
          ) : (
            <>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((p) => (
                  <PartCard key={p.id} part={p} compact />
                ))}
              </div>
              {canShowMore && (
                <div className="mt-4 flex justify-center pb-2">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                    className="rounded-xl border border-zinc-700 bg-zinc-900/90 px-5 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-chemical/40 hover:text-chemical"
                  >
                    {t("buttons.showMore")}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
