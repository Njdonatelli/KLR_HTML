import { Shield, ThumbsUp, Users, CheckCircle } from "lucide-react";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Shield,
      title: "Licensed & Insured",
      description: "Full licensing and comprehensive insurance coverage for your peace of mind.",
    },
    {
      icon: ThumbsUp,
      title: "Expert Craftsmanship",
      description: "Skilled professionals with years of experience in all construction disciplines.",
    },
    {
      icon: Users,
      title: "Client-Focused",
      description: "Your vision and satisfaction are at the heart of everything we do.",
    },
    {
      icon: CheckCircle,
      title: "Quality Guaranteed",
      description: "We stand behind our work with solid warranties and ongoing support.",
    },
  ];

  return (
    <section className="py-24 section-alt">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-sm uppercase tracking-[0.25em] text-accent mb-3 font-body">Our Promise</p>
          <h2 className="text-4xl md:text-5xl font-display mb-6">Why Choose KLR BUILD?</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6 rounded-full" />
          <p className="text-lg text-muted-foreground font-body leading-relaxed">
            We combine family values with professional excellence to deliver construction projects that exceed expectations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {reasons.map((reason, index) => (
            <div key={index} className="text-center group">
              <div className="w-18 h-18 mx-auto mb-5 w-[72px] h-[72px] rounded-full bg-accent flex items-center justify-center accent-glow group-hover:scale-110 transition-transform">
                <reason.icon className="text-accent-foreground" size={28} />
              </div>
              <h3 className="text-xl font-display mb-3">{reason.title}</h3>
              <p className="text-muted-foreground font-body">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
