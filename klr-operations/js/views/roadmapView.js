/**
 * Roadmap & Gantt Schedule View
 */

import { state } from '../state.js';
import { openProjectModal } from './projectModal.js';

export function renderRoadmap(container) {
  const projects = state.getFilteredProjects();
  const months = ['Jun 2026', 'Jul 2026', 'Aug 2026', 'Sep 2026', 'Oct 2026', 'Nov 2026'];
  const baseStart = new Date('2026-06-01').getTime();
  const baseEnd = new Date('2026-11-30').getTime();
  const totalDuration = baseEnd - baseStart;

  container.innerHTML = `
    <div class="roadmap-container animate-fade-in">
      <div class="roadmap-header">
        <div>
          <h2 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.2rem;">
            Strategic Initiatives Roadmap (H2 2026)
          </h2>
          <p style="font-size: 0.78rem; color: var(--text-secondary);">
            Multi-project milestone schedules, duration spans, and cross-operational dependencies.
          </p>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <span style="font-size: 0.74rem; color: var(--text-muted);">Current Date:</span>
          <span class="badge badge-completed" style="font-family: var(--font-mono);">Aug 2026 (Live Ops)</span>
        </div>
      </div>

      <!-- Months Header Bar -->
      <div class="timeline-row" style="border-bottom: 2px solid var(--border-medium); padding-bottom: 0.75rem;">
        <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em;">
          Initiative / Owner
        </div>
        <div style="display: grid; grid-template-columns: repeat(6, 1fr); text-align: center;">
          ${months.map(m => `<div class="month-label">${m}</div>`).join('')}
        </div>
      </div>

      <!-- Project Rows -->
      ${projects.length === 0 ? `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          No initiatives match current filters.
        </div>
      ` : projects.map(p => {
        // Calculate start and end percentages
        const pStart = p.startDate ? new Date(p.startDate).getTime() : baseStart;
        const pEnd = p.targetDate ? new Date(p.targetDate).getTime() : baseEnd;
        
        let leftPercent = Math.max(0, Math.min(100, ((pStart - baseStart) / totalDuration) * 100));
        let widthPercent = Math.max(12, Math.min(100 - leftPercent, ((pEnd - pStart) / totalDuration) * 100));

        let barColor = 'linear-gradient(90deg, #0284c7, #06b6d4)';
        if (p.category === 'digital') barColor = 'linear-gradient(90deg, #db2777, #f472b6)';
        if (p.category === 'ai') barColor = 'linear-gradient(90deg, #059669, #34d399)';
        if (p.category === 'data') barColor = 'linear-gradient(90deg, #d97706, #fbbf24)';

        return `
          <div class="timeline-row" data-project-id="${p.id}" style="cursor: pointer;">
            <div class="timeline-project-info">
              <div class="timeline-project-name">${p.title}</div>
              <div style="font-size: 0.72rem; color: var(--text-muted); display: flex; gap: 0.4rem; align-items: center;">
                <span class="category-tag" data-cat="${p.category}">${p.categoryLabel}</span>
                <span>• ${p.progress}% done</span>
              </div>
            </div>

            <div class="timeline-track-area">
              <!-- Current Date Indicator (Approx August) -->
              <div style="position: absolute; left: 45%; top: 0; bottom: 0; width: 2px; background: rgba(56, 189, 248, 0.4); z-index: 1;" title="Today"></div>

              <div class="timeline-bar" style="left: ${leftPercent}%; width: ${widthPercent}%; background: ${barColor};" title="${p.title} (${p.progress}%)">
                <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                  ${p.title} • Target: ${p.targetDate}
                </span>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  // Row click listener to open project drawer
  container.querySelectorAll('.timeline-row[data-project-id]').forEach(row => {
    row.addEventListener('click', () => {
      openProjectModal(row.dataset.projectId);
    });
  });
}
