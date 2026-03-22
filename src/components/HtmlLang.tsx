"use client";

import { useEffect } from "react";
import { useBuild } from "@/context/BuildContext";

export function HtmlLang() {
  const { locale } = useBuild();

  useEffect(() => {
    document.documentElement.lang = locale === "uk" ? "uk" : locale;
  }, [locale]);

  return null;
}
