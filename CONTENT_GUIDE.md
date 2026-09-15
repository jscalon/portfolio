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

### Capturas dentro del caso

Van en `src/assets/<slug>/` y se referencian desde el Markdown con ruta relativa, igual
que la portada. Al usar la sintaxis de Markdown (`![alt](ruta)`) pasan por el optimizador
y el build falla si la ruta no existe; escritas como `<img>` de HTML, no.

**Cada captura lleva un pie, y el pie explica una decisión**, no describe lo que ya se ve.
Mal: *"Listado de productos"*. Bien: *"El precio nuevo no reemplaza al anterior: se
programa"*. Sin pie que aporte algo, la captura sobra.

El pie es un párrafo **en cursiva justo debajo** de la imagen — Markdown no tiene sintaxis
propia para pies, así que esa es la convención, y `global.css` la reconoce para
maquetarla como tal:

```md
![Texto alternativo descriptivo](../../../assets/mi-proyecto/pantalla.webp)

*El pie, en cursiva y en el párrafo inmediatamente siguiente.*
```

Ancho recomendado: **1536 px**, que cubre pantallas de alta densidad en la columna del
caso. Y si la aplicación maneja datos reales de una empresa, captura con **datos de
ejemplo**, nunca con los de producción.

### Clips, cuando lo interesante es el movimiento

Hay cosas que una captura no demuestra: un carrusel congelado no es un carrusel. Para eso
va un vídeo corto en bucle — **no un GIF**, que del mismo clip pesaría decenas de megas
frente a unos cientos de kilobytes.

El vídeo no pasa por el optimizador de Astro (se quedaría con un fotograma), así que vive
en `public/<slug>/` y se escribe como HTML dentro del Markdown. Como no hay optimizador,
tampoco hay red de seguridad: **si te equivocas en la ruta, el build no te avisa**.

```html
<figure>
  <video src="/mi-proyecto/clip.mp4" poster="/mi-proyecto/clip.webp"
    width="1280" height="586"
    loop muted playsinline controls preload="none" data-autoplay></video>
  <figcaption>El pie, que explica una decisión igual que en las capturas.</figcaption>
</figure>
```

Copia ese bloque tal cual y cambia solo la ruta, el tamaño y el pie: cada atributo está
ahí por algo. Sin líneas en blanco dentro del bloque, o Markdown se pondrá a interpretar
lo de dentro.

El clip **no se reproduce solo por el atributo `autoplay`**. Arranca parado y un script lo
pone en marcha únicamente si el sistema del visitante no pide menos animación, y solo
mientras está a la vista. Quien navega sin JavaScript ve el póster y un botón de play. Eso
es deliberado: es el mismo criterio que usan las animaciones del resto del sitio.

**Preparar el archivo no es copiar el screen recording.** Hay que recortarlo, quitarle el
audio, bajarlo a ~1280 px y montar el bucle. Lo del bucle es lo que más cuesta: una
grabación cortada por donde sea da un salto al reiniciarse, siempre. La solución es que el
clip **vaya y vuelva** — se reproduce hacia delante y luego hacia atrás, así que nunca hay
un corte. A cambio, durante la mitad del clip el movimiento va al revés, lo cual no se nota
en un carrusel pero cantaría en algo donde la dirección signifique algo.

Es una conversión manual de una sola vez, con ffmpeg. Pásame el vídeo en crudo —**no lo
borres hasta que el clip esté aprobado**, porque rehacerlo desde el ya comprimido pierde
calidad— y te devuelvo el `.mp4` y el póster listos para colocar.

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
