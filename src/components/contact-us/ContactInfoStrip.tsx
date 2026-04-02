"use client";

import Container from "../shared/Container";
import { Mail, Phone, MapPin } from "lucide-react";
import { useStateContext } from "@/hooks/useStateContext";

type ContactInfoItem = {
  icon: React.ReactNode;
  title: string;
  hoursLabel: string;
  hours: string;
  href?: string;
};

const ContactInfoStrip = () => {
  const { siteInfoData } = useStateContext();

  const siteInfo = siteInfoData?.data?.data;
  const supportEmail = siteInfo?.email?.trim() || "support@kapcitytees.com";
  const supportPhone = siteInfo?.phone?.trim() || "(458) 272-8738";
  const telValue = supportPhone.replace(/[^+\d]/g, "");

  const items: ContactInfoItem[] = [
    {
      icon: <Mail size={28} className="text-[#1E6FA8]" />,
      title: supportEmail,
      href: `mailto:${supportEmail}`,
      hoursLabel: "Assistance hours:",
      hours: "Monday - Friday 6 am to 8 pm PST",
    },
    {
      icon: <Phone size={28} className="text-[#1E6FA8]" />,
      title: supportPhone,
      href: `tel:${telValue}`,
      hoursLabel: "Assistance hours:",
      hours: "Monday - Friday 6 am to 8 pm PST",
    },
    {
      icon: <MapPin size={28} className="text-[#1E6FA8]" />,
      title: "Office Address",
      hoursLabel: "Office hours:",
      hours: "Monday - Friday 6 am to 8 pm PST",
    },
  ];

  return (
    <section className="w-full py-6 pb-8 sm:pb-10 lg:pb-16">
      <Container>
        <div className="bg-[#F4F6F8] rounded-2xl sm:rounded-3xl grid sm:grid-cols-2 lg:grid-cols-3 gap-0 sm:gap-6 xl:gap-10 items-stretch py-4 sm:py-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col sm:flex-row lg:flex-col items-center gap-3 sm:gap-4 lg:gap-5 p-4 sm:p-5 lg:p-8 rounded-2xl"
            >
              {/* Icon bubble */}
              <div className="w-14 h-14 flex items-center justify-center rounded-[10px] bg-white shadow-[0px_0px_11px_0px_rgba(183,231,255,0.3)]">
                {item.icon}
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2 sm:gap-3 items-center sm:items-start lg:items-center text-center sm:text-left lg:text-center">
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-[#0F2A3C] font-semibold text-base sm:text-lg xl:text-2xl leading-tight sm:leading-7 lg:leading-9 break-all sm:break-normal hover:text-[#1E6FA8] transition-colors"
                  >
                    {item.title}
                  </a>
                ) : (
                  <p className="text-[#0F2A3C] font-semibold text-base sm:text-lg xl:text-2xl leading-tight sm:leading-7 lg:leading-9 break-all sm:break-normal">
                    {item.title}
                  </p>
                )}
                <div className="text-[#3F5563] text-sm sm:text-sm xl:text-base font-normal leading-5 sm:leading-6">
                  <p>{item.hoursLabel}</p>
                  <p>{item.hours}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ContactInfoStrip;
