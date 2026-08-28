import { SectionHeading } from "@/design-system/klr-build-design-system-40bc4c";
import { BadgeCheck, Users, Star, DollarSign } from "lucide-react";

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-white" id="why-choose-us">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16 text-[#3a352a]">
          Why Choose<br/>KLR BUILD?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#f6f4eb] flex items-center justify-center text-[#6b5235]">
              <BadgeCheck className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-xl text-[#3a352a]">San Diego's Local Choice</h3>
            <p className="text-[#55524c] leading-relaxed">
              With a legacy spanning over a decade, our experience in outdoor design remains unmatched, making us the go-to choice for locals seeking excellent landscaping services.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#f6f4eb] flex items-center justify-center text-[#6b5235]">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-xl text-[#3a352a]">Expertise and Experience</h3>
            <p className="text-[#55524c] leading-relaxed">
              When it comes to outdoor design, we've got the expertise that locals trust. We deliver unbeatable results consistently.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#f6f4eb] flex items-center justify-center text-[#6b5235]">
              <Star className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-xl text-[#3a352a]">Quality and Craftsmanship</h3>
            <p className="text-[#55524c] leading-relaxed">
              When it comes to quality and craftsmanship, we're the real deal. Our team takes pride in delivering the best results that stand the test of time.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#f6f4eb] flex items-center justify-center text-[#6b5235]">
              <DollarSign className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-xl text-[#3a352a]">Affordable Financing Options</h3>
            <p className="text-[#55524c] leading-relaxed">
              We've partnered with financing providers to offer great financing options for your next Home Improvement project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
