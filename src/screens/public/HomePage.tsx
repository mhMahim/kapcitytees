import LandingHeroSection from "@/components/landing/LandingHeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import RevenueSection from "@/components/landing/RevenueSection";
import ComparisonSection from "@/components/landing/ComparisonSection";
import DashboardPreviewSection from "@/components/landing/DashboardPreviewSection";
import LandingCTASection from "@/components/landing/LandingCTASection";
import Footer from "@/components/shared/layout/Footer";
import Navbar from "@/components/shared/layout/Navbar";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <LandingHeroSection />
      <HowItWorksSection />
      <RevenueSection />
      <ComparisonSection />
      <DashboardPreviewSection />
      <LandingCTASection />
      <Footer />
    </div>
  );
};

export default HomePage;
