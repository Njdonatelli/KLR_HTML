# KLR Build LLC — Standard Operating Procedure Framework

**Document type:** Framework / meta-SOP (governs how all SOPs are authored, numbered, stored, and maintained)
**Version:** v1.12 · **Status:** Draft for approval · **Owner:** Operations Manager
**Effective:** ____ · **Next review:** +12 months or on major process/tool change

---

## 0. Assumptions (flag corrections before build)

This framework is scaffolded against known operating context. Adjust codes/owners if any of these are wrong:

- **Stack (v1.2):** SalesRabbit (canvassing/CRM), Contractor Foreman (project mgmt/scheduling), Trello, Dropbox (document store), Zapier + n8n (automation, both canonical by design), **Microsoft 365 (canonical mail/calendar)**, Zoom (meetings).
- **Canonical resolved (v1.2):** Mail/calendar = **Microsoft 365**. Automation = **Zapier *and* n8n, both retained by design** (lanes in TEC). Google Workspace connectors remain visible but are **non-canonical** — no business SOP targets Gmail/Google Calendar/Google Drive as source of record. *Resolved (v1.3):* `klrbuildllc@gmail.com` **forwards into an M365 shared mailbox** — printed flyers stay valid, single inbox of record. SAL-002 treats the shared mailbox as the canonical intake point; Gmail is forward-only and never worked directly.
- **Doc store = Dropbox.** Storage convention (§6) is built for Dropbox + a PARA-adjacent layout.
- **Source of truth = Markdown.** `.md` masters feed the LLM knowledge base; PDF renders are the field/print artifact. If you want Google Docs or Contractor Foreman-native docs as source, §6 changes.
- **Owners are role titles, not names.** Populate the actual person per role during rollout.
- **Regulatory anchor = California** (CSLB licensing, FAA Part 107 for drone ops).

Source context for services/process: *KLR Build Door Flyer* (uploaded).

---

## 1. Purpose & Scope

Defines the single system for creating, numbering, storing, versioning, and retiring operating procedures across KLR Build. Every SOP in the company conforms to this framework. The framework itself is `SOP-GOV-000`.

**In scope:** repeatable business processes across all functional domains (§3).
**Out of scope:** one-off decisions, project-specific design intent, and craft judgment that resists standardization (documented as *guidelines*, not SOPs).

---

## 2. Numbering & Naming Convention

```
SOP-[DOMAIN]-[###]
```

- `DOMAIN` — 2–3 letter code from the taxonomy (§3).
- `###` — zero-padded sequential within domain. Never reused after retirement.
- Filename: `SOP-DES-004_rendering-production_v1.2.md`
- Title inside doc matches the register (§5) exactly.

**Rationale:** domain-prefixed IDs keep the register sortable, make cross-references stable across renumbering, and give the LLM KB clean, collision-free keys for retrieval.

---

## 3. Domain Taxonomy

| Code | Domain | Default Owner (role) | Primary System |
|------|--------|----------------------|----------------|
| `GOV` | Governance & Framework | Operations Manager | Dropbox |
| `SAL` | Sales & Lead Management | Sales Lead | SalesRabbit |
| `DES` | Design & Estimating | Design Lead | Contractor Foreman + geospatial toolchain |
| `CON` | Contracts, Permitting & HOA | Operations Manager | Contractor Foreman |
| `PRO` | Project & Production Management | Production Lead | Contractor Foreman |
| `FLD` | Field Execution & Craft Standards | Production Lead | — (field) |
| `PRC` | Procurement & Vendor Management | Operations Manager | SiteOne / nurseries |
| `FIN` | Finance & Administration | Admin / Finance | Contractor Foreman |
| `SAF` | Safety & Compliance | Operations Manager | — |
| `TEC` | Technology, Data & Automation | Geospatial / Tech Manager | Dropbox / Zapier |
| `CX` | Customer Experience & Warranty | Operations Manager | — |
| `HR` | People & HR | Principal | — |

---

## 4. Standard SOP Structure

Every SOP is a Markdown file using this skeleton. Copy-paste block:

