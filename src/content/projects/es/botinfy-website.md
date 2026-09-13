---
lang: es
title: "Sitio web corporativo de Botinfy"
description: "Rediseño y desarrollo del sitio web oficial de Botinfy, una empresa de desarrollo de software, para reemplazar una web obsoleta por una presencia moderna y profesional acorde al nivel que se espera del sector."
stack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Figma"]
cover: ../../../assets/covers/botinfy.webp
liveUrl: https://botinfy.com
featured: true
order: 1
date: 2026-04-01
---

Rediseño completo del sitio web oficial de **Botinfy**, una empresa de desarrollo de
software.

## El problema

El sitio anterior estaba construido con la misma tecnología que el nuevo, así que el
problema no era técnico sino de **diseño y de impacto**: resultaba básico y no transmitía
profesionalidad. Para una empresa cuyo negocio es *desarrollar software*, la web oficial es
una carta de presentación crítica — quien llega esperando trabajo bien hecho y encuentra un
sitio sin acabado ya tiene su respuesta antes de leer una sola línea.

## La solución

Un sitio **multipágina de siete páginas** —entre ellas Inicio, Nosotros, Productos, Empleo,
Políticas y Términos— con una identidad visual mucho más fuerte y la experiencia cuidada en
los tres tamaños que contempla el diseño: móvil, tablet y escritorio.

Decisiones que definen el resultado:

- **Movimiento con intención.** Las animaciones están construidas con GSAP: carruseles de
  imágenes y efectos de luz sobre títulos y botones. Dan presencia a la marca sin estorbar
  la lectura, que es lo que separa una web con carácter de una web inquieta.
- **El móvil no es una adaptación heredada.** El diseño existente cubría únicamente
  escritorio, así que la versión móvil se diseñó desde cero antes de programarla, en lugar
  de dejar que el escritorio se encogiera como pudiera.
- **Imágenes optimizadas** con el componente `Image` de Next.js, que entrega a cada
  dispositivo el tamaño y el formato que le corresponden en vez del mismo archivo a todos.

## Mi rol

Desarrollé el frontend del sitio y diseñé por completo la versión móvil. El desarrollo
llevó un mes.

- **Diseño (UI):** la versión de escritorio partía de una base hecha por el equipo, sobre la
  que aporté ideas y ajustes; **la versión móvil la diseñé entera yo** en Figma, porque no
  existía. La guía de marca ya estaba definida y trabajé dentro de ella.
- **Frontend:** Next.js, TypeScript y Tailwind CSS, con tres puntos de ruptura —móvil,
  tablet y escritorio.
- **Animación:** GSAP para los carruseles y los efectos de luz.

## Estado del proyecto

El sitio está en producción en [botinfy.com](https://botinfy.com), aunque ya no es
exactamente el que entregué: la empresa reestructuró parte del contenido y las páginas que
describían los agentes que ofrecía ya no existen. **Inicio y Nosotros siguen prácticamente
idénticas a como las desarrollé**, y son las que mejor representan el trabajo descrito aquí.
