# SOP-TEC-009 · Outlook / M365 Mail & Calendar Administration

| Field | Value |
|-------|-------|
| Owner | Geospatial / Tech Manager |
| Version | v1.0 |
| Effective | ____ |
| Last reviewed | ____ |
| Next review | +12 months |
| Linked SOPs | SAL-002, SAL-003, TEC-001, HR-003 |

> Bracketed values `[…]` are proposed defaults — confirm and lock before Effective date.
> **M365 is the canonical mail/calendar system (framework §0).** Google Workspace is non-canonical.

## Purpose
Administer the M365 mail + calendar backbone — shared mailboxes (including the Gmail-forward intake), distribution/security groups, calendar governance, and retention — so the canonical comms system is reliable, access-controlled, and lead intake lands correctly.

## Scope / Trigger
Standing SOP. Event triggers: hire/offboard (groups + mailbox access), new shared mailbox/calendar need, plus **[quarterly]** review. Covers M365 admin only — not the automations that act on mail (TEC-003/007).

## Roles (RACI-lite)
- **Responsible:** Geospatial / Tech Manager
- **Accountable:** Operations Manager
- **Consulted:** Sales Lead (intake mailbox), Design Lead (consult calendar)
- **Informed:** All staff (groups/calendars)

## Systems & Inputs
- **Microsoft 365** — Exchange (mailboxes, groups, retention), calendars.
- Role/access matrix (TEC-001).

## Procedure
1. **Intake shared mailbox** — maintain the shared mailbox receiving the `klrbuildllc@gmail.com` forward (framework §0); set membership/access per role (TEC-001). → *Output: shared mailbox config.*
2. **Verify the forward** — confirm the Gmail→M365 forward delivers; monitor for failures (**SAL-002 intake depends on it**). → *Output: forward-health check.*
3. **Groups** — maintain distribution/security groups (e.g., `sales@`, `ops@`) mapped to roles; update on hire/offboard (HR-003 / TEC-001). → *Output: group config.*
4. **Calendar governance** — shared/resource calendars incl. the Design Lead consult calendar used for SAL-003 booking; set permissions. → *Output: calendar config.*
5. **Retention** — apply mail retention policy; ensure business-record mail (contracts, approvals) is retained. → *Output: retention policy.*
6. **[Quarterly] review** — audit mailbox access, group membership, forward health, license assignment (TEC-001). → *Output: review record.*

## Acceptance Criteria / QC
**The Gmail→M365 intake forward is verified and monitored; mailbox / group / calendar access is role-based and current.** Concretely:
- Intake shared mailbox live; forward health verified.
- Groups mapped to roles; maintained on hire/offboard.
- Consult + resource calendars governed with correct permissions.
- Retention policy applied to business-record mail.
- Quarterly access audit performed.

## Exceptions & Escalation
- **Forward failure** (intake at risk) → immediate fix; notify Sales Lead to watch Gmail directly until restored (SAL-002 continuity).
- **Access/permission request beyond role** → Operations Manager (TEC-001).
- **Retention/legal-hold need** → Operations Manager + counsel.

## Outputs
Configured shared mailbox, groups, calendars, retention → M365. Directly supports **SAL-002** (intake) and **SAL-003** (calendar booking); access governed by **TEC-001**.

## Revision History
| Version | Date | Author | Change |
|---------|------|--------|--------|
| v1.0 | ____ | Tech Manager | Initial. Canonical M365 admin: intake shared mailbox + Gmail-forward verification, role-mapped groups, consult-calendar governance, retention, quarterly audit. |
