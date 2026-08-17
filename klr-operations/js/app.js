/**
 * Main Application Orchestrator & Event Controller
 */

import { state } from './state.js';
import { renderDashboard } from './views/dashboardView.js';
import { renderPipelineView } from './views/pipelineView.js';
import { renderRoadmap } from './views/roadmapView.js';
import { renderKanban } from './views/kanbanView.js';
import { renderPermitsView } from './views/permitsView.js';
import { openNewProjectModal } from './views/projectModal.js';
import { openExecutiveReportModal } from './utils/reporter.js';
import { openDataSyncModal } from './utils/exportImport.js';

class AppController {
  constructor() {
    this.currentView = 'dashboard';
    this.viewContainer = document.getElementById('view-container');
    this.controlsToolbar = document.getElementById('controls-toolbar');
    
    this.init();
  }

  init() {
    this.bindHeaderNav();
    this.bindControls();
    this.bindGlobalActions();
    
    // Subscribe to state changes for auto-render
    state.subscribe(() => {
      this.renderCurrentView();
    });

    // Initial render
    this.renderCurrentView();

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const overlay = document.getElementById('global-modal-overlay');
        if (overlay && overlay.classList.contains('active')) {
          overlay.classList.remove('active');
        }
      }
    });

    // Close modal on outside click
    const overlay = document.getElementById('global-modal-overlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('active');
        }
      });
    }
  }

  bindHeaderNav() {
    const navButtons = document.querySelectorAll('.tab-btn[data-view]');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        this.switchView(view);
      });
    });
  }

  switchView(viewName) {
    this.currentView = viewName;
    
    // Update active tab UI
    document.querySelectorAll('.tab-btn[data-view]').forEach(btn => {
      if (btn.dataset.view === viewName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Hide or show the main project controls toolbar on dedicated pipeline/permits views
    if (this.controlsToolbar) {
      if (viewName === 'permits' || viewName === 'pipeline') {
        this.controlsToolbar.style.display = 'none';
      } else {
        this.controlsToolbar.style.display = 'flex';
      }
    }

    this.renderCurrentView();
  }

  renderCurrentView() {
    if (!this.viewContainer) return;

    switch (this.currentView) {
      case 'dashboard':
        renderDashboard(this.viewContainer);
        break;
      case 'pipeline':
        renderPipelineView(this.viewContainer);
        break;
      case 'roadmap':
        renderRoadmap(this.viewContainer);
        break;
      case 'kanban':
        renderKanban(this.viewContainer);
        break;
      case 'permits':
        renderPermitsView(this.viewContainer);
        break;
      default:
        renderDashboard(this.viewContainer);
    }
  }

  bindControls() {
    // Global search input
    const searchInput = document.getElementById('global-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.setSearch(e.target.value);
      });
    }

    // Category filter chips
    const filterChips = document.querySelectorAll('.filter-chip[data-category]');
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state.setFilter(chip.dataset.category);
      });
    });
  }

  bindGlobalActions() {
    // New Initiative button
    const addBtn = document.getElementById('btn-add-project');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        openNewProjectModal();
      });
    }

    // Executive Briefing Report button
    const briefingBtn = document.getElementById('btn-executive-briefing');
    if (briefingBtn) {
      briefingBtn.addEventListener('click', () => {
        openExecutiveReportModal();
      });
    }

    // Data Sync / Backup button
    const syncBtn = document.getElementById('btn-data-sync');
    if (syncBtn) {
      syncBtn.addEventListener('click', () => {
        openDataSyncModal();
      });
    }
  }
}

// Instantiate on DOM load
document.addEventListener('DOMContentLoaded', () => {
  window.__KLR_OPS_APP__ = new AppController();
});
