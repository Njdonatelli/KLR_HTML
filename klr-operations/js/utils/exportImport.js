/**
 * Data Backup, Restore & Sync Manager (JSON Export/Import)
 */

import { state } from '../state.js';

export function openDataSyncModal() {
  const modalOverlay = document.getElementById('global-modal-overlay');
  const modalContainer = document.getElementById('global-modal-content');
  if (!modalOverlay || !modalContainer) return;

  const currentJson = state.exportDataJson();

  modalContainer.innerHTML = `
    <div class="modal-header">
      <h3 class="modal-title">💾 Backup, Restore & Data Sync</h3>
      <button class="modal-close-btn" id="modal-close-x">✕</button>
    </div>

    <div class="modal-body">
      <p style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
        Your operations command center automatically persists changes to local storage. You can also export a complete JSON snapshot to backup your workflows or transfer data across devices.
      </p>

      <div style="display: flex; gap: 0.75rem; margin-bottom: 1.25rem;">
        <button class="btn btn-primary" id="btn-download-backup">
          📥 Download JSON Backup
        </button>
        <button class="btn btn-secondary" id="btn-copy-json">
          📋 Copy JSON
        </button>
        <button class="btn btn-outline" id="btn-reset-sample" style="color: var(--status-blocked); border-color: rgba(244, 63, 94, 0.3); margin-left: auto;">
          ↺ Reset to Default Sample Data
        </button>
      </div>

      <div class="form-group">
        <label class="form-label">Restore / Import Data (Paste JSON below)</label>
        <textarea class="form-textarea" id="import-json-area" rows="8" style="font-family: var(--font-mono); font-size: 0.75rem;">${currentJson}</textarea>
      </div>
      <div id="import-status-msg" style="font-size: 0.76rem; margin-top: 0.5rem;"></div>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-outline" id="modal-cancel-btn">Close</button>
      <button type="button" class="btn btn-primary" id="btn-apply-import">Apply & Restore JSON</button>
    </div>
  `;

  modalOverlay.classList.add('active');

  const close = () => modalOverlay.classList.remove('active');
  modalContainer.querySelector('#modal-close-x').addEventListener('click', close);
  modalContainer.querySelector('#modal-cancel-btn').addEventListener('click', close);

  // Download backup
  modalContainer.querySelector('#btn-download-backup').addEventListener('click', () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(state.exportDataJson());
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `KLR_Operations_Command_Center_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  });

  // Copy JSON
  modalContainer.querySelector('#btn-copy-json').addEventListener('click', () => {
    navigator.clipboard.writeText(state.exportDataJson()).then(() => {
      const btn = modalContainer.querySelector('#btn-copy-json');
      btn.textContent = '✓ Copied!';
      setTimeout(() => { btn.textContent = '📋 Copy JSON'; }, 2000);
    });
  });

  // Reset defaults
  modalContainer.querySelector('#btn-reset-sample').addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all initiatives and permit data to default sample data? Any unbacked-up custom edits will be replaced.')) {
      state.resetToDefaults();
      close();
    }
  });

  // Apply Import
  modalContainer.querySelector('#btn-apply-import').addEventListener('click', () => {
    const jsonText = modalContainer.querySelector('#import-json-area').value;
    const result = state.importDataJson(jsonText);
    const statusDiv = modalContainer.querySelector('#import-status-msg');

    if (result.success) {
      statusDiv.innerHTML = '<span style="color: var(--status-ontrack);">✓ Successfully restored data! Refreshing dashboard...</span>';
      setTimeout(() => {
        close();
      }, 1000);
    } else {
      statusDiv.innerHTML = `<span style="color: var(--status-blocked);">⚠️ Import failed: ${result.error}</span>`;
    }
  });
}
