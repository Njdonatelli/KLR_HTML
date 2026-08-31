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
import { scrollTo } from "@/lib/smooth-scroll";

const Index = () => {
  useSmoothScroll();

  // Track scroll depth into major sections
  useScrollTracking("hero");
  useScrollTracking("about");
  useScrollTracking("services");
  useScrollTracking("reviews");
  useScrollTracking("contact");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "KLR Build",
    "image": "https://klrbuild.com/og-image.jpg",
    "url": "https://klrbuild.com",
    "telephone": "+16197391135",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "697 Chimney Rock Drive",
      "addressLocality": "Oceanside",
      "addressRegion": "CA",
      "postalCode": "92058",
      "addressCountry": "US"
    },
    "areaServed": ["San Diego County", "Orange County"],
    "priceRange": "$$$$"
  };

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />

      <div id="hero"><Hero /></div>
      <div id="about"><About /></div>
      <div id="services"><Services /></div>
      <WhyChooseUs />
      <CustomerReviews />
      <Contact />
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
