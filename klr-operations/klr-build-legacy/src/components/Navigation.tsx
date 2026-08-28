import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import klrLogo from "@/assets/klr-logo.jpeg";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <img src={klrLogo} alt="KLR BUILD" className="h-14 w-auto rounded-md" />

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {["home", "about", "services", "projects", "blog"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="font-body text-sm uppercase tracking-widest hover:text-accent transition-colors"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
            <Button variant="hero" onClick={() => scrollToSection("contact")}>
              Get A Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-border/30 pt-4">
            {["home", "about", "services", "projects", "blog"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-left font-body text-sm uppercase tracking-widest hover:text-accent transition-colors"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
            <Button variant="hero" onClick={() => scrollToSection("contact")} className="w-full">
              Get A Quote
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
