---
type: feature
id: WI-014
title: "Gestión de menú del restaurante (alta, edición y baja de platillos)"
knowledge_level: K2
status: draft
phase: next
initiative: "Restaurant Panel"
domains:
  - "Frontend — restaurante"
code: []
created_at: 2026-09-23
source: roadmap
source_id: WI-CANDIDATE-014
source_initiative: RM-006
source_roadmap_initiative: RM-006
source_work_item_candidate: WI-CANDIDATE-014
source_title: "Gestión de menú del restaurante (alta, edición y baja de platillos)"
source_context: "Materialized from roadmap candidate WI-CANDIDATE-014 under initiative RM-006."
source_initiative_title: "Restaurant Panel"
related_domain: "Frontend — restaurante"
related_capabilities:
  - "Panel de restaurante"
  - "Catálogo de restaurantes con menú"
expected_value: "El restaurante mantiene su propio menú y disponibilidad diaria."
risks:
  - "Un restaurante editando el menú de otro si RLS está mal configurado."
dependencies:
  - "WI-008"
  - "WI-009"
summary: "Los restaurantes no tienen forma de cargar ni mantener su menú, por lo que el catálogo no puede pasar de datos locales a datos reales"
---

# Gestión de menú del restaurante (alta, edición y baja de platillos)

> Type: feature · Level: K2

## Source

- Source: roadmap
- Roadmap Initiative: RM-006 — Restaurant Panel
- Work Item Candidate: WI-CANDIDATE-014
- Related domain: Frontend — restaurante
- Related capabilities:
  - Panel de restaurante
  - Catálogo de restaurantes con menú

## Problem

Los restaurantes no tienen forma de cargar ni mantener su menú, por lo que el catálogo no puede pasar de datos locales a datos reales.

## Expected Value

El restaurante mantiene su propio menú y disponibilidad diaria.

## Impact

Sin gestión de menú el producto depende de que alguien cargue datos a mano en la base.

## Context From Roadmap

This Work Item was materialized from roadmap initiative RM-006.

**Expected value:** El restaurante mantiene su propio menú y disponibilidad diaria.

**Dependencies:** WI-008; WI-009

**Source signals:** _Not provided in roadmap._

## Acceptance Criteria

- [ ] Un usuario con rol `restaurante` ve la lista de sus platillos en su panel.
- [ ] Puede crear, editar y eliminar un platillo con nombre, precio, categoría, tiempo de preparación y disponibilidad.
- [ ] Puede activar o desactivar la disponibilidad de un platillo con un solo gesto.
- [ ] Los formularios validan con react-hook-form y zod, con mensajes en español.
- [ ] Solo puede modificar los platillos de su propio restaurante (verificado por RLS).
- [ ] Los cambios se reflejan en el catálogo del cliente.
- [ ] Estados de carga, vacío y error visibles.

## Design

TanStack Query para lectura y mutaciones sobre la tabla de platillos, con invalidación al guardar. La seguridad la garantiza RLS; la interfaz solo oculta acciones.

## Risks

- Un restaurante editando el menú de otro si RLS está mal configurado.

## Notes

Solo restaurantes ya aprobados pueden editar menú (según la decisión de WI-006/WI-017).

## Open Questions

- ¿Un restaurante puede tener varios usuarios (dueño y empleados)?
- ¿Los platillos se eliminan definitivamente o se archivan? (se asume archivar si tienen pedidos)
- ¿Hay fotos de platillos en la v1? (se asume que no)

## Out of scope

- Bandeja de pedidos (WI-015).
- Cupones por restaurante.
- Horarios de atención.
- Carga masiva de menús.

## Validation

1. `npm test` → pruebas del formulario de platillo (validaciones) y de la lista.
2. Manual: como restaurante, crear, editar y eliminar un platillo → se refleja en `/restaurantes/:id`.
3. Manual: intentar editar un platillo de otro restaurante (directo por API) → rechazado por RLS.
4. Manual: como `cliente` abrir el panel del restaurante → acceso denegado.

## Definition of Done

- [ ] Problem is clear.
- [ ] Expected result is defined.
- [ ] Impact of not doing it is stated.
- [ ] Acceptance criteria are verifiable.
- [ ] Las validaciones de la sección Validation pasan.
- [ ] Se ejecutó `kaddo scan` y `kaddo guard` sin drift inesperado.
- [ ] El conocimiento afectado (ADR / capacidades / estado actual) está actualizado.

## Suggested ownership (code globs)

- `src/page/restaurant/menu*`
- `src/hook/restaurant/**`
- `src/components/containers/restaurant/menu/**`
- `src/components/base/forms/**`

_Sugerencia: aplicar con `kaddo owners suggest` cuando existan los archivos; el campo `code:` queda vacío hasta entonces._

## Learning

_What did we learn from this change? Update after completion._
