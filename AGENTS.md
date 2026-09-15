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
- `pnpm build` — runs the tests, then `astro check`, then builds to `dist/`
- `pnpm preview` — serves the production build
- `pnpm og` — regenerates `public/og-image.png` (see SEO below)
- `pnpm test` — runs the Vitest suite

> **Local dev note:** the root path `/` shows the 404 page locally — there is no
> `src/pages/index.astro`. The root redirect is a Netlify server-side rule
> (`netlify.toml`) and only applies in production: browsers asking for English
> get `/en/`, everyone else falls through to `/es/`. In dev, open `/es/` or
> `/en/` directly.

Always run `pnpm build` before pushing. It is the same command Netlify runs, and
it fails on a broken test or a type error before producing any output, so a
broken invariant cannot reach the deploy — which matters because these tests
guard mistakes that look fine (a project missing in one language silently breaks
the language switcher).

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
- `src/styles/global.css` — Tailwind theme tokens, dark variant, reveal animations.
  Both palettes are defined there: `brand-*` (wine red) and a redefinition of
  `slate-*`, whose default blue cast clashed with it. The neutrals keep their
  Tailwind names on purpose, so the markup needs no changes — do not "restore"
  them
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
- `cv`: boolean (default `true`) — include on the CV page. The CV is a curated
  one-pager, not a mirror of the collection: set `false` on anything that earns
  its place on the site but not on paper
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
- **It must fit on one page, and that is a content budget, not a styling
  problem.** The project list is filtered by the `cv` frontmatter flag rather
  than rendering the whole collection, so adding a case study no longer makes
  the CV longer on its own. The `portfolio` case is `cv: false`: on paper it is
  redundant, since `jscalon.dev` is already in the header, and an entry
  explaining that the site replaces the PDF reads oddly inside the PDF. When the
  content genuinely outgrows one page, let it become a real two-pager — but a
  second page carrying three lines is the one outcome to avoid.

### Tests

`pnpm test` runs Vitest over `tests/`. The suite deliberately does **not**
re-check what the build already enforces: zod validates each project's
frontmatter and `astro check` validates the types, so duplicating that here
would only add maintenance.

What it covers is what those cannot see — invariants that span files or
languages, and that fail silently rather than loudly:

- **`i18n.test.ts`** — `ui.es` and `ui.en` hold exactly the same keys. Types only
  check lookups against the default locale, so a key missing from `en` compiles
  and quietly falls back to Spanish. Also covers locale parsing and the switcher
  path rewrite, which must land on the equivalent page.
- **`content.test.ts`** — every project exists in both languages under the same
  slug, each file's `lang:` matches its folder, and every `cover:` resolves to a
  real file. The schema sees one file at a time and cannot notice any of these.
- **`site.test.ts`** — every bilingual field in `site.ts` is filled in for both
  locales, no technology is listed in two skill groups, and the WhatsApp link
  still matches the displayed phone number.

Adding a test is worth it when a mistake would reach production looking fine.
If `astro check` or the schema already rejects it, leave it to them.

### Availability badge

The hero shows an "available for work" pill driven by `profile.openToWork` in
`site.ts`. Flip it to `false` when not looking and the badge disappears — the
string itself lives in `ui.ts` (`hero.available`) like every other UI label.

### SEO

- `BaseLayout` emits canonical, OpenGraph (with explicit `og:image:width/height`,
  which pushes WhatsApp/LinkedIn to the large card) and `hreflang` alternates
  (`es`, `en`, `x-default`), skipped on the 404 since it has no locale.
- `PersonSchema.astro` emits schema.org `Person` JSON-LD, built from `site.ts`.
  Included on the home and CV pages only — not on project pages. Its `image` is
  the portrait itself, not the social card: schema.org reads that field as a
  photograph of the person. It follows the photo automatically, unlike the card.
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
and rise on scroll, driven by one IntersectionObserver in `BaseLayout`. Its
`threshold` is **0 on purpose** — the intersection ratio is relative to the
element's own height, so a fractional threshold silently never fires on a page
taller than a few screens, and the content stays invisible. Do not "tune" it back
up; the bottom `rootMargin` is what paces the reveal. They are
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

Screenshots inside a case study go in `src/assets/<slug>/` and are referenced from the
Markdown with a relative path. Use Markdown image syntax, not raw `<img>`: only the former
is processed and path-checked. Each one carries a caption — an italic paragraph directly
below, which `global.css` styles as such — and the caption must explain a decision rather
than describe the picture.

Covers go in `src/assets/covers/<slug>.webp` and are referenced from the project
frontmatter by a path **relative to the `.md` file**
(`../../../assets/covers/<slug>.webp`), which the `image()` schema helper
validates. The detail page reads the real width/height off that import for its
`og:image` metadata, so nothing is hardcoded. Keep filenames in English.

`public/` is only for files that need a stable, unhashed URL: the favicon,
`og-image.png` (shared links keep working across rebuilds), `robots.txt` — and the clips
below, which `astro:assets` cannot touch.

