import { FeatureCard } from "@/components/ui/FeatureCard";
import { StatCard } from "@/components/ui/StatCard";

const stats = [
  {
    stat: "8–15%",
    label: "Typical patio / outdoor living ROI",
    description:
      "Outdoor living spaces are regularly valued because they expand usable square footage and buyer appeal.",
    tone: "navy",
  },
  {
    stat: "3 costs",
    label: "That waiting can trigger",
    description:
      "Inflation, site damage, and the inefficiency of revisiting demolition, material selection, and scheduling later.",
    tone: "bronze",
  },
  {
    stat: "1 vision",
    label: "Delivered together",
    description:
      "Bundling layout, drainage, hardscape, and planting keeps the job cohesive and avoids mismatched phases.",
    tone: "olive",
  },
] as const;

const features = [
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
] as const;

export function ValueSection() {
  return (
    <section id="value" className="bg-stone-100 px-6 py-22">
      <div className="max-w-site mx-auto">
        <p className="font-label text-eyebrow font-semibold tracking-label uppercase text-navy mb-2.5">
          Add Value Now
        </p>
        <h2 className="font-display font-extrabold text-h2 text-charcoal m-0 mb-12 max-w-[640px]">
          Avoid paying more later.
        </h2>
        <div className="grid gap-8 mb-16 sm:grid-cols-3">
          {stats.map((s) => (
            <StatCard key={s.label} stat={s.stat} label={s.label} description={s.description} tone={s.tone} />
          ))}
        </div>
        <h3 className="font-display font-bold text-h3 text-charcoal m-0 mb-7">
          Why customers choose KLR Build
        </h3>
        <div className="grid gap-5 sm:grid-cols-3">
          {features.map((f) => (
            <FeatureCard key={f.title} title={f.title} description={f.description} tone={f.tone} />
          ))}
        </div>
      </div>
    </section>
  );
}
