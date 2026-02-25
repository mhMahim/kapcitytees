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
    <div className="flex flex-col gap-4 w-57.5 shrink-0">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className="bg-white rounded-2xl px-6 py-4 shadow-[0px_4px_20px_0px_rgba(145,158,171,0.08)]"
        >
          <span
            className={cn(
              "text-lg leading-7",
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
