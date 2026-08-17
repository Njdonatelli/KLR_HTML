/**
 * Initial Seed Data for Multi-Project Operations & Digital Asset Command Center
 * Specifically tailored for Operations & Digital Assets Specialist (Nick Donatelli / KLR Build)
 */

export const INITIAL_PROJECTS = [
  {
    id: "proj-contractor-foreman",
    title: "Contractor Foreman ERP & PM Rollout",
    category: "ops",
    categoryLabel: "Operational Systems",
    health: "ontrack",
    healthLabel: "On Track",
    stage: "testing",
    stageLabel: "Field QA & Adoption",
    progress: 68,
    targetDate: "2026-09-30",
    startDate: "2026-06-01",
    owner: "Nick Donatelli (Operations Lead)",
    description: "Full enterprise implementation of Contractor Foreman to replace legacy spreadsheets and disconnected PM tools across all active job sites, superintendents, and trade partners.",
    kpis: [
      { name: "Daily Log Compliance", value: "88%", target: "95%" },
      { name: "Active Field Users", value: "24 / 28", target: "28" },
      { name: "Timecard Sync Accuracy", value: "99.4%", target: "100%" },
      { name: "Open Support Tickets", value: "3", target: "0" }
    ],
    milestones: [
      { id: "m1", title: "Cost Codes, Rate Sheets & Roles Configuration", completed: true, targetDate: "2026-06-15" },
      { id: "m2", title: "Data Migration: Active Projects & Subcontractor Master CRM", completed: true, targetDate: "2026-07-10" },
      { id: "m3", title: "Superintendents & PM Field iPad Workflow Training", completed: true, targetDate: "2026-08-01" },
      { id: "m4", title: "Subcontractor Portal Pilot (5 Priority Trade Partners)", completed: false, targetDate: "2026-08-28" },
      { id: "m5", title: "Final Cutover, Accounting Sync & Legacy Tool Deprecation", completed: false, targetDate: "2026-09-30" }
    ],
    assets: [
      { name: "Contractor Foreman Admin Portal", type: "portal", url: "https://app.contractorforeman.com", note: "Super Admin configuration & role management" },
      { name: "Field SOP & Quick Start Guide.pdf", type: "doc", url: "#", note: "Standard operating procedure for daily logs & punch lists" },
      { name: "Subcontractor Onboarding Video Walkthrough", type: "video", url: "#", note: "7-min Loom training for trade partner portal" },
      { name: "Cost Code & Permission Hierarchy Matrix", type: "sheet", url: "#", note: "Master spreadsheet for accounting sync" }
    ],
    notes: "Superintendents are responding very positively to the mobile daily logs photo capture. Next priority is onboarding electrical and plumbing subs into the portal for change orders."
  },
  {
    id: "proj-company-website",
    title: "Next-Gen Corporate Website & Digital Asset Hub",
    category: "digital",
    categoryLabel: "Digital & Brand Assets",
    health: "inreview",
    healthLabel: "In Review",
    stage: "live-ops",
    stageLabel: "Pre-Launch Review",
    progress: 85,
    targetDate: "2026-09-15",
    startDate: "2026-06-15",
    owner: "Nick Donatelli (Digital Assets Specialist)",
    description: "Modern, high-converting corporate web overhaul showcasing luxury residential and commercial builds with project galleries, video case studies, estimate calculators, and local SEO schema.",
    kpis: [
      { name: "Lighthouse Performance", value: "98 / 100", target: "95+" },
      { name: "Case Studies Uploaded", value: "16 / 16", target: "16" },
      { name: "Core Web Vitals LCP", value: "0.85s", target: "< 1.2s" },
      { name: "Target Inbound Lead Uplift", value: "+45%", target: "+35%" }
    ],
    milestones: [
      { id: "m1", title: "Brand Guidelines, Typography & Component Library in Figma", completed: true, targetDate: "2026-06-30" },
      { id: "m2", title: "4K Architectural Drone & Interior Photo Library Ingestion", completed: true, targetDate: "2026-07-20" },
      { id: "m3", title: "Responsive Web Build & Lead Capture Funnel Setup", completed: true, targetDate: "2026-08-10" },
      { id: "m4", title: "Local Schema Markup & Multi-County SEO Citations Audit", completed: false, targetDate: "2026-08-25" },
      { id: "m5", title: "Executive Sign-Off, SSL Verification & DNS Production Switch", completed: false, targetDate: "2026-09-15" }
    ],
    assets: [
      { name: "Figma UI/UX Design System & Master Mockups", type: "figma", url: "#", note: "Design system tokens, mobile & desktop layouts" },
      { name: "High-Res Brand Asset Vault (Dropbox)", type: "vault", url: "#", note: "Vector logos, typography files, print collateral" },
      { name: "Production Staging Server (Vercel/Cloudflare)", type: "server", url: "#", note: "Preview environment for client review" },
      { name: "SEO Keyword Strategy & Meta Copy Master", type: "sheet", url: "#", note: "Geo-targeted keywords and page schema" }
    ],
    notes: "Client portfolio galleries are rendered with instant responsive image optimization. Final step is completing local contractor SEO citation backlinks before DNS switch."
  },
  {
    id: "proj-frontdesk-ai",
    title: "Frontdesk AI 24/7 Phone Receptionist & Triage",
    category: "ai",
    categoryLabel: "AI & Automations",
    health: "ontrack",
    healthLabel: "On Track",
    stage: "development",
    stageLabel: "Voice Tuning & Testing",
    progress: 74,
    targetDate: "2026-09-05",
    startDate: "2026-07-01",
    owner: "Nick Donatelli (Operations Lead)",
    description: "Autonomous voice AI receptionist answering 24/7 inbound phone inquiries, qualifying prospective build clients, providing FAQs, and routing emergency job-site subcontractor calls.",
    kpis: [
      { name: "After-Hours Lead Recovery", value: "94%", target: "90%" },
      { name: "Lead Qualification Accuracy", value: "96%", target: "95%" },
      { name: "Avg Voice Response Latency", value: "680ms", target: "< 750ms" },
      { name: "Monthly AI Minutes Handled", value: "420 min", target: "500 min" }
    ],
    milestones: [
      { id: "m1", title: "Knowledge Base & Conversational Flow Architecture", completed: true, targetDate: "2026-07-15" },
      { id: "m2", title: "Voice Agent Prompt Tuning & Latency Benchmarks", completed: true, targetDate: "2026-07-28" },
      { id: "m3", title: "Emergency Subcontractor Routing & SMS Webhook Alerts", completed: true, targetDate: "2026-08-08" },
      { id: "m4", title: "Live Forwarding Overflow Beta Test (100 Inbound Calls)", completed: false, targetDate: "2026-08-22" },
      { id: "m5", title: "Full 24/7 Primary Phone Line Deployment & CRM Auto-Sync", completed: false, targetDate: "2026-09-05" }
    ],
    assets: [
      { name: "Voice AI Agent Orchestrator & Webhook Config", type: "portal", url: "#", note: "Telephony endpoint and API keys" },
      { name: "Master Conversational Script & Guardrails.md", type: "doc", url: "#", note: "Tone of voice, pricing boundaries, emergency handling" },
      { name: "Inbound Call Recordings & QA Audit Log", type: "sheet", url: "#", note: "Weekly quality control transcript review" },
      { name: "Zapier / CRM Lead Ingestion Pipeline", type: "integration", url: "#", note: "Instant push of caller details to sales pipeline" }
    ],
    notes: "Voice naturalness is testing exceptionally well. Added specific prompt rules to ensure AI never commits to precise pricing on uninspected custom projects."
  },
  {
    id: "proj-permit-tracker",
    title: "County-Wide Building Permit Intelligence Feed",
    category: "data",
    categoryLabel: "Data & Intelligence",
    health: "atrisk",
    healthLabel: "At Risk",
    stage: "development",
    stageLabel: "Connector Ingestion Patch",
    progress: 55,
    targetDate: "2026-10-15",
    startDate: "2026-07-05",
    owner: "Nick Donatelli (Data & Assets Lead)",
    description: "Scheduled daily automated data pipeline ingesting newly issued municipal & county building permits (custom residential, commercial remodels) to power market intelligence and high-value lead acquisition.",
    kpis: [
      { name: "Weekly Permits Ingested", value: "184 / wk", target: "200 / wk" },
      { name: "High-Valuation Leads ($500k+)", value: "42", target: "50 / mo" },
      { name: "Ingestion Pipeline Uptime", value: "96.2%", target: "99%" },
      { name: "Data Extraction Accuracy", value: "99.1%", target: "98%" }
    ],
    milestones: [
      { id: "m1", title: "County Building Dept Schema Mapping & Field Extraction", completed: true, targetDate: "2026-07-05" },
      { id: "m2", title: "Automated Ingestion Scraper & Scheduled Cron Runner", completed: true, targetDate: "2026-07-25" },
      { id: "m3", title: "Patch County Portal Cloudflare/Captcha Authentication Update", completed: false, targetDate: "2026-08-30" },
      { id: "m4", title: "Lead Scoring Engine & High-Valuation Alert Filter ($250k+)", completed: false, targetDate: "2026-09-20" },
      { id: "m5", title: "Weekly Executive Digest & Sales Dispatch Integration", completed: false, targetDate: "2026-10-15" }
    ],
    assets: [
      { name: "Permit Scraper Script (Python/Playwright)", type: "code", url: "#", note: "Scheduled execution script for county portal" },
      { name: "County Building Department Directory & API Registry", type: "doc", url: "#", note: "Jurisdiction URLs, query parameters, schemas" },
      { name: "Live Permit Leads Database & Filter View", type: "table", url: "#permits", note: "Interactive leads database inside this dashboard" },
      { name: "Automated Weekly Email Digest Config", type: "integration", url: "#", note: "Dispatches top 10 luxury permit leads every Monday" }
    ],
    notes: "Marked as At Risk due to county building department website layout update requiring a minor selector & captcha bypass patch by Aug 30. Core data engine remains fully functional."
  }
];

