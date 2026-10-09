---
lang: es
title: "Cotizador Mayoreo — cotizaciones con precio mínimo en tiempo real"
description: "Aplicación web de cotización para las cinco empresas del Grupo Mayoreo: cotizaciones multiproducto con descuentos, flete y validación contra el precio mínimo en tiempo real, exportables a PDF, Excel o texto."
stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "PostgreSQL", "Google Cloud", "Vercel"]
cover: ../../../assets/covers/quoting-tool.webp
featured: false
cv: false
order: 4
date: 2026-06-15
---

Aplicación web de cotización para las cinco empresas del **Grupo Mayoreo** —Febeca, Cofersa,
Sillaca, Beval y Mundipartes—, repartidas entre Venezuela, Costa Rica y Colombia. Empezó como
el cotizador de Febeca y terminó siendo una sola aplicación para todo el grupo: cada empresa
es un módulo, con su catálogo, sus clientes, su moneda y sus listas de precios.

## El problema

Para cotizar, el vendedor consultaba los precios en *Catálogo de productos*, una aplicación
que solo servía para eso: mostrar el precio de un artículo. Había que buscar los productos
uno por uno y anotar cada precio en otro sitio, porque el catálogo no armaba ninguna
cotización. Tampoco permitía aplicar los descuentos de la negociación ni el flete, así que
el precio final se calculaba a mano, aparte, y menos aún decía si ese resultado quedaba por
encima del precio mínimo aceptado. Además mostraba una sola lista de precios.

Armar una cotización era, en la práctica, hacer cuentas a mano, y el vendedor no sabía
mientras negociaba si el precio al que estaba llegando era aceptable para la empresa: eso se
descubría después, cuando ya se lo había ofrecido al cliente.

Y cada empresa del grupo resolvía esto por su cuenta, con herramientas distintas o sin
ninguna.

## La solución

Una aplicación donde se arma la cotización producto por producto y **se sabe mientras se
negocia si el precio se puede aceptar**, no después.

- **Búsqueda de productos** por código, descripción o marca, y **carga masiva**: se pega una
  lista de códigos y la aplicación agrega los que encuentra y avisa cuáles están duplicados,
  cuáles no existen y cuáles son ambiguos.
- **Varias listas de precios**: se elige con cuál se cotiza, y todos los cálculos se
  rehacen sobre ella.
- **Cada producto es una tarjeta** con su precio de lista y los campos de la negociación:
  cinco descuentos en cascada —AFV, comercial, financiero, comisión y pronto pago— más el
  flete. Debajo, el resultado: el precio calculado junto al precio mínimo del artículo y el
  descuento máximo que admite, y el importe.
- **Un consolidado fijo** a un lado, con unidades, subtotal y total con impuestos, que se
  recalcula con cada cambio.
- **Exportación en PDF, Excel o texto**, este último para pegar directamente en WhatsApp o en
  un correo. El PDF sale a nombre del cliente si se elige uno.

![Cotización en PDF con la marca de la empresa, el cliente, cinco productos y los totales con impuesto](../../../assets/quoting-tool/quote-pdf.webp)

*El PDF, con datos de ejemplo. Sale con la marca de la empresa que cotiza y solo con lo que
le corresponde al cliente: precios ya negociados, sin costos ni descuentos internos.*

**El semáforo responde lo que importa en la negociación: si se puede vender a ese precio.**
Cada artículo trae del catálogo su precio mínimo, y la tarjeta lo pone al lado del precio
calculado, que es el número al que limita. El consolidado se evalúa sobre el paquete completo,
de modo que un artículo holgado puede compensar a otro más ajustado —es como se negocia—,
mientras cada tarjeta sigue marcando en rojo su propio piso. Si se intenta exportar una
cotización por debajo de lo aceptable, la aplicación pide confirmarlo antes.

![Tarjeta de un producto con los cinco descuentos y el flete llenos, y el precio calculado por debajo del precio mínimo](../../../assets/quoting-tool/price-floor-card.webp)

