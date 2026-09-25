---
type: feature
id: WI-012
title: "Checkout y creación de pedido mediante RPC atómica"
knowledge_level: K3
status: draft
phase: next
initiative: "Customer Order Flow"
domains:
  - "Pedidos — cliente"
code: []
created_at: 2026-09-23
source: roadmap
source_id: WI-CANDIDATE-012
source_initiative: RM-005
source_roadmap_initiative: RM-005
source_work_item_candidate: WI-CANDIDATE-012
source_title: "Checkout y creación de pedido mediante RPC atómica"
source_context: "Materialized from roadmap candidate WI-CANDIDATE-012 under initiative RM-005."
source_initiative_title: "Customer Order Flow"
related_domain: "Pedidos — cliente"
related_capabilities:
  - "Carrito y checkout de un solo restaurante"
  - "Cálculo de costo de envío por distancia"
  - "Lógica crítica en RPC de Postgres"
expected_value: "Un pedido se crea en una sola transacción validada en el servidor, con costo de envío y estado inicial `pendiente`."
risks:
  - "Precios o disponibilidad manipulados desde el cliente si la RPC no los revalida."
  - "Condiciones de carrera con la disponibilidad de platillos."
  - "Una RPC `security definer` sin validación de rol interna se salta RLS."
dependencies:
  - "WI-008"
  - "WI-009"
  - "WI-010"
  - "WI-011"
summary: "No existe forma de convertir el carrito en un pedido: hace falta una operación atómica en el servidor que valide precios, disponibilidad y restaurante, y calcule el envío"
---

# Checkout y creación de pedido mediante RPC atómica

> Type: feature · Level: K3

## Source

- Source: roadmap
- Roadmap Initiative: RM-005 — Customer Order Flow
- Work Item Candidate: WI-CANDIDATE-012
- Related domain: Pedidos — cliente
- Related capabilities:
  - Carrito y checkout de un solo restaurante
  - Cálculo de costo de envío por distancia
  - Lógica crítica en RPC de Postgres

## Problem

No existe forma de convertir el carrito en un pedido: hace falta una operación atómica en el servidor que valide precios, disponibilidad y restaurante, y calcule el envío.

## Expected Value

Un pedido se crea en una sola transacción validada en el servidor, con costo de envío y estado inicial `pendiente`.

## Impact

Sin esta operación no hay pedidos reales y cualquier alternativa desde el cliente rompería las reglas de consistencia y seguridad del proyecto.

## Context From Roadmap

This Work Item was materialized from roadmap initiative RM-005.

**Expected value:** Un pedido se crea en una sola transacción validada en el servidor, con costo de envío y estado inicial `pendiente`.

**Dependencies:** WI-008; WI-009; WI-010; WI-011

**Source signals:** _Not provided in roadmap._

## Acceptance Criteria

- [ ] Existen migraciones para las tablas de pedidos y sus líneas, con RLS activado y sin políticas abiertas.
- [ ] Existe una RPC `security definer` que crea el pedido y sus líneas en una sola transacción.
- [ ] La RPC valida que el usuario autenticado tenga rol `cliente`.
- [ ] La RPC recalcula precios desde la base y rechaza platillos no disponibles o de otro restaurante.
- [ ] La RPC calcula el costo de envío según lo decidido en WI-011.
- [ ] El pedido se crea con estado `pendiente`.
- [ ] La pantalla de checkout captura la dirección, muestra el resumen con el envío y llama a la RPC.
- [ ] Tras crear el pedido se vacía el carrito y se navega al detalle del pedido.
- [ ] Si la RPC falla se muestra un error claro y el carrito se conserva.

## Design

La aplicación llama a una única RPC con el contenido del carrito y la dirección; el servidor devuelve el pedido creado. Pago en efectivo contra entrega (asunción de `business.md`); sin pasarela. El estado del pedido se tipa como unión de literales en el cliente.

## Risks

- Precios o disponibilidad manipulados desde el cliente si la RPC no los revalida.
- Condiciones de carrera con la disponibilidad de platillos.
- Una RPC `security definer` sin validación de rol interna se salta RLS.

## Notes

Depende de decisiones de WI-006 (modelo de datos) y WI-011 (envío).

## Open Questions

- ¿Pago en línea desde el lanzamiento o solo efectivo contra entrega? (se asume efectivo)
- ¿La dirección de entrega se guarda como dirección reutilizable del cliente o solo en el pedido?
- ¿Existe un monto mínimo de pedido?

## Out of scope

- Pasarela de pago y payouts.
- Seguimiento en tiempo real (WI-013).
- Cupones.
- Bandeja del restaurante (WI-015).

## Validation

1. Con un cliente autenticado, llamar a la RPC con un carrito válido → se crea un pedido `pendiente` con sus líneas.
2. Llamar a la RPC con un precio alterado desde el cliente → el servidor usa el precio de la base.
3. Llamar con un platillo de otro restaurante o agotado → rechazado y sin pedido parcial.
4. Llamar como usuario con rol `restaurante` o sin sesión → rechazado.
5. `npm test` → pruebas del formulario de checkout y del manejo de errores.
6. Manual: completar un pedido desde el carrito hasta la confirmación.

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
- `src/action/order*`
- `src/page/Checkout*`
- `src/components/containers/client/checkout/**`

_Sugerencia: aplicar con `kaddo owners suggest` cuando existan los archivos; el campo `code:` queda vacío hasta entonces._

## Learning

_What did we learn from this change? Update after completion._
