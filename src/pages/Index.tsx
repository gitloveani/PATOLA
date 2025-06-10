
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 py-5">
          <div className="flex flex-col max-w-5xl mx-auto">
            <HeroSection />
            <AboutSection />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
