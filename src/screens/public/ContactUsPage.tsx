import ContactHero from "@/components/contact-us/ContactHero";
import ContactFormSection from "@/components/contact-us/ContactFormSection";
import ContactInfoStrip from "@/components/contact-us/ContactInfoStrip";

const ContactUsPage = () => {
  return (
    <main className="bg-[#F9FAFB] min-h-screen flex flex-col">
      <ContactHero />
      <ContactFormSection />
      <ContactInfoStrip />
    </main>
  );
};

export default ContactUsPage;
