import type { Locale } from "@/content/site";

export const defaultLocale: Locale = "en";

export const localeMeta: Record<
  Locale,
  { label: string; nativeLabel: string; htmlLang: string; ogLocale: string; bcp47: string; dir: "ltr" | "rtl"; prefix: string }
> = {
  en: { label: "English", nativeLabel: "English", htmlLang: "en", ogLocale: "en_US", bcp47: "en-US", dir: "ltr", prefix: "" },
  es: { label: "Spanish", nativeLabel: "Español", htmlLang: "es", ogLocale: "es_ES", bcp47: "es-ES", dir: "ltr", prefix: "/es" },
  fr: { label: "French", nativeLabel: "Français", htmlLang: "fr", ogLocale: "fr_FR", bcp47: "fr-FR", dir: "ltr", prefix: "/fr" },
  de: { label: "German", nativeLabel: "Deutsch", htmlLang: "de", ogLocale: "de_DE", bcp47: "de-DE", dir: "ltr", prefix: "/de" },
  pt: { label: "Portuguese", nativeLabel: "Português", htmlLang: "pt", ogLocale: "pt_BR", bcp47: "pt-BR", dir: "ltr", prefix: "/pt" },
  zh: { label: "Chinese", nativeLabel: "中文", htmlLang: "zh", ogLocale: "zh_CN", bcp47: "zh-CN", dir: "ltr", prefix: "/zh" },
  ar: { label: "Arabic", nativeLabel: "العربية", htmlLang: "ar", ogLocale: "ar_AE", bcp47: "ar-AE", dir: "rtl", prefix: "/ar" },
  he: { label: "Hebrew", nativeLabel: "עברית", htmlLang: "he", ogLocale: "he_IL", bcp47: "he-IL", dir: "rtl", prefix: "/he" },
};

export const prefixedLocales = (Object.keys(localeMeta) as Locale[]).filter((locale) => locale !== defaultLocale);

export function isPrefixedLocale(value: string): value is Exclude<Locale, "en"> {
  return value !== defaultLocale && value in localeMeta;
}

export function isRtl(locale: Locale) {
  return localeMeta[locale].dir === "rtl";
}

export function localeFromPathname(pathname: string): Locale {
  const first = pathname.split("/").filter(Boolean)[0];
  if (first && first in localeMeta && first !== defaultLocale) {
    return first as Locale;
  }
  return defaultLocale;
}

export function stripLocale(pathname: string) {
  const first = pathname.split("/").filter(Boolean)[0];
  if (first && first !== defaultLocale && first in localeMeta) {
    const rest = pathname.slice(first.length + 1);
    return rest || "/";
  }
  return pathname || "/";
}

export function withLocale(locale: Locale, href: string) {
  if (href.startsWith("http")) return href;
  const clean = stripLocale(href.startsWith("/") ? href : `/${href}`);
  const prefix = localeMeta[locale].prefix;
  if (!prefix) return clean;
  return clean === "/" ? prefix : `${prefix}${clean}`;
}

export function alternatePath(locale: Locale, pathname: string) {
  return withLocale(locale, stripLocale(pathname));
}

export function languageAlternates(path: string) {
  const clean = stripLocale(path);
  return Object.fromEntries(
    (Object.keys(localeMeta) as Locale[]).map((locale) => [localeMeta[locale].htmlLang, withLocale(locale, clean)]),
  ) as Record<string, string>;
}
