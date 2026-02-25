import Footer from "@/components/shared/layout/Footer";
import Navbar from "@/components/shared/layout/Navbar";
import HeroBannerSection from "@/components/home/HeroBannerSection";
import FeaturesBarSection from "@/components/home/FeaturesBarSection";
import InfoSection from "@/components/home/InfoSection";
import ProductCategoriesSection from "@/components/home/ProductCategoriesSection";
import FAQSection from "@/components/home/FAQSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTABannerSection from "@/components/home/CTABannerSection";
import ClientSecImg from "@/assets/images/client-section.png";
import BarberSecImg from "@/assets/images/barber-section.png";

const clientsBullets = [
  {
    bold: "Barber-Curated:",
    text: "Buy exactly what your barber uses on you in the chair.",
  },
  {
    bold: "Amazon Prime Speed:",
    text: "Secure checkout and lightning-fast shipping on every order.",
  },
  {
    bold: "Video Mastery:",
    text: "Access our public library of grooming tutorials and style tips.",
  },
];

const barbersBullets = [
  {
    bold: "Earn Commissions:",
    text: "Get paid for every product your clients buy through your link.",
  },
  {
    bold: "Zero Inventory:",
    text: "We handle the shipping and stock via Amazon; you just recommend.",
  },
  {
    bold: "Pro Education:",
    text: "Unlock the hidden video library for your business growth.",
  },
];

const HomePage = () => {
  return (
    <>
      <Navbar />

      <main className="space-y-40 mb-40">
        <div className="flex flex-col gap-10">
          <HeroBannerSection />
          <FeaturesBarSection />
        </div>

        {/* Clients & Barbers Info Sections */}
        <div className="flex flex-col gap-36">
          <InfoSection
            tag="Clients"
            title="Get the Pro Look at Home"
            description="Take the guesswork out of your grooming routine by accessing a curated selection of products that your own barber trusts. Instead of browsing endless aisles of generic store brands, you can now purchase the exact formulas and tools."
            bullets={clientsBullets}
            buttonText="Browse Products"
            buttonHref="/shop"
            imageSrc={ClientSecImg}
            imageAlt="Man getting a professional haircut"
            imagePosition="left"
          />
          <InfoSection
            tag="Barbers"
            title="Your Shop's Digital Extension"
            description="Your expertise shouldn't stop when the client leaves the chair. By joining our partner program, you can provide your clients with a digital storefront where they can buy your recommended products anytime. This allows you to generate consistent passive income without the headache of managing physical inventory or shipping logistics."
            bullets={barbersBullets}
            buttonText="Join as Barber"
            buttonHref="/partners"
            imageSrc={BarberSecImg}
            imageAlt="Barber tools and products"
            imagePosition="right"
          />
        </div>

        {/* Product Categories */}
        <ProductCategoriesSection />

        {/* FAQ */}
        <FAQSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* CTA Banner */}
        <CTABannerSection />
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