export const SAMPLE_PERMITS_DATA = [
  {
    id: "PERM-2026-8901",
    issueDate: "2026-08-12",
    jurisdiction: "Orange County / Central District",
    permitType: "New Single Family Luxury Residence",
    address: "14280 Ocean Vista Way, Laguna Beach, CA",
    valuation: 2450000,
    ownerName: "Crestview Holdings LLC",
    contractor: "Pending Selection (Owner-Builder Filing)",
    sqft: "6,850 sq ft",
    status: "Issued",
    leadScore: "High Priority"
  },
  {
    id: "PERM-2026-8894",
    issueDate: "2026-08-11",
    jurisdiction: "Newport Beach Municipality",
    permitType: "Custom Estate Remodel & Second Story Addition",
    address: "312 Harbor Island Dr, Newport Beach, CA",
    valuation: 980000,
    ownerName: "Harrison & Elena Vance",
    contractor: "Vance Family Trust",
    sqft: "3,400 sq ft",
    status: "Issued",
    leadScore: "High Priority"
  },
  {
    id: "PERM-2026-8877",
    issueDate: "2026-08-10",
    jurisdiction: "Irvine Planning & Building",
    permitType: "Commercial Tenant Improvement (Medical Suite)",
    address: "18500 Von Karman Ave, Suite 400, Irvine, CA",
    valuation: 650000,
    ownerName: "Pacific Coast Medical Partners",
    contractor: "TBD",
    sqft: "4,200 sq ft",
    status: "Issued",
    leadScore: "Medium"
  },
  {
    id: "PERM-2026-8862",
    issueDate: "2026-08-09",
    jurisdiction: "Dana Point Coastal Zone",
    permitType: "Residential Pool, Cabana & Hardscape Overhaul",
    address: "24801 Monarch Beach Dr, Dana Point, CA",
    valuation: 320000,
    ownerName: "Robert Sterling",
    contractor: "Coastal Waterscape Design",
    sqft: "1,800 sq ft",
    status: "Issued",
    leadScore: "Medium"
  },
  {
    id: "PERM-2026-8845",
    issueDate: "2026-08-08",
    jurisdiction: "San Clemente Building Dept",
    permitType: "Custom Single Family Residence (Ground Up)",
    address: "710 Avenida Talega, San Clemente, CA",
    valuation: 1750000,
    ownerName: "Mariposa Development LLC",
    contractor: "Pending Final Bids",
    sqft: "5,100 sq ft",
    status: "Issued",
    leadScore: "High Priority"
  },
  {
    id: "PERM-2026-8820",
    issueDate: "2026-08-06",
    jurisdiction: "Orange County / North District",
    permitType: "Solar Array + Commercial Warehouse Roof Retrofit",
    address: "4100 E La Palma Ave, Anaheim, CA",
    valuation: 410000,
    ownerName: "Industrial Properties West",
    contractor: "SunPower Commercial Div",
    sqft: "22,000 sq ft",
    status: "Issued",
    leadScore: "Low"
  }
];
