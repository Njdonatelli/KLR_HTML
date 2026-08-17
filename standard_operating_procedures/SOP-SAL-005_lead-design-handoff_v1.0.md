# SOP-SAL-005 · Lead → Design Handoff

| Field | Value |
|-------|-------|
| Owner | Sales Lead |
| Version | v1.0 |
| Effective | ____ |
| Last reviewed | ____ |
| Next review | +12 months |
| Linked SOPs | SAL-002, SAL-003, DES-001, DES-005, TEC-001, TEC-003, TEC-007 |

> Bracketed values `[…]` are proposed defaults — confirm and lock before Effective date.

## Purpose
Transfer a converted lead from **SalesRabbit into Contractor Foreman** with complete context and formally assign it to the Design Lead — so DES-001 starts with everything, nothing is re-keyed, and no lead falls in the CRM→PM gap.

## Scope / Trigger
Fires when a lead converts (Qualified + consult booked, SAL-003). Covers system sync, context packaging, assignment, acknowledgment, and pipeline-stage update. Ends when the Design Lead acknowledges an assigned, context-complete Contractor Foreman record. Distinct from the later production handoff (PRO-001).

## Roles (RACI-lite)
- **Responsible:** Sales Lead
- **Accountable:** Sales Lead
- **Consulted:** Geospatial/Tech Manager (automation/sync issues)
- **Informed:** Design Lead (assignee), Operations Manager

## Systems & Inputs
- **SalesRabbit** → **Contractor Foreman** (sync, ideally automated via Zapier/n8n per §TEC routing principle).
- Qualified lead + consult booking (SAL-002/003).

## Procedure
1. **Trigger on conversion** (SAL-003 booked). → *Output: handoff initiated.*
2. **Create/sync the CF record** from SalesRabbit — client, address, scope interest, qualification notes, source. Prefer automation; the sync must not require re-keying. → *Output: Contractor Foreman record.*
3. **Attach context pack** — qualification notes, consult date, access/staging notes, budget band, HOA flag (if known). → *Output: context pack.*
4. **Assign to Design Lead** and notify with consult details. → *Output: assigned + notified.*
5. **Confirm acknowledgment** — Design Lead acknowledges receipt; **no silent handoffs**. → *Output: acknowledged.*
6. **Update SalesRabbit stage** to reflect handoff; maintain a single source of truth per record (no dual-entry drift). → *Output: synced pipeline.*

## Acceptance Criteria / QC
**Every converted lead reaches the Design Lead with full context and an acknowledgment — nothing falls in the SalesRabbit→CF gap.** Concretely:
- CF record created with full context (no re-keying).
- Design Lead assigned and acknowledged.
- SalesRabbit stage updated.
- No converted lead un-handed-off past **[24 h]**.

## Exceptions & Escalation
- **Automation/sync failure** → manual handoff fallback immediately; never drop the lead. Log the failure to TEC-001/003/007.
- **Duplicate / re-engaged lead** → merge to the canonical record.
- **Handoff SLA breach** → Sales Lead / Operations Manager.

## Outputs
Context-complete Contractor Foreman project + Design Lead assignment → **DES-001**.

## Revision History
| Version | Date | Author | Change |
|---------|------|--------|--------|
| v1.0 | ____ | Sales Lead | Initial. SalesRabbit→CF sync (no re-key); context pack + mandatory Design Lead acknowledgment; manual fallback on automation failure. |
