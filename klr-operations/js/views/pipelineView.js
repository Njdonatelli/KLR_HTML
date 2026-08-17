/**
 * KLR Build Operations — Trello Pipeline Board & Table View
 * Implements 11 Stages, Strict SLA Calculations, Stage Exit Conditions, and Contractor Foreman Integration
 */

import { state } from '../state.js';
import { openPipelineCardModal, openNewPipelineCardModal } from './pipelineCardModal.js';
import { openMondayReviewModal } from './mondayReviewModal.js';

let currentPipelineViewMode = 'board'; // 'board', 'table', 'rules'

export function renderPipelineView(container) {
  const stages = state.getPipelineStages();
  const serviceLines = state.getServiceLines();
  const flags = state.getStatusFlags();
  const rules = state.getPipelineRules();
  const boardMeta = state.getPipelineBoardMeta();
  const stats = state.getPipelineStats();
  const filteredCards = state.getFilteredPipelineCards();

  container.innerHTML = `
    <div class="pipeline-view-container animate-fade-in">
      
      <!-- Top Operations Banner -->
      <div class="pipeline-header">
        <div class="pipeline-header-info">
          <div style="display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.25rem;">
            <span class="pipeline-badge">⚡ TRELLO PIPELINE</span>
            <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary);">
              ${boardMeta.name}
            </h2>
            <a href="${boardMeta.url}" target="_blank" rel="noopener" class="trello-ext-link" title="Open live board in Trello">
              ↗ trello.com
            </a>
          </div>
          <p style="font-size: 0.78rem; color: var(--text-secondary);">
            Oceanside, CA • Designed with Intent. Built to Endure • <em>"Trello owns STAGE. Contractor Foreman owns MONEY."</em>
          </p>
        </div>

        <div class="pipeline-header-actions">
          <button class="btn btn-secondary btn-sm" id="btn-monday-review" title="Run Right-to-Left Weekly Reconciliation">
            📋 Monday Review Workflow
          </button>
          <button class="btn btn-outline btn-sm" id="btn-pipeline-rules-quick">
            📌 Rules & SLA Guide
          </button>
          <button class="btn btn-outline btn-sm" id="btn-import-trello-json" title="Sync / Paste Trello Export JSON or CSV">
            📥 Sync Trello Data
          </button>
          <button class="btn btn-outline btn-sm" id="btn-fetch-cf-leads" title="Fetch New Leads from Contractor Foreman" style="color: var(--status-ontrack); border-color: rgba(52, 211, 153, 0.3);">
            ⬇️ Fetch CF Leads
          </button>
          <button class="btn btn-primary btn-sm" id="btn-new-pipeline-deal">
            + New Pipeline Deal
          </button>
        </div>
      </div>

      <!-- Executive Pipeline KPI Summary Cards -->
      <div class="pipeline-kpi-bar">
        <div class="pipe-kpi-card">
          <div class="pipe-kpi-label">Active Pipeline Value</div>
          <div class="pipe-kpi-val" style="color: #38bdf8;">
            $${stats.totalPipelineValue.toLocaleString()}
          </div>
          <div class="pipe-kpi-sub">${stats.activeDealsCount} active deals in progress</div>
        </div>

        <div class="pipe-kpi-card">
          <div class="pipe-kpi-label">Two Hard Promises SLA</div>
          <div class="pipe-kpi-val" style="font-size: 1.15rem; display: flex; gap: 0.4rem; align-items: center;">
            ${stats.promiseBreaches > 0 
              ? `<span class="badge badge-blocked" style="font-size: 0.75rem;">⚠️ ${stats.promiseBreaches} Breach</span>` 
              : `<span class="badge badge-ontrack" style="font-size: 0.75rem;">✓ SLAs Healthy</span>`}
            ${stats.promiseWarnings > 0 
              ? `<span class="badge badge-atrisk" style="font-size: 0.75rem;">${stats.promiseWarnings} Warn</span>` 
              : ''}
          </div>
          <div class="pipe-kpi-sub">Day 5-7 Design & Day 3-4 HOA</div>
        </div>

        <div class="pipe-kpi-card">
          <div class="pipe-kpi-label">CF Book Reconciliation</div>
          <div class="pipe-kpi-val" style="font-size: 1.15rem; display: flex; gap: 0.4rem; align-items: center;">
            ${stats.missingCfIds > 0 
              ? `<span class="badge badge-atrisk" style="font-size: 0.75rem;">⚠️ ${stats.missingCfIds} Missing CF ID</span>` 
              : `<span class="badge badge-ontrack" style="font-size: 0.75rem;">✓ 100% In CF</span>`}
          </div>
          <div class="pipe-kpi-sub">Required link at Stage 5+</div>
        </div>

        <div class="pipe-kpi-card">
          <div class="pipe-kpi-label">Closed Won Revenue</div>
          <div class="pipe-kpi-val" style="color: #34d399;">
            $${stats.closedWonValue.toLocaleString()}
          </div>
          <div class="pipe-kpi-sub">Final invoices cleared</div>
        </div>
      </div>

      <!-- Controls, Search, Filters & View Switcher -->
      <div class="pipeline-controls-bar">
        <div style="display: flex; gap: 0.75rem; align-items: center; flex: 1; flex-wrap: wrap;">
          <div class="search-box" style="max-width: 320px;">
            <span class="search-icon">🔍</span>
            <input type="text" id="pipeline-search-input" placeholder="Search client, street, phone, CF ID..." value="${state.pipelineSearch}">
          </div>

          <div class="filters-group">
            <select class="form-select filter-select" id="pipe-service-filter" style="width: auto; padding: 0.35rem 0.75rem; font-size: 0.76rem; border-radius: var(--radius-pill);">
              <option value="all" ${state.pipelineServiceFilter === 'all' ? 'selected' : ''}>All Service Lines</option>
              ${serviceLines.map(sl => `
                <option value="${sl.id}" ${state.pipelineServiceFilter === sl.id ? 'selected' : ''}>${sl.icon} ${sl.name}</option>
              `).join('')}
            </select>

            <select class="form-select filter-select" id="pipe-flag-filter" style="width: auto; padding: 0.35rem 0.75rem; font-size: 0.76rem; border-radius: var(--radius-pill);">
              <option value="all" ${state.pipelineFlagFilter === 'all' ? 'selected' : ''}>All Status Flags</option>
              ${flags.map(f => `
                <option value="${f.id}" ${state.pipelineFlagFilter === f.id ? 'selected' : ''}>${f.name}</option>
              `).join('')}
            </select>

            <select class="form-select filter-select" id="pipe-sla-filter" style="width: auto; padding: 0.35rem 0.75rem; font-size: 0.76rem; border-radius: var(--radius-pill);">
              <option value="all" ${state.pipelineSlaFilter === 'all' ? 'selected' : ''}>All SLA States</option>
              <option value="promise-risk" ${state.pipelineSlaFilter === 'promise-risk' ? 'selected' : ''}>⚠️ SLA Warnings & Breaches</option>
              <option value="overdue" ${state.pipelineSlaFilter === 'overdue' ? 'selected' : ''}>⏰ Overdue Actions</option>
              <option value="missing-cf" ${state.pipelineSlaFilter === 'missing-cf' ? 'selected' : ''}>⚠️ Missing CF Customer ID</option>
            </select>
          </div>
        </div>

        <!-- View Switcher (Board vs Table vs Rules) -->
        <div class="view-tabs" style="align-self: center;">
          <button class="tab-btn ${currentPipelineViewMode === 'board' ? 'active' : ''}" id="btn-view-board">
            <span>📋 Board</span>
          </button>
          <button class="tab-btn ${currentPipelineViewMode === 'table' ? 'active' : ''}" id="btn-view-table">
            <span>📊 Table (${filteredCards.length})</span>
          </button>
          <button class="tab-btn ${currentPipelineViewMode === 'rules' ? 'active' : ''}" id="btn-view-rules">
            <span>📌 Rules & SLAs</span>
          </button>
        </div>
      </div>

      <!-- Main Dynamic Content Container -->
      <div id="pipeline-content-area">
        ${renderPipelineContent(currentPipelineViewMode, stages, filteredCards, rules, stats)}
      </div>

    </div>
  `;

  // Attach Event Listeners
  attachPipelineViewListeners(container);
}

