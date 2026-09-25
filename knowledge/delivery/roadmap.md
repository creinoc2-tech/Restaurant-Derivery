---
type: roadmap
id: roadmap
status: draft
generated_by: roadmap-agent
knowledge_level: K3
updated_at: 2026-09-23
---

# Roadmap

Generado con el Roadmap Agent de Kaddo. Las iniciativas y work items de abajo son **candidatos**
para revisión humana — no compromisos finales.

## Summary

Construir la v1 web del delivery multi-restaurante por capas: primero la base técnica y un catálogo
navegable con datos locales, luego backend (Supabase), autenticación por rol, flujo de pedido del cliente
y, por último, los paneles de restaurante, repartidor y administración.

El bloque **Now** (RM-001 a RM-004, candidatos 001–009) está listo para materializarse como Work Items en
`draft/`. El bloque **Next/Later** (RM-005 a RM-008, candidatos 010–018) queda como candidatos porque depende
de preguntas abiertas todavía sin resolver (mapas, pago, asignación de repartidor, alcance del admin).

## Assumptions

- El repo `frontend` parte de un starter de Vite + React 19 + TypeScript; `src/App.tsx` hoy renderiza un `<div>` vacío, pero `src/App.css` ya contiene estilos del catálogo (topbar, hero, categorías, buscador, tarjetas de restaurante). Falta el markup, los datos y la lógica.
- El stack candidato de `knowledge/tech/codebase.md` (React Router, TanStack Query, Zustand, Tailwind, react-hook-form + zod, Supabase) es la dirección, pero **todavía no está instalado**: `package.json` solo tiene React y Vite.
- Supabase, la autenticación y el proveedor de mapas siguen siendo decisiones de implementación abiertas.
- Pago en la v1: efectivo contra entrega, sin pasarela (asunción de `business.md`).
- Una sola ciudad/región, un solo idioma (español) y un solo pedido = un solo restaurante.

## Roadmap Principles

- Empezar con una rebanada pequeña orientada al cliente antes de ampliar a restaurante, repartidor y admin.
- La lógica con impacto en dinero, disponibilidad o estado de pedido vive en RPC de Postgres, nunca en el cliente.
- Cada Work Item debe poder probarse con un comando o un paso manual concreto.
- Validar el flujo de producto antes de agregar tiempo real y automatizaciones.
- No materializar work items cuyas preguntas abiertas cambian su alcance.

## Initiatives

### RM-001: Customer Delivery Foundation

**Goal:** Establecer la experiencia inicial del cliente para descubrir restaurantes y entender el flujo de pedido.

**Related capabilities:** Catálogo de restaurantes, menú del restaurante, base de aplicación con roles.

**Project area / domain:** Frontend — experiencia del cliente.

**Impact:** High

**Risk:** Low

**Suggested Knowledge Level:** K2

**Dependencies:** WI-CANDIDATE-003 (dependencias y estructura base) y WI-CANDIDATE-005 (router: el catálogo se monta en `/` y el detalle en `/restaurantes/:id`). El contrato de backend es una asunción: se usan datos locales representativos.

**Why this comes now:** `App.css` ya tiene el diseño del catálogo, así que es la forma más barata de tener una primera pantalla navegable y validar la estructura antes de conectar backend. Va después de RM-002 porque necesita router y dependencias base.

**Candidate Work Items:**

- WI-CANDIDATE-001: Construir el catálogo de restaurantes del cliente (shell inicial)
  - type: feature
  - suggested knowledge level: K2
  - expected value: Primera experiencia navegable del producto, reutilizando el CSS ya existente y validando el punto de entrada del cliente.
  - notes: Datos locales tipados; sin autenticación, sin persistencia y sin backend.
- WI-CANDIDATE-002: Construir la página de detalle de restaurante con su menú
  - type: feature
  - suggested knowledge level: K2
  - expected value: Permite validar cómo se presentan platillos, precio, categoría, disponibilidad y tiempo de preparación antes de implementar el carrito.
  - notes: Ruta `/restaurantes/:id` con datos locales; sin botón de agregar al carrito funcional (eso es WI-CANDIDATE-010).

**Open questions:**

- ¿Qué información debe mostrar la tarjeta de restaurante en la primera versión (calificación, tiempo de entrega, costo de envío, etiqueta)?
- El candidato original incluía o no el detalle con menú: se propone separarlo en WI-CANDIDATE-002. ¿Se confirma?

---

### RM-002: Technical Foundation

**Goal:** Convertir el starter de Vite en la base del proyecto: dependencias del stack, estructura por capas, pruebas y router con layouts por rol.

