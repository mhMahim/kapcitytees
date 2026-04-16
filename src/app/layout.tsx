import type { Metadata } from "next";
import { Inter, Licorice } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import MainProvider from "@/provider/MainProvider";
import {
  DEFAULT_SITE_DESCRIPTION,
  getSiteInfo,
  getSiteOrigin,
  SITE_NAME,
} from "@/lib/site-info";

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const licorice = Licorice({
  variable: "--font-licorice",
  weight: "400",
  subsets: ["latin"],
});

export const generateMetadata = async (): Promise<Metadata> => {
  const siteInfo = await getSiteInfo();

  const siteOrigin = getSiteOrigin();
  const socialImage = siteInfo.logo || undefined;

  return {
    metadataBase: new URL(siteOrigin),
    title: {
      default: `${SITE_NAME} | Premium Grooming Essentials`,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_SITE_DESCRIPTION,
    keywords: [
      "barber products",
      "grooming essentials",
      "men's grooming",
      "barber certified",
    ],
    alternates: {
      canonical: "/",
    },
    icons: siteInfo.favicon
      ? {
          icon: siteInfo.favicon,
          shortcut: siteInfo.favicon,
          apple: siteInfo.favicon,
        }
      : undefined,
    openGraph: {
      type: "website",
      url: siteOrigin,
      siteName: SITE_NAME,
      title: `${SITE_NAME} | Premium Grooming Essentials`,
      description: DEFAULT_SITE_DESCRIPTION,
      images: socialImage
        ? [{ url: socialImage, alt: `${SITE_NAME} logo` }]
        : [],
    },
    twitter: {
      card: socialImage ? "summary_large_image" : "summary",
      title: `${SITE_NAME} | Premium Grooming Essentials`,
      description: DEFAULT_SITE_DESCRIPTION,
      images: socialImage ? [socialImage] : [],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteInfo = await getSiteInfo();
  const siteOrigin = getSiteOrigin();

  const organizationSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: siteOrigin,
  };

  if (siteInfo.logo) {
    organizationSchema.logo = siteInfo.logo;
  }

  const contactPoint: Array<Record<string, string>> = [];
  if (siteInfo.phone) {
    contactPoint.push({
      "@type": "ContactPoint",
      telephone: siteInfo.phone,
      contactType: "customer service",
    });
  }
  if (siteInfo.email) {
    contactPoint.push({
      "@type": "ContactPoint",
      email: siteInfo.email,
      contactType: "customer service",
    });
  }

  if (contactPoint.length) {
    organizationSchema.contactPoint = contactPoint;
  }

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${licorice.variable} antialiased bg-[#F9FAFB] font-inter`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <MainProvider>
          {children}
          <Toaster />
        </MainProvider>
      </body>
    </html>
  );
}
