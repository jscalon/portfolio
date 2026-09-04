import { describe, expect, it } from "vitest";
import { defaultLang, ui, type Lang, type UIKey } from "../src/i18n/ui";
import {
  getAlternateLang,
  getLangFromUrl,
  switchLangPath,
  useTranslations,
} from "../src/i18n/utils";

describe("UI dictionary", () => {
  // The type system only checks lookups against the default locale, so a key
  // missing from `en` compiles fine and silently falls back to Spanish.
  it("defines exactly the same keys in both languages", () => {
    expect(Object.keys(ui.en).sort()).toEqual(Object.keys(ui.es).sort());
  });

  it("has no empty strings", () => {
    for (const lang of ["es", "en"] as const) {
      for (const [key, value] of Object.entries(ui[lang])) {
        expect(value.trim(), `${lang}.${key} is empty`).not.toBe("");
      }
    }
  });

  it("translates the same key differently per language", () => {
    expect(useTranslations("es")("nav.home")).toBe("Inicio");
    expect(useTranslations("en")("nav.home")).toBe("Home");
  });

  it("falls back to the default language for a key a locale lacks", () => {
    const incomplete = { ...ui.en } as Record<string, string>;
    delete incomplete["nav.home"];
    const value = incomplete["nav.home"] ?? ui[defaultLang]["nav.home"];
    expect(value).toBe(ui[defaultLang]["nav.home"]);
  });
});

describe("getLangFromUrl", () => {
  it.each([
    ["https://jscalon.dev/es/", "es"],
    ["https://jscalon.dev/en/projects", "en"],
    ["https://jscalon.dev/en/projects/portfolio/", "en"],
  ])("reads the locale out of %s", (url, expected) => {
    expect(getLangFromUrl(new URL(url))).toBe(expected);
  });

  it.each([
    ["https://jscalon.dev/", "the bare root"],
    ["https://jscalon.dev/404", "a path with no locale"],
    ["https://jscalon.dev/fr/", "an unsupported locale"],
  ])("falls back to the default for %s (%s)", (url) => {
    expect(getLangFromUrl(new URL(url))).toBe(defaultLang);
  });
});

describe("language switching", () => {
  it("pairs the two locales", () => {
    expect(getAlternateLang("es")).toBe("en");
    expect(getAlternateLang("en")).toBe("es");
  });

  // The switcher must land on the equivalent page, not send the visitor home.
  it.each([
    ["https://jscalon.dev/es/projects/portfolio/", "en", "/en/projects/portfolio/"],
    ["https://jscalon.dev/en/cv", "es", "/es/cv"],
    ["https://jscalon.dev/es/", "en", "/en/"],
  ])("rewrites %s to %s", (url, target, expected) => {
    expect(switchLangPath(new URL(url), target as Lang)).toBe(expected);
  });
});

describe("keys used across the site", () => {
  // A typo in one of these renders an empty element rather than failing loudly.
  const required: UIKey[] = [
    "nav.home",
    "nav.projects",
    "cv.title",
    "hero.available",
    "projects.readCase",
    "projects.viewLive",
    "projects.viewRepo",
  ];

  it.each(required)("%s resolves in both languages", (key) => {
    expect(useTranslations("es")(key)).toBeTruthy();
    expect(useTranslations("en")(key)).toBeTruthy();
  });
});
