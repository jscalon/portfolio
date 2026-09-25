---
lang: es
title: "Portal de supervisores de ventas"
description: "Aplicación web interna que reemplaza el reporte diario en Excel por un portal donde cada supervisor ve únicamente a su equipo, con semáforos de cumplimiento, cuentas por cobrar y seguimiento de concursos."
stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "PostgreSQL", "Netlify"]
cover: ../../../assets/covers/supervisor-portal.webp
featured: true
cv: true
order: 1
date: 2026-04-20
---

Portal interno para la fuerza de ventas de **Febeca**. Lo abren a diario diez supervisores,
tres gerentes y el equipo de administración de ventas.

## El problema

Cada supervisor recibía una vez al día un Excel por correo con el avance de su equipo. El
dato existía; lo que no existía era una forma razonable de leerlo.

El archivo traía **las filas de todos los supervisores**, no solo las suyas, y además los
datos de **otras empresas del grupo**, que no le servían de nada. Encontrar lo propio
significaba filtrar a mano un archivo lleno de información ajena, presentada con una
estructura poco intuitiva y difícil de leer.

Un reporte que llegaba puntual todos los días y que casi nadie aprovechaba. Y ese era solo
el reporte de ventas: otras cosas que el supervisor necesitaba saber ni siquiera tenían un
sitio donde mirarse.

## La solución

Un portal donde cada quien entra con su usuario y **ve únicamente a su equipo**. Siete
secciones:

- **Dashboard** — el avance del equipo: ventas y cobranzas contra presupuesto, cartera de
  clientes, clientes activados y renglones facturados, cada uno con su semáforo.
- **Avalúo** — las cuentas por cobrar de cada cliente, con los días de crédito vencidos.
- **Marcas** — el desempeño por marca de cada supervisor en el mes en curso.
- **Condiciones activas** — las promociones y condiciones vigentes de cada marca.
- **Pinturas** — la venta de pintura desglosada hasta el cliente, con los umbrales del
  concurso de la categoría.
- **Renglones** — el avance de cada asesor en el concurso de incentivos y cuánto le falta
  para el siguiente tramo.
- **Anuncios** — los avisos de gerencia: promociones, concursos y novedades.

**El semáforo se mide contra el mes transcurrido, no contra el presupuesto.** Saber que un
vendedor lleva el 40% de su meta no dice nada por sí solo: el día 10 va adelantado y el día
28 va mal. Cada indicador se compara con la fracción del mes que ya pasó, así que la
pantalla responde *¿vamos bien?* en lugar de *¿cuánto llevamos?*.

### Los datos no llegan listos

Ninguna de las fuentes se puede mostrar tal como viene. Son reportes pensados para otra
cosa: traen el dato crudo, con las columnas que le sirven al sistema que los generó y no
las que necesita un supervisor. Entre ese archivo y la pantalla hay un trabajo de
normalizar, cruzar fuentes distintas, aplicar las reglas del negocio y agregar por la
dimensión que toque.

Ese trabajo se hace **una sola vez, al cargar los datos**, y no en cada visita. Un paso
previo recorre las decenas de miles de filas del detalle transaccional y deja listo solo lo
que cada pantalla necesita; el navegador recibe el resultado ya agregado. Antes lo repetía
cada navegador en cada visita, para llegar siempre al mismo resultado: las páginas más
pesadas tardaban más de diez segundos en cargar. Hoy tardan menos de dos, y descargan
unos 100 kB en lugar de casi 10 MB.

### Una sección que sustituyó un chat

**Condiciones activas reemplazó a un grupo de WhatsApp.** Las promociones vigentes de cada
marca se anunciaban ahí, mezcladas con la conversación diaria de los supervisores, así que
encontrar una condición concreta era rebuscar en el chat y confiar en que nadie la hubiera
cambiado después. Ahora están en un solo sitio, ordenadas por marca, y se consultan en vez
de recordarse.

### Siete secciones, por ahora

El portal no nació con estas siete secciones. Empezó en abril solo con el Dashboard y fue
creciendo a medida que aparecían necesidades: en mayo se sumaron Marcas y Anuncios; en
junio, Avalúo; en julio, Condiciones activas; en agosto, Pinturas, y en septiembre,
Renglones.

