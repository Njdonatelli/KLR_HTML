/**
 * KLR Build Operations — Trello Pipeline Deal Inspector & Card Editor Modal
 * Manages Stage Exit Criteria, SLA Clocks, Custom Fields, and Contractor Foreman Sync
 */

import { state } from '../state.js';

let activeDealTab = 'overview'; // 'overview', 'dates', 'cf_sync', 'exit_checklist'

export function openPipelineCardModal(cardId) {
  const card = state.getPipelineCard(cardId);
  if (!card) return;

  const modalOverlay = document.getElementById('global-modal-overlay');
  const modalContainer = document.getElementById('global-modal-content');
  if (!modalOverlay || !modalContainer) return;

  renderPipelineCardModalContent(modalContainer, modalOverlay, card);
  modalOverlay.classList.add('active');
}

export function openNewPipelineCardModal(initialStageId = 'stage-0') {
  const modalOverlay = document.getElementById('global-modal-overlay');
  const modalContainer = document.getElementById('global-modal-content');
  if (!modalOverlay || !modalContainer) return;

  const stages = state.getPipelineStages();
  const serviceLines = state.getServiceLines();
  const flags = state.getStatusFlags();

  modalContainer.innerHTML = `
    <div class="modal-header">
      <h3 class="modal-title">📝 Log New KLR Pipeline Deal</h3>
      <button class="modal-close-btn" id="modal-close-x">✕</button>
    </div>

    <form id="new-pipeline-card-form">
      <div class="modal-body">
        
        <!-- Standard Title Hint -->
        <div style="background: rgba(56, 189, 248, 0.08); border-left: 3px solid var(--accent-sky); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 1rem;">
          <strong>KLR Title Standard:</strong> <code>[Service] — Last Name — Street</code> (e.g. <em>Patio + Firepit — Ruiz — Vista Grande Dr</em>)
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Service Line (Exactly One)</label>
            <select class="form-select" name="serviceLine" required>
              ${serviceLines.map(sl => `
                <option value="${sl.id}">${sl.icon} ${sl.name}</option>
              `).join('')}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Initial Stage</label>
            <select class="form-select" name="stage">
              ${stages.map(s => `
                <option value="${s.id}" ${s.id === initialStageId ? 'selected' : ''}>${s.name}</option>
              `).join('')}
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Homeowner Last Name</label>
            <input type="text" class="form-input" name="lastName" required placeholder="e.g. Ruiz">
          </div>

          <div class="form-group">
            <label class="form-label">Estimate Value ($ USD)</label>
            <input type="number" class="form-input" name="estimateValue" placeholder="e.g. 45000" value="0">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Property Address</label>
          <input type="text" class="form-input" name="address" required placeholder="e.g. 3820 Vista Grande Dr, Oceanside, CA 92056">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Phone Number</label>
            <input type="text" class="form-input" name="phone" placeholder="e.g. 760-555-0192">
          </div>

          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" class="form-input" name="email" placeholder="e.g. homeowner@gmail.com">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Next Action Deadline (Due Date)</label>
            <input type="date" class="form-input" name="due">
          </div>

          <div class="form-group">
            <label class="form-label">Next Action Task Description</label>
            <input type="text" class="form-input" name="nextAction" placeholder="e.g. Site consult scheduled & drone mapping">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Internal Notes / Scope Description</label>
          <textarea class="form-textarea" name="notes" rows="3" placeholder="Add property access codes, structural constraints, HOA rules, or specific client requests here..."></textarea>
        </div>

      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-outline" id="modal-cancel-btn">Cancel</button>
        <button type="submit" class="btn btn-primary">Create Pipeline Card</button>
      </div>
    </form>
  `;

  modalOverlay.classList.add('active');

  const close = () => modalOverlay.classList.remove('active');
  modalContainer.querySelector('#modal-close-x').addEventListener('click', close);
  modalContainer.querySelector('#modal-cancel-btn').addEventListener('click', close);

  modalContainer.querySelector('#new-pipeline-card-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const serviceLineId = formData.get('serviceLine');
    const serviceLine = serviceLines.find(s => s.id === serviceLineId) || serviceLines[0];
    const lastName = formData.get('lastName');
    const address = formData.get('address');
    const streetPart = address.split(',')[0].trim();
    const stageId = formData.get('stage');
    const stage = stages.find(s => s.id === stageId) || stages[0];

    const newCard = {
      id: `card-${Date.now()}`,
      trelloCardId: `trello-${Date.now()}`,
      title: `${serviceLine.name} — ${lastName} — ${streetPart}`,
      lastName,
      serviceLine: serviceLine.id,
      serviceLineLabel: serviceLine.name,
      stage: stage.id,
      stageName: stage.name,
      estimateValue: Number(formData.get('estimateValue')) || 0,
      due: formData.get('due') ? `${formData.get('due')}T17:00:00.000Z` : '',
      nextAction: formData.get('nextAction') || 'Define Next Action in Monday Review',
      phone: formData.get('phone') || '',
      email: formData.get('email') || '',
      address,
      cfCustomerId: '',
      consultDate: '',
      designStarted: stage.id === 'stage-3' ? new Date().toISOString().split('T')[0] : '',
      designDelivered: '',
      depositClearedDate: stage.id === 'stage-5' ? new Date().toISOString().split('T')[0] : '',
      hoaSubmittedDate: '',
      nextFollowUpDate: '',
      labels: [serviceLine.id],
      checklist: [
        { id: `chk-1`, name: `Exit Condition: ${stage.exitCondition}`, completed: false }
      ],
      notes: formData.get('notes') || '',
      lastActivity: new Date().toISOString()
    };

    state.savePipelineCard(newCard);
    close();
    openPipelineCardModal(newCard.id);
  });
}

