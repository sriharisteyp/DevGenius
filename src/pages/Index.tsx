import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AIToolsShowcase from "@/components/AIToolsShowcase";
import FeaturesGrid from "@/components/FeaturesGrid";
//import DifferentiationComparison from "@/components/DifferentiationComparison";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { useRef } from "react";

const Index = () => {
  const featuresRef = useRef(null);

  const handleExploreClick = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero onExploreClick={handleExploreClick} />
      <AIToolsShowcase />
      <div ref={featuresRef}>
        <FeaturesGrid />
      </div>
      {/* <DifferentiationComparison /> */}
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Index;
