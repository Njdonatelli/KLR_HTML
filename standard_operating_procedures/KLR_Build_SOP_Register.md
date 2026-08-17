# KLR Build LLC — SOP Register

**Canonical store:** `/03_Resources/Reference/SOP/KLR_Build_SOP_Register.md` (per framework §6 + TEC-002)
**Authority:** This file is the single source of truth for SOP **status**. Framework §5 is the design-time seed; where they differ, this register governs.
**Governed by:** SOP-GOV-000 (framework) v1.12 · **Generated:** 2026-07-31 · **Owner:** Operations Manager

---

## ✓ Finding resolved (v1.1)

The prior P1 gap — `PRC-002` tagged P1 but unauthored — is **closed**. PRC-002 authored at v1.0. **P1 is now 24/24 authored.** Finding retained here for audit trail.

---

## Status snapshot

| Tier | Total | Authored (Draft v1.0) | Pending |
|------|-------|-----------------------|---------|
| **P1** | 24 | 24 | 0 ✓ |
| **P2** | 27 | 6 | 21 |
| **P3** | 6 | 0 | 6 |
| **Total** | **57** | **30** | **27** |

**Legend — Status:** `Draft v1.0` authored, pending review/approval · `Registered` in register, not yet authored · lifecycle per framework §7 is Draft → Reviewed → Approved → Active.
**Legend — Tier:** `P1` core revenue/compliance · `P2` important · `P3` optimize later.

### Authored coverage by domain
| Domain | Authored / Total | Notes |
|--------|------------------|-------|
| SAL | 3 / 5 | P1 spine done |
| DES | 4 / 6 | P1 done; DES-002/003 (drone/photogrammetry) pending |
| CON | 3 / 4 | P1 done; CON-003 (permits) pending |
| PRO | 4 / 6 | P1 done; PRO-004/005 pending |
| FLD | 2 / 6 | P1 craft standards done |
| PRC | 1 / 4 | **PRC-002 authored — P1 gap closed** |
| FIN | 2 / 4 | P1 done |
| SAF | 2 / 5 | P1 compliance done |
| TEC | 7 / 9 | full P2 done (+TEC-004 KB, TEC-006 backup); only P3 TEC-005/008 remain |
| CX | 1 / 4 | P1 closeout done |
| HR | 1 / 4 | P1 classification done |

---

## Master register

All SOPs live flat in `/03_Resources/Reference/SOP/`; domain is carried by the ID prefix, not by folder. Authored files carry the `_v1.0.md` suffix.

### GOV — Governance
| ID | Title | Owner | Tier | Status | Ver |
|----|-------|-------|------|--------|-----|
| GOV-000 | SOP Framework | Ops Manager | — | Draft | v1.12 |

### SAL — Sales & Lead Management
| ID | Title | Owner | Tier | Status | Ver |
|----|-------|-------|------|--------|-----|
| SAL-001 | Canvassing & Territory Assignment | Sales Lead | P2 | Registered | — |
| SAL-002 | Lead Intake & Qualification | Sales Lead | P1 | Draft | v1.0 |
| SAL-003 | Appointment Setting & Confirmation | Sales Lead | P1 | Draft | v1.0 |
| SAL-004 | CRM Data Hygiene & Pipeline Stages | Sales Lead | P2 | Registered | — |
| SAL-005 | Lead → Design Handoff | Sales Lead | P1 | Draft | v1.0 |

### DES — Design & Estimating
| ID | Title | Owner | Tier | Status | Ver |
|----|-------|-------|------|--------|-----|
| DES-001 | Initial Consultation & Site Assessment | Design Lead | P1 | Draft | v1.0 |
| DES-002 | Drone / Aerial Survey & GCP Capture | Design Lead | P2 | Registered | — |
| DES-003 | Photogrammetry & 3D Model Generation | Design Lead | P2 | Registered | — |
| DES-004 | 2D/3D Rendering Production | Design Lead | P1 | Draft | v1.0 |
| DES-005 | Takeoff & Itemized Estimate Build | Design Lead | P1 | Draft | v1.0 |
| DES-006 | Proposal Assembly & Delivery | Design Lead | P1 | Draft | v1.0 |

