"use client";

import { useEffect, useState } from "react";

function ProBuildModal({ onClose }: { onClose: () => void }) {
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
      className="fixed inset-0 z-[400] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pro-build-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        aria-label="Close"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-amber-500/40 bg-[#020617]/98 shadow-[0_0_80px_rgba(234,179,8,0.25)] backdrop-blur-xl">
        {/* Gold top accent */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

        {/* Glow orb behind content */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-48 w-48 rounded-full bg-amber-500/5 blur-3xl" />
        </div>

        <div className="relative flex flex-col items-center gap-5 px-8 py-8 text-center">
          {/* Icon */}
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-3xl shadow-[0_0_24px_rgba(234,179,8,0.2)]">
            ⚡
          </div>

          {/* Title */}
          <div>
            <h2
              id="pro-build-title"
              className="font-display text-xl font-black uppercase tracking-wide text-amber-400 drop-shadow-[0_0_16px_rgba(234,179,8,0.5)]"
            >
              Pro Build Service
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              Need a custom build or expert advice?{" "}
              <span className="font-semibold text-white">DM me on Telegram</span> — I'll help you
              pick the perfect parts for your budget.
            </p>
          </div>

          {/* Telegram button */}
          <a
            href="https://t.me/yan1hick"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full flex-col items-center gap-1.5 rounded-xl bg-[#229ED9] px-4 py-3.5 text-white transition-all hover:bg-[#1a8bbf] hover:shadow-[0_0_24px_rgba(34,158,217,0.4)]"
          >
            <div className="flex items-center gap-2.5">
              {/* Telegram icon */}
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              <span className="text-sm font-black uppercase tracking-widest">@yan1hick</span>
              {/* Verified checkmark */}
              <svg className="h-4 w-4 shrink-0 text-emerald-300 drop-shadow-[0_0_6px_rgba(110,231,183,0.8)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-.497 3.842 3.745 3.745 0 0 1-3.843.497A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 0 1-3.842-.497 3.745 3.745 0 0 1-.497-3.843A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 .497-3.842 3.745 3.745 0 0 1 3.843-.497A3.745 3.745 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 0 1 3.842.497 3.745 3.745 0 0 1 .497 3.843A3.745 3.745 0 0 1 21 12z" />
              </svg>
            </div>
            {/* Active developer badge */}
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_6px_rgba(110,231,183,1)]" />
              <span className="font-mono text-[11px] font-semibold tracking-wider text-white/80">
                Active Developer
              </span>
            </div>
          </a>

          {/* Dev story */}
          <p className="text-[11px] leading-relaxed text-sky-400/80">
            Мне 11 лет, я разрабатываю этот проект чтобы помочь вам и накопить на ноутбук мечты. Никакого обмана — только код и страсть.
          </p>

          {/* Consultation note */}
          <div className="w-full rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">
            <p className="font-mono text-xs text-amber-400/90">
              💛 Consultation — from 100 UAH
            </p>
            <p className="mt-1 font-mono text-[11px] text-zinc-600">
              Support the young developer!
            </p>
          </div>

          {/* FAQ */}
          <div className="w-full space-y-2">
            {[
              {
                q: "Как оплатить?",
                a: "Прямой перевод на карту. Безопасно и быстро.",
              },
              {
                q: "Почему тебе 11 лет?",
                a: "Потому что код не имеет возраста. Я собираю лучшие ПК.",
              },
            ].map(({ q, a }) => (
              <div
                key={q}
                className="rounded-xl border border-slate-800/60 bg-slate-900/40 px-4 py-3 text-left"
              >
                <p className="text-[11px] font-bold text-zinc-300">{q}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-zinc-500">{a}</p>
              </div>
            ))}
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-zinc-600 transition-colors hover:text-zinc-400"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProBuildButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="animate-goldPulse flex items-center gap-2.5 rounded-2xl border border-amber-500/50 bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-amber-500/20 px-5 py-3 text-sm font-black uppercase tracking-widest text-amber-400 transition-all hover:border-amber-400/70 hover:text-amber-300"
      >
        <span className="text-base">⚡</span>
        Pro Build Service
      </button>

      {open && <ProBuildModal onClose={() => setOpen(false)} />}
    </>
  );
}
