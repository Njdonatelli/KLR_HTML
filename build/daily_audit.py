#!/usr/bin/env python3
"""Daily SOP audit — pull the corpus from Dropbox, diff it, rebuild the GUI.

Runs once a day, not once per page view. That is the whole point: the GUI ships
with content embedded, so opening it costs zero network calls and works with no
signal on a jobsite.

Binds to the Dropbox FOLDER ID, never a path. Dropbox folder IDs survive move
and rename, so relocating the SOP folder requires no change here.

    set DROPBOX_TOKEN=...
    python daily_audit.py                    # audit + rebuild if changed
    python daily_audit.py --force            # rebuild regardless
    python daily_audit.py --report-only      # audit, never write

Exit codes: 0 = no change, 10 = changes applied, 1 = error.
This exists alongside the Zapier Zap deliberately — a Code by Zapier step is
capped at 10s (Starter) / 30s (Pro+), and 30 downloads plus a ~190 KB upload can
exceed that. If the Zap times out, schedule this instead; the output is identical.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any

API = "https://api.dropboxapi.com/2"
CONTENT_API = "https://content.dropboxapi.com/2"
SOP_FOLDER_ID = os.environ.get("KLR_SOP_FOLDER_ID", "id:sjRX_pO2EuYAAAAAAAAMYg")
MANIFEST_NAME = "audit_manifest.json"


def _req(url: str, token: str, *, body: bytes | None = None,
         headers: dict[str, str] | None = None) -> bytes:
    h = {"Authorization": f"Bearer {token}"}
    h.update(headers or {})
    req = urllib.request.Request(url, data=body, headers=h, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return r.read()
    except urllib.error.HTTPError as e:
        raise SystemExit(f"Dropbox {url.rsplit('/', 1)[-1]} failed {e.code}: "
                         f"{e.read().decode('utf-8', 'replace')[:400]}") from e


def list_folder(token: str, folder_id: str) -> list[dict[str, Any]]:
    """Paginates — the corpus is ~32 files today but must not silently truncate."""
    entries: list[dict[str, Any]] = []
    payload = {"path": folder_id, "recursive": False, "limit": 2000}
    data = json.loads(_req(f"{API}/files/list_folder", token,
                           body=json.dumps(payload).encode(),
                           headers={"Content-Type": "application/json"}))
    entries.extend(data.get("entries", []))
    while data.get("has_more"):
        data = json.loads(_req(f"{API}/files/list_folder/continue", token,
                               body=json.dumps({"cursor": data["cursor"]}).encode(),
                               headers={"Content-Type": "application/json"}))
        entries.extend(data.get("entries", []))
    return entries


def download(token: str, file_id: str) -> str:
    raw = _req(f"{CONTENT_API}/files/download", token,
               headers={"Dropbox-API-Arg": json.dumps({"path": file_id})})
    return raw.decode("utf-8").replace("\r\n", "\n")


def diff(old: dict[str, Any], new: dict[str, Any]) -> dict[str, list[str]]:
    o, n = set(old), set(new)
    return {
        "added": sorted(n - o),
        "removed": sorted(o - n),
        # rev changes on every content write — the reliable change signal
        "changed": sorted(i for i in o & n if old[i].get("rev") != new[i].get("rev")),
    }


def main() -> None:
    here = Path(__file__).resolve().parent
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--token", default=os.environ.get("DROPBOX_TOKEN", ""))
    ap.add_argument("--folder-id", default=SOP_FOLDER_ID)
    ap.add_argument("--sop-dir", type=Path, default=here / "sop")
    ap.add_argument("--manifest", type=Path, default=here / MANIFEST_NAME)
    ap.add_argument("--force", action="store_true", help="rebuild even if nothing changed")
    ap.add_argument("--report-only", action="store_true", help="never write files")
    args = ap.parse_args()

    if not args.token:
        raise SystemExit("no Dropbox token — set DROPBOX_TOKEN or pass --token")

    entries = [e for e in list_folder(args.token, args.folder_id)
               if e.get(".tag") == "file"
               and e["name"].startswith("SOP-") and e["name"].endswith(".md")]
    if not entries:
        raise SystemExit("audit aborted: Dropbox returned 0 SOP files. Refusing to "
                         "overwrite a good corpus with an empty one.")

    manifest = {
        e["name"]: {"rev": e.get("rev"), "modified": e.get("server_modified"),
                    "size": e.get("size"), "id": e.get("id")}
        for e in entries
    }
    previous = {}
    if args.manifest.exists():
        previous = json.loads(args.manifest.read_text(encoding="utf-8")).get("files", {})

    d = diff(previous, manifest)
    changed = any(d.values())

    print(f"audit: {len(manifest)} SOP files in Dropbox")
    for k in ("added", "changed", "removed"):
        if d[k]:
            print(f"  {k}: {', '.join(d[k])}")
    if not changed:
        print("  no change since last audit")

    if args.report_only or not (changed or args.force):
        sys.exit(0)

    args.sop_dir.mkdir(parents=True, exist_ok=True)
    for e in entries:
        text = download(args.token, e["id"]).strip() + "\n"
        (args.sop_dir / e["name"]).write_text(text, encoding="utf-8", newline="\n")
    # Drop local files that no longer exist upstream so the GUI can't serve a
    # deleted SOP as current.
    for stale in args.sop_dir.glob("SOP-*.md"):
        if stale.name not in manifest:
            stale.unlink()
            print(f"  pruned local: {stale.name}")

    audited = __import__("datetime").datetime.now(
        __import__("datetime").timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    args.manifest.write_text(json.dumps(
        {"audited": audited, "folder_id": args.folder_id, "files": manifest},
        indent=2), encoding="utf-8")

    import build_gui
    build_gui.build(
        here.parent / "klr_sop_gui.template.html", args.sop_dir,
        here / "sop_register.json", here.parent / "klr_sop_gui.html",
        folder_id=args.folder_id, audited=audited, manifest=manifest,
    )
    print(f"rebuilt GUI — audited {audited}")
    sys.exit(10)


if __name__ == "__main__":
    main()