### CON — Contracts, Permitting & HOA
| ID | Title | Owner | Tier | Status | Ver |
|----|-------|-------|------|--------|-----|
| CON-001 | Deposit Processing & Contract Execution | Ops Manager | P1 | Draft | v1.0 |
| CON-002 | HOA Submission Package | Ops Manager | P1 | Draft | v1.0 |
| CON-003 | Permit Application & Tracking | Ops Manager | P2 | Registered | — |
| CON-004 | Change Order Authorization | Ops Manager | P1 | Draft | v1.0 |

### PRO — Project & Production Management
| ID | Title | Owner | Tier | Status | Ver |
|----|-------|-------|------|--------|-----|
| PRO-001 | Project Kickoff & Handoff to Production | Production Lead | P1 | Draft | v1.0 |
| PRO-002 | Scheduling & Crew Allocation | Production Lead | P1 | Draft | v1.0 |
| PRO-003 | Materials Timeline & Delivery Coordination | Production Lead | P1 | Draft | v1.0 |
| PRO-004 | Subcontractor Onboarding & Scheduling | Production Lead | P2 | Registered | — |
| PRO-005 | Daily Jobsite Log & Progress Reporting | Production Lead | P2 | Registered | — |
| PRO-006 | Project Closeout & Punch List | Production Lead | P1 | Draft | v1.0 |

### FLD — Field Execution & Craft Standards
| ID | Title | Owner | Tier | Status | Ver |
|----|-------|-------|------|--------|-----|
| FLD-001 | Site Prep & Excavation | Production Lead | P2 | Registered | — |
| FLD-002 | Drainage & Grading Standards | Production Lead | P1 | Draft | v1.0 |
| FLD-003 | Hardscape / Paver Installation Standards | Production Lead | P1 | Draft | v1.0 |
| FLD-004 | Pool & Water Feature Rough-In Coordination | Production Lead | P2 | Registered | — |
| FLD-005 | Planting, Turf & Irrigation Install | Production Lead | P2 | Registered | — |
| FLD-006 | Jobsite Cleanliness & Daily Close | Production Lead | P3 | Registered | — |

### PRC — Procurement & Vendor Management
| ID | Title | Owner | Tier | Status | Ver |
|----|-------|-------|------|--------|-----|
| PRC-001 | Vendor Setup & Approved Supplier List | Ops Manager | P2 | Registered | — |
| **PRC-002** | **Material Ordering & PO Process** | Ops Manager | **P1** | Draft | v1.0 |
| PRC-003 | Nursery Plant Selection Walk (client-attended) | Ops Manager | P2 | Registered | — |
| PRC-004 | Delivery Receiving & Inspection | Ops Manager | P2 | Registered | — |

### FIN — Finance & Administration
| ID | Title | Owner | Tier | Status | Ver |
|----|-------|-------|------|--------|-----|
| FIN-001 | Payment Schedule & Milestone Billing | Admin/Finance | P1 | Draft | v1.0 |
| FIN-002 | Invoicing & AR Follow-up | Admin/Finance | P1 | Draft | v1.0 |
| FIN-003 | Job Costing & Margin Tracking | Admin/Finance | P2 | Registered | — |
| FIN-004 | Expense & Receipt Capture | Admin/Finance | P3 | Registered | — |

### SAF — Safety & Compliance
| ID | Title | Owner | Tier | Status | Ver |
|----|-------|-------|------|--------|-----|
| SAF-001 | Jobsite Safety & PPE Standards | Ops Manager | P2 | Registered | — |
| SAF-002 | Equipment Operation & Inspection | Ops Manager | P2 | Registered | — |
| SAF-003 | Drone Ops Safety & FAA Part 107 Compliance | Ops Manager | P2 | Registered | — |
| SAF-004 | Incident Reporting & Insurance Claims | Ops Manager | P1 | Draft | v1.0 |
| SAF-005 | Licensing & Insurance Currency (CSLB) | Ops Manager | P1 | Draft | v1.0 |

