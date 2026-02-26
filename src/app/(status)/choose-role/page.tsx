"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BarberIllustration from "@/assets/images/choose-role/barbershop-illustration.png";
import ShopperIllustration from "@/assets/images/choose-role/shopper-illustration.png";
import { Button } from "@/components/ui/button";

type Role = "barber" | "shopper";

const ChooseRolePage = () => {
  const [selectedRole, setSelectedRole] = useState<Role>("barber");
  const router = useRouter();

  const handleContinue = () => {
    // Navigate based on selected role
    if (selectedRole === "barber") {
      router.push("/register?type=barber");
    } else {
      router.push("/register?type=user");
    }
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <div className="flex flex-col gap-10 sm:gap-14 lg:gap-20 items-center w-full max-w-158.5">
        {/* Title */}
        <h1 className="text-2xl sm:text-[28px] lg:text-[32px] font-semibold leading-8 sm:leading-10 lg:leading-12 text-textPrimary text-center">
          Tell us about yourself
        </h1>

        {/* Role Cards */}
        <div className="flex gap-3 sm:gap-6 lg:gap-10 w-full">
          {/* Barber Card */}
          <button
            onClick={() => setSelectedRole("barber")}
            className={`bg-white flex flex-col justify-center gap-3 sm:gap-5 lg:gap-6 items-center pb-4 pt-5 px-4 sm:pb-6 sm:pt-8 sm:px-8 lg:px-10 rounded-[20px] w-full sm:flex-1 transition-all cursor-pointer ${
              selectedRole === "barber"
                ? "border-2 border-[#689FC5] shadow-[0px_4px_20px_0px_rgba(75,140,185,0.2)]"
                : "border-2 border-transparent shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)] hover:border-[#689FC5]/50"
            }`}
          >
            <Image
              alt="Barber Illustration"
              src={BarberIllustration}
              className="w-32 h-32 sm:w-44 sm:h-44 lg:w-auto lg:h-auto object-contain"
            />
            <p className="text-base lg:text-[22px] 2xl:text-[24px] font-semibold leading-7 sm:leading-8 lg:leading-9 text-[#0F2A3C] text-center">
              I&apos;m a barber
            </p>
          </button>

          {/* Shopper Card */}
          <button
            onClick={() => setSelectedRole("shopper")}
            className={`bg-white flex flex-col gap-3 sm:gap-5 lg:gap-6 items-center pb-4 pt-5 px-4 sm:pb-6 sm:pt-8 sm:px-8 lg:px-10 rounded-[20px] w-full sm:flex-1 transition-all cursor-pointer ${
              selectedRole === "shopper"
                ? "border-2 border-[#689FC5] shadow-[0px_4px_20px_0px_rgba(75,140,185,0.2)]"
                : "border-2 border-transparent shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)] hover:border-[#689FC5]/50"
            }`}
          >
            <Image
              alt="Shopper Illustration"
              src={ShopperIllustration}
              className="w-32 h-32 sm:w-44 sm:h-44 lg:w-auto lg:h-auto object-contain"
            />
            <p className="text-base lg:text-[22px] 2xl:text-[24px] font-semibold leading-7 sm:leading-8 lg:leading-9 text-[#0F2A3C] text-center">
              I&apos;m here to shop
            </p>
          </button>
        </div>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          className="w-full sm:w-75 h-11 sm:h-12 lg:h-14.5 text-sm sm:text-base"
        >
          {selectedRole === "barber"
            ? "Continue as Barber"
            : "Continue as Customer"}
        </Button>
      </div>
    </div>
  );
};

export default ChooseRolePage;
