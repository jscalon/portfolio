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
| Datos personales, contacto, experiencia, formación, skills, idiomas | `src/data/site.ts` |
| Textos de la interfaz (botones, títulos, navegación) | `src/i18n/ui.ts` |
| Proyectos | `src/content/projects/<es\|en>/<slug>.md` |
| CV | Se genera solo desde `src/data/site.ts` → `/es/cv`, `/en/cv` |
| Portadas de proyectos | `public/covers/<slug>.webp` |
| Foto de perfil | `public/profile.webp` (800×800) |
| Imagen social (Open Graph) | `public/og-image.png` (1200×630) |
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
cover: /covers/mi-proyecto.webp   # opcional (imagen en public/covers/)
featured: true        # aparece en la home
order: 1              # orden de aparición (menor primero)
date: 2026-01-01
---

Contenido en Markdown...
```

## Despliegue

Netlify está conectado a este repo. Cada `push` a `main` dispara un build
(`pnpm build` → `dist/`) y publica en **jscalon.dev**. Config en `netlify.toml`.

## Pendiente

- Más casos de estudio de proyectos.
- Opcional: blog, imágenes OG por proyecto.

Ver `AGENTS.md` para las convenciones técnicas y `CONTENT_GUIDE.md` para la guía
detallada de edición de contenido.