function renderPipelineContent(viewMode, stages, cards, rules, stats) {
  if (viewMode === 'board') {
    return renderBoardKanban(stages, cards, stats);
  } else if (viewMode === 'table') {
    return renderDealsTable(stages, cards);
  } else if (viewMode === 'rules') {
    return renderRulesGuideView(rules);
  }
  return renderBoardKanban(stages, cards, stats);
}

function renderBoardKanban(stages, cards, stats) {
  return `
    <div class="pipeline-board-scrollable">
      <div class="pipeline-board">
        ${stages.map(stage => {
          const stageCards = cards.filter(c => c.stage === stage.id);
          const stageVal = stageCards.reduce((acc, c) => acc + (Number(c.estimateValue) || 0), 0);

          return `
            <div class="pipeline-col" data-stage-id="${stage.id}">
              
              <!-- Column Header -->
              <div class="pipeline-col-header" style="border-top: 3px solid ${stage.color};">
                <div class="pipeline-col-header-top">
                  <span class="pipeline-col-title" style="color: ${stage.color};">
                    ${stage.name}
                  </span>
                  <span class="kanban-count-pill">${stageCards.length}</span>
                </div>

                <div class="pipeline-col-meta">
                  <span class="pipeline-col-val">$${stageVal.toLocaleString()}</span>
                  ${stage.hardPromise ? `<span class="pipeline-col-sla-pill" title="${stage.hardPromise}">⏱️ SLA</span>` : ''}
                </div>

                <div class="pipeline-col-exit-tip" title="Exit Condition: ${stage.exitCondition}">
                  <strong>Exit:</strong> ${stage.exitCondition}
                </div>
              </div>

              <!-- Column Cards List -->
              <div class="pipeline-cards-list" data-stage-id="${stage.id}">
                ${stageCards.length === 0 ? `
                  <div class="pipeline-empty-col">
                    No deals in ${stage.shortTitle}
                  </div>
                ` : stageCards.map(card => renderPipelineCardTile(card, stage)).join('')}
              </div>

              <!-- Quick Add Card to Stage Footer -->
              <div class="pipeline-col-footer">
                <button class="btn btn-outline btn-sm quick-add-to-stage-btn" data-stage-id="${stage.id}" style="width: 100%; font-size: 0.72rem; padding: 0.25rem;">
                  + Add Card
                </button>
              </div>

            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderPipelineCardTile(card, stage) {
  const sla = state.calculateCardSLA(card);
  const serviceLines = state.getServiceLines();
  const serviceLine = serviceLines.find(s => s.id === card.serviceLine) || serviceLines[0];

  let dueDateDisplay = '';
  if (card.due) {
    const dueObj = new Date(card.due);
    const dateStr = dueObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (sla.isOverdue) {
      dueDateDisplay = `<span class="card-due-tag due-overdue">⏰ ${dateStr} (Overdue)</span>`;
    } else {
      dueDateDisplay = `<span class="card-due-tag due-ontrack">🎯 Due: ${dateStr}</span>`;
    }
  }

  return `
    <div class="pipeline-card-tile ${sla.isHardPromiseBreach ? 'border-breach' : (sla.isHardPromiseWarning ? 'border-warn' : '')}" data-card-id="${card.id}">
      
      <!-- Top Service & Flags -->
      <div class="tile-top-row">
        <span class="service-pill" style="background: ${serviceLine.bg}; color: ${serviceLine.color}; border: 1px solid ${serviceLine.color}40;">
          ${serviceLine.icon} ${serviceLine.name}
        </span>
        <span class="tile-estimate-val">$${(Number(card.estimateValue) || 0).toLocaleString()}</span>
      </div>

      <!-- Card Title (Service — Last Name — Street) -->
      <h4 class="tile-title" title="${card.title}">
        ${card.title}
      </h4>

      <!-- Next Action Deadline / Description -->
      ${card.nextAction ? `
        <div class="tile-next-action" title="${card.nextAction}">
          <span class="next-action-icon">👉</span>
          <span class="next-action-text">${card.nextAction}</span>
        </div>
      ` : ''}

      <!-- SLA Hard Promise Banner if triggered -->
      ${sla.slaMessage ? `
        <div class="tile-sla-banner ${sla.slaState}">
          ${sla.slaMessage}
        </div>
      ` : ''}

      <!-- Contractor Foreman ID Status -->
      ${sla.isMissingCfId ? `
        <div class="tile-cf-missing-alert">
          ⚠️ Missing CF Customer ID (Required at Stage 5+)
        </div>
      ` : (card.cfCustomerId ? `
        <div class="tile-cf-tag">
          🏢 CF: <strong>${card.cfCustomerId}</strong>
        </div>
      ` : '')}

      <!-- Status Flags -->
      ${card.labels && card.labels.length > 0 ? `
        <div class="tile-flags-row">
          ${card.labels.map(lblId => {
            const flag = STATUS_FLAGS.find(f => f.id === lblId);
            if (!flag) return '';
            return `<span class="flag-chip" style="color: ${flag.color}; background: ${flag.bg};">${flag.name}</span>`;
          }).join('')}
        </div>
      ` : ''}

      <!-- Card Footer -->
      <div class="tile-footer-row">
        ${dueDateDisplay || `<span style="font-size: 0.68rem; color: var(--text-muted);">No deadline set</span>`}
        
        <div class="tile-actions-quick">
          <button class="btn btn-outline btn-sm quick-stage-move-btn" data-card-id="${card.id}" title="Advance Stage" style="padding: 0.15rem 0.4rem; font-size: 0.68rem;">
            Advance →
          </button>
        </div>
      </div>

    </div>
  `;
}

function renderDealsTable(stages, cards) {
  return `
    <div class="table-responsive" style="background: var(--bg-card); border-radius: var(--radius-lg); padding: 0.5rem;">
      <table class="data-table">
        <thead>
          <tr>
            <th>Deal Title / Property</th>
            <th>Stage</th>
            <th>Service Line</th>
            <th>Estimate Value</th>
            <th>Next Action Deadline</th>
            <th>SLA Status</th>
            <th>CF Customer ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${cards.length === 0 ? `
            <tr>
              <td colspan="8" style="text-align: center; padding: 3rem; color: var(--text-muted);">
                No pipeline records found matching your filters.
              </td>
            </tr>
          ` : cards.map(card => {
            const stage = stages.find(s => s.id === card.stage) || stages[0];
            const sla = state.calculateCardSLA(card);
            const serviceLines = state.getServiceLines();
            const serviceLine = serviceLines.find(s => s.id === card.serviceLine) || serviceLines[0];

            return `
              <tr class="table-deal-row" data-card-id="${card.id}" style="cursor: pointer;">
                <td>
                  <div style="font-weight: 700; color: var(--text-primary); font-size: 0.88rem;">${card.title}</div>
                  <div style="font-size: 0.72rem; color: var(--text-secondary);">${card.address || 'No address set'}</div>
                  ${card.phone ? `<div style="font-size: 0.7rem; color: var(--accent-sky); margin-top: 2px;">📞 ${card.phone} · ✉️ ${card.email || ''}</div>` : ''}
                </td>
                <td>
                  <span class="badge" style="background: ${stage.color}20; color: ${stage.color}; border: 1px solid ${stage.color}40;">
                    ${stage.name}
                  </span>
                </td>
                <td>
                  <span class="service-pill" style="background: ${serviceLine.bg}; color: ${serviceLine.color};">
                    ${serviceLine.icon} ${serviceLine.name}
                  </span>
                </td>
                <td>
                  <span style="font-family: var(--font-mono); font-weight: 800; color: #38bdf8; font-size: 0.92rem;">
                    $${(Number(card.estimateValue) || 0).toLocaleString()}
                  </span>
                </td>
                <td>
                  <div style="font-size: 0.78rem; font-weight: 600; color: ${sla.isOverdue ? '#ef4444' : 'var(--text-primary)'};">
                    ${card.due ? new Date(card.due).toLocaleDateString() : '—'}
                  </div>
                  <div style="font-size: 0.72rem; color: var(--text-muted); max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    ${card.nextAction || 'No action defined'}
                  </div>
                </td>
                <td>
                  ${sla.isHardPromiseBreach ? `
                    <span class="badge badge-blocked" style="font-size: 0.68rem;">⚠️ Breach: ${sla.slaMessage}</span>
                  ` : (sla.isHardPromiseWarning ? `
                    <span class="badge badge-atrisk" style="font-size: 0.68rem;">${sla.slaMessage}</span>
                  ` : `
                    <span class="badge badge-ontrack" style="font-size: 0.68rem;">${sla.slaMessage || 'On Track'}</span>
                  `)}
                </td>
                <td>
                  ${sla.isMissingCfId ? `
                    <span class="badge badge-blocked" style="font-size: 0.68rem;">Missing ID</span>
                  ` : (card.cfCustomerId ? `
                    <span style="font-family: var(--font-mono); font-size: 0.76rem; color: var(--accent-sky); font-weight: 600;">${card.cfCustomerId}</span>
                  ` : '<span style="color: var(--text-muted); font-size: 0.72rem;">N/A (Pre-Stage 5)</span>')}
                </td>
                <td>
                  <button class="btn btn-outline btn-sm open-card-btn" data-card-id="${card.id}" style="padding: 0.25rem 0.55rem; font-size: 0.72rem;">
                    Open Deal →
                  </button>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderRulesGuideView(rules) {
  return `
    <div class="rules-view-container animate-fade-in">
      <div style="margin-bottom: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.4rem;">
          📌 KLR Build Operations — Rules, Conventions & SLA Architecture
        </h3>
        <p style="font-size: 0.8rem; color: var(--text-secondary);">
          Standard operating rules directly embedded from the KLR Build Operations Trello Board. All team members and automations adhere strictly to these phase gates.
        </p>
      </div>

      <div class="rules-cards-grid">
        ${rules.map(r => `
          <div class="rule-guide-card">
            <div class="rule-guide-header">
              <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--accent-sky); margin-bottom: 0.25rem;">
                ${r.title}
              </h4>
              <p style="font-size: 0.74rem; color: var(--text-muted);">
                ${r.shortSummary}
              </p>
            </div>
            <div class="rule-guide-body">
              <div class="report-markdown-preview" style="max-height: 280px; font-size: 0.76rem; line-height: 1.55;">${r.content}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function attachPipelineViewListeners(container) {
  // Search input
  const searchInput = container.querySelector('#pipeline-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.setPipelineSearch(e.target.value);
    });
  }

  // Filter selects
  const serviceFilter = container.querySelector('#pipe-service-filter');
  if (serviceFilter) {
    serviceFilter.addEventListener('change', (e) => {
      state.setPipelineServiceFilter(e.target.value);
    });
  }

  const flagFilter = container.querySelector('#pipe-flag-filter');
  if (flagFilter) {
    flagFilter.addEventListener('change', (e) => {
      state.setPipelineFlagFilter(e.target.value);
    });
  }

  const slaFilter = container.querySelector('#pipe-sla-filter');
  if (slaFilter) {
    slaFilter.addEventListener('change', (e) => {
      state.setPipelineSlaFilter(e.target.value);
    });
  }

  // View Switcher Buttons
  const btnBoard = container.querySelector('#btn-view-board');
  const btnTable = container.querySelector('#btn-view-table');
  const btnRules = container.querySelector('#btn-view-rules');

  if (btnBoard) {
    btnBoard.addEventListener('click', () => {
      currentPipelineViewMode = 'board';
      renderPipelineView(container);
    });
  }
  if (btnTable) {
    btnTable.addEventListener('click', () => {
      currentPipelineViewMode = 'table';
      renderPipelineView(container);
    });
  }
  if (btnRules) {
    btnRules.addEventListener('click', () => {
      currentPipelineViewMode = 'rules';
      renderPipelineView(container);
    });
  }

  const quickRulesBtn = container.querySelector('#btn-pipeline-rules-quick');
  if (quickRulesBtn) {
    quickRulesBtn.addEventListener('click', () => {
      currentPipelineViewMode = 'rules';
      renderPipelineView(container);
    });
  }

  // Header Actions
  const newDealBtn = container.querySelector('#btn-new-pipeline-deal');
  if (newDealBtn) {
    newDealBtn.addEventListener('click', () => {
      openNewPipelineCardModal();
    });
  }

  const mondayReviewBtn = container.querySelector('#btn-monday-review');
  if (mondayReviewBtn) {
    mondayReviewBtn.addEventListener('click', () => {
      openMondayReviewModal();
    });
  }

  const importTrelloBtn = container.querySelector('#btn-import-trello-json');
  if (importTrelloBtn) {
    importTrelloBtn.addEventListener('click', () => {
      openImportTrelloModal();
    });
  }

  const fetchCfLeadsBtn = container.querySelector('#btn-fetch-cf-leads');
  if (fetchCfLeadsBtn) {
    fetchCfLeadsBtn.addEventListener('click', async () => {
      const originalText = fetchCfLeadsBtn.innerHTML;
      fetchCfLeadsBtn.innerHTML = '⏳ Fetching...';
      const result = await state.fetchContractorForemanLeads();
      if (result.success) {
        if (result.added > 0) {
          fetchCfLeadsBtn.innerHTML = `✓ Added ${result.added} Leads`;
        } else {
          fetchCfLeadsBtn.innerHTML = `✓ No New Leads`;
        }
      } else {
        fetchCfLeadsBtn.innerHTML = `⚠️ Fetch Failed`;
      }
      setTimeout(() => {
        fetchCfLeadsBtn.innerHTML = originalText;
      }, 3000);
    });
  }

  // Card Tile Click (Open Modal)
  container.querySelectorAll('.pipeline-card-tile').forEach(tile => {
    tile.addEventListener('click', (e) => {
      if (e.target.closest('.quick-stage-move-btn')) return;
      openPipelineCardModal(tile.dataset.cardId);
    });
  });

  // Table Row Click
  container.querySelectorAll('.table-deal-row').forEach(row => {
    row.addEventListener('click', (e) => {
      openPipelineCardModal(row.dataset.cardId);
    });
  });

  // Quick Advance Stage Button
  container.querySelectorAll('.quick-stage-move-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const cardId = btn.dataset.cardId;
      const card = state.getPipelineCard(cardId);
      if (!card) return;

      const stages = state.getPipelineStages();
      const currentIndex = stages.findIndex(s => s.id === card.stage);
      if (currentIndex >= 0 && currentIndex < stages.length - 2) {
        const nextStage = stages[currentIndex + 1];
        state.moveCardStage(card.id, nextStage.id);
      } else {
        openPipelineCardModal(card.id);
      }
    });
  });

  // Quick Add to Stage Button
  container.querySelectorAll('.quick-add-to-stage-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const stageId = btn.dataset.stageId;
      openNewPipelineCardModal(stageId);
    });
  });
}

