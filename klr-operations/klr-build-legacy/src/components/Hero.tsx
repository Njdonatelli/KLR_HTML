import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign } from "lucide-react";
import heroImage from "@/assets/hero-construction.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="Construction site" className="w-full h-full object-cover animate-scale-in" />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Watercolor-style floating elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-sage/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-sand/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/3 w-56 h-56 bg-pool/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-sand mb-4 animate-slide-up font-body">
          Family-Owned · Licensed · Insured
        </p>
        <h1 className="text-5xl md:text-7xl font-display text-primary-foreground mb-6 animate-slide-up leading-tight">
          Building Your Dreams,<br />
          <span className="text-accent italic">One Project at a Time</span>
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/85 mb-10 max-w-3xl mx-auto animate-slide-up font-body" style={{ animationDelay: "0.2s" }}>
          Quality craftsmanship, reliable service, and trusted relationships — since day one.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <Button variant="hero" size="lg" onClick={() => scrollToSection("contact")} className="text-lg transform hover:scale-105 transition-transform">
            Get Started <ArrowRight className="ml-2" />
          </Button>
          <Button variant="heroPrimary" size="lg" onClick={() => scrollToSection("projects")} className="text-lg transform hover:scale-105 transition-transform border-primary-foreground/30 text-primary-foreground">
            View Projects
          </Button>
          <Button variant="hero" size="lg" asChild className="text-lg transform hover:scale-105 transition-transform">
            <a href="https://www.hfsfinancial.net/promo/69a6621409dad4876e8815fa" target="_blank" rel="noopener noreferrer">
              <DollarSign className="mr-2" /> Financing Available
            </a>
          </Button>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
