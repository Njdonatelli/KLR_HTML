# SOP-FIN-002 · Invoicing & AR Follow-up

| Field | Value |
|-------|-------|
| Owner | Admin / Finance |
| Version | v1.0 |
| Effective | ____ |
| Last reviewed | ____ |
| Next review | +12 months |
| Linked SOPs | FIN-001, FIN-003, CON-004, PRO-002, CX-001 |

> Bracketed values `[…]` are proposed defaults. **Not legal advice** — CA preliminary-notice / mechanics-lien timing must be verified with counsel before relying on it.

## Purpose
Issue milestone invoices promptly when FIN-001 triggers fire, track receivables, and work overdue balances on a fixed cadence so collections stay in step with the build — cash never lags materially behind work performed.

## Scope / Trigger
Fires on each verified milestone release from FIN-001 (and the final invoice at CX-001). Covers invoice issuance, AR aging, follow-up, and payment reconciliation. Does **not** set the payment structure (FIN-001) or reconcile job margin (FIN-003).

## Roles (RACI-lite)
- **Responsible:** Admin / Finance
- **Accountable:** Operations Manager
- **Consulted:** Production Lead (milestone verification), Principal + counsel (chronic non-payment / lien)
- **Informed:** Client (invoices, reminders)

## Systems & Inputs
- **Contractor Foreman** — invoicing + AR.
- Milestone releases (FIN-001), completion verification (PRO-005/PRO-006), contract payment terms (CON-001).

## Procedure
1. **Issue invoice** within **[1 business day]** of a verified milestone release (FIN-001); reference the milestone + SOV line. → *Output: issued invoice.*
2. **Send + log** to the client POC with due date per contract terms (**[net __ / due on receipt]**). → *Output: sent invoice + due date.*
3. **Track AR aging** weekly; flag approaching and overdue. → *Output: AR aging report.*
4. **Follow-up cadence** on overdue — reminder at due, **[+3d]**, **[+7d]**; escalate at **[+14d]**. → *Output: follow-up log.*
5. **Escalate** past **[14d]** to Operations Manager / Principal; reference contract remedies (stop-work, lien) with counsel — **mind CA preliminary-notice / lien deadlines [verify timing]**. → *Output: escalation record.*
6. **Reconcile** payments received; update AR; confirm payment before proceeding past any payment-gated milestone the contract defines. → *Output: reconciled ledger.*

## Acceptance Criteria / QC
**Collections stay in step with work performed; no payment-gated phase proceeds unpaid.** Concretely:
- Invoice issued within [1 business day] of verified milestone.
- Every invoice tracked to payment.
- AR aging reviewed weekly.
- Overdue worked per cadence; escalations logged.
- Lien/notice deadlines respected where non-payment escalates.

## Exceptions & Escalation
- **Disputed invoice** → tie resolution to CX-001 / CON-004; don't let a dispute silently age.
- **Partial payment** → log + continue following the balance.
- **Chronic non-payment** → Principal + counsel; preserve lien rights (CA prelim-notice timing — verify).

## Outputs
Invoices, AR aging, payment reconciliation → Contractor Foreman. Feeds **FIN-003** (job costing) and final reconciliation at **CX-001**.

## Revision History
| Version | Date | Author | Change |
|---------|------|--------|--------|
| v1.0 | ____ | Admin/Finance | Initial. [1-day] issuance off verified milestones; weekly AR aging; tiered overdue cadence with lien-deadline awareness (verify). |
