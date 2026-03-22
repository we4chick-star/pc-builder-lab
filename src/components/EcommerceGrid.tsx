"use client";

import { useState, useMemo } from "react";
import type { PartCategory, TierRank } from "@/lib/types";
import { CATALOG } from "@/lib/catalog";
import { filterAndSortParts } from "@/lib/searchParts";
import { useBuild } from "@/context/BuildContext";
import { EcommerceCard } from "./EcommerceCard";

const CATEGORIES: { value: PartCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "gpu", label: "GPU" },
  { value: "cpu", label: "CPU" },
  { value: "ram", label: "RAM" },
  { value: "storage", label: "Storage" },
  { value: "psu", label: "PSU" },
  { value: "motherboard", label: "Motherboard" },
  { value: "case", label: "Case" },
  { value: "cooling", label: "Cooling" },
  { value: "peripheral", label: "Peripherals" },
];

const TIERS: { value: TierRank | "all"; label: string }[] = [
  { value: "all", label: "All Tiers" },
  { value: "Extreme", label: "Extreme" },
  { value: "High-End", label: "High-End" },
  { value: "Mid-Range", label: "Mid-Range" },
];

type Preset = "study" | "gaming" | "ultra" | null;

const PRESETS: { value: Preset; label: string; desc: string; style: string; activeStyle: string; maxUsd: number | null; minUsd: number | null }[] = [
  {
    value: "study",
    label: "📚 Study",
    desc: "< 375 USD",
    style: "border-sky-500/30 bg-sky-500/10 text-sky-400 hover:border-sky-500/50",
    activeStyle: "border-sky-500/60 bg-sky-500/20 text-sky-300 ring-1 ring-sky-500/40 shadow-[0_0_16px_rgba(56,189,248,0.2)]",
    maxUsd: 375,
    minUsd: null,
  },
  {
    value: "gaming",
    label: "🎮 Gaming",
    desc: "750 – 1500 USD",
    style: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:border-emerald-500/50",
    activeStyle: "border-emerald-500/60 bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40 shadow-[0_0_16px_rgba(16,185,129,0.2)]",
    maxUsd: 1500,
    minUsd: 750,
  },
  {
    value: "ultra",
    label: "⚡ Ultra",
    desc: "No limits",
    style: "border-amber-500/30 bg-amber-500/10 text-amber-400 hover:border-amber-500/50",
    activeStyle: "border-amber-500/60 bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/40 shadow-[0_0_16px_rgba(234,179,8,0.2)]",
    maxUsd: null,
    minUsd: 1500,
  },
];

const PAGE_SIZE = 24;

export function EcommerceGrid() {
  const { whiteBuildOnly } = useBuild();
  const [category, setCategory] = useState<PartCategory | "all">("gpu");
  const [tier, setTier] = useState<TierRank | "all">("all");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [preset, setPreset] = useState<Preset>(null);

  const pool = useMemo(
    () => (category === "all" ? CATALOG : CATALOG.filter((p) => p.category === category)),
    [category]
  );

  const filtered = useMemo(() => {
    const activePreset = PRESETS.find((p) => p.value === preset);
    return filterAndSortParts(pool, {
      query,
      brand: null,
      tier: tier === "all" ? null : tier,
      boostWhite: whiteBuildOnly,
      boostTopBrands: true,
    })
      .filter((p) => !whiteBuildOnly || p.isWhite)
      .filter((p) => {
        if (!activePreset) return true;
        if (activePreset.maxUsd !== null && p.priceUsd > activePreset.maxUsd) return false;
        if (activePreset.minUsd !== null && p.priceUsd < activePreset.minUsd) return false;
        return true;
      });
  }, [pool, query, tier, whiteBuildOnly, preset]);

  const shown = useMemo(() => filtered.slice(0, visible), [filtered, visible]);

  function handleCategory(val: PartCategory | "all") {
    setCategory(val);
    setVisible(PAGE_SIZE);
  }

  function handlePreset(val: Preset) {
    setPreset((prev) => (prev === val ? null : val));
    setVisible(PAGE_SIZE);
    // Switch to "all" category so preset shows across all parts
    setCategory("all");
    setTier("all");
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Build Presets */}
      <div className="flex flex-col gap-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600">Quick Presets</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => handlePreset(p.value)}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition-all ${
                preset === p.value ? p.activeStyle : p.style
              }`}
            >
              <span>{p.label}</span>
              <span className={`font-mono text-[10px] font-normal ${preset === p.value ? "opacity-80" : "opacity-50"}`}>
                {p.desc}
              </span>
            </button>
          ))}
          {preset && (
            <button
              type="button"
              onClick={() => { setPreset(null); setVisible(PAGE_SIZE); }}
              className="rounded-xl border border-slate-700/60 px-3 py-2.5 text-xs text-zinc-500 transition-colors hover:text-zinc-300"
            >
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <svg className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-500/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setVisible(PAGE_SIZE); }}
          placeholder="Search components..."
          className="w-full rounded-xl border border-emerald-900/50 bg-slate-900/70 py-3 pl-10 pr-4 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 backdrop-blur-md"
        />
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => handleCategory(value)}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
              category === value
                ? "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                : "bg-slate-900/60 text-zinc-500 hover:text-zinc-300 border border-slate-800/80"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tier filter */}
      <div className="flex flex-wrap gap-2">
        {TIERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => { setTier(value); setVisible(PAGE_SIZE); }}
            className={`rounded-lg px-3 py-1 text-[11px] font-medium transition-all ${
              tier === value
                ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/40"
                : "bg-slate-900/50 text-zinc-600 hover:text-zinc-400 border border-slate-800/60"
            }`}
          >
            {label}
          </button>
        ))}
        <span className="ml-auto self-center font-mono text-[11px] text-zinc-600">
          {filtered.length} items
        </span>
      </div>

      {/* Grid */}
      {shown.length === 0 ? (
        <p className="py-20 text-center text-sm text-zinc-600">
          {whiteBuildOnly ? "No white components found. Try disabling the White Build filter." : "No components found."}
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((part) => (
            <EcommerceCard key={part.id} part={part} />
          ))}
        </div>
      )}

      {/* Load more */}
      {visible < filtered.length && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => setVisible((n) => n + PAGE_SIZE)}
            className="rounded-xl border border-emerald-900/60 bg-slate-900/70 px-8 py-3 text-sm font-semibold text-emerald-400 transition-all hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]"
          >
            Load more ({filtered.length - visible} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
