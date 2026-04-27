import type { Metadata } from "next";
import PrivacyPolicyPage from "@/screens/public/PrivacyPolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read our privacy policy to understand how we collect, use, and protect your personal information at Barber Certified.",
  openGraph: {
    title: "Privacy Policy",
    description: "Read our privacy policy to understand how we collect, use, and protect your personal information at Barber Certified.",
    url: "https://barbercertified.io/privacy-policy",
  },
};

const Page = () => {
  return <PrivacyPolicyPage />;
};

export default Page;
