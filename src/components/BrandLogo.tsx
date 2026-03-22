"use client";

function initials(brand: string): string {
  const cleaned = brand.replace(/[^a-zA-Z0-9\s.]/g, " ").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const a = parts[0][0] ?? "";
    const b = parts[1][0] ?? "";
    return (a + b).toUpperCase();
  }
  if (cleaned.length >= 2) return cleaned.slice(0, 2).toUpperCase();
  return brand.slice(0, 2).toUpperCase() || "—";
}

export function BrandLogo({ brand, compact }: { brand: string; compact?: boolean }) {
  const monogram = initials(brand);
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-lg border border-zinc-800/90 bg-zinc-950/90 font-mono font-bold tracking-tight text-chemical shadow-inner ring-1 ring-white/[0.04] ${
        compact ? "h-8 w-8 text-[10px]" : "h-11 w-11 text-xs rounded-xl"
      }`}
      aria-hidden
      title={brand}
    >
      {monogram}
    </div>
  );
}
