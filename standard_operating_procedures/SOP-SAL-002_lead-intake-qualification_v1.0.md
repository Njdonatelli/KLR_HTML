# SOP-SAL-002 · Lead Intake & Qualification

| Field | Value |
|-------|-------|
| Owner | Sales Lead |
| Version | v1.0 |
| Effective | ____ |
| Last reviewed | ____ |
| Next review | +12 months |
| Linked SOPs | SAL-001, SAL-003, SAL-004, SAL-005, CX-002, TEC-009 |

> Bracketed values `[…]` are proposed defaults — confirm and lock before Effective date.

## Purpose
Convert every raw inbound signal, from any channel, into a single normalized SalesRabbit lead record, qualified against a fixed rubric, and dispositioned to exactly one next step. Guarantees no lead is lost, worked twice, or advanced unqualified.

## Scope / Trigger
Fires on any new lead signal:
- **Canvass** — rep-created in SalesRabbit (SAL-001).
- **Email** — M365 shared mailbox (the `klrbuildllc@gmail.com` forward; per framework §0 the shared mailbox is canonical, Gmail is never worked directly).
- **Phone / text** — (619) 739-1135.
- **Web** — klrbuild.com form.
- **Referral** — partner or past client.

Does **not** cover warranty/existing-client requests (→ CX-002) or commercial/non-residential inquiries (→ escalate, out of standard scope).

## Roles (RACI-lite)
- **Responsible:** Sales Lead (or intake-duty rep)
- **Accountable:** Sales Lead
- **Consulted:** Design Lead (scope-fit edge cases)
- **Informed:** Operations Manager (pipeline reporting)

## Systems & Inputs
- **SalesRabbit** — CRM of record.
- **M365 shared mailbox** — canonical email intake.
- Inbound signal with at minimum a contact method and a property reference.

## Procedure
1. **Capture** the lead into SalesRabbit within **[1 business hour]** of receipt (speed-to-lead), regardless of channel. Tag **Lead Source** on creation. → *Output: SalesRabbit lead record, source-tagged.*
2. **Deduplicate** against existing records by property address + name/phone. If dupe, merge — never create parallel records. → *Output: single canonical record.*
3. **Verify contact + property:** confirm property address, **ownership** (owner or owner-authorized), and HOA presence.
4. **Run qualification rubric** (below).
5. **Disposition** to one outcome:
   - **Qualified** → hand to SAL-003 (appointment setting).
   - **Nurture** → tag + place on follow-up cadence (soft timeline / undecided budget).
   - **Disqualified** → close with a **reason code** (out-of-area, renter, out-of-scope, no budget, unresponsive ×[3]).
6. **Complete required fields** for pipeline hygiene (feeds SAL-004) and clear the source signal — shared-mailbox item filed/flagged so nothing sits unworked.

### Qualification Rubric
**Hard gates (all must pass to qualify):**
- Project type in scope — patio/hardscape, pool/spa, four-season room, water feature/firepit, turf/planting/irrigation.
- Property owner (or authorized) — not a renter acting alone.
- Within service area — **[North County San Diego / ~25-mi Oceanside radius]**.

**Soft signals (weigh; weak signals → Nurture, not Disqualify):**
- Budget realism vs. project type (design-build has a practical floor).
- Timeline — ready within **[6 months]** vs. "just looking."
- Decision-makers identifiable/available for the consult.
- Motivation/trigger event (moving in, damage, event deadline).

HOA presence is **not** disqualifying — it's a process flag carried to CON-002.

## Acceptance Criteria / QC
- Every inbound signal is a SalesRabbit record within **[1 business hour]**.
- Lead Source tagged; no duplicate records for one property.
- Ownership + service-area confirmed before Qualified.
- Disposition set with reason code; zero leads in "new" state older than **[24 h]**.
- Shared-mailbox intake at **zero unworked** at end of each business day.

## Exceptions & Escalation
- **Out-of-area but high-value / referral** → Sales Lead discretion, log override reason.
- **Commercial / non-residential** → Principal (out of standard residential scope).
- **Warranty or existing-client** misrouted here → reassign to CX-002.
- **Ambiguous scope fit** → consult Design Lead before dispositioning.

## Outputs
- Qualified lead → **SAL-003**.
- Clean, source-tagged, dispositioned SalesRabbit record → **SAL-004** (hygiene) and **SAL-001** (territory/source feedback).

## Revision History
| Version | Date | Author | Change |
|---------|------|--------|--------|
| v1.0 | ____ | Sales Lead | Initial. Multi-channel intake normalized to SalesRabbit; hard-gate + soft-signal rubric; M365 shared mailbox as canonical email intake. |
