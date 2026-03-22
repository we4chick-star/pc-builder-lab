import type { RegionCode } from "./types";

export const REGIONS: { code: RegionCode; label: string; currency: string; locale: string; rateFromUsd: number }[] = [
  { code: "UA", label: "Ukraine", currency: "UAH", locale: "uk-UA", rateFromUsd: 40 },
  { code: "KZ", label: "Kazakhstan", currency: "KZT", locale: "kk-KZ", rateFromUsd: 450 },
  { code: "RU", label: "Russia", currency: "RUB", locale: "ru-RU", rateFromUsd: 95 },
  { code: "EN", label: "International", currency: "USD", locale: "en-US", rateFromUsd: 1 },
];

export function formatPrice(amount: number, region: RegionCode): string {
  const row = REGIONS.find((r) => r.code === region)!;
  const value = region === "EN" ? amount : Math.round(amount * row.rateFromUsd);
  try {
    return new Intl.NumberFormat(row.locale, {
      style: "currency",
      currency: row.currency,
      maximumFractionDigits: region === "EN" ? 0 : 0,
    }).format(value);
  } catch {
    return `${row.currency} ${value.toLocaleString()}`;
  }
}

export function usdToRegional(amountUsd: number, region: RegionCode): number {
  const row = REGIONS.find((r) => r.code === region)!;
  return region === "EN" ? amountUsd : Math.round(amountUsd * row.rateFromUsd);
}
