/**
 * Application State Manager with LocalStorage Persistence & Event Broadcasting
 * Supports Initiatives, Permits Feed, and KLR Build Operations Trello Pipeline
 */

import { INITIAL_PROJECTS, SAMPLE_PERMITS_DATA } from './sampleData.js';
import { 
  INITIAL_PIPELINE_CARDS, 
  PIPELINE_STAGES, 
  SERVICE_LINES, 
  STATUS_FLAGS, 
  PIPELINE_RULES_GUIDES,
  TRELLO_BOARD_META 
} from './trelloData.js';

const STORAGE_KEY_PROJECTS = 'klr_ops_projects_v1';
const STORAGE_KEY_PERMITS = 'klr_ops_permits_v1';
const STORAGE_KEY_PIPELINE = 'klr_ops_trello_pipeline_v1';

class StateManager {
  constructor() {
    this.projects = [];
    this.permits = [];
    this.pipelineCards = [];
    this.currentFilter = 'all'; // 'all', 'ops', 'digital', 'ai', 'data'
    this.searchQuery = '';
    
    // Trello Pipeline Filters
    this.pipelineSearch = '';
    this.pipelineServiceFilter = 'all';
    this.pipelineFlagFilter = 'all';
    this.pipelineSlaFilter = 'all'; // 'all', 'promise-risk', 'due-soon', 'overdue', 'missing-cf'
    
    this.listeners = [];
    this.loadState();
  }

  loadState() {
    try {
      // 1. Load Strategic Initiatives
      const savedProjects = localStorage.getItem(STORAGE_KEY_PROJECTS);
      if (savedProjects) {
        this.projects = JSON.parse(savedProjects);
      } else {
        this.projects = JSON.parse(JSON.stringify(INITIAL_PROJECTS));
        this.saveProjects();
      }

      // 2. Load Trello Pipeline Cards
      const savedPipeline = localStorage.getItem(STORAGE_KEY_PIPELINE);
      if (savedPipeline) {
        this.pipelineCards = JSON.parse(savedPipeline);
      } else {
        this.pipelineCards = JSON.parse(JSON.stringify(INITIAL_PIPELINE_CARDS));
        this.savePipeline();
      }

      // 3. Fetch latest permits from NCBS backend integration
      this.permits = [];
      this.permitHealth = [];
      this.permitTimestamp = '';
      
      fetch('/api/permits/latest')
        .then(response => response.json())
        .then(data => {
            if (data && data.permits) {
                this.permits = data.permits;
                this.permitHealth = data.health || [];
                this.permitTimestamp = data.timestamp || '';
                this.notify();
            } else {
                console.warn('Failed to fetch permits from backend, falling back to sample data.');
                this.permits = JSON.parse(JSON.stringify(SAMPLE_PERMITS_DATA));
                this.notify();
            }
        })
        .catch(e => {
            console.error('Error fetching permits API', e);
            this.permits = JSON.parse(JSON.stringify(SAMPLE_PERMITS_DATA));
            this.notify();
        });

    } catch (e) {
      console.error('Failed to load state', e);
      this.projects = JSON.parse(JSON.stringify(INITIAL_PROJECTS));
      this.permits = JSON.parse(JSON.stringify(SAMPLE_PERMITS_DATA));
      this.pipelineCards = JSON.parse(JSON.stringify(INITIAL_PIPELINE_CARDS));
    }
  }

