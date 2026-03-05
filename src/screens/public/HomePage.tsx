import LandingHeroSection from "@/components/landing/LandingHeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import ComparisonSection from "@/components/landing/ComparisonSection";
import LandingCTASection from "@/components/landing/LandingCTASection";
import Footer from "@/components/shared/layout/Footer";
import Navbar from "@/components/shared/layout/Navbar";
import EarningPotentialSection from "@/components/for-barbers/EarningPotentialSection";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <LandingHeroSection />
      <HowItWorksSection />
      <EarningPotentialSection />
      <ComparisonSection />
      <LandingCTASection />
      <Footer />
    </div>
  );
};

export default HomePage;
