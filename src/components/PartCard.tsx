"use client";

import type { CatalogPart } from "@/lib/types";
import { useBuild } from "@/context/BuildContext";
import { formatPrice } from "@/lib/region";
import { getRegionalRetailerLinks } from "@/lib/affiliates";
import { WalterPsuHint } from "./WalterPsuHint";
import { BrandLogo } from "./BrandLogo";

function tierBadgeClass(tier: CatalogPart["tier"]) {
  switch (tier) {
    case "Extreme":
      return "border-chemical/40 bg-chemical/10 text-chemical";
    case "High-End":
      return "border-violet-500/35 bg-violet-950/40 text-violet-200";
    default:
      return "border-zinc-700/80 bg-zinc-900/80 text-zinc-400";
  }
}

function tierBadgeKey(tier: CatalogPart["tier"]): string {
  switch (tier) {
    case "Extreme":
      return "badges.tierExtreme";
    case "High-End":
      return "badges.tierHighEnd";
    default:
      return "badges.tierMidRange";
  }
}

function TierBadge({ tier, t }: { tier: CatalogPart["tier"]; t: (k: string) => string }) {
  return (
    <span
      className={`rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider border ${tierBadgeClass(
        tier
      )}`}
    >
      {t(tierBadgeKey(tier))}
    </span>
  );
}

export function PartCard({ part, compact }: { part: CatalogPart; compact?: boolean }) {
  const { region, selection, selectPart, issues, whiteBuildOnly, t } = useBuild();
  const selected = selection[part.category]?.id === part.id;
  const retailers = getRegionalRetailerLinks(region, part.retailerQuery);

  const socketClash =
    part.category === "motherboard" &&
    selection.cpu &&
    (selection.cpu as { socket: string }).socket !== (part as { socket: string }).socket;
  const socketClashCpu =
    part.category === "cpu" &&
    selection.motherboard &&
    (selection.motherboard as { socket: string }).socket !== (part as { socket: string }).socket;

  const gpuTooLong =
    part.category === "case" &&
    selection.gpu &&
    (selection.gpu as { lengthMm: number }).lengthMm > (part as { gpuClearanceMm: number }).gpuClearanceMm;
  const gpuWontFitCase =
    part.category === "gpu" &&
    selection.case &&
    (part as { lengthMm: number }).lengthMm > (selection.case as { gpuClearanceMm: number }).gpuClearanceMm;

  const highlightIssue = socketClash || socketClashCpu || gpuTooLong || gpuWontFitCase;
  const hasBlockingIssue = issues.some((i) => i.severity === "error");

  const dimNonWhite = whiteBuildOnly && !part.isWhite;

  const imgWrap = compact ? "h-14 w-full sm:h-14 sm:w-[5.25rem]" : "h-24 w-full sm:h-28 sm:w-40";

  const card = (
    <article
      className={`group relative flex flex-col rounded-xl border transition-all duration-300 ${
        compact ? "p-2" : "p-4"
      } ${
        selected
          ? "border-chemical/55 bg-chemical-muted shadow-chemical ring-2 ring-chemical/40"
          : "border-lab-border bg-lab-glass/90 shadow-glow backdrop-blur-xl hover:border-chemical/20"
      } ${highlightIssue ? "ring-1 ring-lab-danger/50" : ""} ${
        part.isWhite
          ? "ring-1 ring-white/[0.12] shadow-[0_0_28px_rgba(255,255,255,0.06)]"
          : ""
      } ${dimNonWhite ? "opacity-45 saturate-[0.35]" : ""}`}
    >
      {part.isWhite && (
        <span
          className="absolute right-1.5 top-1.5 z-[1] flex h-6 w-6 items-center justify-center rounded-md border border-white/25 bg-white/[0.07] text-[13px] leading-none text-zinc-100"
          title={t("badges.white")}
          aria-label={t("badges.white")}
          role="img"
        >
          ❄
        </span>
      )}
      <div className={`flex gap-2 ${compact ? "flex-row" : "flex-col sm:flex-row"}`}>
        <div
          className={`relative shrink-0 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 ${imgWrap}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={part.image}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="flex min-w-0 flex-1 gap-1.5">
          <BrandLogo brand={part.brand} compact={compact} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <p className="text-[10px] font-medium uppercase tracking-wide text-zinc-500">{part.brand}</p>
              <TierBadge tier={part.tier} t={t} />
            </div>
            <h3
              className={`mt-0.5 font-display font-semibold leading-snug text-zinc-100 ${
                compact ? "text-xs sm:text-[13px]" : "text-sm sm:text-base"
              }`}
            >
              {part.name}
            </h3>
          </div>
        </div>
      </div>
      <p className="mt-1.5 font-mono text-[10px] leading-relaxed text-zinc-500">{part.specsSummary}</p>
      <p
        className={`mt-1.5 font-mono font-bold tabular-nums tracking-tight text-lab-amber-glow ${
          compact ? "text-sm" : "text-base sm:text-lg"
        }`}
      >
        {formatPrice(part.priceUsd, region)}
      </p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => selectPart(part)}
          className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
            selected
              ? "bg-chemical/25 text-chemical ring-1 ring-chemical/50"
              : "bg-zinc-900/90 text-zinc-300 hover:bg-chemical/10 hover:text-chemical"
          }`}
        >
          {selected ? t("buttons.selected") : t("buttons.addToBuild")}
        </button>
      </div>
      <div className="mt-1.5 flex flex-wrap gap-1">
        {retailers.map((r) => (
          <a
            key={r.label}
            href={r.href}
            target="_blank"
            rel="noopener noreferrer"
            title={`${t("buttons.buyNow")} — ${r.label}`}
            className="rounded border border-zinc-800/90 bg-zinc-950/80 px-1.5 py-1 text-[10px] font-medium text-zinc-400 transition-colors hover:border-chemical/35 hover:text-chemical"
          >
            {r.label}
          </a>
        ))}
      </div>
      {highlightIssue && (
        <p className="mt-1.5 text-[10px] text-lab-danger">
          {socketClash || socketClashCpu ? t("compat.socketCardHint") : t("compat.gpuCardHint")}
        </p>
      )}
      {hasBlockingIssue && selected && (
        <p className="mt-1 text-[10px] text-zinc-600">{t("compat.resolveHint")}</p>
      )}
    </article>
  );

  if (part.category === "psu") {
    return <WalterPsuHint psu={part}>{card}</WalterPsuHint>;
  }

  return card;
}