```markdown
# SOP-XXX-000 · [Title]

| Field | Value |
|-------|-------|
| Owner | [role] |
| Version | v1.0 |
| Effective | YYYY-MM-DD |
| Last reviewed | YYYY-MM-DD |
| Next review | YYYY-MM-DD |
| Linked SOPs | [IDs] |

## Purpose
One or two sentences: what outcome this guarantees.

## Scope / Trigger
When this SOP fires and what it does not cover.

## Roles (RACI-lite)
- Responsible: …
- Accountable: … (single owner)
- Consulted / Informed: …

## Systems & Inputs
Tools touched, input artifacts required to start.

## Procedure
1. Step (imperative). System: [X]. Output: [artifact].
2. …

## Acceptance Criteria / QC
Objective checks that define "done correctly."

## Exceptions & Escalation
Deviation path and who authorizes it.

## Outputs
Artifacts produced, where they land (path/system).

## Revision History
| Version | Date | Author | Change |
```

**Non-negotiable fields:** ID, Owner, Version, Acceptance Criteria, Revision History. An SOP without objective acceptance criteria is a description, not a procedure.

---

## 5. Master SOP Register

`Tier` = build order: **P1** core revenue path (build first) · **P2** important · **P3** optimize later.

### Customer-facing spine (maps to the 7-step flyer process)

| Flyer Step | Register coverage |
|-----------|-------------------|
| 1. Initial Consultation | `SOP-DES-001` |
| 2. Design Preview (5–7 day) | `SOP-DES-002…006` |
| 3. Deposit & HOA (3–4 day) | `SOP-CON-001`, `SOP-CON-002` |
| 4. Commencement | `SOP-PRO-001`, `SOP-PRO-002` |
| 5. Delivery & Install | `SOP-PRO-003`, `SOP-FLD-001…006` |
| 6. Plants & Turf (nursery) | `SOP-PRC-003`, `SOP-FLD-005` |
| 7. Final Walk-Through | `SOP-CX-001` |

### SAL — Sales & Lead Management

| ID | Title | Trigger / Freq | System | Tier |
|----|-------|----------------|--------|------|
| SAL-001 | Canvassing & Territory Assignment | Per campaign | SalesRabbit | P2 |
| SAL-002 | Lead Intake & Qualification | Per lead | SalesRabbit | P1 |
| SAL-003 | Appointment Setting & Confirmation | Per lead | SalesRabbit / Zapier | P1 |
| SAL-004 | CRM Data Hygiene & Pipeline Stages | Weekly | SalesRabbit | P2 |
| SAL-005 | Lead → Design Handoff | Per won lead | Zapier | P1 |

### DES — Design & Estimating

| ID | Title | Trigger / Freq | System | Tier |
|----|-------|----------------|--------|------|
| DES-001 | Initial Consultation & Site Assessment | Per project | Contractor Foreman | P1 |
| DES-002 | Drone / Aerial Survey & GCP Capture | Per project (as needed) | DJI + GCP kit | P2 |
| DES-003 | Photogrammetry & 3D Model Generation | Post-survey | RealityScan / Blender | P2 |
| DES-004 | 2D/3D Rendering Production (5–7 day SLA) | Per project | Realtime Landscaping | P1 |
| DES-005 | Takeoff & Itemized Estimate Build | Per project | Contractor Foreman | P1 |
| DES-006 | Proposal Assembly & Delivery | Per project | Contractor Foreman | P1 |

### CON — Contracts, Permitting & HOA

| ID | Title | Trigger / Freq | System | Tier |
|----|-------|----------------|--------|------|
| CON-001 | Deposit Processing & Contract Execution | Per sale | Contractor Foreman | P1 |
| CON-002 | HOA Submission Package (3–4 day SLA) | Per project | Dropbox | P1 |
| CON-003 | Permit Application & Tracking | Per project | Jurisdiction portal | P2 |
| CON-004 | Change Order Authorization | Ad hoc | Contractor Foreman | P1 |

### PRO — Project & Production Management

