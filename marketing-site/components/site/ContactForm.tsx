"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  return (
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
  );
}
