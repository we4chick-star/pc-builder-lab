"use client";

import { useBuild } from "@/context/BuildContext";

export function WalterAdvice() {
  const { psuAdvice, selection, t } = useBuild();
  const hasPsuGpu = selection.gpu && selection.psu;

  if (!hasPsuGpu) {
    return <p className="text-xs text-zinc-600">{t("walter.pickBoth")}</p>;
  }

  if (!psuAdvice) return null;

  return (
    <div
      className={`relative rounded-xl border p-4 backdrop-blur-md ${
        psuAdvice.ok
          ? "border-chemical/25 bg-chemical-muted shadow-glow"
          : "border-lab-amber/40 bg-zinc-950/60 shadow-glow-amber"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-950 font-mono text-lg text-chemical ring-1 ring-chemical/25"
          aria-hidden
        >
          W
        </span>
        <div>
          <p className="font-display text-sm font-semibold text-chemical">{t("walter.title")}</p>
          <p className="mt-1 text-sm leading-relaxed text-zinc-400">
            {psuAdvice.ok
              ? t("walter.ok")
              : t("walter.warn", { gpuW: psuAdvice.gpuWatts, psuW: psuAdvice.psuWatts })}
          </p>
          <p className="mt-2 font-mono text-xs text-zinc-600">
            {t("walter.target", { gpuW: psuAdvice.gpuWatts, psuW: psuAdvice.psuWatts })}
          </p>
        </div>
      </div>
    </div>
  );
}
