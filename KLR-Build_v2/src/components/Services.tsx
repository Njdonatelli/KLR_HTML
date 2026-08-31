import { Grid, Waves, TreePine, Lightbulb, Utensils, Leaf } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSplitText } from "@/hooks/useSplitText";

const services = [
  {
    title: "3D Design",
    description: "Visualize your dream outdoor space with our advanced 3D rendering technology before construction begins.",
    icon: Grid,
  },
  {
    title: "Hardscapes",
    description: "Expert installation of retaining walls, pavers, concrete work, and other structural elements.",
    icon: Waves,
  },
  {
    title: "Planting & Xeriscape",
    description: "Drought-resistant landscaping solutions perfect for California's climate with beautiful native plants.",
    icon: TreePine,
  },
  {
    title: "Lighting & Irrigation",
    description: "Smart outdoor lighting and efficient irrigation systems to keep your landscape thriving year-round.",
    icon: Lightbulb,
  },
  {
    title: "Outdoor Kitchens",
    description: "Custom outdoor cooking and entertainment spaces with premium appliances and fire features.",
    icon: Utensils,
  },
  {
    title: "Decks & Pergolas",
    description: "Beautiful outdoor structures that expand your living space and add value to your home.",
    icon: Leaf,
  },
];

const Services = () => {
  const introHeadingRef = useSplitText<HTMLHeadingElement>({ preset: "heading-reveal" });
  const introBodyRef = useScrollReveal({ variant: "fade-up", delay: 0.15 });
  const gridHeadingRef = useSplitText<HTMLHeadingElement>({ preset: "heading-reveal" });
  const gridRef = useScrollReveal<HTMLDivElement>({
    variant: "fade-up",
    staggerChildren: "[data-reveal-card]",
    staggerDelay: 0.1,
  });

  return (
    <section className="py-24 bg-surface-warm" id="services">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Intro Section */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <h2
            ref={introHeadingRef}
            className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            We Specialize in the Custom Design and Installation of Outdoor Environments
          </h2>
          <p
            ref={introBodyRef}
            className="text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Experience outdoor living in a whole new way with KLR BUILD's comprehensive experience and knowledge of design and installation. From fire pits and putting greens to outdoor kitchens, pools, and pergolas, we have the craftsmanship to complete it all with great detail and care.
          </p>
        </div>

        {/* Services Grid Section */}
        <div className="text-center mb-12">
          <h2
            ref={gridHeadingRef}
            className="text-4xl font-display font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Our Landscaping Services
          </h2>
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
            Comprehensive outdoor solutions designed for North San Diego County's unique climate and lifestyle
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                data-reveal-card
                className="bg-white rounded-xl p-8 shadow-sm border border-border flex flex-col gap-4 transition-all duration-base ease-out-quart hover:-translate-y-1 hover:shadow-md"
              >
                <div style={{ color: "var(--accent-tertiary)" }}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-xl" style={{ color: "var(--text-primary)" }}>
                  {service.title}
                </h3>
                <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
