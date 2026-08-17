# KLR SOP — Daily Audit Zap

Replaces the n8n live-feed design. **n8n is retired for this system**; Zapier is the automation platform going forward.

---

## What changed and why

The previous design pulled the corpus from Dropbox on **every page load**. Correct, but it billed compute per view and put a network dependency in front of a document people need on jobsites.

The audit model inverts it: **the corpus is pulled once a day and baked into the HTML.**

| | Live-pull (retired) | Daily audit (now) |
|---|---|---|
| Network calls per page view | 1 | **0** (verified) |
| Automation runs | per view, unbounded | ~3 tasks/day ≈ 90/month |
| Works offline | fallback only | always |
| Public endpoint required | yes | **no** |
| Data currency | seconds | ≤ 24h, on-demand re-run available |

Zero-network-on-load is measured, not assumed — `performance.getEntriesByType('resource')` reports 0 fetches.

---

## Zap structure

Zapier has no workflow import format (unlike n8n's JSON), so this is built by hand — five steps, once.

**1. Trigger — Schedule by Zapier**
Every Day, 5:00 AM. Weekends: yes (SOPs get edited whenever).

**2. Action — Code by Zapier → Run JavaScript**
Paste `code_step_daily_audit.js`. Input Data:

| Field | Value |
|---|---|
| `token` | Dropbox access token (see security note) |
| `folderId` | `id:sjRX_pO2EuYAAAAAAAAMYg` |
| `outFolder` | `/Klrbuildllc Team Folder/03_Resources/standard_operating_procedures` |
| `rebuildHtml` | `yes` |

**3. Filter by Zapier** — only continue if `changed` **is true**. Keeps quiet days off your task count and out of your inbox.

**4. Action — Email by Zapier** (or Microsoft 365 send email)
Subject: `SOP audit — {{summary}}`
Body: added `{{added}}` / updated `{{updated}}` / removed `{{removed}}`, `{{missing_review_dates}}` SOPs still without review dates.

**5. Optional — Trello card** on the KLR Build Operations board when `removed_count` > 0. An SOP disappearing from the corpus should never be silent.

---

## Prerequisites

Three files must sit in the SOP folder alongside the corpus, so the Zap has no dependency on the GitHub repo:

- `klr_sop_gui.template.html`
- `sop_register.json`
- (created automatically on first run) `audit_manifest.json`, `sop_bundle.json`

Upload the first two from `build/` before enabling the Zap.

---

## Verified behaviour

Executed against a stubbed Dropbox API using the real 30-file corpus:

| Scenario | Result |
|---|---|
| First run | 30 added; uploads `sop_bundle.json` + `audit_manifest.json`; front matter parsed (title/owner/version/review dates) |
| Second run, nothing changed | `No change since last audit`, **0 uploads**, Filter stops the Zap |
| One file edited (rev change), one restored | `1 added, 1 updated`; detected by Dropbox `rev`, not timestamp |
| `rebuildHtml = yes` | Emits a 198 KB HTML — loaded it in Chromium: 58 register rows, 30 SOPs, 0 network calls, search and governance intact |
| Dropbox returns 0 files | **Aborts.** Refuses to publish an empty corpus over a good one — a transient permission error would otherwise blank the GUI |

---

## Two things to decide

**1. The Dropbox token.** Code by Zapier cannot borrow the Dropbox app connection's auth, so the token goes in the step's Input Data as a long-lived credential inside a Zap. Per TEC-001 that is a service credential and should be: scoped to the SOP folder if your Dropbox plan supports scoped apps, inventoried in the stack register, and rotated on the normal cycle. If you'd rather not hold a token in Zapier at all, use the Python path below.

**2. Code step timeout.** 10s on Starter, 30s on Pro and above ([Zapier docs](https://help.zapier.com/hc/en-us/articles/14166919366413-Run-more-Code-by-Zapier-steps-with-increased-timeouts-and-throttle-limits)). This step does ~31 parallel downloads plus two uploads, and with `rebuildHtml = yes` also fetches the template and uploads 198 KB. On Starter that is likely to exceed 10s. Two outs: set `rebuildHtml = no` (bundle only), or run the Python equivalent.

I could not execute this against your Zapier account — enabling actions there changes your setup, and I won't do that unprompted. Step 2 is where it will fail if the token or scopes are wrong; run the Zap manually once and check the Code step output before enabling the schedule.

---

## Python equivalent — `build/daily_audit.py`

Identical output, no timeout ceiling, no token in a SaaS step.

```
setx DROPBOX_TOKEN "..."
python build\daily_audit.py                 # audit, rebuild only if changed
python build\daily_audit.py --report-only   # audit, never write
python build\daily_audit.py --force         # rebuild regardless
```

Exit codes: `0` no change, `10` changes applied, `1` error — so Task Scheduler or CI can branch on it. Same folder-ID binding, same empty-corpus guard, and it prunes local files deleted upstream so a removed SOP can't linger.

Run it on Windows Task Scheduler daily if the Zap can't carry the whole job. The Zap still earns its place as the audit reporter even in that split.

---

## Resolved 2026-08-17

- **TEC-002 v1.1** — canonical references re-keyed from display path to **Dropbox folder ID**; folder ID register added; the corpus path corrected to `/03_Resources/standard_operating_procedures/` and all three superseded path references retired.
- **TEC-003 v1.1** — this Zap is cataloged as `schedule→dropbox_daily-sop-audit` with owner, linked processes, guards, and the token as a named open item. Zapier designated sole automation platform.
- **TEC-007 v1.1** — retired; scope emptied, authority transferred to TEC-003. Decommission steps 1–3 (empty-scope confirmation, credential revocation, instance cancellation) remain open and are the user's to execute.
- **Review dates** — `Effective` and `Last reviewed` set to 2026-08-17 across all 30 SOPs, `Next review` to 2027-08-17. The governance view's overdue/due cards are live; `missing_review_dates` should now report 0.

## Still open

- **Dropbox token in the Zap.** Long-lived credential in step 2 Input Data. Needs scoping, TEC-001 inventory, and a rotation date.
- **Commissioning run.** Step 2 has never executed against the live account. See `ZAP_daily_sop_audit_RUNBOOK.md` §Commissioning test.
- **Dropbox corpus vs. repo.** The v1.1 SOP files and populated dates exist in the Git working tree. The audit pulls Dropbox → local, so **the next run will overwrite them unless the same files are uploaded to the SOP folder first.** Upload before enabling the schedule.
- **Step build guide.** Configuration detail now lives in `ZAP_daily_sop_audit_RUNBOOK.md`; this document keeps the design rationale and the verified-behaviour matrix.
