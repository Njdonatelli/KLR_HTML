"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function ContactSection() {
  const [sent, setSent] = useState(false);
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
        <div aria-live="polite">
          {sent ? (
            <div className="bg-navy text-white rounded-md p-7 font-body">
              Thanks — we&rsquo;ll be in touch within a day to schedule your consultation.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="grid gap-4 text-left sm:grid-cols-2"
            >
              <Input name="name" placeholder="Name" required />
              <Input name="contact" placeholder="Phone or email" required />
              <div className="sm:col-span-2">
                <Input name="message" placeholder="What are you envisioning?" multiline />
              </div>
              <div className="sm:col-span-2 grid">
                <Button variant="tan" type="submit">
                  Request a Consultation
                </Button>
              </div>
            </form>
          )}
        </div>
        <p className="mt-10 font-body text-[0.875rem] text-stone-300">
          <a href="tel:+16197391135" className="text-stone-300 no-underline hover:text-white">
            (619) 739-1135
          </a>
          {"  ·  "}
          <a
            href="mailto:klrbuildllc@gmail.com"
            className="text-stone-300 no-underline hover:text-white"
          >
            klrbuildllc@gmail.com
          </a>
          {"  ·  "}
          697 Chimney Rock Dr, Oceanside CA 92058
        </p>
      </div>
    </section>
  );
}
