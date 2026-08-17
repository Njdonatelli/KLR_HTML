# SOP-TEC-001 · Software Stack Admin & Access Control

| Field | Value |
|-------|-------|
| Owner | Geospatial / Tech Manager |
| Version | v1.0 |
| Effective | ____ |
| Last reviewed | ____ |
| Next review | +12 months |
| Linked SOPs | HR-003, HR-004, TEC-002, TEC-003, TEC-007, TEC-009, TEC-006 |

> Bracketed values `[…]` are proposed defaults — confirm and lock before Effective date.

## Purpose
Govern the app stack — inventory, provisioning, access/permissions, credentials, and offboarding — so every system is least-privilege and role-based, credentials are controlled, and departures never leave open access or orphaned licenses.

## Scope / Trigger
Standing SOP. Event triggers: hire (provision), role change (adjust), departure (revoke), new tool adoption (inventory), plus **[quarterly]** access review. Covers all stack apps: SalesRabbit, Contractor Foreman, Dropbox, M365, Zapier, n8n, Trello, Zoom.

## Roles (RACI-lite)
- **Responsible:** Geospatial / Tech Manager
- **Accountable:** Operations Manager
- **Consulted:** Domain owners (access needs)
- **Informed:** Principal, HR (on/offboarding)

## Systems & Inputs
- **M365 identity** as the primary directory (SSO where supported).
- **Secrets manager** for credentials; Dropbox (TEC-002) for the inventory/matrix docs.

## Procedure
1. **System inventory** — app, purpose, license count/cost, admin owner, auth method (prefer M365 SSO). → *Output: stack inventory.*
2. **Role-based access matrix** — which roles get which apps at which permission level, **least privilege**. → *Output: access matrix.*
3. **Provision on hire** (HR-003) per the matrix; use M365 identity/SSO where possible. → *Output: provisioned access.*
4. **Credential governance** — no shared passwords; secrets in a manager; **MFA on all**; automation service accounts (Zapier/n8n, TEC-003/007) inventoried and rotated. → *Output: credential control.*
5. **Offboard same-day** on departure — revoke all access, reclaim licenses, rotate any shared/automation credentials the person touched. → *Output: clean offboard.*
6. **[Quarterly] access review** — audit for drift, orphaned accounts, unused licenses. → *Output: access review.*

## Acceptance Criteria / QC
**Access is least-privilege and role-based; departures revoke all access same-day; no shared or unmanaged credentials exist.** Concretely:
- Stack inventory current (apps, owners, licenses, auth).
- Access matrix enforced; least privilege.
- MFA everywhere; no shared passwords; secrets in a manager.
- Same-day offboarding revocation + license reclaim.
- Quarterly access review performed.

## Exceptions & Escalation
- **Elevated/temporary access** → time-boxed, logged, revoked on expiry.
- **Access request beyond role** → Operations Manager approval.
- **Suspected credential compromise** → immediate rotation + affected-automation review (TEC-003/007).

## Outputs
Stack inventory, access matrix, credential controls → Dropbox (TEC-002). Underpins **TEC-003/007** (automation creds), **TEC-009** (M365 access), and HR on/offboarding.

## Revision History
| Version | Date | Author | Change |
|---------|------|--------|--------|
| v1.0 | ____ | Tech Manager | Initial. Stack inventory + least-privilege role matrix; MFA + secrets-manager credential governance; same-day offboarding; quarterly access review. |
