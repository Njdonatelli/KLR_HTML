import { Users, Award, Clock } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-24 bg-background watercolor-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-sm uppercase tracking-[0.25em] text-accent mb-3 font-body">Who We Are</p>
          <h2 className="text-4xl md:text-5xl font-display mb-6">About KLR BUILD</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6 rounded-full" />
          <p className="text-lg text-muted-foreground font-body leading-relaxed">
            We're a family-owned and operated construction company committed to delivering exceptional quality and building lasting relationships. With decades of combined experience, we bring expertise, integrity, and passion to every project.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { icon: Users, title: "Family Values", desc: "Family-owned means we treat every client like family, with care, respect, and dedication." },
            { icon: Award, title: "Quality First", desc: "We never compromise on quality. Every project receives our full attention and expertise." },
            { icon: Clock, title: "On Time, On Budget", desc: "Reliable scheduling and transparent pricing. No surprises, just honest work." },
          ].map((item, i) => (
            <div key={i} className="text-center p-8 rounded-xl bg-card border border-border/50 hover:shadow-xl transition-all duration-300 stone-texture hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-sage/15 flex items-center justify-center">
                <item.icon className="text-sage" size={30} />
              </div>
              <h3 className="text-xl font-display mb-3">{item.title}</h3>
              <p className="text-muted-foreground font-body">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
