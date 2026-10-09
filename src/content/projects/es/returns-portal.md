---
lang: es
title: "Portal de Reclamos — devoluciones de clientes"
description: "Aplicación web interna de Febeca para registrar los reclamos de los clientes con su evidencia y llevar cada artículo, según el motivo, al área que decide si procede la devolución."
stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Netlify"]
cover: ../../../assets/covers/returns-portal.webp
featured: false
cv: false
order: 7
date: 2026-09-23
---

Aplicación web interna de **Febeca** para gestionar los reclamos con los que un cliente pide
una devolución. Vive dentro del [portal de supervisores de
ventas](/es/projects/supervisor-portal/), como [Cliente Retira](/es/projects/pickup-orders/),
y comparte con él los usuarios y el acceso.

## El problema

Los reclamos se gestionaban por correo. El cliente le reclamaba a su asesor; el asesor le
escribía al responsable de devoluciones con la factura, el artículo, la causa y las fotos, y
este reenviaba el caso al departamento que tenía que decidir, según el motivo: un defecto
de fábrica iba a Compras, un faltante a Control de Inventario, una mercancía que el cliente
no quería a la Gerencia de Ventas.

Un mismo reclamo podía traer artículos de varios motivos, y cada uno tenía que llegar a un
área distinta. Las fotos viajaban como adjuntos, la respuesta quedaba en un hilo de correo, y
nadie tenía a la vista cuántos reclamos estaban esperando ni quién tenía que contestar cada
uno.

El correo servía para avisar, no para gestionar. Cada asesor escribía el reclamo a su manera,
así que a veces faltaba la factura, el código del artículo o las fotos, y había que volver a
pedirlos antes de poder evaluarlo. Todo el reparto dependía de una persona que leía cada
correo y lo reenviaba a mano: si se equivocaba de área o el correo se quedaba sin leer, el
reclamo esperaba sin que nadie lo notara. Y como no había un registro único, saber en qué
estaba un caso significaba buscarlo entre hilos y preguntar, y contar cuántos reclamos hubo
en un mes, por qué motivo o cuántos procedieron no era posible sin revisar la bandeja entera.

## La solución

Un portal con tres pantallas, y cada usuario ve solo las que le corresponden:

- **Registrar** — el cliente, la factura y uno o más artículos. Cada artículo lleva su
  cantidad, su motivo y su evidencia: fotos y un video.
- **Por responder** — los artículos que le tocan a quien entra, del reclamo más antiguo al
  más reciente. Cada uno se responde con *Procede* o *No procede*, y *No procede* exige
  un comentario, que es lo que se le explica al cliente.
- **Seguimiento** — todos los reclamos con su estado, quién tiene que responder cada
  artículo pendiente y el historial de cada caso.

**Se responde por artículo, no por reclamo.** El motivo de cada artículo decide el área que lo
evalúa, así que un reclamo con un artículo defectuoso y otro que sobró se reparte solo entre
Compras y Control de Inventario, y cada área responde lo suyo. El estado del reclamo no se
guarda: se deduce de sus artículos (por responder, en revisión o respondido), así que no
puede contradecirlos.

**Quién responde lo decide una lista, no un rol.** Dentro de cada área, el artículo se asigna
por la marca —el comprador de esa marca— o por la región del cliente —el gerente de su
región—. Esa lista vive en la base de datos y se resuelve en el momento: si un comprador
cambia de marcas, se edita la lista y sus pendientes pasan solos a quien lo reemplaza, sin
tocar ningún reclamo.

![Seguimiento en el teléfono: filtros por estado y un reclamo con su artículo, su evidencia y el aprobador que le toca](../../../assets/returns-portal/tracking-mobile.webp)

*El seguimiento, con datos de ejemplo. Cada artículo pendiente dice el área que lo evalúa y
la persona que tiene que responderlo, así que nadie pregunta a quién le toca.*

**Nada se borra.** Un reclamo se puede corregir mientras ningún artículo tenga respuesta,
porque el aprobador decidió sobre esos datos. Después solo se puede anular, con un motivo, y
queda a la vista como anulado. Cada paso —registrado, corregido, respondido, anulado— queda
en un historial con quién y cuándo.

**El artículo se elige del catálogo real**, no se teclea, así que el código, la descripción y
la marca siempre son los correctos. El catálogo tiene miles de productos: el formulario lo
pide apenas se abre, en segundo plano, mientras el asesor llena el cliente y la factura, y lo
guarda en el teléfono por el día, de modo que el resto de las veces ya está ahí.

![Registro en el teléfono: el cliente ya elegido con su ficha, y un artículo del catálogo con su cantidad y su motivo](../../../assets/returns-portal/register-mobile.webp)

*El registro. Cliente y artículo se eligen de una lista y no se teclean, y cada artículo
lleva su propio motivo: es lo que decide a qué área va.*

## Mi rol

Fui el **único desarrollador** del portal: diseñé el flujo y la interfaz y me encargué del
frontend, el modelo de datos y las reglas de acceso. Los datos del ERP —el catálogo de
productos y el maestro de clientes— llegan por dos webhooks de n8n que preparó una persona
del departamento de sistemas.

- **Base de datos:** PostgreSQL en Supabase, con los reclamos, sus artículos y su historial.
  No se escribe en las tablas directamente: todo pasa por funciones de la base que validan
  el rol, el cliente, las fechas y la evidencia. Así nadie puede saltarse una regla, ni
  siquiera llamando a la base por fuera de la aplicación.
- **Permisos:** cada rol ve lo que le toca, y lo filtra la base con políticas de acceso por
  fila, no la interfaz. El asesor solo puede reclamar por clientes de su cartera, que se
  deduce de las zonas que tiene asignadas.
- **Evidencia:** las fotos se reducen y se comprimen en el teléfono antes de subirlas, de
  varios megas a unos cientos de kB. El video se valida al elegirlo —duración y peso—, para
  no descubrir al final de una subida con datos móviles que no servía. Todo va a un
  almacenamiento privado y se muestra con enlaces que caducan.
- **Los datos del cliente y del artículo se copian al reclamo** en vez de referenciarse: un
  reclamo es el documento de cómo estaba todo cuando se hizo, aunque el maestro de clientes
  cambie después.

## Estado del proyecto

No llegó a producción: dejé la empresa justo antes de lanzarlo. Quedó prácticamente
terminado —el registro, las respuestas, el seguimiento, las correcciones, la anulación y el
historial funcionaban de punta a punta— y lo que faltaba era operativo: crear los usuarios y
cargar la lista de aprobadores, es decir, quién responde cada motivo, el comprador de cada
marca y el gerente de cada región.

Es una herramienta interna: su código vive en un repositorio de GitHub, pero por
confidencialidad de la empresa este caso no incluye enlaces. Por la misma razón, las
capturas usan datos de ejemplo.
