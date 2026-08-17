# SOP-TEC-002 · Dropbox File Structure & Naming (PARA)

| Field | Value |
|-------|-------|
| Owner | Geospatial / Tech Manager |
| Version | v1.1 |
| Effective | 2026-08-17 |
| Last reviewed | 2026-08-17 |
| Next review | 2027-08-17 |
| Linked SOPs | TEC-001, TEC-003, TEC-004, TEC-006, DES-004, DES-005, CON-001, CON-002, PRO-005, CX-001, PRO-006 |

> Bracketed values `[…]` are proposed defaults — confirm and lock before Effective date.

## Purpose
Define and maintain the canonical Dropbox structure and naming so **every SOP's file references resolve to exactly one location**, projects are findable, and the LLM knowledge base (TEC-004) indexes cleanly. This is the substrate the entire SOP system writes to — hence P1.

v1.1 changes the *form* of a canonical reference: a location is identified by its **Dropbox folder ID**, not by its display path. Paths were rewritten three times in eight months and every rewrite silently broke every document that quoted one. IDs do not move.

## Scope / Trigger
Standing SOP. Governs root structure, per-project folder template, naming conventions, ID registration, access provisioning, and drift maintenance. Every SOP that produces a file inherits its location from here.

## Roles (RACI-lite)
- **Responsible:** Geospatial / Tech Manager
- **Accountable:** Operations Manager
- **Consulted:** Domain owners (folder needs)
- **Informed:** All staff

## Systems & Inputs
- **Dropbox** — folder tree, folder/file IDs, sharing and permissions.
- **Folder ID register** (below) — the binding table between an ID and its current display path.
- **Automation platform** — daily SOP audit binds to the SOP folder ID (TEC-003); credentials per TEC-001.

## Canonical structure (PARA-adjacent)
```
/00_KLR/
├── 01_Projects/     # active client jobs — one folder each
├── 02_Areas/        # ongoing ops: Sales/, Finance/, HR/, Marketing/, Operations/
├── 03_Resources/    # reference: supplier catalogs, ICPI specs, brand, templates, KB source
│   └── standard_operating_procedures/   # canonical SOP store — see folder ID register
└── 04_Archive/      # closed projects, retired docs
```

**Per-project folder** — `/01_Projects/[JobID]_[ClientLast]_[StreetAddr]/`:
```
01_Design/          # renders, 3D models      (DES-004, DES-002/003)
02_Estimate/        # takeoff, estimate        (DES-005)
03_Contract/        # contract, deposit, COs   (CON-001, CON-004)
04_HOA-Permit/      # HOA + permit packages    (CON-002, CON-003)
05_Production/      # schedule, logs, POs      (PRO-002/003/005)
06_Photos/          # site + QC photos         (DES-001, FLD-002/003)
07_Closeout-Warranty/ # sign-off, warranty     (PRO-006, CX-001/002)
```

**Conventions:** Job ID `[YYYY]-[###]` sequential. Project files `[JobID]_[doctype]_v[N]`. SOP files per framework §2 (`SOP-XXX-###_...`). No file lives outside `/00_KLR/`.

## Folder ID register (canonical bindings)

A Dropbox folder ID persists across **move and rename**; the display path does not. Any SOP, script, or automation that must reach a folder deterministically cites the ID. The path column is a human convenience and is expected to drift.

| Binding | Folder ID | Current display path (informational) | Bound by |
|---|---|---|---|
| SOP corpus | `id:sjRX_pO2EuYAAAAAAAAMYg` | `/03_Resources/standard_operating_procedures/` | TEC-003 daily audit, TEC-004 KB index, `build/daily_audit.py` |

Extend this table before any new automation binds to a folder. `list_folder` accepts an ID in the `path` parameter, so an ID is a drop-in substitute wherever a path was used.

**Superseded SOP-path references.** `/KLR-SOPs/` (framework §6, never created), `/02_Areas/SOPs/` (TEC-002 v1.0, never created), and `/03_Resources/Reference/SOP/` (TEC-002 v1.0 reconciliation, never created) are all dead. The corpus has only ever lived at the path now bound above. No migration is required; the ID binding is what prevents a fourth entry on this list.

> *Trade-off noted:* under strict PARA, SOPs are an ongoing responsibility (Areas) rather than reference material (Resources). Documenting and ID-binding the real location was chosen over relocating live files. Because the binding is by ID, a future relocation costs nothing but a path-column update — which is the point of v1.1.

## Procedure
1. **Establish root** PARA structure under `/00_KLR/`. → *Output: root.*
2. **Define project template** + Job ID convention; save a template folder in `03_Resources/templates/`. → *Output: project template.*
3. **Publish naming standard** (docs, versions, SOP IDs). → *Output: naming standard.*
4. **Register the folder ID** for any folder an SOP or automation references — capture ID, current path, and what binds to it in the register above. → *Output: folder ID register entry.*
5. **Provision access** per role (TEC-001). → *Output: permissions.*
6. **Migrate/audit** existing content into the structure. → *Output: migrated structure.*
7. **Maintain** — new projects instantiate the template (automatable per TEC-003); periodic drift audit; on any move or rename, update the path column only — never re-key an automation to a new path. Archive to `04_Archive/` on closeout (PRO-006/CX-001). → *Output: maintained structure.*

## Acceptance Criteria / QC
**Every SOP file reference resolves to exactly one Dropbox folder ID; no file lives outside the structure.** Concretely:
- Canonical `/00_KLR/` PARA root exists.
- Every folder referenced by an SOP or automation appears in the folder ID register with a current ID.
- No SOP or script binds to a display path where an ID exists.
- Project template + Job ID convention defined and in use.
- Naming standard published; access provisioned per role.
- Existing content migrated; new projects instantiate the template.
- Superseded path references (`/KLR-SOPs/`, `/02_Areas/SOPs/`, `/03_Resources/Reference/SOP/`) carry no live bindings.

## Exceptions & Escalation
- **Content that doesn't fit** a bucket → Tech Manager assigns a home; extend the taxonomy deliberately, don't dump at root.
- **Folder ID changes** (folder deleted and recreated rather than moved — Dropbox issues a new ID) → treat as a break: update the register and every binding in the same change, then re-run the affected automation manually before trusting its schedule.
- **Migration conflict / duplicate** → resolve to canonical, archive the rest (never permanent-delete without confirmation).
- **Access request beyond role** → Operations Manager (TEC-001).

## Outputs
Canonical Dropbox structure + folder ID register + naming standard + project template → substrate for **all** project SOPs; SOP-corpus binding feeds **TEC-003** automation and **TEC-004** KB index; backup scope feeds **TEC-006**.

## Revision History
| Version | Date | Author | Change |
|---------|------|--------|--------|
| v1.1 | 2026-08-17 | Tech Manager | Canonical references re-keyed from display path to **Dropbox folder ID**; added Systems & Inputs and the folder ID register; corrected the SOP-corpus path to `/03_Resources/standard_operating_procedures/` and retired all three superseded path references; acceptance criterion restated against IDs. |
| v1.0 | 2026-08-17 | Tech Manager | Initial. PARA-adjacent `/00_KLR/` root + per-project template mapped to SOP outputs; Job ID + naming standard; reconciled framework §6 SOP path; unblocked PARA migration. |
