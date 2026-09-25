---
type: feature
id: WI-001
title: "Construir el catálogo de restaurantes del cliente (shell inicial)"
knowledge_level: K2
status: draft
phase: now
initiative: "Customer Delivery Foundation"
domains:
  - "Frontend — experiencia del cliente"
code: []
created_at: 2026-09-23
source: roadmap
source_id: WI-CANDIDATE-001
source_initiative: RM-001
source_roadmap_initiative: RM-001
source_work_item_candidate: WI-CANDIDATE-001
source_title: "Construir el catálogo de restaurantes del cliente (shell inicial)"
source_context: "Materialized from roadmap candidate WI-CANDIDATE-001 under initiative RM-001."
source_initiative_title: "Customer Delivery Foundation"
related_domain: "Frontend — experiencia del cliente"
related_capabilities:
  - "Catálogo de restaurantes"
  - "Base de aplicación con roles"
expected_value: "Primera experiencia navegable del producto, reutilizando el CSS ya existente y validando el punto de entrada del cliente."
risks:
  - "Tailwind (WI-003) puede alterar el CSS existente de App.css; comprobar que el catálogo se ve igual."
dependencies:
  - "WI-003"
  - "WI-005"
summary: "`src/App.tsx` renderiza un `<div>` vacío aunque `src/App.css` ya define el diseño del catálogo (topbar, hero, buscador, categorías, tarjetas), y `npm run build` falla porque `App.tsx` importa `useState` sin usarlo con `noUnusedLocals` activo"
---

# Construir el catálogo de restaurantes del cliente (shell inicial)

> Type: feature · Level: K2

## Source

- Source: roadmap
- Roadmap Initiative: RM-001 — Customer Delivery Foundation
- Work Item Candidate: WI-CANDIDATE-001
- Related domain: Frontend — experiencia del cliente
- Related capabilities:
  - Catálogo de restaurantes
  - Base de aplicación con roles

## Problem

`src/App.tsx` renderiza un `<div>` vacío aunque `src/App.css` ya define el diseño del catálogo (topbar, hero, buscador, categorías, tarjetas), y `npm run build` falla porque `App.tsx` importa `useState` sin usarlo con `noUnusedLocals` activo.

## Expected Value

Primera experiencia navegable del producto, reutilizando el CSS ya existente y validando el punto de entrada del cliente.

## Impact

Sin una primera pantalla no hay nada que validar con usuarios ni una estructura real sobre la cual construir el resto de los roles.

## Context From Roadmap

This Work Item was materialized from roadmap initiative RM-001.

**Expected value:** Primera experiencia navegable del producto, reutilizando el CSS ya existente y validando el punto de entrada del cliente.

**Dependencies:** WI-003; WI-005

**Source signals:** _Not provided in roadmap._

## Acceptance Criteria

- [ ] La ruta `/` muestra topbar, hero, buscador, lista de categorías y grilla de restaurantes usando las clases existentes de `App.css`.
- [ ] Los datos salen de un módulo local tipado (`Restaurant`) con al menos 8 restaurantes, incluyendo uno cerrado y varias categorías.
- [ ] Cada tarjeta muestra nombre, descripción, etiqueta/categoría, calificación y tiempo de entrega (los campos exactos se confirman en la pregunta abierta).
- [ ] Elegir una categoría o escribir en el buscador filtra la grilla; sin resultados se muestra el estado vacío (`empty-state`).
- [ ] Un restaurante cerrado se muestra con los estilos `closed` y `closed-overlay`.
- [ ] `index.html` usa `lang="es"` y un título propio en lugar de `frontend`.
- [ ] `npm run build` y `npm run lint` terminan sin errores.

## Risks

- Tailwind (WI-003) puede alterar el CSS existente de App.css; comprobar que el catálogo se ve igual.

## Notes

Usar datos locales representativos; sin autenticación, persistencia de checkout ni integración con backend. `hero.png` en `src/assets` puede reutilizarse en el hero.

## Open Questions

- ¿Qué información debe mostrar la tarjeta en la primera versión (calificación, tiempo de entrega, costo de envío, etiqueta)?
- ¿El selector de ubicación del topbar es solo texto estático en esta versión? (se asume que sí)
- Asunción: los botones de favorito y perfil son solo visuales por ahora.

## Out of scope

- Detalle de restaurante y menú (WI-002).
- Carrito, checkout y pedidos.
- Favoritos persistentes, ubicación real y autenticación.
- Datos reales desde Supabase.

## Validation

1. `npm run build` → termina sin errores de TypeScript.
2. `npm run lint` → sin errores.
3. `npm test` (si WI-004 ya está hecho) → pasa, incluyendo una prueba que renderiza el catálogo y filtra por categoría.
4. Manual: `npm run dev`, abrir `/` → ver 8+ tarjetas; escribir un nombre en el buscador → la grilla se reduce; escribir algo inexistente → aparece el estado vacío.
5. Manual: reducir el ancho a 900px y 600px → la grilla pasa de 4 a 2 y a 1 columna (media queries de `App.css`).

## Definition of Done

- [ ] Problem is clear.
- [ ] Expected result is defined.
- [ ] Impact of not doing it is stated.
- [ ] Acceptance criteria are verifiable.
- [ ] Las validaciones de la sección Validation pasan.
- [ ] Se ejecutó `kaddo scan` y `kaddo guard` sin drift inesperado.
- [ ] El conocimiento afectado (ADR / capacidades / estado actual) está actualizado.

## Suggested ownership (code globs)

- `src/page/Home*`
- `src/components/containers/client/**`
- `src/components/base/restaurants/**`
- `src/interfaces/restaurant*`
- `src/data/restaurants*`
- `index.html`

_Sugerencia: aplicar con `kaddo owners suggest` cuando existan los archivos; el campo `code:` queda vacío hasta entonces._

## Learning

_What did we learn from this change? Update after completion._
