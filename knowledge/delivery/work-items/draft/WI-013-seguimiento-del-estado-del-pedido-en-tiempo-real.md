---
type: feature
id: WI-013
title: "Seguimiento del estado del pedido en tiempo real"
knowledge_level: K3
status: draft
phase: later
initiative: "Customer Order Flow"
domains:
  - "Pedidos — cliente"
code: []
created_at: 2026-09-23
source: roadmap
source_id: WI-CANDIDATE-013
source_initiative: RM-005
source_roadmap_initiative: RM-005
source_work_item_candidate: WI-CANDIDATE-013
source_title: "Seguimiento del estado del pedido en tiempo real"
source_context: "Materialized from roadmap candidate WI-CANDIDATE-013 under initiative RM-005."
source_initiative_title: "Customer Order Flow"
related_domain: "Pedidos — cliente"
related_capabilities:
  - "Seguimiento del pedido en tiempo real"
expected_value: "El cliente ve los cambios de estado sin recargar la página."
risks:
  - "Suscripciones de Realtime sin filtro por usuario pueden exponer pedidos ajenos."
  - "Conexiones que no se cierran al salir de la pantalla."
dependencies:
  - "WI-012"
summary: "Después de crear un pedido el cliente no tiene forma de saber en qué estado está sin recargar la página"
---

# Seguimiento del estado del pedido en tiempo real

> Type: feature · Level: K3

## Source

- Source: roadmap
- Roadmap Initiative: RM-005 — Customer Order Flow
- Work Item Candidate: WI-CANDIDATE-013
- Related domain: Pedidos — cliente
- Related capabilities:
  - Seguimiento del pedido en tiempo real

## Problem

Después de crear un pedido el cliente no tiene forma de saber en qué estado está sin recargar la página.

## Expected Value

El cliente ve los cambios de estado sin recargar la página.

## Impact

La experiencia de seguimiento es una promesa central del producto; sin ella el cliente debe llamar al restaurante.

## Context From Roadmap

This Work Item was materialized from roadmap initiative RM-005.

**Expected value:** El cliente ve los cambios de estado sin recargar la página.

**Dependencies:** WI-012

**Source signals:** _Not provided in roadmap._

## Acceptance Criteria

- [ ] La página de detalle de pedido muestra el estado actual y la línea de tiempo de estados.
- [ ] El estado se actualiza sin recargar cuando cambia en la base (Supabase Realtime sobre la tabla de pedidos).
- [ ] El cliente solo recibe cambios de sus propios pedidos (RLS y filtro de suscripción).
- [ ] La suscripción se cierra al salir de la página.
- [ ] Existe una pantalla con la lista de "Mis pedidos" con su estado actual.
- [ ] Se muestra un estado de carga y un estado de error o reconexión.

## Design

Hook de cliente que combina TanStack Query con una suscripción de Realtime filtrada por el pedido. Estados como unión de literales: pendiente, confirmado, en preparación, listo para recoger, recogido, en camino, entregado, cancelado.

## Risks

- Suscripciones de Realtime sin filtro por usuario pueden exponer pedidos ajenos.
- Conexiones que no se cierran al salir de la pantalla.

## Notes

Solo lectura para el cliente; los cambios de estado los hacen restaurante y repartidor (WI-015, WI-016).

## Open Questions

- ¿Supabase Realtime es suficiente sin servidor de websockets propio? (asunción de `codebase.md`)
- ¿Se muestra un tiempo estimado de entrega o solo el estado? (se asume solo estado en la v1)

## Out of scope

- Rastreo GPS del repartidor.
- Notificaciones push o email.
- Cancelación de pedidos desde el cliente.

## Validation

1. `npm test` → pruebas del hook con suscripción simulada: actualización y limpieza al desmontar.
2. Manual: abrir el pedido como cliente; cambiar el estado desde la base (SQL o panel) → la pantalla se actualiza sin recargar.
3. Manual: iniciar sesión como otro cliente → no recibe cambios del pedido ajeno.
4. Manual: cortar y restaurar la red → la pantalla se reconecta o muestra el error.

## Definition of Done

- [ ] Problem is clear.
- [ ] Impact is stated.
- [ ] Acceptance criteria are verifiable.
- [ ] Design is sufficient to start.
- [ ] Las validaciones de la sección Validation pasan.
- [ ] Se ejecutó `kaddo scan` y `kaddo guard` sin drift inesperado.
- [ ] El conocimiento afectado (ADR / capacidades / estado actual) está actualizado.

## Suggested ownership (code globs)

- `src/hook/client/useOrder*`
- `src/page/Orders*`
- `src/components/containers/client/orders/**`

_Sugerencia: aplicar con `kaddo owners suggest` cuando existan los archivos; el campo `code:` queda vacío hasta entonces._

## Learning

_What did we learn from this change? Update after completion._
