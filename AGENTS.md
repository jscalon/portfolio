# AGENTS.md

Guidance for AI agents (and contributors) working on this repository.

## Project

Personal portfolio for Juan Giménez, live at <https://jscalon.dev>. A static,
bilingual (ES/EN) website presenting a CV and project case studies — a more
professional alternative to sending a PDF résumé.

## Tech stack

- **Astro 5** — static output (SSG), zero JS by default
- **TypeScript** (strict)
- **Tailwind CSS 4** (via `@tailwindcss/vite`)
- **pnpm**
- **Netlify** — automatic deploy on push to `main`

Requires Node 20+.

## Commands

- `pnpm dev` — dev server at <http://localhost:4321>
- `pnpm build` — runs `astro check` then builds to `dist/`
- `pnpm preview` — serves the production build

> **Local dev note:** the root path `/` returns 404 locally. The `/ → /es/`
> redirect is a Netlify server-side rule and only applies in production. In dev,
> open `/es/` or `/en/` directly.

Always run `pnpm build` before pushing — `astro check` validates content
frontmatter and types, catching format errors before they reach the deploy.

## Project structure

- `src/data/site.ts` — profile, bio, experience, education, skills (bilingual)
- `src/content/projects/<es|en>/<slug>.md` — project case studies (content collection)
- `src/content.config.ts` — projects collection schema (zod)
- `src/i18n/` — UI strings (`ui.ts`) and helpers (`utils.ts`)
- `src/layouts/BaseLayout.astro` — head, SEO/OpenGraph, nav, footer
- `src/components/` — Header, Footer, LangSwitcher, ThemeToggle, ProjectCard
- `src/pages/[lang]/` — home, projects list, project detail
- `public/` — CV PDFs, favicon, robots.txt, images
- `netlify.toml` — build config + root redirect

`CONTENT_GUIDE.md` has the full, human-friendly guide to editing content.

## Internationalization

- Astro native i18n. Locales: `es` (default), `en`. Routes are prefixed: `/es/`, `/en/`.
- UI strings live in `src/i18n/ui.ts`; long-form content lives in the Markdown files.
- Projects are one file per language under `es/` and `en/` with the **same slug**
  (filename). Mismatched slugs break the language switcher on the detail page.
- **Every content change must be mirrored in both languages.**

## Adding / editing projects

Each project is two files (`es/` and `en/`) sharing a slug. Frontmatter schema
(`src/content.config.ts`):

- `lang`: `"es" | "en"` — must match the folder
- `title`, `description` — required
- `stack`: `string[]` — the first 4 are shown on the card
- `repoUrl`, `liveUrl`: valid URLs — **omit the line if absent** (an empty string
  fails the URL validation and breaks the build)
- `cover`: root-relative image path (optional; falls back to a gradient with the initial)
- `featured`: boolean — shows on the home page
- `order`: number — lower comes first
- `date`: `YYYY-MM-DD` — required

## Content conventions

### Writing voice (project case studies)

Keep a consistent voice across all case studies:

- **Your contributions → first person, past tense** ("Diseñé…", "Desarrollé…",
  "I designed…", "I built…"). Conveys ownership.
- **The project / outcome → impersonal, project as subject, present tense**
  ("El sitio es una web moderna que…", "It is deployed…", "La plataforma centraliza…").
- **Frontmatter descriptions → noun phrase / infinitive**; avoid conjugations with
  an ambiguous subject (e.g. use "…para reemplazar…" rather than a bare "Reemplazó…").

Case study structure: intro → **El problema / The problem** → **La solución / The
solution** → **Mi rol / My role** (first-person lead + technical breakdown) →
**Resultado / Estado del proyecto**.

### Copy & positioning

- Experience is listed **reverse-chronologically** (most recent first).
- Skills are grouped (frontend / backend / data / AI / tooling) and lead with the
  core stack, not AI. Present AI work as engineering ("LLM Integration",
  "Generative AI") and keep specific tool names out of the skills list; the "AI as
  a working tool" idea belongs in the bio, not as a skill chip.

## Commit conventions

- **Conventional Commits, written in English, atomic** (one logical change per commit).
- Types in use: `feat`, `fix`, `content`, `docs`.

## Roadmap / pending

- More real project case studies.
- Replace the placeholder CV PDFs in `public/` (`cv-es.pdf`, `cv-en.pdf`).
- Cover images for projects; `public/og-image.png`; a hero photo.
- Phase 2: custom 404 page, contact form (Netlify Forms), analytics,
  `hreflang` tags for bilingual SEO, subtle animations.
