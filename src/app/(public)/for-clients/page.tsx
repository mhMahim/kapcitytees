import type { Metadata } from "next";
import ShopPage from "@/screens/public/ShopPage";

export const metadata: Metadata = {
  title: "Shop Premium Essentials",
  description: "Shop our curated selection of premium grooming essentials crafted with skin-safe ingredients for everyday style.",
  openGraph: {
    title: "Shop Premium Essentials",
    description: "Shop our curated selection of premium grooming essentials crafted with skin-safe ingredients for everyday style.",
    url: "https://barbercertified.io/for-clients",
  },
};

const page = () => {
  return <ShopPage />;
};

export default page;
