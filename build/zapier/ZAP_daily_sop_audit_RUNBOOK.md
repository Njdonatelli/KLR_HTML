# Zap runbook — `schedule→dropbox_daily-sop-audit`

Build, test, and operate the scheduled Dropbox SOP audit. Cataloged in **SOP-TEC-003 v1.1**; folder binding governed by **SOP-TEC-002 v1.1**.

Zapier has no workflow import format. This is built by hand, once, from the table below. Do not fabricate a `.zap.json`.

---

## Identity

| | |
|---|---|
| Zap name | `schedule→dropbox_daily-sop-audit` |
| Owner | Geospatial / Tech Manager |
| Serves | TEC-002 corpus integrity · TEC-004 KB currency · GOV-000 review-date surfacing |
| Cost | ~3 tasks/day ≈ 90/month; quiet days stop at step 3 |
| Source of truth | Dropbox Markdown corpus. The GUI is a build artifact — never hand-edited. |

---

## Prerequisites

Upload these into the SOP folder (`id:sjRX_pO2EuYAAAAAAAAMYg`) before enabling, so the Zap has no dependency on the GitHub repo:

- `klr_sop_gui.template.html`
- `sop_register.json`

`audit_manifest.json` and `sop_bundle.json` are created by the first run.

A Dropbox access token is required. Code by Zapier cannot borrow the Dropbox app connection's auth — the token is entered as Input Data on step 2. Scope it to the SOP folder if the plan supports scoped apps, inventory it in TEC-001, and put it on the standard rotation. **Open item.**

---

## Steps

**1 · Trigger — Schedule by Zapier**

| Field | Value |
|---|---|
| Frequency | Every Day |
| Time of day | 5:00 AM |
| Trigger on weekends | Yes — SOPs get edited whenever |

**2 · Action — Code by Zapier → Run JavaScript**

Paste `build/zapier/code_step_daily_audit.js` verbatim. Input Data:

| Field | Value |
|---|---|
| `token` | *(Dropbox access token)* |
| `folderId` | `id:sjRX_pO2EuYAAAAAAAAMYg` |
| `outFolder` | `/Klrbuildllc Team Folder/03_Resources/standard_operating_procedures` |
| `rebuildHtml` | `yes` — set to `no` if step 2 times out |

Bind by **ID**, never by path (TEC-002 v1.1). IDs survive move and rename; `list_folder` accepts an ID in `path`.

Output fields: `changed`, `summary`, `added`, `updated`, `removed`, `removed_count`, `missing_review_dates`.

**3 · Filter by Zapier**

Only continue if `changed` **is true**. This is what keeps quiet days off the task count and out of the inbox.

**4 · Action — Email by Zapier** *(or Microsoft 365 send email)*

```
Subject: SOP audit — {{summary}}
Body:
  Added:   {{added}}
  Updated: {{updated}}
  Removed: {{removed}}
  SOPs without review dates: {{missing_review_dates}}
```

`missing_review_dates` should read **0** as of 2026-08-17. Any non-zero value means an SOP was added or reverted without dates — treat it as a finding, not noise.

**5 · Optional — Trello card**

On the KLR Build Operations board when `removed_count > 0`. An SOP disappearing from the corpus should never be silent.

---

## Commissioning test — do this before enabling the schedule

1. **Run once manually.** Zap editor → Test step 2. Do **not** turn the Zap on yet.
2. **Read the step 2 output.** Expect `changed: true` and a non-zero `added` count on first run. If the corpus reports 0 files the step aborts by design rather than publishing an empty corpus over a good one — that means the token or the folder ID is wrong, not that the corpus is empty.
3. **Watch for the timeout.** Code by Zapier caps at **10s Starter / 30s Pro+**. This step performs ~31 parallel downloads plus two uploads, and with `rebuildHtml = yes` also fetches the template and uploads ~200 KB. On Starter it will likely exceed. Two outs, in order of preference:
   - set `rebuildHtml = no` (bundle only; rebuild the HTML locally with `python build/build_gui.py`), or
   - move the whole job to `build/daily_audit.py` on Task Scheduler and keep the Zap as reporter.
