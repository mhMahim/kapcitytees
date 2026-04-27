import type { Metadata } from "next";
import AboutUsPage from "@/screens/public/AboutUsPage";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about Barber Certified and our mission to empower barbers with professional grooming products.",
  openGraph: {
    title: "About Us",
    description: "Learn more about Barber Certified and our mission to empower barbers with professional grooming products.",
    url: "https://barbercertified.io/about-us",
  },
};

export default function Page() {
  return <AboutUsPage />;
}