| ID | Title | Trigger / Freq | System | Tier |
|----|-------|----------------|--------|------|
| PRO-001 | Project Kickoff & Handoff to Production | Per project | Contractor Foreman | P1 |
| PRO-002 | Scheduling & Crew Allocation | Weekly | Contractor Foreman | P1 |
| PRO-003 | Materials Timeline & Delivery Coordination | Per project | Contractor Foreman | P1 |
| PRO-004 | Subcontractor Onboarding & Scheduling | Per sub | Contractor Foreman | P2 |
| PRO-005 | Daily Jobsite Log & Progress Reporting | Daily | Contractor Foreman | P2 |
| PRO-006 | Project Closeout & Punch List | Per project | Contractor Foreman | P1 |

### FLD — Field Execution & Craft Standards

| ID | Title | Trigger / Freq | System | Tier |
|----|-------|----------------|--------|------|
| FLD-001 | Site Prep & Excavation | Per project | — | P2 |
| FLD-002 | Drainage & Grading Standards | Per project | — | P1 |
| FLD-003 | Hardscape / Paver Installation Standards | Per project | — | P1 |
| FLD-004 | Pool & Water Feature Rough-In Coordination | As applicable | — | P2 |
| FLD-005 | Planting, Turf & Irrigation Install | Per project | — | P2 |
| FLD-006 | Jobsite Cleanliness & Daily Close | Daily | — | P3 |

> `FLD-002` is P1 despite being field craft — drainage is the differentiator claimed on the flyer ("protect foundations… from water damage and settling") and the highest callback-risk item. Standardize it early.

### PRC — Procurement & Vendor Management

| ID | Title | Trigger / Freq | System | Tier |
|----|-------|----------------|--------|------|
| PRC-001 | Vendor Setup & Approved Supplier List | Ad hoc | SiteOne / nurseries | P2 |
| PRC-002 | Material Ordering & PO Process | Per project | Contractor Foreman | P1 |
| PRC-003 | Nursery Plant Selection Walk (client-attended) | Per project | — | P2 |
| PRC-004 | Delivery Receiving & Inspection | Per delivery | — | P2 |

### FIN — Finance & Administration

| ID | Title | Trigger / Freq | System | Tier |
|----|-------|----------------|--------|------|
| FIN-001 | Payment Schedule & Milestone Billing | Per project | Contractor Foreman | P1 |
| FIN-002 | Invoicing & AR Follow-up | Weekly | Contractor Foreman | P1 |
| FIN-003 | Job Costing & Margin Tracking | Per project | Contractor Foreman | P2 |
| FIN-004 | Expense & Receipt Capture | Ongoing | Contractor Foreman / Zapier | P3 |

### SAF — Safety & Compliance

| ID | Title | Trigger / Freq | System | Tier |
|----|-------|----------------|--------|------|
| SAF-001 | Jobsite Safety & PPE Standards | Ongoing | — | P2 |
| SAF-002 | Equipment Operation & Inspection | Per use / monthly | — | P2 |
| SAF-003 | Drone Ops Safety & FAA Part 107 Compliance | Per flight | — | P2 |
| SAF-004 | Incident Reporting & Insurance Claims | Ad hoc | — | P1 |
| SAF-005 | Licensing & Insurance Currency (CSLB) | Quarterly | — | P1 |

### TEC — Technology, Data & Automation

TEC is expected to grow. Entries carry a **Cluster** tag so new SOPs slot into a defined bucket rather than sprawling. Numbering stays flat sequential (§2) — cluster is a label, not part of the ID. Current clusters: `INFRA` (stack/access/backup), `DATA` (storage/KB), `AUTO` (automation platforms), `COMMS` (meetings/mail/calendar), `ASSET` (3D pipeline).

| ID | Title | Cluster | Trigger / Freq | System | Tier |
|----|-------|---------|----------------|--------|------|
| TEC-001 | Software Stack Admin & Access Control | INFRA | Ongoing | All | P2 |
| TEC-002 | Dropbox File Structure & Naming (PARA) | DATA | Ongoing | Dropbox | P1 |
| TEC-003 | Zapier Automation Governance & Change Log | AUTO | Per automation | Zapier | P2 |
| TEC-004 | Knowledge Base Indexing & LLM Retrieval Maintenance | DATA | Ongoing | Dropbox | P2 |
| TEC-005 | 3D Asset Pipeline (RealityScan/Blender → Realtime) | ASSET | Per project | — | P3 |
| TEC-006 | Data Backup & Retention | INFRA | Scheduled | Dropbox | P2 |
| TEC-007 | n8n Automation Governance & Change Log | AUTO | Per automation | n8n | P2 |
| TEC-008 | Zoom Meeting Setup, Recording & Archival | COMMS | Per meeting / ongoing | Zoom | P3 |
| TEC-009 | Outlook / M365 Mail & Calendar Administration | COMMS | Ongoing | Microsoft 365 | P2 |

