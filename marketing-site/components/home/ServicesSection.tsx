import { FeatureCard } from "@/components/ui/FeatureCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/content";

export function ServicesSection() {
  return (
    <section id="services" className="bg-surface-page px-6 py-22">
      <div className="max-w-site mx-auto">
        <SectionHeading
          eyebrow="What We Build"
          title="One team for the whole project."
          intro="Design, hardscape, planting, and finish work handled together, so the space arrives cohesive — not in mismatched phases."
        />
        <div className="grid gap-5 mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <FeatureCard key={s.title} title={s.title} description={s.description} tone={s.tone} />
          ))}
        </div>
      </div>
    </section>
  );
}
