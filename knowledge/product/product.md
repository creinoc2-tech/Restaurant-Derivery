---
type: product
status: draft
---

> Idioma del proyecto: **español**. Escribe este conocimiento en español. Mantén en inglés el código, los nombres de archivo, los comandos y las claves de configuración.

# Product

> Producto de delivery de comida multi-restaurante. Refinar con el
> bootstrap-agent / capability-agent.

## Product Brief

Una aplicación web de delivery de comida con **cuatro roles**: cliente, restaurante, repartidor y administrador. El cliente navega restaurantes y arma un pedido de un solo restaurante; el restaurante gestiona su menú y sus pedidos entrantes desde un panel propio; el repartidor recibe pedidos asignados y actualiza su estado hasta la entrega; el administrador aprueba restaurantes nuevos y supervisa la operación general.

## Capabilities

- Catálogo de restaurantes con su menú (platillos, precio, categoría, disponibilidad, tiempo de preparación).
- Carrito y checkout limitado a un solo restaurante por pedido.
- Cálculo de costo de envío según distancia entre restaurante y dirección de entrega.
- Seguimiento del estado del pedido en tiempo real (pendiente → confirmado → en preparación → listo → recogido → en camino → entregado).
- Panel de restaurante: gestión de menú (alta/edición/baja de platillos) y bandeja de pedidos entrantes con cambio de estado.
- Panel de repartidor: lista de pedidos asignados, cambio de estado de la entrega, disponibilidad propia (activo/inactivo).
- Panel de administración: aprobación de restaurantes nuevos, listado general de pedidos y comisiones, gestión de usuarios/roles.
- Autenticación con roles (`cliente`, `restaurante`, `repartidor`, `admin`) resuelta automáticamente al registrarse.
- Cupones/promociones, por restaurante o de toda la plataforma.
- Reseñas de restaurante, habilitadas solo sobre pedidos ya entregados.
- Notificaciones de cambio de estado del pedido al cliente.

## Scope

- Aplicación web responsiva (no app móvil nativa) para los cuatro roles.
- Un solo pedido = un solo restaurante (no carrito multi-restaurante).
- Seguimiento de pedido por estados manuales, actualizados por restaurante/repartidor.
- Panel básico de administración: aprobar/suspender restaurantes, ver pedidos y comisiones.
- Cálculo de costo de envío por distancia (con un servicio de mapas/geocodificación a definir).
- Autenticación y autorización por rol, con lógica crítica (creación de pedido, cambio de estado, cálculo de comisión) resuelta en funciones RPC de Postgres, no en el cliente.

## Out of Scope

- Aplicaciones móviles nativas (iOS/Android) — la v1 es solo web.
- Rastreo GPS en vivo del repartidor sobre un mapa — la v1 usa solo actualización manual de estados.
- Pagos y payouts automatizados entre plataforma, restaurante y repartidor (se define aparte si se integra una pasarela de pagos con reparto automático).
- Soporte multi-idioma y multi-moneda.
- Operación en más de una ciudad/región simultáneamente.
- Sistema de chat en vivo entre cliente y repartidor/restaurante.

## Success Criteria

- Un cliente puede completar un pedido de principio a fin (elegir restaurante, armar carrito, pagar, ver el estado) sin errores.
- Un restaurante puede gestionar su menú y ver/actualizar sus pedidos entrantes sin ayuda externa.
- Un repartidor puede ver sus pedidos asignados y actualizar el estado de la entrega correctamente.
- Un administrador puede aprobar un restaurante nuevo y ver el total de comisiones generadas.
- Ninguna operación crítica (crear pedido, cambiar stock/disponibilidad, cambiar estado) se resuelve con múltiples llamadas sueltas desde el cliente sin transacción — todas pasan por RPC.

## Assumptions

- Se asume una sola ciudad/región de operación para la v1.
- Se asume que el catálogo de "productos" son platillos con disponibilidad diaria simple (sí/no), no inventario complejo por ingrediente.
- Se asume que el repartidor usa la misma aplicación web, con una vista propia según su rol.

## Open Questions

- ¿Qué tan detallado debe ser el panel de administración en la v1 (solo aprobar restaurantes y ver métricas, o también resolver disputas)?
- ¿Se necesita un límite de radio de entrega por restaurante (ej. solo entrega a X km)?
- ¿Los repartidores se dan de alta libremente o requieren aprobación del administrador, igual que los restaurantes?
- ¿Habrá niveles de restaurante destacado/patrocinado desde la v1?

## Quality checklist

- [x] The product fits in one page.
- [x] Scope and out-of-scope are explicit.