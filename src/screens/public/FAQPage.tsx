import FAQContent from "@/components/faq/FAQContent";
import FAQHero from "@/components/faq/FAQHero";

const FAQPage = () => {
  return (
    <main className="bg-[#F9FAFB] min-h-screen flex flex-col">
      <FAQHero />
      <FAQContent />
    </main>
  );
};

export default FAQPage;
