import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSplitText } from "@/hooks/useSplitText";
import { submitReview } from "@/integrations/crm";
import { trackEvent } from "@/hooks/useAnalytics";

/**
 * One testimonial, taken verbatim from page 9 of KLR's own presentation deck.
 *
 * The two entries that used to sit here — "Ryan Brock" and "Marla Rochelle" —
 * were confirmed fabricated by the owner on 2026-09-07 and have been removed.
 * Do not re-add a testimonial without a named, consenting client behind it.
 *
 * This one is unattributed because the deck does not name the client either;
 * the headshot printed beside it in the deck is a stock portrait, not a
 * customer, so no photograph is shown. Add the name once it is confirmed.
 */
const reviews = [
  {
    id: 1,
    name: null as string | null,
    rating: 5,
    text: "We couldn't be more impressed with the transformation of our front and backyard into a truly elevated outdoor living space. The craftsmanship—from the beautiful concrete and paver hardscape to the turf, thoughtfully selected plants, and seamless irrigation system—is exceptional. Their team combines creative vision with expert execution, making the entire process smooth and enjoyable. If you're looking for a team that delivers high-quality results and brings your vision to life, we highly recommend them.",
  },
];

export const CustomerReviews = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const headingRef = useSplitText<HTMLHeadingElement>({ preset: "heading-reveal" });
  const formRef = useScrollReveal({ variant: "fade-left" });
  const reviewsRef = useScrollReveal<HTMLDivElement>({
    variant: "fade-right",
    staggerChildren: "[data-reveal-card]",
    staggerDelay: 0.15,
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Honeypot: a real person never fills a visually hidden field. Silently
    // accept so the bot has no signal to tune against.
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    const result = await submitReview({ name, rating, review });
    setIsSubmitting(false);

    if (result.success) {
      trackEvent("review_submitted", { rating });
      setSubmitted(true);
      return;
    }

    toast.error(result.message);
  };

  return (
    <section className="py-24 bg-surface-warm" id="reviews">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl font-display font-bold text-center mb-16"
          style={{ color: "var(--text-primary)" }}
        >
          Customer Reviews
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Form */}
          <div ref={formRef} className="bg-card rounded-xl p-8 shadow-sm border border-border">
            <h3
              className="text-2xl font-display font-bold mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              Leave a Review
            </h3>

            {submitted ? (
              <div role="status" className="py-8">
                <p className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                  Thank you.
                </p>
                <p className="mt-2" style={{ color: "var(--text-secondary)" }}>
                  We read every one of these. If you asked us something, we'll follow up directly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Honeypot — hidden from people, visible to naive bots. */}
                <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                  <label htmlFor="company-website">Leave this field empty</label>
                  <input
                    id="company-website"
                    name="company-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-muted-foreground font-medium">
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="border-border"
                    style={{ background: "color-mix(in srgb, var(--surface-warm) 50%, transparent)" }}
                    required
                  />
                </div>

                <fieldset className="space-y-2">
                  <legend className="text-muted-foreground font-medium text-sm">Rating</legend>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        aria-label={`${star} star${star === 1 ? "" : "s"}`}
                        aria-pressed={rating === star}
                        className="rounded-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        style={{ outlineColor: "var(--accent-tertiary)" }}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                      >
                        <Star
                          className="w-6 h-6 transition-colors duration-fast"
                          style={
                            star <= (hoverRating || rating)
                              ? { fill: "var(--warning)", color: "var(--warning)" }
                              : { fill: "transparent", color: "var(--text-muted)" }
                          }
                        />
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="space-y-2">
                  <Label htmlFor="review" className="text-muted-foreground font-medium">
                    Your Review
                  </Label>
                  <Textarea
                    id="review"
                    name="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Share your experience with us..."
                    className="min-h-[120px] border-border resize-none"
                    style={{ background: "color-mix(in srgb, var(--surface-warm) 50%, transparent)" }}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-white font-medium py-6 text-lg rounded-md transition-all duration-base ease-out-quart hover:shadow-md"
                  style={{ background: "var(--accent-tertiary)" }}
                >
                  {isSubmitting ? "Submitting…" : "Submit Review"}
                </Button>
              </form>
            )}
          </div>

          {/* Right Column: Reviews */}
          <div ref={reviewsRef} className="space-y-8">
            <h3
              className="text-2xl font-display font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              What Our Customers Say
            </h3>
            <div className="space-y-6">
              {reviews.map((entry) => (
                <div
                  key={entry.id}
                  data-reveal-card
                  className="bg-card rounded-xl p-8 shadow-sm border border-border flex flex-col gap-4 transition-all duration-base ease-out-quart hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex justify-between items-start">
                    <div
                      className="flex gap-1"
                      role="img"
                      aria-label={`${entry.rating} out of 5 stars`}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          aria-hidden="true"
                          className="w-5 h-5"
                          style={
                            i < entry.rating
                              ? { fill: "var(--warning)", color: "var(--warning)" }
                              : { fill: "transparent", color: "var(--text-muted)" }
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <blockquote className="m-0">
                    <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {entry.text}
                    </p>
                    <footer
                      className="mt-4 text-sm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      — {entry.name ?? "KLR Build client, North San Diego County"}
                    </footer>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
