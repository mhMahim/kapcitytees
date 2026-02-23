"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardNavLink } from "./DashboardSidebar";

const SidebarLink = ({ link }: { link: DashboardNavLink }) => {
  const pathname = usePathname();

  const isActive =
    link.path === "/dashboard"
      ? pathname === "/dashboard"
      : pathname === link.path || pathname.startsWith(link.path + "/");

  return (
    <Link
      href={link.path}
      className={cn(
        "flex items-center gap-2.5 xl:gap-3 px-3.5 xl:px-4 py-3 text-[#637381] hover:text-white hover:bg-primary/75 transition-all duration-200 w-full rounded-xl cursor-pointer text-base font-medium",
        { "bg-primary text-white hover:bg-primary": isActive },
      )}
    >
      <link.icon className="size-5 xl:size-6" />
      {link.name}
    </Link>
  );
};

export default SidebarLink;
