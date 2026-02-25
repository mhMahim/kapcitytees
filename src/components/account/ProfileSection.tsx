import Link from "next/link";
import { EditIcon } from "@/assets/icons";

interface PersonalInfoProps {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
}

const ProfileSection = ({
  fullName,
  email,
  phone,
  dateOfBirth,
  address,
}: PersonalInfoProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-[0px_4px_20px_0px_rgba(145,158,171,0.08)] pt-8 pb-12 px-10 flex flex-col gap-10 flex-1">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold leading-9 text-[#3F5563]">
          Personal Information
        </h3>
        <Link
          href="/account/profile/edit"
          className="flex items-center gap-2 text-[#1E6FA8] hover:opacity-80 transition-opacity"
        >
          <EditIcon className="size-6 text-[#1E6FA8]" />
          <span className="text-lg font-medium leading-9">Edit</span>
        </Link>
      </div>

      {/* Info Grid */}
      <div className="flex flex-col gap-8">
        {/* Row 1 */}
        <div className="flex items-center">
          <div className="flex-1 flex flex-col gap-2">
            <p className="text-base font-normal text-[#5E707C] leading-6">
              Full name
            </p>
            <p className="text-lg font-semibold text-[#0F2A3C]">
              {fullName}
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <p className="text-base font-normal text-[#5E707C] leading-6">
              Email
            </p>
            <p className="text-lg font-semibold text-[#0F2A3C]">
              {email}
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <p className="text-base font-normal text-[#5E707C] leading-6">
              Phone Number
            </p>
            <p className="text-lg font-semibold text-[#0F2A3C]">
              {phone}
            </p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex items-center">
          <div className="flex flex-col gap-2 w-[384px]">
            <p className="text-base font-normal text-[#5E707C] leading-6">
              Date of Birth
            </p>
            <p className="text-lg font-semibold text-[#0F2A3C]">
              {dateOfBirth}
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <p className="text-base font-normal text-[#5E707C] leading-6">
              Address
            </p>
            <p className="text-lg font-semibold text-[#0F2A3C]">
              {address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
