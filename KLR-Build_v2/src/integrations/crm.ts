import { z } from "zod";
import { site } from "@/config/site";

/**
 * Lead + review delivery.
 *
 * Both forms POST to an n8n webhook (self-hosted at klrbuild.app.n8n.cloud);
 * routing to Contractor Foreman, email, and anywhere else happens inside the
 * n8n workflow, not here. The URL is an env var so staging and production can
 * point at different workflows without a code change.
 */

const WEBHOOK_URL = import.meta.env.VITE_LEAD_WEBHOOK_URL as string | undefined;
const REQUEST_TIMEOUT_MS = 15_000;

export const leadSchema = z.object({
  projectType: z.string().min(1).optional(),
  budgetRange: z.string().min(1).optional(),
  company: z.string().max(200).optional(),
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  phone: z.string().trim().min(7, "A reachable phone number is required").max(40),
  phoneExt: z.string().max(10).optional(),
  phone2: z.string().max(40).optional(),
  phone2Ext: z.string().max(10).optional(),
  cell: z.string().max(40).optional(),
  email: z.string().trim().email("Enter a valid email address").max(254),
  street: z.string().trim().min(1, "Street address is required").max(200),
  street2: z.string().max(100).optional(),
  city: z.string().trim().min(1, "City is required").max(100),
  state: z.string().trim().min(2, "State is required").max(50),
  zip: z.string().trim().min(5, "ZIP code is required").max(10),
});

export type LeadPayload = z.infer<typeof leadSchema>;

export const reviewSchema = z.object({
  name: z.string().trim().min(1, "Your name is required").max(100),
  rating: z.number().int().min(1, "Pick a star rating").max(5),
  review: z.string().trim().min(10, "Tell us a little more").max(5000),
});

export type ReviewPayload = z.infer<typeof reviewSchema>;

export type SubmitFailureReason = "validation" | "unconfigured" | "network" | "server";

/**
 * Flat rather than a discriminated union on purpose: this project compiles
 * with `strict: false`, and without strictNullChecks TypeScript will not
 * narrow a `success: true | false` discriminant, so callers would have to
 * cast at every call site. `reason` and `message` are always set on failure.
 */
export interface SubmitResult {
  success: boolean;
  reason?: SubmitFailureReason;
  message?: string;
}

const CONTACT_FALLBACK = `Please call ${site.phone.display} or email ${site.email} and we'll pick it up from there.`;

async function post(kind: "lead" | "review", data: unknown): Promise<SubmitResult> {
  if (!WEBHOOK_URL) {
    console.error(
      "VITE_LEAD_WEBHOOK_URL is not set — form submissions have nowhere to go. See .env.example.",
    );
    return {
      success: false,
      reason: "unconfigured",
      message: `Our form isn't accepting submissions right now. ${CONTACT_FALLBACK}`,
    };
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind,
        submittedAt: new Date().toISOString(),
        sourceUrl: typeof window !== "undefined" ? window.location.href : undefined,
        data,
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error(`Webhook rejected ${kind} submission: ${response.status}`);
      return {
        success: false,
        reason: "server",
        message: `We couldn't submit that just now. ${CONTACT_FALLBACK}`,
      };
    }

    return { success: true };
  } catch (error) {
    console.error(`Webhook request for ${kind} failed`, error);
    return {
      success: false,
      reason: "network",
      message: `We couldn't reach our system. ${CONTACT_FALLBACK}`,
    };
  }
}

export const submitLeadToCRM = async (payload: unknown): Promise<SubmitResult> => {
  const parsed = leadSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      reason: "validation",
      message: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
    };
  }
  return post("lead", parsed.data);
};

export const submitReview = async (payload: unknown): Promise<SubmitResult> => {
  const parsed = reviewSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      reason: "validation",
      message: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
    };
  }
  return post("review", parsed.data);
};