4. **Re-run immediately.** Second run must report `No change since last audit`, perform **0 uploads**, and stop at the Filter. If it reports changes again, rev-diffing is not persisting — check that `audit_manifest.json` was written to `outFolder`.
5. **Verify the artifact.** Open `klr_sop_gui.html` from `file://`. Expect 57 register rows, 30 SOPs, zero console errors, and `performance.getEntriesByType('resource').length === 0`. Zero-network-on-load is the whole point of the daily-audit model — a page view that costs a fetch is a regression.
6. **Only then enable the schedule**, and log the activation in the TEC-003 change log.

---

## Python fallback — `build/daily_audit.py`

Identical output, no timeout ceiling, no token in a SaaS step.

```
setx DROPBOX_TOKEN "..."
python build\daily_audit.py                 # audit, rebuild only if changed
python build\daily_audit.py --report-only   # audit, never write
python build\daily_audit.py --force         # rebuild regardless
```

Exit codes: `0` no change · `10` changes applied · `1` error — so Task Scheduler or CI can branch on it. Same folder-ID binding, same empty-corpus guard, and it prunes local files deleted upstream so a removed SOP can't linger.

---

## Failure triage

| Symptom | Cause | Action |
|---|---|---|
| Step 2 times out | Plan timeout vs. ~31 downloads + upload | `rebuildHtml = no`, or move to `daily_audit.py` |
| `0 files` / abort | Bad token, revoked scope, or wrong folder ID | Verify token; re-resolve the folder ID; **do not** substitute a path |
| Reports changes every run | `audit_manifest.json` not persisting | Confirm `outFolder` is writable and the manifest lands beside the corpus |
| `missing_review_dates > 0` | New or reverted SOP without `Effective` / `Last reviewed` | Populate the front matter; do not silence the field |
| Email fires on quiet days | Filter misconfigured | Step 3 must test `changed` **is true** |
| Folder ID stops resolving | Folder deleted and recreated (new ID), not moved | Treat as a break per TEC-002 Exceptions: update the register **and** every binding, re-run manually, then trust the schedule again |
| GUI loads but fetches > 0 | Live-feed endpoint set | `feed.endpoint` must stay empty in the daily-audit model |

---

## Change control

Per TEC-003: log every change (what/when/why/who), test before enabling on live, and update the catalog entry in the SOP. Retiring this Zap means disable → archive → log → strike from the TEC-003 catalog table.

---

## Rebuild-from-scratch prompt

Paste this into a fresh agent session if the Zap has to be rebuilt and this runbook is the only context available.

> Rebuild the KLR Build daily SOP audit Zap. Five steps: (1) Schedule by Zapier, daily 05:00, weekends on. (2) Code by Zapier → Run JavaScript, body = `build/zapier/code_step_daily_audit.js` verbatim, Input Data `token` = Dropbox access token, `folderId` = `id:sjRX_pO2EuYAAAAAAAAMYg`, `outFolder` = `/Klrbuildllc Team Folder/03_Resources/standard_operating_procedures`, `rebuildHtml` = `yes`. (3) Filter by Zapier — continue only if `changed` is true. (4) Email by Zapier, subject `SOP audit — {{summary}}`, body listing `added` / `updated` / `removed` / `missing_review_dates`. (5) Optional Trello card on KLR Build Operations when `removed_count > 0`.
>
> Constraints: bind to the Dropbox **folder ID**, never a display path (SOP-TEC-002 v1.1). Zapier has no workflow import format — build by hand, do not generate a `.zap.json`. Code by Zapier times out at 10s Starter / 30s Pro+; if the step exceeds it, set `rebuildHtml = no` or move the job to `build/daily_audit.py` on Task Scheduler and keep the Zap as reporter. Do not enable Zapier MCP actions or mutate the account without asking. Do not propose n8n — SOP-TEC-007 is retired; Zapier is the sole automation platform (SOP-TEC-003 v1.1). Run step 2 manually and confirm the output before enabling the schedule. Catalog the result in TEC-003.
