#!/usr/bin/env python3
"""Generate klr_sop_gui.html from the canonical Markdown SOP corpus.

The GUI is a build artifact. Markdown in Dropbox stays the source of truth per
SOP-GOV-000; this script is the only thing that writes the HTML.

    python build_gui.py                       # uses ./sop and ./sop_register.json
    python build_gui.py --sop-dir "C:/Users/nicol/Dropbox/.../SOP"

Register status is reconciled on every build: any SOP with a Markdown file is
Draft/Active, anything catalogued without one stays Registered. That removes the
hand-maintained status column that drifted in the previous single-file version.
"""

from __future__ import annotations

import argparse
import datetime as dt
import os
import json
import re
import sys
from pathlib import Path
from typing import Any

TEMPLATE_MARKER = "__SOP_DATA_JSON__"
ID_RE = re.compile(r"SOP-((?:SAL|DES|CON|PRO|FLD|PRC|FIN|SAF|TEC|CX|HR|GOV)-\d{3})")
FIELD_RE = re.compile(r"^\| *([A-Za-z][^|]*?) *\| *(.*?) *\|\s*$")
AUTHORED_STATUS = "Draft"
UNAUTHORED_STATUS = "Registered"


def parse_front_matter(md: str) -> dict[str, str]:
    """Pull the leading metadata table. Bounded to the first 20 lines so the
    spec tables further down (same pipe syntax) are not mistaken for metadata."""
    fields: dict[str, str] = {}
    for line in md.splitlines()[:20]:
        m = FIELD_RE.match(line)
        if m and m.group(1) != "Field" and not set(m.group(1)) <= {"-", " ", ":"}:
            fields[m.group(1)] = m.group(2)
    return fields


def read_corpus(sop_dir: Path) -> dict[str, str]:
    corpus: dict[str, str] = {}
    for path in sorted(sop_dir.glob("SOP-*.md")):
        m = ID_RE.search(path.name)
        if not m:
            print(f"  skip (unparseable filename): {path.name}", file=sys.stderr)
            continue
        sop_id = m.group(1)
        if sop_id in corpus:
            raise SystemExit(f"duplicate SOP id {sop_id} — {path.name} collides with an earlier file")
        corpus[sop_id] = path.read_text(encoding="utf-8").replace("\r\n", "\n").strip() + "\n"
    return corpus


def reconcile(register: list[dict[str, Any]], corpus: dict[str, str]) -> list[dict[str, Any]]:
    """Status and version follow the corpus, not the register's own columns."""
    known = {s["id"] for s in register}
    for entry in register:
        md = corpus.get(entry["id"])
        if md is None:
            entry["status"] = UNAUTHORED_STATUS
            entry["ver"] = None
            continue
        fields = parse_front_matter(md)
        if entry.get("status") not in ("Draft", "Active", "Reviewed", "Approved", "Retired"):
            entry["status"] = AUTHORED_STATUS
        entry["ver"] = fields.get("Version") or entry.get("ver") or "v1.0"
        if fields.get("Owner"):
            entry["owner"] = fields["Owner"]
    orphans = sorted(set(corpus) - known)
    if orphans:
        raise SystemExit(
            "Markdown files exist for SOPs missing from the register: "
            + ", ".join(orphans)
            + "\nAdd them to sop_register.json before building."
        )
    return register


def build(template: Path, sop_dir: Path, register_path: Path, out: Path,
          live_endpoint: str = "", folder_id: str = "",
          audited: str = "", manifest: dict[str, Any] | None = None) -> None:
    tpl = template.read_text(encoding="utf-8")
    if TEMPLATE_MARKER not in tpl:
        raise SystemExit(f"{template} is missing the {TEMPLATE_MARKER} placeholder")

    reg = json.loads(register_path.read_text(encoding="utf-8"))
    corpus = read_corpus(sop_dir)
    sops = reconcile(reg["sops"], corpus)

    payload = {
        "domains": reg["domains"],
        "spine": reg["spine"],
        "sops": sops,
        "content": corpus,
        # Optional static-bundle override. Empty in the daily-audit model:
        # content is embedded, so a page view costs zero network calls.
        "feed": {
            "endpoint": live_endpoint,
            "folder_id": folder_id,
            "stale_after_hours": 48,
        },
        "manifest": {ID_RE.search(n).group(1): m for n, m in (manifest or {}).items()
                     if ID_RE.search(n)},
        "build": {
            "generated": dt.datetime.now().strftime("%Y-%m-%d %H:%M"),
            "audited": audited or None,
            "source": str(sop_dir),
            "files": len(corpus),
        },
    }

    # </script> inside JSON would close the host tag early; \u003c is inert but
    # still parses back to "<" on JSON.parse.
    blob = json.dumps(payload, ensure_ascii=False).replace("<", "\\u003c")
    out.write_text(tpl.replace(TEMPLATE_MARKER, blob), encoding="utf-8", newline="\n")

    authored = sum(1 for s in sops if s["id"] != "GOV-000" and s["status"] != UNAUTHORED_STATUS)
    total = sum(1 for s in sops if s["id"] != "GOV-000")
    stamp = f", audited {audited}" if audited else ""
    print(f"built {out}  —  {len(corpus)} markdown files, {authored}/{total} authored, "
          f"{out.stat().st_size // 1024} KB{stamp}")

    missing = [s["id"] for s in sops if s["status"] != UNAUTHORED_STATUS and s["id"] not in corpus]
    if missing:
        print(f"  warning: register marks these authored but no .md exists: {', '.join(missing)}", file=sys.stderr)


def main() -> None:
    here = Path(__file__).resolve().parent
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--sop-dir", type=Path, default=here / "sop", help="directory of SOP-*.md files")
    ap.add_argument("--register", type=Path, default=here / "sop_register.json")
    ap.add_argument("--template", type=Path, default=here.parent / "klr_sop_gui.template.html")
    ap.add_argument("--out", type=Path, default=here.parent / "klr_sop_gui.html")
    ap.add_argument("--live-endpoint", default=os.environ.get("KLR_FEED_ENDPOINT", ""),
                    help="OPTIONAL static bundle URL. Leave empty for the daily-audit "
                         "model, where content is embedded (env: KLR_FEED_ENDPOINT)")
    ap.add_argument("--folder-id", default=os.environ.get("KLR_SOP_FOLDER_ID", "id:sjRX_pO2EuYAAAAAAAAMYg"),
                    help="Dropbox folder ID of the SOP store — survives move/rename (env: KLR_SOP_FOLDER_ID)")
    args = ap.parse_args()

    for p, label in ((args.sop_dir, "SOP directory"), (args.register, "register"), (args.template, "template")):
        if not p.exists():
            raise SystemExit(f"{label} not found: {p}")

    build(args.template, args.sop_dir, args.register, args.out,
          live_endpoint=args.live_endpoint, folder_id=args.folder_id)


if __name__ == "__main__":
    main()
