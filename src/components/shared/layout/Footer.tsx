"use client";

import Link from "next/link";
import Logo from "../Logo";
import Container from "../Container";
import { useStateContext } from "@/hooks/useStateContext";

const companyLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Become a Partner", href: "/register?type=barber" },
  { label: "products", href: "/for-clients" },
  { label: "Contact Us", href: "/contact-us" },
];

const customerLinks = [
  { label: "Track Your Order", href: "#" },
  { label: "FAQs", href: "/faq" },
  { label: "Shipping & Returns", href: "#" },
];

// fallback labels used when API is not available
const socialLinksFallback = [
  { label: "Facebook", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
];

interface FooterLinkColumnProps {
  title: string;
  links: { label: string; href: string }[];
}

const FooterLinkColumn = ({ title, links }: FooterLinkColumnProps) => (
  <div className="flex flex-col gap-3 sm:gap-4 max-w-[40%] w-full sm:w-auto sm:max-w-auto">
    <h3 className="text-sm sm:text-base lg:text-lg font-medium text-white leading-6 sm:leading-7">
      {title}
    </h3>
    <ul className="flex flex-col gap-2 sm:gap-3">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="text-sm sm:text-base text-[#E7EAEC] hover:text-white transition-colors leading-5 sm:leading-6"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const { siteInfoData, socialLinksData } = useStateContext();

  const siteInfo = siteInfoData?.data?.data;
  const siteEmail = siteInfo?.email?.trim() || "";
  const sitePhone = siteInfo?.phone?.trim() || "";
  const copyrightText =
    siteInfo?.copyright_text?.trim() || "Copyright Barber Certified 2025";

  // Normalize API shape: socialLinksData?.data?.data is expected per API
  const fetchedLinks =
    socialLinksData?.data?.data && socialLinksData.data.data.length
      ? socialLinksData.data.data[0]
      : null;

  const socialLinks = fetchedLinks
    ? [
        { label: "Facebook", href: fetchedLinks.facebook_link || "#" },
        { label: "Twitter", href: fetchedLinks.twitter_link || "#" },
        { label: "LinkedIn", href: fetchedLinks.linkedin_link || "#" },
      ]
    : socialLinksFallback;
  return (
    <footer className="bg-[#0F2A3C] w-full">
      <Container className="pt-10 sm:pt-14 lg:pt-20 pb-6 sm:pb-8 flex flex-col gap-10 sm:gap-14 lg:gap-20">
        {/* Top section */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 sm:gap-10 lg:gap-12">
          {/* Logo + Description */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-7 max-w-full lg:max-w-105">
            <Logo className="size-14 sm:size-16 lg:size-20" />
            <p className="text-sm sm:text-base text-[#E7EAEC] leading-5 sm:leading-6">
              Premium men&apos;s grooming essentials crafted with high-quality,
              skin-safe ingredients to help you look sharp, feel confident, and
              take control of your style every single day.
            </p>
            {(siteEmail || sitePhone) && (
              <div className="flex flex-col gap-1">
                {siteEmail && (
                  <a
                    href={`mailto:${siteEmail}`}
                    className="text-sm sm:text-base text-[#E7EAEC] hover:text-white transition-colors"
                  >
                    {siteEmail}
                  </a>
                )}
                {sitePhone && (
                  <a
                    href={`tel:${sitePhone.replace(/[^+\d]/g, "")}`}
                    className="text-sm sm:text-base text-[#E7EAEC] hover:text-white transition-colors"
                  >
                    {sitePhone}
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Link columns */}
          <div className="flex flex-wrap lg:flex-nowrap gap-8 sm:gap-12 lg:gap-14 xl:gap-30 w-full sm:w-auto">
            <FooterLinkColumn title="Company" links={companyLinks} />
            <FooterLinkColumn title="Customer Services" links={customerLinks} />
            <FooterLinkColumn title="Follow Us" links={socialLinks} />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#3F5563] pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-sm sm:text-base text-[#E7EAEC]">
            {copyrightText}
          </p>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/terms"
              className="text-sm sm:text-base text-[#E7EAEC] hover:text-white transition-colors"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/privacy"
              className="text-sm sm:text-base text-[#E7EAEC] hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
