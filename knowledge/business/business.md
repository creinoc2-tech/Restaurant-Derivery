---
type: business
status: draft
---

> Idioma del proyecto: **español**. Escribe este conocimiento en español. Mantén en inglés el código, los nombres de archivo, los comandos y las claves de configuración.

# Business

> Plataforma de pedidos y entrega de comida a domicilio, con restaurantes, clientes y
> repartidores. Refinar con el business-agent conforme avance el proyecto.

## Problem

Conectar a tres partes que hoy operan por separado: **clientes** que quieren pedir comida sin llamar por teléfono a cada restaurante, **restaurantes** que no tienen forma propia de recibir pedidos en línea ni de gestionar su menú digitalmente, y **repartidores** que necesitan trabajo bajo demanda para hacer las entregas. Sin una plataforma que los una, el restaurante pierde ventas fuera de su local físico, el cliente pierde tiempo pidiendo por teléfono sin ver el menú actualizado ni el estado del pedido, y no existe un mecanismo para asignar y dar seguimiento a la entrega.

## Users

- **Cliente**: navega restaurantes cercanos, arma un pedido de un solo restaurante a la vez, paga, y sigue el estado de su pedido hasta que le llega.
- **Restaurante (vendedor)**: administra su propio menú (platillos, precios, disponibilidad, tiempo de preparación), recibe pedidos entrantes y los marca como confirmados/en preparación/listos para recoger.
- **Repartidor**: recibe pedidos asignados, actualiza el estado de la entrega (recogido, en camino, entregado), gestiona su disponibilidad.
- **Administrador de la plataforma**: aprueba nuevos restaurantes, supervisa la operación general, gestiona comisiones y resuelve disputas entre las partes.

## Value Proposition

Una sola plataforma donde el cliente puede pedir comida de múltiples restaurantes sin llamar por teléfono, con seguimiento del pedido de principio a fin; el restaurante obtiene un canal de ventas en línea y un panel de gestión de pedidos sin tener que construir su propio sistema; el repartidor consigue entregas asignadas sin depender de un empleador fijo; y el operador de la plataforma monetiza cobrando una comisión por pedido completado.

## Business Rules

- Un pedido pertenece a **un solo restaurante**: el cliente no puede mezclar platillos de restaurantes distintos en el mismo carrito/pedido.
- Cada pedido avanza por un ciclo de estados fijo: `pendiente → confirmado → en preparación → listo para recoger → recogido → en camino → entregado` (con `cancelado` como salida posible en cualquier punto antes de "en camino").
- Solo el restaurante correspondiente puede cambiar el estado de un pedido hasta "listo para recoger"; de ahí en adelante, solo el repartidor asignado puede avanzarlo.
- El costo de envío se calcula en función de la distancia entre el restaurante y la dirección de entrega, no es un monto fijo.
- La plataforma cobra una comisión (porcentaje) sobre cada pedido completado, descontada del pago que recibe el restaurante.
- Un repartidor solo puede tener asignado un pedido activo a la vez (hasta confirmarlo como entregado).
- Las reseñas de un restaurante solo se pueden dejar sobre pedidos ya marcados como "entregado".
- Los cupones/promociones pueden ser específicos de un restaurante o aplicar a nivel de toda la plataforma.

## Constraints

- **Backend como servicio**: la plataforma depende de servicios administrados (base de datos, autenticación, almacenamiento) en vez de un backend propio construido desde cero.
- **Un solo idioma y una sola moneda** en la versión inicial (español, USD o moneda local a definir).
- **Lógica crítica del lado del servidor**: cualquier operación que involucre dinero, disponibilidad de platillos o cambio de estado de pedido debe resolverse de forma atómica y validada en el servidor, no con múltiples pasos sueltos que dependan del cliente.
- **Geolocalización necesaria**: calcular distancia/tiempo estimado requiere coordenadas de restaurante y del cliente; implica depender de un servicio externo de mapas/geocodificación (a definir) o de que el navegador provea la ubicación.

## Assumptions

- Se asume que la plataforma opera en una sola ciudad/región al inicio, no a nivel nacional o multi-país.
- Se asume que el pago se procesa por tarjeta o efectivo contra entrega (no se ha definido pasarela de pago); si se requiere pago en línea, se evaluará una integración que permita repartir el cobro entre plataforma y restaurante.
- Se asume que el repartidor usa la misma aplicación web (no una app nativa separada) para la versión inicial.
- Se asume que el seguimiento de la entrega es por **estados manuales** (el repartidor marca "recogido", "en camino", "entregado"), no por rastreo GPS en vivo en un mapa.

## Open Questions

- ¿Cómo se calculará la distancia/tiempo estimado de entrega? ¿Se integra un servicio de mapas (Google Maps, Mapbox) o se usa una aproximación más simple al inicio?
- ¿Habrá pago en línea (tarjeta) desde el lanzamiento, o se arranca solo con efectivo contra entrega?
- ¿Cómo se le paga al restaurante y al repartidor su parte (payout manual, transferencia periódica, o una integración automática de pagos)?
- ¿Un repartidor puede rechazar un pedido asignado, o se le asigna de forma obligatoria?
- ¿Habrá app móvil nativa para repartidores en el futuro, o se mantiene todo como aplicación web?

## Quality checklist

- [x] The problem is stated without assuming the solution.
- [x] Users have goals, not just labels.