function openImportTrelloModal() {
  const modalOverlay = document.getElementById('global-modal-overlay');
  const modalContainer = document.getElementById('global-modal-content');
  if (!modalOverlay || !modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-header">
      <h3 class="modal-title">📥 Import / Sync Trello Board (JSON or CSV)</h3>
      <button class="modal-close-btn" id="modal-close-x">✕</button>
    </div>

    <div class="modal-body">
      <p style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 1rem;">
        Paste a complete JSON or CSV export from your Trello board to instantly synchronize all pipeline lists, cards, custom fields, and checklist states.
      </p>

      <div class="form-group">
        <label class="form-label">Trello JSON or CSV Payload</label>
        <textarea class="form-textarea" id="trello-json-input" rows="9" placeholder='Paste Trello JSON or CSV export here' style="font-family: var(--font-mono); font-size: 0.75rem;"></textarea>
      </div>

      <div id="trello-import-status" style="font-size: 0.76rem; margin-top: 0.5rem;"></div>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-outline" id="modal-cancel-btn">Cancel</button>
      <button type="button" class="btn btn-primary" id="btn-submit-trello-import">Parse & Sync Pipeline</button>
    </div>
  `;

  modalOverlay.classList.add('active');

  const close = () => modalOverlay.classList.remove('active');
  modalContainer.querySelector('#modal-close-x').addEventListener('click', close);
  modalContainer.querySelector('#modal-cancel-btn').addEventListener('click', close);

  modalContainer.querySelector('#btn-submit-trello-import').addEventListener('click', () => {
    const rawJson = modalContainer.querySelector('#trello-json-input').value.trim();
    const statusDiv = modalContainer.querySelector('#trello-import-status');

    if (!rawJson) {
      statusDiv.innerHTML = '<span style="color: var(--status-blocked);">Please paste valid Trello JSON.</span>';
      return;
    }

    const result = state.importTrelloBoard(rawJson);
    if (result.success) {
      statusDiv.innerHTML = `<span style="color: var(--status-ontrack);">✓ Successfully synchronized ${result.count} pipeline cards from Trello!</span>`;
      setTimeout(() => {
        close();
      }, 1200);
    } else {
      statusDiv.innerHTML = `<span style="color: var(--status-blocked);">⚠️ Import failed: ${result.error}</span>`;
    }
  });
}