**Related capabilities:** Base de aplicación con roles; estándares de desarrollo de `codebase.md`.

**Project area / domain:** Frontend — plataforma técnica.

**Impact:** High

**Risk:** Low

**Suggested Knowledge Level:** K2

**Dependencies:** Ninguna.

**Why this comes now:** Hoy no hay router, ni pruebas, ni estructura de carpetas; el scan reporta "No test directory detected". Todo lo demás se apoya en esto.

**Candidate Work Items:**

- WI-CANDIDATE-003: Instalar dependencias base y crear la estructura de carpetas por capas
  - type: chore
  - suggested knowledge level: K2
  - expected value: Un solo punto de partida acordado (stack + carpetas + alias) para que los siguientes Work Items no discutan estructura.
  - notes: Instalar solo lo necesario ahora (router, Tailwind, TanStack Query, Zustand, react-hook-form + zod); `supabase-js` va en WI-CANDIDATE-007.
- WI-CANDIDATE-004: Configurar pruebas con Vitest y Testing Library
  - type: chore
  - suggested knowledge level: K1
  - expected value: Cerrar la brecha de estrategia de pruebas detectada por `kaddo scan` y poder validar cada Work Item con `npm test`.
  - notes: Incluye un script `test` y una prueba de humo; sin cobertura mínima obligatoria todavía.
- WI-CANDIDATE-005: Crear router y layouts por rol (cliente, restaurante, repartidor, admin)
  - type: feature
  - suggested knowledge level: K2
  - expected value: Esqueleto navegable con rutas y layouts separados por rol, listo para conectar la protección real en RM-004.
  - notes: `ProtectedRoute` queda como placeholder que deja pasar todo; la lógica de sesión y rol es WI-CANDIDATE-009.

**Open questions:**

- ¿Se instala el stack completo ahora o solo lo que cada Work Item necesita? (se propone lo segundo)
- ¿Se mantiene `npm` como gestor? (hay `package-lock.json`, se asume que sí)

---

### RM-003: Backend and Data Foundation (Supabase)

**Goal:** Definir el modelo de datos y dejar Supabase conectado, con esquema inicial y seguridad (RLS) para roles, restaurantes y menú.

**Related capabilities:** Autenticación con roles; catálogo de restaurantes con menú; lógica crítica en RPC de Postgres.

**Project area / domain:** Backend como servicio — datos y seguridad.

**Impact:** High

**Risk:** High

**Suggested Knowledge Level:** K3

**Dependencies:** WI-CANDIDATE-003 (estructura base). Decisiones abiertas de modelado de `codebase.md`.

**Why this comes now:** Es el mayor riesgo técnico del proyecto (RLS, RPC `security definer`) y conviene decidirlo antes de escribir pantallas que dependan de datos reales.

**Candidate Work Items:**

- WI-CANDIDATE-006: Spike — modelo de datos y decisiones abiertas de Supabase
  - type: spike
  - suggested knowledge level: K3
  - expected value: Resolver el modelo (tabla `restaurants` vs perfil, asignación de repartidor, radio de entrega) y producir ADRs candidatos antes de crear migraciones.
  - notes: Salida esperada: documento de decisión y ADRs propuestos; sin migraciones ni código de aplicación.
- WI-CANDIDATE-007: Configurar cliente Supabase y variables de entorno
  - type: chore
  - suggested knowledge level: K2
  - expected value: Conexión al backend con manejo seguro de credenciales y tipado del cliente.
  - notes: Solo la clave anónima en el frontend; `.env.local` ya está cubierto por `*.local` en `.gitignore`.
- WI-CANDIDATE-008: Migraciones iniciales de roles, restaurantes y menú con RLS
  - type: feature
  - suggested knowledge level: K3
  - expected value: Base de datos con seguridad por rol verificada, lista para que auth y catálogo lean datos reales.
  - notes: Sin tablas de pedidos todavía; el trigger de `auth.users` que asigna rol se define aquí.

**Open questions:**

- ¿Se necesita una tabla `restaurants` separada de `user_roles`/`customers`?
- ¿Dónde viven las migraciones: en este repo (`supabase/`) o en un repo/servicio aparte? Además, `codebase.md` menciona una carpeta `superbase/`: ¿es un typo de `supabase/`?
- ¿Se necesita un límite de radio de entrega por restaurante?

---

### RM-004: Authentication and Roles

**Goal:** Que un usuario pueda registrarse e iniciar sesión, y que la aplicación resuelva su rol y restrinja rutas por rol.

**Related capabilities:** Autenticación con roles (`cliente`, `restaurante`, `repartidor`, `admin`).

