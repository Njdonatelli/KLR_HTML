import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useFormStorage } from "@/hooks/useFormStorage";
import { submitLeadToCRM, type LeadPayload } from "@/integrations/crm";
import { toast } from "sonner";
import { gsap } from "@/lib/gsap-register";
import { trackEvent } from "@/hooks/useAnalytics";
import { site, telHref } from "@/config/site";

/** What each step needs before the visitor can move on. */
const STEP_REQUIREMENTS: Record<number, { field: keyof LeadPayload; message: string }[]> = {
  1: [{ field: "projectType", message: "Pick the option closest to your project." }],
  2: [{ field: "budgetRange", message: "Slide to an estimated budget so we can plan the right scope." }],
  3: [
    { field: "street", message: "Enter the street address of the project." },
    { field: "city", message: "Enter the city." },
    { field: "state", message: "Enter the state." },
    { field: "zip", message: "Enter the ZIP code." },
  ],
};

export const LeadForm = () => {
  const [formData, setFormData, clearStorage] = useFormStorage<Partial<LeadPayload>>(
    "klr-build-lead-form",
    {}
  );
  const [step, setStep] = useState(1);
  const [stepError, setStepError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const stepContainerRef = useRef<HTMLDivElement>(null);
  const prevStepRef = useRef(step);

  // Track form abandonment
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (step > 1 && step < 5) {
        trackEvent("form_abandonment", { step, projectType: formData.projectType });
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [step, formData]);

  // GSAP step transition — replaces Framer Motion AnimatePresence
  useLayoutEffect(() => {
    const el = stepContainerRef.current;
    if (!el || step === prevStepRef.current) return;

    const direction = step > prevStepRef.current ? 1 : -1;
    prevStepRef.current = step;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.fromTo(
      el,
      { x: direction * 10, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.25, ease: "power2.out", clearProps: "x" }
    );
  }, [step]);

  // Validate on the attempt to continue, not by disabling the button — a
  // disabled control gives no explanation of what is missing.
  const handleNext = () => {
    const missing = (STEP_REQUIREMENTS[step] ?? []).find(
      ({ field }) => !String(formData[field] ?? "").trim(),
    );
    if (missing) {
      setStepError(missing.message);
      return;
    }
    setStepError(null);
    trackEvent("form_step_completed", { step });
    setStep((s) => Math.min(s + 1, 4));
  };
  const handleBack = () => {
    setStepError(null);
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleChange = (field: keyof LeadPayload, value: string) => {
    setStepError(null);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot: a real person never fills a visually hidden field. Show the
    // success state so the bot has no signal to tune against, and post nothing.
    if (honeypot) {
      setStep(5);
      return;
    }

    setIsSubmitting(true);
    const result = await submitLeadToCRM(formData);
    setIsSubmitting(false);

    if (result.success) {
      trackEvent("lead_submitted", {
        projectType: formData.projectType,
        budgetRange: formData.budgetRange,
      });
      toast.success("Thanks — we'll be in touch within one business day.");
      clearStorage();
      setStep(5); // Success step
      return;
    }

    trackEvent("lead_submit_failed", { reason: result.reason });
    if (result.reason === "validation") {
      setStepError(result.message);
      return;
    }
    // The message names a real phone number, so a failure is still actionable.
    toast.error(result.message);
  };

  if (step === 5) {
    return (
      <div
        role="status"
        className="text-center py-12 px-4 rounded-lg border"
        style={{
          background: "color-mix(in srgb, var(--success) 8%, var(--surface-card))",
          borderColor: "color-mix(in srgb, var(--success) 40%, transparent)",
        }}
      >
        <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--success)" }}>
          Request Received
        </h3>
        <p style={{ color: "var(--text-secondary)" }}>
          We've got your details and will be in touch shortly to schedule your walkthrough.
          Need us sooner? Call{" "}
          <a href={telHref} className="font-semibold underline underline-offset-4">
            {site.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-card rounded-xl shadow-lg border border-border p-6 md:p-8">
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-muted-foreground mb-4">
          <span>Step {step} of 4</span>
          <span>{Math.round((step / 4) * 100)}% Completed</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="min-h-[250px] flex flex-col justify-between" noValidate>
        {/* Honeypot — hidden from people, visible to naive bots. */}
        <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
          <label htmlFor="lead-website">Leave this field empty</label>
          <input
            id="lead-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div ref={stepContainerRef}>
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">What type of project is this?</h3>
              <RadioGroup
                name="projectType"
                value={formData.projectType || ""}
                onValueChange={(val) => handleChange("projectType", val)}
                className="space-y-3"
              >
                {["Custom Landscape", "Hardscaping", "Outdoor Structure", "Other"].map((type) => (
                  <div key={type} className="flex items-center space-x-3 bg-secondary/50 p-4 rounded-lg border border-transparent hover:border-primary/50 transition-colors cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <RadioGroupItem value={type} id={`type-${type}`} />
                    <Label htmlFor={`type-${type}`} className="flex-1 cursor-pointer font-medium">{type}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 mt-4">
              <h3 className="text-xl font-semibold mb-8">What is your estimated budget?</h3>

              <div className="px-2">
                <Slider
                  name="budgetRange"
                  aria-label="Estimated budget"
                  defaultValue={[
                    formData.budgetRange
                      ? parseInt(formData.budgetRange.replace(/[^0-9]/g, ''))
                      : 50000
                  ]}
                  max={1000000}
                  min={1000}
                  step={1000}
                  onValueChange={(vals) => handleChange("budgetRange", `$${vals[0].toLocaleString()}`)}
                  className="py-4"
                />
              </div>

              <div className="text-center mt-8">
                <span className="text-5xl font-display font-bold" style={{ color: "var(--text-primary)" }}>
                  {formData.budgetRange || "$50,000"}
                </span>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Where is the project located?</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="street">Street address</Label>
                  <Input
                    id="street"
                    name="street"
                    autoComplete="address-line1"
                    value={formData.street || ""}
                    onChange={(e) => handleChange("street", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="street2">Suite or unit</Label>
                  <Input
                    id="street2"
                    name="street2"
                    autoComplete="address-line2"
                    value={formData.street2 || ""}
                    onChange={(e) => handleChange("street2", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      value={formData.city || ""}
                      onChange={(e) => handleChange("city", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      autoComplete="address-level1"
                      value={formData.state || ""}
                      onChange={(e) => handleChange("state", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">Zip code</Label>
                    <Input
                      id="zip"
                      name="zip"
                      autoComplete="postal-code"
                      inputMode="numeric"
                      value={formData.zip || ""}
                      onChange={(e) => handleChange("zip", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">How can we reach you?</h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="company">Company name</Label>
                  <Input
                    id="company"
                    name="company"
                    autoComplete="organization"
                    placeholder="Optional"
                    value={formData.company || ""}
                    onChange={(e) => handleChange("company", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      autoComplete="given-name"
                      value={formData.firstName || ""}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      autoComplete="family-name"
                      value={formData.lastName || ""}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1 col-span-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      value={formData.phone || ""}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="phoneExt">Ext.</Label>
                    <Input
                      id="phoneExt"
                      name="phoneExt"
                      autoComplete="tel-extension"
                      inputMode="numeric"
                      value={formData.phoneExt || ""}
                      onChange={(e) => handleChange("phoneExt", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1 col-span-2">
                    <Label htmlFor="phone2">Phone 2</Label>
                    <Input
                      id="phone2"
                      name="phone2"
                      type="tel"
                      autoComplete="work tel"
                      inputMode="tel"
                      value={formData.phone2 || ""}
                      onChange={(e) => handleChange("phone2", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="phone2Ext">Ext.</Label>
                    <Input
                      id="phone2Ext"
                      name="phone2Ext"
                      autoComplete="work tel-extension"
                      inputMode="numeric"
                      value={formData.phone2Ext || ""}
                      onChange={(e) => handleChange("phone2Ext", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="cell">Cell</Label>
                    <Input
                      id="cell"
                      name="cell"
                      type="tel"
                      autoComplete="mobile tel"
                      inputMode="tel"
                      value={formData.cell || ""}
                      onChange={(e) => handleChange("cell", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      value={formData.email || ""}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Announced by screen readers when it appears; also visible text. */}
        <p
          role="alert"
          aria-live="assertive"
          className={`mt-4 text-sm font-medium${stepError ? "" : " hidden"}`}
          style={{ color: "var(--danger)" }}
        >
          {stepError}
        </p>

        <div className="flex justify-between mt-8 pt-4 border-t border-border">
          {step > 1 ? (
            <Button type="button" variant="outline" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <div></div>
          )}

          {step < 4 ? (
            <Button type="button" onClick={handleNext}>
              Continue
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Request Consultation"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