> **Both automation platforms retained by design (v1.2)** — not a migration. Separate SOPs because governance differs: Zapier is SaaS (task history, Zap versioning); n8n is instance-hosted (`klrbuild.app.n8n.cloud`: workflow versions, credential store, execution logs, self-managed backups). Cross-link them.
>
> **Routing principle (proposed default — adjust to taste):** use **Zapier** when a maintained native connector exists and the flow is a simple trigger→action at low volume; use **n8n** for multi-step branching, custom code/HTTP, self-hosted data control, or high-volume runs where per-task pricing bites. Platform per automation SOP is assigned at authoring against this rule — the `System: Zapier` cells in other domains are provisional until then.

### CX — Customer Experience & Warranty

| ID | Title | Trigger / Freq | System | Tier |
|----|-------|----------------|--------|------|
| CX-001 | Final Walk-Through & Client Sign-off | Per project | — | P1 |
| CX-002 | Warranty Registration & Claims | Per project / ad hoc | Dropbox | P2 |
| CX-003 | Review & Referral Solicitation | Post-completion | Zapier | P2 |
| CX-004 | Post-Project Follow-up Cadence | +30/90/365 day | Zapier | P3 |

### HR — People & HR

| ID | Title | Trigger / Freq | System | Tier |
|----|-------|----------------|--------|------|
| HR-001 | Role Definition & Job Descriptions | Ad hoc | — | P3 |
| HR-002 | Recruiting & Interview Rubric | Per hire | — | P2 |
| HR-003 | New Hire Onboarding | Per hire | — | P2 |
| HR-004 | Employment Classification (W2/1099) Review | Per hire | — | P1 |

---

## 6. Storage & Access (Dropbox)

```
/03_Resources/Reference/SOP/          # canonical SOP store
├── KLR_Build_SOP_Register.md         # the table in §5, single source of truth for status
├── KLR_Build_SOP_Framework.md        # this document (SOP-GOV-000)
├── SOP-SAL-002_lead-intake-qualification_v1.0.md
├── SOP-DES-001_initial-consultation-site-assessment_v1.0.md
└── …flat; one file per SOP, domain encoded in the ID prefix
```

- **Master = Markdown**, one file per SOP, feeds the LLM KB (TEC-004).
- **Layout is flat.** Domain is carried by the `SOP-XXX-###` ID prefix, not by folder. Sort by filename to group by domain.
- **Render = PDF** into `/renders/` for field/print use, when a print need arises.
- **`KLR_Build_SOP_Register.md`** is authoritative; a stale register is treated as the bug, not the individual file.
- **Access:** edit rights = domain owner + Ops Manager + Principal. Read = all staff.

---

## 7. Governance

**Versioning**
- `vMAJOR.MINOR`. Minor (`v1.1`) = wording/clarity, no process change. Major (`v2.0`) = the procedure itself changed. Bump on every published edit; log in Revision History.

**Lifecycle:** `Draft → Reviewed → Approved → Active → Retired`. Retired SOPs move to `/03_Resources/Reference/SOP/_retired/`, ID never reused.

**Approval chain:** Owner drafts → Ops Manager reviews → Principal approves. Approval = status flips to Active + effective date set.

**Review cadence:** every Active SOP reviewed **annually minimum**, plus **event-triggered** on any tool swap, regulatory change, or repeated field failure. Overdue reviews surface in the register.

**Change requests:** anyone proposes; owner adjudicates. Rejections noted in Revision History so the same idea isn't relitigated.

---

## 8. Rollout Sequence

Don't write all 50 at once. Build the revenue spine first, in this order:

