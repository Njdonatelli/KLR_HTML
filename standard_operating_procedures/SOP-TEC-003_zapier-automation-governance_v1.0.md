# SOP-TEC-003 · Zapier Automation Governance & Change Log

| Field | Value |
|-------|-------|
| Owner | Geospatial / Tech Manager |
| Version | v1.0 |
| Effective | ____ |
| Last reviewed | ____ |
| Next review | +12 months |
| Linked SOPs | TEC-001, TEC-007, SAL-003, SAL-005, CX-003, CX-004 |

> Bracketed values `[…]` are proposed defaults — confirm and lock before Effective date.
> **Platform lane (framework §TEC routing principle):** Zapier = simple native-connector trigger→action at low volume. Complex/branching/high-volume → n8n (TEC-007).

## Purpose
Govern Zapier automations — cataloging, ownership, naming, change control, credential hygiene, and monitoring — so Zaps are traceable, don't break silently, and can be audited and rolled back.

## Scope / Trigger
Standing SOP. Fires on any Zap create/change/retire, plus **[weekly]** monitoring. Covers all production Zaps. Governance pattern is shared with n8n (TEC-007) but platform mechanics differ (SaaS task history + Zap versioning).

## Roles (RACI-lite)
- **Responsible:** Geospatial / Tech Manager
- **Accountable:** Operations Manager
- **Consulted:** Process owner of the automated SOP
- **Informed:** Affected domain team

## Systems & Inputs
- **Zapier** — Zaps, task history, versioning.
- **Dropbox** — Zap catalog + change log (TEC-002); credentials per TEC-001.

## Procedure
1. **Catalog each Zap** — name, purpose, trigger→action, systems touched, owner, and the **SOP/process it serves**. → *Output: Zap catalog.*
2. **Naming convention** — `[system]→[system]_[purpose]` so Zaps self-describe. → *Output: named Zaps.*
3. **Change control** — log every change (what/when/why/who); **test before enabling on live**; note the version in the catalog. → *Output: change log.*
4. **Credential hygiene** — shared service accounts (not personal) where possible, inventoried in TEC-001; MFA. → *Output: credential control.*
5. **[Weekly] monitoring** — review task history/errors; alert on failures; owner triages. → *Output: monitoring log.*
6. **Retire** obsolete Zaps — disable, archive, log. → *Output: retirement record.*

## Acceptance Criteria / QC
**No undocumented or unowned Zap runs in production; every change is logged and tested before going live.** Concretely:
- Every live Zap cataloged with owner + linked process.
- Naming convention followed.
- Changes logged and tested before activation.
- Errors reviewed weekly.
- Obsolete Zaps retired and logged.

## Exceptions & Escalation
- **Zap failure affecting a live process** (e.g., SAL-003 confirmations) → owner triages immediately; manual fallback per the affected SOP.
- **Automation outgrowing the Zapier lane** (branching/volume) → migrate to n8n (TEC-007) per the routing principle.
- **Credential compromise** → rotate (TEC-001), audit affected Zaps.

## Outputs
Zap catalog, change log, monitoring records → Dropbox. Parallels **TEC-007**; supports automated SOPs (SAL-003/005, CX-003/004).

## Revision History
| Version | Date | Author | Change |
|---------|------|--------|--------|
| v1.0 | ____ | Tech Manager | Initial. Zap catalog + naming + SOP linkage; test-before-live change control; weekly error monitoring; lane boundary vs. n8n. |
