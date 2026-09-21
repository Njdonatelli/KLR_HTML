import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Blog from "@/components/Blog";
import { useSeo } from "@/hooks/useSeo";
import { site } from "@/config/site";

const JournalPage = () => {
  useSeo({
    title: `Journal | ${site.name}`,
    description:
      "Field notes from KLR Build on hardscape, low-water planting, landscape lighting, and getting an HOA to approve a backyard remodel in North San Diego County.",
    path: "/journal",
  });

  return (
    <div className="min-h-screen overflow-x-hidden relative flex flex-col bg-card">
      <Navigation />

      <main id="content" tabIndex={-1} className="flex-1 pt-24 pb-16">
        <Blog />
      </main>

      <Footer />
    </div>
  );
};

export default JournalPage;
