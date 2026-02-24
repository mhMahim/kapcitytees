import ShopHeroBanner from "@/components/shop/ShopHeroBanner";
import OurStorySection from "@/components/about-us/OurStorySection";
import PhotoGallerySection from "@/components/about-us/PhotoGallerySection";
import StatsSection from "@/components/about-us/StatsSection";
import MissionSection from "@/components/about-us/MissionSection";
import PhilosophySection from "@/components/about-us/PhilosophySection";
import BarberCertifiedSection from "@/components/about-us/BarberCertifiedSection";
import AboutFeaturesBar from "@/components/about-us/AboutFeaturesBar";

const AboutUsPage = () => {
  return (
    <main className="flex flex-col gap-30 pb-50">
      {/* Hero Banner */}
      <ShopHeroBanner
        title="About Us"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About us", href: "/about-us" },
        ]}
      />

      {/* Our Story */}
      <OurStorySection />

      {/* Photo Gallery */}
      <PhotoGallerySection />

      {/* Stats */}
      <StatsSection />

      {/* Mission / Our Commitment */}
      <MissionSection />

      {/* Philosophy */}
      <PhilosophySection />

      {/* Barber Certified */}
      {/* <BarberCertifiedSection /> */}

      {/* Features Bar */}
      <AboutFeaturesBar />
    </main>
  );
};

export default AboutUsPage;
