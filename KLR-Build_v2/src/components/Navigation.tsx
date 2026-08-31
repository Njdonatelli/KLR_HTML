import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SiteHeader } from "@/design-system/klr-build-design-system-40bc4c";
import logo from "@/design-system/klr-build-design-system-40bc4c/assets/logos/logo-dark-text.png";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { scrollTo } from "@/lib/smooth-scroll";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "why-choose-us", label: "Process" },
  { id: "blog", label: "Journal" },
  { id: "contact", label: "Contact" },
];

const SECTION_IDS = ["home", "hero", "about", "services", "projects", "why-choose-us", "reviews", "contact"];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Navigation = () => {
  const [activeId, setActiveId] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll-direction show/hide + shrink-on-scroll
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const trigger = ScrollTrigger.create({
      start: "top -80",
      end: "max",
      onUpdate: (self) => {
        setIsScrolled(self.progress > 0);
        // Hide when scrolling down past 80px, show when scrolling up
        if (self.direction === 1 && self.scroll() > 200) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }
      },
    });

    return () => trigger.kill();
  }, []);

  // Active section detection via ScrollTrigger
  useEffect(() => {
    if (location.pathname !== "/") return;

    const triggers: ScrollTrigger[] = [];

    // Small delay to ensure DOM sections are rendered
    const timer = setTimeout(() => {
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const trigger = ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            const mappedId = id === "hero" ? "home" : id === "reviews" ? "contact" : id;
            setActiveId(mappedId);
          },
          onEnterBack: () => {
            const mappedId = id === "hero" ? "home" : id === "reviews" ? "contact" : id;
            setActiveId(mappedId);
          },
        });
        triggers.push(trigger);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      triggers.forEach((t) => t.kill());
    };
  }, [location.pathname]);

  // Handle route-based active state
  useEffect(() => {
    if (location.pathname === "/projects") {
      setActiveId("projects");
    } else if (location.pathname === "/journal") {
      setActiveId("blog");
    } else if (location.hash) {
      const id = location.hash.replace("#", "");
      setActiveId(id);
      setTimeout(() => scrollTo(id), 100);
    } else if (location.pathname === "/") {
      // Active detection handled by ScrollTrigger above
    }
  }, [location]);

  const handleSelect = useCallback(
    (id: string) => {
      if (id === "projects") {
        navigate("/projects");
      } else if (id === "blog") {
        navigate("/journal");
      } else {
        if (location.pathname !== "/") {
          navigate(`/#${id}`);
        } else {
          setActiveId(id);
          if (id === "home") {
            scrollTo(document.body, { duration: 1.0 });
          } else {
            scrollTo(id);
          }
        }
      }
    },
    [location.pathname, navigate],
  );

  return (
    <SiteHeader
      ref={headerRef}
      logoSrc={logo}
      logoAlt="KLR Build LLC"
      links={links}
      activeId={activeId}
      onSelect={handleSelect}
      style={{
        transform: isHidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.4s var(--ease-out-expo), padding 0.3s var(--ease-out-quart)",
        ...(isScrolled
          ? { boxShadow: "var(--shadow-md)" }
          : {}),
      }}
    />
  );
};

export default Navigation;
