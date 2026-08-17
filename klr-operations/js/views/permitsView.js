/**
 * County-Wide Building Permits Scheduled Ingestion & Leads View
 */

import { state } from '../state.js';

let permitSearchQuery = '';
let permitValuationFilter = 'all'; // 'all', '1m', '500k', '250k'

export function renderPermitsView(container) {
  const permits = state.getPermits();

  // Filter permits
  const filteredPermits = permits.filter(p => {
    // Valuation filter -> converted to Score/Tier filter
    if (permitValuationFilter === '1m' && p.tier !== 'A') return false;
    if (permitValuationFilter === '500k' && p.tier !== 'B') return false;
    if (permitValuationFilter === '250k' && p.tier !== 'C') return false;

    // Search query
    if (!permitSearchQuery) return true;
    const q = permitSearchQuery.toLowerCase();
    return (
      (p.id && p.id.toLowerCase().includes(q)) ||
      (p.address && p.address.toLowerCase().includes(q)) ||
      (p.city && p.city.toLowerCase().includes(q)) ||
      (p.signalDesc && p.signalDesc.toLowerCase().includes(q)) ||
      (p.ownerName && p.ownerName.toLowerCase().includes(q)) ||
      (p.scope && p.scope.toLowerCase().includes(q))
    );
  });

  const tierACount = permits.filter(p => p.tier === 'A').length;
  const tierBCount = permits.filter(p => p.tier === 'B').length;

  // Render health banner if issues exist
  const healthBanner = (state.permitHealth && state.permitHealth.length > 0) 
    ? `<div style="background:#f8d7da; border-left:4px solid #dc3545; padding:11px 14px; margin-bottom: 18px; border-radius: 4px;">
         <b style="color:#842029; font-size: 0.85rem; display: block; margin-bottom: 6px;">SOURCE HEALTH</b>
         <ul style="color:#842029; font-size: 0.8rem; margin: 0; padding-left: 18px;">
           ${state.permitHealth.map(h => `<li>${h}</li>`).join('')}
         </ul>
       </div>`
    : '';

  container.innerHTML = `
    <div class="permits-view-container animate-fade-in">
      <!-- Header & Scraper Status Banner -->
      <div class="permits-header">
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
            <h2 style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary);">
              North County Build Signal Tracker
            </h2>
            <span class="badge ${state.permitHealth && state.permitHealth.length > 0 ? 'badge-atrisk' : 'badge-ontrack'}">
              <span class="badge-dot"></span> ${state.permitHealth && state.permitHealth.length > 0 ? 'Stale Sources' : 'Ingestion Active'}
            </span>
          </div>
          <p style="font-size: 0.78rem; color: var(--text-secondary);">
            Digest date: ${state.permitTimestamp || 'Unknown'} · Tracking ${permits.length} leads
          </p>
        </div>

        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-primary btn-sm" onclick="alert('Drop new Oceanside/Encinitas PDFs into: \\n02_Areas/Operations/Permit_Tracker/inbox')">
            📥 Drop PDF to Inbox
          </button>
        </div>
      </div>
      
      ${healthBanner}

      <!-- Ingestion Pipeline Stats Bar -->
      <div class="permits-stats-bar">
        <div class="permit-mini-stat">
          <div class="permit-mini-label">Total Ingested Leads</div>
          <div class="permit-mini-val">${permits.length}</div>
        </div>

        <div class="permit-mini-stat">
          <div class="permit-mini-label">Tier A Leads (New SFD)</div>
          <div class="permit-mini-val" style="color: var(--accent-sky);">${tierACount}</div>
        </div>

        <div class="permit-mini-stat">
          <div class="permit-mini-label">Tier B Leads (Yard Disturbance)</div>
          <div class="permit-mini-val" style="color: #34d399;">${tierBCount}</div>
        </div>

        <div class="permit-mini-stat">
          <div class="permit-mini-label">Runner Schedule</div>
          <div class="permit-mini-val" style="font-size: 0.92rem; font-family: var(--font-sans); color: var(--text-secondary); margin-top: 0.25rem;">
            Weekdays @ 6:00 AM PT
          </div>
        </div>
      </div>

      <!-- Controls & Filter Bar -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; gap: 0.75rem; flex-wrap: wrap;">
        <div class="search-box" style="max-width: 340px;">
          <span class="search-icon">🔍</span>
          <input type="text" id="permit-search-input" placeholder="Search address, owner, scope..." value="${permitSearchQuery}">
        </div>

        <div class="filters-group">
          <button class="filter-chip ${permitValuationFilter === 'all' ? 'active' : ''}" data-val-filter="all">All Tiers</button>
          <button class="filter-chip ${permitValuationFilter === '1m' ? 'active' : ''}" data-val-filter="1m">💎 Tier A (SFD)</button>
          <button class="filter-chip ${permitValuationFilter === '500k' ? 'active' : ''}" data-val-filter="500k">🟩 Tier B</button>
          <button class="filter-chip ${permitValuationFilter === '250k' ? 'active' : ''}" data-val-filter="250k">🟨 Tier C</button>
        </div>
      </div>

      <!-- Table Section -->
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Score</th>
              <th>Property</th>
              <th>Signal</th>
              <th>Milestone</th>
              <th>Dates</th>
              <th>Permit / Scope</th>
            </tr>
          </thead>
          <tbody>
            ${filteredPermits.length === 0 ? `
              <tr>
                <td colspan="6" style="text-align: center; padding: 3rem; color: var(--text-muted);">
                  No permit records found matching your filters.
                </td>
              </tr>
            ` : filteredPermits.map(p => {
              
              let tierColor = '#6c757d';
              let tierBg = '#e9ecef';
              if (p.tier === 'A') { tierColor = '#0f5132'; tierBg = '#d1e7dd'; }
              if (p.tier === 'B') { tierColor = '#664d03'; tierBg = '#fff3cd'; }
              
              return `
              <tr>
                <td>
                  <span style="background:${tierBg}; color:${tierColor}; padding:2px 7px; border-radius:3px; font-weight:700; font-size:11px;">${p.tier || '-'}</span> 
                  <b style="font-size: 1.1rem; color: var(--text-primary); margin-left: 4px;">${p.score}</b>
                </td>
                <td>
                  <div style="font-weight: 700; color: var(--text-primary);">${p.address}</div>
                  <div style="font-size: 0.72rem; color: var(--text-secondary);">${p.city}</div>
                  ${p.ownerName ? `<div style="font-size: 0.72rem; color: var(--text-primary); margin-top: 2px;">${p.ownerName}</div>` : ''}
                </td>
                <td>
                  <div style="font-size: 0.8rem; color: var(--text-primary); margin-bottom: 3px;">${p.signalDesc}</div>
                  <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                    ${(p.tags || []).map(t => `<span style="background:#f1f3f5; padding:1px 4px; font-size:10px; border-radius: 2px; color: var(--text-primary); font-family: monospace;">${t}</span>`).join('')}
                  </div>
                </td>
                <td>
                  <span class="badge ${p.status === 'completed' ? 'badge-completed' : (p.status === 'issued' ? 'badge-ontrack' : 'badge-neutral')}" style="margin-bottom: 2px;">
                    ${p.status}
                  </span>
                  <div style="font-size: 0.72rem; color: var(--text-secondary);">${p.subStatus}</div>
                </td>
                <td>
                  <div style="font-size: 0.78rem; color: var(--text-primary);">${p.dates}</div>
                </td>
                <td>
                  <div style="font-weight: 600; font-family: var(--font-mono); color: var(--accent-sky); font-size: 0.8rem;">${p.id}</div>
                  <div style="font-size: 0.72rem; color: var(--text-secondary); line-height: 1.3; max-width: 250px;">${p.scope}</div>
                </td>
              </tr>
            `}).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Attach search & filter listeners
  const searchInput = container.querySelector('#permit-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      permitSearchQuery = e.target.value;
      renderPermitsView(container);
    });
  }

  container.querySelectorAll('[data-val-filter]').forEach(chip => {
    chip.addEventListener('click', () => {
      permitValuationFilter = chip.dataset.valFilter;
      renderPermitsView(container);
    });
  });

  // CSV Export
  const exportBtn = container.querySelector('#btn-export-permits-csv');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      exportPermitsToCsv(filteredPermits);
    });
  }

  // Add Permit button
  const addPermitBtn = container.querySelector('#btn-add-permit');
  if (addPermitBtn) {
    addPermitBtn.addEventListener('click', () => {
      openAddPermitModal();
    });
  }
}

function exportPermitsToCsv(data) {
  const headers = ['PermitID', 'IssueDate', 'Jurisdiction', 'PermitType', 'Address', 'Valuation', 'Owner', 'Contractor', 'Status'];
  const rows = data.map(p => [
    `"${p.id}"`,
    `"${p.issueDate}"`,
    `"${p.jurisdiction}"`,
    `"${p.permitType}"`,
    `"${p.address.replace(/"/g, '""')}"`,
    p.valuation,
    `"${p.ownerName.replace(/"/g, '""')}"`,
    `"${p.contractor.replace(/"/g, '""')}"`,
    `"${p.status}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `County_Permits_Export_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function openAddPermitModal() {
  const modalOverlay = document.getElementById('global-modal-overlay');
  const modalContainer = document.getElementById('global-modal-content');
  if (!modalOverlay || !modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-header">
      <h3 class="modal-title">📝 Log New Building Permit Record</h3>
      <button class="modal-close-btn" id="modal-close-x">✕</button>
    </div>

    <form id="add-permit-form">
      <div class="modal-body">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Jurisdiction / Municipality</label>
            <input type="text" class="form-input" name="jurisdiction" required placeholder="e.g. Orange County / Central District" value="Orange County / Central District">
          </div>
          <div class="form-group">
            <label class="form-label">Permit Type / Scope</label>
            <input type="text" class="form-input" name="permitType" required placeholder="e.g. Luxury Custom Residence" value="Luxury Single Family Residence">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Job Address</label>
          <input type="text" class="form-input" name="address" required placeholder="e.g. 100 Ocean Blvd, Laguna Beach, CA">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Estimated Valuation ($ USD)</label>
            <input type="number" class="form-input" name="valuation" required placeholder="1250000" value="1250000">
          </div>
          <div class="form-group">
            <label class="form-label">Square Footage</label>
            <input type="text" class="form-input" name="sqft" placeholder="e.g. 5,200 sq ft" value="5,200 sq ft">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Property Owner / Entity</label>
            <input type="text" class="form-input" name="ownerName" required placeholder="e.g. Sterling Trust LLC">
          </div>
          <div class="form-group">
            <label class="form-label">General Contractor</label>
            <input type="text" class="form-input" name="contractor" placeholder="e.g. Pending Selection / Bidding" value="Pending Selection">
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-outline" id="modal-cancel-btn">Cancel</button>
        <button type="submit" class="btn btn-primary">Save Permit Record</button>
      </div>
    </form>
  `;

  modalOverlay.classList.add('active');

  const close = () => modalOverlay.classList.remove('active');
  modalContainer.querySelector('#modal-close-x').addEventListener('click', close);
  modalContainer.querySelector('#modal-cancel-btn').addEventListener('click', close);

  modalContainer.querySelector('#add-permit-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    state.addPermit({
      jurisdiction: formData.get('jurisdiction'),
      permitType: formData.get('permitType'),
      address: formData.get('address'),
      valuation: Number(formData.get('valuation')),
      sqft: formData.get('sqft'),
      ownerName: formData.get('ownerName'),
      contractor: formData.get('contractor'),
      status: 'Issued'
    });
    close();
  });
}
