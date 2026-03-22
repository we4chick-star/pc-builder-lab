"use client";

import { useState } from "react";
import type { PartCategory } from "@/lib/types";
import { useBuild } from "@/context/BuildContext";
import { formatPrice } from "@/lib/region";
import { getFeaturedPart } from "@/data/godTier";
import { CategoryModal } from "./CategoryModal";

const BLOCKS: { category: PartCategory; key: `categories.${string}` }[] = [
  { category: "cpu", key: "categories.cpu" },
  { category: "gpu", key: "categories.gpu" },
  { category: "motherboard", key: "categories.motherboard" },
  { category: "ram", key: "categories.ram" },
  { category: "storage", key: "categories.storage" },
  { category: "psu", key: "categories.psu" },
  { category: "case", key: "categories.case" },
  { category: "cooling", key: "categories.cooling" },
  { category: "peripheral", key: "categories.peripheral" },
];

export function CategoryGrid() {
  const { t, selection, region } = useBuild();
  const [open, setOpen] = useState<PartCategory | null>(null);

  return (
    <>
      <div className="flex w-full max-w-3xl flex-col gap-3">
        {BLOCKS.map(({ category, key }) => {
          const picked = selection[category];
          const featured = getFeaturedPart(category);
          const display = picked ?? featured;
          const isSpotlight = !picked && !!featured;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setOpen(category)}
              className="group relative w-full overflow-hidden rounded-2xl border border-zinc-800/90 bg-gradient-to-br from-zinc-950/90 via-zinc-950/70 to-zinc-900/40 p-4 text-left shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-chemical/45 hover:shadow-[0_0_36px_rgba(16,185,129,0.28),0_0_80px_rgba(16,185,129,0.12)] sm:flex sm:items-stretch sm:gap-4 sm:p-5"
            >
              <div className="relative mb-3 h-24 w-full shrink-0 overflow-hidden rounded-xl border border-zinc-800/80 bg-black/40 sm:mb-0 sm:h-28 sm:w-40">
                {display ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={display.image}
                    alt=""
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-zinc-600">
                    {t("buttons.pickParts")}
                  </div>
                )}
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-chemical/90">
                    [{t(key)}]
                  </span>
                  {isSpotlight ? (
                    <span className="rounded-md border border-chemical/30 bg-chemical/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-chemical">
                      {t("ui.featured")}
                    </span>
                  ) : null}
                </div>
                {display ? (
                  <>
                    <p className="mt-2 line-clamp-2 font-display text-sm font-semibold leading-snug text-zinc-100 sm:text-base">
                      {display.name}
                    </p>
                    <p className="mt-2 font-mono text-lg font-bold tabular-nums tracking-tight text-lab-amber-glow sm:text-xl">
                      {formatPrice(display.priceUsd, region)}
                    </p>
                  </>
                ) : (
                  <p className="mt-2 text-sm text-zinc-500">{t("buttons.pickParts")}</p>
                )}
              </div>
            </button>
          );
        })}
      </div>
      <CategoryModal category={open} onClose={() => setOpen(null)} />
    </>
  );
}
