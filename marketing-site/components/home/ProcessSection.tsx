import { ProcessStep } from "@/components/ui/ProcessStep";

const steps = [
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
] as const;

export function ProcessSection() {
  return (
    <section id="process" className="bg-surface-page px-6 py-22">
      <div className="max-w-site mx-auto">
        <p className="font-label text-eyebrow font-semibold tracking-label uppercase text-navy mb-2.5">
          Our Process
        </p>
        <h2 className="font-display font-extrabold text-h2 text-charcoal m-0 mb-12 max-w-[640px]">
          Seven steps, one team, start to finish.
        </h2>
        <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {steps.map(([title, description], i) => (
            <ProcessStep key={title} number={i + 1} title={title} description={description} />
          ))}
        </div>
      </div>
    </section>
  );
}
