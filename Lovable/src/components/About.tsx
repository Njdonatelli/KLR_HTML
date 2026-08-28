import { ValueSection } from "@/design-system/klr-build-design-system-40bc4c";

const About = () => {
  return (
    <ValueSection
      id="about"
      eyebrow="Who We Are"
      title="A family name on every permit we pull"
      intro="Two generations of builders, one crew, and a standard we don't move. We take on a limited number of projects each year so the people who sign the contract are the people on your site."
      stats={[
        { stat: "27", label: "Years Building", description: "Framing, finish carpentry, and full general contracting across San Diego County.", tone: "navy" },
        { stat: "340+", label: "Projects Delivered", description: "Custom homes, additions, kitchens, and whole-house remodels.", tone: "olive" },
        { stat: "94%", label: "Referral Rate", description: "Most of our year comes from past clients and the trades who work beside us.", tone: "bronze" },
      ]}
      featuresTitle="What that means for you"
      features={[
        { title: "Family Values", description: "Owner-run means the person answering your call is the person accountable for the work.", tone: "navy" },
        { title: "Quality First", description: "Materials specified up front, inspected on delivery, and installed by our own carpenters.", tone: "olive" },
        { title: "On Time, On Budget", description: "Fixed scope, weekly written updates, and change orders you approve before a dollar moves.", tone: "bronze" },
      ]}
    />
  );
};

export default About;
