import type { Metadata } from "next";
import { PageIntro } from "@/components/site/PageIntro";
import { CtaBand } from "@/components/site/CtaBand";
import { ProcessStep } from "@/components/ui/ProcessStep";
import { processSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "Seven steps from the first design consultation through HOA submission, construction, planting, and the final walk-through — one team, start to finish.",
};

export default function ProcessPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Our Process"
        title="Seven steps, one team, start to finish."
        intro="From the first conversation to the final walk-through, you always know what happens next, when payments land, and who to call."
      />
      <section className="bg-surface-page px-6 py-22">
        <div className="max-w-[720px] mx-auto">
          <ol className="grid gap-9 list-none m-0 p-0">
            {processSteps.map(([title, description], i) => (
              <li key={title}>
                <ProcessStep number={i + 1} title={title} description={description} />
              </li>
            ))}
          </ol>
          <p className="font-body text-body-sm leading-normal text-text-secondary mt-12 mb-0 border-t border-border-default pt-6">
            Payments are tied to milestones — deposit, delivery and installation, plants and turf,
            and the final walk-through — so you always pay for progress you can see.
          </p>
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
