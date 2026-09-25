---
type: feature
id: WI-015
title: "Bandeja de pedidos entrantes con cambio de estado"
knowledge_level: K3
status: draft
phase: next
initiative: "Restaurant Panel"
domains:
  - "Frontend — restaurante"
code: []
created_at: 2026-09-23
source: roadmap
source_id: WI-CANDIDATE-015
source_initiative: RM-006
source_roadmap_initiative: RM-006
source_work_item_candidate: WI-CANDIDATE-015
source_title: "Bandeja de pedidos entrantes con cambio de estado"
source_context: "Materialized from roadmap candidate WI-CANDIDATE-015 under initiative RM-006."
source_initiative_title: "Restaurant Panel"
related_domain: "Frontend — restaurante"
related_capabilities:
  - "Panel de restaurante"
  - "Seguimiento del pedido en tiempo real"
expected_value: "El restaurante confirma, prepara y marca listos los pedidos hasta 'listo para recoger'."
risks:
  - "Permitir transiciones de estado inválidas o hechas por el rol equivocado."
  - "Bandeja que no se actualiza y hace que el restaurante pierda pedidos."
dependencies:
  - "WI-012"
  - "WI-014"
summary: "Los pedidos creados no llegan a ningún lugar: el restaurante no tiene una bandeja para verlos ni una forma segura de avanzar su estado"
---

# Bandeja de pedidos entrantes con cambio de estado

> Type: feature · Level: K3

## Source

- Source: roadmap
- Roadmap Initiative: RM-006 — Restaurant Panel
- Work Item Candidate: WI-CANDIDATE-015
- Related domain: Frontend — restaurante
- Related capabilities:
  - Panel de restaurante
  - Seguimiento del pedido en tiempo real

## Problem

Los pedidos creados no llegan a ningún lugar: el restaurante no tiene una bandeja para verlos ni una forma segura de avanzar su estado.

## Expected Value

El restaurante confirma, prepara y marca listos los pedidos hasta "listo para recoger".

## Impact

Sin bandeja no se puede completar el ciclo del pedido y el restaurante no obtiene el canal de ventas que promete el producto.

## Context From Roadmap

This Work Item was materialized from roadmap initiative RM-006.

**Expected value:** El restaurante confirma, prepara y marca listos los pedidos hasta "listo para recoger".

**Dependencies:** WI-012; WI-014

**Source signals:** _Not provided in roadmap._

## Acceptance Criteria

- [ ] El restaurante ve sus pedidos entrantes, ordenados por antigüedad, con ítems, dirección y total.
- [ ] La bandeja se actualiza sin recargar cuando llega un pedido nuevo.
- [ ] Puede pasar un pedido de `pendiente` a `confirmado`, a `en preparación` y a `listo para recoger`.
- [ ] Puede cancelar un pedido antes de que esté `en camino`.
- [ ] Cada cambio se hace mediante una RPC `security definer` que valida el rol y que el pedido sea de su restaurante.
- [ ] La RPC rechaza transiciones fuera del orden definido y estados posteriores a "listo para recoger".
- [ ] Solo se ven los pedidos del propio restaurante.

## Design

Máquina de estados validada en el servidor. El cliente solo muestra las acciones válidas para el estado actual. Tiempo real con Supabase Realtime filtrado por restaurante.

## Risks

- Permitir transiciones de estado inválidas o hechas por el rol equivocado.
- Bandeja que no se actualiza y hace que el restaurante pierda pedidos.

## Notes

Las transiciones desde "recogido" en adelante son del repartidor (WI-016).

## Open Questions

- ¿Un restaurante puede rechazar un pedido? ¿Con qué motivo?
- ¿Hay un tiempo máximo para confirmar antes de cancelar automáticamente? (se asume que no en la v1)

## Out of scope

- Asignación de repartidor.
- Impresión de comandas.
- Métricas de ventas.
- Historial y reportes.

## Validation

1. Como restaurante A, avanzar un pedido del restaurante B (directo por RPC) → rechazado.
2. Intentar pasar de `pendiente` a `listo para recoger` → rechazado.
3. Intentar avanzar a `recogido` como restaurante → rechazado.
4. `npm test` → pruebas de las acciones válidas por estado.
5. Manual: crear un pedido como cliente → aparece en la bandeja sin recargar; avanzarlo hasta "listo para recoger" → el cliente lo ve (WI-013).

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
- `src/page/restaurant/orders*`
- `src/hook/restaurant/**`
- `src/action/order*`
- `src/components/containers/restaurant/orders/**`

_Sugerencia: aplicar con `kaddo owners suggest` cuando existan los archivos; el campo `code:` queda vacío hasta entonces._

## Learning

_What did we learn from this change? Update after completion._
