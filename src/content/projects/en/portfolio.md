---
lang: en
title: "jscalon.dev — Portfolio and CV"
description: "My personal website, a verifiable alternative to the PDF CV: the projects explained in depth, the CV built in and the source open to anyone who wants to look."
stack: ["Astro", "TypeScript", "Tailwind CSS", "Netlify"]
cover: ../../../assets/covers/portfolio.webp
repoUrl: https://github.com/jscalon/portfolio
liveUrl: https://jscalon.dev
featured: false
cv: false
order: 3
date: 2026-06-27
---

This is the site you are reading. The one project you can audit in full while you read it:
the source is public, and every decision described below can be checked by pressing the
language switch, opening the CV or reading the generated HTML.

## The problem

Sending a CV as a PDF does the job of saying what I do, but it does not show that I can do
it. There is no room to explain a project beyond a single line, no way to show the work
running, and every update means exporting the file again and trusting that the copy going
around over email is the latest one.

## The solution

A static site that takes over from the PDF as the primary format, without giving up the
ability to produce one: the CV is **a page of the site** (`/es/cv`, `/en/cv`), not an
attachment. It renders from the same data that feeds everything else, so CV and portfolio
cannot drift apart — the value is edited once and both change. Anyone who needs the PDF gets
it through *Print → Save as PDF*, over dedicated print rules that leave a clean A4 sheet.

The site is in Spanish and English, and that is an architectural decision rather than a
translation layer: routes are prefixed by language, UI strings live in a single dictionary,
and each case study is two Markdown files sharing an identifier, so the switcher keeps the
visitor on the equivalent page instead of dropping them back on the home page.

Decisions that define the result:

- **The photo appears only in the Spanish version.** In Spain and Latin America it is
  customary to include one; in anglophone markets it is left out by convention, to reduce
  bias in hiring. The asymmetry is intentional.
- **No cookie banner.** The analytics store nothing on the visitor's device, so there is
  nothing to consent to and no strip covering the content on a first visit. They are also
  optional: the script is emitted only in production builds and only with its environment
  variables set, so development never reports data and, without them, the site makes no
  third-party requests at all. Everything else — the typeface included — is served from the
  site's own domain.
- **It works without JavaScript.** The entrance animations are an optional layer: content
  hides itself only once the browser confirms it can run JS, and never if the visitor has
  asked their system for reduced motion. If the script never arrives or fails, the page is
  fully visible from the first paint. It loads under 5 KB of JavaScript in total.
- **The root respects the browser's language.** The split between `/es/` and `/en/` is
  resolved on the server before any HTML is sent: no flash, no interstitial, no JS.
- **Images are processed at build time,** emitting AVIF and WebP at several sizes and failing
  on a broken path, instead of serving one large file to everyone.

## My role

I designed and built the entire site, and I write and maintain its content in both languages.

- **Content architecture:** I separated structured data (profile, experience, education,
  technologies) from long-form writing, which lives in a content collection whose schema is
  validated at build time.
- **Frontend:** Astro 5 with static output, TypeScript in strict mode and Tailwind CSS 4,
  with a light/dark theme that does not flash on first load.
- **Internationalization:** language-based routing, a UI dictionary and reciprocal `hreflang`
  between the two versions of every page.
- **SEO and shared links:** canonical URLs, schema.org structured data and Open Graph cards
  that declare each image's real dimensions, plus a dedicated social image composed around
  its center so it survives the square crop some messaging clients apply.
- **Deployment:** Netlify, with an automatic build on every push to `main`.

## Project status

It is live at [jscalon.dev](https://jscalon.dev) and grows with every project I document and
every detail I decide to polish. It is a small and deliberately simple site: I am not trying
to impress with complexity, but to show my work with the finish I think it deserves.
