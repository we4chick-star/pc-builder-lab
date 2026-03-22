"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  type BuildSelection,
  type CatalogPart,
  type LocaleCode,
  type PartCategory,
  type RegionCode,
  REGION_TO_LOCALE,
} from "@/lib/types";
import { getCompatibilityIssues, getPsuAdvice } from "@/lib/compatibility";
import { formatPrice } from "@/lib/region";
import { translate } from "@/i18n";
import { buildGodTierSelection } from "@/data/godTier";

interface BuildContextValue {
  region: RegionCode;
  setRegion: (r: RegionCode) => void;
  locale: LocaleCode;
  t: (key: string, vars?: Record<string, string | number>) => string;
  whiteBuildOnly: boolean;
  setWhiteBuildOnly: (v: boolean) => void;
  selection: BuildSelection;
  selectPart: (part: CatalogPart) => void;
  clearCategory: (c: PartCategory) => void;
  clearBuild: () => void;
  issues: ReturnType<typeof getCompatibilityIssues>;
  psuAdvice: ReturnType<typeof getPsuAdvice>;
  /** Sum in USD (before regional conversion in formatPrice) */
  totalUsd: number;
  totalFormatted: string;
  partCount: number;
}

const BuildContext = createContext<BuildContextValue | null>(null);

export function BuildProvider({ children }: { children: ReactNode }) {
  const [region, setRegion] = useState<RegionCode>("UA");
  const [whiteBuildOnly, setWhiteBuildOnly] = useState(true);
  const [selection, setSelection] = useState<BuildSelection>(() => buildGodTierSelection());

  const locale = REGION_TO_LOCALE[region];

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => translate(locale, key, vars),
    [locale]
  );

  const selectPart = useCallback((part: CatalogPart) => {
    setSelection((s) => ({ ...s, [part.category]: part }));
  }, []);

  const clearCategory = useCallback((c: PartCategory) => {
    setSelection((s) => {
      const next = { ...s };
      delete next[c];
      return next;
    });
  }, []);

  const clearBuild = useCallback(() => setSelection({}), []);

  const issues = useMemo(() => getCompatibilityIssues(selection), [selection]);
  const psuAdvice = useMemo(() => getPsuAdvice(selection), [selection]);

  const totalUsd = useMemo(
    () =>
      (Object.values(selection) as CatalogPart[]).reduce((sum, p) => sum + p.priceUsd, 0),
    [selection]
  );

  const totalFormatted = useMemo(
    () => formatPrice(totalUsd, region),
    [totalUsd, region]
  );

  const partCount = useMemo(
    () => (Object.values(selection) as CatalogPart[]).filter(Boolean).length,
    [selection]
  );

  const value = useMemo(
    () => ({
      region,
      setRegion,
      locale,
      t,
      whiteBuildOnly,
      setWhiteBuildOnly,
      selection,
      selectPart,
      clearCategory,
      clearBuild,
      issues,
      psuAdvice,
      totalUsd,
      totalFormatted,
      partCount,
    }),
    [
      region,
      locale,
      t,
      whiteBuildOnly,
      selection,
      selectPart,
      clearCategory,
      clearBuild,
      issues,
      psuAdvice,
      totalUsd,
      totalFormatted,
      partCount,
    ]
  );

  return <BuildContext.Provider value={value}>{children}</BuildContext.Provider>;
}

export function useBuild() {
  const ctx = useContext(BuildContext);
  if (!ctx) throw new Error("useBuild must be used within BuildProvider");
  return ctx;
}
