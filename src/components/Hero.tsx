import { Hero as DSHero, Button } from "@/design-system/klr-build-design-system-40bc4c";
import heroImage from "@/assets/hero-construction.jpg";

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const Hero = () => {
  return (
    <DSHero
      id="home"
      eyebrow="Family-Owned · Licensed · Insured"
      headline="Designed with intent. Built to endure."
      body="KLR Build is a family-owned general B contractor in Oceanside, California. Custom homes, additions, and full remodels delivered with the craft and candor a neighbor deserves."
      actions={
        <>
          <Button size="lg" onDark onClick={() => scrollToSection("contact")}>
            Request a Consultation
          </Button>
          <Button size="lg" variant="secondary" onDark onClick={() => scrollToSection("projects")}>
            View Our Work
          </Button>
          <Button size="lg" variant="ghost" onDark onClick={() => window.open("https://www.hfsfinancial.net/promo/69a6621409dad4876e8815fa", "_blank", "noopener,noreferrer")}>
            Financing Available
          </Button>
        </>
      }
      media={
        <img
          src={heroImage}
          alt="KLR Build crew framing a custom residential project at sunrise"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "var(--radius-sm)",
            boxShadow: "var(--shadow-lg)",
          }}
        />
      }
    />
  );
};

export default Hero;
