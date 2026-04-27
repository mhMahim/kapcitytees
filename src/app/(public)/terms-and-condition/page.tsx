import type { Metadata } from "next";
import TermsAndConditionPage from "@/screens/public/TermsAndConditionPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Review our terms and conditions for using our services, purchasing products, and engaging with the Barber Certified platform.",
  openGraph: {
    title: "Terms & Conditions",
    description: "Review our terms and conditions for using our services, purchasing products, and engaging with the Barber Certified platform.",
    url: "https://barbercertified.io/terms-and-condition",
  },
};

const page = () => {
  return <TermsAndConditionPage />;
};

export default page;
