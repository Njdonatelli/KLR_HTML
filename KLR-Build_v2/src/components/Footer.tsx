import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import logo from "@/design-system/klr-build-design-system-40bc4c/assets/logos/logo-light-text.webp";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { mailtoHref, site, telHref } from "@/config/site";

const linkStyle: CSSProperties = {
  color: "var(--text-on-inverse)",
  textDecoration: "none",
};

const headingStyle: CSSProperties = {
  margin: "0 0 var(--space-3)",
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-caption)",
  letterSpacing: "var(--tracking-wide)",
  textTransform: "uppercase",
  color: "var(--tan)",
};

const bodyStyle: CSSProperties = {
  margin: 0,
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-body)",
  lineHeight: "var(--leading-relaxed)",
  color: "var(--text-on-inverse)",
};

const Footer = () => {
  const footerRef = useScrollReveal({ variant: "fade-up", duration: 0.6 });

  return (
    <footer
      ref={footerRef}
      style={{
        background: "var(--charcoal)",
        borderTop: "var(--border-width) solid var(--bronze-dark)",
        padding: "var(--space-16) var(--space-6) var(--space-10)",
      }}
    >
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "var(--space-10)" }}>
          <div className="flex flex-col" style={{ gap: "var(--space-4)", alignItems: "flex-start" }}>
            <img src={logo} alt={site.legalName} width={493} height={192} loading="lazy" style={{ height: "var(--space-16)", width: "auto" }} />
            <p style={{ ...bodyStyle, maxWidth: 320 }}>
              {site.tagline}
              <br />
              Family owned and operated in {site.address.city}, California.
            </p>
          </div>

          <div>
            <h2 style={headingStyle}>Contact</h2>
            <address style={{ ...bodyStyle, fontStyle: "normal" }}>
              <a href={telHref} style={linkStyle}>
                {site.phone.display}
              </a>
              <br />
              <a href={mailtoHref} style={linkStyle}>
                {site.email}
              </a>
              <br />
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </address>
            <p style={{ ...bodyStyle, marginTop: "var(--space-3)", color: "var(--stone-300)" }}>
              {site.hours.display}
            </p>
          </div>

          <div>
            <h2 style={headingStyle}>Site</h2>
            <ul style={{ ...bodyStyle, listStyle: "none", padding: 0, margin: 0 }}>
              <li>
                <Link to="/#services" style={linkStyle}>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/projects" style={linkStyle}>
                  Our work
                </Link>
              </li>
              <li>
                <Link to="/journal" style={linkStyle}>
                  Journal
                </Link>
              </li>
              <li>
                <Link to="/#contact" style={linkStyle}>
                  Request a consultation
                </Link>
              </li>
            </ul>
            <p style={{ ...bodyStyle, marginTop: "var(--space-4)", color: "var(--stone-300)" }}>
              Serving {site.serviceArea[0]}
            </p>
          </div>
        </div>

        {/*
          California Business & Professions Code §7030.5 requires the contractor
          license number on all advertising. Do not remove.
        */}
        <div
          style={{
            marginTop: "var(--space-12)",
            paddingTop: "var(--space-6)",
            borderTop: "1px solid var(--stone-700)",
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-4)",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-label)",
              fontSize: "var(--text-caption)",
              letterSpacing: "var(--tracking-wide)",
              textTransform: "uppercase",
              color: "var(--stone-300)",
            }}
          >
            Licensed &amp; insured · {site.license.display}
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-label)",
              fontSize: "var(--text-caption)",
              letterSpacing: "var(--tracking-wide)",
              textTransform: "uppercase",
              color: "var(--stone-400)",
            }}
          >
            © {new Date().getFullYear()} {site.legalName}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
