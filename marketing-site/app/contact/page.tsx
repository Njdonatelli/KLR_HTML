import type { Metadata } from "next";
import { PageIntro } from "@/components/site/PageIntro";
import { ContactForm } from "@/components/site/ContactForm";
import { serviceArea } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Schedule a design consultation with KLR Build LLC — call (619) 739-1135 or send a message. Serving Oceanside, Carlsbad, Vista, and greater San Diego County.",
};

export default function ContactPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Choose Local"
        title="Build with confidence."
        intro="Tell us what you're envisioning and we'll schedule the first design consultation — usually within a day."
      />
      <section className="bg-surface-page px-6 py-22">
        <div className="max-w-site mx-auto grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="font-display font-bold text-h3 text-charcoal m-0 mb-6">
              Request a consultation
            </h2>
            <ContactForm />
          </div>
          <div>
            <h2 className="font-display font-bold text-h3 text-charcoal m-0 mb-6">
              Or just call
            </h2>
            <a
              href="tel:+16197391135"
              className="font-display font-extrabold text-h2 text-navy no-underline hover:text-navy-light"
            >
              (619) 739-1135
            </a>
            <address className="font-body text-body leading-relaxed text-text-secondary not-italic mt-5">
              <a
                href="mailto:klrbuildllc@gmail.com"
                className="text-navy underline hover:text-navy-light"
              >
                klrbuildllc@gmail.com
              </a>
              <br />
              697 Chimney Rock Dr
              <br />
              Oceanside, CA 92058
            </address>
            <h3 className="font-display font-bold text-h4 text-charcoal mt-10 mb-3">
              Service area
            </h3>
            <ul className="font-body text-body-sm leading-relaxed text-text-secondary m-0 p-0 list-none flex flex-wrap gap-x-5 gap-y-1.5">
              {serviceArea.map((city) => (
                <li key={city}>{city}</li>
              ))}
            </ul>
            {/* Placeholder until the service-area map treatment is chosen. */}
            <div
              aria-hidden="true"
              className="mt-6 aspect-[16/9] rounded-md border border-dashed border-border-strong bg-stone-100 flex items-center justify-center"
            >
              <span className="font-label text-eyebrow font-semibold tracking-label uppercase text-stone-600 text-center px-6">
                Service area map
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