**Project area / domain:** Frontend + Supabase Auth.

**Impact:** High

**Risk:** Medium

**Suggested Knowledge Level:** K3

**Dependencies:** WI-CANDIDATE-005 (router y layouts); WI-CANDIDATE-007 (cliente Supabase); WI-CANDIDATE-008 (roles y RLS).

**Why this comes now:** Los paneles y el flujo de pedido necesitan saber quién es el usuario y qué rol tiene.

**Candidate Work Items:**

- WI-CANDIDATE-009: Implementar AuthContext, login/registro y ProtectedRoute por rol
  - type: feature
  - suggested knowledge level: K3
  - expected value: Sesión y rol con una única fuente de verdad (`AuthContext`) y rutas protegidas por rol.
  - notes: Un solo `AuthContext`; ningún componente vuelve a consultar sesión o rol por su cuenta.

**Open questions:**

- ¿Los repartidores se dan de alta libremente o requieren aprobación del admin, igual que los restaurantes?
- ¿El registro de restaurante crea el perfil en estado "pendiente de aprobación"?

---

### RM-005: Customer Order Flow

**Goal:** Que el cliente arme un pedido de un solo restaurante, lo confirme y siga su estado.

**Related capabilities:** Carrito y checkout de un solo restaurante; cálculo de costo de envío; seguimiento del pedido en tiempo real.

**Project area / domain:** Pedidos — cliente.

**Impact:** High

**Risk:** High

**Suggested Knowledge Level:** K3

**Dependencies:** RM-001, RM-004. WI-CANDIDATE-011 bloquea el cálculo de envío de WI-CANDIDATE-012.

**Why this comes now:** Es el valor central del producto, pero depende de auth, datos reales y de decidir mapas y pago.

**Candidate Work Items:**

- WI-CANDIDATE-010: Carrito de un solo restaurante con Zustand
  - type: feature
  - suggested knowledge level: K2
  - expected value: El cliente puede agregar platillos y ver el total, con la regla de un restaurante por pedido.
  - notes: Estado solo en cliente; sin crear pedido todavía.
- WI-CANDIDATE-011: Spike — proveedor de mapas y cálculo de costo de envío
  - type: spike
  - suggested knowledge level: K3
  - expected value: Decidir cómo se calcula distancia y costo de envío (Google Maps, Mapbox o aproximación simple) y qué implica en costo y privacidad.
  - notes: Salida: ADR candidato y comparación de opciones; sin integración.
- WI-CANDIDATE-012: Checkout y creación de pedido mediante RPC atómica
  - type: feature
  - suggested knowledge level: K3
  - expected value: Un pedido se crea en una sola transacción validada en el servidor, con costo de envío y estado inicial `pendiente`.
  - notes: Pago en efectivo contra entrega (asunción); sin pasarela.
- WI-CANDIDATE-013: Seguimiento del estado del pedido en tiempo real
  - type: feature
  - suggested knowledge level: K3
  - expected value: El cliente ve los cambios de estado sin recargar la página.
  - notes: Supabase Realtime sobre la tabla `orders`.

**Open questions:**

- ¿Habrá pago en línea desde el lanzamiento o solo efectivo contra entrega?
- ¿Cómo se calcula la distancia/tiempo estimado de entrega?

---

### RM-006: Restaurant Panel

**Goal:** Que un restaurante gestione su menú y sus pedidos entrantes sin ayuda externa.

**Related capabilities:** Panel de restaurante; gestión de menú; bandeja de pedidos con cambio de estado.

**Project area / domain:** Frontend — restaurante.

**Impact:** High

**Risk:** Medium

**Suggested Knowledge Level:** K3

**Dependencies:** RM-004. WI-CANDIDATE-012 para la bandeja de pedidos.

**Why this comes now:** Sin restaurantes que carguen su menú, el catálogo no puede pasar de datos locales a datos reales.

**Candidate Work Items:**

- WI-CANDIDATE-014: Gestión de menú del restaurante (alta, edición y baja de platillos)
  - type: feature
  - suggested knowledge level: K2
  - expected value: El restaurante mantiene su propio menú y disponibilidad diaria.
  - notes: Solo el restaurante dueño puede editar su menú (RLS).
- WI-CANDIDATE-015: Bandeja de pedidos entrantes con cambio de estado
  - type: feature
  - suggested knowledge level: K3
  - expected value: El restaurante confirma, prepara y marca listos los pedidos hasta "listo para recoger".
  - notes: Cambio de estado mediante RPC con validación de rol.

**Open questions:**

