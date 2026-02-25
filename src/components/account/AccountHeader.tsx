import Image from "next/image";

interface AccountHeaderProps {
  name: string;
  email: string;
  avatarUrl?: string;
}

const AccountHeader = ({ name, email, avatarUrl }: AccountHeaderProps) => {
  return (
    <div className="flex items-center gap-9">
      {/* Avatar */}
      <div className="size-39.5 shrink-0 rounded-full overflow-hidden bg-[#E7EAEC]">
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
        <p className="text-base font-semibold leading-6 text-[#1E6FA8]">
          Welcome back
        </p>
        <div className="flex flex-col gap-1">
          <h2 className="text-[32px] font-semibold leading-12 text-[#0F2A3C]">
            {name}
          </h2>
          <p className="text-base font-normal leading-6 text-[#5E707C]">
            {email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountHeader;
