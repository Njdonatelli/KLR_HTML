/**
 * Kanban Lifecycle Board View
 */

import { state } from '../state.js';
import { openProjectModal } from './projectModal.js';

export function renderKanban(container) {
  const projects = state.getFilteredProjects();

  const STAGES = [
    { id: 'discovery', title: '1. Discovery & Scoping', color: 'var(--text-secondary)' },
    { id: 'development', title: '2. Build & Configuration', color: 'var(--accent-sky)' },
    { id: 'testing', title: '3. Field QA & Pilot Testing', color: 'var(--status-atrisk)' },
    { id: 'live-ops', title: '4. Live Operations / Review', color: 'var(--status-inreview)' },
    { id: 'optimized', title: '5. Deployed & Optimized', color: 'var(--status-ontrack)' }
  ];

  container.innerHTML = `
    <div class="kanban-board animate-fade-in">
      ${STAGES.map(stage => {
        const stageProjects = projects.filter(p => (p.stage || 'development') === stage.id);

        return `
          <div class="kanban-column" data-stage-id="${stage.id}">
            <div class="kanban-col-header">
              <div class="kanban-col-title" style="color: ${stage.color};">
                <span>${stage.title}</span>
              </div>
              <span class="kanban-count-pill">${stageProjects.length}</span>
            </div>

            <div class="kanban-cards-list">
              ${stageProjects.length === 0 ? `
                <div style="font-size: 0.76rem; color: var(--text-muted); text-align: center; padding: 2rem 0.5rem; border: 1px dashed var(--border-subtle); border-radius: var(--radius-md);">
                  No initiatives in this stage
                </div>
              ` : stageProjects.map(p => `
                <div class="kanban-card" data-project-id="${p.id}">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <span class="category-tag" data-cat="${p.category}">${p.categoryLabel}</span>
                    <span class="badge badge-${p.health}">
                      <span class="badge-dot"></span>
                      ${p.healthLabel}
                    </span>
                  </div>

                  <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.4rem;">
                    ${p.title}
                  </h4>

                  <p style="font-size: 0.76rem; color: var(--text-secondary); margin-bottom: 0.75rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                    ${p.description}
                  </p>

                  <div class="progress-section" style="margin-bottom: 0.6rem;">
                    <div class="progress-header">
                      <span>Progress</span>
                      <span>${p.progress}%</span>
                    </div>
                    <div class="progress-track">
                      <div class="progress-fill" style="width: ${p.progress}%;"></div>
                    </div>
                  </div>

                  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.72rem; color: var(--text-muted);">
                    <span>🎯 ${p.targetDate}</span>
                    <span style="color: var(--accent-sky); font-weight: 600;">Details →</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  // Attach card click listeners
  container.querySelectorAll('.kanban-card').forEach(card => {
    card.addEventListener('click', () => {
      openProjectModal(card.dataset.projectId);
    });
  });
}
