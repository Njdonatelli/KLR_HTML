# SOP-TEC-002 · Dropbox File Structure & Naming (PARA)

| Field | Value |
|-------|-------|
| Owner | Geospatial / Tech Manager |
| Version | v1.0 |
| Effective | ____ |
| Last reviewed | ____ |
| Next review | +12 months |
| Linked SOPs | TEC-001, TEC-004, TEC-006, DES-004, DES-005, CON-001, CON-002, PRO-005, CX-001, PRO-006 |

> Bracketed values `[…]` are proposed defaults — confirm and lock before Effective date.

## Purpose
Define and maintain the canonical Dropbox structure and naming so **every SOP's file references resolve to exactly one location**, projects are findable, and the LLM knowledge base (TEC-004) indexes cleanly. This is the substrate the entire SOP system writes to — hence P1.

## Scope / Trigger
Standing SOP. Governs root structure, per-project folder template, naming conventions, access provisioning, and drift maintenance. Every SOP that produces a file inherits its path from here.

## Roles (RACI-lite)
- **Responsible:** Geospatial / Tech Manager
- **Accountable:** Operations Manager
- **Consulted:** Domain owners (folder needs)
- **Informed:** All staff

## Canonical structure (PARA-adjacent)
```
/00_KLR/
├── 01_Projects/     # active client jobs — one folder each
├── 02_Areas/        # ongoing ops: Sales/, Finance/, HR/, Marketing/, Operations/
├── 03_Resources/    # reference: supplier catalogs, ICPI specs, brand, templates, KB source
│   └── Reference/SOP/   # canonical SOP store (see Reconciliation below)
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

> **Reconciliation (2026-08-04):** framework §6 originally referenced `/KLR-SOPs/`, and this SOP previously designated `/02_Areas/SOPs/`. Neither folder was ever created. Canonical home is **`/03_Resources/Reference/SOP/`**, flat (domain carried by the SOP ID prefix) — this is where the corpus actually lives and what TEC-004 indexes. `/KLR-SOPs/` and `/02_Areas/SOPs/` are both dead references; neither requires migration.
>
> *Trade-off noted:* under strict PARA, SOPs are an ongoing responsibility (Areas) rather than reference material (Resources). Documenting the real location was chosen over relocating 32 live files. Revisit if the PARA layout is reworked wholesale.

## Procedure
1. **Establish root** PARA structure under `/00_KLR/`. → *Output: root.*
2. **Define project template** + Job ID convention; save a template folder in `03_Resources/templates/`. → *Output: project template.*
3. **Publish naming standard** (docs, versions, SOP IDs). → *Output: naming standard.*
4. **Provision access** per role (TEC-001). → *Output: permissions.*
5. **Migrate/audit** existing content into the structure — the previously blocked PARA audit, now executable with the Dropbox connector live. → *Output: migrated structure.*
6. **Maintain** — new projects instantiate the template (automatable via Zapier/n8n); periodic drift audit; archive to `04_Archive/` on closeout (PRO-006/CX-001). → *Output: maintained structure.*

## Acceptance Criteria / QC
**Every SOP file path resolves to exactly one defined location; no file lives outside the structure.** Concretely:
- Canonical `/00_KLR/` PARA root exists.
- Project template + Job ID convention defined and in use.
- Naming standard published.
- Access provisioned per role.
- Existing content migrated; new projects instantiate the template.
- Dead SOP-path references (`/KLR-SOPs/`, `/02_Areas/SOPs/`) reconciled to `/03_Resources/Reference/SOP/`.

## Exceptions & Escalation
- **Content that doesn't fit** a bucket → Tech Manager assigns a home; extend the taxonomy deliberately, don't dump at root.
- **Migration conflict / duplicate** → resolve to canonical, archive the rest (never permanent-delete without confirmation).
- **Access request beyond role** → Operations Manager (TEC-001).

## Outputs
Canonical Dropbox structure + naming standard + project template → substrate for **all** project SOPs; KB source subset feeds **TEC-004**; backup scope feeds **TEC-006**.

## Revision History
| Version | Date | Author | Change |
|---------|------|--------|--------|
| v1.0 | ____ | Tech Manager | Initial. PARA-adjacent `/00_KLR/` root + per-project template mapped to SOP outputs; Job ID + naming standard; reconciled framework §6 SOP path; unblocked PARA migration. |