function renderPipelineCardModalContent(container, overlay, card) {
  const stages = state.getPipelineStages();
  const serviceLines = state.getServiceLines();
  const flags = state.getStatusFlags();
  const currentStage = stages.find(s => s.id === card.stage) || stages[0];
  const currentServiceLine = serviceLines.find(s => s.id === card.serviceLine) || serviceLines[0];
  const sla = state.calculateCardSLA(card);

  container.innerHTML = `
    <!-- Modal Header -->
    <div class="modal-header">
      <div style="flex: 1;">
        <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.35rem; flex-wrap: wrap;">
          <span class="service-pill" style="background: ${currentServiceLine.bg}; color: ${currentServiceLine.color};">
            ${currentServiceLine.icon} ${currentServiceLine.name}
          </span>
          
          <span class="badge" style="background: ${currentStage.color}20; color: ${currentStage.color}; border: 1px solid ${currentStage.color}40;">
            ${currentStage.name}
          </span>

          ${sla.isHardPromiseBreach ? `
            <span class="badge badge-blocked">⚠️ ${sla.slaMessage}</span>
          ` : (sla.isHardPromiseWarning ? `
            <span class="badge badge-atrisk">⏱️ ${sla.slaMessage}</span>
          ` : '')}

          ${sla.isMissingCfId ? `
            <span class="badge badge-blocked">⚠️ Missing CF Customer ID</span>
          ` : ''}
        </div>

        <h3 class="modal-title" style="font-size: 1.2rem;">${card.title}</h3>
      </div>
      <button class="modal-close-btn" id="modal-close-x">✕</button>
    </div>

    <!-- Modal Body with Tabs -->
    <div class="modal-body">
      
      <!-- Top Meta Stats Grid -->
      <div class="detail-meta-grid" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));">
        <div>
          <div class="meta-field-label">Estimate Valuation</div>
          <div class="meta-field-value" style="color: #38bdf8; font-family: var(--font-mono); font-size: 1.15rem;">
            $${(Number(card.estimateValue) || 0).toLocaleString()}
          </div>
        </div>

        <div>
          <div class="meta-field-label">Next Action Deadline (Due)</div>
          <div class="meta-field-value" style="color: ${sla.isOverdue ? '#ef4444' : 'var(--text-primary)'};">
            ${card.due ? `🎯 ${new Date(card.due).toLocaleDateString()}` : '—'}
          </div>
        </div>

        <div>
          <div class="meta-field-label">Contractor Foreman ID</div>
          <div class="meta-field-value" style="color: ${card.cfCustomerId ? 'var(--accent-sky)' : '#f43f5e'}; font-family: var(--font-mono);">
            ${card.cfCustomerId || '⚠️ Not Linked'}
          </div>
        </div>

        <div>
          <div class="meta-field-label">Current Stage</div>
          <div class="meta-field-value" style="color: ${currentStage.color}; font-size: 0.82rem;">
            ${currentStage.name}
          </div>
        </div>
      </div>

      <!-- Tabs Navigation -->
      <div class="modal-tabs">
        <button class="modal-tab-btn ${activeDealTab === 'overview' ? 'active' : ''}" data-tab="overview">
          👤 Deal Overview & Contacts
        </button>
        <button class="modal-tab-btn ${activeDealTab === 'dates' ? 'active' : ''}" data-tab="dates">
          ⏱️ Custom Dates & SLA Clocks
        </button>
        <button class="modal-tab-btn ${activeDealTab === 'cf_sync' ? 'active' : ''}" data-tab="cf_sync">
          🏢 Contractor Foreman Sync
        </button>
        <button class="modal-tab-btn ${activeDealTab === 'exit_checklist' ? 'active' : ''}" data-tab="exit_checklist">
          ✅ Stage Exit Checklist (${card.checklist ? card.checklist.filter(c => c.completed).length : 0}/${card.checklist ? card.checklist.length : 0})
        </button>
      </div>

      <!-- Tab Content Area -->
      <div id="deal-modal-tab-content">
        ${renderDealTabContent(card, stages, serviceLines, flags, currentStage, sla)}
      </div>

    </div>

    <!-- Modal Footer -->
    <div class="modal-footer">
      <button type="button" class="btn btn-outline" id="btn-delete-card" style="color: var(--status-blocked); border-color: rgba(244, 63, 94, 0.3); margin-right: auto;">
        🗑 Delete Card
      </button>
      <button type="button" class="btn btn-secondary" id="modal-done-btn">Done</button>
    </div>
  `;

  // Close handlers
  const close = () => overlay.classList.remove('active');
  container.querySelector('#modal-close-x').addEventListener('click', close);
  container.querySelector('#modal-done-btn').addEventListener('click', close);

  // Tab switching
  container.querySelectorAll('.modal-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeDealTab = btn.dataset.tab;
      renderPipelineCardModalContent(container, overlay, card);
    });
  });

  // Attach tab specific listeners
  attachDealModalListeners(container, overlay, card);
}

