import Link from "next/link";
import { ExitIcon, UserIcon1 } from "@/assets/icons";
import { cn } from "@/lib/utils";

const VisitWebsiteIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className={cn("size-5", className)}
  >
    <path
      d="M15.8333 10.8333V15.8333C15.8333 16.2754 15.6577 16.6993 15.3452 17.0118C15.0326 17.3244 14.6087 17.5 14.1667 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V5.83333C2.5 5.39131 2.67559 4.96738 2.98816 4.65482C3.30072 4.34226 3.72464 4.16667 4.16667 4.16667H9.16667"
      stroke="#454F5B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.5 2.5H17.5V7.5"
      stroke="#454F5B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.33301 11.6667L17.4997 2.5"
      stroke="#454F5B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface ProfilePopoverMenuProps {
  onLogout?: () => void;
}

const ProfilePopoverMenu = ({ onLogout }: ProfilePopoverMenuProps) => {
  return (
    <div className="flex flex-col gap-3">
      <Link
        href="/"
        className="flex items-center gap-4 p-1 text-[#454F5B] hover:text-textPrimary transition-colors cursor-pointer"
      >
        <VisitWebsiteIcon />
        <span className="text-base font-normal leading-6">Visit Website</span>
      </Link>

      <div className="h-px w-full bg-[#F4F6F8]" />

      <Link
        href="/dashboard/account"
        className="flex items-center gap-4 p-1 text-[#454F5B] hover:text-textPrimary transition-colors cursor-pointer"
      >
        <UserIcon1 className="size-5 text-[#454F5B]" />
        <span className="text-base font-normal leading-6">View Profile</span>
      </Link>

      <div className="h-px w-full bg-[#F4F6F8]" />

      <button
        onClick={onLogout}
        className="flex items-center gap-4 p-1 text-[#D6342C] hover:text-[#DE5D56] transition-colors cursor-pointer w-full"
      >
        <ExitIcon className="size-5.5 text-[#D6342C]" />
        <span className="text-base font-normal leading-6">Log out</span>
      </button>
    </div>
  );
};

export default ProfilePopoverMenu;
