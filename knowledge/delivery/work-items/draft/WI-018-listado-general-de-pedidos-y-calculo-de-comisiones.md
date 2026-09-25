---
type: feature
id: WI-018
title: "Listado general de pedidos y cálculo de comisiones"
knowledge_level: K3
status: draft
phase: later
initiative: "Admin Panel"
domains:
  - "Frontend — administración"
code: []
created_at: 2026-09-23
source: roadmap
source_id: WI-CANDIDATE-018
source_initiative: RM-008
source_roadmap_initiative: RM-008
source_work_item_candidate: WI-CANDIDATE-018
source_title: "Listado general de pedidos y cálculo de comisiones"
source_context: "Materialized from roadmap candidate WI-CANDIDATE-018 under initiative RM-008."
source_initiative_title: "Admin Panel"
related_domain: "Frontend — administración"
related_capabilities:
  - "Panel de administración"
expected_value: "El administrador ve el total de comisiones generadas."
risks:
  - "Comisión calculada en el cliente o con un porcentaje que cambia y altera pedidos históricos."
  - "Exponer datos de pedidos a roles no autorizados."
dependencies:
  - "WI-012"
  - "WI-017"
summary: "El operador de la plataforma monetiza con una comisión por pedido completado, pero no hay forma de calcularla ni de ver los pedidos y totales generales"
---

# Listado general de pedidos y cálculo de comisiones

> Type: feature · Level: K3

## Source

- Source: roadmap
- Roadmap Initiative: RM-008 — Admin Panel
- Work Item Candidate: WI-CANDIDATE-018
- Related domain: Frontend — administración
- Related capabilities:
  - Panel de administración

## Problem

El operador de la plataforma monetiza con una comisión por pedido completado, pero no hay forma de calcularla ni de ver los pedidos y totales generales.

## Expected Value

El administrador ve el total de comisiones generadas.

## Impact

Sin esto el administrador no puede verificar los ingresos de la plataforma ni conciliar con los restaurantes.

## Context From Roadmap

This Work Item was materialized from roadmap initiative RM-008.

**Expected value:** El administrador ve el total de comisiones generadas.

**Dependencies:** WI-012; WI-017

**Source signals:** _Not provided in roadmap._

## Acceptance Criteria

- [ ] El admin ve un listado paginado de todos los pedidos con restaurante, estado, total y fecha.
- [ ] Puede filtrar por estado y por restaurante.
- [ ] La comisión de un pedido se calcula en el servidor (RPC o columna calculada) cuando el pedido pasa a `entregado`.
- [ ] El porcentaje de comisión queda registrado en cada pedido para que los cambios futuros no alteren el histórico.
- [ ] El panel muestra el total de comisiones y el total por restaurante.
- [ ] Solo el rol `admin` puede ver estos datos (verificado por RLS o RPC).

## Design

La comisión se congela por pedido al completarse. Las agregaciones se resuelven en el servidor y el cliente solo las muestra.

## Risks

- Comisión calculada en el cliente o con un porcentaje que cambia y altera pedidos históricos.
- Exponer datos de pedidos a roles no autorizados.

## Notes

No define pagos automáticos entre plataforma, restaurante y repartidor (fuera de alcance de la v1).

## Open Questions

- ¿Cuál es el porcentaje de comisión y es único para toda la plataforma o por restaurante?
- ¿La comisión se calcula sobre el subtotal o también sobre el envío?
- ¿Cómo se paga al restaurante y al repartidor su parte (payout manual o integración)?

## Out of scope

- Payouts automáticos.
- Exportación contable.
- Resolución de disputas.
- Métricas avanzadas.

## Validation

1. Como usuario no admin, consultar el listado y los totales → rechazado.
2. Completar un pedido con comisión definida → el pedido queda con el porcentaje y el monto registrados.
3. Cambiar el porcentaje y completar otro pedido → el histórico del primero no cambia.
4. `npm test` → pruebas de filtros y de formato de totales.
5. Manual: el total de comisiones coincide con la suma de los pedidos entregados.

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
- `src/page/dashboard/orders*`
- `src/hook/admin/**`
- `src/action/admin*`
- `src/components/containers/admin/**`

_Sugerencia: aplicar con `kaddo owners suggest` cuando existan los archivos; el campo `code:` queda vacío hasta entonces._

## Learning

_What did we learn from this change? Update after completion._
