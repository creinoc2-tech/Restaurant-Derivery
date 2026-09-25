---
type: feature
id: WI-008
title: "Migraciones iniciales de roles, restaurantes y menú con RLS"
knowledge_level: K3
status: draft
phase: now
initiative: "Backend and Data Foundation (Supabase)"
domains:
  - "Backend como servicio — datos y seguridad"
code: []
created_at: 2026-09-23
source: roadmap
source_id: WI-CANDIDATE-008
source_initiative: RM-003
source_roadmap_initiative: RM-003
source_work_item_candidate: WI-CANDIDATE-008
source_title: "Migraciones iniciales de roles, restaurantes y menú con RLS"
source_context: "Materialized from roadmap candidate WI-CANDIDATE-008 under initiative RM-003."
source_initiative_title: "Backend and Data Foundation (Supabase)"
related_domain: "Backend como servicio — datos y seguridad"
related_capabilities:
  - "Autenticación con roles"
  - "Catálogo de restaurantes con menú"
  - "Lógica crítica en RPC de Postgres"
expected_value: "Base de datos con seguridad por rol verificada, lista para que auth y catálogo lean datos reales."
risks:
  - "Una política RLS abierta expone datos sensibles."
  - "Un trigger de `auth.users` mal escrito rompe el registro de usuarios."
dependencies:
  - "WI-006"
  - "WI-007"
summary: "No existe esquema de base de datos: no hay tablas de roles, restaurantes ni menú, ni políticas que impidan que un usuario lea o modifique datos ajenos"
---

# Migraciones iniciales de roles, restaurantes y menú con RLS

> Type: feature · Level: K3

## Source

- Source: roadmap
- Roadmap Initiative: RM-003 — Backend and Data Foundation (Supabase)
- Work Item Candidate: WI-CANDIDATE-008
- Related domain: Backend como servicio — datos y seguridad
- Related capabilities:
  - Autenticación con roles
  - Catálogo de restaurantes con menú
  - Lógica crítica en RPC de Postgres

## Problem

No existe esquema de base de datos: no hay tablas de roles, restaurantes ni menú, ni políticas que impidan que un usuario lea o modifique datos ajenos.

## Expected Value

Base de datos con seguridad por rol verificada, lista para que auth y catálogo lean datos reales.

## Impact

Sin esquema y RLS no se puede implementar auth por rol ni mostrar catálogo real, y un esquema improvisado podría exponer datos.

## Context From Roadmap

This Work Item was materialized from roadmap initiative RM-003.

**Expected value:** Base de datos con seguridad por rol verificada, lista para que auth y catálogo lean datos reales.

**Dependencies:** WI-006; WI-007

**Source signals:** _Not provided in roadmap._

## Acceptance Criteria

- [ ] Existen migraciones versionadas para `user_roles`, restaurantes y menú según el modelo decidido en WI-006.
- [ ] RLS está activado en todas las tablas creadas.
- [ ] Ninguna política de `insert` o `update` usa `with check (true)` sin condición.
- [ ] Un trigger en `auth.users` asigna el rol inicial al registrarse según lo definido en WI-006.
- [ ] Un usuario anónimo solo puede leer restaurantes aprobados y platillos disponibles.
- [ ] Un restaurante solo puede modificar su propio menú.
- [ ] Un usuario no puede cambiar su propio rol desde el cliente.
- [ ] Existen datos semilla de desarrollo (pocos restaurantes y platillos).

## Design

SQL versionado con nombres en inglés y `snake_case`. Las operaciones con dinero, disponibilidad o estado irán en RPC `security definer` con validación de rol interna (se agregan en Work Items posteriores). Sin tablas de pedidos todavía.

## Risks

- Una política RLS abierta expone datos sensibles.
- Un trigger de `auth.users` mal escrito rompe el registro de usuarios.

## Notes

Ubicación de las migraciones pendiente de la pregunta abierta de RM-003.

## Open Questions

- ¿Las migraciones viven en este repo (`supabase/migrations`) o en otro lugar?
- ¿Se usa Supabase CLI para aplicar y probar migraciones localmente? (se asume que sí)
- Depende de WI-006: el modelo de `restaurants` y el rol inicial son decisiones de ese spike.

## Out of scope

- Tablas de pedidos y RPC de checkout (RM-005).
- Interfaz de auth (WI-009).
- Panel de restaurante.
- Comisiones.

## Validation

1. Aplicar migraciones desde cero (`supabase db reset` o el equivalente acordado) → sin errores.
2. Como usuario anónimo: leer restaurantes → solo aprobados; intentar insertar un platillo → rechazado.
3. Como restaurante A: editar un platillo del restaurante B → rechazado; editar uno propio → permitido.
4. Como usuario autenticado: intentar actualizar su propio rol → rechazado.
5. Registrar un usuario nuevo → el trigger crea su rol inicial sin error.
6. Revisar que ninguna tabla nueva tenga RLS desactivado.

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
- `supabase/seed*`

_Sugerencia: aplicar con `kaddo owners suggest` cuando existan los archivos; el campo `code:` queda vacío hasta entonces._

## Learning

_What did we learn from this change? Update after completion._
