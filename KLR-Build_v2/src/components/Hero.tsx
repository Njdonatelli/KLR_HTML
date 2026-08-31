import { Hero as DSHero, Button } from "@/design-system/klr-build-design-system-40bc4c";
import heroImage from "@/assets/hero-construction.jpg";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { scrollTo } from "@/lib/smooth-scroll";
import { useSplitText } from "@/hooks/useSplitText";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Hero = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const headlineRef = useSplitText<HTMLHeadingElement>({
    preset: "hero-reveal",
    trigger: "mount",
    delay: 0.3,
  });

  // GSAP parallax on hero image
  useEffect(() => {
    if (prefersReducedMotion() || !imgRef.current || !imgWrapRef.current) return;

    const tween = gsap.to(imgRef.current, {
      yPercent: 15,
      scale: 1.05,
      ease: "none",
      scrollTrigger: {
        trigger: imgWrapRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  // Staggered fade-in for eyebrow, body, actions after headline
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const targets = [eyebrowRef.current, bodyRef.current, actionsRef.current].filter(Boolean);
    if (targets.length === 0) return;

    gsap.set(targets, { opacity: 0, y: 20 });

    const tween = gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.15,
      delay: 1.0, // After headline animation completes
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <DSHero
      id="home"
      eyebrow={<span ref={eyebrowRef}>Family-Owned · Licensed · Insured</span>}
      headline={
        <span ref={headlineRef}>
          Designed with intent. Built to endure.
        </span>
      }
      body={
        <p ref={bodyRef} style={{ margin: 0 }}>
          KLR Build is a family-owned general B contractor in Oceanside, California. Custom outdoor environments, hardscaping, and full exterior transformations delivered with the craft and candor a neighbor deserves.
        </p>
      }
      actions={
        <div ref={actionsRef} style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
          <Button size="lg" onDark onClick={() => scrollTo("contact")}>
            Request a Consultation
          </Button>
          <Button size="lg" variant="secondary" onDark onClick={() => navigate("/projects")}>
            View Our Work
          </Button>
        </div>
      }
      media={
        <div ref={imgWrapRef} style={{ width: "100%", height: "100%", overflow: "hidden", borderRadius: "var(--radius-sm)" }}>
          <img
            ref={imgRef}
            src={heroImage}
            alt="KLR Build crew framing a custom residential project at sunrise"
            fetchPriority="high"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 40%",
              boxShadow: "var(--shadow-lg)",
              willChange: "transform",
            }}
          />
        </div>
      }
    />
  );
};

export default Hero;
