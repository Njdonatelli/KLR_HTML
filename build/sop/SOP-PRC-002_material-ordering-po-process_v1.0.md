# SOP-PRC-002 · Material Ordering & PO Process

| Field | Value |
|-------|-------|
| Owner | Operations Manager |
| Version | v1.0 |
| Effective | 2026-08-17 |
| Last reviewed | 2026-08-17 |
| Next review | 2027-08-17 |
| Linked SOPs | DES-005, PRC-001, PRC-003, PRC-004, PRO-003, CON-004, FIN-003 |

> Bracketed values `[…]` are proposed defaults — confirm and lock before Effective date.

## Purpose
Standardize purchase-order creation, approval, and issuance against the takeoff (DES-005) and approved suppliers (PRC-001) so materials are ordered accurately, cost-controlled, and traceable. This is the **ordering transaction** that PRO-003 schedules against.

## Scope / Trigger
Fires when PRO-003 calls for an order (or long-lead items flagged at PRO-001). Covers PO generation, pricing verification, approval, issuance, tracking, and 3-way match at close. **Distinct from PRO-003** (which owns *timing*) — PRC-002 owns *the PO*.

## Roles (RACI-lite)
- **Responsible:** Production Lead (raise) / Operations Manager (approve)
- **Accountable:** Operations Manager
- **Consulted:** Design Lead (substitutions affecting design)
- **Informed:** Admin/Finance (job cost, FIN-003)

## Systems & Inputs
- **Contractor Foreman** — PO creation, approval, tracking.
- Takeoff (DES-005), materials plan (PRO-003), approved suppliers + pricing (PRC-001).

## Procedure
1. **Generate PO** from the materials plan (PRO-003) / takeoff (DES-005) — line items, quantities, supplier (PRC-001). → *Output: draft PO.*
2. **Verify pricing** against current supplier pricing (PRC-001); **flag variance vs. estimate** (feeds FIN-003). → *Output: priced PO.*
3. **Approval gate** — PO ≤ **[$ threshold]** approved by Production Lead; above → Operations Manager. → *Output: approved PO.*
4. **Issue** to supplier; confirm receipt + promised delivery date (feeds PRO-003 delivery calendar). → *Output: issued PO.*
5. **Track to delivery**; on substitution/backorder revise the PO and propagate to PRO-003 (schedule) + CON-004 (if scope/cost changes). → *Output: PO tracker.*
6. **Close on 3-way match** — PO ↔ receiving record (PRC-004) ↔ supplier invoice; resolve discrepancies before payment. → *Output: reconciled PO.*

## Acceptance Criteria / QC
**No material is ordered without an approved PO traceable to the takeoff; every PO closes on a 3-way match.** Concretely:
- Every PO traces to the materials plan / takeoff — no ad-hoc or verbal orders.
- Priced against PRC-001; variance vs. estimate flagged.
- Approval gate honored per threshold.
- 3-way match (PO / receipt / invoice) at close.
- Changes propagated to PRO-003 + CON-004.

## Exceptions & Escalation
- **Price variance beyond [tolerance]** → Operations Manager before issuing; may trigger CON-004 / FIN-003 note.
- **Backorder / substitution** → alternate approved supplier (PRC-001); propagate to schedule.
- **Receiving discrepancy** → PRC-004 resolution before invoice payment.

## Outputs
Approved, issued, reconciled POs → Contractor Foreman. Enables **PRO-003** delivery timing; feeds **FIN-003** job costing; receiving via **PRC-004**.

## Revision History
| Version | Date | Author | Change |
|---------|------|--------|--------|
| v1.0 | 2026-08-17 | Ops | Initial (closes the P1 register gap). Takeoff-traceable PO with approval gate + variance flag; 3-way-match close; change propagation to PRO-003/CON-004. |
