import type { Metadata } from "next";
import ContactUsPage from "@/screens/public/ContactUsPage";
import { getSiteInfo, getSiteOrigin, SITE_NAME } from "@/lib/site-info";

export const generateMetadata = async (): Promise<Metadata> => {
  const siteInfo = await getSiteInfo();
  const siteOrigin = getSiteOrigin();
  const pagePath = "/contact-us";
  const pageTitle = `Contact Us | ${SITE_NAME}`;
  const pageDescription =
    "Reach out to our team for product questions, order support, and account help.";

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: pagePath,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${siteOrigin}${pagePath}`,
      siteName: SITE_NAME,
      type: "website",
      images: siteInfo.logo
        ? [{ url: siteInfo.logo, alt: `${SITE_NAME} logo` }]
        : [],
    },
    twitter: {
      card: siteInfo.logo ? "summary_large_image" : "summary",
      title: pageTitle,
      description: pageDescription,
      images: siteInfo.logo ? [siteInfo.logo] : [],
    },
  };
};

const page = () => {
  return <ContactUsPage />;
};

export default page;
