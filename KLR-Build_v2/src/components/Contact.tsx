import { LeadForm } from "./LeadForm";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSplitText } from "@/hooks/useSplitText";
import { mailtoHref, site, telHref } from "@/config/site";

const Contact = () => {
  const headingRef = useSplitText<HTMLHeadingElement>({ preset: "heading-reveal" });
  const bodyRef = useScrollReveal({ variant: "fade-up", delay: 0.1 });
  const formRef = useScrollReveal({ variant: "fade-up", delay: 0.2 });
  const detailsRef = useScrollReveal({ variant: "fade-up", delay: 0.3 });

  return (
    <section id="contact" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 ref={headingRef} className="text-3xl font-display font-bold mb-4">
            Request a Consultation
          </h2>
          <p ref={bodyRef} className="text-muted-foreground text-lg">
            Send the basics and we'll come out, walk the property, and give you an honest read on scope and budget — no charge, no pressure.
          </p>
        </div>

        <div ref={formRef}>
          <LeadForm />
        </div>

        {/*
          Direct contact routes sit under the form on purpose: if the form ever
          fails, its error message tells people to call — so the number has to
          be visible on the same screen.
        */}
        <div
          ref={detailsRef}
          className="w-full max-w-xl mx-auto mt-8 text-center"
          style={{ color: "var(--text-secondary)" }}
        >
          <p className="mb-2">
            Would rather talk to someone?{" "}
            <a
              href={telHref}
              className="font-semibold underline underline-offset-4"
              style={{ color: "var(--text-accent)" }}
            >
              {site.phone.display}
            </a>{" "}
            ·{" "}
            <a
              href={mailtoHref}
              className="font-semibold underline underline-offset-4"
              style={{ color: "var(--text-accent)" }}
            >
              {site.email}
            </a>
          </p>
          <address className="not-italic text-sm" style={{ color: "var(--text-muted)" }}>
            {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}
            <br />
            {site.hours.display} · {site.license.display}
          </address>
        </div>
      </div>
    </section>
  );
};

export default Contact;
