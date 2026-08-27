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

> **Local dev note:** the root path `/` shows the 404 page locally — there is no
> `src/pages/index.astro`. The `/ → /es/` redirect is a Netlify server-side rule
> (`netlify.toml`) and only applies in production. In dev, open `/es/` or `/en/`
> directly.

Always run `pnpm build` before pushing — `astro check` validates content
frontmatter and types, catching format errors before they reach the deploy.

## Project structure

- `src/data/site.ts` — profile/contact, bio, experience, education, skills,
  spoken languages (bilingual). **Single source of truth for the site *and* the CV.**
- `src/content/projects/<es|en>/<slug>.md` — project case studies (content collection)
- `src/content.config.ts` — projects collection schema (zod)
- `src/i18n/` — UI strings (`ui.ts`) and helpers (`utils.ts`)
- `src/utils/projects.ts` — collection helpers (`getProjectsByLang`, `projectUrl`, `projectSlug`)
- `src/layouts/BaseLayout.astro` — head, SEO/OpenGraph, hreflang, theme + reveal scripts
- `src/components/` — Header, Footer, LangSwitcher, ThemeToggle, ProjectCard,
  ContactForm, PersonSchema, Analytics
- `src/pages/[lang]/` — home, `cv`, projects list, project detail
- `src/pages/404.astro` — language-aware 404 (no locale prefix)
- `src/styles/global.css` — Tailwind theme tokens, dark variant, reveal animations
- `public/` — `favicon.svg`, `og-image.png`, `profile.webp`, `covers/`, `robots.txt`
- `netlify.toml` — build config + root redirect
- `.env.example` — documents the optional analytics variables

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

## Key features & conventions

### CV page (`/es/cv`, `/en/cv`)

The CV is a **page, not a PDF**. It renders from `src/data/site.ts` and the
projects collection, so the CV and the site can never drift apart — edit the data
once and both update. Users export it with the browser's *Print → Save as PDF*.

- Print rules live in the page's `@media print` block. `@page { margin: 0 }` is
  deliberate: it leaves the browser no room to draw its own header/footer (date,
  URL, page number); the visual margin comes from padding on `.cv-sheet`.
- `.cv-item` / `.cv-section` carry `break-inside: avoid` so entries don't split
  across pages. Keep those classes on new entries.
- **The photo is ES-only** (`lang === "es"`). A CV photo is customary in
  Spain/LatAm but avoided in anglophone markets. Do not "fix" this asymmetry.

### SEO

- `BaseLayout` emits canonical, OpenGraph (with explicit `og:image:width/height`,
  which pushes WhatsApp/LinkedIn to the large card) and `hreflang` alternates
  (`es`, `en`, `x-default`), skipped on the 404 since it has no locale.
- `PersonSchema.astro` emits schema.org `Person` JSON-LD, built from `site.ts`.
  Included on the home and CV pages only — not on project pages.
- `public/og-image.png` is a **centered** composition on purpose, so it survives
  the square center-crop that some clients (WhatsApp) apply.

### Animations

`.reveal` (single element) and `.reveal-stagger` (staggers direct children) fade
and rise on scroll, driven by one IntersectionObserver in `BaseLayout`. They are
gated on `html.js` (set before first paint) and on `prefers-reduced-motion`, so
content is always visible without JS and for users who opt out. Add the class to
new sections; no JS wiring needed.

### Contact form

Netlify Forms — no backend. The `data-netlify`, hidden `form-name` input and
`bot-field` honeypot are all required; removing any breaks submissions. The AJAX
handler posts to `location.pathname` (not `/`, which `netlify.toml` force-
redirects). **It only works on the deployed site**, never in `pnpm dev`.

### Analytics

`Analytics.astro` renders the tracking script only when **both**
`PUBLIC_ANALYTICS_SRC` and `PUBLIC_ANALYTICS_ID` are set **and** the build is a
production build — so `pnpm dev` never sends data, and the site degrades to zero
third-party requests if analytics are dropped. The values live in Netlify's
environment variables, never in the repo; `.env.example` documents them.

Provider is Umami (cookieless, so no consent banner is needed). The markup assumes
an Umami-style `data-website-id` attribute — Plausible uses `data-domain` instead.

### Images

Optimize before committing: resize to ~1200px wide (800×800 for the portrait) and
convert to WebP. Project covers go in `public/covers/<slug>.webp`. Keep filenames
in English.

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

- **More real project case studies** — only ServiFrescos and Botinfy so far.
- **Optional:** a downloadable `.pdf` exported from `/cv` and committed to
  `public/`, for attaching to emails. Generating it in CI would require a headless
  browser (heavy, fragile) — exporting manually and committing is the pragmatic
  route if it's ever needed.
- **Nice to have:** per-project OG images.

Done (do not re-suggest): custom 404, contact form, `hreflang`, JSON-LD, scroll
animations, OG image, project covers, profile photo, CV page, analytics.
