"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { REGIONS } from "@/lib/region";
import type { RegionCode } from "@/lib/types";
import { useBuild } from "@/context/BuildContext";

export function RegionToggle({
  className = "",
  labelClassName = "",
}: {
  className?: string;
  /** e.g. sr-only to tuck label away in header corner */
  labelClassName?: string;
}) {
  const { region, setRegion, t } = useBuild();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <div className={`flex flex-wrap items-center justify-end gap-2 ${className}`}>
      <span
        className={`text-xs font-medium uppercase tracking-widest text-zinc-500 ${labelClassName}`}
        id="region-label"
      >
        {t("region.label")}
      </span>
      <div ref={rootRef} className="relative">
        <button
          type="button"
          id="region-menu-button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby="region-label region-menu-button"
          aria-controls="region-menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-800/90 bg-zinc-950/80 shadow-[0_0_20px_rgba(16,185,129,0.12)] backdrop-blur-md transition-all hover:border-chemical/50 hover:shadow-[0_0_28px_rgba(16,185,129,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-chemical/50"
        >
          <Image
            src="/n.png"
            alt=""
            width={22}
            height={22}
            className="pointer-events-none h-[22px] w-[22px] object-contain [image-rendering:-webkit-optimize-contrast]"
            sizes="22px"
            priority
          />
        </button>

        {open ? (
          <ul
            id="region-menu"
            role="listbox"
            aria-labelledby="region-label"
            className="absolute right-0 top-full z-[100] mt-2 min-w-[180px] rounded-xl border border-zinc-800/90 bg-[#070707]/98 py-1 shadow-xl shadow-black/50 backdrop-blur-xl"
          >
            {REGIONS.map((r) => {
              const selected = region === r.code;
              return (
                <li key={r.code} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      setRegion(r.code as RegionCode);
                      close();
                    }}
                    className={`flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                      selected
                        ? "bg-chemical/20 text-chemical"
                        : "text-zinc-400 hover:bg-zinc-900/90 hover:text-zinc-200"
                    }`}
                  >
                    <span>{r.code}</span>
                    <span className="text-[10px] font-normal opacity-60">{r.currency}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
