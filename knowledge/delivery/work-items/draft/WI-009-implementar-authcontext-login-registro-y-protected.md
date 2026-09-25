---
type: feature
id: WI-009
title: "Implementar AuthContext, login/registro y ProtectedRoute por rol"
knowledge_level: K3
status: draft
phase: now
initiative: "Authentication and Roles"
domains:
  - "Frontend + Supabase Auth"
code: []
created_at: 2026-09-23
source: roadmap
source_id: WI-CANDIDATE-009
source_initiative: RM-004
source_roadmap_initiative: RM-004
source_work_item_candidate: WI-CANDIDATE-009
source_title: "Implementar AuthContext, login/registro y ProtectedRoute por rol"
source_context: "Materialized from roadmap candidate WI-CANDIDATE-009 under initiative RM-004."
source_initiative_title: "Authentication and Roles"
related_domain: "Frontend + Supabase Auth"
related_capabilities:
  - "Autenticación con roles (cliente, restaurante, repartidor, admin)"
expected_value: "Sesión y rol con una única fuente de verdad (`AuthContext`) y rutas protegidas por rol."
risks:
  - "Duplicar la consulta de sesión/rol en varios componentes."
  - "Proteger rutas solo en el cliente da falsa seguridad: la seguridad real es RLS/RPC."
dependencies:
  - "WI-005"
  - "WI-007"
  - "WI-008"
summary: "La aplicación no sabe quién es el usuario ni qué rol tiene, y `ProtectedRoute` deja pasar a cualquiera"
---

# Implementar AuthContext, login/registro y ProtectedRoute por rol

> Type: feature · Level: K3

## Source

- Source: roadmap
- Roadmap Initiative: RM-004 — Authentication and Roles
- Work Item Candidate: WI-CANDIDATE-009
- Related domain: Frontend + Supabase Auth
- Related capabilities:
  - Autenticación con roles (cliente, restaurante, repartidor, admin)

## Problem

La aplicación no sabe quién es el usuario ni qué rol tiene, y `ProtectedRoute` deja pasar a cualquiera.

## Expected Value

Sesión y rol con una única fuente de verdad (`AuthContext`) y rutas protegidas por rol.

## Impact

Sin sesión ni rol no se pueden construir los paneles ni el flujo de pedido; sin guardas, cualquier usuario vería pantallas de otro rol.

## Context From Roadmap

This Work Item was materialized from roadmap initiative RM-004.

**Expected value:** Sesión y rol con una única fuente de verdad (`AuthContext`) y rutas protegidas por rol.

**Dependencies:** WI-005; WI-007; WI-008

**Source signals:** _Not provided in roadmap._

## Acceptance Criteria

- [ ] Existe un único `AuthContext` que expone sesión, rol, estado de carga, login, registro y logout.
- [ ] Ningún componente consulta sesión o rol por su cuenta: todos usan el hook `useAuth`.
- [ ] Existen formularios de login y registro con react-hook-form y zod, con mensajes de error en español.
- [ ] Un registro nuevo obtiene el rol inicial definido en WI-006/WI-008.
- [ ] `ProtectedRoute` reemplaza el placeholder de WI-005: sin sesión redirige a login; con rol no permitido muestra acceso denegado.
- [ ] Tras iniciar sesión se redirige al layout que corresponde al rol.
- [ ] Mientras carga la sesión se muestra un estado de carga, no un parpadeo de login.
- [ ] Logout limpia la sesión y vuelve a la pantalla pública.

## Design

Un `AuthContext` que suscribe `onAuthStateChange`, resuelve el rol una sola vez y lo expone; `ProtectedRoute` lee `useAuth` y compara contra `allowedRoles`. La protección de rutas es solo experiencia de usuario: la autorización real vive en RLS y RPC.

## Risks

- Duplicar la consulta de sesión/rol en varios componentes.
- Proteger rutas solo en el cliente da falsa seguridad: la seguridad real es RLS/RPC.

## Notes

Registro de restaurantes y repartidores según la decisión de WI-006 (aprobación pendiente o alta libre).

## Open Questions

- ¿Los repartidores se dan de alta libremente o requieren aprobación?
- ¿El registro de restaurante crea el perfil en estado pendiente hasta la aprobación del admin?
- ¿Solo email y contraseña, o también proveedores sociales? (se asume solo email y contraseña)

## Out of scope

- Recuperación de contraseña y verificación de email.
- Paneles de cada rol.
- Aprobación de restaurantes (RM-008).
- Autorización de operaciones críticas (RPC).

## Validation

1. `npm test` → pruebas de `ProtectedRoute` con contexto simulado: sin sesión redirige, rol incorrecto niega, rol correcto renderiza.
2. `npm run build` y `npm run lint` → sin errores.
3. Manual: registrar un usuario → entra con el rol inicial; cerrar sesión; iniciar de nuevo → misma sesión y rol.
4. Manual: con rol `cliente`, abrir `/admin` → acceso denegado; sin sesión → redirige a login.
5. Manual: recargar en una ruta protegida → no hay parpadeo de login mientras carga la sesión.
6. `git grep -n "getSession\|onAuthStateChange" src` → solo aparecen en el `AuthContext`.

## Definition of Done

- [ ] Problem is clear.
- [ ] Impact is stated.
- [ ] Acceptance criteria are verifiable.
- [ ] Design is sufficient to start.
- [ ] Las validaciones de la sección Validation pasan.
- [ ] Se ejecutó `kaddo scan` y `kaddo guard` sin drift inesperado.
- [ ] El conocimiento afectado (ADR / capacidades / estado actual) está actualizado.

## Suggested ownership (code globs)

- `src/context/AuthContext*`
- `src/hook/auth/**`
- `src/components/ProtectedRoute*`
- `src/components/containers/auth/**`
- `src/components/templates/auth/**`
- `src/page/auth/**`

_Sugerencia: aplicar con `kaddo owners suggest` cuando existan los archivos; el campo `code:` queda vacío hasta entonces._

## Learning

_What did we learn from this change? Update after completion._
