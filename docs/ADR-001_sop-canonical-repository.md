# ADR-001 · Canonical repository for the SOP corpus

**Date:** 2026-08-18
**Status:** Proposed — CCO/CTO recommendation. CEO approval required before migration.
**Decider (recommending):** Nick Donatelli, CCO/CTO
**Affects:** SOP-GOV-000, SOP-TEC-002 v1.1, SOP-TEC-003 v1.1, SOP-TEC-004, SOP-TEC-006

---

## Context

The SOP corpus currently exists in **three writable copies plus one embedded copy**, with no defined master. This was measured today, not assumed:

| # | Location | Files | State (2026-08-18) |
|---|---|---|---|
| 1 | Dropbox `/Klrbuildllc Team Folder/03_Resources/standard_operating_procedures/` (`id:sjRX_pO2EuYAAAAAAAAMYg`) | 32 | All v1.0. **Unmodified since 2026-08-04.** Missing `klr_sop_gui.template.html` and `sop_register.json` — the daily-audit Zap's stated prerequisites |
| 2 | GitHub `KLR_HTML/standard_operating_procedures/` | 32 | Byte-identical stale v1.0 copy, tracked in git |
| 3 | GitHub `KLR_HTML/build/sop/` | 30 | Current: review dates populated, TEC-002/003/007 at v1.1 |
| 4 | `klr_sop_gui.html` | 30 | Embedded build artifact — legitimate, generated |

Copies 2 and 3 differ on **all 30 shared files**. Copy 1 is the one the automation reads.

### Why this is urgent, not cosmetic

The daily audit pulls **Dropbox → local** and prunes local files deleted upstream. Its next successful run overwrites copy 3 with copy 1 — silently reverting the v1.1 SOPs and every populated review date. The system's current design actively destroys the newest work.

### Two further findings

**Git through the desktop bridge is not trustworthy.** `git status` reports "working tree clean" while `git ls-files` lists files that do not match HEAD, and `.git/index.lock` cannot be removed through the mount (the bridge cannot delete). Any git operation that matters must run in a real shell on the machine, not through an agent session. This is a constraint on *how* we work, independent of *where* the files live.

**`KLR_HTML` is a mixed-purpose repository.** 207 tracked files, 99 MB working tree, 19 MB history, spanning: the SOP GUI, `brand/` (88 files including `.ai`/`.eps` binaries), `klr-operations/`, `klr-voice-receptionist/`, `developments_san_diego/`, `retrieval_augmented_generation/`. Governed documents sharing history with binary design assets and an unrelated application is the reason a clone is 99 MB and a diff is unreadable.

---

## Decision drivers

1. **One master.** Every other property is worthless without this.
2. **Reviewable change.** GOV-000 mandates revision history and annual review. A governed document needs a diff and an approval gate, not a "last modified" timestamp.
3. **Editing access for non-engineers.** Realistic authors: Nick, Operations Manager. Realistic readers: all staff, on jobsites, sometimes offline.
4. **Automation binding.** Something must fetch the corpus on a schedule without a long-lived secret sitting in a SaaS step.
5. **LLM KB ingestion** (TEC-004) — stable, flat, plain-Markdown, retrievable.
6. **Retention** (TEC-006).
7. **Cost and operator burden** — one person owns all of this.

---

## Options considered

### A. Dropbox canonical, repo as build cache *(current stated design)*

- **Pro:** staff already live there; mobile + offline sync is free; no new tool; folder-ID binding already built and documented.
- **Con:** no diff worth reading on Markdown; no review gate — any editor's save *is* the new version; version history is per-file and shallow in practice; requires a long-lived Dropbox token inside a Zapier Code step (TEC-001 exposure, still unrotated); Dropbox MCP `create_shared_link` is locked to `audience: no_one`, so it cannot publish the GUI.
- **Verdict:** adequate for distribution. Inadequate as the authoring master for governed documents.

### B. GitHub canonical, Dropbox as generated mirror — inside `KLR_HTML`

- **Pro:** real diffs, real history, review gate via PR; no token in Zapier; free.
- **Con:** inherits the 99 MB mixed-purpose repo; SOP history stays tangled with brand binaries; every SOP clone drags `.ai` files.
- **Verdict:** right direction, wrong container.

### C. GitHub canonical in a **dedicated `klr-sops` repository**, Dropbox as generated read-only mirror ✅

- **Pro:** everything in B, plus a repo whose entire history is the SOP corpus; clone is small; GitHub Actions rebuilds the GUI on push (no Code-step timeout, no token); Dropbox mirror keeps staff access and offline behaviour unchanged; sync direction inverts to **GitHub → Dropbox**, which makes the mirror disposable and therefore safe.
- **Con:** authoring requires git literacy, or the GitHub web editor; splitting the repo is a one-time migration; Actions must hold a Dropbox credential (moved, not eliminated — but into a secret store rather than a visible Zap field).
- **Verdict:** chosen.

### D. SharePoint / M365 or Google Drive

- **Con:** mail/calendar platform choice is deliberately unresolved; making SOPs canonical on either side pre-commits that decision. Also converts Markdown source-of-truth into a proprietary document model, which breaks TEC-004 ingestion and GOV-000's Markdown mandate.
- **Verdict:** rejected. Revisit only if the M365-vs-Google question is settled first, and even then only for distribution.

