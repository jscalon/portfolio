import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "../i18n/ui";

export type Project = CollectionEntry<"projects">;

/** The slug without the language prefix: "es/gestor-tareas" -> "gestor-tareas". */
export function projectSlug(entry: Project): string {
  return entry.id.replace(/^(es|en)\//, "");
}

/** All projects for a language, sorted by `order` then by date (newest first). */
export async function getProjectsByLang(lang: Lang): Promise<Project[]> {
  const all = await getCollection("projects", ({ data }) => data.lang === lang);
  return all.sort((a, b) => {
    if (a.data.order !== b.data.order) return a.data.order - b.data.order;
    return b.data.date.getTime() - a.data.date.getTime();
  });
}

/** Root-relative URL to a project's detail page. */
export function projectUrl(lang: Lang, entry: Project): string {
  return `/${lang}/projects/${projectSlug(entry)}`;
}
