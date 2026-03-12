"use client";

import Link from "next/link";
import { EditIcon } from "@/assets/icons";
import { useStateContext } from "@/hooks/useStateContext";

const ProfileSection = () => {
  const { userData } = useStateContext();
  const data = userData?.data;

  const fullName = data?.name ?? "—";
  const email = data?.email ?? "—";
  const phone = data?.phone ?? "—";
  const dateOfBirth = data?.dob ?? "—";
  const address =
    [data?.address, data?.city, data?.state, data?.postal_code]
      .filter(Boolean)
      .join(", ") || "—";

  return (
    <div className="bg-white rounded-2xl shadow-[0px_4px_20px_0px_rgba(145,158,171,0.08)] pt-5 pb-8 px-4 sm:pt-6 sm:pb-10 sm:px-6 lg:pt-8 lg:pb-12 lg:px-10 flex flex-col gap-6 sm:gap-8 lg:gap-10 flex-1">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold leading-7 sm:leading-8 lg:leading-9 text-[#3F5563]">
          Personal Information
        </h3>
        <Link
          href="/account/profile/edit"
          className="flex items-center gap-2 text-[#1E6FA8] hover:opacity-80 transition-opacity"
        >
          <EditIcon className="size-6 text-[#1E6FA8]" />
          <span className="text-sm sm:text-base lg:text-lg font-medium leading-6 lg:leading-9">
            Edit
          </span>
        </Link>
      </div>

      {/* Info Grid */}
      <div className="flex flex-col gap-5 sm:gap-6 lg:gap-8">
        {/* Row 1 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0">
          <div className="flex-1 flex flex-col gap-2">
            <p className="text-sm sm:text-base font-normal text-[#5E707C] leading-5 sm:leading-6">
              Full name
            </p>
            <p className="text-base sm:text-lg font-semibold text-[#0F2A3C]">
              {fullName}
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <p className="text-sm sm:text-base font-normal text-[#5E707C] leading-5 sm:leading-6">
              Email
            </p>
            <p className="text-base sm:text-lg font-semibold text-[#0F2A3C]">
              {email}
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <p className="text-sm sm:text-base font-normal text-[#5E707C] leading-5 sm:leading-6">
              Phone Number
            </p>
            <p className="text-base sm:text-lg font-semibold text-[#0F2A3C]">
              {phone}
            </p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0">
          <div className="flex flex-col gap-2 w-full sm:w-[384px]">
            <p className="text-sm sm:text-base font-normal text-[#5E707C] leading-5 sm:leading-6">
              Date of Birth
            </p>
            <p className="text-base sm:text-lg font-semibold text-[#0F2A3C]">
              {dateOfBirth}
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <p className="text-sm sm:text-base font-normal text-[#5E707C] leading-5 sm:leading-6">
              Address
            </p>
            <p className="text-base sm:text-lg font-semibold text-[#0F2A3C]">
              {address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
