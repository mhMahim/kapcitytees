import type { Metadata } from "next";
import HomePage from "@/screens/public/HomePage";
import { SITE_NAME, DEFAULT_SITE_DESCRIPTION } from "@/lib/site-info";

export const metadata: Metadata = {
  title: `${SITE_NAME}`,
  description: DEFAULT_SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: DEFAULT_SITE_DESCRIPTION,
    url: "https://barbercertified.io/",
    images: [
      {
        url: "https://barbercertified.io/og-image.jpg",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
};

const page = () => {
  return <HomePage />;
};

export default page;
