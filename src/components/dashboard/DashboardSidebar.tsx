"use client";

import {
  AccountIcon,
  ClientsIcon,
  DashboardIcon,
  EarningIcon,
  ProductIcon,
  TrainingIcon,
  // ExitIcon,
} from "@/assets/icons";
import Logo from "@/components/shared/Logo";
// import { useState } from "react";
import SidebarLink from "./SidebarLink";

import { ComponentType, SVGProps } from "react";
import { useStateContext } from "@/hooks/useStateContext";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export interface DashboardNavLink {
  name: string;
  icon: IconType;
  path: string;
  disabled?: boolean;
}

const dashboardNavlinks: DashboardNavLink[] = [
  { name: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
  {
    name: "Products",
    icon: ProductIcon,
    path: "/dashboard/products",
  },
  {
    name: "My Clients",
    icon: ClientsIcon,
    path: "/dashboard/my-clients",
  },
  {
    name: "Earning",
    icon: EarningIcon,
    path: "/dashboard/earning",
  },
  {
    name: "Training",
    icon: TrainingIcon,
    path: "/dashboard/training",
  },
  {
    name: "Account",
    icon: AccountIcon,
    path: "/dashboard/account",
  },
];

const DashboardSidebar = ({ onNavigate }: { onNavigate?: () => void }) => {
  // const [logoutLoading, setLogoutLoading] = useState(false);

  // const handleLogout = () => {
  //   setLogoutLoading(true);
  // };

  const { userData } = useStateContext();
  const isTutorialIncompleteBarber =
    userData?.data?.role === "barber" &&
    userData?.data?.is_tutorial_completed === false;

  const navLinks = dashboardNavlinks.map((link) => ({
    ...link,
    disabled: isTutorialIncompleteBarber && link.path !== "/dashboard/training",
  }));

  return (
    <div className="bg-white space-y-10 xl:space-y-14 flex flex-col overflow-y-auto min-w-60 xl:min-w-65 2xl:min-w-70 h-screen sticky top-0 px-6 py-12 shadow-[0_0_21px_0_rgba(98,101,120,0.04)]">
      <div className="flex items-center justify-center">
        <Logo className="size-26" path="/dashboard" />
      </div>
      <div className="grow flex flex-col gap-2 xl:gap-2.5">
        {navLinks.map((link) => {
          return (
            <SidebarLink key={link.path} link={link} onNavigate={onNavigate} />
          );
        })}
      </div>
      {/* <div className="">
        <button
          type="button"
          onClick={handleLogout}
          disabled={logoutLoading}
          className="flex items-center gap-2.5 xl:gap-3 px-2.5 xl:px-3 py-2.5 xl:py-2.75 text-destructive hover:text-white hover:bg-destructive transition-all duration-200 w-full rounded-md cursor-pointer text-base xl:text-lg font-medium disabled:opacity-50 disabled:cursor-auto"
        >
          <ExitIcon className="size-5 xl:size-6" />
          {logoutLoading ? "Signing Out..." : "Sign Out"}
        </button>
      </div> */}
    </div>
  );
};

export default DashboardSidebar;