function renderDealTabContent(card, stages, serviceLines, flags, currentStage, sla) {
  if (activeDealTab === 'overview') {
    return `
      <form id="edit-deal-overview-form">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Service Line (Exactly One)</label>
            <select class="form-select" name="serviceLine">
              ${serviceLines.map(sl => `
                <option value="${sl.id}" ${sl.id === card.serviceLine ? 'selected' : ''}>${sl.icon} ${sl.name}</option>
              `).join('')}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Pipeline Stage (Trello owns stage)</label>
            <select class="form-select" name="stage">
              ${stages.map(s => `
                <option value="${s.id}" ${s.id === card.stage ? 'selected' : ''}>${s.name}</option>
              `).join('')}
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Homeowner Last Name</label>
            <input type="text" class="form-input" name="lastName" value="${card.lastName || ''}" required>
          </div>

          <div class="form-group">
            <label class="form-label">Estimate Value ($ USD)</label>
            <input type="number" class="form-input" name="estimateValue" value="${card.estimateValue || 0}">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Property Address</label>
          <input type="text" class="form-input" name="address" value="${card.address || ''}" required>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Phone Number</label>
            <input type="text" class="form-input" name="phone" value="${card.phone || ''}">
          </div>

          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" class="form-input" name="email" value="${card.email || ''}">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Next Action Deadline (Due Date)</label>
            <input type="date" class="form-input" name="due" value="${card.due ? card.due.split('T')[0] : ''}">
          </div>

          <div class="form-group">
            <label class="form-label">Next Action Task Description</label>
            <input type="text" class="form-input" name="nextAction" value="${card.nextAction || ''}">
          </div>
        </div>

        <!-- Status Flags Multi-Select -->
        <div class="form-group">
          <label class="form-label">Status Flags (Select all that apply)</label>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.25rem;">
            ${flags.map(f => {
              const checked = card.labels && card.labels.includes(f.id);
              return `
                <label class="flag-checkbox-label" style="background: ${f.bg}; color: ${f.color}; border: 1px solid ${f.color}40; padding: 0.35rem 0.65rem; border-radius: var(--radius-sm); font-size: 0.76rem; display: flex; align-items: center; gap: 0.4rem; cursor: pointer;">
                  <input type="checkbox" name="flag_${f.id}" value="${f.id}" ${checked ? 'checked' : ''}>
                  ${f.name}
                </label>
              `;
            }).join('')}
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Internal Notes</label>
          <textarea class="form-textarea" name="notes" rows="3">${card.notes || ''}</textarea>
        </div>

        <div style="display: flex; justify-content: flex-end; margin-top: 1rem;">
          <button type="submit" class="btn btn-primary">Save Deal Info</button>
        </div>
      </form>
    `;
  }

  if (activeDealTab === 'dates') {
    return `
      <form id="edit-deal-dates-form">
        <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-bottom: 1.25rem;">
          <h4 style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.35rem;">
            ⏱️ Two Hard Promises SLA Tracking
          </h4>
          <p style="font-size: 0.76rem; color: var(--text-secondary); line-height: 1.45;">
            Dates recorded here are measured against KLR's strict SLA aging thresholds. A blank date field leaves the build unmeasurable.
          </p>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Consult Date (Set when consult booked)</label>
            <input type="date" class="form-input" name="consultDate" value="${card.consultDate || ''}">
          </div>

          <div class="form-group">
            <label class="form-label">Next Follow-Up (Required on every touch at Stage 4)</label>
            <input type="date" class="form-input" name="nextFollowUpDate" value="${card.nextFollowUpDate || ''}">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Design Started (Stage 3 entry)</label>
            <input type="date" class="form-input" name="designStarted" value="${card.designStarted ? card.designStarted.split('T')[0] : ''}">
          </div>

          <div class="form-group">
            <label class="form-label">Design Delivered (Day 5-7 SLA Deadline)</label>
            <input type="date" class="form-input" name="designDelivered" value="${card.designDelivered ? card.designDelivered.split('T')[0] : ''}">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Deposit Cleared (Funds in bank)</label>
            <input type="date" class="form-input" name="depositClearedDate" value="${card.depositClearedDate || ''}">
          </div>

          <div class="form-group">
            <label class="form-label">HOA Submitted (Day 3-4 Post-Deposit SLA)</label>
            <input type="date" class="form-input" name="hoaSubmittedDate" value="${card.hoaSubmittedDate || ''}">
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; margin-top: 1rem;">
          <button type="submit" class="btn btn-primary">Save SLA Dates</button>
        </div>
      </form>
    `;
  }

  if (activeDealTab === 'cf_sync') {
    return `
      <form id="edit-deal-cf-form">
        <div style="background: rgba(244, 63, 94, 0.08); border-left: 3px solid #f43f5e; padding: 0.85rem 1rem; border-radius: var(--radius-sm); margin-bottom: 1.25rem;">
          <h4 style="font-size: 0.85rem; font-weight: 700; color: #f43f5e; margin-bottom: 0.25rem;">
            ⚠️ System Rule: CF Customer ID required at Stage 5+
          </h4>
          <p style="font-size: 0.76rem; color: var(--text-secondary); line-height: 1.45;">
            Contractor Foreman exposes no project or invoice object to automation, so this ID is the only link reconciling this board and the accounting books. Paste it by hand when you create the CF customer record.
          </p>
        </div>

        <div class="form-group">
          <label class="form-label">Contractor Foreman Customer ID</label>
          <div style="display: flex; gap: 0.5rem;">
            <input type="text" class="form-input" name="cfCustomerId" value="${card.cfCustomerId || ''}" placeholder="e.g. CF-CUST-8910" style="font-family: var(--font-mono); font-weight: 700;">
            <a href="https://app.contractorforeman.com" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="color: var(--accent-sky); white-space: nowrap;">
              Open CF ↗
            </a>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Itemized Estimate in CF ($ USD)</label>
            <input type="number" class="form-input" name="estimateValue" value="${card.estimateValue || 0}">
          </div>

          <div class="form-group">
            <label class="form-label">Deposit Verification</label>
            <input type="date" class="form-input" name="depositClearedDate" value="${card.depositClearedDate || ''}">
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; margin-top: 1rem;">
          <button type="submit" class="btn btn-primary">Save CF Integration</button>
        </div>
      </form>
    `;
  }

  if (activeDealTab === 'exit_checklist') {
    return `
      <div>
        <div style="background: var(--bg-tertiary); padding: 0.85rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-bottom: 1.25rem;">
          <h4 style="font-size: 0.84rem; font-weight: 700; color: ${currentStage.color}; margin-bottom: 0.25rem;">
            ${currentStage.name} — Exit Condition
          </h4>
          <p style="font-size: 0.76rem; color: var(--text-secondary);">
            <em>"${currentStage.exitCondition}"</em>
          </p>
        </div>

        <div class="milestones-checklist">
          ${(!card.checklist || card.checklist.length === 0) ? `
            <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
              No checklist items defined.
            </div>
          ` : card.checklist.map((item, idx) => `
            <div class="checklist-item ${item.completed ? 'completed' : ''}">
              <input type="checkbox" class="checklist-checkbox deal-checklist-toggle" data-item-idx="${idx}" ${item.completed ? 'checked' : ''}>
              <div class="checklist-content">
                <div class="checklist-title">${item.name}</div>
              </div>
              <button class="btn btn-outline btn-sm delete-checklist-btn" data-item-idx="${idx}" style="padding: 0.2rem 0.5rem; color: var(--status-blocked);" title="Delete item">
                ✕
              </button>
            </div>
          `).join('')}
        </div>

        <!-- Add Checklist Item Form -->
        <form id="add-deal-checklist-form" style="margin-top: 1.25rem; display: flex; gap: 0.5rem; background: var(--bg-tertiary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px dashed var(--border-subtle);">
          <input type="text" class="form-input" name="name" required placeholder="Add exit requirement or punch list item..." style="flex: 1;">
          <button type="submit" class="btn btn-primary btn-sm">+ Add Item</button>
        </form>
      </div>
    `;
  }

  return '';
}

