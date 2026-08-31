import { ProcessStep } from "@/components/ui/ProcessStep";
import { processSteps as steps } from "@/lib/content";

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
