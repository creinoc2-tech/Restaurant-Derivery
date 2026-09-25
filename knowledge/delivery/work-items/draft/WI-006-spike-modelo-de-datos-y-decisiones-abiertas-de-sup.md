---
type: spike
id: WI-006
title: "Spike — modelo de datos y decisiones abiertas de Supabase"
knowledge_level: K3
status: draft
phase: now
initiative: "Backend and Data Foundation (Supabase)"
domains:
  - "Backend como servicio — datos y seguridad"
code: []
created_at: 2026-09-23
source: roadmap
source_id: WI-CANDIDATE-006
source_initiative: RM-003
source_roadmap_initiative: RM-003
source_work_item_candidate: WI-CANDIDATE-006
source_title: "Spike — modelo de datos y decisiones abiertas de Supabase"
source_context: "Materialized from roadmap candidate WI-CANDIDATE-006 under initiative RM-003."
source_initiative_title: "Backend and Data Foundation (Supabase)"
related_domain: "Backend como servicio — datos y seguridad"
related_capabilities:
  - "Autenticación con roles"
  - "Catálogo de restaurantes con menú"
  - "Lógica crítica en RPC de Postgres"
expected_value: "Resolver el modelo (tabla `restaurants` vs perfil, asignación de repartidor, radio de entrega) y producir ADRs candidatos antes de crear migraciones."
risks:
  - "Decidir mal el modelo de roles o de restaurante fuerza migraciones costosas después."
dependencies:
  - "WI-003"
summary: "Hay decisiones de modelado abiertas (tabla `restaurants`, asignación de repartidor, radio de entrega, aprobación de repartidores) que bloquean las migraciones y el diseño de RLS"
---

# Spike — modelo de datos y decisiones abiertas de Supabase

> Type: spike · Level: K3

## Source

- Source: roadmap
- Roadmap Initiative: RM-003 — Backend and Data Foundation (Supabase)
- Work Item Candidate: WI-CANDIDATE-006
- Related domain: Backend como servicio — datos y seguridad
- Related capabilities:
  - Autenticación con roles
  - Catálogo de restaurantes con menú
  - Lógica crítica en RPC de Postgres

## Problem

Hay decisiones de modelado abiertas (tabla `restaurants`, asignación de repartidor, radio de entrega, aprobación de repartidores) que bloquean las migraciones y el diseño de RLS.

## Expected Value

Resolver el modelo (tabla `restaurants` vs perfil, asignación de repartidor, radio de entrega) y producir ADRs candidatos antes de crear migraciones.

## Impact

Si se escriben migraciones sin resolverlas, se rehace el esquema y las políticas RLS al aclararse el alcance.

## Context From Roadmap

This Work Item was materialized from roadmap initiative RM-003.

**Expected value:** Resolver el modelo (tabla `restaurants` vs perfil, asignación de repartidor, radio de entrega) y producir ADRs candidatos antes de crear migraciones.

**Dependencies:** WI-003

**Source signals:** _Not provided in roadmap._

## Acceptance Criteria

- [ ] Existe un documento de decisión en `knowledge/tech/` con el modelo propuesto (tablas, relaciones, claves y estados del pedido).
- [ ] Cada pregunta abierta de RM-003 tiene una respuesta propuesta y su alternativa descartada.
- [ ] Se define cómo se guarda el rol del usuario (`user_roles`) y cómo se asigna en el registro para cada uno de los cuatro roles.
- [ ] Se define el modelo de estados del pedido y quién puede cambiar cada transición.
- [ ] Se listan los ADRs candidatos derivados (mínimo: modelo de roles y modelo de restaurante).
- [ ] Las decisiones quedan revisadas por un humano antes de pasar a WI-008.

## Design

Spike de investigación con timebox sugerido de un día (asunción). Salida solo documental: sin migraciones ni código de aplicación. Tomar `knowledge/tech/codebase.md` y `business.md` como restricciones.

## Risks

- Decidir mal el modelo de roles o de restaurante fuerza migraciones costosas después.

## Notes

Los ADRs finales se guardan en `knowledge/tech/decisions/` (los crea el adr-agent; este spike solo los propone).

## Open Questions

- ¿Se necesita una tabla `restaurants` separada de `user_roles`/`customers`?
- ¿La asignación de repartidor es automática (el más cercano/disponible) o manual (restaurante o admin)?
- ¿Un repartidor puede rechazar un pedido asignado?
- ¿Los repartidores se dan de alta libremente o requieren aprobación del administrador?
- ¿Se necesita un límite de radio de entrega por restaurante?
- ¿Los tiempos de preparación por platillo se usan para calcular un ETA real o son informativos en la v1?

## Out of scope

- Escribir migraciones SQL (WI-008).
- Crear el proyecto de Supabase.
- Elegir proveedor de mapas (WI-CANDIDATE-011).
- Cualquier código de la aplicación.

## Validation

1. Revisión humana del documento de decisión: cada pregunta abierta tiene respuesta o queda marcada como diferida con motivo.
2. `kaddo questions` → las preguntas de RM-003 aparecen como resueltas, asumidas o diferidas.
3. Las decisiones son consistentes con las reglas de negocio de `business.md` (un pedido = un restaurante, un repartidor = un pedido activo).

## Definition of Done

- [ ] Problem is clear.
- [ ] Impact is stated.
- [ ] Acceptance criteria are verifiable.
- [ ] Design is sufficient to start.
- [ ] Las validaciones de la sección Validation pasan.
- [ ] Se ejecutó `kaddo scan` y `kaddo guard` sin drift inesperado.
- [ ] El conocimiento afectado (ADR / capacidades / estado actual) está actualizado.

## Suggested ownership (code globs)

- `knowledge/tech/**`

_Sugerencia: aplicar con `kaddo owners suggest` cuando existan los archivos; el campo `code:` queda vacío hasta entonces._

## Learning

_What did we learn from this change? Update after completion._
