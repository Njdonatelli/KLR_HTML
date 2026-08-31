import { Heart, ShieldCheck, Award, Users } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSplitText } from "@/hooks/useSplitText";

const About = () => {
  const headingRef = useSplitText<HTMLHeadingElement>({ preset: "heading-reveal" });
  const introRef = useScrollReveal({ variant: "fade-up", delay: 0.1 });
  const cardsRef = useScrollReveal<HTMLDivElement>({
    variant: "fade-up",
    staggerChildren: "[data-reveal-card]",
    staggerDelay: 0.12,
  });
  const commitmentRef = useScrollReveal({ variant: "fade-up" });

  return (
    <section className="py-24 bg-surface-warm" id="about">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            About KLR BUILD
          </h2>
          <p className="text-xl font-medium" style={{ color: "var(--text-secondary)" }}>
            KLR Build - More than a tagline, it's our promise.
          </p>
        </div>

        <div
          ref={introRef}
          className="space-y-6 leading-relaxed text-lg mb-16 max-w-4xl mx-auto text-center"
          style={{ color: "var(--text-secondary)" }}
        >
          <p>
            KLR BUILD was founded on a simple principle: construction should be about building relationships, not just structures. As a family-owned business serving North San Diego County, we understand that your home is more than an investment—it's where life happens.
          </p>
          <p>
            From stunning outdoor living spaces to expansive custom landscapes, our licensed team brings decades of combined experience to every project. We specialize in exterior environments, always with an eye toward quality, durability, and timeless design.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {[
            { icon: Heart, title: "Family-Owned", text: "Built on trust, integrity, and genuine care for every project we touch." },
            { icon: ShieldCheck, title: "Licensed & Insured", text: "License B586838 - Full compliance with all California regulations." },
            { icon: Award, title: "Quality First", text: "We don't cut corners. Every project is built to last generations." },
            { icon: Users, title: "Community Focused", text: "Proud to serve North San Diego County families and businesses." },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              data-reveal-card
              className="bg-white rounded-xl p-8 shadow-sm border border-border transition-all duration-base ease-out-quart hover:-translate-y-1 hover:shadow-md"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "var(--surface-warm)", color: "var(--accent-tertiary)" }}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl mb-2" style={{ color: "var(--text-primary)" }}>
                {title}
              </h3>
              <p style={{ color: "var(--text-secondary)" }}>{text}</p>
            </div>
          ))}
        </div>

        <div
          ref={commitmentRef}
          className="rounded-xl p-8 text-center border"
          style={{
            background: "var(--stone-200)",
            borderColor: "var(--stone-300)",
          }}
        >
          <h3 className="font-display font-bold text-2xl mb-4" style={{ color: "var(--text-primary)" }}>
            Our Commitment
          </h3>
          <p className="leading-relaxed text-lg" style={{ color: "var(--text-secondary)" }}>
            Every project we complete carries our name and reputation. That's why we treat your property with the same care and respect we'd give our own home. It's not just business—it's personal.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
