import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProjectsSection from "@/components/Projects";

const ProjectsPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden relative flex flex-col bg-white">
      <Navigation />
      
      <main className="flex-1 pt-24 pb-16">
        <ProjectsSection />
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
