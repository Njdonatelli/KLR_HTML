# SOP-TEC-007 · n8n Automation Governance & Change Log

| Field | Value |
|-------|-------|
| Owner | Geospatial / Tech Manager |
| Version | v1.0 |
| Effective | ____ |
| Last reviewed | ____ |
| Next review | +12 months |
| Linked SOPs | TEC-001, TEC-003, TEC-006, SAL-005, CX-003, CX-004 |

> Bracketed values `[…]` are proposed defaults — confirm and lock before Effective date.
> **Platform lane (framework §TEC routing principle):** n8n = multi-step branching, custom code/HTTP, self-hosted data control, high-volume. Simple native trigger→action → Zapier (TEC-003).
> **Instance:** `klrbuild.app.n8n.cloud`.

## Purpose
Govern n8n workflows — cataloging, ownership, naming, versioning, credential-store hygiene, execution monitoring, and **instance backup** — carrying the extra responsibilities of a self-hosted platform (backups, uptime, credential store) that Zapier's SaaS model handles for you.

## Scope / Trigger
Standing SOP. Fires on any workflow create/change/retire, plus **[weekly]** monitoring and instance-health checks. Governance pattern shared with TEC-003; mechanics differ (workflow versions, credential store, execution logs, self-managed backups).

## Roles (RACI-lite)
- **Responsible:** Geospatial / Tech Manager
- **Accountable:** Operations Manager
- **Consulted:** Process owner of the automated SOP
- **Informed:** Affected domain team

## Systems & Inputs
- **n8n** (`klrbuild.app.n8n.cloud`) — workflows, versions, credential store, execution logs.
- **Dropbox** — workflow catalog + change log + backups (TEC-002/006); credentials per TEC-001.

## Procedure
1. **Catalog each workflow** — name, purpose, trigger→action, systems touched, owner, **SOP/process served** (mirror TEC-003). → *Output: workflow catalog.*
2. **Naming + tagging** — convention + n8n folders/tags so workflows self-describe. → *Output: named workflows.*
3. **Versioning + change control** — use n8n workflow versions; log changes (what/when/why/who); **test with pinned data / non-prod before activating**. → *Output: versioned change log.*
4. **Credential-store hygiene** — credentials in n8n's store (**never hardcoded**), inventoried in TEC-001, least privilege, rotated. → *Output: credential control.*
5. **[Weekly] execution monitoring** — review execution logs/errors; configure error-workflow/alerting on failures. → *Output: monitoring log.*
6. **Instance ops (self-hosted)** — ensure workflow + credential **backups** (TEC-006); track instance updates/uptime. → *Output: instance-health record.*
7. **Retire** obsolete workflows — deactivate, archive, log. → *Output: retirement record.*

## Acceptance Criteria / QC
**Every n8n workflow is versioned, credential-clean, monitored, and backed up; nothing hardcoded, nothing unowned.** Concretely:
- Every active workflow cataloged, owned, SOP-linked.
- Versioned with a change log; tested before activation.
- Credentials in the store (no hardcoding); least privilege.
- Executions monitored weekly with failure alerting.
- Workflow + credential backups covered (TEC-006); instance health tracked.

## Exceptions & Escalation
- **Workflow failure affecting a live process** → owner triages; manual fallback per the affected SOP (e.g., SAL-005 handoff).
- **Instance outage** → restore from backup (TEC-006); escalate to Operations Manager.
- **Credential compromise** → rotate (TEC-001), audit affected workflows.

## Outputs
Workflow catalog, versioned change log, monitoring + backup records → Dropbox. Parallels **TEC-003**; backup dependency on **TEC-006**.

## Revision History
| Version | Date | Author | Change |
|---------|------|--------|--------|
| v1.0 | ____ | Tech Manager | Initial. Workflow catalog + versioning + SOP linkage; credential-store hygiene (no hardcoding); weekly execution monitoring; self-hosted backup/uptime responsibilities. |
