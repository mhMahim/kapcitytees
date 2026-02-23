"use client";

import { EditIcon } from "@/assets/icons";
import Image from "next/image";

interface ProfileViewSectionProps {
  onEdit: () => void;
}

const ProfileViewSection = ({ onEdit }: ProfileViewSectionProps) => {
  return (
    <div className="bg-white rounded-xl p-6 lg:p-8 flex flex-col gap-10 w-full">
      {/* Avatar + Name */}
      <div className="flex gap-6 items-center">
        <div className="size-25 lg:size-30 rounded-full overflow-hidden shrink-0 relative">
          <Image
            src="https://github.com/shadcn.png"
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl lg:text-[32px] font-semibold text-[#4E545B] leading-12">
            Cameron Williamson
          </h2>
          <p className="text-base text-[#747B81]">
            cameronwilliamson@email.com
          </p>
        </div>
      </div>

      {/* Profile Information */}
      <div className="flex flex-col gap-6">
        {/* Section Header */}
        <div className="flex items-end justify-between pb-2 border-b border-[#F4F6F8]">
          <h3 className="text-lg font-medium text-[#454F5B] leading-7">
            Profile Information
          </h3>
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center gap-2 text-[#1E6FA8] hover:text-[#1E6FA8]/80 transition-colors cursor-pointer"
          >
            <EditIcon className="size-5" />
            <span className="text-base font-semibold">Edit</span>
          </button>
        </div>

        {/* Info Grid */}
        <div className="flex flex-col gap-8">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-0">
            <InfoField label="Full name" value="Cameron Williamson" />
            <InfoField label="Phone number" value="+1 234 567 890" />
            <InfoField label="Email" value="cameronwilliamson@inimal.com" />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-0">
            <InfoField label="Shop name" value="Barber Shop" />
            <InfoField label="Barber license" value="0123456789" />
            <InfoField
              label="Shop address"
              value={
                <>
                  245 Greenfield Avenue, Apartment 12B
                  <br />
                  New York, 10001, United States
                </>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function InfoField({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-base text-[#637381] leading-6">{label}</p>
      <p className="text-lg font-medium text-[#454F5B] leading-7">{value}</p>
    </div>
  );
}

export default ProfileViewSection;
