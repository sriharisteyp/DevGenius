
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AIToolsShowcase from "@/components/AIToolsShowcase";
import FeaturesGrid from "@/components/FeaturesGrid";
import DifferentiationComparison from "@/components/DifferentiationComparison";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <AIToolsShowcase />
      <FeaturesGrid />
      <DifferentiationComparison />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Index;