1. **P1 spine (sell→build→close):** SAL-002, SAL-003, SAL-005 → DES-001, DES-004, DES-005, DES-006 → CON-001, CON-002, CON-004 → PRO-001, PRO-002, PRO-003, PRO-006 → FLD-002, FLD-003 → FIN-001, FIN-002 → CX-001.
2. **P1 compliance floor:** SAF-004, SAF-005, HR-004, TEC-002.
3. **P2 layer**, domain by domain.
4. **P3** as capacity allows.

Target ~2–3 SOPs authored per week; the spine is a ~4-week effort.

---

## 9. Revision History

| Version | Date | Author | Change |
|---------|------|--------|--------|
| v1.0 | ____ | Ops | Initial framework — taxonomy, numbering, template, governance, register (~50 SOPs), rollout. |
| v1.1 | ____ | Ops | TEC expanded: +TEC-007 (n8n), +TEC-008 (Zoom), +TEC-009 (Outlook/M365); added TEC Cluster tags. §0 corrected to observed dual-stack; flagged canonical mail/automation decision. |
| v1.2 | ____ | Ops | Canonical resolved: M365 = mail/calendar; Zapier + n8n both retained by design. Google marked non-canonical. Added Zapier/n8n routing principle + gmail-flyer open item tied to SAL-002. |
| v1.3 | ____ | Ops | Gmail open item resolved — forward to M365 shared mailbox (canonical intake). Authored first P1 spine cluster: SAL-002, DES-001, DES-005. |
| v1.4 | ____ | Ops | Authored P1 spine cluster CON-001, CON-002, CON-004 (flyer step 3). Flagged CA CSLB down-payment cap as compliance gate in CON-001 (verify w/ counsel). |
| v1.5 | ____ | Ops | Authored P1 spine cluster PRO-001, PRO-002, PRO-003 (flyer step 4 + opens step 5). Sold-vs-built handoff integrity gate; gate-aware scheduling; JIT materials. |
| v1.6 | ____ | Ops | Authored P1 spine cluster FLD-002, FLD-003 (craft standards — callback-risk core) + CX-001 (flyer step 7 closeout). Specs flagged for ICPI/IRC/code verification. **P1 customer spine complete (flyer steps 1–7).** |
| v1.7 | ____ | Ops | Authored money+closeout loop FIN-001, FIN-002, PRO-006. CA flags: progress payments ≤ work performed (FIN-001), prelim-notice/lien timing (FIN-002) — verify w/ counsel. Internal-punch-before-client-walk gate. |
| v1.8 | ____ | Ops | Authored SAL→DES seam SAL-003, SAL-005 + rendering SLA engine DES-004. M365-calendar booking; SalesRabbit→CF handoff w/ acknowledgment; constructability-review-before-client render gate. |
| v1.9 | ____ | Ops | Closed P1: DES-006 (proposal → CON-001 trigger) + compliance floor TEC-002 (PARA/Dropbox substrate), SAF-005 (CSLB/insurance currency), SAF-004 (incident/claims), HR-004 (AB5 classification). CA flags → counsel. **All P1 SOPs authored (19 spine + 4 floor).** TEC-002 reconciles §6 SOP store under `/02_Areas/SOPs/`. |
| v1.10 | ____ | Ops | Closed the PRC-002 P1 gap (register finding) → **P1 100% authored (24/24)**. Started P2 with tech-ops backbone: TEC-001 (access), TEC-003 (Zapier gov), TEC-007 (n8n gov), TEC-009 (M365 comms). |
| v1.11 | ____ | Ops | Finished TEC P2 backbone: TEC-004 (KB indexing/LLM retrieval — SOP corpus is itself a source), TEC-006 (backup/retention — resolves TEC-007's backup dependency; "Dropbox sync ≠ backup"). |
| v1.12 | 2026-08-04 | Ops | Docs-vs-disk reconcile, no process change. §6 rewritten: canonical store is `/03_Resources/Reference/SOP/`, flat layout (domain via ID prefix), real register/framework filenames — the documented `/KLR-SOPs/` tree with domain subfolders never existed. §7 retired-SOP path updated to match. TEC-002 reconciliation note + register path refs updated in the same pass; register governance stamp corrected v1.9 → v1.12. |

*End SOP-GOV-000 v1.12*
