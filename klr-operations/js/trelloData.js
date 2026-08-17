/**
 * KLR Build Operations — Trello Pipeline Seed Data & Schema Definition
 * Source Board: "KLR Build Operations" (https://trello.com/b/FPyKFZQp/klr-build-operations)
 * Oceanside, CA — "Designed with Intent. Built to Endure."
 */

export const TRELLO_BOARD_META = {
  id: "6a761bf9cf4fd4ddf74d298b",
  name: "KLR Build Operations",
  shortLink: "FPyKFZQp",
  url: "https://trello.com/b/FPyKFZQp/klr-build-operations",
  principles: [
    "Trello owns STAGE. Contractor Foreman owns MONEY. SalesRabbit owns CAPTURE only. Where they disagree: CF wins on money, Trello wins on stage.",
    "Due date = the next action's deadline, never the project end date.",
    "Every card at stage 5+ carries its CF Customer ID. That field is the only link between this board and the books.",
    "Two hard promises: design delivered day 5-7, HOA submitted day 3-4 post-deposit. Past either clock is red.",
    "No card past stage 5 without a cleared deposit. No materials against an unsigned change order."
  ]
};

export const PIPELINE_STAGES = [
  {
    id: "stage-0",
    trelloListId: "6a76453187e9fe388d028cad",
    num: "0",
    name: "0 Canvassed",
    shortTitle: "Canvassed",
    color: "#64748b",
    exitCondition: "Contact + property confirmed, homeowner not renter.",
    hardPromise: null,
    ownerSystem: "SalesRabbit -> Trello"
  },
  {
    id: "stage-1",
    trelloListId: "6a76453d317c87c64c24a4d9",
    num: "1",
    name: "1 Consult Scheduled",
    shortTitle: "Consult Scheduled",
    color: "#3b82f6",
    exitCondition: "Date on calendar, confirmed by homeowner.",
    hardPromise: "Warn: 7 days out no confirm | Escalate: Consult date passed with no notes",
    ownerSystem: "Trello"
  },
  {
    id: "stage-2",
    trelloListId: "6a764587e2d5f393d840b268",
    num: "2",
    name: "2 Consult Complete",
    shortTitle: "Consult Complete",
    color: "#06b6d4",
    exitCondition: "Scope notes, measurements, photos captured.",
    hardPromise: null,
    ownerSystem: "Trello"
  },
  {
    id: "stage-3",
    trelloListId: "6a764591593d03110f78ee39",
    num: "3",
    name: "3 Design & Estimate",
    shortTitle: "Design & Estimate",
    color: "#8b5cf6",
    exitCondition: "2D/3D rendering + itemized estimate delivered — Day 5-7.",
    hardPromise: "Day 5-7 Hard Promise (Warn @ Day 5, Escalate @ Day 7)",
    ownerSystem: "Trello"
  },
  {
    id: "stage-4",
    trelloListId: "6a7645a0f662841880bd9c3a",
    num: "4",
    name: "4 Proposal Out / Follow-Up",
    shortTitle: "Proposal Out",
    color: "#f59e0b",
    exitCondition: "Homeowner responded yes/no/later. (Where money leaks - requires Next Follow-Up date).",
    hardPromise: "Warn: 3 days no response | Escalate: 10 days, or no follow-up scheduled",
    ownerSystem: "Trello"
  },
  {
    id: "stage-5",
    trelloListId: "6a7645a999fb131306512213",
    num: "5",
    name: "5 Deposit & HOA",
    shortTitle: "Deposit & HOA",
    color: "#ec4899",
    exitCondition: "Deposit cleared; HOA package submitted — Day 3-4 post-deposit. CF Customer ID required.",
    hardPromise: "Day 3-4 Hard Promise post-deposit (Warn @ Day 3, Escalate @ Day 4)",
    ownerSystem: "Trello -> Contractor Foreman"
  },
  {
    id: "stage-6",
    trelloListId: "6a7645b12f791ac78d966046",
    num: "6",
    name: "6 Materials & Schedule",
    shortTitle: "Materials & Schedule",
    color: "#14b8a6",
    exitCondition: "Materials ordered with dates, crew/subs booked.",
    hardPromise: "Warn: 5 days no order confirmations | Escalate: crew booked with no materials ETA",
    ownerSystem: "Contractor Foreman"
  },
  {
    id: "stage-7",
    trelloListId: "6a7645bb112aa9f3b5490728",
    num: "7",
    name: "7 In Construction",
    shortTitle: "In Construction",
    color: "#10b981",
    exitCondition: "Install complete through plants/turf.",
    hardPromise: "Warn: 3 days no daily log | Escalate: weather/inspection hold with no revised date",
    ownerSystem: "Contractor Foreman"
  },
  {
    id: "stage-8",
    trelloListId: "6a7645c58d6bc2fb194ab04e",
    num: "8",
    name: "8 Walk-Through & Close",
    shortTitle: "Walk-Through & Close",
    color: "#6366f1",
    exitCondition: "Punch list cleared, final invoice paid, review requested.",
    hardPromise: "Warn: 7 days punch list open | Escalate: 14 days final invoice unpaid",
    ownerSystem: "Contractor Foreman & Trello"
  },
  {
    id: "stage-won",
    trelloListId: "6a7645cef00528c58f6ddaa0",
    num: "W",
    name: "Won — Closed",
    shortTitle: "Won — Closed",
    color: "#10b981",
    exitCondition: "Final payment cleared and project archived.",
    hardPromise: null,
    ownerSystem: "Contractor Foreman"
  },
  {
    id: "stage-lost",
    trelloListId: "6a7645d98b61548784a76d1b",
    num: "L",
    name: "Lost / Cold",
    shortTitle: "Lost / Cold",
    color: "#ef4444",
    exitCondition: "Lead gone cold or homeowner declined scope.",
    hardPromise: null,
    ownerSystem: "SalesRabbit / Archive"
  }
];

