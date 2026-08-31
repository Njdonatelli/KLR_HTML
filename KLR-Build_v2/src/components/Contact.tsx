import { LeadForm } from "./LeadForm";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSplitText } from "@/hooks/useSplitText";

const Contact = () => {
  const headingRef = useSplitText<HTMLHeadingElement>({ preset: "heading-reveal" });
  const bodyRef = useScrollReveal({ variant: "fade-up", delay: 0.1 });
  const formRef = useScrollReveal({ variant: "fade-up", delay: 0.2 });

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
      </div>
    </section>
  );
};

export default Contact;
