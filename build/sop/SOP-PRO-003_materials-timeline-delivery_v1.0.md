# SOP-PRO-003 · Materials Timeline & Delivery Coordination

| Field | Value |
|-------|-------|
| Owner | Production Lead |
| Version | v1.0 |
| Effective | 2026-08-17 |
| Last reviewed | 2026-08-17 |
| Next review | 2027-08-17 |
| Linked SOPs | PRO-001, PRO-002, DES-005, PRC-001, PRC-002, PRC-003, PRC-004, CON-004, FIN-003 |

> Bracketed values `[…]` are proposed defaults — confirm and lock before Effective date.

## Purpose
Order materials against the takeoff (DES-005) with timing tied to the schedule (PRO-002) so each phase has what it needs when the crew arrives — **no idle crews waiting on materials, nothing perishable delivered early**. Delivers the flyer's "materials arrive and installation begins."

## Scope / Trigger
Fires on PRO-001 trigger; runs in lockstep with PRO-002 through the build. Covers materials planning, lead-time classification, PO placement, delivery timing/staging, and delay propagation. Ends when the last phase's materials are received. Ordering mechanics live in PRC-002; supplier list in PRC-001.

## Roles (RACI-lite)
- **Responsible:** Production Lead
- **Accountable:** Production Lead
- **Consulted:** Operations Manager (PO approvals per PRC-002), Client (plant selection, PRC-003)
- **Informed:** Crew (delivery windows), Design Lead (substitutions affecting design)

## Systems & Inputs
- **Contractor Foreman** — materials list, POs, delivery calendar.
- Takeoff (DES-005), schedule (PRO-002), approved suppliers (PRC-001 — SiteOne hardscape/irrigation, nurseries), site access/staging notes (DES-001).

## Procedure
1. **Build materials list** from the takeoff (DES-005); classify each item **stock / special-order / long-lead**. **No ad-hoc ordering** outside the takeoff. → *Output: materials plan.*
2. **Map delivery dates** — for each item, work backward from its required-on-site phase date (PRO-002) by lead time + **[buffer]**. → *Output: delivery calendar.*
3. **Place POs** via PRC-002 against approved suppliers (PRC-001); **order long-lead items immediately** (flagged at PRO-001). → *Output: issued POs.*
4. **Coordinate windows + staging** against site access/logistics (DES-001); schedule **perishables (plants) close to install**, not early. → *Output: scheduled deliveries.*
5. **Track + resolve** — monitor order status; on backorder/substitution, resolve (alt supplier via PRC-001 / substitution) and propagate to PRO-002 (reschedule) and CON-004 (if scope/cost changes). → *Output: order tracker.*
6. **Receive + inspect** per PRC-004; log and resolve over/short/damage against the PO. → *Output: verified materials on site.*

## Acceptance Criteria / QC
**Every phase has its materials on site before the crew arrives; nothing perishable arrives early.** Concretely:
- Materials plan derived from the takeoff (no ad-hoc orders).
- Long-lead items ordered at kickoff.
- Each delivery mapped to its phase date with buffer.
- Perishables timed to install.
- Deliveries received + inspected against PO (PRC-004).
- Delays propagated to schedule (PRO-002) + client.

## Exceptions & Escalation
- **Long-lead item threatens start** → resequence phases (PRO-002) or substitute (CON-004).
- **Backorder** → alternate approved supplier (PRC-001).
- **Over/short/damaged delivery** → PRC-004 resolution against PO.
- **Delay threatening a committed milestone** → Operations Manager + client; reorder price change → CON-004 / FIN-003.

## Outputs
Materials plan, delivery calendar, POs, order tracker → Contractor Foreman + Dropbox. Enables **FLD** phases; feeds **PRO-002** updates and **FIN-003** job costing.

## Revision History
| Version | Date | Author | Change |
|---------|------|--------|--------|
| v1.0 | 2026-08-17 | Production Lead | Initial. Takeoff-derived JIT materials plan tied to schedule; long-lead ordered at kickoff; perishables timed to install; delay propagation to PRO-002/CON-004. |
