# SOP-TEC-006 · Data Backup & Retention

| Field | Value |
|-------|-------|
| Owner | Geospatial / Tech Manager |
| Version | v1.0 |
| Effective | 2026-08-17 |
| Last reviewed | 2026-08-17 |
| Next review | 2027-08-17 |
| Linked SOPs | TEC-002, TEC-004, TEC-007, TEC-009, CON-001, FIN-001 |

> Bracketed values `[…]` are proposed defaults — confirm and lock before Effective date. **Legal record-retention periods must be verified with counsel.**

## Purpose
Ensure business-critical data across the stack is backed up on a defined schedule, retained per policy/legal requirements, and **restorable** — so no single failure (Dropbox loss, n8n instance failure, accidental deletion, ransomware, account loss) causes unrecoverable data loss.

## Scope / Trigger
Standing SOP with scheduled backups per data class and **[quarterly]** restore testing. Covers all critical stores. Resolves TEC-007's backup dependency (n8n workflows + credential store).

## Roles (RACI-lite)
- **Responsible:** Geospatial / Tech Manager
- **Accountable:** Operations Manager
- **Consulted:** Counsel (record-retention periods), data-store owners
- **Informed:** Principal

## Core principle
**Sync ≠ backup, and vendor redundancy ≠ your backup.** Dropbox versioning and SaaS provider redundancy protect against *their* hardware failure — not against user deletion, ransomware propagation, or account loss. Critical data needs an **independent** copy.

## Systems & Inputs
- Backup targets: **Dropbox** (project + ops data, TEC-002), **n8n** (`klrbuild.app.n8n.cloud` — workflows + credential store, TEC-007), **Contractor Foreman** (export), **M365** (mail retention, TEC-009), **KB corpus** (TEC-004), **SalesRabbit**.

## Procedure
1. **Backup scope inventory** — each store: criticality, change rate, native vs. required-external backup, retention requirement. → *Output: backup inventory.*
2. **Schedule per data class** — e.g., Dropbox versioned + periodic **independent** export; n8n workflow/credential export **[weekly / on-change]**; Contractor Foreman export **[cadence]**; KB corpus with sources. → *Output: backup schedule.*
3. **Apply 3-2-1** — 3 copies, 2 media/locations, ≥1 independent offsite; Dropbox sync/versioning is **not** counted as a standalone backup. → *Output: 3-2-1 posture.*
4. **Retention policy** per data class, including **legal record retention** (contracts/financials — verify periods with counsel; ties CON-001/FIN-001). → *Output: retention policy.*
5. **[Quarterly] restore test** — test-restore each data class; log success + restore time (RTO). An untested backup is not a backup. → *Output: restore-test log.*
6. **Monitor jobs** — alert on backup failure (automation-driven, TEC-003/007). → *Output: backup monitoring.*

## Acceptance Criteria / QC
**Every critical data store has an independent, tested, restorable backup — Dropbox sync is not treated as backup.** Concretely:
- Backup inventory covers all critical stores.
- Schedule defined and running per data class.
- 3-2-1 satisfied (independent offsite copy, not just Dropbox versioning).
- Retention policy applied, including legal records.
- Quarterly restore test passed and logged.
- Backup-job failures alerted.

## Exceptions & Escalation
- **Restore test failure** → treat as a live incident; fix the backup chain before relying on it.
- **Vendor with no export path** → document the gap + risk; Operations Manager decides mitigation.
- **Ransomware / mass deletion event** → restore from the independent offsite copy; escalate to Principal.

## Outputs
Backup inventory, schedule, retention policy, restore-test logs → Dropbox. Protects **TEC-002** (files), **TEC-004** (KB), **TEC-007** (n8n), and legal records (**CON-001/FIN-001**).

## Revision History
| Version | Date | Author | Change |
|---------|------|--------|--------|
| v1.0 | 2026-08-17 | Tech Manager | Initial. Backup inventory + per-class schedule; 3-2-1 with "sync ≠ backup" principle; legal-aware retention (verify); quarterly restore testing; resolves TEC-007 backup dependency. |
