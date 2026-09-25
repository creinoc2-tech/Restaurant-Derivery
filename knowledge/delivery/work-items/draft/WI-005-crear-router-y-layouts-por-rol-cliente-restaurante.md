---
type: feature
id: WI-005
title: "Crear router y layouts por rol (cliente, restaurante, repartidor, admin)"
knowledge_level: K2
status: draft
phase: now
initiative: "Technical Foundation"
domains:
  - "Frontend — plataforma técnica"
code: []
created_at: 2026-09-23
source: roadmap
source_id: WI-CANDIDATE-005
source_initiative: RM-002
source_roadmap_initiative: RM-002
source_work_item_candidate: WI-CANDIDATE-005
source_title: "Crear router y layouts por rol (cliente, restaurante, repartidor, admin)"
source_context: "Materialized from roadmap candidate WI-CANDIDATE-005 under initiative RM-002."
source_initiative_title: "Technical Foundation"
related_domain: "Frontend — plataforma técnica"
related_capabilities:
  - "Base de aplicación con roles"
expected_value: "Esqueleto navegable con rutas y layouts separados por rol, listo para conectar la protección real en RM-004."
risks:
  - "Definir mal la jerarquía de rutas obliga a rehacer layouts cuando llegue la autenticación."
dependencies:
  - "WI-003"
  - "WI-004"
summary: "La aplicación no tiene rutas ni layouts, así que no hay dónde montar el catálogo, el detalle ni los paneles de cada rol"
---

# Crear router y layouts por rol (cliente, restaurante, repartidor, admin)

> Type: feature · Level: K2

## Source

- Source: roadmap
- Roadmap Initiative: RM-002 — Technical Foundation
- Work Item Candidate: WI-CANDIDATE-005
- Related domain: Frontend — plataforma técnica
- Related capabilities:
  - Base de aplicación con roles

## Problem

La aplicación no tiene rutas ni layouts, así que no hay dónde montar el catálogo, el detalle ni los paneles de cada rol.

## Expected Value

Esqueleto navegable con rutas y layouts separados por rol, listo para conectar la protección real en RM-004.

## Impact

Sin esqueleto de rutas, cada pantalla se acopla a `App.tsx` y la protección por rol tendría que retrofitarse.

## Context From Roadmap

This Work Item was materialized from roadmap initiative RM-002.

**Expected value:** Esqueleto navegable con rutas y layouts separados por rol, listo para conectar la protección real en RM-004.

**Dependencies:** WI-003; WI-004

**Source signals:** _Not provided in roadmap._

## Acceptance Criteria

- [ ] `main.tsx` monta un `RouterProvider` con `createBrowserRouter` y el `QueryClientProvider` de TanStack Query.
- [ ] Existen `RootLayout`, `ClientLayout`, `RestaurantLayout`, `DriverLayout` y `DashboardLayout` (admin), cada uno con su `Outlet`.
- [ ] Rutas: `/` (cliente), `/restaurantes/:id` (placeholder hasta WI-002), `/restaurante`, `/repartidor` y `/admin`, cada una con una página placeholder.
- [ ] Existe `ProtectedRoute` con la prop tipada `allowedRoles` que por ahora deja pasar todo (placeholder documentado).
- [ ] Una ruta inexistente muestra una página 404.
- [ ] Los roles se tipan como unión de literales: `cliente | restaurante | repartidor | admin`.
- [ ] `npm run build`, `npm run lint` y `npm test` pasan.

## Design

Rutas de cliente en español (`/restaurantes`, `/pedidos`, `/checkout`) y paneles en `/restaurante`, `/repartidor`, `/admin`. `ProtectedRoute` recibe `allowedRoles` para que RM-004 solo cambie su implementación, no su contrato.

## Risks

- Definir mal la jerarquía de rutas obliga a rehacer layouts cuando llegue la autenticación.

## Notes

La lógica real de sesión y rol es WI-009. Este Work Item no consulta ninguna sesión.

## Open Questions

- ¿Las URLs van en español o en inglés? (se asume español para las de cliente)
- ¿Los cuatro roles comparten dominio y ruta base, o los paneles van en subdominios? (se asume mismo dominio)

## Out of scope

- Autenticación y sesión (WI-009).
- Contenido real de los paneles.
- Guardas de ruta con lógica real.

## Validation

1. `npm run build` y `npm run lint` → sin errores.
2. `npm test` → pruebas que navegan a `/`, `/admin` y una ruta inexistente y verifican el layout o el 404.
3. Manual: `npm run dev` → navegar a `/`, `/restaurante`, `/repartidor`, `/admin` → cada una muestra su layout; `/xyz` → 404.
4. Manual: recargar la página en `/admin` → sigue funcionando (sin error de ruta).

## Definition of Done

- [ ] Problem is clear.
- [ ] Expected result is defined.
- [ ] Impact of not doing it is stated.
- [ ] Acceptance criteria are verifiable.
- [ ] Las validaciones de la sección Validation pasan.
- [ ] Se ejecutó `kaddo scan` y `kaddo guard` sin drift inesperado.
- [ ] El conocimiento afectado (ADR / capacidades / estado actual) está actualizado.

## Suggested ownership (code globs)

- `src/main.tsx`
- `src/router/**`
- `src/layout/**`
- `src/page/**`
- `src/components/ProtectedRoute*`
- `src/interfaces/role*`

_Sugerencia: aplicar con `kaddo owners suggest` cuando existan los archivos; el campo `code:` queda vacío hasta entonces._

## Learning

_What did we learn from this change? Update after completion._
