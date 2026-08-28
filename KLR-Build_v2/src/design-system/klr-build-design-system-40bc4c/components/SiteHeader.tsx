import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export interface SiteHeaderLink {
  id: string;
  label: string;
  href?: string;
}

export interface SiteHeaderProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  /** Logo image source. Use a dark-text lockup — it sits on a light surface. */
  logoSrc: string;
  logoAlt?: string;
  links: SiteHeaderLink[];
  /** id of the currently active link. */
  activeId?: string;
  onSelect?: (id: string) => void;
  sticky?: boolean;
}

export const SiteHeader = React.forwardRef<HTMLElement, SiteHeaderProps>(
  function SiteHeader(
    {
      logoSrc,
      logoAlt = "KLR Build LLC",
      links,
      activeId,
      onSelect,
      sticky = true,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
      <header
        ref={ref}
        className={className}
        style={{
          position: sticky ? "sticky" : "static",
          top: 0,
          zIndex: 10,
          background: "color-mix(in srgb, var(--surface-page) 85%, transparent)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "var(--border-width) solid color-mix(in srgb, var(--border-default) 50%, transparent)",
          ...style,
        }}
        {...rest}
      >
        <div
          className="flex items-center justify-between w-full mx-auto"
          style={{
            maxWidth: "var(--container-max)",
            padding: "var(--space-3) var(--space-6)",
          }}
        >
          <img src={logoSrc} alt={logoAlt} style={{ height: 44, width: "auto" }} />
          
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-[var(--navy)]">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          <nav className={`${isMobileMenuOpen ? "flex absolute top-full left-0 right-0 bg-[color-mix(in_srgb,var(--surface-page)_95%,transparent)] backdrop-blur-xl shadow-lg flex-col p-6 border-b border-[var(--border-default)] items-start" : "hidden"} md:flex md:static md:flex-row md:shadow-none md:bg-transparent md:p-0 md:border-none md:gap-6 md:items-center`}>
            {links.map((link) => {
              const active = link.id === activeId;
              return (
                <a
                  key={link.id}
                  href={link.href ?? `#${link.id}`}
                  className="w-full md:w-auto py-3 md:py-0"
                  aria-current={active ? "page" : undefined}
                  onClick={(event) => {
                    setIsMobileMenuOpen(false);
                    if (onSelect) {
                      event.preventDefault();
                      onSelect(link.id);
                    }
                  }}
                  style={{
                    fontFamily: "var(--font-label)",
                    fontSize: "var(--text-body-sm)",
                    fontWeight: "var(--weight-semibold)" as unknown as number,
                    letterSpacing: "var(--tracking-wide)",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    color: active ? "var(--navy)" : "var(--text-secondary)",
                    borderBottom: `2px solid ${active ? "var(--navy)" : "transparent"}`,
                    paddingBottom: "var(--space-1)",
                    transition: "color 150ms ease, border-color 150ms ease",
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>
      </header>
    );
  },
);
