"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Profile", href: "/account" },
  { label: "Orders", href: "/account/orders" },
  { label: "Security", href: "/account/security" },
];

const AccountSidebar = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/account") {
      return pathname === "/account" || pathname === "/account/profile" || pathname === "/account/profile/edit";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="flex flex-row lg:flex-col gap-2 lg:gap-4 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 w-full lg:w-57.5 lg:shrink-0">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className="shrink-0 lg:w-full bg-white rounded-2xl px-4 py-3 lg:px-6 lg:py-4 shadow-[0px_4px_20px_0px_rgba(145,158,171,0.08)]"
        >
          <span
            className={cn(
              "text-sm sm:text-base lg:text-lg leading-5 sm:leading-6 lg:leading-7 whitespace-nowrap",
              isActive(tab.href)
                ? "font-semibold text-[#1E6FA8]"
                : "font-medium text-[#637381]",
            )}
          >
            {tab.label}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default AccountSidebar;
