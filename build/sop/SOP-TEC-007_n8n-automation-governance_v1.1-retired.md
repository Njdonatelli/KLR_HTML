# SOP-TEC-007 · n8n Automation Governance & Change Log — **RETIRED**

| Field | Value |
|-------|-------|
| Owner | Geospatial / Tech Manager |
| Version | v1.1 (retired) |
| Effective | 2026-08-17 |
| Last reviewed | 2026-08-17 |
| Next review | 2027-08-17 |
| Linked SOPs | TEC-003 (successor), TEC-001, TEC-006 |

> **Status: Retired 2026-08-17.** n8n is no longer an automation platform at KLR Build. This SOP governs nothing in production and is retained for provenance only, per GOV-000 (retired SOPs are archived, not deleted, so historical references resolve).
> **Successor: SOP-TEC-003 · Zapier Automation Governance & Change Log.** All automation governance — cataloging, naming, change control, credential hygiene, monitoring, retirement — reads from TEC-003. Work that outgrows a Zap moves to a scheduled script under TEC-003 change control, not to a second platform.

## Purpose
*(Historical.)* Governed n8n workflows — cataloging, ownership, naming, versioning, credential-store hygiene, execution monitoring, and instance backup — carrying the extra responsibilities of a self-hosted platform that Zapier's SaaS model absorbs.

## Scope / Trigger
**None.** Scope is empty as of 2026-08-17. No workflow, credential, or instance is governed by this document. Do not author new procedure against it.

## Roles (RACI-lite)
- **Responsible:** Geospatial / Tech Manager — *for decommissioning only.*
- **Accountable:** Operations Manager
- **Consulted:** —
- **Informed:** All staff previously relying on n8n workflows

## Systems & Inputs
- **n8n** (`klrbuild.app.n8n.cloud`) — instance pending decommission; no workflows in scope.
- **TEC-003** — the live governance document; consult it instead of this one.

## Procedure
Retirement procedure, per GOV-000 §retirement. Steps 1–3 remain open until the instance is decommissioned.

1. **Confirm empty scope** — verify no active workflow, webhook, or scheduled trigger remains on the instance. → *Output: empty-scope confirmation.* **Open.**
2. **Export and archive** any workflow JSON and execution history worth keeping to Dropbox under TEC-006 retention, then **revoke the credential store** — every credential held in n8n is a live secret until explicitly rotated or deleted (TEC-001). → *Output: archive + credential revocation record.* **Open.**
3. **Cancel or downgrade the instance** at `klrbuild.app.n8n.cloud`; record the termination date. → *Output: decommission record.* **Open.**
4. **Redirect references** — any SOP, script, or document citing n8n governance points to TEC-003. → *Output: reconciled references.* **Done 2026-08-17** (TEC-003 v1.1; register domain description updated).
5. **Retain this document** read-only. Do not amend beyond the decommission record. → *Output: archived SOP.* **Done.**

## Acceptance Criteria / QC
**No production dependency on n8n remains, and no credential survives in the retired instance.** Concretely:
- No active workflow, webhook, or schedule on the instance.
- Workflow exports and execution history archived per TEC-006, or explicitly declined in writing.
- Every credential in the n8n store revoked or rotated, and its TEC-001 inventory entry closed.
- Instance cancelled or downgraded, with a recorded date.
- No live SOP, script, or automation cites TEC-007 as governing.

## Exceptions & Escalation
- **A live dependency on n8n surfaces after retirement** → do not reactivate this SOP. Rebuild the automation under TEC-003 and escalate to the Operations Manager if the process is time-critical.
- **A credential cannot be located during revocation** → treat as compromised: rotate at the source system per TEC-001.

## Outputs
Decommission record, credential-revocation record, and workflow archive → Dropbox (TEC-006 retention). Governance authority transferred in full to **TEC-003**.

## Revision History
| Version | Date | Author | Change |
|---------|------|--------|--------|
| v1.1 | 2026-08-17 | Tech Manager | **Retired.** Scope emptied on n8n's removal as an automation platform; governance authority transferred to TEC-003; procedure replaced with a decommission checklist (empty-scope confirmation, credential revocation, instance cancellation) — steps 1–3 open. |
| v1.0 | 2026-08-17 | Tech Manager | Initial. Workflow catalog + versioning + SOP linkage; credential-store hygiene (no hardcoding); weekly execution monitoring; self-hosted backup/uptime responsibilities. |