export const SERVICE_LINES = [
  { id: "patio", name: "Patio/Hardscape", color: "#10b981", bg: "rgba(16, 185, 129, 0.15)", icon: "🧱" },
  { id: "pool", name: "Pool/Spa", color: "#0284c7", bg: "rgba(2, 132, 199, 0.15)", icon: "🏊" },
  { id: "room", name: "Four Season Room", color: "#8b5cf6", bg: "rgba(139, 92, 246, 0.15)", icon: "🏡" },
  { id: "firepit", name: "Water Feature/Firepit", color: "#0ea5e9", bg: "rgba(14, 165, 233, 0.15)", icon: "🔥" },
  { id: "turf", name: "Turf/Planting/Irrigation", color: "#84cc16", bg: "rgba(132, 204, 22, 0.15)", icon: "🌿" }
];

export const STATUS_FLAGS = [
  { id: "hoa_req", name: "HOA Required", color: "#f97316", bg: "rgba(249, 115, 22, 0.15)" },
  { id: "permit_req", name: "Permit Required", color: "#eab308", bg: "rgba(234, 179, 8, 0.15)" },
  { id: "deposit_cleared", name: "Deposit Cleared", color: "#ec4899", bg: "rgba(236, 72, 153, 0.15)" },
  { id: "design_revision", name: "Design Revision", color: "#eab308", bg: "rgba(234, 179, 8, 0.15)" },
  { id: "change_order", name: "Change Order Open", color: "#f97316", bg: "rgba(249, 115, 22, 0.15)" },
  { id: "hold", name: "Weather/Inspection Hold", color: "#ef4444", bg: "rgba(239, 68, 68, 0.15)" },
  { id: "punch_list", name: "Punch List Open", color: "#3b82f6", bg: "rgba(59, 130, 246, 0.15)" },
  { id: "at_risk", name: "At Risk", color: "#ef4444", bg: "rgba(239, 68, 68, 0.15)" },
  { id: "referral", name: "Repeat/Referral", color: "#64748b", bg: "rgba(100, 116, 139, 0.15)" }
];

