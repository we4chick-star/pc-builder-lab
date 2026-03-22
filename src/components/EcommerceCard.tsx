"use client";

import type { CatalogPart } from "@/lib/types";
import { useBuild } from "@/context/BuildContext";
import { formatPrice } from "@/lib/region";
import { getRegionalRetailerLinks } from "@/lib/affiliates";

/** Best-value picks that get a 'Recommended' badge */
const RECOMMENDED_IDS = new Set([
  "peri-vgn-dragonfly",
  "cpu-amd-ryzen-7-7800x3d",
  "ssd-990pro-2tb",
  "psu-bq-dark-850",
  "cooling-arctic-lf3",
  "mb-msi-mag-z790-tomahawk",
  "mb-msi-mag-b650-tomahawk",
]);

const TIER_STYLES: Record<CatalogPart["tier"], { badge: string; glow: string; hover: string }> = {
  Extreme: {
    badge: "border-emerald-500/50 bg-emerald-500/10 text-emerald-400",
    glow: "shadow-[0_0_28px_rgba(16,185,129,0.18)]",
    hover: "hover:shadow-[0_0_52px_rgba(16,185,129,0.4)] hover:border-emerald-500/55",
  },
  "High-End": {
    badge: "border-violet-500/40 bg-violet-900/20 text-violet-300",
    glow: "shadow-[0_0_20px_rgba(139,92,246,0.12)]",
    hover: "hover:shadow-[0_0_44px_rgba(139,92,246,0.32)] hover:border-violet-500/45",
  },
  "Mid-Range": {
    badge: "border-slate-600/60 bg-slate-800/40 text-zinc-400",
    glow: "",
    hover: "hover:shadow-[0_0_32px_rgba(16,185,129,0.12)] hover:border-emerald-900/60",
  },
};

/** Branded placeholder shown when no real product image exists */
function ImagePlaceholder({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-950 via-slate-900/80 to-slate-950">
      <span className="font-mono text-3xl font-black text-emerald-500/25">{initials}</span>
      <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-700">
        Coming Soon
      </span>
    </div>
  );
}

const PLACEHOLDER_PATH = "/placeholders/part.svg";

export function EcommerceCard({ part }: { part: CatalogPart }) {
  const { region, selection, selectPart, t } = useBuild();
  const selected = selection[part.category]?.id === part.id;
  const retailers = getRegionalRetailerLinks(region, part.retailerQuery);
  const tier = TIER_STYLES[part.tier];
  const primaryRetailer = retailers[0];
  const isPlaceholder = !part.image || part.image === PLACEHOLDER_PATH;
  const isRecommended = RECOMMENDED_IDS.has(part.id);

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-300 hover:scale-[1.05] hover:-translate-y-0.5 ${
        selected
          ? "border-emerald-500/60 bg-slate-900/80 shadow-[0_0_44px_rgba(16,185,129,0.32)] ring-1 ring-emerald-500/40 scale-[1.01]"
          : `border-emerald-900/40 bg-slate-950/60 hover:bg-slate-900/70 ${tier.glow} ${tier.hover}`
      } ${part.isWhite ? "ring-1 ring-white/10" : ""}`}
    >
      {/* Top accent line */}
      <div
        className={`h-[2px] w-full ${
          part.tier === "Extreme"
            ? "bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
            : part.tier === "High-End"
              ? "bg-gradient-to-r from-transparent via-violet-500 to-transparent"
              : "bg-gradient-to-r from-transparent via-slate-600 to-transparent"
        }`}
      />

      {/* Image */}
      <div className="relative h-40 w-full overflow-hidden bg-slate-950/80">
        {isPlaceholder ? (
          <ImagePlaceholder name={part.name} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={part.image}
            alt={part.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />
        )}

        {/* Overlay badges */}
        <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5">
          <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tier.badge}`}>
            {part.tier}
          </span>
          {isRecommended && (
            <span className="rounded-md border border-amber-500/50 bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400">
              ★ Best Value
            </span>
          )}
          {part.isWhite && (
            <span className="rounded-md border border-white/25 bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
              ❄ White
            </span>
          )}
        </div>

        {selected && (
          <div className="absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 shadow-[0_0_14px_rgba(16,185,129,0.9)]">
            <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Brand + category */}
        <div className="flex items-center gap-2">
          <span className="rounded-md border border-slate-700/80 bg-slate-800/60 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-zinc-300">
            {part.brand}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600">
            {part.category}
          </span>
        </div>

        {/* Name */}
        <h3 className="font-display text-sm font-bold leading-snug text-zinc-100 sm:text-[15px]">
          {part.name}
        </h3>

        {/* Specs */}
        <p className="font-mono text-[11px] leading-relaxed text-zinc-500">
          {part.specsSummary}
        </p>

        {/* Price — neon green */}
        <p className="font-mono text-2xl font-black tabular-nums tracking-tight text-emerald-400 drop-shadow-[0_0_14px_rgba(16,185,129,0.65)]">
          {formatPrice(part.priceUsd, region)}
        </p>

        {/* Actions */}
        <div className="mt-auto flex flex-col gap-2">
          <a
            href={primaryRetailer.href}
            target="_blank"
            rel="noopener noreferrer"
            className="animate-orderPulse w-full rounded-xl bg-emerald-500 py-3 text-center text-sm font-black uppercase tracking-widest text-slate-950 transition-all hover:bg-emerald-400"
          >
            Order — {primaryRetailer.label}
          </a>

          <button
            type="button"
            onClick={() => selectPart(part)}
            className={`w-full rounded-xl border py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
              selected
                ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-400"
                : "border-slate-700/80 bg-slate-900/60 text-zinc-400 hover:border-emerald-500/30 hover:text-emerald-400"
            }`}
          >
            {selected ? "✓ In Build" : t("buttons.addToBuild")}
          </button>

          <div className="flex gap-1.5">
            {retailers.slice(1).map((r) => (
              <a
                key={r.label}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-lg border border-slate-800/80 bg-slate-900/50 py-1.5 text-center text-[10px] font-medium text-zinc-500 transition-colors hover:border-emerald-900/60 hover:text-zinc-300"
              >
                {r.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
