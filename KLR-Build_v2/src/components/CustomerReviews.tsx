import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSplitText } from "@/hooks/useSplitText";

const mockReviews = [
  {
    id: 1,
    name: "Ryan Brock",
    date: "8/18/2026",
    rating: 5,
    text: "KLR Build did an amazing job on our backyard. They built our BBQ, retaining wall, and handled several other parts of the project, and everything came out better than we expected. The quality of the work really shows, and the whole backyard came together beautifully. Reliable, professional, and clearly take pride in what they do. I'd absolutely recommend KLR Build to anyone looking to upgrade their outdoor space.",
  },
  {
    id: 2,
    name: "Marla Rochelle",
    date: "10/14/2025",
    rating: 5,
    text: "Working with Coty and his team was a very pleasant experience. They truly meet you were you are and with your budget. His knowledge and professionalism is outstanding. I'm very happy with my newly landscaped home.",
  },
];

export const CustomerReviews = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const headingRef = useSplitText<HTMLHeadingElement>({ preset: "heading-reveal" });
  const formRef = useScrollReveal({ variant: "fade-left" });
  const reviewsRef = useScrollReveal<HTMLDivElement>({
    variant: "fade-right",
    staggerChildren: "[data-reveal-card]",
    staggerDelay: 0.15,
  });

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
          <div ref={formRef} className="bg-white rounded-xl p-8 shadow-sm border border-border">
            <h3
              className="text-2xl font-display font-bold mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              Leave a Review
            </h3>
            <form action="https://formsubmit.co/nick@klrbuild.com" method="POST" className="space-y-6">
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="New Customer Review Submission" />
              <input type="hidden" name="Rating" value={`${rating} Stars`} />

              <div className="space-y-2">
                <Label htmlFor="name" className="text-muted-foreground font-medium">Your Name</Label>
                <Input
                  id="name"
                  name="Name"
                  placeholder="John Doe"
                  className="border-border"
                  style={{ background: "color-mix(in srgb, var(--surface-warm) 50%, transparent)" }}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground font-medium">Rating</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className="focus:outline-none transition-colors"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star
                        className={`w-6 h-6 transition-colors duration-fast ${
                          star <= (hoverRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-transparent text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="review" className="text-muted-foreground font-medium">Your Review</Label>
                <Textarea
                  id="review"
                  name="Review"
                  placeholder="Share your experience with us..."
                  className="min-h-[120px] border-border resize-none"
                  style={{ background: "color-mix(in srgb, var(--surface-warm) 50%, transparent)" }}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full text-white font-medium py-6 text-lg rounded-md transition-all duration-base ease-out-quart hover:scale-[1.02] hover:shadow-md"
                style={{
                  background: "var(--accent-tertiary)",
                }}
              >
                Submit Review
              </Button>
            </form>
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
              {mockReviews.map((review) => (
                <div
                  key={review.id}
                  data-reveal-card
                  className="bg-white rounded-xl p-8 shadow-sm border border-border flex flex-col gap-4 transition-all duration-base ease-out-quart hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4
                        className="font-display font-bold text-lg"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {review.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">{review.date}</p>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-transparent text-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
