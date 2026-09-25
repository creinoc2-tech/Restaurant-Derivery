---
type: feature
id: WI-016
title: "Panel de repartidor con pedidos asignados y actualización de estado"
knowledge_level: K3
status: draft
phase: later
initiative: "Driver Panel"
domains:
  - "Frontend — repartidor"
code: []
created_at: 2026-09-23
source: roadmap
source_id: WI-CANDIDATE-016
source_initiative: RM-007
source_roadmap_initiative: RM-007
source_work_item_candidate: WI-CANDIDATE-016
source_title: "Panel de repartidor con pedidos asignados y actualización de estado"
source_context: "Materialized from roadmap candidate WI-CANDIDATE-016 under initiative RM-007."
source_initiative_title: "Driver Panel"
related_domain: "Frontend — repartidor"
related_capabilities:
  - "Panel de repartidor"
  - "Seguimiento del pedido en tiempo real"
expected_value: "El repartidor puede completar una entrega de principio a fin."
risks:
  - "Asignar dos pedidos activos a un mismo repartidor."
  - "Depende de decisiones abiertas de asignación (WI-006)."
dependencies:
  - "WI-015"
summary: "Cuando un pedido está listo para recoger no hay quien lo lleve: el repartidor no tiene panel para ver sus pedidos ni avanzar la entrega"
---

# Panel de repartidor con pedidos asignados y actualización de estado

> Type: feature · Level: K3

## Source

- Source: roadmap
- Roadmap Initiative: RM-007 — Driver Panel
- Work Item Candidate: WI-CANDIDATE-016
- Related domain: Frontend — repartidor
- Related capabilities:
  - Panel de repartidor
  - Seguimiento del pedido en tiempo real

## Problem

Cuando un pedido está listo para recoger no hay quien lo lleve: el repartidor no tiene panel para ver sus pedidos ni avanzar la entrega.

## Expected Value

El repartidor puede completar una entrega de principio a fin.

## Impact

Sin este panel el ciclo del pedido se corta en "listo para recoger" y el cliente nunca recibe la confirmación de entrega.

## Context From Roadmap

This Work Item was materialized from roadmap initiative RM-007.

**Expected value:** El repartidor puede completar una entrega de principio a fin.

**Dependencies:** WI-015

**Source signals:** _Not provided in roadmap._

## Acceptance Criteria

- [ ] El repartidor ve su pedido activo con restaurante, dirección de entrega e ítems.
- [ ] Puede activar o desactivar su disponibilidad.
- [ ] Puede avanzar el estado a `recogido`, `en camino` y `entregado`, mediante una RPC que valida rol y asignación.
- [ ] Un repartidor no puede tener más de un pedido activo a la vez.
- [ ] No puede modificar estados anteriores a `listo para recoger`.
- [ ] Un repartidor inactivo no recibe asignaciones.
- [ ] El panel se actualiza sin recargar cuando le asignan un pedido.

## Design

La asignación sigue la decisión de WI-006 (automática o manual). Este Work Item cubre solo el lado del repartidor; el mecanismo de asignación se implementa según esa decisión.

## Risks

- Asignar dos pedidos activos a un mismo repartidor.
- Depende de decisiones abiertas de asignación (WI-006).

## Notes

Requiere que la tabla de pedidos tenga el campo de repartidor asignado.

## Open Questions

- ¿La asignación es automática o manual (restaurante o admin)?
- ¿El repartidor puede rechazar un pedido asignado?
- ¿Se necesita el número de contacto del cliente en la pantalla? (tema de privacidad)

## Out of scope

- Rastreo GPS en vivo.
- Algoritmo de asignación automática (si se decide).
- Pagos y payouts al repartidor.
- Chat con el cliente.

## Validation

1. Como repartidor, avanzar un pedido no asignado a él (directo por RPC) → rechazado.
2. Asignar un segundo pedido activo a un repartidor ocupado → rechazado.
3. `npm test` → pruebas de acciones válidas por estado.
4. Manual: ciclo completo restaurante → repartidor → cliente hasta `entregado`; el cliente lo ve en tiempo real (WI-013).

## Definition of Done

- [ ] Problem is clear.
- [ ] Impact is stated.
- [ ] Acceptance criteria are verifiable.
- [ ] Design is sufficient to start.
- [ ] Las validaciones de la sección Validation pasan.
- [ ] Se ejecutó `kaddo scan` y `kaddo guard` sin drift inesperado.
- [ ] El conocimiento afectado (ADR / capacidades / estado actual) está actualizado.

## Suggested ownership (code globs)

- `supabase/migrations/**`
- `src/page/driver/**`
- `src/hook/driver/**`
- `src/action/driver*`
- `src/components/containers/driver/**`

_Sugerencia: aplicar con `kaddo owners suggest` cuando existan los archivos; el campo `code:` queda vacío hasta entonces._

## Learning

_What did we learn from this change? Update after completion._
