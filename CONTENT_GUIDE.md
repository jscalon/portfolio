# Guía de contenido

Cómo rellenar el portfolio con tus datos reales: dónde va cada cosa, en qué formato y
cómo añadir/editar proyectos. El sitio está en producción con contenido de ejemplo;
esta guía es para sustituirlo.

## Orden recomendado

1. Datos personales y contacto → `src/data/site.ts`
2. Bio, experiencia, formación, skills → `src/data/site.ts`
3. Proyectos reales → `src/content/projects/<es|en>/*.md`
4. (El CV ya no es un PDF: se genera solo desde los datos — ver sección 4)
5. Imágenes de portada de proyectos → `src/assets/covers/`
6. Previsualizar (`pnpm dev`) y desplegar (`git push`)

---

## 1-2. Datos personales, bio, experiencia, formación, skills

Archivo: **`src/data/site.ts`** (todo en un solo sitio).

- **`profile`**: `name`, `email`, `location` son texto simple. `social.github` y
  `social.linkedin` deben ser **URLs completas** (`https://...`). Sustituye el LinkedIn
  placeholder (`https://www.linkedin.com/`) por tu perfil real.
- **`phone` / `whatsapp`**: el teléfono en formato legible y el mismo número
  normalizado para el enlace `wa.me` (sin espacios ni `+`).
- **`spokenLanguages`**: idiomas y nivel, bilingüe. Solo se muestran en el CV.
- **`bio`**: objeto con dos claves, `es` y `en`. Ambas obligatorias.
- **`experience`**: es un **array**; cada entrada es un puesto. Para añadir más, duplica
  el bloque `{ ... }` separado por comas. Campos:
  - `role`, `period`, `description` → objetos bilingües `{ es: "...", en: "..." }`
  - `company` → texto simple (no se traduce)
- **`education`**: igual que experience. Campos: `title` y `period` bilingües,
  `institution` texto simple, y `note` opcional (bilingüe) para el estado —
  `"Graduado"` / `"Graduated"`. Un rango de fechas cerrado solo *sugiere* que
  terminaste; el `note` lo dice. Bórralo si el programa sigue en curso.
- **`skills`**: lista de **grupos**. Cada grupo tiene `label` bilingüe (Frontend,
  Backend, Datos…) y `items`, un array plano de strings **compartido en ambos
  idiomas** (los nombres de tecnología no se traducen). El orden de los grupos es
  el que se ve en la web y en el CV: deja el stack principal arriba.
- **`profile.openToWork`**: `true` muestra la insignia verde "Disponible para
  nuevas oportunidades" en la portada. Ponlo en `false` cuando no busques trabajo.

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
| `cover` | ruta relativa | No | Ruta a imagen en `src/assets/` (ver paso 5) |
| `featured` | `true`/`false` | No (def. `false`) | `true` = aparece en la home |
| `cv` | `true`/`false` | No (def. `true`) | `false` = no sale en el CV (ver aviso abajo) |
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
cover: ../../../assets/covers/mi-proyecto.webp
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

## 4. El CV

**No hay que mantener ningún PDF.** El CV es una página (`/es/cv` y `/en/cv`) que se
genera automáticamente desde `src/data/site.ts` y tus proyectos. Si actualizas tu
experiencia o añades un proyecto, **el CV se actualiza solo** — nunca se desincroniza.

- Para obtener un PDF: abre `/es/cv` y pulsa el botón **"Imprimir / Guardar PDF"**
  (o `Ctrl+P` → Guardar como PDF). Los estilos de impresión ya dejan una hoja A4 limpia.
- La **foto solo aparece en la versión en español**: es lo habitual en España y
  Latinoamérica, mientras que en mercados anglosajones se omite.
- Si quieres un `.pdf` descargable desde el sitio, expórtalo con `Ctrl+P`, guárdalo
  en `public/` y enlázalo. Recuerda re-exportarlo cuando cambies datos.

---

## 5. Imágenes de portada de proyectos

- Coloca las imágenes en **`src/assets/covers/`** (no en `public/`).
- Referéncialas en el frontmatter con la ruta **relativa al archivo `.md`**:
  `cover: ../../../assets/covers/x.webp`. Si la ruta está mal, el build falla y te
  lo dice — antes fallaba en silencio y la tarjeta salía sin imagen.
- Tamaño: **1200×675** (16:9), `.webp`. Sube la original a ese tamaño y ya está:
  el build genera solo las versiones pequeñas y los formatos modernos (AVIF/WebP).
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
- [ ] Revisado `/es/cv` y `/en/cv` (se generan solos; comprueba con `Ctrl+P`)
- [ ] Imágenes de portada en `src/assets/covers/` + `cover:` apuntando a ellas
- [ ] `pnpm build` en verde → `git push`
