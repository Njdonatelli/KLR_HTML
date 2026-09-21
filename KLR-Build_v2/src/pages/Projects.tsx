import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProjectsSection from "@/components/Projects";
import { useSeo } from "@/hooks/useSeo";
import { site } from "@/config/site";

const ProjectsPage = () => {
  useSeo({
    title: `Our Work | ${site.name}`,
    description:
      "Patios and hardscape, pools and water features, turf and planting, fire features, four-season rooms, and landscape lighting — built by KLR Build across North San Diego County.",
    path: "/projects",
  });

  return (
    <div className="min-h-screen overflow-x-hidden relative flex flex-col bg-card">
      <Navigation />

      <main id="content" tabIndex={-1} className="flex-1 pt-24 pb-16">
        <ProjectsSection />
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
