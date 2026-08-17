# SOP-TEC-004 · Knowledge Base Indexing & LLM Retrieval Maintenance

| Field | Value |
|-------|-------|
| Owner | Geospatial / Tech Manager |
| Version | v1.0 |
| Effective | 2026-08-17 |
| Last reviewed | 2026-08-17 |
| Next review | 2027-08-17 |
| Linked SOPs | TEC-002, TEC-006, GOV-000, (all SOPs as source) |

> Bracketed values `[…]` are proposed defaults — confirm and lock before Effective date.

## Purpose
Govern the KB corpus that feeds LLM retrieval — what's indexed, how it's structured/chunked, how it's versioned and refreshed, and how retrieval quality is checked — so the model returns **accurate, current, traceable** answers grounded in KLR's own knowledge rather than stale or hallucinated content.

## Scope / Trigger
Standing SOP. Fires on any source change (SOP version bump, supplier-doc update, new corpus) plus **[monthly]** retrieval QC. Covers source inventory, schema, indexing, provenance, and eval. The **SOP corpus itself is a primary source** — SOP IDs (framework §2) were designed as collision-free retrieval keys.

## Roles (RACI-lite)
- **Responsible:** Geospatial / Tech Manager
- **Accountable:** Operations Manager
- **Consulted:** Source owners (SOP owners, whoever maintains supplier/spec docs)
- **Informed:** LLM-tool users across the company

## Systems & Inputs
- **Dropbox** `/03_Resources/` — KB source store (TEC-002).
- JSON/JSONL corpus + retrieval index.
- Sources: SOP corpus + register (GOV-000), supplier docs (e.g., SiteOne help → JSONL), brand guidelines, ICPI/spec references, pricing, process docs.

## Procedure
1. **Source inventory** — list every corpus feeding the KB, each with an owner and a refresh trigger. → *Output: source inventory.*
2. **Schema standard** — enforce a consistent JSON/JSONL record: `id`, `source`, `title`, `section`, `content`, and metadata (`doc_type`, `version`, `effective_date`, `status`, `tags`); define chunking. → *Output: schema + chunking standard.*
3. **Index / re-index on source change** — only content at **status = Active/approved** is indexed as **authoritative**; Draft content is tagged as such, not served as authoritative. → *Output: current index.*
4. **Provenance** — every chunk carries source + version so any answer is traceable and auditable. → *Output: provenance-tagged corpus.*
5. **[Monthly] retrieval QC** — run representative queries; confirm correct, current chunks return; flag stale/duplicate/conflicting records. → *Output: retrieval eval.*
6. **Retire superseded records** on version bump so old versions aren't retrieved. → *Output: clean index.*

## Acceptance Criteria / QC
**Every retrievable chunk is schema-conformant, provenance-tagged, and current — no stale or unapproved content is served as authoritative.** Concretely:
- Source inventory current with owners + refresh triggers.
- All records conform to schema with provenance metadata.
- Only Active/approved content indexed as authoritative.
- Re-index performed on source change.
- Monthly retrieval eval run; issues flagged.
- Superseded records retired.

## Exceptions & Escalation
- **Retrieval returns stale/conflicting content** → pull the offending records, re-index, log; investigate the refresh trigger that missed.
- **Source of unknown authority** → do not index as authoritative until an owner + status are assigned.
- **Corpus loss/corruption** → restore from backup (TEC-006).

## Outputs
Schema-conformant, provenance-tagged KB corpus + index + eval records → Dropbox `/03_Resources/`. Backed up via **TEC-006**; consumes the SOP corpus (**GOV-000** + register).

## Revision History
| Version | Date | Author | Change |
|---------|------|--------|--------|
| v1.0 | 2026-08-17 | Tech Manager | Initial. Source inventory + JSON/JSONL schema with provenance; Active-only-authoritative indexing; monthly retrieval eval; superseded-record retirement. SOP corpus treated as a first-class source. |
