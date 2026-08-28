import { ProcessSection } from "@/design-system/klr-build-design-system-40bc4c";

const WhyChooseUs = () => {
  return (
    <ProcessSection
      id="process"
      eyebrow="How We Work"
      title="A build you can follow from the first walkthrough"
      intro="No mystery line items, no silent weeks. Every KLR Build project moves through the same four stages."
      columns={2}
      steps={[
        {
          title: "Walkthrough & Feasibility",
          description: "We visit the property, measure what exists, and tell you plainly what your budget will and won't cover before drawings start.",
        },
        {
          title: "Design & Fixed Proposal",
          description: "Plans, engineering, and material selections resolved on paper, then priced as a line-item proposal you keep.",
        },
        {
          title: "Permits & Build",
          description: "We pull the permits, sequence the trades, and send a written progress update with photos every Friday.",
        },
        {
          title: "Punch List & Warranty",
          description: "We walk the finished work with you, close every item, and back the build with a two-year workmanship warranty.",
        },
      ]}
    />
  );
};

export default WhyChooseUs;
