"use client";

import { useStateContext } from "@/hooks/useStateContext";
import Image from "next/image";

const AccountHeader = () => {
  const { userData } = useStateContext();
  const data = userData?.data;

  const name = data?.name ?? "";
  const email = data?.email ?? "";
  const avatarUrl = data?.avatar ?? null;

  return (
    <div className="flex items-center gap-4 sm:gap-6 lg:gap-9">
      {/* Avatar */}
      <div className="size-16 sm:size-24 lg:size-39.5 shrink-0 rounded-full overflow-hidden bg-[#E7EAEC]">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={name}
            width={158}
            height={158}
            className="size-full object-cover"
          />
        ) : (
          <div className="size-full bg-[#E7EAEC]" />
        )}
      </div>

      {/* User Info */}
      <div className="flex flex-col gap-3">
        <p className="text-sm sm:text-base font-semibold leading-5 sm:leading-6 text-[#1E6FA8]">
          Welcome back
        </p>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl sm:text-2xl lg:text-[32px] font-semibold leading-tight sm:leading-9 lg:leading-12 text-[#0F2A3C]">
            {name}
          </h2>
          <p className="text-sm sm:text-base font-normal leading-5 sm:leading-6 text-[#5E707C]">
            {email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountHeader;
