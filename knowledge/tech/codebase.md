---
type: codebase
status: draft
---

> Idioma del proyecto: **español**. Escribe este conocimiento en español. Mantén en inglés el código, los nombres de archivo, los comandos y las claves de configuración.

# Codebase

> Base técnica para una plataforma de delivery de comida multi-restaurante, organizada
> por rol (cliente, restaurante, repartidor, admin). Describe la base pretendida — no genera código.

## Repository Structure

Estructura organizada por rol, sobre React Router, con los componentes en 4 capas (misma idea que usa un starter de referencia: `ui` → `base` → `containers` → `templates`):

```
src/
  action/
    auth.ts
    restaurant.ts        # menú, disponibilidad, aprobación
    order.ts             # crear pedido, cambiar estado, comisión
    driver.ts            # asignación, actualización de entrega
    admin.ts             # aprobar restaurantes, métricas
    index.ts
  hook/
    auth/                  # useAuth (contexto), useLogin, useRegister — cruza todos los roles
    common/                # hooks genéricos reutilizables: paginación, entidad-crud, mobile, envío
    client/                # equivalente a "store": carrito, checkout, direcciones, reseñas, favoritos, listado de restaurantes
    restaurant/             # equivalente a "vendors": menú, categorías, cupones, pedidos entrantes, panel del restaurante
    driver/                 # pedidos asignados, disponibilidad, actualización de estado de entrega
    admin/                  # aprobación de restaurantes, usuarios, comisiones, métricas generales
  context/
    AuthContext.tsx       # sesión + rol, única fuente de verdad
  components/
    ui/                    # primitivos: botones, inputs, iconos — sin lógica de negocio
      icons/
    base/                  # piezas reutilizables por dominio, con algo de lógica propia
      forms/
      data-table/
      empty/
      error/
      skeleton/
      menu-items/          # equivalente a "products" pero para platillos
      restaurants/
      drivers/
      provider/
    containers/            # componentes con estado/lógica, organizados por rol
      auth/
      shared/
      client/              # equivalente a "store" del lado del cliente
      restaurant/
      driver/
      admin/
    templates/             # composiciones completas de página, por rol
      auth/
      client/
      restaurant/
      driver/
      admin/
    ProtectedRoute.tsx     # protección por rol
  layout/
    RootLayout.tsx
    ClientLayout.tsx
    RestaurantLayout.tsx
    DriverLayout.tsx
    DashboardLayout.tsx    # admin
  page/
    (cliente: Home, Restaurantes, RestaurantePage, Checkout, Pedidos)
    restaurant/            # panel de restaurante
    driver/                # panel de repartidor
    dashboard/             # panel de admin
  interfaces/
  store/                   # zustand: cart.store, etc.
  superbase/
  router/
```

## Candidate Stack

- **Frontend**: Vite + React + TypeScript, React Router (`createBrowserRouter`) con `ProtectedRoute` por rol.
- **Estado de servidor**: TanStack Query.
- **Estado de cliente**: Zustand (carrito, filtros).
- **Backend**: Supabase (Postgres + Auth + RLS + Storage), con trigger en `auth.users` para asignar rol automáticamente al registrarse.
- **Tiempo real**: Supabase Realtime (canal de cambios en la tabla `orders`), necesario porque el seguimiento de estado del pedido debe reflejarse sin recargar la página.
- **Geolocalización/distancia**: servicio externo de mapas o geocodificación (a definir) para calcular costo de envío y tiempo estimado.
- **Estilos**: Tailwind CSS.
- **Formularios**: react-hook-form + zod.

## Quality Attributes

- **Seguridad**: toda operación crítica (crear pedido, cambiar estado, calcular comisión, aprobar restaurante) se resuelve con funciones RPC de Postgres con `security definer` y validación de rol interna — nunca con escritura directa desde el cliente.
- **Consistencia de datos**: operaciones multi-tabla (crear pedido, asignar repartidor) deben ser atómicas (una sola transacción), evitando condiciones de carrera o registros huérfanos.
- **Latencia percibida**: el estado del pedido debe actualizarse casi en tiempo real para cliente, restaurante y repartidor sin necesidad de refrescar.
- **Mantenibilidad**: autenticación y autorización centralizadas en un único `AuthContext` + `ProtectedRoute` por rol, sin lógica de sesión duplicada en cada layout.

## Development Standards

- Nombres de tablas, columnas, archivos y funciones en inglés, `snake_case` en base de datos, `camelCase`/`PascalCase` en TypeScript.
- Toda lógica de negocio con impacto en dinero, stock/disponibilidad o estado de pedido va en una función RPC de Postgres, no en el cliente.
- Cada función RPC que use `security definer` debe validar explícitamente el rol del usuario (`auth.uid()` contra `user_roles`) dentro de la propia función, ya que `security definer` se salta las políticas RLS normales.
- Un único `AuthContext` expone sesión y rol; ningún componente vuelve a consultar sesión/rol por su cuenta.
- RLS activado en toda tabla con datos sensibles, sin políticas de `insert`/`update` abiertas (`with_check: true`) salvo que se valide explícitamente una condición.
- Convención de componentes en 4 capas: `ui` (primitivos sin lógica de negocio, reutilizables en cualquier rol), `base` (piezas reutilizables por dominio: formularios, tablas, estados vacíos/error/carga, tarjetas de platillo/restaurante/repartidor), `containers` (componentes con estado y lógica, organizados por rol), `templates` (composición completa de una página, por rol). Un componente sube de capa solo cuando deja de ser genérico.

## Git Strategy

GitHub Flow + Conventional Commits + SemVer (default). See `kaddo add git-strategy`.

## Initial Modules

- Autenticación y roles (cliente, restaurante, repartidor, admin) vía trigger + `user_roles`.
- Catálogo de restaurantes y menús.
- Carrito y checkout de un solo restaurante.
- Pedidos y máquina de estados (`pendiente` → ... → `entregado`).
- Asignación y panel de repartidor.
- Panel de restaurante (menú + pedidos entrantes).
- Panel de administración (aprobación de restaurantes, métricas, comisiones).
- Notificaciones de estado de pedido.

## Assumptions

- Se asume que se puede resolver autenticación y autorización con un único patrón de `AuthContext` + `ProtectedRoute` + trigger de base de datos, extendido a 4 roles.
- Se asume que Supabase Realtime es suficiente para el seguimiento de pedido en tiempo real, sin necesidad de un servidor de websockets propio.

## Open Questions

- ¿Se necesita una tabla `restaurants` separada de `user_roles`/`customers`, o el restaurante es simplemente otro tipo de perfil de usuario con su propia tabla de datos (nombre, dirección, horario)?
- ¿Cómo se modela la asignación de repartidor: automática (el sistema elige al más cercano/disponible) o manual (el restaurante o admin la asigna)?
- ¿Los tiempos de preparación por platillo se usan para calcular un ETA real, o son solo informativos en la v1?

## Quality checklist

- [x] Structure follows business and product, not a framework default.
- [x] No production code is described here — only the foundation.