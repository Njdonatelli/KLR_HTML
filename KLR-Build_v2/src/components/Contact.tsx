import { LeadForm } from "./LeadForm";

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-4">Request a Consultation</h2>
          <p className="text-muted-foreground text-lg">
            Send the basics and we'll come out, walk the property, and give you an honest read on scope and budget — no charge, no pressure.
          </p>
        </div>
        <LeadForm />
      </div>
    </section>
  );
};

export default Contact;
