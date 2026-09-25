---
type: chore
id: WI-004
title: "Configurar pruebas con Vitest y Testing Library"
knowledge_level: K1
status: draft
phase: now
initiative: "Technical Foundation"
domains:
  - "Frontend — plataforma técnica"
code:
  - "package.json"
  - "package-lock.json"
  - "vite.config.ts"
  - "tsconfig.app.json"
  - "eslint.config.js"
  - "src/App.test.tsx"
  - "src/test/**"
created_at: 2026-09-23
source: roadmap
source_id: WI-CANDIDATE-004
source_initiative: RM-002
source_roadmap_initiative: RM-002
source_work_item_candidate: WI-CANDIDATE-004
source_title: "Configurar pruebas con Vitest y Testing Library"
source_context: "Materialized from roadmap candidate WI-CANDIDATE-004 under initiative RM-002."
source_initiative_title: "Technical Foundation"
related_domain: "Frontend — plataforma técnica"
related_capabilities:
  - "Estándares de desarrollo de codebase.md"
expected_value: "Cerrar la brecha de estrategia de pruebas detectada por `kaddo scan` y poder validar cada Work Item con `npm test`."
dependencies:
  - "WI-003"
summary: "El proyecto no tiene pruebas ni script `test` (`kaddo scan` reporta 'No test directory detected'), así que ningún Work Item puede validarse de forma automática"
---

# Configurar pruebas con Vitest y Testing Library

> Type: chore · Level: K1

## Source

- Source: roadmap
- Roadmap Initiative: RM-002 — Technical Foundation
- Work Item Candidate: WI-CANDIDATE-004
- Related domain: Frontend — plataforma técnica
- Related capabilities:
  - Estándares de desarrollo de codebase.md

## Problem

El proyecto no tiene pruebas ni script `test` (`kaddo scan` reporta "No test directory detected"), así que ningún Work Item puede validarse de forma automática.

## Expected Value

Cerrar la brecha de estrategia de pruebas detectada por `kaddo scan` y poder validar cada Work Item con `npm test`.

## Impact

Los Work Items posteriores solo podrían validarse a mano, y las reglas críticas (roles, carrito, estados) quedarían sin red de seguridad.

## Context From Roadmap

This Work Item was materialized from roadmap initiative RM-002.

**Expected value:** Cerrar la brecha de estrategia de pruebas detectada por `kaddo scan` y poder validar cada Work Item con `npm test`.

**Dependencies:** WI-003

**Source signals:** _Not provided in roadmap._

## Acceptance Criteria

- [ ] Están instalados Vitest, Testing Library (React y jest-dom) y un entorno DOM (por ejemplo jsdom).
- [ ] Existe el script `npm test` que corre las pruebas una vez y termina.
- [ ] Hay una prueba de humo que renderiza `App` sin errores.
- [ ] La configuración de Vitest reutiliza el alias `@/` de WI-003.
- [ ] `npm run build` y `npm run lint` siguen pasando.

## Notes

Nota técnica: `vite.config.ts` importa `defineConfig` desde `vite`; para incluir el bloque `test` hay que usar el tipo de `vitest/config` o una configuración aparte. Sin umbral de cobertura por ahora.

## Open Questions

- ¿Se quiere un script `test:watch` o cobertura desde ya? (se asume que no)

## Out of scope

- Pruebas de componentes de negocio.
- Pruebas end-to-end.
- Umbral mínimo de cobertura.
- CI.

## Validation

1. `npm test` → 1 prueba de humo pasa y el proceso termina.
2. `npm run build` → sin errores.
3. `npm run lint` → sin errores.
4. Romper a propósito la prueba de humo (por ejemplo lanzar un error en `App`) → `npm test` falla; revertir → vuelve a pasar.

Resultado actual: `npm test`, `npm run build` y `npm run lint` pasan correctamente. La prueba negativa no se ejecutó para no dejar el árbol de trabajo en un estado fallido.

## Definition of Done

- [ ] Problem is clear.
- [ ] Expected result is defined.
- [x] Las validaciones de la sección Validation pasan.
- [ ] Se ejecutó `kaddo scan` y `kaddo guard` sin drift inesperado.
- [ ] El conocimiento afectado (ADR / capacidades / estado actual) está actualizado.

## Suggested ownership (code globs)

- `package.json`
- `vite.config.ts`
- `vitest.config.*`
- `src/**/*.test.*`
- `src/test/**`

_Sugerencia: aplicar con `kaddo owners suggest` cuando existan los archivos; el campo `code:` queda vacío hasta entonces._

## Learning

- Con TypeScript 6, `baseUrl` está deprecado; el alias `@/*` funciona usando `paths` junto con el alias equivalente en Vite.
