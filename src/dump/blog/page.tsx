import type { Metadata } from "next";
import BlogPage from "@/screens/public/BlogPage";

export const metadata: Metadata = {
  title: "Grooming Tips & Tutorials",
  description: "Stay sharp with the latest grooming tips, barber tutorials, and product guides from Barber Certified.",
  openGraph: {
    title: "Grooming Tips & Tutorials",
    description: "Stay sharp with the latest grooming tips, barber tutorials, and product guides from Barber Certified.",
    url: "https://barbercertified.io/blog",
  },
};

const page = () => {
  return (
    <>
      <BlogPage />
    </>
  );
};

export default page;
