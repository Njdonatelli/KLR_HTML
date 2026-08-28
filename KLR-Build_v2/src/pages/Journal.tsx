import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Blog from "@/components/Blog";

const JournalPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden relative flex flex-col bg-white">
      <Navigation />
      
      <main className="flex-1 pt-24 pb-16">
        <Blog />
      </main>

      <Footer />
    </div>
  );
};

export default JournalPage;