### TEC — Technology, Data & Automation
| ID | Title | Cluster | Owner | Tier | Status | Ver |
|----|-------|---------|-------|------|--------|-----|
| TEC-001 | Software Stack Admin & Access Control | INFRA | Tech Mgr | P2 | Draft | v1.0 |
| TEC-002 | Dropbox File Structure & Naming (PARA) | DATA | Tech Mgr | P1 | Draft | v1.0 |
| TEC-003 | Zapier Automation Governance & Change Log | AUTO | Tech Mgr | P2 | Draft | v1.0 |
| TEC-004 | Knowledge Base Indexing & LLM Retrieval | DATA | Tech Mgr | P2 | Draft | v1.0 |
| TEC-005 | 3D Asset Pipeline (RealityScan/Blender → Realtime) | ASSET | Tech Mgr | P3 | Registered | — |
| TEC-006 | Data Backup & Retention | INFRA | Tech Mgr | P2 | Draft | v1.0 |
| TEC-007 | n8n Automation Governance & Change Log | AUTO | Tech Mgr | P2 | Draft | v1.0 |
| TEC-008 | Zoom Meeting Setup, Recording & Archival | COMMS | Tech Mgr | P3 | Registered | — |
| TEC-009 | Outlook / M365 Mail & Calendar Administration | COMMS | Tech Mgr | P2 | Draft | v1.0 |

### CX — Customer Experience & Warranty
| ID | Title | Owner | Tier | Status | Ver |
|----|-------|-------|------|--------|-----|
| CX-001 | Final Walk-Through & Client Sign-off | Ops Manager | P1 | Draft | v1.0 |
| CX-002 | Warranty Registration & Claims | Ops Manager | P2 | Registered | — |
| CX-003 | Review & Referral Solicitation | Ops Manager | P2 | Registered | — |
| CX-004 | Post-Project Follow-up Cadence | Ops Manager | P3 | Registered | — |

### HR — People & HR
| ID | Title | Owner | Tier | Status | Ver |
|----|-------|-------|------|--------|-----|
| HR-001 | Role Definition & Job Descriptions | Principal | P3 | Registered | — |
| HR-002 | Recruiting & Interview Rubric | Principal | P2 | Registered | — |
| HR-003 | New Hire Onboarding | Principal | P2 | Registered | — |
| HR-004 | Employment Classification (W2/1099) Review | Principal | P1 | Draft | v1.0 |

---

## Customer-spine dependency chain

The authored P1 spine, in execution order (→ = triggers; ⟂ = gates). `PRC-002` gap marked.

```
SAL-002 ─→ SAL-003 ─→ SAL-005 ─→ DES-001 ─┬─→ (DES-002 → DES-003)
                                          └─→ DES-004 ─→ DES-005 ─→ DES-006 ─→ CON-001
CON-001 ─┬─→ CON-002 (HOA) ─⟂─ PRO-002
         ├─→ PRO-001 ─→ PRO-002 ⇄ PRO-003 ─→ PRC-002 (PO) ─→ FLD-002 ─→ FLD-003
         └─→ FIN-001 ─→ FIN-002
FLD-003 ─→ PRO-006 ─→ CX-001 ─→ (CX-002 warranty · CX-003 referral)
CON-004 (change orders) ⟂ any active phase
```
**Cross-cutting gates:** SAF-005 ⟂ CON-001 + PRO-004 · HR-004 ⟂ any worker engagement · TEC-002 = substrate under every file path.

---

## Verify-before-Effective register

No authored SOP goes Active until its flagged items are confirmed. Two tracks:

### Legal (route to counsel / CPA / broker)
| SOP | Item |
|-----|------|
| CON-001 / FIN-001 | CA down-payment cap (≤ $1,000 or 10%); progress payments ≤ value of work performed |
| FIN-002 | CA preliminary-notice / mechanics-lien deadlines |
| SAF-004 | Cal/OSHA serious-injury + workers'-comp reporting windows |
| SAF-005 | CSLB renewal cycle, bond, required coverage limits |
| HR-004 | AB5 / ABC test + construction-subcontractor provisions (**highest liability**) |

