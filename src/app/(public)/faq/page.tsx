import type { Metadata } from "next";
import FAQPage from "@/screens/public/FAQPage";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Find quick answers to common questions about our products, shipping, returns, and barber partnership programs.",
  openGraph: {
    title: "Frequently Asked Questions",
    description: "Find quick answers to common questions about our products, shipping, returns, and barber partnership programs.",
    url: "https://barbercertified.io/faq",
  },
};

const page = () => {
  return <FAQPage />;
};

export default page;
