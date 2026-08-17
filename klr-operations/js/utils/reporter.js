/**
 * Executive Progress Briefing Generator (Markdown & Printable Output)
 */

import { state } from '../state.js';

export function openExecutiveReportModal() {
  const modalOverlay = document.getElementById('global-modal-overlay');
  const modalContainer = document.getElementById('global-modal-content');
  if (!modalOverlay || !modalContainer) return;

  const stats = state.getExecutiveStats();
  const projects = state.getProjects();
  const today = new Date().toISOString().split('T')[0];

  // Generate Executive Markdown Report
  let md = `# EXECUTIVE OPERATIONS & DIGITAL ASSETS STATUS BRIEFING\n`;
  md += `**Generated**: ${today} | **Prepared by**: Nick Donatelli (Operations & Digital Assets Specialist)\n`;
  md += `**Organization**: KLR Build Operational Command\n\n`;
  md += `---\n\n`;

  md += `## 1. PORTFOLIO HEALTH & EXECUTIVE SUMMARY\n`;
  md += `- **Active Initiatives**: ${stats.total}\n`;
  md += `- **Health Distribution**: 🟢 ${stats.onTrack} On Track | 🟣 ${stats.inReview} In Review | 🟡 ${stats.atRisk} At Risk | 🔴 ${stats.blocked} Blocked | 🔵 ${stats.completed} Completed\n`;
  md += `- **Milestone Deliverables Completion Rate**: ${stats.milestoneRate}% (${stats.completedMilestones} of ${stats.totalMilestones} deliverables completed)\n\n`;

  md += `## 2. STRATEGIC INITIATIVES BREAKDOWN\n\n`;

  projects.forEach((p, i) => {
    md += `### ${i + 1}. ${p.title} [${p.categoryLabel.toUpperCase()}]\n`;
    md += `- **Status**: ${p.healthLabel.toUpperCase()} (${p.progress}% Complete) | **Target Date**: ${p.targetDate}\n`;
    md += `- **Operational Owner**: ${p.owner}\n`;
    md += `- **Summary**: ${p.description}\n`;
    
    if (p.kpis && p.kpis.length > 0) {
      md += `- **Key Metrics**: ${p.kpis.map(k => `${k.name}: **${k.value}** (Target: ${k.target})`).join(' | ')}\n`;
    }

    if (p.milestones && p.milestones.length > 0) {
      const nextPending = p.milestones.find(m => !m.completed);
      const lastCompleted = [...p.milestones].reverse().find(m => m.completed);
      if (lastCompleted) {
        md += `- **Recent Accomplishment**: ✓ ${lastCompleted.title}\n`;
      }
      if (nextPending) {
        md += `- **Next Critical Milestone**: ⏳ ${nextPending.title} (Target: ${nextPending.targetDate})\n`;
      }
    }

    if (p.notes) {
      md += `- **Operational Notes**: ${p.notes}\n`;
    }
    md += `\n`;
  });

  md += `## 3. RISKS, AT-RISK ITEMS & MITIGATION ACTION PLAN\n`;
  const atRiskProjects = projects.filter(p => p.health === 'atrisk' || p.health === 'blocked');
  if (atRiskProjects.length === 0) {
    md += `- No critical blockers or at-risk initiatives currently flagged across operations.\n`;
  } else {
    atRiskProjects.forEach(p => {
      md += `- **${p.title}** (${p.healthLabel}): ${p.notes || 'Under review for schedule/resource adjustment.'}\n`;
    });
  }

  modalContainer.innerHTML = `
    <div class="modal-header">
      <h3 class="modal-title">📊 Executive Operations Progress Briefing</h3>
      <button class="modal-close-btn" id="modal-close-x">✕</button>
    </div>

    <div class="modal-body">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
        <p style="font-size: 0.78rem; color: var(--text-secondary);">
          Formatted executive status report ready for team circulation, leadership briefings, or weekly syncs.
        </p>
        <button class="btn btn-secondary btn-sm" id="btn-copy-report">
          📋 Copy Markdown
        </button>
      </div>

      <div class="report-markdown-preview" id="report-text-area">${md}</div>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-outline" id="btn-print-report">🖨️ Print / Save PDF</button>
      <button type="button" class="btn btn-primary" id="modal-done-btn">Done</button>
    </div>
  `;

  modalOverlay.classList.add('active');

  const close = () => modalOverlay.classList.remove('active');
  modalContainer.querySelector('#modal-close-x').addEventListener('click', close);
  modalContainer.querySelector('#modal-done-btn').addEventListener('click', close);

  // Copy button
  modalContainer.querySelector('#btn-copy-report').addEventListener('click', () => {
    navigator.clipboard.writeText(md).then(() => {
      const copyBtn = modalContainer.querySelector('#btn-copy-report');
      copyBtn.textContent = '✓ Copied to Clipboard!';
      setTimeout(() => { copyBtn.textContent = '📋 Copy Markdown'; }, 2500);
    });
  });

  // Print button
  modalContainer.querySelector('#btn-print-report').addEventListener('click', () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Executive Briefing - ${today}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; color: #111827; line-height: 1.6; }
            h1 { font-size: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; }
            h2 { font-size: 16px; margin-top: 24px; color: #1e293b; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; }
            h3 { font-size: 14px; margin-top: 16px; color: #0369a1; }
            ul, p { font-size: 13px; }
            hr { border: none; border-top: 1px solid #e5e7eb; margin: 16px 0; }
          </style>
        </head>
        <body>
          <pre style="font-family: inherit; white-space: pre-wrap;">${md}</pre>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  });
}
