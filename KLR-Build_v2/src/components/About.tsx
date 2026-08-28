import { Heart, ShieldCheck, Award, Users } from "lucide-react";

const About = () => {
  return (
    <section className="py-24 bg-[#F5F2EB]" id="about">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#3a352a] mb-4">
            About KLR BUILD
          </h2>
          <p className="text-xl text-[#55524c] font-medium">
            KLR Build - More than a tagline, it's our promise.
          </p>
        </div>

        <div className="space-y-6 text-[#55524c] leading-relaxed text-lg mb-16 max-w-4xl mx-auto text-center">
          <p>
            KLR BUILD was founded on a simple principle: construction should be about building relationships, not just structures. As a family-owned business serving North San Diego County, we understand that your home is more than an investment—it's where life happens.
          </p>
          <p>
            From stunning outdoor living spaces to expansive custom landscapes, our licensed team brings decades of combined experience to every project. We specialize in exterior environments, always with an eye toward quality, durability, and timeless design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-border">
            <div className="w-12 h-12 rounded-lg bg-[#f6f4eb] flex items-center justify-center text-[#6b5235] mb-4">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-[#3a352a] mb-2">Family-Owned</h3>
            <p className="text-[#55524c]">
              Built on trust, integrity, and genuine care for every project we touch.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-border">
            <div className="w-12 h-12 rounded-lg bg-[#f6f4eb] flex items-center justify-center text-[#6b5235] mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-[#3a352a] mb-2">Licensed & Insured</h3>
            <p className="text-[#55524c]">
              License B586838 - Full compliance with all California regulations.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-border">
            <div className="w-12 h-12 rounded-lg bg-[#f6f4eb] flex items-center justify-center text-[#6b5235] mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-[#3a352a] mb-2">Quality First</h3>
            <p className="text-[#55524c]">
              We don't cut corners. Every project is built to last generations.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-border">
            <div className="w-12 h-12 rounded-lg bg-[#f6f4eb] flex items-center justify-center text-[#6b5235] mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-[#3a352a] mb-2">Community Focused</h3>
            <p className="text-[#55524c]">
              Proud to serve North San Diego County families and businesses.
            </p>
          </div>
        </div>

        <div className="bg-[#EBE7DF] rounded-xl p-8 text-center border border-[#d6d2c4]">
          <h3 className="font-display font-bold text-2xl text-[#3a352a] mb-4">Our Commitment</h3>
          <p className="text-[#55524c] leading-relaxed text-lg">
            Every project we complete carries our name and reputation. That's why we treat your property with the same care and respect we'd give our own home. It's not just business—it's personal.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