  saveProjects() {
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(this.projects));
    } catch (e) {
      console.error('Failed to save projects to localStorage', e);
    }
  }

  savePermits() {
    try {
      localStorage.setItem(STORAGE_KEY_PERMITS, JSON.stringify(this.permits));
    } catch (e) {
      console.error('Failed to save permits to localStorage', e);
    }
  }

  savePipeline() {
    try {
      localStorage.setItem(STORAGE_KEY_PIPELINE, JSON.stringify(this.pipelineCards));
    } catch (e) {
      console.error('Failed to save pipeline to localStorage', e);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this);
    }
  }

  // =========================================================================
  // INITIATIVES FILTER & SEARCH
  // =========================================================================
  setFilter(category) {
    this.currentFilter = category;
    this.notify();
  }

  setSearch(query) {
    this.searchQuery = (query || '').toLowerCase().trim();
    this.notify();
  }

  getFilteredProjects() {
    return this.projects.filter(p => {
      const matchesFilter = this.currentFilter === 'all' || p.category === this.currentFilter;
      if (!matchesFilter) return false;
      if (!this.searchQuery) return true;

      const q = this.searchQuery;
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.owner.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.milestones.some(m => m.title.toLowerCase().includes(q))
      );
    });
  }

  getProjects() {
    return this.projects;
  }

  getProject(id) {
    return this.projects.find(p => p.id === id);
  }

  saveProject(projectData) {
    const existingIndex = this.projects.findIndex(p => p.id === projectData.id);
    
    if (projectData.milestones && projectData.milestones.length > 0) {
      const completed = projectData.milestones.filter(m => m.completed).length;
      projectData.progress = Math.round((completed / projectData.milestones.length) * 100);
    }

    if (existingIndex >= 0) {
      this.projects[existingIndex] = { ...this.projects[existingIndex], ...projectData };
    } else {
      const newId = projectData.id || `proj-${Date.now()}`;
      this.projects.push({
        ...projectData,
        id: newId
      });
    }

    this.saveProjects();
    this.notify();
  }

  deleteProject(id) {
    this.projects = this.projects.filter(p => p.id !== id);
    this.saveProjects();
    this.notify();
  }

  toggleMilestone(projectId, milestoneId) {
    const project = this.getProject(projectId);
    if (!project) return;

    const milestone = project.milestones.find(m => m.id === milestoneId);
    if (milestone) {
      milestone.completed = !milestone.completed;
      
      const completed = project.milestones.filter(m => m.completed).length;
      project.progress = Math.round((completed / project.milestones.length) * 100);
      
      if (project.progress === 100) {
        project.health = 'completed';
        project.healthLabel = 'Completed';
      }
      
      this.saveProjects();
      this.notify();
    }
  }

  addMilestone(projectId, milestone) {
    const project = this.getProject(projectId);
    if (!project) return;

    if (!project.milestones) project.milestones = [];
    project.milestones.push({
      id: `m-${Date.now()}`,
      title: milestone.title,
      completed: false,
      targetDate: milestone.targetDate || new Date().toISOString().split('T')[0]
    });

    const completed = project.milestones.filter(m => m.completed).length;
    project.progress = Math.round((completed / project.milestones.length) * 100);

    this.saveProjects();
    this.notify();
  }

  deleteMilestone(projectId, milestoneId) {
    const project = this.getProject(projectId);
    if (!project || !project.milestones) return;

    project.milestones = project.milestones.filter(m => m.id !== milestoneId);
    if (project.milestones.length > 0) {
      const completed = project.milestones.filter(m => m.completed).length;
      project.progress = Math.round((completed / project.milestones.length) * 100);
    } else {
      project.progress = 0;
    }

    this.saveProjects();
    this.notify();
  }

  // =========================================================================
  // TRELLO PIPELINE MANAGEMENT & SLA ENGINE
  // =========================================================================
  getPipelineStages() {
    return PIPELINE_STAGES;
  }

  getServiceLines() {
    return SERVICE_LINES;
  }

  getStatusFlags() {
    return STATUS_FLAGS;
  }

  getPipelineRules() {
    return PIPELINE_RULES_GUIDES;
  }

  getPipelineBoardMeta() {
    return TRELLO_BOARD_META;
  }

  getPipelineCards() {
    return this.pipelineCards;
  }

  getPipelineCard(id) {
    return this.pipelineCards.find(c => c.id === id || c.trelloCardId === id);
  }

  setPipelineSearch(query) {
    this.pipelineSearch = (query || '').toLowerCase().trim();
    this.notify();
  }

  setPipelineServiceFilter(serviceId) {
    this.pipelineServiceFilter = serviceId;
    this.notify();
  }

  setPipelineFlagFilter(flagId) {
    this.pipelineFlagFilter = flagId;
    this.notify();
  }

  setPipelineSlaFilter(slaFilter) {
    this.pipelineSlaFilter = slaFilter;
    this.notify();
  }

  getFilteredPipelineCards() {
    return this.pipelineCards.filter(card => {
      // Service Line filter
      if (this.pipelineServiceFilter !== 'all' && card.serviceLine !== this.pipelineServiceFilter) {
        return false;
      }

      // Status Flag filter
      if (this.pipelineFlagFilter !== 'all' && (!card.labels || !card.labels.includes(this.pipelineFlagFilter))) {
        return false;
      }

      // SLA filter
      if (this.pipelineSlaFilter !== 'all') {
        const sla = this.calculateCardSLA(card);
        if (this.pipelineSlaFilter === 'promise-risk' && !sla.isHardPromiseWarning && !sla.isHardPromiseBreach) return false;
        if (this.pipelineSlaFilter === 'overdue' && !sla.isOverdue) return false;
        if (this.pipelineSlaFilter === 'missing-cf' && !sla.isMissingCfId) return false;
      }

      // Search Query
      if (!this.pipelineSearch) return true;
      const q = this.pipelineSearch;
      return (
        card.title.toLowerCase().includes(q) ||
        (card.lastName && card.lastName.toLowerCase().includes(q)) ||
        (card.address && card.address.toLowerCase().includes(q)) ||
        (card.phone && card.phone.toLowerCase().includes(q)) ||
        (card.email && card.email.toLowerCase().includes(q)) ||
        (card.cfCustomerId && card.cfCustomerId.toLowerCase().includes(q)) ||
        (card.nextAction && card.nextAction.toLowerCase().includes(q)) ||
        (card.notes && card.notes.toLowerCase().includes(q))
      );
    });
  }

  /**
   * Calculates exact SLA metrics based on Card 3 rules:
   * - Stage 3 Design: 5-7 day promise (Warn @ Day 5, Escalate @ Day 7)
   * - Stage 4 Proposal Out: Warn @ 3 days, Escalate @ 10 days or no follow-up scheduled
   * - Stage 5 Deposit & HOA: 3-4 day promise post-deposit (Warn @ Day 3, Escalate @ Day 4) + CF ID check
   * - Overdue next action date
   */
  calculateCardSLA(card) {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    
    let daysInStage = 0;
    let slaState = 'normal'; // 'normal', 'warn', 'breach'
    let slaMessage = '';
    let isHardPromiseWarning = false;
    let isHardPromiseBreach = false;
    let isMissingCfId = false;
    let isOverdue = false;

    // Check Due Date (Next action's deadline)
    if (card.due) {
      const dueDate = new Date(card.due);
      if (dueDate < now && card.stage !== 'stage-won' && card.stage !== 'stage-lost') {
        isOverdue = true;
      }
    }

    // Check Stage 5+ Contractor Foreman Customer ID
    const stageNum = parseInt((card.stage || '').replace('stage-', ''), 10);
    if (!isNaN(stageNum) && stageNum >= 5 && (!card.cfCustomerId || card.cfCustomerId.trim() === '')) {
      isMissingCfId = true;
    }

    // Stage-specific SLA Calculations
    if (card.stage === 'stage-3') {
      // Design & Estimate: 5-7 day clock
      const startDate = card.designStarted ? new Date(card.designStarted) : (card.lastActivity ? new Date(card.lastActivity) : now);
      const diffMs = now - startDate;
      daysInStage = Math.max(1, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

      if (daysInStage >= 7) {
        slaState = 'breach';
        slaMessage = `Day ${daysInStage} — ⚠️ 5-7 Day Design Promise BROKEN!`;
        isHardPromiseBreach = true;
      } else if (daysInStage >= 5) {
        slaState = 'warn';
        slaMessage = `Day ${daysInStage} — SLA Warning (Promise due Day 7)`;
        isHardPromiseWarning = true;
      } else {
        slaMessage = `Day ${daysInStage} of 7 (Design in progress)`;
      }
    } else if (card.stage === 'stage-4') {
      // Proposal Out: Money leak stage
      const deliveredDate = card.designDelivered ? new Date(card.designDelivered) : (card.lastActivity ? new Date(card.lastActivity) : now);
      const diffMs = now - deliveredDate;
      daysInStage = Math.max(1, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

      if (!card.nextFollowUpDate || card.nextFollowUpDate < todayStr) {
        slaState = 'breach';
        slaMessage = `⚠️ Money Leak Risk: No upcoming follow-up scheduled`;
        isHardPromiseBreach = true;
      } else if (daysInStage >= 10) {
        slaState = 'breach';
        slaMessage = `Day ${daysInStage} without close (Stalled Proposal)`;
        isHardPromiseBreach = true;
      } else if (daysInStage >= 3) {
        slaState = 'warn';
        slaMessage = `Day ${daysInStage} pending response`;
        isHardPromiseWarning = true;
      } else {
        slaMessage = `Proposal out ${daysInStage}d ago`;
      }
    } else if (card.stage === 'stage-5') {
      // Deposit & HOA: 3-4 day HOA submittal promise post-deposit
      if (card.depositClearedDate) {
        const depositDate = new Date(card.depositClearedDate);
        const diffMs = now - depositDate;
        daysInStage = Math.max(1, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

        if (!card.hoaSubmittedDate) {
          if (daysInStage >= 4) {
            slaState = 'breach';
            slaMessage = `Day ${daysInStage} post-deposit — ⚠️ HOA 3-4 Day Promise BROKEN!`;
            isHardPromiseBreach = true;
          } else if (daysInStage >= 3) {
            slaState = 'warn';
            slaMessage = `Day ${daysInStage} post-deposit — HOA Submittal Due Tomorrow!`;
            isHardPromiseWarning = true;
          } else {
            slaMessage = `Day ${daysInStage} post-deposit (HOA Prep)`;
          }
        } else {
          slaMessage = `HOA Submitted on ${card.hoaSubmittedDate}`;
        }
      }
    }

    return {
      daysInStage,
      slaState,
      slaMessage,
      isHardPromiseWarning,
      isHardPromiseBreach,
      isMissingCfId,
      isOverdue
    };
  }

  savePipelineCard(cardData) {
    const existingIndex = this.pipelineCards.findIndex(c => c.id === cardData.id);
    const nowIso = new Date().toISOString();

    // Auto-derive title standard `[Service] — Last Name — Street` if missing or edited
    if (cardData.serviceLineLabel && cardData.lastName && cardData.address) {
      const streetPart = cardData.address.split(',')[0].trim();
      cardData.title = `${cardData.serviceLineLabel} — ${cardData.lastName} — ${streetPart}`;
    }

    if (existingIndex >= 0) {
      this.pipelineCards[existingIndex] = {
        ...this.pipelineCards[existingIndex],
        ...cardData,
        lastActivity: nowIso
      };
    } else {
      const newId = cardData.id || `card-${Date.now()}`;
      this.pipelineCards.unshift({
        ...cardData,
        id: newId,
        lastActivity: nowIso
      });
    }

    this.savePipeline();
    this.notify();
  }

  moveCardStage(cardId, targetStageId) {
    const card = this.getPipelineCard(cardId);
    if (!card) return;

    const targetStage = PIPELINE_STAGES.find(s => s.id === targetStageId);
    if (!targetStage) return;

    card.stage = targetStage.id;
    card.stageName = targetStage.name;
    card.lastActivity = new Date().toISOString();

    // If moved to stage 3, initialize designStarted date if empty
    if (targetStageId === 'stage-3' && !card.designStarted) {
      card.designStarted = new Date().toISOString().split('T')[0];
    }

    // If moved to stage 5, initialize depositClearedDate if empty
    if (targetStageId === 'stage-5' && !card.depositClearedDate) {
      card.depositClearedDate = new Date().toISOString().split('T')[0];
    }

    this.savePipeline();
    this.notify();
  }

  deletePipelineCard(id) {
    this.pipelineCards = this.pipelineCards.filter(c => c.id !== id && c.trelloCardId !== id);
    this.savePipeline();
    this.notify();
  }

  getPipelineStats() {
    let totalPipelineValue = 0;
    let activeDealsCount = 0;
    let closedWonValue = 0;
    let promiseWarnings = 0;
    let promiseBreaches = 0;
    let missingCfIds = 0;
    let overdueActions = 0;

    const stageBreakdown = {};
    PIPELINE_STAGES.forEach(s => {
      stageBreakdown[s.id] = { count: 0, value: 0 };
    });

    this.pipelineCards.forEach(card => {
      const val = Number(card.estimateValue) || 0;
      const stage = card.stage || 'stage-0';

      if (stageBreakdown[stage]) {
        stageBreakdown[stage].count += 1;
        stageBreakdown[stage].value += val;
      }

      if (stage === 'stage-won') {
        closedWonValue += val;
      } else if (stage !== 'stage-lost') {
        activeDealsCount += 1;
        totalPipelineValue += val;

        const sla = this.calculateCardSLA(card);
        if (sla.isHardPromiseBreach) promiseBreaches += 1;
        if (sla.isHardPromiseWarning) promiseWarnings += 1;
        if (sla.isMissingCfId) missingCfIds += 1;
        if (sla.isOverdue) overdueActions += 1;
      }
    });

    return {
      totalPipelineValue,
      activeDealsCount,
      closedWonValue,
      promiseWarnings,
      promiseBreaches,
      missingCfIds,
      overdueActions,
      stageBreakdown
    };
  }

  resetPipelineToDefaults() {
    this.pipelineCards = JSON.parse(JSON.stringify(INITIAL_PIPELINE_CARDS));
    this.savePipeline();
    this.notify();
  }

  parseCSV(text) {
    const result = [];
    let line = [];
    let field = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (inQuotes) {
        if (char === '"') {
          if (i + 1 < text.length && text[i + 1] === '"') {
            field += '"';
            i++;
          } else {
            inQuotes = false;
          }
        } else {
          field += char;
        }
      } else {
        if (char === '"') {
          inQuotes = true;
        } else if (char === ',') {
          line.push(field);
          field = '';
        } else if (char === '\n' || char === '\r') {
          if (char === '\r' && i + 1 < text.length && text[i + 1] === '\n') {
            i++;
          }
          line.push(field);
          if (line.length > 1 || line[0] !== '') {
            result.push(line);
          }
          line = [];
          field = '';
        } else {
          field += char;
        }
      }
    }
    if (field || line.length > 0) {
      line.push(field);
      result.push(line);
    }
    return result;
  }

  importTrelloCsv(csvString) {
    try {
      const rows = this.parseCSV(csvString.trim());
      if (rows.length < 2) throw new Error("CSV has no data rows");
      
      const headers = rows[0].map(h => h.trim());
      const newCards = [];
      
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row.length < headers.length) continue;
        
        const cardMap = {};
        headers.forEach((h, idx) => {
          cardMap[h] = row[idx];
        });
        
        if (cardMap['Card Name'] && cardMap['Card Name'].includes('[TEMPLATE]')) continue;
        
        let stageId = 'stage-0';
        let stageObj = PIPELINE_STAGES[0];
        const listId = cardMap['List ID'];
        const listName = cardMap['List Name'];
        const foundStage = PIPELINE_STAGES.find(s => 
          s.trelloListId === listId || 
          (listName && s.name.toLowerCase().trim() === listName.toLowerCase().trim())
        );
        if (foundStage) {
          stageId = foundStage.id;
          stageObj = foundStage;
        }
        
        const phone = cardMap['Phone'] || '';
        const email = cardMap['Email'] || '';
        const address = cardMap['Address'] || '';
        const estimateValue = Number(cardMap['Estimate Value']) || 0;
        const consultDate = cardMap['Consult Date'] || '';
        const designStarted = cardMap['Design Started'] || '';
        const designDelivered = cardMap['Design Delivered'] || '';
        const depositClearedDate = cardMap['Deposit Cleared'] || '';
        const hoaSubmittedDate = cardMap['HOA Submitted'] || '';
        const cfCustomerId = cardMap['CF Customer ID'] || '';
        const nextFollowUpDate = cardMap['Next Follow-Up'] || '';
        
        const cardName = cardMap['Card Name'] || '';
        
        let serviceLine = 'patio';
        let serviceLineLabel = 'Patio/Hardscape';
        if (cardName.toLowerCase().includes('pool')) { serviceLine = 'pool'; serviceLineLabel = 'Pool/Spa'; }
        else if (cardName.toLowerCase().includes('room') || cardName.toLowerCase().includes('four season')) { serviceLine = 'room'; serviceLineLabel = 'Four Season Room'; }
        else if (cardName.toLowerCase().includes('firepit') || cardName.toLowerCase().includes('water')) { serviceLine = 'firepit'; serviceLineLabel = 'Water Feature/Firepit'; }
        else if (cardName.toLowerCase().includes('turf') || cardName.toLowerCase().includes('plant')) { serviceLine = 'turf'; serviceLineLabel = 'Turf/Planting/Irrigation'; }
        
        let lastName = cardName;
        if (cardName.includes('—') || cardName.includes('-')) {
          const parts = cardName.split(/[—\-]/);
          if (parts.length >= 2) lastName = parts[1].trim();
        }
        
        newCards.push({
          id: `card-${cardMap['Card ID'] || Math.floor(Math.random()*10000)}`,
          trelloCardId: cardMap['Card ID'] || '',
          title: cardName,
          lastName,
          serviceLine,
          serviceLineLabel,
          stage: stageId,
          stageName: stageObj.name,
          estimateValue,
          due: cardMap['Due Date'] || '',
          nextAction: cardMap['Due Date'] ? 'Next Action Deadline' : 'Define Next Action in Monday Review',
          phone,
          email,
          address,
          cfCustomerId,
          consultDate,
          designStarted,
          designDelivered,
          depositClearedDate,
          hoaSubmittedDate,
          nextFollowUpDate,
          labels: ['patio'],
          checklist: [ { id: 'c1', name: 'Stage exit conditions met', completed: false } ],
          notes: cardMap['Card Description'] || '',
          lastActivity: cardMap['Last Activity Date'] || new Date().toISOString()
        });
      }
      
      if (newCards.length > 0) {
        this.pipelineCards = newCards;
        this.savePipeline();
        this.notify();
      }
      return { success: true, count: newCards.length };
    } catch (e) {
      console.error('Failed to import Trello CSV', e);
      return { success: false, error: e.message };
    }
  }

  importTrelloBoard(trelloJson) {
    try {
      if (typeof trelloJson === 'string' && !trelloJson.trim().startsWith('{') && !trelloJson.trim().startsWith('[')) {
        return this.importTrelloCsv(trelloJson);
      }

      let data = trelloJson;
      if (typeof trelloJson === 'string') {
        data = JSON.parse(trelloJson);
      }

      if (!data || !Array.isArray(data.cards) || !Array.isArray(data.lists)) {
        throw new Error('Invalid Trello export JSON structure (missing cards or lists array)');
      }

      // Map lists to our stage IDs
      const listToStageMap = {};
      data.lists.forEach(l => {
        const found = PIPELINE_STAGES.find(s => s.trelloListId === l.id || s.name.toLowerCase().trim() === l.name.toLowerCase().trim());
        if (found) {
          listToStageMap[l.id] = found.id;
        }
      });

      // Map custom fields
      const customFieldMap = {};
      if (Array.isArray(data.customFields)) {
        data.customFields.forEach(cf => {
          customFieldMap[cf.id] = cf.name;
        });
      }

      // Parse cards
      const newCards = [];
      data.cards.forEach(c => {
        // Skip archived cards if desired, or include open cards
        if (c.closed && c.name.includes('[TEMPLATE]')) return;

        const stageId = listToStageMap[c.idList] || 'stage-0';
        const stageObj = PIPELINE_STAGES.find(s => s.id === stageId) || PIPELINE_STAGES[0];

        // Parse custom field items
        let phone = '';
        let email = '';
        let address = c.address || '';
        let estimateValue = 0;
        let consultDate = '';
        let designStarted = '';
        let designDelivered = '';
        let depositClearedDate = '';
        let hoaSubmittedDate = '';
        let cfCustomerId = '';
        let nextFollowUpDate = '';

        if (Array.isArray(c.customFieldItems)) {
          c.customFieldItems.forEach(item => {
            const fieldName = customFieldMap[item.idCustomField] || '';
            const val = item.value || {};
            if (fieldName === 'Phone') phone = val.text || val.number || '';
            if (fieldName === 'Email') email = val.text || '';
            if (fieldName === 'Address') address = val.text || '';
            if (fieldName === 'Estimate Value') estimateValue = Number(val.number) || 0;
            if (fieldName === 'Consult Date') consultDate = (val.date || '').split('T')[0];
            if (fieldName === 'Design Started') designStarted = val.date || '';
            if (fieldName === 'Design Delivered') designDelivered = val.date || '';
            if (fieldName === 'Deposit Cleared') depositClearedDate = (val.date || '').split('T')[0];
            if (fieldName === 'HOA Submitted') hoaSubmittedDate = (val.date || '').split('T')[0];
            if (fieldName === 'CF Customer ID') cfCustomerId = val.text || '';
            if (fieldName === 'Next Follow-Up') nextFollowUpDate = (val.date || '').split('T')[0];
          });
        }

        // Determine service line from labels or name
        let serviceLine = 'patio';
        let serviceLineLabel = 'Patio/Hardscape';
        if (c.name.toLowerCase().includes('pool')) { serviceLine = 'pool'; serviceLineLabel = 'Pool/Spa'; }
        else if (c.name.toLowerCase().includes('room') || c.name.toLowerCase().includes('four season')) { serviceLine = 'room'; serviceLineLabel = 'Four Season Room'; }
        else if (c.name.toLowerCase().includes('firepit') || c.name.toLowerCase().includes('water')) { serviceLine = 'firepit'; serviceLineLabel = 'Water Feature/Firepit'; }
        else if (c.name.toLowerCase().includes('turf') || c.name.toLowerCase().includes('plant')) { serviceLine = 'turf'; serviceLineLabel = 'Turf/Planting/Irrigation'; }

        // Determine last name
        let lastName = c.name;
        if (c.name.includes('—') || c.name.includes('-')) {
          const parts = c.name.split(/[—\-]/);
          if (parts.length >= 2) lastName = parts[1].trim();
        }

        // Build checklists
        const checklist = [];
        if (Array.isArray(data.checklists)) {
          const cardChecklists = data.checklists.filter(chk => chk.idCard === c.id || (c.idChecklists && c.idChecklists.includes(chk.id)));
          cardChecklists.forEach(chk => {
            if (Array.isArray(chk.checkItems)) {
              chk.checkItems.forEach(ci => {
                checklist.push({
                  id: ci.id,
                  name: ci.name,
                  completed: ci.state === 'complete'
                });
              });
            }
          });
        }

        newCards.push({
          id: `card-${c.idShort || Math.floor(Math.random()*10000)}`,
          trelloCardId: c.id,
          title: c.name,
          lastName,
          serviceLine,
          serviceLineLabel,
          stage: stageId,
          stageName: stageObj.name,
          estimateValue,
          due: c.due || '',
          nextAction: c.due ? 'Next Action Deadline' : 'Define Next Action in Monday Review',
          phone,
          email,
          address,
          cfCustomerId,
          consultDate,
          designStarted,
          designDelivered,
          depositClearedDate,
          hoaSubmittedDate,
          nextFollowUpDate,
          labels: ['patio'],
          checklist: checklist.length > 0 ? checklist : [
            { id: 'c1', name: 'Stage exit conditions met', completed: false }
          ],
          notes: c.desc || '',
          lastActivity: c.dateLastActivity || new Date().toISOString()
        });
      });

      if (newCards.length > 0) {
        this.pipelineCards = newCards;
        this.savePipeline();
        this.notify();
      }

      return { success: true, count: newCards.length };
    } catch (e) {
      console.error('Failed to import Trello board', e);
      return { success: false, error: e.message };
    }
  }

  // =========================================================================
  // CONTRACTOR FOREMAN INTEGRATION
  // =========================================================================
  async fetchContractorForemanLeads() {
    try {
      const response = await fetch('/api/contractor-foreman/leads');
      if (response.ok) {
        const data = await response.json();
        if (data && data.leads && data.leads.length > 0) {
          let addedCount = 0;
          data.leads.forEach(lead => {
            // Check if card already exists
            const existing = this.pipelineCards.find(c => c.cfCustomerId === lead.cfCustomerId);
            if (!existing) {
              this.pipelineCards.unshift(lead);
              addedCount++;
            }
          });
          if (addedCount > 0) {
            this.savePipeline();
            this.notify();
            return { success: true, added: addedCount };
          } else {
            return { success: true, added: 0 };
          }
        }
      }
    } catch (e) {
      console.error("Failed to fetch CF leads", e);
    }
    return { success: false, added: 0 };
  }

  // =========================================================================
  // PERMITS
  // =========================================================================
  getPermits() {
    return this.permits;
  }

  addPermit(permit) {
    this.permits.unshift({
      id: `PERM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      issueDate: new Date().toISOString().split('T')[0],
      ...permit
    });
    this.savePermits();
    this.notify();
  }

  // =========================================================================
  // BACKUP & RESTORE
  // =========================================================================
  resetToDefaults() {
    this.projects = JSON.parse(JSON.stringify(INITIAL_PROJECTS));
    this.permits = JSON.parse(JSON.stringify(SAMPLE_PERMITS_DATA));
    this.pipelineCards = JSON.parse(JSON.stringify(INITIAL_PIPELINE_CARDS));
    this.saveProjects();
    this.savePermits();
    this.savePipeline();
    this.notify();
  }

  exportDataJson() {
    return JSON.stringify({
      version: '2.0',
      exportedAt: new Date().toISOString(),
      trelloMeta: TRELLO_BOARD_META,
      pipelineCards: this.pipelineCards,
      projects: this.projects,
      permits: this.permits
    }, null, 2);
  }

  importDataJson(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (Array.isArray(data.pipelineCards)) {
        this.pipelineCards = data.pipelineCards;
        this.savePipeline();
      }
      if (Array.isArray(data.projects)) {
        this.projects = data.projects;
        this.saveProjects();
      }
      if (Array.isArray(data.permits)) {
        this.permits = data.permits;
        this.savePermits();
      }
      this.notify();
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  // Executive KPI summary generator
  getExecutiveStats() {
    const total = this.projects.length;
    const onTrack = this.projects.filter(p => p.health === 'ontrack').length;
    const atRisk = this.projects.filter(p => p.health === 'atrisk').length;
    const blocked = this.projects.filter(p => p.health === 'blocked').length;
    const inReview = this.projects.filter(p => p.health === 'inreview').length;
    const completed = this.projects.filter(p => p.health === 'completed').length;

    let totalMilestones = 0;
    let completedMilestones = 0;
    this.projects.forEach(p => {
      if (p.milestones) {
        totalMilestones += p.milestones.length;
        completedMilestones += p.milestones.filter(m => m.completed).length;
      }
    });

    const milestoneRate = totalMilestones > 0 
      ? Math.round((completedMilestones / totalMilestones) * 100) 
      : 0;

    return {
      total,
      onTrack,
      atRisk,
      blocked,
      inReview,
      completed,
      totalMilestones,
      completedMilestones,
      milestoneRate
    };
  }
}

export const state = new StateManager();
