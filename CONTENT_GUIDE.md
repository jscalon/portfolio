# Guía de contenido

Cómo rellenar el portfolio con tus datos reales: dónde va cada cosa, en qué formato y
cómo añadir/editar proyectos. El sitio está en producción con contenido de ejemplo;
esta guía es para sustituirlo.

## Orden recomendado

1. Datos personales y contacto → `src/data/site.ts`
2. Bio, experiencia, formación, skills → `src/data/site.ts`
3. Proyectos reales → `src/content/projects/<es|en>/*.md`
4. CV en PDF → `public/cv-es.pdf`, `public/cv-en.pdf`
5. Imágenes de portada de proyectos → `public/`
6. Previsualizar (`pnpm dev`) y desplegar (`git push`)

---

## 1-2. Datos personales, bio, experiencia, formación, skills

Archivo: **`src/data/site.ts`** (todo en un solo sitio).

- **`profile`**: `name`, `email`, `location` son texto simple. `social.github` y
  `social.linkedin` deben ser **URLs completas** (`https://...`). Sustituye el LinkedIn
  placeholder (`https://www.linkedin.com/`) por tu perfil real.
- **`profile.cv`**: **no toques las rutas** (`/cv-es.pdf`, `/cv-en.pdf`); solo coloca los
  PDF en `public/` con esos nombres (paso 4).
- **`bio`**: objeto con dos claves, `es` y `en`. Ambas obligatorias.
- **`experience`**: es un **array**; cada entrada es un puesto. Para añadir más, duplica
  el bloque `{ ... }` separado por comas. Campos:
  - `role`, `period`, `description` → objetos bilingües `{ es: "...", en: "..." }`
  - `company` → texto simple (no se traduce)
- **`education`**: igual que experience. Campos: `title` y `period` bilingües,
  `institution` texto simple.
- **`skills`**: array plano de strings, **compartido en ambos idiomas** (los nombres de
  tecnología no se traducen).

Ejemplo de una entrada de experiencia:

```ts
{
  role: { es: "Desarrollador Frontend", en: "Frontend Developer" },
  company: "Acme Corp",
  period: { es: "Ene 2024 — Actualidad", en: "Jan 2024 — Present" },
  description: {
    es: "Desarrollo de la interfaz del producto con React y TypeScript.",
    en: "Built the product UI with React and TypeScript.",
  },
},
```

---

## 3. Proyectos

Ubicación: **`src/content/projects/<es|en>/<slug>.md`**

**Regla clave:** cada proyecto son **DOS archivos** con el **mismo nombre** (slug), uno en
`es/` y otro en `en/`. El nombre del archivo es la URL: `mi-proyecto.md` →
`/es/projects/mi-proyecto`. Si los slugs no coinciden entre idiomas, el botón de cambiar
idioma dará 404 en la página de detalle.

Para empezar: edita los 3 ejemplos (`gestor-tareas`, `app-tiempo`, `portfolio`) o
bórralos y crea los tuyos. Borrar un proyecto = borrar sus dos `.md`.

Frontmatter (entre los `---`), según el schema en `src/content.config.ts`:

| Campo | Tipo | Obligatorio | Notas |
| --- | --- | --- | --- |
| `lang` | `es` \| `en` | Sí | **Debe coincidir con la carpeta** |
| `title` | texto | Sí | |
| `description` | texto | Sí | 1 frase; se ve en la tarjeta |
| `stack` | lista `["A","B"]` | No (def. `[]`) | Se muestran los 4 primeros en la tarjeta |
| `repoUrl` | URL | No | **Si no hay, BORRA la línea** (no dejar `""`) |
| `liveUrl` | URL | No | Igual: omite la línea si no hay demo |
| `cover` | ruta texto | No | Ruta a imagen en `public/` (ver paso 5) |
| `featured` | `true`/`false` | No (def. `false`) | `true` = aparece en la home |
| `order` | número | No (def. `0`) | Orden de aparición: **menor primero** |
| `date` | `YYYY-MM-DD` | Sí | Formato ISO, ej. `2025-11-30` |

> ⚠️ **Gotcha:** `repoUrl` y `liveUrl` se validan como URL. Si pones `repoUrl: ""` el
> build **falla**. Si no tienes repo/demo, **elimina la línea entera**.

Plantilla lista para copiar:

```markdown
---
lang: es
title: Nombre del Proyecto
description: Una frase que resuma qué es y para qué sirve.
stack: ["React", "TypeScript", "Node.js"]
repoUrl: https://github.com/JuanGimenez7/mi-repo
liveUrl: https://demo.ejemplo.com
cover: /proyectos/mi-proyecto.png
featured: true
order: 1
date: 2025-11-30
---

Descripción larga en **Markdown**. Aquí puedes contar el problema, tu rol,
decisiones técnicas, resultados, etc.

## Lo que aprendí
- Punto uno.
- Punto dos.
```

---

## 4. CV en PDF

Reemplaza los placeholder `public/cv-es.pdf` y `public/cv-en.pdf` por los reales,
**manteniendo esos nombres exactos** (los enlaces del sitio ya apuntan ahí). Si solo
tienes CV en un idioma, duplícalo con los dos nombres.

---

## 5. Imágenes de portada de proyectos

- Coloca las imágenes en `public/` (sugerido: crea `public/proyectos/`).
- Referéncialas en el frontmatter con ruta **root-relative**: `cover: /proyectos/x.png`.
- Recomendado: ~1200px de ancho, `.webp`/`.jpg`/`.png`, ratio 16:9.
- Si un proyecto no tiene imagen, omite `cover`: la tarjeta muestra un degradado con la
  inicial automáticamente.

---

## 6. Previsualizar y desplegar

```bash
pnpm dev       # http://localhost:4321 — revisa /es/ y /en/ mientras editas
pnpm build     # valida todo (astro check); si un campo está mal, aquí falla
git add . && git commit -m "content: datos y proyectos reales" && git push
```

El `push` a `main` dispara el deploy automático en Netlify. **Corre `pnpm build` en local
antes del push**: si un frontmatter tiene un error de formato, lo caza antes de romper el
deploy.

---

## Checklist

- [ ] `src/data/site.ts`: nombre, email, LinkedIn real, bio, experiencia, formación, skills
- [ ] Proyectos reales en `es/` y `en/` (mismos slugs), placeholders borrados
- [ ] `repoUrl`/`liveUrl` reales o líneas eliminadas (nunca `""`)
- [ ] `public/cv-es.pdf` y `public/cv-en.pdf` reales
- [ ] Imágenes de portada en `public/` + `cover:` apuntando a ellas
- [ ] `pnpm build` en verde → `git push`