*Una línea en pesos colombianos. Con los descuentos aplicados, el precio calculado queda
apenas por debajo del mínimo, y el semáforo lo marca en rojo antes de que llegue al cliente.*

**Cada rol ve lo que necesita para decidir.** Los supervisores negocian únicamente en
términos de precio mínimo y descuento máximo, que es lo que la empresa quiere que se discuta
con el cliente. Los gerentes, además, ven costo, utilidad y margen, igual que el
administrador. El rol marca también los clientes disponibles: el supervisor solo encuentra
los de sus asesores, y el gerente, los de toda la empresa.

**Cada empresa es un dato, no un desarrollo aparte.** Moneda, impuesto, listas de precios,
colores, logo y membrete del PDF viven en un registro de empresas, y las cinco leen su
catálogo con el mismo formato. Sumar una empresa es agregar una entrada a ese registro; el
resto de la aplicación se adapta sola. La aplicación formatea dólares, colones y pesos
colombianos, y cada módulo se viste con los colores de su empresa.

**Los roles son por empresa, no por usuario.** Una misma persona puede ser gerente en una
empresa, supervisor en otra y no tener acceso a una tercera. Por eso primero se inicia sesión
—con Google, limitado a las cuentas de las empresas del grupo— y después se elige la empresa,
entre las que a esa persona le corresponden. Cambiar de empresa no exige cerrar sesión: cada
una es un módulo de la misma aplicación, y pasar de una a otra es cuestión de un clic.

![Selector de empresa tras iniciar sesión, con las cinco empresas del grupo y el rol del usuario en cada una](../../../assets/quoting-tool/company-selector.webp)

*Después de iniciar sesión, cada empresa a la que el usuario tiene acceso, con su rol en
ella. Desde cualquier módulo se vuelve aquí sin cerrar sesión.*

## Mi rol

Fui el **único desarrollador** del cotizador: diseñé la interfaz y me encargué del frontend,
el modelo de datos, la autenticación y el despliegue. Los catálogos y los maestros de
clientes de las cinco empresas llegan por webhooks de n8n que preparó una persona del
departamento de sistemas y que devuelven los datos del ERP.

- **Frontend:** Next.js con exportación estática, TypeScript y Tailwind CSS. Los totales no
  se guardan: se derivan de las líneas, así que no pueden quedar desactualizados.
- **Cálculo de precios:** un único módulo del que salen la pantalla, el consolidado y las tres
  exportaciones, así que el PDF, el Excel y lo que ve el vendedor no pueden discrepar en un
  precio.
- **Catálogo:** se consulta en cada carga, para cotizar con los precios del momento, y pasa
  por un filtro que descarta lo que no es vendible —exhibidores, material promocional,
  artículos con costo o precio en cero— antes de que ensucie el semáforo.
- **Autenticación y permisos:** Supabase con inicio de sesión de Google, configurado en Google
  Cloud y limitado a los dominios del grupo, y membresías por empresa con su rol en cada una.
- **Exportaciones:** PDF con la marca de cada empresa, Excel y texto plano, con el mismo
  contenido y el mismo orden en los tres.
- **Pruebas:** 128 pruebas automatizadas sobre el cálculo de precios, el mapeo del catálogo y
  de los clientes, los permisos por rol y el registro de empresas: lo que, si falla, no se
  nota a simple vista.

## Estado del proyecto

En producción desde junio de 2026. Arrancó con Febeca, y a la gerencia le gustó tanto el
resultado que decidió llevarlo al resto del grupo: una a una se fueron sumando las otras
cuatro empresas, y las cinco lo usan a diario.

Es una herramienta interna: está desplegada en la web y su código vive en un repositorio de
GitHub, pero por confidencialidad de la empresa este caso no incluye enlaces ni al sitio ni
al código. Por la misma razón, las capturas usan datos de ejemplo.
