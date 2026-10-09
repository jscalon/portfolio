---
lang: es
title: "Boletas de Clientes — un informe anual de compras para cada cliente"
description: "Generador del informe anual de gestión comercial de los clientes de Febeca: cuánto del portafolio activó cada uno, sus pedidos, su volumen de compras, su ahorro en descuentos y sus categorías, marcas y artículos principales, en un PDF por cliente."
stack: ["TypeScript", "Node.js", "Puppeteer", "Handlebars", "ExcelJS", "Zod"]
cover: ../../../assets/covers/customer-scorecards.webp
featured: false
cv: false
order: 7
date: 2026-08-07
---

Generador del **informe anual de gestión comercial** de los clientes de **Febeca**. A partir
de las compras del año fiscal, arma para cada cliente una boleta de una página: cuánto del
portafolio activó, cuántos pedidos hizo, cuánto compró y cuánto ahorró en descuentos, y cuáles
son las categorías, las marcas y los artículos que más se lleva.

## El problema

La relación con cada cliente estaba en los datos de ventas, pero el cliente no la veía. No
había una forma sencilla de mostrarle, en una sola hoja, cuánto le compró a la empresa durante
el año, con qué marcas trabaja y qué parte del catálogo todavía no aprovecha, que es justo la
conversación que le interesa a un vendedor.

Armar ese resumen a mano para cada cliente no era viable: la fuente es una tabla de cientos de
miles de filas, al detalle de cliente, marca, artículo y pedido, y los clientes se cuentan por
miles.

## La solución

Una herramienta de línea de comandos que lee el Excel de compras del año y genera un PDF por
cliente, todos en una sola corrida.

**Cuánto del portafolio aprovecha.** La boleta abre con las categorías, las marcas y los
artículos que el cliente activó, cada uno contra el tamaño del catálogo. Esas cifras le dicen
cuánto le queda por descubrir, y le dan al vendedor el punto de partida para ofrecerle más.

**Su año con la empresa.** Junto a ellas, el número de pedidos que hizo, su volumen de compras
y lo que ahorró en descuentos, bonificaciones y promociones. El ahorro se presenta en positivo,
como lo que el cliente ganó, y no como un descuento que la empresa cedió.

**Dónde compra.** Debajo, las categorías y las marcas que más pesan en sus compras, con su
participación y su monto —y, en cada marca, cuántos artículos distintos lleva—, y los tres
artículos de los que más unidades se llevó.

![Boleta de un cliente: seis cifras del año, top de categorías, top de marcas y top de artículos](../../../assets/customer-scorecards/scorecard.webp)

*La boleta completa, con datos de ejemplo. Todo cabe en una página, para leerse de un vistazo.*

**Cifras que cuadran con el negocio.** Las reglas del cálculo salieron de revisar la data real:

- Una categoría, una marca o un artículo cuenta como activado si su compra neta en el año es
  positiva, pero el volumen total suma todo, incluidas las bonificaciones y las devoluciones,
  que restan.
- El ahorro es el neto de las bonificaciones y de los débitos que las contrarrestan: mostrar
  solo las bonificaciones habría exagerado lo que el cliente ahorró de verdad.
- Los pedidos se cuentan solo con líneas de producto: una nota de bonificación o un cargo por
  servicio no es un pedido del cliente.
- La participación de cada marca y categoría se calcula sobre lo comprado en marcas y
  categorías reales, no sobre la compra neta: como las bonificaciones la rebajan, dividir entre
  ella hacía que una marca pasara del 100%.
- Las entradas contables y los conceptos que no son productos —bonificaciones, servicios,
  categorías sin marca— suman en el volumen, pero no aparecen en ningún top ni cuentan como
  activados. Los clientes internos no reciben boleta, y las filas que no llegan al 1% de las
  compras no se muestran: ocupaban espacio sin decir nada.

## Mi rol

Fui el **único desarrollador** de la herramienta: diseñé la boleta, definí el cálculo y me
encargué de la lectura de datos y la generación.

- **Datos:** el Excel de origen pesa unos 100 MB descomprimido, así que se lee en streaming con
  ExcelJS, una fila a la vez, para que la memoria no crezca con el archivo. Las columnas se
  ubican por el nombre del encabezado, no por su posición, así que reordenar el Excel no rompe
  la lectura. Cada fila se valida con Zod, una librería que comprueba en tiempo de ejecución que
  cada dato tenga el tipo y la forma esperados: una fila inválida se reporta y se omite, sin
  detener la corrida.
- **Render:** plantilla Handlebars convertida a PDF con Puppeteer, con un solo navegador y un
  grupo de páginas reutilizables, que es lo que hace viable generar miles de boletas. La
  tipografía va incrustada en cada PDF, así que se ve igual en cualquier equipo.
- **Formato:** separadores de miles, montos, porcentajes y unidades se aplican en un solo
  lugar, no repartidos por la plantilla, para que todas las cifras sigan la misma convención.

## Estado del proyecto

La herramienta quedó completamente lista para la aprobación de la gerencia y el envío de las
boletas a los clientes, pero dejé la empresa justo antes de ese paso.

Es una herramienta interna y su código vive en un repositorio privado, así que por
confidencialidad de la empresa este caso no incluye enlaces. Por la misma razón, las capturas
usan datos inventados: clientes, categorías, marcas, artículos y cifras de ejemplo.
