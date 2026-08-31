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
- `pnpm og` — regenerates `public/og-image.png` (see SEO below)

> **Local dev note:** the root path `/` shows the 404 page locally — there is no
> `src/pages/index.astro`. The root redirect is a Netlify server-side rule
> (`netlify.toml`) and only applies in production: browsers asking for English
> get `/en/`, everyone else falls through to `/es/`. In dev, open `/es/` or
> `/en/` directly.

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
- `src/assets/` — images processed by `astro:assets` (`profile.webp`, `covers/`)
- `public/` — `favicon.svg`, `og-image.png`, `robots.txt` (served as-is)
- `netlify.toml` — build config + root redirects
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

### Availability badge

The hero shows an "available for work" pill driven by `profile.openToWork` in
`site.ts`. Flip it to `false` when not looking and the badge disappears — the
string itself lives in `ui.ts` (`hero.available`) like every other UI label.

### SEO

- `BaseLayout` emits canonical, OpenGraph (with explicit `og:image:width/height`,
  which pushes WhatsApp/LinkedIn to the large card) and `hreflang` alternates
  (`es`, `en`, `x-default`), skipped on the 404 since it has no locale.
- `PersonSchema.astro` emits schema.org `Person` JSON-LD, built from `site.ts`.
  Included on the home and CV pages only — not on project pages.
- `public/og-image.png` is a **centered** composition on purpose, so it survives
  the square center-crop some clients (WhatsApp) apply **as a fallback**. The wide
  card is the normal outcome — that is what the declared dimensions above buy; the
  centering is insurance for when a client falls back to a square, not the expected
  rendering.
- That card embeds the portrait from `src/assets/profile.webp`, so it goes stale if
  the photo changes. `pnpm og` (`scripts/og-image.mjs`) regenerates it — run it
  after replacing the portrait; nothing in the build catches the drift. Its text
  stays in English in both locales ("AI", not "IA"), matching the skills list, since
  one card serves `/es/` and `/en/` alike.

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

### Navigation & sitemap

`prefetch: { prefetchAll: true }` in `astro.config.mjs` prefetches internal links
on hover. `prefetchAll` is the operative part — `prefetch: true` alone only
enables the feature and every link would have to opt in with
`data-astro-prefetch`. It costs ~2 KB of JS on every page, the only script the
site ships that is not its own.

The sitemap integration is configured with `i18n`, so `sitemap-0.xml` carries
`xhtml:link` alternates pairing each ES page with its EN twin — the same
relationship the `hreflang` tags express in the HTML.

### Images

Images live in `src/assets/`, **not** `public/`, so `astro:assets` processes them:
`<Picture>` emits AVIF + WebP with a `srcset`, and the build fails on a missing or
broken path. Commit the original at a generous size (covers **1200×675**, 16:9;
the portrait 800×800) and let the build resize — there is no manual optimization
step. `sharp` does the work and is a real dependency; the build fails without it.

Covers go in `src/assets/covers/<slug>.webp` and are referenced from the project
frontmatter by a path **relative to the `.md` file**
(`../../../assets/covers/<slug>.webp`), which the `image()` schema helper
validates. The detail page reads the real width/height off that import for its
`og:image` metadata, so nothing is hardcoded. Keep filenames in English.

`public/` is only for files that need a stable, unhashed URL: the favicon,
`og-image.png` (shared links keep working across rebuilds) and `robots.txt`.

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

**Voice exception — the `portfolio` case study.** That one case addresses the
reader directly ("Es el sitio web que estás leyendo", "puedes auditar") and refers
to the site in the first person ("Mi sitio web personal"). It is deliberate, not
drift: it is the only project the reader is standing inside while reading it, and
that self-reference is the case's strongest argument — every claim in it can be
checked on the spot. Two rules keep the exception from spreading:

- **Contain it to the intro and the closing.** *La solución*, the decisions list
  and *Mi rol* stay in the normal voice — impersonal for the site, first-person
  past for the contributions. A "puedes ver que…" inside the technical sections
  turns the case into a sales page.
- **Mirror it in both languages.** The English file carries the same second person;
  it reads just as naturally there.

No other case study gets this treatment: for every other project the reader is
outside the artifact, and the direct address would be a rhetorical tic rather than
a fact.

### Copy & positioning

- Experience is listed **reverse-chronologically** (most recent first).
- Skills are **data-level groups** in `site.ts` (`SkillGroup[]`), rendered as
  labelled rows on the home page and one line per group on the CV. Group order is
  the message: the core stack leads and AI follows, so the profile does not read
  as "AI person who also codes". Present AI work as engineering ("LLM
  Integration", "Generative AI") and keep specific tool names out of the list; the
  "AI as a working tool" idea belongs in the bio, not as a skill chip.
- `PersonSchema` flattens the groups for `knowsAbout`, which wants plain terms.

## Commit conventions

- **Conventional Commits, written in English, atomic** (one logical change per commit).
- Types in use: `feat`, `fix`, `content`, `docs`.

## Roadmap / pending

- **More real project case studies** — ServiFrescos, Botinfy and this site so far.
  The gap is the current Febeca work, which the experience section claims and the
  projects section does not show. Anonymize: describe the problem and the approach
  without real figures or screenshots of internal data.
- **Optional:** a downloadable `.pdf` exported from `/cv` and committed to
  `public/`, for attaching to emails. Generating it in CI would require a headless
  browser (heavy, fragile) — exporting manually and committing is the pragmatic
  route if it's ever needed.
- **Nice to have:** per-project OG images.

Done (do not re-suggest): custom 404, contact form, `hreflang`, JSON-LD, scroll
animations, OG image, project covers, profile photo, CV page, analytics.
