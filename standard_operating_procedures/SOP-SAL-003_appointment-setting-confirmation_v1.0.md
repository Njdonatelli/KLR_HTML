# SOP-SAL-003 · Appointment Setting & Confirmation

| Field | Value |
|-------|-------|
| Owner | Sales Lead |
| Version | v1.0 |
| Effective | ____ |
| Last reviewed | ____ |
| Next review | +12 months |
| Linked SOPs | SAL-002, SAL-004, SAL-005, DES-001, TEC-009, TEC-003, TEC-007 |

> Bracketed values `[…]` are proposed defaults — confirm and lock before Effective date.

## Purpose
Convert a qualified lead into a **booked, confirmed consultation** on the Design Lead's calendar with decision-makers committed and context attached — minimizing no-shows and giving DES-001 everything it needs before the visit.

## Scope / Trigger
Fires when SAL-002 marks a lead **Qualified**. Covers booking, calendaring, attendance confirmation, reminder cadence, and reschedules. Ends when a confirmed consult with attached context is ready for SAL-005 / DES-001.

## Roles (RACI-lite)
- **Responsible:** Sales Lead (or intake-duty rep)
- **Accountable:** Sales Lead
- **Consulted:** Design Lead (availability)
- **Informed:** Client, Operations Manager

## Systems & Inputs
- **M365 calendar** — canonical scheduling (framework §0).
- **SalesRabbit** — lead record + stage.
- **Zapier / n8n** — confirmation + reminder automation (platform per §TEC routing principle).
- Qualified lead + notes (SAL-002).

## Procedure
1. **Contact to book** within **[1 business hour]** of qualification; offer Design Lead availability pulled from the M365 calendar. → *Output: booked slot.*
2. **Create the consult event** on the M365 calendar with lead context attached (SalesRabbit link, qualification notes, address, access notes). → *Output: calendar event.*
3. **Confirm decision-makers** will attend (per the SAL-002 soft signal). → *Output: attendance confirmed.*
4. **Set confirmation cadence** via automation — booking confirm now, **[24 h]** reminder, day-of reminder. → *Output: reminder cadence active.*
5. **Handle reschedule/cancel** — rebook, update the event + SalesRabbit; after **[2]** no-shows, disposition per SAL-002 (nurture/DQ). → *Output: updated record.*
6. **Pre-consult handoff** — ensure the Design Lead has context before the visit (feeds DES-001 pre-visit prep). → *Output: consult-ready.*

## Acceptance Criteria / QC
**No consult is booked without decision-makers confirmed and context attached.** Concretely:
- Qualified lead contacted within [1 business hour].
- Consult on the M365 calendar with SalesRabbit context attached.
- Decision-maker attendance confirmed.
- Confirmation + reminder cadence active.
- Reschedules/no-shows tracked and dispositioned.

## Exceptions & Escalation
- **Client unresponsive to booking** → nurture cadence (SAL-002); don't hard-DQ prematurely.
- **Out-of-area edge case** → Sales Lead discretion.
- **Repeated no-shows** → disposition; VIP/large project → Design Lead + Operations Manager.

## Outputs
Confirmed M365 consult + attached context → **SAL-005** / **DES-001**.

## Revision History
| Version | Date | Author | Change |
|---------|------|--------|--------|
| v1.0 | ____ | Sales Lead | Initial. [1-hr] speed-to-book; M365-calendar consult with context; decision-maker confirmation + automated reminder cadence to cut no-shows. |
