import "./styles/tokens.css";

/**
 * HTML links for loading KLR Build's brand typefaces.
 * Add this markup to the consuming application's document head.
 */
export const BRAND_FONT_LINKS =
  '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Work+Sans:wght@400;500;600&family=Barlow+Semi+Condensed:wght@500;600;700&display=swap" rel="stylesheet">';

export { Button } from "./components/Button";
export type { ButtonProps } from "./components/Button";

export { Badge } from "./components/Badge";
export type { BadgeProps } from "./components/Badge";

export { Input } from "./components/Input";
export type { InputProps } from "./components/Input";

export { SectionHeading } from "./components/SectionHeading";
export type { SectionHeadingProps } from "./components/SectionHeading";

export { FeatureCard } from "./components/FeatureCard";
export type { FeatureCardProps } from "./components/FeatureCard";

export { StatCard } from "./components/StatCard";
export type { StatCardProps } from "./components/StatCard";

export { ProcessStep } from "./components/ProcessStep";
export type { ProcessStepProps } from "./components/ProcessStep";

export { TestimonialCard } from "./components/TestimonialCard";
export type { TestimonialCardProps } from "./components/TestimonialCard";

export { SiteHeader } from "./components/SiteHeader";
export type { SiteHeaderProps, SiteHeaderLink } from "./components/SiteHeader";

export { Hero } from "./components/Hero";
export type { HeroProps } from "./components/Hero";

export { ProcessSection } from "./components/ProcessSection";
export type {
  ProcessSectionProps,
  ProcessSectionStep,
} from "./components/ProcessSection";

export { ValueSection } from "./components/ValueSection";
export type {
  ValueSectionProps,
  ValueSectionStat,
  ValueSectionFeature,
} from "./components/ValueSection";

export { TestimonialSection } from "./components/TestimonialSection";
export type { TestimonialSectionProps } from "./components/TestimonialSection";

export { ContactSection } from "./components/ContactSection";
export type { ContactSectionProps } from "./components/ContactSection";