### Engineering / craft (route to Production Lead + manufacturer/code)
| SOP | Item |
|-----|------|
| FLD-002 | Foundation fall (~6"/10ft), surface slope (1–2%), subgrade compaction, legal discharge |
| FLD-003 | Base depth (ped 4–6" / veh 8–12"), 95% Proctor, ~1" bedding, edge restraint — vs. ICPI + paver manufacturer + local code |

---

## Open placeholders to lock

Bracketed defaults used across authored SOPs. Confirm before Effective. **The GM target is the only one left blank — it's an owner decision, not a default.**

| Value | Default used | SOP(s) |
|-------|-------------|--------|
| **Target gross margin %** | **BLANK — owner input required** | DES-005, FIN-001 |
| Estimate approval $ threshold | blank | DES-005 |
| Speed-to-lead | 1 business hour | SAL-002, SAL-003 |
| Service-area radius | ~25-mi / North County SD | SAL-002 |
| Nurture timeline cutoff | 6 months | SAL-002 |
| Unresponsive close | ×3 attempts | SAL-002 |
| New-lead stale threshold | 24 h | SAL-002 |
| Lead→design handoff SLA | 24 h | SAL-005 |
| No-show disposition | 2 no-shows | SAL-003 |
| Client revision rounds included | 2 | DES-004 |
| HOA submission SLA | 3–4 business days | CON-002 |
| HOA follow-up interval | 7 days | CON-002 |
| Invoice issuance | 1 business day | FIN-002 |
| Payment terms | net __ | FIN-002 |
| Overdue cadence | +3 / +7 / +14 d | FIN-002 |
| Materials delivery buffer | blank | PRO-003 |
| Weekly look-ahead day | Monday | PRO-002 |
| Credential renewal lead | 60–90 days | SAF-005 |
| Proposal stall cutoff | 14 days | DES-006 |
| PO approval $ threshold | blank | PRC-002 |
| PO price-variance tolerance | blank | PRC-002 |
| Stack access review cadence | quarterly | TEC-001 |
| Automation error-monitoring cadence | weekly | TEC-003, TEC-007 |
| M365 access review cadence | quarterly | TEC-009 |
| KB retrieval eval cadence | monthly | TEC-004 |
| Backup schedule per data class | blank (per class) | TEC-006 |
| Restore-test cadence | quarterly | TEC-006 |
| Legal record-retention periods | blank — counsel | TEC-006 |

---

## Revision History
| Version | Date | Author | Change |
|---------|------|--------|--------|
| v1.0 | 2026-07-31 | Ops | Initial register generated from framework v1.9. 57 SOPs catalogued; 23 authored (P1). Flagged PRC-002 P1 gap; consolidated legal + engineering verify flags and open placeholders. |
| v1.1 | 2026-07-31 | Ops | PRC-002 authored → **P1 100% (24/24)**; finding resolved. Started P2: TEC-001/003/007/009 authored. Totals: 28 authored / 29 pending. Added PRC-002 + TEC placeholders. |
| v1.2 | 2026-07-31 | Ops | Finished TEC P2: TEC-004 (KB), TEC-006 (backup) authored. TEC now 7/9 (only P3 remain). Totals: 30 authored / 27 pending. Added KB/backup/retention placeholders. |
| v1.3 | 2026-08-04 | Ops | Governance hygiene pass, no process or status change. (a) Version stamp reconciled — register cited framework v1.9 while GOV-000 stood at v1.11; header + GOV-000 row now v1.12 (framework bumped to v1.12 by item (b) below). Register content already reflected the v1.10/v1.11 changesets. (b) Canonical SOP path corrected to `/03_Resources/Reference/SOP/` (flat) across register, framework §6/§7, and TEC-002 — the previously documented `/00_KLR/02_Areas/SOPs/` and `/KLR-SOPs/` were never created on disk. |