export const PIPELINE_RULES_GUIDES = [
  {
    id: "rule-1",
    num: 1,
    title: "1. START HERE — How this board works",
    shortSummary: "Division of labor, the 9 stages, exit conditions, and the two hard promises.",
    content: `**This board is the pipeline.** If a job isn't on it at the right stage, it isn't being tracked.

## Division of labor
- **SalesRabbit** — capture and territory. Owns stage 0 only. Once a consult is booked, its copy of the lead is historical.
- **Trello (here)** — pipeline STATE. The single answer to "what stage is this job in."
- **Contractor Foreman** — system of RECORD. Estimates, contracts, change orders, scheduling, daily logs, invoicing.

**Tiebreakers:** Disagree about money → CF wins. Disagree about stage → Trello wins.

## The nine stages and their exit conditions
A card cannot advance until its exit condition is met. That is the entire point of the stage.

| # | Stage | Exit condition |
|---|---|---|
| 0 | Canvassed | Contact + property confirmed, homeowner not renter |
| 1 | Consult Scheduled | Date on calendar, confirmed by homeowner |
| 2 | Consult Complete | Scope notes, measurements, photos captured |
| 3 | Design & Estimate | 2D/3D + itemized estimate delivered — **day 5-7** |
| 4 | Proposal Out | Homeowner responded yes/no/later |
| 5 | Deposit & HOA | Deposit cleared; HOA package submitted — **day 3-4** |
| 6 | Materials & Schedule | Materials ordered with dates, crew/subs booked |
| 7 | In Construction | Install complete through plants/turf |
| 8 | Walk-Through & Close | Punch list cleared, final invoice paid, review requested |

## The two hard promises
Stage 3 (5-7 day design) and stage 5 (3-4 day HOA submittal) are what we advertise. They are the most common source of silent slippage. A card past either clock is red, not yellow.

**Stage 4 is where the money leaks.** A delivered proposal with no response and no scheduled follow-up is the single most common way we lose a job.`
  },
  {
    id: "rule-2",
    num: 2,
    title: "2. Card conventions — required on every job",
    shortSummary: "Title format, next action due date, service line labels, and custom fields.",
    content: `Missing fields are the most common reason a job goes quiet. Fill them; don't work around them.

## Title
\`[Service] — Last Name — Street\`
e.g. \`Patio + Firepit — Ruiz — Vista Grande Dr\`

## Due date
Always the **next action's deadline**. Never the project end date. A due date three months out on a build tells you nothing on a Monday morning.

## Labels
**Service line — exactly one:** Patio/Hardscape · Pool/Spa · Four Season Room · Water Feature/Firepit · Turf/Planting/Irrigation

**Status flags — as many as apply:**
- \`HOA Required\` · \`Permit Required\` — set at stage 2
- \`Deposit Cleared\` — the at-a-glance flag; the DATE goes in the custom field
- \`Design Revision\` — homeowner sent it back. The 5-7 day clock does not restart silently
- \`Change Order Open\` — scope added, not signed. **Nothing is ordered or built until it clears**
- \`Weather/Inspection Hold\` — pair with a revised date the same day
- \`Punch List Open\` — stage 8 open items
- \`At Risk\` — an aging threshold was breached
- \`Repeat/Referral\` — prior client or referred. Know before you discount

## Custom fields
| Field | Type | Set when |
|---|---|---|
| Estimate Value | number | estimate itemized in CF |
| Consult Date | date | consult booked |
| Design Started | date | card enters stage 3 |
| Design Delivered | date | 2D/3D + estimate sent |
| Deposit Cleared | date | funds actually cleared |
| HOA Submitted | date | package submitted |
| CF Customer ID | text | CF customer created |
| Next Follow-Up | date | **every touch on a stage 4 card** |

Dates are what the aging thresholds measure. A blank date field is an unmeasurable job.

---
**CF Customer ID is not optional at stage 5+.** CF exposes no project, estimate, or invoice object to automation, so that ID is the only thing making the board and the books reconcilable. Paste it by hand when you create the CF customer.`
  },
  {
    id: "rule-3",
    num: 3,
    title: "3. Aging thresholds — when to warn, when to escalate",
    shortSummary: "Deliberately tight SLAs for North County homeowners: warn (yellow) and escalate (red).",
    content: `Deliberately tight. Residential homeowners go cold fast.

| Stage | Warn (yellow) | Escalate (red) |
|---|---|---|
| 1 Consult Scheduled | 7 days out, no confirm | consult date passed, no notes |
| 3 Design & Estimate | day 5 | **day 7 — promise broken** |
| 4 Proposal Out | 3 days no response | 10 days, or no follow-up scheduled |
| 5 Deposit & HOA | day 3 post-deposit | **day 4 — promise broken** |
| 6 Materials & Schedule | 5 days no order confirmations | crew booked with no materials ETA |
| 7 In Construction | 3 days no daily log | weather/inspection hold with no revised date |
| 8 Walk-Through | 7 days punch list open | 14 days final invoice unpaid |

## Red means one of two things only
A stated promise is breached, or a deposit has been taken and the job isn't moving. Everything else is yellow. If nothing meets that bar, the red section of the weekly review is honestly empty — don't inflate it.

## Weather and inspection are inputs, not excuses
North County rain and HOA/city inspection windows are foreseeable. A job held on either gets a **revised date on the card the same day**. A hold with no new date is an escalation regardless of stage.`
  },
  {
    id: "rule-4",
    num: 4,
    title: "4. Handoffs — what is automated, what stays manual",
    shortSummary: "SalesRabbit to Trello, Trello to Contractor Foreman at Stage 5, and human gatekeeping.",
    content: `## SalesRabbit → Trello (stage 0 → 1)
Fires when a lead's status changes to the consult-booked status.
- **Automated:** card created in \`1 Consult Scheduled\`, description carries lead ID/link, address, phone, email, service interest, canvasser. Due date = consult date.
- **Manual:** access notes, decision-maker names, HOA name — added on the confirmation call.
- **Guard:** the SalesRabbit trigger fires on EVERY lead update. Without a status filter you get a duplicate card each time a rep touches a lead.

## Trello → Contractor Foreman (stage 5)
Fires on **deposit**, not on proposal. Creating CF customers for unsigned prospects pollutes the system of record.
- **Automated:** CF \`create customer\` — name, address, phone, email. That is genuinely all automation can do here.
- **Manual, in CF:** create the project, enter estimate and contract, set schedule and crew, record deposit, configure progress billing.
- **Manual, back here:** paste the CF Customer ID into the custom field.

## Contractor Foreman → Trello (stages 6-8)
CF's outbound surface is nearly empty. The \`file uploaded\` trigger can comment on a card when a signed contract, permit, or HOA response lands — treat that comment as a notification, not truth. Matching is by customer name and is imperfect.

**Stage 6, 7, and 8 advancement is a human moving a card at the Monday review.** That's deliberate. The volume is small; automating it adds fragility, not speed.

## Never automate
Estimate and contract entry · scheduling and crew assignment · change orders · any homeowner-facing message.`
  },
  {
    id: "rule-5",
    num: 5,
    title: "5. Monday review + weekly reconciliation",
    shortSummary: "Right-to-left board walk (Stage 8 to Stage 1) and 5-point integrity checklist.",
    content: `## Working principles
**One next action per job.** A status update without a named next action, an owner, and a date is not finished. Homeowners stall on ambiguity; so do crews.

**Money before motion.** Never advance a card past stage 5 without deposit confirmation. Never order materials against an unsigned change order. A verbal "while you're here, could you also…" **is** a change order — it goes in writing before anyone touches it. Change orders are how small hardscape jobs lose their margin.

**Separate known from suspected.** Don't guess job values or dates. A confident wrong pipeline number is worse than no number.

## Monday review order
1. Walk the board right to left — stage 8 back to stage 1. Closing beats starting.
2. Every card: is the due date the NEXT action? If not, fix it before moving on.
3. Apply the aging thresholds (see card 3). Label \`At Risk\`.
4. Advance stage 6-8 cards manually from what CF actually shows.

## Reconciliation checklist
- [ ] Every card at stage 5+ has a CF Customer ID → missing means the job isn't in the books
- [ ] Every CF project has a card here → missing means it's invisible to review
- [ ] Every SalesRabbit lead with a booked consult has a card → missing means the intake Zap failed or its filter is wrong
- [ ] Estimate Values match CF → **CF wins**, correct the card
- [ ] Cards in \`Won — Closed\` have paid final invoices in CF

Items 1 and 3 catch the two failures this setup actually produces: jobs on the board but not in the books, and leads captured but never on the board.`
  }
];