### Clips (screen recordings)

Some things only exist in motion: a carousel frozen into a screenshot proves nothing. Those
go in as a short looping video, not a GIF — a GIF of the same clip weighs tens of megabytes
against a few hundred kilobytes of H.264.

`astro:assets` cannot process video (the image service would keep a single frame), so the
file goes in `public/<slug>/` and is referenced from the Markdown as raw HTML. That costs
the path-checking the image pipeline gives, so check the path yourself. Use `<figure>` /
`<figcaption>` rather than the italic-paragraph caption above: the markup is already HTML,
and `figure` is one of the few tags Markdown passes through as a block — `video` is not, so
a bare `<video>` would be wrapped in a paragraph. Keep no blank line inside the block or
Markdown will start parsing the middle of it. `global.css` styles the two caption forms
identically.

```html
<figure>
  <video src="/<slug>/clip.mp4" poster="/<slug>/clip.webp" width="1280" height="554"
    loop muted playsinline controls preload="none" data-autoplay></video>
  <figcaption>A caption that explains a decision, as with screenshots.</figcaption>
</figure>
```

Every attribute there is load-bearing. `width`/`height` reserve the space (the CLS fix we
already made for covers), `preload="none"` plus `poster` means an unplayed clip downloads
nothing, and `controls` is what makes the motion stoppable — WCAG asks for that on anything
that animates by itself for more than five seconds. **No `autoplay` attribute:** the clip
ships paused, and a 344-byte script on the project detail page (nowhere else) starts it
only where `prefers-reduced-motion` says motion is welcome, playing it while it is on
screen and pausing it when it scrolls away. Without JS the reader gets the poster and a
play button.

Encode to **H.264 / yuv420p, no audio track, `-movflags +faststart`**, cropped to the
content (browser scrollbars and dead space add weight and nothing else) and about 1280 px
wide. There is no script for this: it is a one-off conversion per clip, and the encoded
file is what gets committed.

A looping clip has to **loop without a visible jump**, and a plain trim only manages that
if the animation's period happens to divide the clip — for a continuous marquee it never
does. Cross-fading the end into the start does not fix it either: it relocates the
discontinuity into the dissolve, where two offset copies of the same content are visible at
once. What works is **ping-pong** — play forward, then append the reverse:

```
[0:v]trim=0:D,setpts=PTS-STARTPTS,fps=30,format=yuv420p[fwd];
[fwd]split[f1][f2];
[f2]reverse,trim=start=0.0333:end=<D-0.0333>,setpts=PTS-STARTPTS[rev];
[f1][rev]concat=n=2:v=1[out]
```

Trimming one frame off each end of the reverse is what keeps the turning points from
stuttering: without it the last forward frame and the first reversed frame are the same
picture shown twice, and the same happens again at the loop. It costs roughly double the
file size, and the motion visibly runs backwards for half the clip — fine for a marquee,
wrong for anything where direction carries meaning.

**Verify it rather than trusting the filter.** Comparing the first and last frame is not
enough: it only inspects the one place a fault is least likely. Scan the whole thing for
discontinuities instead, over the clip concatenated with itself so the loop seam is
included:

```
ffmpeg -f concat -safe 0 -i twice.txt \
  -vf "tblend=all_mode=difference,signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=diff.txt" \
  -an -f null -
```

`YAVG` is the average difference between consecutive frames. Steady motion holds it
roughly constant; a **spike** is a jump and a value **near zero** is a frozen frame. Both
turning points and the loop seam should stay within ~1.15x of the baseline. For scale, the
cross-faded version this replaced peaked at 4.8x and then dropped to 0.03x two frames
later — which is exactly what a viewer reported seeing.

Run the same scan on the **raw recording** before choosing what to trim. Screen recorders
drop frames, and the ones they drop are not spread evenly: the two takes behind the current
clip lost 5% and 8.7% of their frames, but in both cases the losses clustered, leaving
stretches that were clean. Scanning first and cutting the quietest window is free and it
roughly halved the defect rate here. A single frozen frame at 30fps is not visible on its
own, so this is about avoiding a cluster, not about chasing zero.

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
  Integration") and name a capability rather than a field: "Generative AI" was
  dropped because it says where you work, not what you can do, and by now
  everyone claims it. Keep specific tool names out of the list; the "AI as a
  working tool" idea belongs in the bio, not as a skill chip.
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
animations, OG image and the `pnpm og` script that regenerates it, project covers,
profile photo, CV page, analytics, the Vitest suite wired into `pnpm build`, the wine
palette (dark-mode background included), `theme-color`, skills as data-level groups,
`aria-current` on the nav, the availability badge, screenshots inside case studies, and
looping clips.

`theme-color` is in that list on purpose. The tags are emitted and correct, but Chrome and
Firefox on Android ignore them, so nothing visible changes — it was kept as a correctness
item, not because it does anything today. Do not re-propose it as an improvement, and do
not remove it as dead code.
