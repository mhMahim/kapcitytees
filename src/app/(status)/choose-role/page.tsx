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
    <div className="bg-[#F9FAFB] min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-20 items-center w-158.5">
        {/* Title */}
        <h1 className="text-[32px] font-semibold leading-12 text-textPrimary text-center">
          Tell us about yourself
        </h1>

        {/* Role Cards */}
        <div className="flex gap-10 items-center w-full">
          {/* Barber Card */}
          <button
            onClick={() => setSelectedRole("barber")}
            className={`bg-white flex flex-col gap-6 items-center pb-6 pt-8 px-10 rounded-[20px] flex-1 transition-all cursor-pointer ${
              selectedRole === "barber"
                ? "border-2 border-[#689FC5] shadow-[0px_4px_20px_0px_rgba(75,140,185,0.2)]"
                : "border-2 border-transparent shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)] hover:border-[#689FC5]/50"
            }`}
          >
            <Image alt="Barber Illustration" src={BarberIllustration} />
            <p className="text-[24px] font-semibold leading-9 text-[#0F2A3C] text-center">
              I&apos;m a barber
            </p>
          </button>

          {/* Shopper Card */}
          <button
            onClick={() => setSelectedRole("shopper")}
            className={`bg-white flex flex-col gap-6 items-center pb-6 pt-8 px-10 rounded-[20px] flex-1 transition-all cursor-pointer ${
              selectedRole === "shopper"
                ? "border-2 border-[#689FC5] shadow-[0px_4px_20px_0px_rgba(75,140,185,0.2)]"
                : "border-2 border-transparent shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)] hover:border-[#689FC5]/50"
            }`}
          >
            <Image alt="Shopper Illustration" src={ShopperIllustration} />
            <p className="text-[24px] font-semibold leading-9 text-[#0F2A3C] text-center">
              I&apos;m here to shop
            </p>
          </button>
        </div>

        {/* Continue Button */}
        <Button onClick={handleContinue} className="w-75">
          {selectedRole === "barber"
            ? "Continue as Barber"
            : "Continue as Customer"}
        </Button>
      </div>
    </div>
  );
};

export default ChooseRolePage;
