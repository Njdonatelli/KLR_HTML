import React from "react";

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
    return (
      <header
        ref={ref}
        className={className}
        style={{
          position: sticky ? "sticky" : "static",
          top: 0,
          zIndex: 10,
          background: "var(--surface-page)",
          borderBottom: "var(--border-width) solid var(--border-default)",
          ...style,
        }}
        {...rest}
      >
        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "var(--space-6)",
            padding: "var(--space-3) var(--space-6)",
            flexWrap: "wrap",
          }}
        >
          <img src={logoSrc} alt={logoAlt} style={{ height: 44, width: "auto" }} />
          <nav style={{ display: "flex", gap: "var(--space-6)", flexWrap: "wrap" }}>
            {links.map((link) => {
              const active = link.id === activeId;
              return (
                <a
                  key={link.id}
                  href={link.href ?? `#${link.id}`}
                  aria-current={active ? "page" : undefined}
                  onClick={
                    onSelect
                      ? (event) => {
                          event.preventDefault();
                          onSelect(link.id);
                        }
                      : undefined
                  }
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
