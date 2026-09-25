---
type: chore
id: WI-007
title: "Configurar cliente Supabase y variables de entorno"
knowledge_level: K2
status: draft
phase: now
initiative: "Backend and Data Foundation (Supabase)"
domains:
  - "Backend como servicio — datos y seguridad"
code: []
created_at: 2026-09-23
source: roadmap
source_id: WI-CANDIDATE-007
source_initiative: RM-003
source_roadmap_initiative: RM-003
source_work_item_candidate: WI-CANDIDATE-007
source_title: "Configurar cliente Supabase y variables de entorno"
source_context: "Materialized from roadmap candidate WI-CANDIDATE-007 under initiative RM-003."
source_initiative_title: "Backend and Data Foundation (Supabase)"
related_domain: "Backend como servicio — datos y seguridad"
related_capabilities:
  - "Autenticación con roles"
  - "Backend como servicio"
expected_value: "Conexión al backend con manejo seguro de credenciales y tipado del cliente."
risks:
  - "Exponer una clave con privilegios en el frontend."
  - "Depende de que ya exista un proyecto de Supabase creado por un humano."
dependencies:
  - "WI-003"
  - "WI-004"
summary: "La aplicación no tiene cliente de Supabase ni forma de configurar las credenciales del backend de forma segura"
---

# Configurar cliente Supabase y variables de entorno

> Type: chore · Level: K2

## Source

- Source: roadmap
- Roadmap Initiative: RM-003 — Backend and Data Foundation (Supabase)
- Work Item Candidate: WI-CANDIDATE-007
- Related domain: Backend como servicio — datos y seguridad
- Related capabilities:
  - Autenticación con roles
  - Backend como servicio

## Problem

La aplicación no tiene cliente de Supabase ni forma de configurar las credenciales del backend de forma segura.

## Expected Value

Conexión al backend con manejo seguro de credenciales y tipado del cliente.

## Impact

Sin cliente configurado no se pueden implementar autenticación ni lectura de datos reales.

## Context From Roadmap

This Work Item was materialized from roadmap initiative RM-003.

**Expected value:** Conexión al backend con manejo seguro de credenciales y tipado del cliente.

**Dependencies:** WI-003; WI-004

**Source signals:** _Not provided in roadmap._

## Acceptance Criteria

- [ ] `@supabase/supabase-js` está instalado.
- [ ] Existe un único módulo que crea y exporta el cliente Supabase.
- [ ] Las credenciales se leen de `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
- [ ] Si falta una variable, el módulo falla con un mensaje claro.
- [ ] Existe `.env.example` con los nombres de variables y sin valores reales.
- [ ] Ninguna clave `service_role` aparece en el código ni en la documentación del repo.
- [ ] `.env.local` está ignorado por git (verificar `*.local` en `.gitignore`).

## Design

Un solo cliente para toda la app. Nota: `codebase.md` nombra la carpeta `superbase/`; se propone `src/supabase/` salvo que se confirme lo contrario.

## Risks

- Exponer una clave con privilegios en el frontend.
- Depende de que ya exista un proyecto de Supabase creado por un humano.

## Notes

Requisito externo: un humano crea el proyecto de Supabase y obtiene URL y clave anónima.

## Open Questions

- ¿La carpeta se llama `supabase/` o `superbase/` como aparece en `codebase.md`? (se asume que es un typo)
- ¿Se generan tipos de la base (`supabase gen types`) en este Work Item o cuando exista el esquema (WI-008)? (se asume lo segundo)

## Out of scope

- Login y registro (WI-009).
- Esquema, migraciones y RLS (WI-008).
- Generación de tipos de la base.

## Validation

1. `npm test` → una prueba verifica que importar el módulo sin variables lanza el error esperado.
2. `npm run build` y `npm run lint` → sin errores.
3. Manual: con `.env.local` válido, ejecutar `supabase.auth.getSession()` desde la consola del navegador → responde sin error de red.
4. `git status` → `.env.local` no aparece como archivo a versionar; `git grep -i service_role` → sin resultados.

## Definition of Done

- [ ] Problem is clear.
- [ ] Expected result is defined.
- [ ] Impact of not doing it is stated.
- [ ] Acceptance criteria are verifiable.
- [ ] Las validaciones de la sección Validation pasan.
- [ ] Se ejecutó `kaddo scan` y `kaddo guard` sin drift inesperado.
- [ ] El conocimiento afectado (ADR / capacidades / estado actual) está actualizado.

## Suggested ownership (code globs)

- `src/supabase/**`
- `.env.example`
- `package.json`
- `README.md`

_Sugerencia: aplicar con `kaddo owners suggest` cuando existan los archivos; el campo `code:` queda vacío hasta entonces._

## Learning

_What did we learn from this change? Update after completion._
