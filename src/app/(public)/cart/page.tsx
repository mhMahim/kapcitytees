import type { Metadata } from "next";
import CartPage from "@/screens/public/CartPage";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "View and manage the grooming essentials in your cart before checkout.",
  openGraph: {
    title: "Your Cart",
    description: "View and manage the grooming essentials in your cart before checkout.",
    url: "https://barbercertified.io/cart",
  },
};

const page = () => {
  return <CartPage />;
};

export default page;
