# SOP-TEC-003 · Zapier Automation Governance & Change Log

| Field | Value |
|-------|-------|
| Owner | Geospatial / Tech Manager |
| Version | v1.1 |
| Effective | 2026-08-17 |
| Last reviewed | 2026-08-17 |
| Next review | 2027-08-17 |
| Linked SOPs | TEC-001, TEC-002, TEC-004, TEC-006, SAL-003, SAL-005, CX-003, CX-004 |

> Bracketed values `[…]` are proposed defaults — confirm and lock before Effective date.
> **Platform lane (v1.1):** Zapier is the **sole** automation platform of record. TEC-007 (n8n) is retired as of 2026-08-17; workflows that outgrow a Zap are handled by a scheduled script under change control (see Exceptions), not by a second platform.

## Purpose
Govern Zapier automations — cataloging, ownership, naming, change control, credential hygiene, and monitoring — so Zaps are traceable, don't break silently, and can be audited and rolled back.

## Scope / Trigger
Standing SOP. Fires on any Zap create/change/retire, plus **[weekly]** monitoring. Covers all production Zaps and any scheduled script standing in for one.

## Roles (RACI-lite)
- **Responsible:** Geospatial / Tech Manager
- **Accountable:** Operations Manager
- **Consulted:** Process owner of the automated SOP
- **Informed:** Affected domain team

## Systems & Inputs
- **Zapier** — Zaps, task history, versioning.
- **Dropbox** — Zap catalog + change log; locations bound by folder ID per TEC-002; credentials per TEC-001.

## Zap catalog

Every live Zap appears here with an owner and the process it serves. A Zap absent from this table is out of compliance regardless of whether it works.

| Zap | Trigger → Action | Systems | Owner | Serves | Status |
|---|---|---|---|---|---|
| `schedule→dropbox_daily-sop-audit` | Schedule by Zapier (daily 05:00) → Code by Zapier → Filter → Email | Zapier, Dropbox | Tech Manager | TEC-002 (corpus integrity), TEC-004 (KB currency), GOV-000 (review-date surfacing) | Live — pending first manual run |

**`schedule→dropbox_daily-sop-audit` — detail**

- **Purpose:** pull the SOP corpus from the Dropbox folder bound in TEC-002 (`id:sjRX_pO2EuYAAAAAAAAMYg`), diff it against the last audit by file `rev`, republish the bundle and the SOP GUI build artifact, and report what changed.
- **Steps:** 1 Schedule (daily 05:00, weekends on) · 2 Code by Zapier (JavaScript, `build/zapier/code_step_daily_audit.js`) · 3 Filter (continue only if `changed` is true) · 4 Email summary · 5 *optional* Trello card when `removed_count > 0`.
- **Cost:** ~3 tasks/day (≈90/month); quiet days stop at the Filter.
- **Guards:** aborts rather than publishing an empty corpus over a good one; diffs by `rev`, not timestamp.
- **Known constraint:** Code by Zapier times out at 10s (Starter) / 30s (Pro+). The step performs ~31 parallel downloads plus two uploads. Fallback is `rebuildHtml = no`, or the `build/daily_audit.py` equivalent on Task Scheduler (exit 0 / 10 / 1).
- **Credential:** a long-lived Dropbox token in the Code step's Input Data — Code by Zapier cannot borrow the app connection's auth. Inventoried under TEC-001; scope to the SOP folder and rotate on the standard cycle. **Open item, not yet scoped or rotated.**
- **Build guide:** `build/zapier/ZAPIER_daily_audit.md`.

## Procedure
1. **Catalog each Zap** in the table above — name, purpose, trigger→action, systems touched, owner, and the **SOP/process it serves**. → *Output: Zap catalog.*
2. **Naming convention** — `[system]→[system]_[purpose]` so Zaps self-describe. → *Output: named Zaps.*
3. **Change control** — log every change (what/when/why/who); **test before enabling on live**; note the version in the catalog. → *Output: change log.*
4. **Credential hygiene** — shared service accounts (not personal) where possible, inventoried in TEC-001; MFA; tokens embedded in Code steps are scoped and rotated on schedule. → *Output: credential control.*
5. **[Weekly] monitoring** — review task history/errors; alert on failures; owner triages. → *Output: monitoring log.*
6. **Retire** obsolete Zaps — disable, archive, log, strike from the catalog. → *Output: retirement record.*

## Acceptance Criteria / QC
**No undocumented or unowned Zap runs in production; every change is logged and tested before going live.** Concretely:
- Every live Zap appears in the catalog with owner + linked process.
- Naming convention followed.
- Changes logged and tested before activation.
- Errors reviewed weekly.
- Obsolete Zaps retired and logged.
- Every credential embedded in a Zap is inventoried in TEC-001 and inside its rotation window.

## Exceptions & Escalation
- **Zap failure affecting a live process** (e.g., SAL-003 confirmations) → owner triages immediately; manual fallback per the affected SOP.
- **Automation outgrowing the Zapier lane** (step timeout, branching, volume) → move the work to a scheduled script in the repo under this SOP's change control — as the daily audit does with `daily_audit.py`. The Zap is retained as reporter where it still earns its task cost. Do not stand up a second automation platform.
- **Credential compromise** → rotate (TEC-001), audit affected Zaps.

## Outputs
Zap catalog, change log, monitoring records → Dropbox. Supports automated SOPs (SAL-003/005, CX-003/004) and the TEC-002/TEC-004 corpus pipeline.

## Revision History
| Version | Date | Author | Change |
|---------|------|--------|--------|
| v1.1 | 2026-08-17 | Tech Manager | Added the Zap catalog table and the `schedule→dropbox_daily-sop-audit` entry (step 1 of its own procedure). Zapier designated sole automation platform on TEC-007 retirement; overflow lane redirected from n8n to scheduled scripts under this SOP. Credential-rotation acceptance criterion added for tokens embedded in Code steps. |
| v1.0 | 2026-08-17 | Tech Manager | Initial. Zap catalog + naming + SOP linkage; test-before-live change control; weekly error monitoring; lane boundary vs. n8n. |
