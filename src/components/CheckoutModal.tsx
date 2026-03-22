"use client";

import { useEffect, useState, useCallback } from "react";
import { useBuild } from "@/context/BuildContext";
import { formatPrice } from "@/lib/region";
import { getRegionalRetailerLinks } from "@/lib/affiliates";
import type { CatalogPart } from "@/lib/types";

const CATEGORY_LABELS: Record<string, string> = {
  cpu: "CPU", gpu: "GPU", motherboard: "Motherboard", ram: "RAM",
  storage: "Storage", psu: "PSU", case: "Case", cooling: "Cooling", peripheral: "Peripheral",
};

function buildShareUrl(parts: CatalogPart[]): string {
  if (typeof window === "undefined") return "";
  const ids = parts.map((p) => p.id).join(",");
  const url = new URL(window.location.href);
  url.searchParams.set("build", ids);
  return url.toString();
}

function BuyAllButton({ parts, region }: { parts: CatalogPart[]; region: string }) {
  // Build a combined search query from all part names
  const query = parts.map((p) => p.retailerQuery).join(" + ");
  const enc = encodeURIComponent(query.slice(0, 200));

  const links: Record<string, { label: string; href: string; color: string }> = {
    KZ: { label: "Buy all on Kaspi", href: `https://kaspi.kz/shop/search/?q=${enc}`, color: "bg-[#f14635] hover:bg-[#d93d2d]" },
    UA: { label: "Buy all on Rozetka", href: `https://rozetka.com.ua/search/?text=${enc}`, color: "bg-[#00a046] hover:bg-[#008a3c]" },
    RU: { label: "Buy all on DNS", href: `https://www.dns-shop.ru/search/?q=${enc}`, color: "bg-[#f90] hover:bg-[#e08800] text-slate-950" },
    EN: { label: "Buy all on Amazon", href: `https://www.amazon.com/s?k=${enc}`, color: "bg-[#ff9900] hover:bg-[#e08800] text-slate-950" },
  };

  const link = links[region] ?? links.EN;

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-black uppercase tracking-wider text-white transition-all ${link.color}`}
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {link.label}
    </a>
  );
}

export function CheckoutModal({ onClose }: { onClose: () => void }) {
  const { selection, region, totalFormatted, totalUsd, t } = useBuild();
  const [copied, setCopied] = useState(false);

  const parts = Object.values(selection) as CatalogPart[];

  const handleCopy = useCallback(async () => {
    const url = buildShareUrl(parts);
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try { document.execCommand("copy"); } catch { /* silent */ }
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, [parts]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        aria-label="Close"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative flex w-full max-w-lg flex-col rounded-2xl border border-emerald-900/60 bg-[#020617]/98 shadow-[0_0_100px_rgba(16,185,129,0.2)] backdrop-blur-xl">
        {/* Top accent */}
        <div className="h-[2px] w-full rounded-t-2xl bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h2 id="checkout-modal-title" className="font-display text-xl font-black uppercase tracking-wide text-zinc-100">
              Build Summary
            </h2>
            <p className="mt-0.5 font-mono text-[11px] text-zinc-600">
              {parts.length} components · {region !== "EN" && <span className="text-zinc-700">{totalUsd.toLocaleString()} USD · </span>}
              <span className="text-emerald-500/70">{region}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-800 px-3 py-1.5 text-xs font-medium text-zinc-500 transition-colors hover:border-slate-600 hover:text-zinc-300"
          >
            ✕ Close
          </button>
        </div>

        {/* Parts list */}
        <div className="max-h-[45vh] overflow-y-auto border-y border-slate-800/60 px-6 py-3">
          {parts.length === 0 ? (
            <p className="py-10 text-center text-sm text-zinc-600">No parts selected yet.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {parts.map((part) => {
                const retailers = getRegionalRetailerLinks(region as never, part.retailerQuery);
                return (
                  <li
                    key={part.id}
                    className="flex items-center gap-3 rounded-xl border border-slate-800/50 bg-slate-900/40 px-4 py-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-emerald-500/60">
                        {CATEGORY_LABELS[part.category] ?? part.category}
                      </p>
                      <p className="mt-0.5 truncate text-sm font-semibold text-zinc-200">{part.name}</p>
                      <p className="mt-0.5 font-mono text-[10px] text-zinc-600">{part.specsSummary}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1.5">
                      <p className="font-mono text-sm font-bold text-emerald-400">
                        {formatPrice(part.priceUsd, region as never)}
                      </p>
                      <a
                        href={retailers[0].href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded border border-slate-700/60 px-2 py-0.5 text-[10px] text-zinc-500 transition-colors hover:border-emerald-900/60 hover:text-zinc-300"
                      >
                        {retailers[0].label} →
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4">
          {/* Total */}
          <div className="mb-4 flex items-baseline justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-600">Total</span>
            <span className="font-mono text-3xl font-black text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.55)]">
              {totalFormatted}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              {/* Copy link */}
              <button
                type="button"
                onClick={handleCopy}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition-all ${
                  copied
                    ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-400"
                    : "border-slate-700 bg-slate-900/60 text-zinc-300 hover:border-slate-600 hover:text-zinc-100"
                }`}
              >
                {copied ? (
                  <><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Copied!</>
                ) : (
                  <><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Copy Config Link</>
                )}
              </button>
            </div>

            {/* Buy all — region-specific */}
            {parts.length > 0 && <BuyAllButton parts={parts} region={region} />}
          </div>
        </div>
      </div>
    </div>
  );
}
