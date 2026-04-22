"use client";

import Link from "next/link";
import Container from "@/components/shared/Container";
import { useStateContext } from "@/hooks/useStateContext";

const ForBarberHeroSection = () => {
  const { isLoggedIn, userData } = useStateContext();

  return (
    <section className="px-4 sm:px-5 lg:px-6 xl:px-7 2xl:px-8">
      <div className="bg-[#ECF2F8] rounded-2xl sm:rounded-3xl overflow-hidden">
        <Container className="py-12 sm:py-18 lg:py-45">
          <div className="flex flex-col items-center gap-8 sm:gap-10 lg:gap-12 text-center">
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <h1 className="text-[26px] sm:text-4xl lg:text-5xl xl:text-[64px] font-bold leading-tight sm:leading-snug lg:leading-20 text-[#1E6FA8]">
                Here&apos;s How Barbers Join the Network
              </h1>
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl font-medium leading-6 sm:leading-7 text-[#637381] max-w-full sm:max-w-180 lg:max-w-200">
                Gain access to verified products, exclusive marketing tools, and
                reliable earnings, no inventory risk ever
              </p>
            </div>
            <Link
              href={
                isLoggedIn && userData?.data?.role === "barber"
                  ? "/dashboard"
                  : "/register?type=barber"
              }
              className="bg-[#1E6FA8] text-white font-semibold text-sm sm:text-base leading-6 px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl hover:bg-[#1B6599] transition-colors"
            >
              {isLoggedIn && userData?.data?.role === "barber"
                ? "Manage Your Profile"
                : "Apply Now"}
            </Link>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default ForBarberHeroSection;
