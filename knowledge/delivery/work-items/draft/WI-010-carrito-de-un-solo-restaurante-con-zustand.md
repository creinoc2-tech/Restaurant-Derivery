---
type: feature
id: WI-010
title: "Carrito de un solo restaurante con Zustand"
knowledge_level: K2
status: draft
phase: next
initiative: "Customer Order Flow"
domains:
  - "Pedidos — cliente"
code: []
created_at: 2026-09-23
source: roadmap
source_id: WI-CANDIDATE-010
source_initiative: RM-005
source_roadmap_initiative: RM-005
source_work_item_candidate: WI-CANDIDATE-010
source_title: "Carrito de un solo restaurante con Zustand"
source_context: "Materialized from roadmap candidate WI-CANDIDATE-010 under initiative RM-005."
source_initiative_title: "Customer Order Flow"
related_domain: "Pedidos — cliente"
related_capabilities:
  - "Carrito y checkout de un solo restaurante"
expected_value: "El cliente puede agregar platillos y ver el total, con la regla de un restaurante por pedido."
risks:
  - "Precios calculados en el cliente pueden diferir de los del servidor; el total del carrito es solo informativo hasta el checkout (WI-012)."
dependencies:
  - "WI-002"
summary: "El cliente ve el menú de un restaurante pero no puede armar un pedido: no hay carrito ni forma de aplicar la regla de un solo restaurante por pedido"
---

# Carrito de un solo restaurante con Zustand

> Type: feature · Level: K2

## Source

- Source: roadmap
- Roadmap Initiative: RM-005 — Customer Order Flow
- Work Item Candidate: WI-CANDIDATE-010
- Related domain: Pedidos — cliente
- Related capabilities:
  - Carrito y checkout de un solo restaurante

## Problem

El cliente ve el menú de un restaurante pero no puede armar un pedido: no hay carrito ni forma de aplicar la regla de un solo restaurante por pedido.

## Expected Value

El cliente puede agregar platillos y ver el total, con la regla de un restaurante por pedido.

## Impact

Sin carrito no hay pedido, y el flujo central del producto no se puede validar.

## Context From Roadmap

This Work Item was materialized from roadmap initiative RM-005.

**Expected value:** El cliente puede agregar platillos y ver el total, con la regla de un restaurante por pedido.

**Dependencies:** WI-002

**Source signals:** _Not provided in roadmap._

## Acceptance Criteria

- [ ] Existe un store de Zustand (`cart.store`) con agregar, quitar, cambiar cantidad y vaciar.
- [ ] Solo se pueden agregar platillos disponibles.
- [ ] Si el carrito tiene platillos de un restaurante y el cliente agrega uno de otro, se le pide confirmar y el carrito se reemplaza; si cancela, no cambia.
- [ ] El carrito muestra líneas, subtotal y cantidad de ítems, y es accesible desde el layout del cliente.
- [ ] El carrito persiste al navegar entre páginas (dentro de la sesión del navegador).
- [ ] El total se calcula con una función pura probada.
- [ ] `npm run build`, `npm run lint` y `npm test` pasan.

## Design

Store con Zustand con acciones puras y selectores. Sin llamadas a Supabase. El subtotal es informativo: el monto definitivo lo calcula el servidor en WI-012.

## Risks

- Precios calculados en el cliente pueden diferir de los del servidor; el total del carrito es solo informativo hasta el checkout (WI-012).

## Notes

No crea pedido ni cobra.

## Open Questions

- ¿El carrito debe sobrevivir a recargar la página? (se asume que no en esta versión)
- ¿Al cambiar de restaurante se vacía con confirmación o se bloquea? (se asume vaciar con confirmación)

## Out of scope

- Crear el pedido y checkout (WI-012).
- Cálculo de envío (WI-011/WI-012).
- Cupones.

## Validation

1. `npm test` → pruebas del store: agregar, cantidad, quitar, vaciar, subtotal y cambio de restaurante.
2. `npm run build` y `npm run lint` → sin errores.
3. Manual: agregar dos platillos del mismo restaurante → subtotal correcto; agregar uno de otro restaurante → pide confirmación.
4. Manual: intentar agregar un platillo agotado → no se agrega.

## Definition of Done

- [ ] Problem is clear.
- [ ] Expected result is defined.
- [ ] Impact of not doing it is stated.
- [ ] Acceptance criteria are verifiable.
- [ ] Las validaciones de la sección Validation pasan.
- [ ] Se ejecutó `kaddo scan` y `kaddo guard` sin drift inesperado.
- [ ] El conocimiento afectado (ADR / capacidades / estado actual) está actualizado.

## Suggested ownership (code globs)

- `src/store/cart*`
- `src/components/containers/client/cart/**`
- `src/components/base/menu-items/**`

_Sugerencia: aplicar con `kaddo owners suggest` cuando existan los archivos; el campo `code:` queda vacío hasta entonces._

## Learning

_What did we learn from this change? Update after completion._
