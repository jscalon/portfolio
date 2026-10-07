---
lang: es
title: "Cliente Retira — seguimiento de pedidos por retirar"
description: "Aplicación web interna de Febeca para registrar los pedidos que el cliente retira en la sede y seguir, pedido por pedido, cuánto plazo le queda antes de vencer."
stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Netlify"]
cover: ../../../assets/covers/pickup-orders.webp
featured: false
cv: false
order: 2
date: 2026-05-29
---

Aplicación web interna de **Febeca** para el seguimiento de los pedidos que el cliente pasa
a buscar por la sede. Vive dentro del [portal de supervisores de
ventas](/es/projects/supervisor-portal/) y comparte con él los usuarios y el acceso, pero es
otra aplicación: el portal muestra datos que llegan de fuera, y esta los crea.

## El problema

*Cliente retira* es como la empresa llama a los pedidos que el cliente pasa a buscar, en
vez de recibirlos a domicilio como la mayoría. Una vez facturado, el cliente tiene **tres
días hábiles** para retirarlo.

Antes no había seguimiento, literalmente. Los pedidos se facturaban y ni el asesor ni el
supervisor tenían forma de saber cuáles estaban esperando ser retirados, de qué clientes, ni
cuánto plazo les quedaba. Lo más parecido a un control era una hoja en Google Drive que
llevaba a mano una de las administradoras de ventas, a partir de las facturas que le
pasaba por correo el encargado de los pedidos de cliente retira.

En la práctica el seguimiento no existía, y los supervisores no miraban esa parte del
negocio: de que un pedido había vencido, nadie se enteraba hasta que ya había vencido.

## La solución

Una sola lista de pedidos pendientes, compartida por todos los que tienen algo que hacer
con ella. Dos pantallas:

- **Registro** — el encargado o el equipo de administración de ventas carga cada pedido:
  fecha de facturación, número de factura, cliente y monto, con una observación si hace
  falta.
- **Seguimiento** — los pedidos pendientes, cada uno con su cliente, su asesor, su
  supervisor, las observaciones y el tiempo que le queda. Se busca por factura, cliente o
  asesor, y se filtra por supervisor.

**El tiempo restante es la razón de ser de la pantalla.** Se cuenta en días hábiles —el
fin de semana no descuenta plazo— y cambia de unidad a medida que se acerca: días mientras
falte más de uno, horas el último día y minutos la última hora. La lista se ordena por ese
dato y por ningún otro: primero los vencidos, el más atrasado arriba.

**Dos observaciones por pedido, una de cada lado.** El encargado anota lo que sabe del
retiro —que el cliente avisó, que viene con transporte propio— y el supervisor, lo que hizo
con su cliente. Cada uno escribe en la suya y lee la del otro, así que la conversación
sobre un pedido queda pegada al pedido, en lugar de repartida entre chats y llamadas.

**El cliente se elige, no se teclea.** Al registrar, se escribe parte del código o de la
razón social y aparece la lista de coincidencias; el cliente queda elegido solo al pulsarlo,
y en su lugar se muestra su ficha, con la zona, el asesor y el supervisor. Un código mal
tecleado no puede colarse, porque nunca se da por bueno un cliente que el usuario no vio
con su nombre al lado.

![Formulario de registro en el teléfono, con el cliente ya elegido y su ficha a la vista](../../../assets/pickup-orders/register-mobile.webp)

*El registro, con datos de ejemplo. Una vez elegido el cliente, el buscador da paso a su
ficha: quien registra confirma la zona, el asesor y el supervisor antes de guardar.*

## Mi rol

Fui el **único desarrollador** de la aplicación: diseñé la interfaz y me encargué del
frontend, el modelo de datos, los permisos y el despliegue.

- **Frontend:** Next.js, TypeScript y Tailwind CSS. En el escritorio el seguimiento es una
  tabla; en el teléfono, una tarjeta por pedido, con el tiempo restante como primer dato.
  El conteo se actualiza solo mientras la pantalla está abierta.
- **Base de datos:** PostgreSQL en Supabase, con una tabla de clientes y una de pedidos.
  Registrar y eliminar pedidos solo pueden hacerlo el encargado, administración de ventas
  y la gerencia, y esa regla la impone la propia base con políticas de acceso por fila, no
  solo la interfaz.
- **Búsqueda de clientes:** una función en la base que busca sin distinguir acentos ni
  mayúsculas y devuelve solo las veinte primeras coincidencias. El maestro tiene miles de
  clientes, y bajarlo entero en cada formulario habría sido lo más caro de la pantalla.
- **Plazos:** el cálculo de días hábiles y del instante exacto de vencimiento, que es el
  final del tercer día hábil y no una hora de oficina.

![Seguimiento en el teléfono: filtros, barra de selección y la primera tarjeta, con el tiempo restante como primer dato](../../../assets/pickup-orders/tracking-mobile.webp)

*El seguimiento en el teléfono. Cada pedido es una tarjeta que abre con el tiempo
restante, porque es lo primero que hay que saber de él.*

## Estado del proyecto

Pasó a producción a finales de mayo de 2026 y es de uso diario. El encargado y
administración de ventas registran los pedidos; los supervisores y la gerencia les hacen
seguimiento.

Es una herramienta interna: está desplegada en la web y su código vive en un repositorio de
GitHub, pero por confidencialidad de la empresa este caso no incluye enlaces ni al sitio ni
al código. Por la misma razón, las capturas usan datos de ejemplo.

El cambio no fue de herramienta, sino de comportamiento. Con el plazo a la vista, el
supervisor ve qué pedidos de sus clientes están por vencer y puede avisarles antes de que se
acabe: se pasó de no hacer seguimiento a hacerlo.
