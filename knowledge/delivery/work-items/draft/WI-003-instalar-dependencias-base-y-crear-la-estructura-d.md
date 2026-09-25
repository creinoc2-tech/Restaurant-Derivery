---
type: chore
id: WI-003
title: "Instalar dependencias base y crear la estructura de carpetas por capas"
knowledge_level: K2
status: draft
phase: now
initiative: "Technical Foundation"
domains:
  - "Frontend — plataforma técnica"
code: []
created_at: 2026-09-23
source: roadmap
source_id: WI-CANDIDATE-003
source_initiative: RM-002
source_roadmap_initiative: RM-002
source_work_item_candidate: WI-CANDIDATE-003
source_title: "Instalar dependencias base y crear la estructura de carpetas por capas"
source_context: "Materialized from roadmap candidate WI-CANDIDATE-003 under initiative RM-002."
source_initiative_title: "Technical Foundation"
related_domain: "Frontend — plataforma técnica"
related_capabilities:
  - "Base de aplicación con roles"
  - "Estándares de desarrollo de codebase.md"
expected_value: "Un solo punto de partida acordado (stack + carpetas + alias) para que los siguientes Work Items no discutan estructura."
risks:
  - "El preflight de Tailwind puede cambiar los estilos de App.css (márgenes, botones)."
  - "Compatibilidad de versiones con Vite ^8.3 y React 19: verificar antes de instalar."
summary: "`package.json` solo tiene React y Vite, y `src/` no tiene la estructura por capas definida en `knowledge/tech/codebase.md`, así que no hay dónde ni con qué construir las pantallas"
---

# Instalar dependencias base y crear la estructura de carpetas por capas

> Type: chore · Level: K2

## Source

- Source: roadmap
- Roadmap Initiative: RM-002 — Technical Foundation
- Work Item Candidate: WI-CANDIDATE-003
- Related domain: Frontend — plataforma técnica
- Related capabilities:
  - Base de aplicación con roles
  - Estándares de desarrollo de codebase.md

## Problem

`package.json` solo tiene React y Vite, y `src/` no tiene la estructura por capas definida en `knowledge/tech/codebase.md`, así que no hay dónde ni con qué construir las pantallas.

## Expected Value

Un solo punto de partida acordado (stack + carpetas + alias) para que los siguientes Work Items no discutan estructura.

## Impact

Cada Work Item posterior tendría que decidir dependencias y carpetas por su cuenta, generando estructuras inconsistentes.

## Context From Roadmap

This Work Item was materialized from roadmap initiative RM-002.

**Expected value:** Un solo punto de partida acordado (stack + carpetas + alias) para que los siguientes Work Items no discutan estructura.

**Dependencies:** ninguna.

**Source signals:** _Not provided in roadmap._

## Acceptance Criteria

- [ ] Están instaladas y declaradas en `package.json`: React Router, TanStack Query, Zustand, react-hook-form, zod y Tailwind CSS (con su plugin de Vite).
- [ ] `supabase-js` NO se instala aquí (corresponde a WI-007).
- [ ] Existe la estructura mínima en `src/` (`components/{ui,base,containers,templates}`, `layout`, `page`, `interfaces`, `hook`, `store`, `router`) con `.gitkeep` donde no haya código.
- [ ] Existe un alias `@/` hacia `src/` configurado en `vite.config.ts` y `tsconfig.app.json`.
- [ ] El catálogo/estilos existentes no cambian visualmente por la incorporación de Tailwind.
- [ ] `npm run build`, `npm run lint` y `npm run dev` funcionan.

## Design

Instalar solo lo que la roadmap "Now" necesita. Tailwind convive con `App.css` existente; nuevo código usa Tailwind. Nota técnica: `tsconfig.app.json` tiene `erasableSyntaxOnly` y `verbatimModuleSyntax`, así que no se pueden usar `enum` ni parameter properties (usar uniones de literales, por ejemplo para el estado del pedido).

## Risks

- El preflight de Tailwind puede cambiar los estilos de App.css (márgenes, botones).
- Compatibilidad de versiones con Vite ^8.3 y React 19: verificar antes de instalar.

## Notes

Confirmar versiones compatibles antes de instalar; no fijar versiones en este Work Item sin revisarlas.

## Open Questions

- ¿Tailwind reemplaza a `App.css` a mediano plazo o conviven? (se asume que conviven)
- ¿Se instala todo el stack ahora o solo lo que cada Work Item necesita? (se propone lo segundo)
- ¿Se mantiene `npm` como gestor de paquetes? (hay `package-lock.json`; se asume que sí)

## Out of scope

- Instalar `supabase-js` (WI-007).
- Configurar pruebas (WI-004).
- Crear rutas o layouts (WI-005).
- Escribir componentes de negocio.

## Validation

1. `npm install` → sin errores ni conflictos de peer dependencies.
2. `npm run build` → sin errores.
3. `npm run lint` → sin errores.
4. Manual: `npm run dev` → la app arranca; importar un módulo con `@/…` en `main.tsx` compila.
5. Manual: comparar visualmente el catálogo antes/después de instalar Tailwind (si WI-001 ya existe).
6. `git diff package.json` → solo aparecen las dependencias acordadas.

## Definition of Done

- [ ] Problem is clear.
- [ ] Expected result is defined.
- [ ] Impact of not doing it is stated.
- [ ] Acceptance criteria are verifiable.
- [ ] Las validaciones de la sección Validation pasan.
- [ ] Se ejecutó `kaddo scan` y `kaddo guard` sin drift inesperado.
- [ ] El conocimiento afectado (ADR / capacidades / estado actual) está actualizado.

## Suggested ownership (code globs)

- `package.json`
- `package-lock.json`
- `vite.config.ts`
- `tsconfig.app.json`
- `src/components/**`
- `src/layout/**`
- `src/interfaces/**`
- `src/hook/**`
- `src/store/**`
- `src/router/**`

_Sugerencia: aplicar con `kaddo owners suggest` cuando existan los archivos; el campo `code:` queda vacío hasta entonces._

## Learning

_What did we learn from this change? Update after completion._
