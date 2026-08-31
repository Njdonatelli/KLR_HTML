import { ContactForm } from "@/components/site/ContactForm";

export function ContactSection() {
  return (
    <section id="contact" className="bg-charcoal px-6 py-22">
      <div className="max-w-[720px] mx-auto text-center">
        <p className="font-label text-eyebrow font-semibold tracking-label uppercase text-tan mb-2.5">
          Choose Local
        </p>
        <h2 className="font-display font-extrabold text-h2 text-white m-0 mb-4">
          Build with confidence.
        </h2>
        <p className="font-body text-body-lg text-stone-200 m-0 mb-10">
          When you support KLR Build LLC, you are choosing a small family-owned business that values
          flexibility, craftsmanship, clear communication, and a finished space designed around your
          life.
        </p>
        <ContactForm />
        <p className="mt-10 font-body text-[0.875rem] text-stone-300">
          <a href="tel:+16197391135" className="text-stone-300 no-underline hover:text-white">
            (619) 739-1135
          </a>
          {"  ·  "}
          <a
            href="mailto:klrbuildllc@gmail.com"
            className="text-stone-300 no-underline hover:text-white"
          >
            klrbuildllc@gmail.com
          </a>
          {"  ·  "}
          697 Chimney Rock Dr, Oceanside CA 92058
        </p>
      </div>
    </section>
  );
}
