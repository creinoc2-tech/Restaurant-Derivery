---
type: feature
id: WI-002
title: "Construir la página de detalle de restaurante con su menú"
knowledge_level: K2
status: draft
phase: now
initiative: "Customer Delivery Foundation"
domains:
  - "Frontend — experiencia del cliente"
code: []
created_at: 2026-09-23
source: roadmap
source_id: WI-CANDIDATE-002
source_initiative: RM-001
source_roadmap_initiative: RM-001
source_work_item_candidate: WI-CANDIDATE-002
source_title: "Construir la página de detalle de restaurante con su menú"
source_context: "Materialized from roadmap candidate WI-CANDIDATE-002 under initiative RM-001."
source_initiative_title: "Customer Delivery Foundation"
related_domain: "Frontend — experiencia del cliente"
related_capabilities:
  - "Menú del restaurante"
  - "Catálogo de restaurantes"
expected_value: "Permite validar cómo se presentan platillos, precio, categoría, disponibilidad y tiempo de preparación antes de implementar el carrito."
risks:
  - "El modelo de datos final puede diferir del tipado local; mantener el tipo `MenuItem` alineado con WI-006."
dependencies:
  - "WI-001"
  - "WI-005"
summary: "Desde el catálogo no se puede entrar a un restaurante ni ver su menú, por lo que no se puede validar la información que un cliente necesita para decidir su pedido"
---

# Construir la página de detalle de restaurante con su menú

> Type: feature · Level: K2

## Source

- Source: roadmap
- Roadmap Initiative: RM-001 — Customer Delivery Foundation
- Work Item Candidate: WI-CANDIDATE-002
- Related domain: Frontend — experiencia del cliente
- Related capabilities:
  - Menú del restaurante
  - Catálogo de restaurantes

## Problem

Desde el catálogo no se puede entrar a un restaurante ni ver su menú, por lo que no se puede validar la información que un cliente necesita para decidir su pedido.

## Expected Value

Permite validar cómo se presentan platillos, precio, categoría, disponibilidad y tiempo de preparación antes de implementar el carrito.

## Impact

Sin el detalle no se valida qué datos del platillo importan, y el carrito (WI-CANDIDATE-010) se construiría sobre suposiciones.

## Context From Roadmap

This Work Item was materialized from roadmap initiative RM-001.

**Expected value:** Permite validar cómo se presentan platillos, precio, categoría, disponibilidad y tiempo de preparación antes de implementar el carrito.

**Dependencies:** WI-001; WI-005

**Source signals:** _Not provided in roadmap._

## Acceptance Criteria

- [ ] Cada tarjeta del catálogo enlaza a `/restaurantes/:id`.
- [ ] La página muestra el encabezado del restaurante y su menú agrupado por categoría.
- [ ] Cada platillo muestra nombre, precio, categoría, disponibilidad (disponible/agotado) y tiempo de preparación.
- [ ] Un platillo no disponible se ve diferenciado y no ofrece acción de agregar.
- [ ] Un `id` inexistente muestra un estado de "restaurante no encontrado" con enlace de regreso al catálogo.
- [ ] Un restaurante cerrado se indica claramente en el detalle.
- [ ] `npm run build` y `npm run lint` terminan sin errores.

## Risks

- El modelo de datos final puede diferir del tipado local; mantener el tipo `MenuItem` alineado con WI-006.

## Notes

Datos locales ampliando el módulo de WI-001. El botón "agregar" queda sin funcionalidad o deshabilitado; el carrito es WI-CANDIDATE-010. `App.css` no tiene estilos de menú: se crean nuevos y se decide en WI-003 si van en Tailwind o CSS.

## Open Questions

- ¿La primera versión incluye navegación al detalle o solo el catálogo? (la roadmap propone incluirla como ítem separado)
- ¿Se muestran fotos de platillos o solo texto? (se asume solo texto)

## Out of scope

- Carrito y checkout.
- Reseñas y cupones.
- Edición del menú (panel de restaurante).
- Datos reales desde Supabase.

## Validation

1. `npm run build` y `npm run lint` → sin errores.
2. `npm test` → pasa una prueba que renderiza `/restaurantes/:id` con un id válido y otro inexistente.
3. Manual: `npm run dev`, entrar desde una tarjeta → ver menú agrupado por categoría; abrir `/restaurantes/no-existe` → estado de no encontrado.
4. Manual: un platillo agotado se ve diferenciado y no permite agregar.

## Definition of Done

- [ ] Problem is clear.
- [ ] Expected result is defined.
- [ ] Impact of not doing it is stated.
- [ ] Acceptance criteria are verifiable.
- [ ] Las validaciones de la sección Validation pasan.
- [ ] Se ejecutó `kaddo scan` y `kaddo guard` sin drift inesperado.
- [ ] El conocimiento afectado (ADR / capacidades / estado actual) está actualizado.

## Suggested ownership (code globs)

- `src/page/Restaurant*`
- `src/components/containers/client/**`
- `src/components/base/menu-items/**`
- `src/interfaces/menu*`
- `src/data/restaurants*`

_Sugerencia: aplicar con `kaddo owners suggest` cuando existan los archivos; el campo `code:` queda vacío hasta entonces._

## Learning

_What did we learn from this change? Update after completion._
