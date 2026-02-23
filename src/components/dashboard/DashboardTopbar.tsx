"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu } from "lucide-react";
import { BelowIcon, NotificationIcon } from "@/assets/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ProfilePopoverMenu from "@/components/dashboard/ProfilePopoverMenu";
import NotificationPopover from "@/components/dashboard/NotificationPopover";
import { usePathname } from "next/navigation";

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Track today\u2019s growth.",
  },
  "/dashboard/training": {
    title: "Training",
    subtitle: "Learn and understand your clients better",
  },
  "/dashboard/product": {
    title: "Products",
    subtitle: "Share links and Earn commission.",
  },
  "/dashboard/my-clients": {
    title: "My Clients",
    subtitle: "Track your Clients and orders",
  },
  "/dashboard/earning": {
    title: "Earning",
    subtitle: "Claim your rearward",
  },
  "/dashboard/account": {
    title: "My Account",
    subtitle: "Keep your info up to date.",
  },
};

function getPageMeta(pathname: string) {
  if (pageMeta[pathname]) return pageMeta[pathname];
  if (pathname.startsWith("/dashboard/training/"))
    return pageMeta["/dashboard/training"]!;
  return pageMeta["/dashboard"]!;
}

const DashboardTopbar = () => {
  const pathname = usePathname();
  const meta = getPageMeta(pathname);

  return (
    <div className="flex justify-between items-center p-3 sm:p-4 lg:p-6 xl:p-8 gap-3">
      {/* Left section with hamburger and welcome message */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger menu */}
        <button
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="size-6 text-gray-700" />
        </button>

        <div className="left">
          <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-[32px] font-bold text-textPrimary leading-12">
            {meta.title}
          </h3>
          <h4 className="text-sm sm:text-base font-semibold hidden sm:block text-[#637381]">
            {meta.subtitle}
          </h4>
        </div>
      </div>

      {/* Right section with notifications and avatar */}
      <div className="right flex gap-2 sm:gap-3 lg:gap-6">
        <NotificationPopover>
          <div className="bg-white aspect-square rounded-full size-10 sm:size-12 lg:size-15 flex items-center justify-center cursor-pointer relative select-none shadow-[0_0_21px_0_rgba(26,29,49,0.04)]">
            <NotificationIcon className="size-5 sm:size-6 lg:size-7" />
          </div>
        </NotificationPopover>

        <Popover>
          <PopoverTrigger asChild>
            <button className="flex gap-3 bg-white p-2 pr-5 rounded-full cursor-pointer">
              <Avatar className="aspect-square shrink-0 size-11">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-[#454F5B]">
                  Alexa Johnson
                </p>
                <p className="text-xs text-[#637381]">alexajohnson@mail.com</p>
              </div>
              <BelowIcon className="my-auto" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto rounded-xl border-0 p-4 shadow-[0px_4px_16px_0px_rgba(145,158,171,0.16)]">
            <ProfilePopoverMenu />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DashboardTopbar;
