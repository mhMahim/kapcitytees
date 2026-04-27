import type { Metadata } from "next";
import ForBarberPage from "@/screens/public/ForBarberPage";

export const metadata: Metadata = {
  title: "For Barbers",
  description: "Explore professional-grade tools and essentials designed to enhance precision and confidence behind the chair.",
  openGraph: {
    title: "For Barbers",
    description: "Explore professional-grade tools and essentials designed to enhance precision and confidence behind the chair.",
    url: "https://barbercertified.io/for-barbers",
  },
};

const page = () => {
  return (
    <>
      <ForBarberPage />
    </>
  );
};

export default page;
