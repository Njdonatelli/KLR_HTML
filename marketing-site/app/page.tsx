import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ValueSection } from "@/components/home/ValueSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { ContactSection } from "@/components/home/ContactSection";

export const metadata: Metadata = {
  title: "KLR Build | Design-Build Outdoor Living in Oceanside, CA",
  description:
    "Family-owned design-build contractor in Oceanside, CA. Patios, hardscape, pools and water features, turf and planting, fire features, and four-season rooms across San Diego County.",
  openGraph: {
    title: "KLR Build | Design-Build Outdoor Living in Oceanside, CA",
    description:
      "Family-owned design-build contractor serving Oceanside and San Diego County. Designed with intent. Built to endure.",
    url: "/",
    siteName: "KLR Build",
    locale: "en_US",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ServicesSection />
      <FeaturedProjects />
      <ValueSection />
      <ProcessSection />
      <TestimonialSection />
      <ContactSection />
    </main>
  );
}
