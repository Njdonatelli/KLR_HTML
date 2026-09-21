import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useScrollTracking } from "@/hooks/useAnalytics";
import { CustomerReviews } from "@/components/CustomerReviews";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useSeo } from "@/hooks/useSeo";
import { scrollTo } from "@/lib/smooth-scroll";
import { site } from "@/config/site";

const Index = () => {
  useSmoothScroll();

  useSeo({
    title: `${site.name} | Outdoor Living Design-Build in ${site.address.city}, CA`,
    description:
      "Family-owned design-build in Oceanside, CA. Patios, hardscape, pools and water features, planting, fire features, and four-season rooms across North San Diego County.",
    path: "/",
  });

  // Track scroll depth into major sections
  useScrollTracking("hero");
  useScrollTracking("about");
  useScrollTracking("services");
  useScrollTracking("reviews");
  useScrollTracking("contact");

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      <Navigation />

      <main id="content" tabIndex={-1}>
        <div id="hero"><Hero /></div>
        <div id="about"><About /></div>
        <div id="services"><Services /></div>
        <WhyChooseUs />
        <CustomerReviews />
        <Contact />
      </main>
      <Footer />

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Button
          size="lg"
          className="shadow-xl shadow-primary/20 font-bold rounded-full px-6"
          onClick={() => scrollTo("contact")}
        >
          Get an Estimate
        </Button>
      </div>
    </div>
  );
};

export default Index;