### E. Obsidian vault over Dropbox

- **Pro:** excellent Markdown authoring; wikilinks would suit the `Linked SOPs` field.
- **Con:** solves *editing*, not *mastering* — it is still Dropbox underneath, with the same absent review gate. Adds a tool without removing a problem.
- **Verdict:** rejected as the repository. Reasonable as a personal editing front-end over a git clone later.

### F. Contractor Foreman document storage

- **Con:** CF's Zapier surface exposes leads and customers only — no document objects. Nothing could be automated against it.
- **Verdict:** rejected.

---

## Decision

**Adopt Option C.**

```
klr-sops (private GitHub repo)          ← CANONICAL. Authored here. PR-reviewed.
   │  push to main
   ├─→ GitHub Actions: build_gui.py → klr_sop_gui.html   (artifact, committed or released)
   └─→ one-way publish → Dropbox /03_Resources/standard_operating_procedures/
                                          ← MIRROR. Read-only to staff. Disposable.
                                             Feeds TEC-004 KB + offline/jobsite access.
```

**Rules that make it hold:**

1. Dropbox is **read-only for humans**. If it is writable, it becomes a second master within a month.
2. The mirror is **regenerable**. Anything lost there is restored by re-running the publish.
3. The daily audit **reverses direction** — from "pull Dropbox, detect drift" to "publish GitHub, verify mirror matches." Drift becomes an alert, not an input.
4. TEC-002's folder-ID register stays authoritative for the mirror's location.
5. Git operations run in a **real local shell**, never through an agent bridge.

---

## Consequences

**Positive**

- Single master; the revert risk described above disappears.
- GOV-000 revision history becomes mechanically true rather than hand-maintained.
- The Dropbox token leaves Zapier; the Code-step timeout ceases to be a design constraint.
- Clone size and diff readability improve by roughly two orders of magnitude for SOP work.
- A real URL for the GUI becomes possible.

**Negative, with mitigation**

- *Non-engineer editing.* Mitigation: GitHub's web editor handles Markdown edits and opens a PR without a local install. If the Operations Manager will not use it, she edits in Dropbox under an explicit exception and Nick reconciles — but that exception must be written down or it becomes the norm.
- *Migration cost.* One-time: split repo, reconcile 3 copies to 1, rewrite the audit direction.
- *Credential moves rather than vanishes.* A Dropbox token lives in GitHub Actions secrets. Better hygiene than a plaintext Zap field, but still a TEC-001 inventory item on a rotation schedule.
- *Single point of failure on GitHub.* Mitigation: the Dropbox mirror is a full readable copy, and every clone is a full history backup. TEC-006 scope should name both.

---

## Verified facts behind this ADR

- **GitHub Pages from a private repository requires Pro, Team, Enterprise Cloud, or Enterprise Server.** Free plans can publish Pages only from *public* repositories. GitHub's docs describe no native access control on the published site itself — a Pages site from a private repo is still publicly reachable unless the plan provides otherwise. **Therefore: do not put the SOP GUI on Pages from a public repo, and treat "private repo + Pages" as a paid-plan question for the CEO, not a free win.** Distribution via the Dropbox mirror requires no plan change and no public surface.
- **Dropbox MCP `list_folder` rejects a bare `id:` value in `path`** (pattern requires `""`, `/…`, or `ns:…`). Resolve the ID via `get_file_metadata` first. The prior "IDs work in `path`" note holds for the **Dropbox HTTP API** used by the Zap and `daily_audit.py` — it does not hold for the MCP wrapper. Corrected today.
- The SOP folder sits in a **Team Folder namespace** (`ns:14815052899`), not a personal namespace — relevant to how the mirror's permissions get set.

---

## Migration plan (proposed — not executed)

| Phase | Action | Risk |
|---|---|---|
| 0 | Run git in a real local shell; commit or stash the current working tree. **Nothing else starts until this is clean.** | Uncommitted v1.1 work is lost to a bad pull |
| 1 | Reconcile to one corpus: `build/sop/` (30, current) is the winner; add `KLR_Build_SOP_Framework.md` + `KLR_Build_SOP_Register.md` from the root copy | Low |
| 2 | Create private `klr-sops`; move corpus + `build/` tooling + `.gitattributes`. Preserve history with `git subtree split` if the audit trail matters, plain copy if it does not | Low |
| 3 | Write the publish job (Actions → build → push to Dropbox). Test against a scratch Dropbox folder first | Medium — first write path to Dropbox |
| 4 | Set Dropbox mirror to read-only for staff; announce the change | Medium — behavioural, not technical |
| 5 | Retire the pull-direction Zap; update TEC-003's catalog entry; update TEC-002's folder-ID register with the mirror's role | Low |
| 6 | Remove SOP directories from `KLR_HTML`, leaving a README pointer | Low |

**Decision required from the CEO before Phase 2:** whether a paid GitHub plan is authorized (needed only if the GUI is to be hosted from a private repo). Everything else in this plan works on the free tier.

## Links

- SOP-TEC-002 v1.1 — folder ID register
- SOP-TEC-003 v1.1 — Zap catalog, `schedule→dropbox_daily-sop-audit`
- `build/zapier/ZAP_daily_sop_audit_RUNBOOK.md`
- [What is GitHub Pages? — GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
