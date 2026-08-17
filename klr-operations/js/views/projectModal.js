/**
 * Deep-Dive Project Workspace Drawer / Modal Component
 */

import { state } from '../state.js';

let activeTab = 'milestones'; // 'milestones', 'assets', 'kpis', 'edit'

export function openProjectModal(projectId) {
  const project = state.getProject(projectId);
  if (!project) return;

  const modalOverlay = document.getElementById('global-modal-overlay');
  const modalContainer = document.getElementById('global-modal-content');
  if (!modalOverlay || !modalContainer) return;

  renderProjectModalContent(modalContainer, modalOverlay, project);
  modalOverlay.classList.add('active');
}

export function openNewProjectModal() {
  const modalOverlay = document.getElementById('global-modal-overlay');
  const modalContainer = document.getElementById('global-modal-content');
  if (!modalOverlay || !modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-header">
      <h3 class="modal-title">🚀 Launch New Strategic Initiative</h3>
      <button class="modal-close-btn" id="modal-close-x">✕</button>
    </div>

    <form id="new-project-form">
      <div class="modal-body">
        <div class="form-group">
          <label class="form-label">Initiative Title</label>
          <input type="text" class="form-input" name="title" required placeholder="e.g. Subcontractor Automated Prequalification Flow">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Domain Category</label>
            <select class="form-select" name="category">
              <option value="ops">Operational Systems (ERP, Tools, Field)</option>
              <option value="digital">Digital & Brand Assets (Web, Media, SEO)</option>
              <option value="ai">AI & Automations (Receptionist, Triage, LLMs)</option>
              <option value="data">Data & Intelligence (Permits, Scraping, Feeds)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Initial Health Status</label>
            <select class="form-select" name="health">
              <option value="ontrack">🟢 On Track</option>
              <option value="inreview">🟣 In Review</option>
              <option value="atrisk">🟡 At Risk</option>
              <option value="blocked">🔴 Blocked</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Operational Owner</label>
            <input type="text" class="form-input" name="owner" value="Nick Donatelli (Operations Lead)" required>
          </div>
          <div class="form-group">
            <label class="form-label">Target Completion Date</label>
            <input type="date" class="form-input" name="targetDate" value="2026-10-31" required>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Executive Summary / Objective</label>
          <textarea class="form-textarea" name="description" rows="3" required placeholder="Describe the operational goals, target deliverables, and business impact of this initiative..."></textarea>
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-outline" id="modal-cancel-btn">Cancel</button>
        <button type="submit" class="btn btn-primary">Create Initiative</button>
      </div>
    </form>
  `;

  modalOverlay.classList.add('active');

  const close = () => modalOverlay.classList.remove('active');
  modalContainer.querySelector('#modal-close-x').addEventListener('click', close);
  modalContainer.querySelector('#modal-cancel-btn').addEventListener('click', close);

  modalContainer.querySelector('#new-project-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const category = formData.get('category');
    
    let categoryLabel = 'Operational Systems';
    if (category === 'digital') categoryLabel = 'Digital & Brand Assets';
    if (category === 'ai') categoryLabel = 'AI & Automations';
    if (category === 'data') categoryLabel = 'Data & Intelligence';

    const health = formData.get('health');
    let healthLabel = 'On Track';
    if (health === 'inreview') healthLabel = 'In Review';
    if (health === 'atrisk') healthLabel = 'At Risk';
    if (health === 'blocked') healthLabel = 'Blocked';

    const newProject = {
      id: `proj-${Date.now()}`,
      title: formData.get('title'),
      category,
      categoryLabel,
      health,
      healthLabel,
      stage: 'development',
      stageLabel: 'Build & Configuration',
      progress: 0,
      targetDate: formData.get('targetDate'),
      startDate: new Date().toISOString().split('T')[0],
      owner: formData.get('owner'),
      description: formData.get('description'),
      kpis: [
        { name: "Adoption Rate", value: "0%", target: "100%" },
        { name: "Deliverables Completed", value: "0", target: "5" }
      ],
      milestones: [
        { id: `m-${Date.now()}-1`, title: "Phase 1: Architecture & Requirements Specification", completed: false, targetDate: formData.get('targetDate') }
      ],
      assets: []
    };

    state.saveProject(newProject);
    close();
    openProjectModal(newProject.id);
  });
}

function renderProjectModalContent(container, overlay, project) {
  const completedCount = project.milestones ? project.milestones.filter(m => m.completed).length : 0;
  const totalCount = project.milestones ? project.milestones.length : 0;

  container.innerHTML = `
    <!-- Header -->
    <div class="modal-header">
      <div style="flex: 1;">
        <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.35rem;">
          <span class="category-tag" data-cat="${project.category}">${project.categoryLabel}</span>
          <span class="badge badge-${project.health}">
            <span class="badge-dot"></span> ${project.healthLabel}
          </span>
          <span style="font-size: 0.72rem; color: var(--text-muted);">Stage: <strong>${project.stageLabel || project.stage}</strong></span>
        </div>
        <h3 class="modal-title" style="font-size: 1.25rem;">${project.title}</h3>
      </div>
      <button class="modal-close-btn" id="modal-close-x">✕</button>
    </div>

    <div class="modal-body">
      <!-- High-level Meta Grid -->
      <div class="detail-meta-grid">
        <div>
          <div class="meta-field-label">Initiative Owner</div>
          <div class="meta-field-value">${project.owner}</div>
        </div>
        <div>
          <div class="meta-field-label">Target Completion</div>
          <div class="meta-field-value">📅 ${project.targetDate}</div>
        </div>
        <div>
          <div class="meta-field-label">Milestone Progress</div>
          <div class="meta-field-value" style="color: var(--accent-sky);">
            ${project.progress}% (${completedCount}/${totalCount} completed)
          </div>
        </div>
      </div>

      <!-- Tabs Navigation -->
      <div class="modal-tabs">
        <button class="modal-tab-btn ${activeTab === 'milestones' ? 'active' : ''}" data-tab="milestones">
          🎯 Milestones & Phase-Gates (${completedCount}/${totalCount})
        </button>
        <button class="modal-tab-btn ${activeTab === 'assets' ? 'active' : ''}" data-tab="assets">
          📁 Digital Assets & Links (${project.assets ? project.assets.length : 0})
        </button>
        <button class="modal-tab-btn ${activeTab === 'kpis' ? 'active' : ''}" data-tab="kpis">
          📊 Key Performance Indicators (${project.kpis ? project.kpis.length : 0})
        </button>
        <button class="modal-tab-btn ${activeTab === 'edit' ? 'active' : ''}" data-tab="edit">
          ⚙️ Edit Details
        </button>
      </div>

      <!-- Tab Content Area -->
      <div id="modal-tab-content">
        ${renderTabContent(project)}
      </div>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" id="modal-done-btn">Done</button>
    </div>
  `;

  // Close actions
  const close = () => overlay.classList.remove('active');
  container.querySelector('#modal-close-x').addEventListener('click', close);
  container.querySelector('#modal-done-btn').addEventListener('click', close);

  // Tab switching
  container.querySelectorAll('.modal-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeTab = btn.dataset.tab;
      renderProjectModalContent(container, overlay, project);
    });
  });

  // Attach tab specific listeners
  attachTabListeners(container, overlay, project);
}

function renderTabContent(project) {
  if (activeTab === 'milestones') {
    return `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <p style="font-size: 0.78rem; color: var(--text-secondary);">
            Check off key deliverables as your team reaches phase-gate requirements. Progress auto-calculates.
          </p>
        </div>

        <div class="milestones-checklist">
          ${(!project.milestones || project.milestones.length === 0) ? `
            <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
              No milestones defined yet.
            </div>
          ` : project.milestones.map(m => `
            <div class="checklist-item ${m.completed ? 'completed' : ''}">
              <input type="checkbox" class="checklist-checkbox modal-milestone-toggle" 
                data-milestone-id="${m.id}" ${m.completed ? 'checked' : ''}>
              <div class="checklist-content">
                <div class="checklist-title">${m.title}</div>
                <div class="checklist-date">Target: ${m.targetDate || 'TBD'}</div>
              </div>
              <button class="btn btn-outline btn-sm delete-milestone-btn" data-milestone-id="${m.id}" style="padding: 0.2rem 0.5rem; color: var(--status-blocked);" title="Delete milestone">
                ✕
              </button>
            </div>
          `).join('')}
        </div>

        <!-- Add Milestone Inline Form -->
        <form id="add-milestone-form" style="margin-top: 1.25rem; display: flex; gap: 0.5rem; background: var(--bg-tertiary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px dashed var(--border-subtle);">
          <input type="text" class="form-input" name="title" required placeholder="Add new milestone or deliverable..." style="flex: 1;">
          <input type="date" class="form-input" name="targetDate" style="width: 150px;" value="${project.targetDate}">
          <button type="submit" class="btn btn-primary btn-sm">+ Add</button>
        </form>
      </div>
    `;
  }

  if (activeTab === 'assets') {
    return `
      <div>
        <p style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 1rem;">
          Central repository for Figma designs, Dropbox vaults, training SOPs, code repositories, and API credentials.
        </p>

        <div class="assets-list">
          ${(!project.assets || project.assets.length === 0) ? `
            <div style="text-align: center; padding: 2rem; color: var(--text-muted); border: 1px dashed var(--border-subtle); border-radius: var(--radius-md);">
              No linked digital assets attached to this initiative yet.
            </div>
          ` : project.assets.map((a, idx) => `
            <div class="asset-link-card">
              <div class="asset-link-info">
                <div class="asset-icon">📁</div>
                <div>
                  <div style="font-weight: 700; font-size: 0.85rem; color: var(--text-primary);">${a.name}</div>
                  <div style="font-size: 0.74rem; color: var(--text-muted);">${a.note || a.type}</div>
                </div>
              </div>
              <div style="display: flex; gap: 0.5rem; align-items: center;">
                <a href="${a.url}" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="color: var(--accent-sky);">
                  Open ↗
                </a>
                <button class="btn btn-outline btn-sm delete-asset-btn" data-asset-idx="${idx}" style="color: var(--status-blocked);">
                  ✕
                </button>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Add Asset Form -->
        <form id="add-asset-form" style="margin-top: 1.25rem; background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-md); border: 1px dashed var(--border-subtle);">
          <div style="font-size: 0.78rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">+ Attach Digital Asset / System Link</div>
          <div class="form-row">
            <div class="form-group" style="margin-bottom: 0.5rem;">
              <input type="text" class="form-input" name="name" required placeholder="Asset / Resource Name (e.g. Figma UI Kit)">
            </div>
            <div class="form-group" style="margin-bottom: 0.5rem;">
              <input type="text" class="form-input" name="url" placeholder="URL / Link (e.g. https://...)" value="#">
            </div>
          </div>
          <div class="form-group" style="margin-bottom: 0.75rem;">
            <input type="text" class="form-input" name="note" placeholder="Description or access instructions...">
          </div>
          <button type="submit" class="btn btn-primary btn-sm">+ Save Asset</button>
        </form>
      </div>
    `;
  }

  if (activeTab === 'kpis') {
    return `
      <div>
        <p style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 1rem;">
          Key metrics and quantitative operational indicators tracked for this initiative.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          ${(!project.kpis || project.kpis.length === 0) ? `
            <div style="color: var(--text-muted);">No KPIs configured.</div>
          ` : project.kpis.map((kpi, idx) => `
            <div style="background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem; position: relative;">
              <button class="delete-kpi-btn" data-kpi-idx="${idx}" style="position: absolute; right: 0.5rem; top: 0.5rem; background: transparent; border: none; color: var(--text-muted); cursor: pointer;">✕</button>
              <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">${kpi.name}</div>
              <div style="font-size: 1.4rem; font-weight: 800; font-family: var(--font-mono); color: var(--text-primary); margin: 0.35rem 0;">
                ${kpi.value}
              </div>
              <div style="font-size: 0.74rem; color: var(--accent-sky);">Target: ${kpi.target || 'N/A'}</div>
            </div>
          `).join('')}
        </div>

        <!-- Add KPI Form -->
        <form id="add-kpi-form" style="background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-md); border: 1px dashed var(--border-subtle);">
          <div style="font-size: 0.78rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">+ Add Metric / KPI Tracker</div>
          <div class="form-row">
            <div class="form-group" style="margin-bottom: 0.5rem;">
              <input type="text" class="form-input" name="name" required placeholder="KPI Metric Name (e.g. Daily Log Compliance)">
            </div>
            <div class="form-group" style="margin-bottom: 0.5rem;">
              <input type="text" class="form-input" name="value" required placeholder="Current Value (e.g. 92%)">
            </div>
          </div>
          <div class="form-group" style="margin-bottom: 0.75rem;">
            <input type="text" class="form-input" name="target" placeholder="Target Goal (e.g. 95%)">
          </div>
          <button type="submit" class="btn btn-primary btn-sm">+ Add KPI</button>
        </form>
      </div>
    `;
  }

  if (activeTab === 'edit') {
    return `
      <form id="edit-project-form">
        <div class="form-group">
          <label class="form-label">Initiative Title</label>
          <input type="text" class="form-input" name="title" value="${project.title}" required>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Health Status</label>
            <select class="form-select" name="health">
              <option value="ontrack" ${project.health === 'ontrack' ? 'selected' : ''}>🟢 On Track</option>
              <option value="inreview" ${project.health === 'inreview' ? 'selected' : ''}>🟣 In Review</option>
              <option value="atrisk" ${project.health === 'atrisk' ? 'selected' : ''}>🟡 At Risk</option>
              <option value="blocked" ${project.health === 'blocked' ? 'selected' : ''}>🔴 Blocked</option>
              <option value="completed" ${project.health === 'completed' ? 'selected' : ''}>🔵 Completed</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Lifecycle Stage</label>
            <select class="form-select" name="stage">
              <option value="discovery" ${project.stage === 'discovery' ? 'selected' : ''}>1. Discovery & Scoping</option>
              <option value="development" ${project.stage === 'development' ? 'selected' : ''}>2. Build & Configuration</option>
              <option value="testing" ${project.stage === 'testing' ? 'selected' : ''}>3. Field QA & Pilot Testing</option>
              <option value="live-ops" ${project.stage === 'live-ops' ? 'selected' : ''}>4. Live Operations / Review</option>
              <option value="optimized" ${project.stage === 'optimized' ? 'selected' : ''}>5. Deployed & Optimized</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Initiative Owner</label>
            <input type="text" class="form-input" name="owner" value="${project.owner}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Target Completion Date</label>
            <input type="date" class="form-input" name="targetDate" value="${project.targetDate}" required>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Description / Objectives</label>
          <textarea class="form-textarea" name="description" rows="3" required>${project.description}</textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Operational Notes & Context</label>
          <textarea class="form-textarea" name="notes" rows="2">${project.notes || ''}</textarea>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-subtle);">
          <button type="button" class="btn btn-outline" id="btn-delete-project" style="color: var(--status-blocked); border-color: rgba(244, 63, 94, 0.3);">
            🗑 Delete Initiative
          </button>
          <button type="submit" class="btn btn-primary">Save Changes</button>
        </div>
      </form>
    `;
  }
}

function attachTabListeners(container, overlay, project) {
  // Milestone check toggles
  container.querySelectorAll('.modal-milestone-toggle').forEach(box => {
    box.addEventListener('change', () => {
      const milestoneId = box.dataset.milestoneId;
      state.toggleMilestone(project.id, milestoneId);
      const updated = state.getProject(project.id);
      renderProjectModalContent(container, overlay, updated);
    });
  });

  // Delete milestone
  container.querySelectorAll('.delete-milestone-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.deleteMilestone(project.id, btn.dataset.milestoneId);
      const updated = state.getProject(project.id);
      renderProjectModalContent(container, overlay, updated);
    });
  });

  // Add milestone form
  const addMilestoneForm = container.querySelector('#add-milestone-form');
  if (addMilestoneForm) {
    addMilestoneForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      state.addMilestone(project.id, {
        title: formData.get('title'),
        targetDate: formData.get('targetDate')
      });
      const updated = state.getProject(project.id);
      renderProjectModalContent(container, overlay, updated);
    });
  }

  // Add Asset form
  const addAssetForm = container.querySelector('#add-asset-form');
  if (addAssetForm) {
    addAssetForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      if (!project.assets) project.assets = [];
      project.assets.push({
        name: formData.get('name'),
        url: formData.get('url') || '#',
        note: formData.get('note') || '',
        type: 'doc'
      });
      state.saveProject(project);
      renderProjectModalContent(container, overlay, project);
    });
  }

  // Delete Asset
  container.querySelectorAll('.delete-asset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.assetIdx, 10);
      project.assets.splice(idx, 1);
      state.saveProject(project);
      renderProjectModalContent(container, overlay, project);
    });
  });

  // Add KPI form
  const addKpiForm = container.querySelector('#add-kpi-form');
  if (addKpiForm) {
    addKpiForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      if (!project.kpis) project.kpis = [];
      project.kpis.push({
        name: formData.get('name'),
        value: formData.get('value'),
        target: formData.get('target') || ''
      });
      state.saveProject(project);
      renderProjectModalContent(container, overlay, project);
    });
  }

  // Delete KPI
  container.querySelectorAll('.delete-kpi-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.kpiIdx, 10);
      project.kpis.splice(idx, 1);
      state.saveProject(project);
      renderProjectModalContent(container, overlay, project);
    });
  });

  // Edit Project Form Submit
  const editForm = container.querySelector('#edit-project-form');
  if (editForm) {
    editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      
      const health = formData.get('health');
      let healthLabel = 'On Track';
      if (health === 'inreview') healthLabel = 'In Review';
      if (health === 'atrisk') healthLabel = 'At Risk';
      if (health === 'blocked') healthLabel = 'Blocked';
      if (health === 'completed') healthLabel = 'Completed';

      const stage = formData.get('stage');
      let stageLabel = 'Build & Configuration';
      if (stage === 'discovery') stageLabel = 'Discovery & Scoping';
      if (stage === 'testing') stageLabel = 'Field QA & Testing';
      if (stage === 'live-ops') stageLabel = 'Live Operations / Review';
      if (stage === 'optimized') stageLabel = 'Deployed & Optimized';

      project.title = formData.get('title');
      project.health = health;
      project.healthLabel = healthLabel;
      project.stage = stage;
      project.stageLabel = stageLabel;
      project.owner = formData.get('owner');
      project.targetDate = formData.get('targetDate');
      project.description = formData.get('description');
      project.notes = formData.get('notes');

      state.saveProject(project);
      activeTab = 'milestones';
      renderProjectModalContent(container, overlay, project);
    });
  }

  // Delete Project button
  const deleteBtn = container.querySelector('#btn-delete-project');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      if (confirm(`Are you sure you want to delete the initiative "${project.title}"?`)) {
        state.deleteProject(project.id);
        overlay.classList.remove('active');
      }
    });
  }
}
