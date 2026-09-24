---
type: roadmap
id: roadmap
status: draft
generated_by: roadmap-agent
knowledge_level: K3
updated_at: 2026-09-23
---

# Roadmap

Generated with Kaddo Roadmap Agent. Initiatives and work items below are **candidates**
for human review — not final commitments.

## Summary

Create the first usable foundation for the multi-restaurant food delivery frontend.

## Assumptions

- The current Vite starter will be replaced incrementally with the delivery product experience.
- Supabase, authentication and the final map provider remain open implementation decisions.

## Roadmap Principles

- Start with a small customer-facing slice before expanding to restaurant, driver and admin roles.
- Keep business rules and data access behind the planned domain boundaries.
- Validate the product flow before adding real-time delivery features.

## Initiatives

### RM-001: Customer Delivery Foundation

**Goal:** Establish the initial customer experience for discovering restaurants and understanding the ordering flow.

**Related capabilities:** Restaurant catalog, restaurant menu discovery, role-aware application foundation.

**Project area / domain:** Frontend customer experience.

**Impact:** High

**Risk:** Medium

**Suggested Knowledge Level:** K3

**Dependencies:** Product scope for the first customer flow; backend contract is an assumption for this candidate.

**Why this comes now:** The project is new and the current application is still the default Vite starter, so a thin end-to-end product slice is the best way to establish the structure before implementing the other roles.

**Candidate Work Items:**

- WI-CANDIDATE-001: Build the initial customer-facing restaurant catalog shell
	- type: feature
	- suggested knowledge level: K2
	- expected value: Provide a first navigable product experience and validate the core customer entry point.
	- notes: Use representative local data initially; keep authentication, checkout persistence and backend integration out of scope.

**Open questions:**

- Which customer information must be visible on a restaurant card in the first release?
- Should the first slice include restaurant detail and menu navigation, or only the catalog?

---

## Suggested Execution Order

1. WI-CANDIDATE-001: Build the initial customer-facing restaurant catalog shell.

## Risks and Constraints

- Backend contracts and authentication are not implemented yet.
- No automated test strategy has been detected.
- The roadmap candidate uses local representative data until the data contract is decided.

## Not Now

- Restaurant management panel.
- Driver assignment and live delivery tracking.
- Administration, commissions and reporting.
- Production authentication and Supabase integration.

## Next Recommended Work Item

WI-CANDIDATE-001: Build the initial customer-facing restaurant catalog shell.
