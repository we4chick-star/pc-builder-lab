import type { LocaleCode } from "@/lib/types";
import type { MessageDict } from "./en";
import { en } from "./en";
import { uk } from "./uk";
import { ru } from "./ru";
import { kk } from "./kk";

const dicts: Record<LocaleCode, MessageDict> = {
  en,
  uk,
  ru,
  kk,
};

function getString(dict: MessageDict, path: string): string | undefined {
  const parts = path.split(".");
  let cur: unknown = dict;
  for (const p of parts) {
    cur = (cur as Record<string, unknown>)?.[p];
  }
  return typeof cur === "string" ? cur : undefined;
}

export function translate(
  locale: LocaleCode,
  key: string,
  vars?: Record<string, string | number>
): string {
  let s = getString(dicts[locale], key);
  if (s === undefined && locale !== "en") {
    s = getString(dicts.en, key);
  }
  if (s === undefined) return key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.replaceAll(`{{${k}}}`, String(v));
    }
  }
  return s;
}

export type { MessageDict };
