"use client";

import { useState, type ReactNode } from "react";
import type { PsuPart } from "@/lib/types";
import { useBuild } from "@/context/BuildContext";

export function WalterPsuHint({ psu, children }: { psu: PsuPart; children: ReactNode }) {
  const { selection, t } = useBuild();
  const gpu = selection.gpu;
  const [open, setOpen] = useState(false);

  if (!gpu || gpu.category !== "gpu") {
    return <>{children}</>;
  }

  const weak = psu.wattage < gpu.recommendedPsuWatts;

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open && weak && (
        <div
          role="tooltip"
          className="absolute bottom-full left-1/2 z-40 mb-2 w-[min(280px,calc(100vw-2rem))] -translate-x-1/2 rounded-xl border border-lab-amber/45 bg-[#070707]/98 p-3 text-xs text-zinc-300 shadow-glow-amber backdrop-blur-md"
        >
          <p className="font-semibold text-lab-amber-glow">{t("walter.title")}</p>
          <p className="mt-1 leading-relaxed">
            {t("walter.tooltipWeak", {
              gpuName: gpu.name,
              gpuW: gpu.recommendedPsuWatts,
              psuW: psu.wattage,
            })}
          </p>
        </div>
      )}
    </div>
  );
}
