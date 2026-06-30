import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  // Each project is a Markdown file under src/content/projects/<lang>/<slug>.md
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    lang: z.enum(["es", "en"]),
    title: z.string(),
    description: z.string(),
    stack: z.array(z.string()).default([]),
    repoUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    cover: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    date: z.coerce.date(),
  }),
});

export const collections = { projects };