export const INITIAL_PIPELINE_CARDS = [
  {
    id: "card-chris-jackson",
    trelloCardId: "6a7a590570bc1c47ddf6a095",
    title: "Patio/Hardscape — Jackson — 935 East Cross Rd",
    lastName: "Jackson",
    serviceLine: "patio",
    serviceLineLabel: "Patio/Hardscape",
    stage: "stage-2",
    stageName: "2 Consult Complete",
    estimateValue: 48500,
    due: "2026-08-18T17:00:00.000Z",
    nextAction: "Generate 2D terrain model and finalize itemized paver estimate in CF",
    phone: "658-749-6845",
    email: "chris.jackson@contractorforeman.com",
    address: "935 East Cross Rd, Rock Hill, SC 29730",
    cfCustomerId: "",
    consultDate: "2026-08-10",
    designStarted: "",
    designDelivered: "",
    depositClearedDate: "",
    hoaSubmittedDate: "",
    nextFollowUpDate: "",
    labels: ["patio", "hoa_req"],
    checklist: [
      { id: "c1", name: "Scope notes, measurements & drone photos captured", completed: true },
      { id: "c2", name: "Utility marking requested (811 Call)", completed: true },
      { id: "c3", name: "Initial 2D sketch & terrain elevation notes logged", completed: true },
      { id: "c4", name: "Customer imported from Contractor Foreman", completed: false },
      { id: "c5", name: "Contract signed and deposit secured", completed: false }
    ],
    notes: "Client is looking for a multi-level concrete paver patio with integrated low-voltage lighting and gas firepit rough-in. HOA submittal package will be required.",
    lastActivity: "2026-08-10T23:05:23.000Z"
  },
  {
    id: "card-test-design",
    trelloCardId: "6a7807c51271e475a753b7fa",
    title: "Pool/Spa + Hardscape — Henderson — 1420 Oceanview Ave",
    lastName: "Henderson",
    serviceLine: "pool",
    serviceLineLabel: "Pool/Spa",
    stage: "stage-3",
    stageName: "3 Design & Estimate",
    estimateValue: 128000,
    due: "2026-08-15T06:59:59.000Z",
    nextAction: "Deliver 3D Lumion rendering and itemized CF estimate to homeowner (Day 6 SLA)",
    phone: "760-555-0192",
    email: "m.henderson@coastalreach.com",
    address: "1420 Oceanview Ave, Oceanside, CA 92054",
    cfCustomerId: "CF-CUST-8841",
    consultDate: "2026-08-05",
    designStarted: "2026-08-08T19:00:00.000Z",
    designDelivered: "",
    depositClearedDate: "",
    hoaSubmittedDate: "",
    nextFollowUpDate: "",
    labels: ["pool", "permit_req", "at_risk"],
    checklist: [
      { id: "c1", name: "2D AutoCAD dimension plan completed", completed: true },
      { id: "c2", name: "3D architectural render generated", completed: true },
      { id: "c3", name: "Itemized subcontractor bid sheet in CF completed", completed: false },
      { id: "c4", name: "Formal presentation PDF emailed to client", completed: false }
    ],
    notes: "Design started Aug 8. Currently at Day 6 of the 5-7 day hard promise clock. Must deliver estimate before end of day Aug 15 to avoid SLA escalation.",
    lastActivity: "2026-08-09T06:09:46.000Z"
  },
  {
    id: "card-ruiz-firepit",
    trelloCardId: "card-demo-ruiz",
    title: "Patio + Firepit — Ruiz — Vista Grande Dr",
    lastName: "Ruiz",
    serviceLine: "firepit",
    serviceLineLabel: "Water Feature/Firepit",
    stage: "stage-4",
    stageName: "4 Proposal Out / Follow-Up",
    estimateValue: 64500,
    due: "2026-08-16T15:00:00.000Z",
    nextAction: "Follow-up call on travertine paver selection and gas line tie-in approval",
    phone: "760-439-8120",
    email: "antonio.ruiz@gmail.com",
    address: "3820 Vista Grande Dr, Oceanside, CA 92056",
    cfCustomerId: "CF-CUST-8104",
    consultDate: "2026-07-28",
    designStarted: "2026-07-30",
    designDelivered: "2026-08-05",
    depositClearedDate: "",
    hoaSubmittedDate: "",
    nextFollowUpDate: "2026-08-16",
    labels: ["firepit", "hoa_req", "referral"],
    checklist: [
      { id: "c1", name: "2D/3D design delivered and acknowledged", completed: true },
      { id: "c2", name: "Homeowner feedback logged (liked 3D firepit layout)", completed: true },
      { id: "c3", name: "Revised budget options sent", completed: true },
      { id: "c4", name: "Deposit invoice issued via Contractor Foreman", completed: false }
    ],
    notes: "Stage 4 active follow-up. Proposal out Aug 5. Homeowner expressed enthusiasm, reviewing contract with spouse.",
    lastActivity: "2026-08-12T14:20:00.000Z"
  },
  {
    id: "card-alvarez-deposit",
    trelloCardId: "card-demo-alvarez",
    title: "Turf/Planting — Alvarez — 410 Mission Ave",
    lastName: "Alvarez",
    serviceLine: "turf",
    serviceLineLabel: "Turf/Planting/Irrigation",
    stage: "stage-5",
    stageName: "5 Deposit & HOA",
    estimateValue: 38000,
    due: "2026-08-16T12:00:00.000Z",
    nextAction: "Submit architectural review packet to Rancho Del Oro HOA (Day 2 post-deposit)",
    phone: "760-722-9901",
    email: "elena.alvarez@sbcglobal.net",
    address: "410 Mission Ave, Oceanside, CA 92054",
    cfCustomerId: "CF-CUST-8910",
    consultDate: "2026-07-20",
    designStarted: "2026-07-22",
    designDelivered: "2026-07-27",
    depositClearedDate: "2026-08-13",
    hoaSubmittedDate: "",
    nextFollowUpDate: "",
    labels: ["turf", "hoa_req", "deposit_cleared"],
    checklist: [
      { id: "c1", name: "Initial 50% deposit cleared in bank account", completed: true },
      { id: "c2", name: "CF Customer ID linked and verified", completed: true },
      { id: "c3", name: "HOA application package signed by client", completed: true },
      { id: "c4", name: "HOA packet submitted (Due Day 3-4 post-deposit)", completed: false }
    ],
    notes: "Deposit cleared Aug 13. Hard promise SLA: HOA packet must be submitted by Aug 17 (Day 4).",
    lastActivity: "2026-08-13T18:00:00.000Z"
  },
  {
    id: "card-gallagher-construction",
    trelloCardId: "card-demo-gallagher",
    title: "Four Season Room — Gallagher — Coast Hwy",
    lastName: "Gallagher",
    serviceLine: "room",
    serviceLineLabel: "Four Season Room",
    stage: "stage-7",
    stageName: "7 In Construction",
    estimateValue: 142000,
    due: "2026-08-17T09:00:00.000Z",
    nextAction: "City of Oceanside Framing & Electrical rough inspection on site",
    phone: "760-966-4100",
    email: "dan.gallagher@cox.net",
    address: "1850 S Coast Hwy, Oceanside, CA 92054",
    cfCustomerId: "CF-CUST-7920",
    consultDate: "2026-05-10",
    designStarted: "2026-05-15",
    designDelivered: "2026-05-21",
    depositClearedDate: "2026-06-01",
    hoaSubmittedDate: "2026-06-04",
    nextFollowUpDate: "",
    labels: ["room", "permit_req", "change_order"],
    checklist: [
      { id: "c1", name: "Foundation & concrete slab cured", completed: true },
      { id: "c2", name: "Aluminum post & beam framing erected", completed: true },
      { id: "c3", name: "Rough electrical & motorized louvers wiring", completed: true },
      { id: "c4", name: "Signed Change Order #1 for infrared patio heaters ($4,800)", completed: true },
      { id: "c5", name: "Framing & Electrical inspection passed", completed: false }
    ],
    notes: "Active build. Daily logs up to date in Contractor Foreman. Change Order #1 signed and billed.",
    lastActivity: "2026-08-14T11:30:00.000Z"
  },
  {
    id: "card-template-sample",
    trelloCardId: "6a76217327499f45e7626873",
    title: "[TEMPLATE] New Project Card",
    lastName: "Template",
    serviceLine: "patio",
    serviceLineLabel: "Patio/Hardscape",
    stage: "stage-0",
    stageName: "0 Canvassed",
    estimateValue: 0,
    due: "",
    nextAction: "Perform initial phone qualification & schedule site consultation",
    phone: "",
    email: "",
    address: "",
    cfCustomerId: "",
    consultDate: "",
    designStarted: "",
    designDelivered: "",
    depositClearedDate: "",
    hoaSubmittedDate: "",
    nextFollowUpDate: "",
    labels: [],
    checklist: [
      { id: "c1", name: "Lead imported from SalesRabbit", completed: false },
      { id: "c2", name: "Site visit and drone mapping scheduled", completed: false },
      { id: "c3", name: "Initial estimate sent to client", completed: false },
      { id: "c4", name: "Contract signed and deposit secured", completed: false },
      { id: "c5", name: "Project data transferred to Contractor Foreman", completed: false }
    ],
    notes: "Template card with standard field conventions. Duplicate this when logging new leads manually.",
    lastActivity: "2026-08-10T17:35:39.000Z"
  }
];
