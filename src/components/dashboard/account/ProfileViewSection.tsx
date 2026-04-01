"use client";

import { EditIcon } from "@/assets/icons";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useStateContext } from "@/hooks/useStateContext";

interface ProfileViewSectionProps {
  onEdit: () => void;
}

const ProfileViewSection = ({ onEdit }: ProfileViewSectionProps) => {
  const { userData } = useStateContext();
  const data = userData?.data;

  const fullName = data?.name ?? "—";
  const phone = data?.phone ?? "—";
  const email = data?.email ?? "—";
  const shopName = data?.shop_name ?? "—";
  const barberLicense = data?.barber_license ?? "—";
  const shopAddress = data?.address ?? "—";
  const avatarUrl = data?.avatar ?? "";

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 flex flex-col gap-6 sm:gap-8 lg:gap-10 w-full">
      {/* Avatar + Name */}
      <div className="flex gap-6 items-center">
        <Avatar className="size-18 sm:size-25 lg:size-30 rounded-full overflow-hidden shrink-0">
          <AvatarImage src={avatarUrl || undefined} alt="Profile" />
          <AvatarFallback className="bg-[#E7EAEC]">
            <User className="size-8 text-[#637381]" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h2 className="text-xl sm:text-2xl lg:text-[32px] font-semibold text-[#4E545B] leading-8 sm:leading-10 lg:leading-12">
            {fullName}
          </h2>
          <p className="text-sm sm:text-base text-[#747B81]">{email}</p>
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
        <div className="flex flex-col gap-6 sm:gap-8">
          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-0">
            <InfoField label="Full name" value={fullName} />
            <InfoField label="Phone number" value={phone} />
            <InfoField label="Email" value={email} />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-0">
            <InfoField label="Shop name" value={shopName} />
            <InfoField label="Barber license" value={barberLicense} />
            <InfoField label="Shop address" value={shopAddress} />
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
    <div className="flex flex-col gap-1 sm:gap-2">
      <p className="text-sm sm:text-base text-[#637381] leading-5 sm:leading-6">
        {label}
      </p>
      <p className="text-base sm:text-lg font-medium text-[#454F5B] leading-6 sm:leading-7">
        {value}
      </p>
    </div>
  );
}

export default ProfileViewSection;
