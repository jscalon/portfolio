import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { projectSlug, projectUrl, type Project } from "../src/utils/projects";

/*
 * These cover what the zod schema cannot: the schema validates one file at a
 * time, so it never notices that a project exists in Spanish and not in
 * English, or that a file sits in the wrong folder. Both break the language
 * switcher on the detail page, and both pass `astro check`.
 */

const ROOT = path.join("src", "content", "projects");
const LANGS = ["es", "en"] as const;

const slugsIn = (lang: string) =>
  fs
    .readdirSync(path.join(ROOT, lang))
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""))
    .sort();

/** `lang:` as declared in the file's own frontmatter. */
const declaredLang = (lang: string, slug: string) => {
  const source = fs.readFileSync(path.join(ROOT, lang, `${slug}.md`), "utf8");
  return source.match(/^lang:\s*(\S+)/m)?.[1];
};

describe("project files", () => {
  it("has at least one project per language", () => {
    for (const lang of LANGS) expect(slugsIn(lang).length).toBeGreaterThan(0);
  });

  it("uses the same slugs in both languages", () => {
    expect(slugsIn("en")).toEqual(slugsIn("es"));
  });

  it.each(LANGS)("declares lang: %s on every file in that folder", (lang) => {
    for (const slug of slugsIn(lang)) {
      expect(declaredLang(lang, slug), `${lang}/${slug}.md`).toBe(lang);
    }
  });

  it("keeps cover paths pointing at a file that exists", () => {
    for (const lang of LANGS) {
      for (const slug of slugsIn(lang)) {
        const source = fs.readFileSync(path.join(ROOT, lang, `${slug}.md`), "utf8");
        const cover = source.match(/^cover:\s*(\S+)/m)?.[1];
        if (!cover) continue;
        const resolved = path.resolve(ROOT, lang, cover);
        expect(fs.existsSync(resolved), `${lang}/${slug}.md -> ${cover}`).toBe(true);
      }
    }
  });
});

describe("project URLs", () => {
  const entry = (id: string) => ({ id }) as Project;

  it("strips the language prefix off the collection id", () => {
    expect(projectSlug(entry("es/servifrescos"))).toBe("servifrescos");
    expect(projectSlug(entry("en/portfolio"))).toBe("portfolio");
  });

  it("only strips the prefix, never a match inside the slug", () => {
    expect(projectSlug(entry("es/es-informe"))).toBe("es-informe");
  });

  it("builds a locale-prefixed detail path", () => {
    expect(projectUrl("en", entry("es/servifrescos"))).toBe("/en/projects/servifrescos");
  });
});
