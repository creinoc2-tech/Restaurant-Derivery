---
type: spike
id: WI-011
title: "Spike — proveedor de mapas y cálculo de costo de envío"
knowledge_level: K3
status: draft
phase: next
initiative: "Customer Order Flow"
domains:
  - "Pedidos — cliente"
code: []
created_at: 2026-09-23
source: roadmap
source_id: WI-CANDIDATE-011
source_initiative: RM-005
source_roadmap_initiative: RM-005
source_work_item_candidate: WI-CANDIDATE-011
source_title: "Spike — proveedor de mapas y cálculo de costo de envío"
source_context: "Materialized from roadmap candidate WI-CANDIDATE-011 under initiative RM-005."
source_initiative_title: "Customer Order Flow"
related_domain: "Pedidos — cliente"
related_capabilities:
  - "Cálculo de costo de envío por distancia"
  - "Geolocalización"
expected_value: "Decidir cómo se calcula distancia y costo de envío (Google Maps, Mapbox o aproximación simple) y qué implica en costo y privacidad."
risks:
  - "Elegir un proveedor de pago sin estimar el volumen puede generar costos inesperados."
  - "Enviar direcciones a un tercero implica un tema de privacidad."
dependencies:
  - "WI-006"
summary: "El costo de envío depende de la distancia entre restaurante y dirección, pero no está decidido cómo se obtiene la distancia ni con qué servicio"
---

# Spike — proveedor de mapas y cálculo de costo de envío

> Type: spike · Level: K3

## Source

- Source: roadmap
- Roadmap Initiative: RM-005 — Customer Order Flow
- Work Item Candidate: WI-CANDIDATE-011
- Related domain: Pedidos — cliente
- Related capabilities:
  - Cálculo de costo de envío por distancia
  - Geolocalización

## Problem

El costo de envío depende de la distancia entre restaurante y dirección, pero no está decidido cómo se obtiene la distancia ni con qué servicio.

## Expected Value

Decidir cómo se calcula distancia y costo de envío (Google Maps, Mapbox o aproximación simple) y qué implica en costo y privacidad.

## Impact

Sin esta decisión no se puede implementar el checkout (WI-012) ni definir el radio de entrega.

## Context From Roadmap

This Work Item was materialized from roadmap initiative RM-005.

**Expected value:** Decidir cómo se calcula distancia y costo de envío (Google Maps, Mapbox o aproximación simple) y qué implica en costo y privacidad.

**Dependencies:** WI-006

**Source signals:** _Not provided in roadmap._

## Acceptance Criteria

- [ ] Se comparan como mínimo tres opciones: Google Maps, Mapbox y una aproximación sin servicio externo (distancia en línea recta con las coordenadas).
- [ ] La comparación cubre costo estimado, límites gratuitos, precisión, dependencia externa y privacidad de direcciones.
- [ ] Se propone una fórmula de costo de envío (base + por km o por tramos) para que el negocio la confirme.
- [ ] Se define dónde se calcula: en una función RPC del servidor, no en el cliente.
- [ ] Se define cómo se obtienen las coordenadas de restaurante y cliente (geocodificación o ubicación del navegador).
- [ ] Existe un ADR candidato con la recomendación y las alternativas descartadas.

## Design

Spike documental con timebox sugerido de un día (asunción). Sin integración ni código de aplicación.

## Risks

- Elegir un proveedor de pago sin estimar el volumen puede generar costos inesperados.
- Enviar direcciones a un tercero implica un tema de privacidad.

## Notes

La fórmula de tarifa es una decisión de negocio: el spike solo la propone, no la fija.

## Open Questions

- ¿Se integra un servicio de mapas o se usa una aproximación más simple al inicio?
- ¿Hay radio máximo de entrega por restaurante? (depende de WI-006)
- ¿Cuál es el presupuesto mensual aceptable para el servicio de mapas?

## Out of scope

- Integrar el proveedor elegido.
- Implementar el checkout (WI-012).
- Rastreo GPS del repartidor (fuera de alcance de la v1).

## Validation

1. Revisión humana de la comparación y de la fórmula propuesta.
2. `kaddo questions` → la pregunta de mapas pasa a resuelta, asumida o diferida.
3. El ADR candidato queda enlazado desde `knowledge/tech/` y desde WI-012.

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
