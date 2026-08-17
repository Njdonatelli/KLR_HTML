/**
 * Code by Zapier — JavaScript — "KLR SOP daily audit"
 *
 * Input Data (configure in the step, left column = variable name):
 *   token        → your Dropbox access token
 *   folderId     → id:sjRX_pO2EuYAAAAAAAAMYg
 *   outFolder    → /Klrbuildllc Team Folder/03_Resources/standard_operating_procedures
 *   rebuildHtml  → "yes" to also regenerate klr_sop_gui.html, "no" to bundle only
 *
 * Binds to the FOLDER ID, never a path — Dropbox IDs survive move and rename,
 * so relocating the SOP folder needs no edit here.
 *
 * TIMEOUT: Code by Zapier allows 10s (Starter) / 30s (Pro+). This does ~31
 * parallel downloads plus one or two uploads. If it times out, set
 * rebuildHtml = "no", or run build/daily_audit.py on a scheduled task instead —
 * it produces byte-identical output.
 */

const token = inputData.token;
const folderId = inputData.folderId;
const outFolder = (inputData.outFolder || '').replace(/\/+$/, '');
const rebuildHtml = String(inputData.rebuildHtml || 'no').toLowerCase() === 'yes';

const rpc = (path, body) =>
  fetch('https://api.dropboxapi.com/2/' + path, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(async (r) => {
    if (!r.ok) throw new Error(path + ' → ' + r.status + ' ' + (await r.text()).slice(0, 300));
    return r.json();
  });

const dl = (id) =>
  fetch('https://content.dropboxapi.com/2/files/download', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token, 'Dropbox-API-Arg': JSON.stringify({ path: id }) },
  }).then(async (r) => {
    if (!r.ok) throw new Error('download ' + id + ' → ' + r.status);
    return r.text();
  });

const up = (path, content) =>
  fetch('https://content.dropboxapi.com/2/files/upload', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/octet-stream',
      'Dropbox-API-Arg': JSON.stringify({ path, mode: 'overwrite', mute: true }),
    },
    body: content,
  }).then(async (r) => {
    if (!r.ok) throw new Error('upload ' + path + ' → ' + r.status + ' ' + (await r.text()).slice(0, 300));
    return r.json();
  });

// ── 1. inventory ────────────────────────────────────────────────────────
let listing = await rpc('files/list_folder', { path: folderId, recursive: false, limit: 2000 });
let entries = listing.entries || [];
while (listing.has_more) {
  listing = await rpc('files/list_folder/continue', { cursor: listing.cursor });
  entries = entries.concat(listing.entries || []);
}

const sops = entries.filter(
  (e) => e['.tag'] === 'file' && e.name.startsWith('SOP-') && e.name.endsWith('.md')
);

// Refuse to publish an empty corpus over a good one. A transient permission
// failure returning zero entries would otherwise wipe the GUI.
if (!sops.length) throw new Error('audit aborted: 0 SOP files returned from Dropbox');

const manifest = {};
for (const e of sops) {
  manifest[e.name] = { rev: e.rev, modified: e.server_modified, size: e.size, id: e.id };
}

// ── 2. diff against the previous audit ──────────────────────────────────
let previous = {};
try {
  previous = JSON.parse(await dl(outFolder + '/audit_manifest.json')).files || {};
} catch (err) {
  previous = {}; // first run
}
const oldK = Object.keys(previous);
const newK = Object.keys(manifest);
const added = newK.filter((k) => !oldK.includes(k));
const removed = oldK.filter((k) => !newK.includes(k));
const changed = newK.filter((k) => oldK.includes(k) && previous[k].rev !== manifest[k].rev);
const isChanged = added.length + removed.length + changed.length > 0;

// ── 3. pull content + parse front matter ────────────────────────────────
const ID_RE = /SOP-((?:SAL|DES|CON|PRO|FLD|PRC|FIN|SAF|TEC|CX|HR|GOV)-\d{3})/;
const FIELD = /^\| *([A-Za-z][^|]*?) *\| *(.*?) *\|\s*$/;

const texts = await Promise.all(sops.map((e) => dl(e.id)));
const content = {};
const meta = {};

sops.forEach((e, i) => {
  const m = ID_RE.exec(e.name);
  if (!m) return;
  const id = m[1];
  const md = texts[i].replace(/\r\n/g, '\n').trim() + '\n';
  const fields = {};
  for (const line of md.split('\n').slice(0, 20)) {
    const f = FIELD.exec(line);
    if (f && f[1] !== 'Field' && !/^[-: ]+$/.test(f[1])) fields[f[1]] = f[2];
  }
  const t = /^#\s*SOP-[A-Z]+-\d{3}\s*[·|-]\s*(.+)$/m.exec(md);
  content[id] = md;
  meta[id] = {
    title: t ? t[1].trim() : null,
    owner: fields['Owner'] || null,
    version: fields['Version'] || null,
    effective: fields['Effective'] || null,
    last_reviewed: fields['Last reviewed'] || null,
    next_review: fields['Next review'] || null,
    rev: e.rev,
    server_modified: e.server_modified,
    name: e.name,
  };
});

const audited = new Date().toISOString();
const bundle = {
  audited,
  source: { folder_id: folderId, path_display: outFolder },
  count: Object.keys(content).length,
  content,
  meta,
};

// ── 4. publish ──────────────────────────────────────────────────────────
if (isChanged) {
  await up(outFolder + '/sop_bundle.json', JSON.stringify(bundle));
  await up(
    outFolder + '/audit_manifest.json',
    JSON.stringify({ audited, folder_id: folderId, files: manifest }, null, 2)
  );

  if (rebuildHtml) {
    // Template lives beside the corpus so the Zap has no repo dependency.
    const tpl = await dl(outFolder + '/klr_sop_gui.template.html');
    const payload = JSON.parse(await dl(outFolder + '/sop_register.json'));
    const html = tpl.replace(
      '__SOP_DATA_JSON__',
      JSON.stringify({
        domains: payload.domains,
        spine: payload.spine,
        sops: payload.sops,
        content,
        feed: { endpoint: '', folder_id: folderId, stale_after_hours: 48 },
        manifest: Object.fromEntries(
          Object.entries(manifest)
            .filter(([n]) => ID_RE.exec(n))
            .map(([n, v]) => [ID_RE.exec(n)[1], v])
        ),
        build: { generated: audited, audited, source: outFolder, files: Object.keys(content).length },
      }).replace(/</g, '\\u003c')
    );
    await up(outFolder + '/klr_sop_gui.html', html);
  }
}

// Returned to the Zap for the Filter + Email steps.
output = [
  {
    audited,
    changed: isChanged,
    total: Object.keys(content).length,
    added_count: added.length,
    changed_count: changed.length,
    removed_count: removed.length,
    added: added.join(', ') || 'none',
    updated: changed.join(', ') || 'none',
    removed: removed.join(', ') || 'none',
    // Governance signal the register cares about but nothing else reports on.
    missing_review_dates: Object.entries(meta)
      .filter(([, m]) => !m.last_reviewed || /^_+$/.test(m.last_reviewed || ''))
      .map(([id]) => id).length,
    summary: isChanged
      ? `${added.length} added, ${changed.length} updated, ${removed.length} removed`
      : 'No change since last audit',
  },
];
