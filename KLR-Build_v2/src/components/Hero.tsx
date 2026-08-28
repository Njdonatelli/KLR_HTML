import { Hero as DSHero, Button } from "@/design-system/klr-build-design-system-40bc4c";
import heroImage from "@/assets/hero-construction.jpg";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const Hero = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (imgRef.current) {
            const rect = imgRef.current.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            
            // Only start scrolling once the image is in full view (bottom of image is above viewport bottom)
            // End scrolling when the image is completely scrolled past (bottom of image is above viewport top)
            if (rect.bottom >= viewHeight) {
              setScrollProgress(0);
            } else if (rect.bottom <= 0) {
              setScrollProgress(100);
            } else {
              const progress = ((viewHeight - rect.bottom) / viewHeight) * 100;
              setScrollProgress(progress);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial call
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <DSHero
      id="home"
      eyebrow="Family-Owned · Licensed · Insured"
      headline={
        <>
          Designed with intent.
          <br />
          Built to endure.
        </>
      }
      body="KLR Build is a family-owned general B contractor in Oceanside, California. Custom outdoor environments, hardscaping, and full exterior transformations delivered with the craft and candor a neighbor deserves."
      actions={
        <>
          <Button size="lg" onDark onClick={() => scrollToSection("contact")}>
            Request a Consultation
          </Button>
          <Button size="lg" variant="secondary" onDark onClick={() => navigate("/projects")}>
            View Our Work
          </Button>
        </>
      }
      media={
        <img
          ref={imgRef}
          className="parallax-hero"
          src={heroImage}
          alt="KLR Build crew framing a custom residential project at sunrise"
          fetchPriority="high"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: `${scrollProgress}% 50%`,
            borderRadius: "var(--radius-sm)",
            boxShadow: "var(--shadow-lg)",
            willChange: "object-position",
          }}
        />
      }
    />
  );
};

export default Hero;
