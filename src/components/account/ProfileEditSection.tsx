"use client";

import { useRouter } from "next/navigation";
import { Calendar } from "lucide-react";

interface ProfileEditSectionProps {
  defaultValues?: {
    fullName: string;
    phone: string;
    email: string;
    dateOfBirth: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

const ProfileEditSection = ({ defaultValues }: ProfileEditSectionProps) => {
  const router = useRouter();

  const values = defaultValues ?? {
    fullName: "Johnathan Smith",
    phone: "+1 234 567 890",
    email: "johnathansmith@mail.com",
    dateOfBirth: "",
    address: "245 Greenfield Avenue, Apartment 12B",
    city: "New York",
    state: "United States",
    postalCode: "10001",
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0px_4px_20px_0px_rgba(145,158,171,0.08)] px-10 py-8 flex flex-col gap-12 flex-1">
      {/* Form Fields */}
      <div className="flex flex-col gap-8">
        {/* Row 1: Full name + Phone */}
        <div className="flex gap-6">
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-base font-semibold leading-6 text-[#454F5B]">
              Full name
            </label>
            <input
              type="text"
              defaultValue={values.fullName}
              className="border border-[#DFE3E8] rounded-lg px-4.5 py-4 text-base font-semibold text-[#0F2A3C] leading-6 outline-none focus:border-[#1E6FA8] transition-colors"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-base font-semibold leading-6 text-[#454F5B]">
              Phone Number
            </label>
            <input
              type="text"
              defaultValue={values.phone}
              className="border border-[#DFE3E8] rounded-lg px-4.5 py-4 text-base font-semibold text-[#0F2A3C] leading-6 outline-none focus:border-[#1E6FA8] transition-colors"
            />
          </div>
        </div>

        {/* Row 2: Email + Date of Birth */}
        <div className="flex gap-6">
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-base font-semibold leading-6 text-[#454F5B]">
              Email
            </label>
            <input
              type="email"
              defaultValue={values.email}
              className="border border-[#DFE3E8] rounded-lg px-4.5 py-4 text-base font-semibold text-[#0F2A3C] leading-6 outline-none focus:border-[#1E6FA8] transition-colors"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-base font-semibold leading-6 text-[#454F5B]">
              Date of Birth
            </label>
            <div className="border border-[#DFE3E8] rounded-lg px-4.5 py-4 flex items-center gap-2.5 h-14">
              <input
                type="text"
                placeholder="mm/dd/yyyy"
                defaultValue={values.dateOfBirth}
                className="flex-1 text-base font-semibold text-[#0F2A3C] leading-6 outline-none placeholder:text-[#0F2A3C]"
              />
              <Calendar className="size-6 text-[#637381] shrink-0" />
            </div>
          </div>
        </div>

        {/* Row 3: Address */}
        <div className="flex flex-col gap-1.5">
          <label className="text-base font-semibold leading-6 text-[#454F5B]">
            Address
          </label>
          <input
            type="text"
            defaultValue={values.address}
            className="border border-[#DFE3E8] rounded-lg px-4.5 py-4 text-base font-semibold text-[#0F2A3C] leading-6 outline-none focus:border-[#1E6FA8] transition-colors"
          />
        </div>

        {/* Row 4: City + State + Postal code */}
        <div className="flex gap-6">
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-base font-semibold leading-6 text-[#454F5B]">
              City
            </label>
            <input
              type="text"
              defaultValue={values.city}
              className="border border-[#DFE3E8] rounded-lg px-4.5 py-4 text-base font-semibold text-[#0F2A3C] leading-6 outline-none focus:border-[#1E6FA8] transition-colors"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-base font-semibold leading-6 text-[#454F5B]">
              State
            </label>
            <input
              type="text"
              defaultValue={values.state}
              className="border border-[#DFE3E8] rounded-lg px-4.5 py-4 text-base font-semibold text-[#0F2A3C] leading-6 outline-none focus:border-[#1E6FA8] transition-colors"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-base font-semibold leading-6 text-[#454F5B]">
              Postal code
            </label>
            <input
              type="text"
              defaultValue={values.postalCode}
              className="border border-[#DFE3E8] rounded-lg px-4.5 py-4 text-base font-semibold text-[#0F2A3C] leading-6 outline-none focus:border-[#1E6FA8] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4.5">
        <button
          type="button"
          onClick={() => router.push("/account")}
          className="w-60 h-13 rounded-xl border border-[#B5BDC3] bg-white text-base font-semibold text-[#5E707C] tracking-[-0.32px] leading-7 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          className="w-60 h-13 rounded-xl bg-[#1E6FA8] text-base font-semibold text-white leading-6 hover:bg-[#1A5F91] transition-colors cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileEditSection;
