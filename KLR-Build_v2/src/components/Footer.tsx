import logo from "@/design-system/klr-build-design-system-40bc4c/assets/logos/logo-light-text.png";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Footer = () => {
  const footerRef = useScrollReveal({ variant: "fade-up", duration: 0.6 });

  return (
    <footer
      ref={footerRef}
      style={{
        background: "var(--charcoal)",
        borderTop: "var(--border-width) solid var(--bronze-dark)",
        padding: "var(--space-16) var(--space-6)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-8)",
        }}
      >
        <img src={logo} alt="KLR Build LLC" style={{ height: "var(--space-16)", width: "auto" }} />
        <p
          style={{
            margin: 0,
            maxWidth: 420,
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-body)",
            lineHeight: "var(--leading-relaxed)",
            color: "var(--text-on-inverse)",
          }}
        >
          Designed with intent. Built to endure.<br />
          Family owned and operated in Oceanside, California.
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
          © {new Date().getFullYear()} KLR Build LLC
        </p>
      </div>
    </footer>
  );
};

export default Footer;
