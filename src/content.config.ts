import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  // Each project is a Markdown file under src/content/projects/<lang>/<slug>.md
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      lang: z.enum(["es", "en"]),
      title: z.string(),
      description: z.string(),
      stack: z.array(z.string()).default([]),
      repoUrl: z.string().url().optional(),
      liveUrl: z.string().url().optional(),
      /** Path relative to the .md file; Astro validates and optimizes it. */
      cover: image().optional(),
      featured: z.boolean().default(false),
      /** Include on the CV page. The CV is a curated one-pager, not a mirror
       *  of the collection — set false to keep a project site-only. */
      cv: z.boolean().default(true),
      order: z.number().default(0),
      date: z.coerce.date(),
    }),
});

export const collections = { projects };
