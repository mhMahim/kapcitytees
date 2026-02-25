"use client";

import { useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExitIcon } from "@/assets/icons";
import { useStateContext } from "@/hooks/useStateContext";
import { useRouter } from "next/navigation";

const UserProfileIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 10a4.167 4.167 0 1 0 0-8.333A4.167 4.167 0 0 0 10 10ZM10 12.5c-4.142 0-6.667 2.071-6.667 3.333 0 .834 2.525.834 6.667.834s6.667 0 6.667-.834c0-1.262-2.525-3.333-6.667-3.333Z"
      stroke="#454F5B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const NavbarProfilePopover = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { setIsLoggedIn } = useStateContext();
  const router = useRouter();

  const handleOpenLogoutDialog = () => {
    setPopoverOpen(false);
    setLogoutDialogOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsLoggedIn(false);
    setLogoutDialogOpen(false);
    router.push("/login");
  };

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <button
            aria-label="Profile"
            className="size-12 rounded-full bg-[#E7EAEC] overflow-hidden flex items-center justify-center hover:bg-[#DFE3E8] transition-colors cursor-pointer"
          >
            <User className="w-5 h-5 text-[#637381]" />
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          sideOffset={8}
          className="w-48.5 rounded-xl p-3 shadow-[0px_4px_21px_0px_rgba(98,101,120,0.12)] border border-[#F4F6F8] flex flex-col gap-0"
        >
          {/* View Profile */}
          <Link
            href="/account"
            onClick={() => setPopoverOpen(false)}
            className="flex items-center gap-4 px-1 py-1 text-[#454F5B] hover:text-[#0F2A3C] hover:bg-[#F4F6F8] rounded-lg transition-colors cursor-pointer"
          >
            <div className="size-5 flex items-center justify-center shrink-0">
              <UserProfileIcon />
            </div>
            <span className="text-base font-normal leading-6">
              View Profile
            </span>
          </Link>

          {/* Divider */}
          <div className="h-px w-full bg-[#F4F6F8] my-3" />

          {/* Log out */}
          <button
            onClick={handleOpenLogoutDialog}
            className="flex items-center gap-4 px-1 py-1 text-[#D6342C] hover:text-[#DE5D56] hover:bg-[#FFF4F4] rounded-lg transition-colors cursor-pointer w-full"
          >
            <ExitIcon className="size-5.5 text-[#D6342C]" />
            <span className="text-base font-normal leading-6">Log out</span>
          </button>
        </PopoverContent>
      </Popover>

      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent className="sm:max-w-100 rounded-2xl p-8 gap-5 shadow-[0px_8px_16px_0px_rgba(145,158,171,0.16)]">
          <div className="flex flex-col items-center gap-2 text-center text-textPrimary">
            <DialogTitle className="text-2xl font-semibold leading-9">
              Log out
            </DialogTitle>
            <p className="text-base leading-6">
              Are you sure you want to Log out?
            </p>
          </div>
          <div className="flex gap-2 w-full">
            <button
              type="button"
              onClick={() => setLogoutDialogOpen(false)}
              className="flex-1 border border-[#454F5B] rounded py-4 px-8 text-[15px] font-bold text-[#454F5B] hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleConfirmLogout}
              className="flex-1 bg-[#FF4842] rounded py-4 px-8 text-[15px] font-bold text-white hover:bg-[#e63e38] transition-colors cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NavbarProfilePopover;
