import { describe, expect, it } from "vitest";
import {
  bio,
  education,
  experience,
  profile,
  skills,
  spokenLanguages,
} from "../src/data/site";

/*
 * site.ts is the single source for the site *and* the CV, in two languages, so
 * a half-translated entry ships to four places at once. TypeScript requires
 * both keys to exist; it cannot require them to be filled in.
 */

const LANGS = ["es", "en"] as const;

const expectLocalized = (value: Record<string, string>, label: string) => {
  for (const lang of LANGS) {
    expect(value[lang], `${label} has no "${lang}"`).toBeTruthy();
    expect(value[lang].trim(), `${label}.${lang} is blank`).not.toBe("");
  }
};

describe("bilingual profile data", () => {
  it("translates the bio", () => expectLocalized(bio, "bio"));

  it("translates every experience entry", () => {
    for (const item of experience) {
      expectLocalized(item.role, `experience[${item.company}].role`);
      expectLocalized(item.period, `experience[${item.company}].period`);
      expectLocalized(item.description, `experience[${item.company}].description`);
      expect(item.company.trim()).not.toBe("");
    }
  });

  it("translates every education entry, note included", () => {
    for (const item of education) {
      expectLocalized(item.title, "education.title");
      expectLocalized(item.period, "education.period");
      if (item.note) expectLocalized(item.note, "education.note");
      expect(item.institution.trim()).not.toBe("");
    }
  });

  it("translates every spoken language", () => {
    for (const item of spokenLanguages) {
      expectLocalized(item.name, "spokenLanguages.name");
      expectLocalized(item.level, "spokenLanguages.level");
    }
  });
});

describe("skills", () => {
  it("translates every group label", () => {
    for (const group of skills) expectLocalized(group.label, "skills.label");
  });

  it("has no empty group", () => {
    for (const group of skills) {
      expect(group.items.length, `${group.label.en} is empty`).toBeGreaterThan(0);
    }
  });

  // A term in two groups would show up twice on the page and twice in the
  // JSON-LD `knowsAbout`, which reads as padding.
  it("lists every technology exactly once", () => {
    const all = skills.flatMap((group) => group.items);
    expect(all).toEqual([...new Set(all)]);
  });

  it("keeps the technology names identical across locales", () => {
    // They are deliberately untranslated; only the group labels differ.
    for (const group of skills) {
      for (const item of group.items) expect(item.trim()).not.toBe("");
    }
  });
});

describe("contact details", () => {
  it("exposes absolute, valid social URLs", () => {
    for (const url of [profile.social.github, profile.social.linkedin, profile.whatsapp]) {
      expect(() => new URL(url)).not.toThrow();
      expect(url.startsWith("https://"), url).toBe(true);
    }
  });

  it("has an email that looks like one", () => {
    expect(profile.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  });

  it("keeps the WhatsApp link in sync with the displayed phone number", () => {
    const digits = profile.phone.replace(/\D/g, "");
    expect(profile.whatsapp).toContain(digits);
  });
});
