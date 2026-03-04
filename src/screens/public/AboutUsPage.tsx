import ShopHeroBanner from "@/components/shop/ShopHeroBanner";
import OurStorySection from "@/components/about-us/OurStorySection";
import PhotoGallerySection from "@/components/about-us/PhotoGallerySection";
import StatsSection from "@/components/about-us/StatsSection";
import MissionSection from "@/components/about-us/MissionSection";
import PhilosophySection from "@/components/about-us/PhilosophySection";
import AboutFeaturesBar from "@/components/about-us/AboutFeaturesBar";

const AboutUsPage = () => {
  return (
    <main className="flex flex-col gap-12 sm:gap-16 lg:gap-24 xl:gap-30 pb-16 sm:pb-24 lg:pb-36 xl:pb-50">
      <ShopHeroBanner
        title="About Us"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About us", href: "/about-us" },
        ]}
      />
      <OurStorySection />
      <PhotoGallerySection />
      <StatsSection />
      <MissionSection />
      <PhilosophySection />
      <AboutFeaturesBar />
    </main>
  );
};

export default AboutUsPage;
