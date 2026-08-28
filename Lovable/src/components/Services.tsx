import { SectionHeading, FeatureCard, Badge } from "@/design-system/klr-build-design-system-40bc4c";

const services = [
  {
    title: "Residential Construction",
    description: "Ground-up custom homes and additions, from lot survey and Title 24 through final walkthrough.",
    tone: "navy" as const,
  },
  {
    title: "Kitchens & Baths",
    description: "Full gut remodels with cabinetry, tile, and plumbing coordinated on one schedule.",
    tone: "olive" as const,
  },
  {
    title: "Outdoor Living",
    description: "Hardscape, decks, pergolas, pools, and fire features that extend the house into the yard.",
    tone: "bronze" as const,
  },
  {
    title: "Commercial Tenant Work",
    description: "Office and retail improvements delivered around your hours, not ours.",
    tone: "outline" as const,
  },
  {
    title: "Structural Repair",
    description: "Foundation, dry rot, and seismic retrofit work with engineered plans and permits.",
    tone: "outline" as const,
  },
  {
    title: "Custom Carpentry",
    description: "Built-ins, stair work, and millwork detailed in our own shop and installed by the same hands.",
    tone: "outline" as const,
  },
];

const Services = () => {
  return (
    <section
      id="services"
      style={{
        background: "var(--surface-page)",
        padding: "var(--space-24) var(--space-6)",
      }}
    >
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "var(--space-8)",
            flexWrap: "wrap",
            marginBottom: "var(--space-12)",
          }}
        >
          <SectionHeading
            eyebrow="What We Do"
            title="Six disciplines, one general contractor"
            intro="Licensed general B, so the whole project stays under one contract, one schedule, and one point of accountability."
            style={{ maxWidth: 620 }}
          />
          <Badge tone="olive">CSLB Licensed &amp; Insured</Badge>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "var(--space-6)",
          }}
        >
          {services.map((service) => (
            <FeatureCard
              key={service.title}
              title={service.title}
              description={service.description}
              tone={service.tone}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
