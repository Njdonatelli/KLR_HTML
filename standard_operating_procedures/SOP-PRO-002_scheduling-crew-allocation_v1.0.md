# SOP-PRO-002 · Scheduling & Crew Allocation

| Field | Value |
|-------|-------|
| Owner | Production Lead |
| Version | v1.0 |
| Effective | ____ |
| Last reviewed | ____ |
| Next review | +12 months |
| Linked SOPs | PRO-001, PRO-003, PRO-004, PRO-005, CON-002, CON-003, FIN-001, FLD-002, SAF-002 |

> Bracketed values `[…]` are proposed defaults — confirm and lock before Effective date.

## Purpose
Produce and maintain a realistic, dependency-aware schedule with crew/sub assignments that respects permit/HOA gates, material lead times, and inspection hold points — and keeps every active project current on a weekly cadence.

## Scope / Trigger
Two layers: **(a) per-project** schedule build on PRO-001 trigger; **(b) weekly cross-project** look-ahead + crew allocation. Ends only when a project reaches closeout (PRO-006) — the weekly layer is continuous.

## Roles (RACI-lite)
- **Responsible:** Production Lead
- **Accountable:** Production Lead
- **Consulted:** Subs (availability, PRO-004), Operations Manager (client-milestone commitments)
- **Informed:** Crew, Client (published milestones)

## Systems & Inputs
- **Contractor Foreman** — schedule + crew/sub allocation.
- Handoff + gating map (PRO-001), materials delivery calendar (PRO-003), daily actuals (PRO-005), billing milestones (FIN-001).

## Procedure
1. **Build phase schedule** from handoff — sequence: site prep/excavation → drainage/grading → base → hardscape → structures/pool coordination → planting/turf/irrigation → cleanup/walkthrough. Set durations; encode dependencies (HOA/permit gates, PRO-003 deliveries, inspection hold points). → *Output: project schedule in CF.*
2. **Allocate crew + subs** per phase against capacity; issue sub schedule requests (PRO-004) with lead time. → *Output: resourced schedule.*
3. **Insert gates + buffers** — no gated phase before its approval (CON-002/003); weather buffer on concrete/drainage phases. → *Output: gated schedule.*
4. **Publish client milestones** (start, key phases, est. completion) aligned to FIN-001 billing milestones. → *Output: client-facing schedule.*
5. **Weekly look-ahead** [**each Monday**] — review all active projects, reconcile actual vs. planned from PRO-005 logs, reallocate crew, flag slippage, update client milestones on any material/gate change. → *Output: updated weekly schedule.*

## Acceptance Criteria / QC
**No phase is scheduled before its gate (permit / HOA / material) clears.** Concretely:
- Every active project has a current CF schedule with dependencies + gates encoded.
- Crew/subs allocated within capacity; sub lead time honored.
- Client milestones published and kept current.
- Weekly look-ahead performed and logged.

## Exceptions & Escalation
- **Material delay** → reschedule dependent phases (coordinate PRO-003), notify client.
- **Crew over-allocation** → Production Lead reprioritizes; Principal if capacity structurally short.
- **Inspection failure** → hold affected phase + reschedule (SAF).
- **Gate slippage threatening a committed client milestone** → Operations Manager + client comms.

## Outputs
Project + weekly schedules, sub requests, published client milestones → Contractor Foreman. Drives **PRO-003** (delivery timing), **PRO-004** (subs), and field execution (**FLD**).

## Revision History
| Version | Date | Author | Change |
|---------|------|--------|--------|
| v1.0 | ____ | Production Lead | Initial. Gate-aware phase scheduling (permit/HOA/material) + weather buffers; weekly cross-project look-ahead reconciled against PRO-005 actuals. |
