import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SiteHeader } from "@/design-system/klr-build-design-system-40bc4c";
import logo from "@/design-system/klr-build-design-system-40bc4c/assets/logos/logo-dark-text.png";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "why-choose-us", label: "Process" },
  { id: "blog", label: "Journal" },
  { id: "contact", label: "Contact" },
];

const Navigation = () => {
  const [activeId, setActiveId] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/projects") {
      setActiveId("projects");
    } else if (location.pathname === "/journal") {
      setActiveId("blog");
    } else if (location.hash) {
      const id = location.hash.replace("#", "");
      setActiveId(id);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      setActiveId("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  const handleSelect = (id: string) => {
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
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <SiteHeader
      logoSrc={logo}
      logoAlt="KLR Build LLC"
      links={links}
      activeId={activeId}
      onSelect={handleSelect}
    />
  );
};

export default Navigation;