function attachDealModalListeners(container, overlay, card) {
  // Overview Form Submit
  const overviewForm = container.querySelector('#edit-deal-overview-form');
  if (overviewForm) {
    overviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const serviceLineId = formData.get('serviceLine');
      const serviceLines = state.getServiceLines();
      const serviceLine = serviceLines.find(s => s.id === serviceLineId) || serviceLines[0];
      const stageId = formData.get('stage');
      const stages = state.getPipelineStages();
      const stage = stages.find(s => s.id === stageId) || stages[0];

      // Collect flags
      const labels = [serviceLine.id];
      state.getStatusFlags().forEach(f => {
        if (formData.get(`flag_${f.id}`)) {
          labels.push(f.id);
        }
      });

      card.serviceLine = serviceLine.id;
      card.serviceLineLabel = serviceLine.name;
      card.stage = stage.id;
      card.stageName = stage.name;
      card.lastName = formData.get('lastName');
      card.estimateValue = Number(formData.get('estimateValue')) || 0;
      card.address = formData.get('address');
      card.phone = formData.get('phone');
      card.email = formData.get('email');
      card.due = formData.get('due') ? `${formData.get('due')}T17:00:00.000Z` : '';
      card.nextAction = formData.get('nextAction');
      card.notes = formData.get('notes');
      card.labels = labels;

      state.savePipelineCard(card);
      renderPipelineCardModalContent(container, overlay, card);
    });
  }

  // Dates Form Submit
  const datesForm = container.querySelector('#edit-deal-dates-form');
  if (datesForm) {
    datesForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      card.consultDate = formData.get('consultDate');
      card.nextFollowUpDate = formData.get('nextFollowUpDate');
      card.designStarted = formData.get('designStarted') ? `${formData.get('designStarted')}T00:00:00.000Z` : '';
      card.designDelivered = formData.get('designDelivered') ? `${formData.get('designDelivered')}T00:00:00.000Z` : '';
      card.depositClearedDate = formData.get('depositClearedDate');
      card.hoaSubmittedDate = formData.get('hoaSubmittedDate');

      state.savePipelineCard(card);
      renderPipelineCardModalContent(container, overlay, card);
    });
  }

  // CF Form Submit
  const cfForm = container.querySelector('#edit-deal-cf-form');
  if (cfForm) {
    cfForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      card.cfCustomerId = formData.get('cfCustomerId').trim();
      card.estimateValue = Number(formData.get('estimateValue')) || 0;
      card.depositClearedDate = formData.get('depositClearedDate');

      state.savePipelineCard(card);
      renderPipelineCardModalContent(container, overlay, card);
    });
  }

  // Checklist Toggle
  container.querySelectorAll('.deal-checklist-toggle').forEach(box => {
    box.addEventListener('change', () => {
      const idx = parseInt(box.dataset.itemIdx, 10);
      if (card.checklist && card.checklist[idx]) {
        card.checklist[idx].completed = box.checked;
        state.savePipelineCard(card);
        renderPipelineCardModalContent(container, overlay, card);
      }
    });
  });

  // Delete Checklist Item
  container.querySelectorAll('.delete-checklist-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.itemIdx, 10);
      if (card.checklist && card.checklist[idx]) {
        card.checklist.splice(idx, 1);
        state.savePipelineCard(card);
        renderPipelineCardModalContent(container, overlay, card);
      }
    });
  });

  // Add Checklist Item Form
  const addChecklistForm = container.querySelector('#add-deal-checklist-form');
  if (addChecklistForm) {
    addChecklistForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      if (!card.checklist) card.checklist = [];
      card.checklist.push({
        id: `chk-${Date.now()}`,
        name: formData.get('name'),
        completed: false
      });
      state.savePipelineCard(card);
      renderPipelineCardModalContent(container, overlay, card);
    });
  }

  // Delete Card Button
  const deleteBtn = container.querySelector('#btn-delete-card');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      if (confirm(`Are you sure you want to delete the pipeline card "${card.title}"?`)) {
        state.deletePipelineCard(card.id);
        overlay.classList.remove('active');
      }
    });
  }
}
