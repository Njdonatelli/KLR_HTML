import { BadgeCheck, Users, Star, DollarSign } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSplitText } from "@/hooks/useSplitText";

const items = [
  {
    icon: BadgeCheck,
    title: "San Diego's Local Choice",
    text: "With a legacy spanning over a decade, our experience in outdoor design remains unmatched, making us the go-to choice for locals seeking excellent landscaping services.",
  },
  {
    icon: Users,
    title: "Expertise and Experience",
    text: "When it comes to outdoor design, we've got the expertise that locals trust. We deliver unbeatable results consistently.",
  },
  {
    icon: Star,
    title: "Quality and Craftsmanship",
    text: "When it comes to quality and craftsmanship, we're the real deal. Our team takes pride in delivering the best results that stand the test of time.",
  },
  {
    icon: DollarSign,
    title: "Affordable Financing Options",
    text: "We've partnered with financing providers to offer great financing options for your next Home Improvement project.",
  },
];

const WhyChooseUs = () => {
  const headingRef = useSplitText<HTMLHeadingElement>({ preset: "heading-reveal" });
  const gridRef = useScrollReveal<HTMLDivElement>({
    variant: "fade-up",
    staggerChildren: "[data-reveal-card]",
    staggerDelay: 0.12,
  });

  return (
    <section className="py-24 bg-white" id="why-choose-us">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl font-display font-bold text-center mb-16"
          style={{ color: "var(--text-primary)" }}
        >
          Why Choose KLR BUILD?
        </h2>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {items.map(({ icon: Icon, title, text }) => (
            <div key={title} data-reveal-card className="flex flex-col items-center gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "var(--surface-warm)", color: "var(--accent-tertiary)" }}
              >
                <Icon className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-xl" style={{ color: "var(--text-primary)" }}>
                {title}
              </h3>
              <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
