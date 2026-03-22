"use client";

import { RegionToggle } from "@/components/RegionToggle";
import { WalterAdvice } from "@/components/WalterAdvice";
import { EcommerceGrid } from "@/components/EcommerceGrid";
import { StickyCart } from "@/components/StickyCart";
import { ProBuildButton } from "@/components/ProBuildButton";
import { useBuild } from "@/context/BuildContext";

function WhiteBuildToggle() {
  const { whiteBuildOnly, setWhiteBuildOnly, t } = useBuild();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={whiteBuildOnly}
      onClick={() => setWhiteBuildOnly(!whiteBuildOnly)}
      className={`flex items-center gap-3 rounded-xl border px-4 py-2.5 text-left transition-all backdrop-blur-md ${
        whiteBuildOnly
          ? "border-white/20 bg-white/[0.06] shadow-[0_0_20px_rgba(255,255,255,0.08)]"
          : "border-emerald-900/60 bg-slate-900/60 hover:border-emerald-500/30"
      }`}
    >
      <span
        className={`inline-flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors ${
          whiteBuildOnly ? "justify-end bg-emerald-500/40" : "justify-start bg-slate-700"
        }`}
      >
        <span className="h-5 w-5 rounded-full bg-zinc-200 shadow-md ring-1 ring-black/30" />
      </span>
      <span>
        <span className="block text-sm font-semibold text-zinc-200">{t("whiteBuild.title")}</span>
        <span className="text-xs text-zinc-500">{t("whiteBuild.hint")}</span>
      </span>
    </button>
  );
}

export default function Home() {
  const { t } = useBuild();

  return (
    <main className="relative z-[1] mx-auto max-w-[1600px] px-4 pt-8 pb-32 sm:pt-10">
      {/* Header */}
      <header className="mb-10 border-b border-emerald-900/40 pb-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400/80 sm:text-xs">
              {t("app.tagline")}
            </p>
            <h1 className="mt-3 font-display text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {t("app.titleLab")}{" "}
              <span className="bg-gradient-to-br from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(16,185,129,0.4)]">
                {t("app.titleConfigurator")}
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
              {t("app.subtitle")}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-3 pt-1">
            <RegionToggle className="flex-col items-end gap-1" labelClassName="sr-only" />
            <WhiteBuildToggle />
            <ProBuildButton />
          </div>
        </div>
      </header>

      {/* Main grid + sidebar */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">
          <EcommerceGrid />
        </div>
        <aside className="w-full shrink-0 lg:w-72 xl:w-80">
          <div className="sticky top-6 flex flex-col gap-4">
            <div className="rounded-2xl border border-emerald-900/50 bg-slate-900/60 p-5 backdrop-blur-xl">
              <h2 className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-500/80">
                {t("walter.powerTitle")}
              </h2>
              <div className="mt-3">
                <WalterAdvice />
              </div>
            </div>
          </div>
        </aside>
      </div>

      <StickyCart />
    </main>
  );
}
