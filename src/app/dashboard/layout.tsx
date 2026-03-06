"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
} from "@/components/ui/drawer";

const layout = ({ children }: { children: React.ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>

      {/* Mobile Sidebar Drawer */}
      <Drawer
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        direction="left"
      >
        <DrawerContent className="w-72 p-0 border-0 rounded-none">
          {/* Close button */}
          <DrawerClose asChild>
            <button
              className="absolute top-4 right-4 z-10 flex items-center justify-center size-8 rounded-lg bg-white/80 hover:bg-white transition-colors shadow-sm"
              aria-label="Close menu"
            >
              <X className="size-5 text-gray-600" />
            </button>
          </DrawerClose>
          <DashboardSidebar onNavigate={() => setMobileOpen(false)} />
        </DrawerContent>
      </Drawer>

      {/* Main Content Area */}
      <div className="min-w-0 grow">
        <DashboardTopbar onMenuToggle={() => setMobileOpen((v) => !v)} />
        <div className="p-4 pt-1 sm:p-5 sm:pt-1.5 lg:p-8 lg:pt-2">{children}</div>
      </div>
    </div>
  );
};

export default layout;
