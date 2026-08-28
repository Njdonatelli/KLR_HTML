import { useState } from "react";
import { SiteHeader } from "@/design-system/klr-build-design-system-40bc4c";
import logo from "@/design-system/klr-build-design-system-40bc4c/assets/logos/logo-dark-text.png";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "process", label: "Process" },
  { id: "blog", label: "Journal" },
  { id: "contact", label: "Contact" },
];

const Navigation = () => {
  const [activeId, setActiveId] = useState("home");

  const handleSelect = (id: string) => {
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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
