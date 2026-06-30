import { ui, defaultLang, type Lang, type UIKey } from "./ui";

/** Extract the language code from a URL pathname (e.g. /en/projects -> "en"). */
export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

/** Returns a translation function bound to the given language, with fallback. */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** The other supported language (used by the language switcher). */
export function getAlternateLang(lang: Lang): Lang {
  return lang === "es" ? "en" : "es";
}

/**
 * Swap the language segment of a pathname, preserving the rest of the route.
 * /es/projects/foo -> /en/projects/foo
 */
export function switchLangPath(url: URL, target: Lang): string {
  const segments = url.pathname.split("/");
  // segments[0] is "" (leading slash), segments[1] is the current lang.
  segments[1] = target;
  const path = segments.join("/") || "/";
  return path;
}
