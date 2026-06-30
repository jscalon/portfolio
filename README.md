# Portfolio — jscalon.dev

Portfolio personal bilingüe (ES/EN), estático, construido con **Astro + TypeScript +
Tailwind CSS** y desplegado en Netlify.

## Desarrollo

```bash
pnpm install
pnpm dev       # http://localhost:4321  (abre /es/ o /en/)
pnpm build     # astro check + build estático en dist/
pnpm preview   # sirve el build de dist/
```

Requiere Node 20+.

## Cómo editar el contenido

| Qué | Dónde |
| --- | --- |
| Datos personales, redes, CV, experiencia, formación, skills | `src/data/site.ts` |
| Textos de la interfaz (botones, títulos, navegación) | `src/i18n/ui.ts` |
| Proyectos | `src/content/projects/<es\|en>/<slug>.md` |
| CV en PDF | `public/cv-es.pdf` y `public/cv-en.pdf` (reemplaza los placeholder) |
| Imagen social (Open Graph) | `public/og-image.png` (1200×630, **pendiente de añadir**) |
| Favicon | `public/favicon.svg` |
| Colores / tipografía | `src/styles/global.css` (bloque `@theme`) |

### Añadir un proyecto

Crea **dos** archivos con el mismo nombre de slug, uno por idioma:

- `src/content/projects/es/mi-proyecto.md`
- `src/content/projects/en/mi-proyecto.md`

Frontmatter disponible (ver schema en `src/content.config.ts`):

```yaml
---
lang: es              # es | en  (obligatorio, debe coincidir con la carpeta)
title: Mi Proyecto
description: Descripción breve.
stack: ["Astro", "TypeScript"]
repoUrl: https://github.com/...   # opcional
liveUrl: https://...              # opcional
cover: /proyectos/mi-proyecto.png # opcional (imagen en public/)
featured: true        # aparece en la home
order: 1              # orden de aparición (menor primero)
date: 2026-01-01
---

Contenido en Markdown...
```

## Despliegue

Netlify está conectado a este repo. Cada `push` a `main` dispara un build
(`pnpm build` → `dist/`) y publica en **jscalon.dev**. Config en `netlify.toml`.

## Pendiente (opcional, fase 2)

- Añadir `public/og-image.png` (1200×630) para las tarjetas sociales.
- Reemplazar los CV PDF placeholder por los reales.
- Rellenar experiencia/formación reales en `src/data/site.ts`.
- Formulario de contacto (Netlify Forms), blog, animaciones, analytics.
