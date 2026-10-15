import type { Locale } from "@/content/site";
import { localeMeta } from "@/lib/i18n";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const TITLE_CASE_SMALL_WORDS = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "in", "of", "on", "or", "the", "to", "with"]);

/**
 * English title case for short labels (e.g. marquee chips).
 * Keeps acronyms like "HR" or "VIP", lowercases small joining words
 * except at the start, and leaves non-English locales untouched.
 */
export function titleCase(text: string, locale: string) {
  if (locale !== "en") return text;
  return text
    .split(/(\s+)/)
    .map((part, index) => {
      if (!part.trim()) return part;
      const word = part.replace(/[,.;:]+$/, "");
      const punct = part.slice(word.length);
      if (word === word.toUpperCase() && word.length > 1) return part; // acronym
      const lower = word.toLowerCase();
      if (index > 0 && TITLE_CASE_SMALL_WORDS.has(lower)) return lower + punct;
      return lower.charAt(0).toUpperCase() + lower.slice(1) + punct;
    })
    .join("");
}

export function formatDate(date: string, locale: string) {
  const bcp47 = locale in localeMeta ? localeMeta[locale as Locale].bcp47 : locale;
  return new Intl.DateTimeFormat(bcp47, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}
