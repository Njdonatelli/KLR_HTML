import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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

  return (
    <section className="py-24 bg-[#F5F2EB]" id="reviews">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16 text-[#3a352a]">
          Customer Reviews
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-border">
            <h3 className="text-2xl font-display font-bold mb-6 text-[#3a352a]">
              Leave a Review
            </h3>
            <form action="https://formsubmit.co/nick@klrbuild.com" method="POST" className="space-y-6">
              {/* FormSubmit Configuration */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="New Customer Review Submission" />
              <input type="hidden" name="Rating" value={`${rating} Stars`} />

              <div className="space-y-2">
                <Label htmlFor="name" className="text-muted-foreground font-medium">Your Name</Label>
                <Input
                  id="name"
                  name="Name"
                  placeholder="John Doe"
                  className="bg-[#F5F2EB]/50 border-border"
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
                        className={`w-6 h-6 ${
                          star <= (hoverRating || rating)
                            ? "fill-[#facc15] text-[#facc15]"
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
                  className="min-h-[120px] bg-[#F5F2EB]/50 border-border resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#6b5235] hover:bg-[#574229] text-white font-medium py-6 text-lg rounded-md"
              >
                Submit Review
              </Button>
            </form>
          </div>

          {/* Right Column: Reviews */}
          <div className="space-y-8">
            <h3 className="text-2xl font-display font-bold text-[#3a352a]">
              What Our Customers Say
            </h3>
            <div className="space-y-6">
              {mockReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-xl p-8 shadow-sm border border-border flex flex-col gap-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-display font-bold text-lg text-[#3a352a]">
                        {review.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {review.date}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating
                              ? "fill-[#facc15] text-[#facc15]"
                              : "fill-transparent text-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-[#55524c] leading-relaxed">
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
