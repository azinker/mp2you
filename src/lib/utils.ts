import type { Locale } from "@/content/site";
import { localeMeta } from "@/lib/i18n";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: string, locale: string) {
  const bcp47 = locale in localeMeta ? localeMeta[locale as Locale].bcp47 : locale;
  return new Intl.DateTimeFormat(bcp47, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}
