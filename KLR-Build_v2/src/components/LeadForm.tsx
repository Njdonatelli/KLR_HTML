import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useFormStorage, LeadPayload } from "@/hooks/useFormStorage";
import { submitLeadToCRM } from "@/integrations/crm";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/hooks/useAnalytics";

export const LeadForm = () => {
  const [formData, setFormData, clearStorage] = useFormStorage<Partial<LeadPayload>>(
    "klr-build-lead-form",
    {}
  );
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);

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

  const handleNext = () => {
    trackEvent("form_step_completed", { step });
    setStep((s) => Math.min(s + 1, 4));
  };
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleChange = (field: keyof LeadPayload, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast.error("Please fill in all required contact details.");
      return;
    }

    setIsSubmitting(true);
    const result = await submitLeadToCRM(formData as LeadPayload);
    setIsSubmitting(false);

    if (result.success) {
      toast.success("Thanks — we'll be in touch within one business day!");
      clearStorage();
      setStep(5); // Success step
    } else {
      toast.error("Something went wrong. Please try again or contact us directly.");
    }
  };

  if (step === 5) {
    return (
      <div className="text-center py-12 px-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
        <h3 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400 mb-2">Request Received</h3>
        <p className="text-emerald-600 dark:text-emerald-300">
          We've got your details and will be in touch shortly to schedule your walkthrough.
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

      <form onSubmit={handleSubmit} className="min-h-[250px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">What type of project is this?</h3>
                <RadioGroup
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
                  <span className="text-5xl font-display font-bold text-[#3a352a]">
                    {formData.budgetRange || "$50,000"}
                  </span>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Where is the project located?</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2 relative">
                    <Label htmlFor="street">Street address</Label>
                    <Input
                      id="street"
                      placeholder="Start typing to autofill..."
                      value={formData.street || ""}
                      onChange={async (e) => {
                        const val = e.target.value;
                        handleChange("street", val);
                        
                        if (val.length > 3) {
                          try {
                            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(val)}&countrycodes=us&addressdetails=1&limit=5`);
                            const data = await res.json();
                            setAddressSuggestions(data);
                          } catch (err) {
                            console.error("Failed to fetch address suggestions", err);
                          }
                        } else {
                          setAddressSuggestions([]);
                        }
                      }}
                      onBlur={() => setTimeout(() => setAddressSuggestions([]), 200)}
                      className="relative z-10"
                    />
                    {addressSuggestions.length > 0 && (
                      <div className="absolute top-[100%] left-0 w-full mt-1 bg-white border border-border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                        {addressSuggestions.map((suggestion: any) => (
                          <div
                            key={suggestion.place_id}
                            className="p-3 hover:bg-secondary cursor-pointer text-sm text-[#3a352a]"
                            onClick={() => {
                              const addr = suggestion.address;
                              const house = addr.house_number || "";
                              const road = addr.road || "";
                              const streetVal = house || road ? `${house} ${road}`.trim() : suggestion.display_name.split(",")[0];
                              const cityVal = addr.city || addr.town || addr.village || addr.county || "";
                              
                              setFormData(prev => ({
                                ...prev,
                                street: streetVal,
                                city: cityVal,
                                state: addr.state || "",
                                zip: addr.postcode || "",
                              }));
                              setAddressSuggestions([]);
                            }}
                          >
                            {suggestion.display_name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="street2">Suite or unit</Label>
                    <Input
                      id="street2"
                      value={formData.street2 || ""}
                      onChange={(e) => handleChange("street2", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city || ""}
                        onChange={(e) => handleChange("city", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.state || ""}
                        onChange={(e) => handleChange("state", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">Zip code</Label>
                      <Input
                        id="zip"
                        value={formData.zip || ""}
                        onChange={(e) => handleChange("zip", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                <h3 className="text-xl font-semibold mb-4">How can we reach you?</h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="company">Company name</Label>
                    <Input
                      id="company"
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
                        value={formData.firstName || ""}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
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
                        type="tel"
                        value={formData.phone || ""}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="phoneExt">Ext.</Label>
                      <Input
                        id="phoneExt"
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
                        type="tel"
                        value={formData.phone2 || ""}
                        onChange={(e) => handleChange("phone2", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="phone2Ext">Ext.</Label>
                      <Input
                        id="phone2Ext"
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
                        type="tel"
                        value={formData.cell || ""}
                        onChange={(e) => handleChange("cell", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email">Email address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email || ""}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8 pt-4 border-t border-border">
          {step > 1 ? (
            <Button type="button" variant="outline" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <div></div> // Spacer
          )}

          {step < 4 ? (
            <Button
              type="button"
              onClick={handleNext}
              disabled={
                (step === 1 && !formData.projectType) ||
                (step === 2 && !formData.budgetRange) ||
                (step === 3 && (!formData.street || !formData.city || !formData.state || !formData.zip))
              }
            >
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
