export type Tone = "navy" | "olive" | "bronze";

export const services: ReadonlyArray<{ title: string; description: string; tone: Tone }> = [
  {
    title: "Patios",
    description:
      "Covered and open-air patios designed around how you actually live outside — dining, lounging, shade, and flow from the house.",
    tone: "navy",
  },
  {
    title: "Hardscape",
    description:
      "Concrete, pavers, and retaining walls installed to drainage and grading standards that keep the work solid for decades.",
    tone: "olive",
  },
  {
    title: "Pools & Water Features",
    description:
      "Pools, spas, and water features integrated into the landscape design rather than dropped into it.",
    tone: "bronze",
  },
  {
    title: "Turf & Planting",
    description:
      "Low-maintenance turf and plants selected together at the nursery, suited to the San Diego climate.",
    tone: "navy",
  },
  {
    title: "Fire Features",
    description:
      "Fire pits and fireplaces that anchor the yard and extend your evenings outdoors year-round.",
    tone: "olive",
  },
  {
    title: "Four-Season Rooms",
    description:
      "Enclosed living spaces that blur the line between indoors and out, usable every month of the year.",
    tone: "bronze",
  },
];

export const processSteps: ReadonlyArray<readonly [string, string]> = [
  [
    "Initial Design Consultation",
    "We schedule the first visit to learn what you are envisioning, how you want the space to feel, and what priorities matter most.",
  ],
  [
    "Design Preview",
    "In 5–7 days we return with 2D and 3D renderings plus a detailed, itemized estimate that brings the ideas to life.",
  ],
  [
    "Deposit and HOA Submission",
    "After the deposit is received, HOA plans are typically submitted within 3–4 days so the approval process can begin quickly.",
  ],
  [
    "Commencement",
    "Construction generally starts 1–2 weeks after approval while materials, site logistics, and the timeline are finalized.",
  ],
  [
    "Delivery and Installment",
    "Materials are delivered and installed. The second payment is due at this time.",
  ],
  [
    "Plants and Turf",
    "We meet at the nursery to choose plants together. The third payment is due at this time.",
  ],
  [
    "Final Walk Through",
    "We meet at the property to go over the final results. The final payment is due at this time.",
  ],
];

/* Placeholder entries until the CMS is wired; shaped like the future project documents. */
export const projects: ReadonlyArray<{
  title: string;
  location: string;
  category: string;
  tag: string;
  tone: Tone;
}> = [
  {
    title: "Full-yard transformation",
    location: "Oceanside",
    category: "Hardscape",
    tag: "Hardscape + Turf",
    tone: "navy",
  },
  {
    title: "Backyard retreat",
    location: "Carlsbad",
    category: "Pools & Water Features",
    tag: "Pool & Patio",
    tone: "olive",
  },
  {
    title: "Evening entertaining yard",
    location: "Vista",
    category: "Fire Features",
    tag: "Fire Feature",
    tone: "bronze",
  },
  {
    title: "Coastal patio refresh",
    location: "Oceanside",
    category: "Patios",
    tag: "Patio + Shade",
    tone: "navy",
  },
  {
    title: "Four-season garden room",
    location: "San Marcos",
    category: "Four-Season Rooms",
    tag: "Four-Season Room",
    tone: "olive",
  },
  {
    title: "Drought-smart front yard",
    location: "Encinitas",
    category: "Turf & Planting",
    tag: "Turf & Planting",
    tone: "bronze",
  },
];

export const whyChoose: ReadonlyArray<{ title: string; description: string; tone: Tone }> = [
  {
    title: "Tailored Design",
    description:
      "No generic packages. Projects are shaped around lifestyle, taste, budget, and how each family actually uses the home.",
    tone: "navy",
  },
  {
    title: "Responsive Service",
    description:
      "Questions are answered, updates are shared, and clients stay connected from planning through completion.",
    tone: "olive",
  },
  {
    title: "Family-Owned",
    description:
      "Clients are not passed through a giant system. They work with a team that values trust, flexibility, and accountability.",
    tone: "bronze",
  },
];

export const serviceArea = [
  "Oceanside",
  "Carlsbad",
  "Vista",
  "San Marcos",
  "Encinitas",
  "Escondido",
  "San Diego County",
];
