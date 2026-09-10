import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/design-system/klr-build-design-system-40bc4c";
import { site, telHref } from "@/config/site";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Tells crawlers not to index a miss. A hard 404 status needs host-level
    // config; this is the best a client-rendered SPA can do on its own.
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    document.title = `Page not found | ${site.name}`;
    return () => meta.remove();
  }, []);

  useEffect(() => {
    console.warn("404: no route for", location.pathname);
  }, [location.pathname]);

  return (
    <main id="content" tabIndex={-1}
      className="flex min-h-screen items-center justify-center px-6"
      style={{ background: "var(--surface-sunken)" }}
    >
      <div className="text-center" style={{ maxWidth: 520 }}>
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-label)",
            fontSize: "var(--text-eyebrow)",
            letterSpacing: "var(--tracking-label)",
            textTransform: "uppercase",
            color: "var(--text-accent)",
          }}
        >
          404
        </p>
        <h1
          style={{
            margin: "var(--space-4) 0",
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-h2)",
            fontWeight: 800,
            lineHeight: "var(--leading-tight)",
            color: "var(--text-primary)",
          }}
        >
          That page isn't here
        </h1>
        <p
          style={{
            margin: "0 0 var(--space-8)",
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-body)",
            lineHeight: "var(--leading-relaxed)",
            color: "var(--text-secondary)",
          }}
        >
          The link may be old or mistyped. Head back to the site, or just call us —{" "}
          <a href={telHref} style={{ color: "var(--text-accent)", textDecoration: "underline", textUnderlineOffset: "0.2em" }}>
            {site.phone.display}
          </a>
          .
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/">
            <Button>Back to home</Button>
          </Link>
          <Button href={telHref} variant="secondary">
            Call {site.phone.display}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
