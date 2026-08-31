import { FeatureCard } from "@/components/ui/FeatureCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const services = [
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
] as const;

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
