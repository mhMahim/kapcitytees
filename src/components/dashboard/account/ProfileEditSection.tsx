"use client";

import Image from "next/image";
import { Camera } from "lucide-react";

interface ProfileEditSectionProps {
  onCancel: () => void;
}

const ProfileEditSection = ({ onCancel }: ProfileEditSectionProps) => {
  return (
    <div className="bg-white rounded-xl p-6 lg:p-8 flex flex-col gap-10 items-end w-full">
      {/* Avatar + Name */}
      <div className="flex gap-6 items-center w-full">
        <div className="relative size-25 lg:size-30 shrink-0">
          <div className="size-full rounded-full overflow-hidden relative">
            <Image
              src="https://github.com/shadcn.png"
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <button
            type="button"
            className="absolute bottom-0 right-0 bg-[#E9F1F6] rounded-2xl size-8 flex items-center justify-center cursor-pointer hover:bg-[#d5e3ed] transition-colors"
          >
            <Camera className="size-4 text-[#1E6FA8]" />
          </button>
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

      {/* Profile Information Form */}
      <div className="flex flex-col gap-6 w-full rounded-2xl">
        {/* Section Header */}
        <div className="flex items-end pb-2 border-b border-[#F4F6F8]">
          <h3 className="text-lg font-medium text-[#454F5B] leading-7 flex-1">
            Profile Information
          </h3>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-8">
          {/* Row 1: Full Name + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Full Name" defaultValue="Cameron Williamson" />
            <FormField label="Phone number" defaultValue="+1 234 567 890" />
          </div>

          {/* Row 2: Email + Shop Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Email"
              defaultValue="cameronwilliamson@inimal.com"
            />
            <FormField label="Shop name" defaultValue="Barber Shop" />
          </div>

          {/* Row 3: Barber License + Shop Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Barber license" defaultValue="0123456789" />
            <FormField
              label="Shop address"
              defaultValue="245 Greenfield Avenue, Apartment 12B, New York, 10001, United States"
              isTextArea
            />
          </div>
        </div>
      </div>

      {/* Save Changes Button */}
      <button
        type="button"
        onClick={onCancel}
        className="bg-[#1E6FA8] text-white font-semibold text-base px-5 py-3 rounded-xl hover:bg-[#1a5f92] transition-colors cursor-pointer"
      >
        Save Changes
      </button>
    </div>
  );
};

function FormField({
  label,
  defaultValue,
  isTextArea = false,
}: {
  label: string;
  defaultValue: string;
  isTextArea?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-base font-semibold text-[#454F5B] leading-6">
        {label}
      </label>
      {isTextArea ? (
        <textarea
          defaultValue={defaultValue}
          className="border border-[#DFE3E8] rounded-lg px-5 py-3 text-lg font-medium text-[#454F5B] leading-7 outline-none focus:border-[#1E6FA8] transition-colors resize-none min-h-20"
        />
      ) : (
        <input
          type="text"
          defaultValue={defaultValue}
          className="border border-[#DFE3E8] rounded-lg h-12 px-5 py-3 text-lg font-medium text-[#454F5B] leading-7 outline-none focus:border-[#1E6FA8] transition-colors"
        />
      )}
    </div>
  );
}

export default ProfileEditSection;
