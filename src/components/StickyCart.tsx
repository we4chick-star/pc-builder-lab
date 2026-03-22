"use client";

import { useState } from "react";
import { useBuild } from "@/context/BuildContext";
import { REGIONS } from "@/lib/region";
import { CheckoutModal } from "./CheckoutModal";

export function StickyCart() {
  const { totalFormatted, partCount, region, issues, clearBuild, t, totalUsd } = useBuild();
  const [showCheckout, setShowCheckout] = useState(false);
  const blocking = issues.filter((i) => i.severity === "error");
  const regionLabel = REGIONS.find((r) => r.code === region)?.label ?? region;

  const partsLabel =
    partCount === 1
      ? t("cart.parts", { count: partCount })
      : t("cart.partsPlural", { count: partCount });

  const issueLabel =
    blocking.length === 1
      ? t("cart.issues", { count: blocking.length })
      : blocking.length > 1
        ? t("cart.issuesPlural", { count: blocking.length })
        : null;

  return (
    <>
      <footer className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-emerald-500/30 bg-[#020617] shadow-[0_-8px_60px_rgba(0,0,0,0.9),0_-1px_0_rgba(16,185,129,0.15)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-5 px-4 py-5 sm:flex-row sm:items-end sm:justify-between sm:py-6">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              {t("cart.label")}
            </p>
            <p className="font-mono text-4xl font-black tabular-nums tracking-tighter text-chemical sm:text-5xl md:text-6xl [text-shadow:0_0_48px_rgba(16,185,129,0.4)]">
              {totalFormatted}
            </p>
            <p className="mt-1 font-mono text-xs text-zinc-500">
              {partsLabel} · {regionLabel} ({region})
              {region !== "EN" ? (
                <span className="ml-2 text-zinc-600">
                  · {totalUsd.toLocaleString()} USD
                </span>
              ) : null}
            </p>
            {issueLabel && <p className="mt-2 text-xs text-lab-danger">{issueLabel}</p>}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={clearBuild}
              className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-medium text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-200"
            >
              {t("buttons.clearBuild")}
            </button>
            <button
              type="button"
              disabled={partCount === 0 || blocking.length > 0}
              onClick={() => setShowCheckout(true)}
              className="relative rounded-2xl bg-gradient-to-b from-chemical to-[#059669] px-10 py-4 text-lg font-black uppercase tracking-wide text-[#030303] transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:scale-100 animate-checkoutGlow"
            >
              {t("buttons.checkout")}
            </button>
          </div>
        </div>
      </footer>

      {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
    </>
  );
}
