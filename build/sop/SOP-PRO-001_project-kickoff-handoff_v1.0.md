# SOP-PRO-001 · Project Kickoff & Handoff to Production

| Field | Value |
|-------|-------|
| Owner | Production Lead |
| Version | v1.0 |
| Effective | 2026-08-17 |
| Last reviewed | 2026-08-17 |
| Next review | 2027-08-17 |
| Linked SOPs | CON-001, CON-002, CON-003, DES-001, DES-004, DES-005, CON-004, PRO-002, PRO-003, FIN-001 |

> Bracketed values `[…]` are proposed defaults — confirm and lock before Effective date.

## Purpose
Transfer a signed project from Design/Sales to Production with **zero information loss**, so Production schedules and builds exactly what was sold and designed. Kills the design-build failure mode where the crew re-discovers or drifts from the sold scope.

## Scope / Trigger
Fires on CON-001 cleared funds. Covers the handoff review, package verification, constructability scan, permit/HOA gate mapping, and opening the production project structure. Ends when the Contractor Foreman production project exists and PRO-002 is triggered.

## Roles (RACI-lite)
- **Responsible:** Production Lead
- **Accountable:** Production Lead
- **Consulted:** Design Lead (scope/plans walkthrough), Operations Manager (permit/HOA/contract status)
- **Informed:** Principal (feasibility conflicts), Client (start expectations + POC)

## Systems & Inputs
- **Contractor Foreman** — production project structure.
- **Dropbox** — production subfolder per TEC-002.
- **Handoff package:** executed contract + locked scope (CON-001), plans/renderings (DES-004), takeoff/estimate (DES-005), site + drainage data + photos (DES-001), HOA status (CON-002), permit status (CON-003), milestone schedule (FIN-001), client priorities + access/staging notes, internal margin target.

## Procedure
1. **Receive handoff** — Production Lead gets the CON-001 handoff notice in Contractor Foreman. → *Output: handoff opened.*
2. **Handoff review meeting** — Design Lead walks Production through scope, plans, allowances, site constraints, drainage strategy, and client priorities. → *Output: logged handoff review.*
3. **Verify package** against the handoff checklist; **bounce gaps back** to Design/Ops — do not proceed on assumptions. → *Output: verified handoff package.*
4. **Constructability scan** — flag anything unbuildable-as-drawn, sub requirements, and long-lead materials. → *Output: feasibility flags (→ CON-004 if scope must change).*
5. **Map gating** — identify permit-gated (CON-003) and HOA-gated (CON-002) scope vs. scope that can **start now** (non-gated site work — the flyer's "construction starts while… finalized"). → *Output: start-now vs. gated map.*
6. **Set client comms** — confirm primary POC and update cadence; set start expectations. → *Output: comms plan.*
7. **Open production structure** — create phases/tasks in Contractor Foreman + Dropbox production subfolder. → *Output: production-ready project → triggers PRO-002 + PRO-003.*

## Acceptance Criteria / QC
**Production never starts re-discovering scope that was already sold and designed.** Concretely:
- Handoff package complete + verified against checklist.
- Handoff review meeting held and logged.
- Constructability scan complete; flags routed.
- Permit/HOA gating mapped (start-now vs. gated scope explicit).
- Client POC + cadence set.
- Contractor Foreman production project + Dropbox subfolder created.

## Exceptions & Escalation
- **Package gaps** → return to Design/Ops; no proceeding on assumptions.
- **Sold scope conflicts with buildable reality** → CON-004 or Principal + Design Lead.
- **Permit not yet issued** → start only non-permit site work; gated scope waits.
- **Margin at risk from a feasibility issue** → Principal.

## Outputs
Verified handoff package, feasibility flags, Contractor Foreman production project → triggers **PRO-002** (scheduling) and **PRO-003** (materials).

## Revision History
| Version | Date | Author | Change |
|---------|------|--------|--------|
| v1.0 | 2026-08-17 | Production Lead | Initial. Verified-handoff gate (sold = built); constructability scan; permit/HOA start-now vs. gated mapping. |
