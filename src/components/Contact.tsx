import { ContactSection } from "@/design-system/klr-build-design-system-40bc4c";

const Contact = () => {
  return (
    <ContactSection
      id="contact"
      eyebrow="Contact Us"
      title="Tell us about the project"
      body="Send the basics and we'll come out, walk the property, and give you an honest read on scope and budget — no charge, no pressure."
      submitLabel="Request a Consultation"
      confirmation="Thanks — we'll be in touch within one business day to schedule your walkthrough."
      contactLine={
        <>
          <a href="tel:+16197391135">(619) 739-1135</a>
          {" · "}
          <a href="mailto:info@klrbuild.com">info@klrbuild.com</a>
          {" · "}
          697 Chimney Rock Drive, Oceanside, CA 92058
          {" · "}
          Mon–Fri 7am–6pm, Sat 8am–4pm
        </>
      }
      onSubmit={(event) => event.preventDefault()}
    />
  );
};

export default Contact;
