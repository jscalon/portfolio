---
lang: es
title: "jscalon.dev — Portfolio y CV"
description: "Mi sitio web personal, una alternativa comprobable al CV en PDF: los proyectos explicados en detalle, el currículum integrado y el código abierto para quien quiera revisarlo."
stack: ["Astro", "TypeScript", "Tailwind CSS", "Netlify"]
cover: ../../../assets/covers/portfolio.webp
repoUrl: https://github.com/jscalon/portfolio
liveUrl: https://jscalon.dev
featured: false
cv: false
order: 3
date: 2026-06-27
---


Es el sitio web que estás leyendo. El único proyecto que puedes auditar por completo
mientras lo lees: el código es público y cada decisión descrita más abajo se comprueba
pulsando el conmutador de idioma, abriendo el CV o mirando el HTML generado.

## El problema

Enviar un currículum en PDF cumple el propósito de contar lo que hago, pero no demuestra que
sepa hacerlo. No hay espacio para explicar un proyecto más allá de una línea, no hay forma
de enseñar el trabajo funcionando, y cada actualización obliga a exportar nuevamente el
archivo confiando en que la copia que circula por correo sea la última.

## La solución

Un sitio estático que releva al PDF como formato principal, sin renunciar a poder generarlo:
el CV es **una página más de la web** (`/es/cv`, `/en/cv`), no un archivo adjunto. Se
renderiza desde la misma fuente de datos que alimenta el resto del sitio, así que currículum
y portfolio no pueden desincronizarse — el dato se edita una vez y ambos cambian. Quien
necesite el PDF lo obtiene con *Imprimir → Guardar como PDF*, sobre reglas de impresión
propias que dejan una hoja A4 limpia.

El sitio está en español e inglés, y eso es una decisión de arquitectura, no una capa de
traducción: las rutas van prefijadas por idioma, los textos de interfaz viven en un único
diccionario y cada caso de estudio son dos archivos Markdown que comparten identificador, de
modo que el conmutador mantiene al visitante en la página equivalente en lugar de devolverlo
a la portada.

Decisiones que definen el resultado:

- **La foto solo aparece en la versión en español.** En España y Latinoamérica es costumbre
  incluirla; en mercados anglófonos se omite por convención, para reducir el sesgo en los
  procesos de selección. La asimetría es intencional.
- **Sin banner de cookies.** La analítica no guarda nada en el dispositivo del visitante,
  así que no hay nada que consentir ni una franja tapando el contenido en la primera visita.
  Además es opcional: el script solo se emite en builds de producción y con sus variables de
  entorno definidas, así que en desarrollo nunca se envían datos y, sin ellas, el sitio no
  hace ni una petición a terceros. Todo lo demás —tipografía incluida— se sirve desde el
  propio dominio.
- **Funciona sin JavaScript.** Las animaciones de entrada son una capa opcional: el
  contenido solo se oculta si el navegador confirma que puede ejecutar JS, y nunca si el
  visitante ha pedido menos movimiento en su sistema. Si el script no llega o falla, la
  página se ve entera desde el primer pintado. En total carga menos de 5 KB de JavaScript.
- **La raíz respeta el idioma del navegador.** El reparto entre `/es/` y `/en/` se resuelve
  en el servidor antes de servir HTML: sin parpadeo, sin página intermedia y sin JS.
- **Las imágenes se procesan en el build,** que genera AVIF y WebP en varios tamaños y falla
  si una ruta no existe, en lugar de servir el mismo archivo grande a todo el mundo.

## Mi rol

Diseñé y desarrollé el sitio completo, y escribo y mantengo su contenido en ambos idiomas.

- **Arquitectura de contenido:** separé los datos estructurados (perfil, experiencia,
  formación, tecnologías) de los textos largos, que viven en una colección de contenido con
  esquema validado en tiempo de build.
- **Frontend:** Astro 5 con salida estática, TypeScript en modo estricto y Tailwind CSS 4,
  con tema claro/oscuro sin parpadeo en la primera carga.
- **Internacionalización:** enrutado por idioma, diccionario de interfaz y `hreflang`
  recíproco entre las dos versiones de cada página.
- **SEO y compartir enlaces:** URL canónicas, datos estructurados schema.org y tarjetas Open
  Graph que declaran las dimensiones reales de cada imagen, más una imagen social propia
  compuesta en el centro para sobrevivir al recorte cuadrado que aplican algunos clientes de
  mensajería.
- **Despliegue:** Netlify, con build automático en cada push a `main`.

## Estado del proyecto

Está en producción en [jscalon.dev](https://jscalon.dev) y crece con cada proyecto que
documento y con cada detalle que decido pulir. Es un sitio pequeño y deliberadamente simple:
no busco impresionar por complejidad, sino dar a conocer mi trabajo con el acabado que creo
que merece.
