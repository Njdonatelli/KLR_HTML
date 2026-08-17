/**
 * Dashboard Overview View - High-level Executive KPIs & Project Cards Grid
 */

import { state } from '../state.js';
import { openProjectModal } from './projectModal.js';

export function renderDashboard(container) {
  const stats = state.getExecutiveStats();
  const projects = state.getFilteredProjects();

  container.innerHTML = `
    <!-- Top Executive KPIs Bar -->
    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-header">
          <span class="kpi-title">Active Initiatives</span>
          <div class="kpi-icon" style="color: var(--accent-sky);">📁</div>
        </div>
        <div class="kpi-value">${stats.total}</div>
        <div class="kpi-subtext">
          <span style="color: var(--status-ontrack);">● ${stats.onTrack} on track</span>
          <span>·</span>
          <span style="color: var(--status-atrisk);">● ${stats.atRisk} at risk</span>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-header">
          <span class="kpi-title">Milestone Velocity</span>
          <div class="kpi-icon" style="color: var(--status-ontrack);">⚡</div>
        </div>
        <div class="kpi-value">${stats.milestoneRate}%</div>
        <div class="kpi-subtext">
          <span>${stats.completedMilestones} of ${stats.totalMilestones} deliverables complete</span>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-header">
          <span class="kpi-title">Health Distribution</span>
          <div class="kpi-icon" style="color: var(--status-inreview);">📊</div>
        </div>
        <div class="kpi-value" style="font-size: 1.25rem; display: flex; gap: 0.5rem; align-items: center;">
          <span class="badge badge-ontrack">${stats.onTrack} On Track</span>
          <span class="badge badge-inreview">${stats.inReview} Review</span>
          <span class="badge badge-atrisk">${stats.atRisk} At Risk</span>
        </div>
        <div class="kpi-subtext">
          <span>${stats.blocked > 0 ? `<span style="color: var(--status-blocked);">⚠️ ${stats.blocked} blocked</span>` : 'Zero active blockers'}</span>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-header">
          <span class="kpi-title">Role Focus</span>
          <div class="kpi-icon" style="color: var(--accent-cyan);">🎯</div>
        </div>
        <div class="kpi-value" style="font-size: 1.15rem; font-family: var(--font-sans); font-weight: 700; color: var(--accent-sky);">
          Ops & Digital Assets
        </div>
        <div class="kpi-subtext">
          <span>KLR Build Operational Command</span>
        </div>
      </div>
    </div>

    <!-- Projects Grid Section -->
    ${projects.length === 0 ? `
      <div style="text-align: center; padding: 4rem 2rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border-subtle);">
        <p style="font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 1rem;">No initiatives match your current filter or search criteria.</p>
        <button class="btn btn-primary" id="btn-clear-search">Reset Filters</button>
      </div>
    ` : `
      <div class="projects-grid animate-fade-in">
        ${projects.map(p => renderProjectCard(p)).join('')}
      </div>
    `}
  `;

  // Attach event listeners to project cards
  container.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger if user clicked directly on a sub-action link
      if (e.target.closest('a') || e.target.closest('.checklist-checkbox')) return;
      const id = card.dataset.projectId;
      openProjectModal(id);
    });
  });

  // Attach quick milestone check toggles inside cards
  container.querySelectorAll('.card-milestone-check').forEach(box => {
    box.addEventListener('click', (e) => {
      e.stopPropagation();
      const projId = box.dataset.projId;
      const milestoneId = box.dataset.milestoneId;
      state.toggleMilestone(projId, milestoneId);
    });
  });

  const clearBtn = container.querySelector('#btn-clear-search');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      state.setFilter('all');
      state.setSearch('');
      const searchInput = document.getElementById('global-search');
      if (searchInput) searchInput.value = '';
    });
  }
}

function renderProjectCard(p) {
  const nextMilestone = p.milestones ? p.milestones.find(m => !m.completed) : null;
  const completedCount = p.milestones ? p.milestones.filter(m => m.completed).length : 0;
  const totalMilestones = p.milestones ? p.milestones.length : 0;

  // Format health badge
  let badgeClass = 'badge-ontrack';
  if (p.health === 'atrisk') badgeClass = 'badge-atrisk';
  if (p.health === 'blocked') badgeClass = 'badge-blocked';
  if (p.health === 'inreview') badgeClass = 'badge-inreview';
  if (p.health === 'completed') badgeClass = 'badge-completed';

  return `
    <div class="project-card" data-project-id="${p.id}">
      <div>
        <div class="card-top">
          <div class="card-title-group">
            <div style="display: flex; gap: 0.5rem; margin-bottom: 0.35rem; align-items: center;">
              <span class="category-tag" data-cat="${p.category}">${p.categoryLabel}</span>
              <span class="badge ${badgeClass}">
                <span class="badge-dot"></span>
                ${p.healthLabel}
              </span>
            </div>
            <h3 class="card-title">${p.title}</h3>
          </div>
        </div>

        <p class="card-desc">${p.description}</p>

        <!-- Progress Bar -->
        <div class="progress-section">
          <div class="progress-header">
            <span>Progress (${completedCount}/${totalMilestones} Milestones)</span>
            <span style="font-family: var(--font-mono); font-weight: 700; color: var(--accent-sky);">${p.progress}%</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width: ${p.progress}%;"></div>
          </div>
        </div>

        <!-- Next Immediate Milestone -->
        ${nextMilestone ? `
          <div class="card-next-milestone">
            <div class="milestone-label">Next Critical Deliverable</div>
            <div class="milestone-title" title="${nextMilestone.title}">
              <input type="checkbox" class="checklist-checkbox card-milestone-check" data-proj-id="${p.id}" data-milestone-id="${nextMilestone.id}" title="Mark completed">
              <span>${nextMilestone.title}</span>
            </div>
          </div>
        ` : `
          <div class="card-next-milestone" style="border-style: solid; border-color: rgba(16, 185, 129, 0.2); background: rgba(16, 185, 129, 0.05);">
            <div class="milestone-label" style="color: var(--status-ontrack);">Status</div>
            <div class="milestone-title" style="color: var(--status-ontrack);">
              ✓ All planned milestones completed!
            </div>
          </div>
        `}

        <!-- KPIs Grid snippet -->
        ${p.kpis && p.kpis.length > 0 ? `
          <div class="card-kpis">
            ${p.kpis.slice(0, 2).map(kpi => `
              <div class="card-kpi-item">
                <div class="card-kpi-name" title="${kpi.name}">${kpi.name}</div>
                <div class="card-kpi-value">${kpi.value}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>

      <div class="card-footer">
        <div class="card-target-date">
          <span>📅 Target: <strong>${p.targetDate || 'TBD'}</strong></span>
        </div>
        <span style="font-size: 0.76rem; font-weight: 600; color: var(--accent-sky); display: flex; align-items: center; gap: 0.25rem;">
          Open Workspace →
        </span>
      </div>
    </div>
  `;
}