- ¿Un restaurante puede tener varios usuarios (dueño y empleados)?

---

### RM-007: Driver Panel

**Goal:** Que un repartidor vea sus pedidos asignados y avance el estado de la entrega.

**Related capabilities:** Panel de repartidor; disponibilidad activo/inactivo.

**Project area / domain:** Frontend — repartidor.

**Impact:** Medium

**Risk:** Medium

**Suggested Knowledge Level:** K3

**Dependencies:** WI-CANDIDATE-015.

**Why this comes now:** Cierra el ciclo del pedido (recogido → en camino → entregado), pero la asignación no está definida.

**Candidate Work Items:**

- WI-CANDIDATE-016: Panel de repartidor con pedidos asignados y actualización de estado
  - type: feature
  - suggested knowledge level: K3
  - expected value: El repartidor puede completar una entrega de principio a fin.
  - notes: Un repartidor solo puede tener un pedido activo a la vez.

**Open questions:**

- ¿La asignación es automática o manual (restaurante o admin)?
- ¿Un repartidor puede rechazar un pedido asignado?

---

### RM-008: Admin Panel

**Goal:** Que el administrador apruebe restaurantes nuevos y vea pedidos y comisiones.

**Related capabilities:** Panel de administración; comisiones; gestión de usuarios y roles.

**Project area / domain:** Frontend — administración.

**Impact:** Medium

**Risk:** Medium

**Suggested Knowledge Level:** K3

**Dependencies:** RM-004; WI-CANDIDATE-012 para el listado de pedidos y comisiones.

**Why this comes now:** Es necesario para que restaurantes nuevos puedan operar, pero su alcance (métricas, disputas) sigue abierto.

**Candidate Work Items:**

- WI-CANDIDATE-017: Aprobación y suspensión de restaurantes
  - type: feature
  - suggested knowledge level: K2
  - expected value: El administrador controla qué restaurantes aparecen en el catálogo.
  - notes: Cambio de estado mediante RPC con validación de rol admin.
- WI-CANDIDATE-018: Listado general de pedidos y cálculo de comisiones
  - type: feature
  - suggested knowledge level: K3
  - expected value: El administrador ve el total de comisiones generadas.
  - notes: La comisión se calcula en el servidor, no en el cliente.

**Open questions:**

- ¿Qué tan detallado debe ser el panel de administración en la v1 (solo aprobar y ver métricas, o también resolver disputas)?

---

## Suggested Execution Order

**Now** (materializados como Work Items en `draft/`):

1. WI-CANDIDATE-003: Instalar dependencias base y estructura de carpetas.
2. WI-CANDIDATE-004: Configurar pruebas con Vitest y Testing Library.
3. WI-CANDIDATE-005: Router y layouts por rol.
4. WI-CANDIDATE-001: Catálogo de restaurantes (shell inicial).
5. WI-CANDIDATE-002: Detalle de restaurante con menú.
6. WI-CANDIDATE-006: Spike de modelo de datos y decisiones de Supabase.
7. WI-CANDIDATE-007: Cliente Supabase y variables de entorno.
8. WI-CANDIDATE-008: Migraciones iniciales con RLS.
9. WI-CANDIDATE-009: AuthContext, login/registro y rutas por rol.

**Next** (candidatos, se materializan al terminar Now): 014, 010, 011, 012, 015.

**Later:** 013, 016, 017, 018.

## Risks and Constraints

- La lógica crítica (crear pedido, cambiar estado, comisión) debe vivir en RPC con `security definer` y validación de rol interna; un error de RLS expone datos.
- `tsc -b` falla hoy por `useState` sin uso en `App.tsx` (`noUnusedLocals` está activo), así que `npm run build` no pasa hasta corregirlo (lo cubre WI-CANDIDATE-001).
- No hay estrategia de pruebas todavía; se resuelve con WI-CANDIDATE-004.
- Mapas y pago pueden cambiar el alcance de RM-005; por eso están como spike y como asunción explícita.
- 9 preguntas abiertas están marcadas como importantes por `kaddo questions` (0 bloqueantes).

## Not Now

- Cupones y promociones (por restaurante o de toda la plataforma).
- Reseñas de restaurante sobre pedidos entregados.
- Notificaciones de cambio de estado (más allá del tiempo real en pantalla).
- Rastreo GPS en vivo del repartidor, pagos y payouts automatizados, multi-idioma/multi-moneda, apps nativas y chat en vivo (fuera de alcance según `product.md`).

## Next Recommended Work Item

WI-CANDIDATE-003: Instalar dependencias base y crear la estructura de carpetas por capas.