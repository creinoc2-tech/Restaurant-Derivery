---
type: feature
id: WI-017
title: "Aprobación y suspensión de restaurantes"
knowledge_level: K2
status: draft
phase: later
initiative: "Admin Panel"
domains:
  - "Frontend — administración"
code: []
created_at: 2026-09-23
source: roadmap
source_id: WI-CANDIDATE-017
source_initiative: RM-008
source_roadmap_initiative: RM-008
source_work_item_candidate: WI-CANDIDATE-017
source_title: "Aprobación y suspensión de restaurantes"
source_context: "Materialized from roadmap candidate WI-CANDIDATE-017 under initiative RM-008."
source_initiative_title: "Admin Panel"
related_domain: "Frontend — administración"
related_capabilities:
  - "Panel de administración"
expected_value: "El administrador controla qué restaurantes aparecen en el catálogo."
risks:
  - "Un usuario no admin ejecutando la RPC de aprobación si falta validación de rol."
dependencies:
  - "WI-008"
  - "WI-009"
summary: "Los restaurantes nuevos necesitan aprobación antes de aparecer en el catálogo, pero no hay ningún panel ni operación para que el administrador lo haga"
---

# Aprobación y suspensión de restaurantes

> Type: feature · Level: K2

## Source

- Source: roadmap
- Roadmap Initiative: RM-008 — Admin Panel
- Work Item Candidate: WI-CANDIDATE-017
- Related domain: Frontend — administración
- Related capabilities:
  - Panel de administración

## Problem

Los restaurantes nuevos necesitan aprobación antes de aparecer en el catálogo, pero no hay ningún panel ni operación para que el administrador lo haga.

## Expected Value

El administrador controla qué restaurantes aparecen en el catálogo.

## Impact

Sin aprobación no se pueden incorporar restaurantes nuevos con control, y cualquiera podría aparecer en el catálogo.

## Context From Roadmap

This Work Item was materialized from roadmap initiative RM-008.

**Expected value:** El administrador controla qué restaurantes aparecen en el catálogo.

**Dependencies:** WI-008; WI-009

**Source signals:** _Not provided in roadmap._

## Acceptance Criteria

- [ ] El admin ve la lista de restaurantes con su estado (pendiente, aprobado, suspendido).
- [ ] Puede aprobar un restaurante pendiente y suspender uno aprobado.
- [ ] Cada cambio se hace mediante una RPC `security definer` que valida que el usuario sea `admin`.
- [ ] Un restaurante pendiente o suspendido no aparece en el catálogo del cliente.
- [ ] Un restaurante suspendido no puede recibir pedidos nuevos.
- [ ] Solo el rol `admin` accede a la pantalla.

## Design

Estado del restaurante en la base y RPC de cambio de estado con validación de rol. El catálogo filtra por estado aprobado (ya cubierto por RLS en WI-008).

## Risks

- Un usuario no admin ejecutando la RPC de aprobación si falta validación de rol.

## Notes

Depende de cómo se registra un restaurante (WI-006/WI-009).

## Open Questions

- ¿Se necesita motivo de suspensión o registro de quién aprobó?
- ¿Se notifica al restaurante al aprobarlo? (fuera de la v1 según la roadmap)

## Out of scope

- Resolución de disputas.
- Gestión de usuarios y roles.
- Comisiones (WI-018).

## Validation

1. Como usuario no admin, llamar a la RPC de aprobación → rechazado.
2. Aprobar un restaurante pendiente → aparece en el catálogo del cliente.
3. Suspender un restaurante aprobado → desaparece del catálogo y no acepta pedidos nuevos.
4. `npm test` → pruebas de la lista y de las acciones por estado.

## Definition of Done

- [ ] Problem is clear.
- [ ] Expected result is defined.
- [ ] Impact of not doing it is stated.
- [ ] Acceptance criteria are verifiable.
- [ ] Las validaciones de la sección Validation pasan.
- [ ] Se ejecutó `kaddo scan` y `kaddo guard` sin drift inesperado.
- [ ] El conocimiento afectado (ADR / capacidades / estado actual) está actualizado.

## Suggested ownership (code globs)

- `supabase/migrations/**`
- `src/page/dashboard/**`
- `src/hook/admin/**`
- `src/action/admin*`
- `src/components/containers/admin/**`

_Sugerencia: aplicar con `kaddo owners suggest` cuando existan los archivos; el campo `code:` queda vacío hasta entonces._

## Learning

_What did we learn from this change? Update after completion._