Ninguna estaba en un plan inicial: cada una entró cuando hizo falta. La lista de hoy no es
la definitiva, sino la que hay hasta ahora. El desarrollo sigue activo, y el portal va a
seguir sumando secciones como lo ha hecho desde el principio.

## Mi rol

Soy el **único desarrollador** del proyecto: diseño de interfaz, frontend, modelo de datos
y despliegue. Cerca de 14.000 líneas de TypeScript en cinco meses, y sigue creciendo.

- **Frontend:** Next.js con App Router, TypeScript y Tailwind CSS, con prioridad de diseño
  móvil: los supervisores también lo abren desde el escritorio, pero sobre todo lo consultan
  desde el teléfono.
- **Aplicación instalable (PWA):** el portal se instala en el teléfono como una aplicación
  más, no como un acceso directo a un enlace. Queda con su ícono junto al resto de las
  aplicaciones, abre a pantalla completa sin la barra del navegador y aparece por separado
  en el selector de tareas. Deliberadamente no guarda nada en caché: una versión sin
  conexión podría mostrar cifras de otro día, y en un reporte diario eso es peor que no
  cargar.
- **Datos:** precálculo de varias fuentes ofimáticas, entre ellas un detalle transaccional
  de decenas de miles de filas, que el navegador recibe ya agregadas.
- **Autenticación y permisos:** Supabase, con dos roles principales: el supervisor, que
  solo ve los datos de los asesores de venta que supervisa, y el gerente, que ve todos los
  datos sin restricción. Los roles se guardan en PostgreSQL con políticas de acceso por
  fila, y los datos, en un almacenamiento privado que solo responde a una sesión iniciada.
  Las reglas de acceso están en un módulo aparte para que ninguna pantalla improvise la
  suya.
- **Exportaciones:** Excel y PDF de la vista filtrada, y un lote comprimido con un archivo
  por supervisor.

![Dashboard del supervisor en el teléfono: cada asesor es una tarjeta con sus indicadores en vertical](../../../assets/supervisor-portal/dashboard-mobile.webp)

*En el teléfono, la tabla deja de ser tabla: cada fila es ahora una tarjeta que se lee de
arriba abajo. Varias columnas en una pantalla angosta obligarían a desplazarse de lado para
leer.*

![Dashboard del supervisor en el escritorio: el mismo equipo en una tabla de siete columnas](../../../assets/supervisor-portal/dashboard-desktop.webp)

*El mismo equipo en el escritorio, donde vuelve a ser una tabla: ahí lo útil es comparar a
los asesores entre sí, bajando por una columna.*

## Estado del proyecto

En producción y en uso diario desde hace cinco meses, con desarrollo activo. Lo usan los
diez supervisores, la gerencia comercial y las cinco personas de administración de ventas.

Es una herramienta interna: está desplegada en la web y su código vive en un repositorio de
GitHub, pero por confidencialidad de la empresa este caso no incluye enlaces ni al sitio ni
al código. Por la misma razón, las capturas usan datos de ejemplo.

La carga de datos es **manual y diaria**, y vale la pena precisar hasta dónde. El acceso
directo al ERP por API no está disponible para el departamento, así que cada día extraigo
los reportes y los cargo.

Ahí termina lo manual. Los archivos entran **tal como salen del sistema**: no se editan, no
se reordenan, no se les da formato. Toda la limpieza, el cruce entre fuentes, los cálculos
y las agregaciones están escritos en el código y se ejecutan solos. La alternativa —montar
a mano cada día un Excel con el formato exacto que la aplicación espera— sería más lenta,
más frágil y habría que repetirla en cada carga. Dentro de la restricción que hay, es todo
lo que se podía automatizar.

Si mañana la empresa abre un acceso directo a los datos —un API, un endpoint, una conexión
a la base de datos o un backend que los devuelva en tiempo real—, solo habría que cambiar
la parte que hoy los lee. Las tablas, los filtros, los semáforos y las exportaciones
seguirían igual, porque nunca supieron de dónde venían.
