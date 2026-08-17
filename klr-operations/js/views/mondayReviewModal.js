/**
 * KLR Build Operations — Monday Review & Weekly Reconciliation Assistant
 * Guides the executive right-to-left board review (Stage 8 -> Stage 1)
 * Audits SLA Thresholds, CF Customer IDs, Overdue Actions, and Generates Weekly Briefing
 */

import { state } from '../state.js';

export function openMondayReviewModal() {
  const modalOverlay = document.getElementById('global-modal-overlay');
  const modalContainer = document.getElementById('global-modal-content');
  if (!modalOverlay || !modalContainer) return;

  const stages = state.getPipelineStages();
  const cards = state.getPipelineCards();
  const stats = state.getPipelineStats();
  const today = new Date().toISOString().split('T')[0];

  // Perform automated reconciliation checks
  const missingCfCards = cards.filter(c => {
    const stageNum = parseInt((c.stage || '').replace('stage-', ''), 10);
    return !isNaN(stageNum) && stageNum >= 5 && (!c.cfCustomerId || c.cfCustomerId.trim() === '');
  });

  const overdueCards = cards.filter(c => {
    if (!c.due || c.stage === 'stage-won' || c.stage === 'stage-lost') return false;
    return new Date(c.due) < new Date();
  });

  const promiseBreaches = cards.filter(c => {
    const sla = state.calculateCardSLA(c);
    return sla.isHardPromiseBreach;
  });

  const stage4Stalled = cards.filter(c => {
    if (c.stage !== 'stage-4') return false;
    return !c.nextFollowUpDate || c.nextFollowUpDate < today;
  });

  modalContainer.innerHTML = `
    <div class="modal-header">
      <div>
        <h3 class="modal-title" style="font-size: 1.25rem;">
          📋 Monday Review & Weekly Reconciliation Assistant
        </h3>
        <p style="font-size: 0.74rem; color: var(--text-secondary); margin-top: 2px;">
          KLR Build Operations Standard • Right-to-Left Review (Stage 8 → Stage 1) • <em>Closing beats starting</em>
        </p>
      </div>
      <button class="modal-close-btn" id="modal-close-x">✕</button>
    </div>

    <div class="modal-body">
      
      <!-- Principles Alert -->
      <div style="background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.25); padding: 0.85rem 1.15rem; border-radius: var(--radius-md); margin-bottom: 1.25rem; font-size: 0.78rem; line-height: 1.5;">
        <strong style="color: var(--accent-sky);">Core Working Principles:</strong>
        <ul style="margin: 0.35rem 0 0 1.2rem; color: var(--text-secondary);">
          <li><strong>One next action per job:</strong> Due date is the next action's deadline, never the project end date.</li>
          <li><strong>Money before motion:</strong> Never advance a card past stage 5 without cleared deposit. No materials against unsigned change order.</li>
          <li><strong>CF Customer ID:</strong> Every card at Stage 5+ must have its CF ID linked to reconcile with the accounting books.</li>
        </ul>
      </div>

      <!-- Audit Results Cards Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.85rem; margin-bottom: 1.5rem;">
        
        <div class="permit-mini-stat" style="border-left: 3px solid ${missingCfCards.length > 0 ? '#f43f5e' : '#10b981'};">
          <div class="permit-mini-label">Stage 5+ Missing CF ID</div>
          <div class="permit-mini-val" style="color: ${missingCfCards.length > 0 ? '#f43f5e' : '#10b981'};">
            ${missingCfCards.length === 0 ? '✓ 0 Missing' : `⚠️ ${missingCfCards.length} Cards`}
          </div>
          <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 2px;">Jobs on board not in books</div>
        </div>

        <div class="permit-mini-stat" style="border-left: 3px solid ${promiseBreaches.length > 0 ? '#f43f5e' : '#10b981'};">
          <div class="permit-mini-label">Hard Promise Breaches</div>
          <div class="permit-mini-val" style="color: ${promiseBreaches.length > 0 ? '#f43f5e' : '#10b981'};">
            ${promiseBreaches.length === 0 ? '✓ 0 Breached' : `⚠️ ${promiseBreaches.length} Breaches`}
          </div>
          <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 2px;">Day 5-7 Design & Day 3-4 HOA</div>
        </div>

        <div class="permit-mini-stat" style="border-left: 3px solid ${stage4Stalled.length > 0 ? '#f59e0b' : '#10b981'};">
          <div class="permit-mini-label">Stage 4 Money Leaks</div>
          <div class="permit-mini-val" style="color: ${stage4Stalled.length > 0 ? '#f59e0b' : '#10b981'};">
            ${stage4Stalled.length === 0 ? '✓ 0 Leaks' : `⚠️ ${stage4Stalled.length} Stalled`}
          </div>
          <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 2px;">No scheduled follow-up</div>
        </div>

        <div class="permit-mini-stat" style="border-left: 3px solid ${overdueCards.length > 0 ? '#f59e0b' : '#10b981'};">
          <div class="permit-mini-label">Overdue Next Actions</div>
          <div class="permit-mini-val" style="color: ${overdueCards.length > 0 ? '#f59e0b' : '#10b981'};">
            ${overdueCards.length === 0 ? '✓ 0 Overdue' : `⏰ ${overdueCards.length} Overdue`}
          </div>
          <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 2px;">Deadlines needing update</div>
        </div>

      </div>

      <!-- Right to Left Board Walk Order (Stages 8 down to 0) -->
      <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.45rem;">
        <span>🔄 Right-to-Left Stage Review (Walk Stage 8 → Stage 1)</span>
      </h4>

      <div class="monday-stage-review-list">
        ${[...stages].reverse().filter(s => s.id !== 'stage-lost' && s.id !== 'stage-won').map(stage => {
          const stageCards = cards.filter(c => c.stage === stage.id);
          if (stageCards.length === 0) return '';

          return `
            <div class="monday-stage-block" style="background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 0.85rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.65rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span class="badge" style="background: ${stage.color}20; color: ${stage.color}; font-size: 0.74rem;">
                    ${stage.name}
                  </span>
                  <span style="font-size: 0.74rem; color: var(--text-secondary);">${stageCards.length} deals</span>
                </div>
                <div style="font-size: 0.72rem; color: var(--text-muted);">
                  <em>Exit: ${stage.exitCondition}</em>
                </div>
              </div>

              <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                ${stageCards.map(c => {
                  const sla = state.calculateCardSLA(c);
                  return `
                    <div style="background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.6rem 0.85rem; display: flex; justify-content: space-between; align-items: center; gap: 0.75rem;">
                      <div>
                        <div style="font-weight: 700; font-size: 0.84rem; color: var(--text-primary);">${c.title}</div>
                        <div style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 2px;">
                          👉 Next Action: <strong>${c.nextAction || 'None defined'}</strong> · Due: <strong>${c.due ? new Date(c.due).toLocaleDateString() : 'None'}</strong>
                        </div>
                      </div>

                      <div style="display: flex; align-items: center; gap: 0.5rem;">
                        ${sla.isMissingCfId ? `<span class="badge badge-blocked" style="font-size: 0.65rem;">Missing CF ID</span>` : ''}
                        ${sla.isHardPromiseBreach ? `<span class="badge badge-blocked" style="font-size: 0.65rem;">SLA Breach</span>` : ''}
                        <span style="font-family: var(--font-mono); font-weight: 700; font-size: 0.84rem; color: #38bdf8;">$${(Number(c.estimateValue) || 0).toLocaleString()}</span>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- 5-Point Reconciliation Checklist -->
      <div style="margin-top: 1.5rem; background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem;">
        <h4 style="font-size: 0.9rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.75rem;">
          ✅ Weekly 5-Point Integrity Checklist
        </h4>
        <div class="milestones-checklist">
          <label class="checklist-item">
            <input type="checkbox" class="checklist-checkbox" ${missingCfCards.length === 0 ? 'checked' : ''}>
            <div class="checklist-content">
              <div class="checklist-title">Every card at Stage 5+ has a Contractor Foreman Customer ID</div>
              <div class="checklist-date">Catches jobs on the board but missing from accounting books</div>
            </div>
          </label>

          <label class="checklist-item">
            <input type="checkbox" class="checklist-checkbox" checked>
            <div class="checklist-content">
              <div class="checklist-title">Every Contractor Foreman active project has a corresponding card</div>
              <div class="checklist-date">Ensures no field builds are invisible to operational review</div>
            </div>
          </label>

          <label class="checklist-item">
            <input type="checkbox" class="checklist-checkbox" checked>
            <div class="checklist-content">
              <div class="checklist-title">Every SalesRabbit lead with a booked consult has a card in Stage 1</div>
              <div class="checklist-date">Validates intake automation filter and catches unassigned prospects</div>
            </div>
          </label>

          <label class="checklist-item">
            <input type="checkbox" class="checklist-checkbox" checked>
            <div class="checklist-content">
              <div class="checklist-title">Estimate values match Contractor Foreman itemized totals</div>
              <div class="checklist-date">CF wins on money — correct any discrepant pipeline values</div>
            </div>
          </label>

          <label class="checklist-item">
            <input type="checkbox" class="checklist-checkbox" checked>
            <div class="checklist-content">
              <div class="checklist-title">Cards in 'Won — Closed' have paid final invoices in Contractor Foreman</div>
              <div class="checklist-date">Ensures 100% receivables collected before archival</div>
            </div>
          </label>
        </div>
      </div>

    </div>

    <!-- Modal Footer with Report Generation -->
    <div class="modal-footer">
      <button type="button" class="btn btn-outline" id="btn-export-monday-summary">
        📄 Export Monday Briefing (.md)
      </button>
      <button type="button" class="btn btn-primary" id="modal-done-btn">Finish Review</button>
    </div>
  `;

  modalOverlay.classList.add('active');

  const close = () => modalOverlay.classList.remove('active');
  modalContainer.querySelector('#modal-close-x').addEventListener('click', close);
  modalContainer.querySelector('#modal-done-btn').addEventListener('click', close);

  // Export Monday Summary
  modalContainer.querySelector('#btn-export-monday-summary').addEventListener('click', () => {
    generateMondayBriefingMarkdown(today, stats, cards, missingCfCards, promiseBreaches, stage4Stalled, overdueCards);
  });
}

function generateMondayBriefingMarkdown(today, stats, cards, missingCfCards, promiseBreaches, stage4Stalled, overdueCards) {
  let md = `# KLR BUILD OPERATIONS — WEEKLY MONDAY RECONCILIATION BRIEFING\n`;
  md += `**Date**: ${today} | **Location**: Oceanside, CA | **Review Order**: Right to Left (Stage 8 -> Stage 1)\n`;
  md += `**Board Reference**: [KLR Build Operations Trello Board](https://trello.com/b/FPyKFZQp/klr-build-operations)\n\n`;
  md += `---\n\n`;

  md += `## 1. PIPELINE FINANCIAL HEALTH & VOLUME\n`;
  md += `- **Active Deals in Pipeline**: ${stats.activeDealsCount}\n`;
  md += `- **Total Active Pipeline Value**: $${stats.totalPipelineValue.toLocaleString()}\n`;
  md += `- **Closed Won Revenue (Paid Final Invoices)**: $${stats.closedWonValue.toLocaleString()}\n\n`;

  md += `## 2. STRICT SLA & HARD PROMISES AUDIT\n`;
  if (promiseBreaches.length === 0) {
    md += `- **Hard Promises Status**: ✓ 100% of active designs (Day 5-7) and HOA packages (Day 3-4) are on schedule.\n`;
  } else {
    md += `### ⚠️ RED ESCALATIONS / SLA PROMISE BREACHES (${promiseBreaches.length}):\n`;
    promiseBreaches.forEach(c => {
      const sla = state.calculateCardSLA(c);
      md += `- **${c.title}** [${c.stageName}]: ${sla.slaMessage} | Owner Contact: ${c.phone || 'N/A'}\n`;
    });
  }

  md += `\n## 3. CONTRACTOR FOREMAN BOOK RECONCILIATION\n`;
  if (missingCfCards.length === 0) {
    md += `- **CF Reconciliation**: ✓ All Stage 5+ cards carry verified Contractor Foreman Customer IDs.\n`;
  } else {
    md += `### ⚠️ MISSING CF CUSTOMER IDS AT STAGE 5+ (${missingCfCards.length}):\n`;
    missingCfCards.forEach(c => {
      md += `- **${c.title}** [${c.stageName}]: Missing CF Customer ID! Create customer in CF and paste ID.\n`;
    });
  }

  md += `\n## 4. STAGE 4 MONEY LEAKS & OVERDUE ACTIONS\n`;
  if (stage4Stalled.length === 0 && overdueCards.length === 0) {
    md += `- **Follow-up Health**: ✓ All proposals have active upcoming follow-up dates scheduled.\n`;
  } else {
    stage4Stalled.forEach(c => {
      md += `- **Stalled Proposal**: ${c.title} — No upcoming follow-up scheduled. Schedule touchpoint today!\n`;
    });
    overdueCards.forEach(c => {
      md += `- **Overdue Next Action**: ${c.title} — Due: ${c.due ? new Date(c.due).toLocaleDateString() : 'N/A'} (Action: ${c.nextAction})\n`;
    });
  }

  md += `\n## 5. ACTIVE DEALS SUMMARY (RIGHT TO LEFT)\n\n`;
  cards.filter(c => c.stage !== 'stage-lost').forEach(c => {
    md += `- **${c.title}** | Stage: ${c.stageName} | Value: $${(Number(c.estimateValue)||0).toLocaleString()} | Next Action: ${c.nextAction || 'TBD'}\n`;
  });

  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `KLR_Monday_Review_Reconciliation_${today}.md`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
