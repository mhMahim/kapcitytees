"use client";

import { cn } from "@/lib/utils";

export type AccountTab = "profile" | "notification" | "payment" | "security";

const tabs: { label: string; value: AccountTab }[] = [
  { label: "Profile", value: "profile" },
  { label: "Notification", value: "notification" },
  { label: "Payment", value: "payment" },
  { label: "Security", value: "security" },
];

interface AccountTabSliderProps {
  activeTab: AccountTab;
  onTabChange: (tab: AccountTab) => void;
}

const AccountTabSlider = ({ activeTab, onTabChange }: AccountTabSliderProps) => {
  return (
    <div className="bg-white rounded-xl p-2 sm:p-3 lg:p-4 sm:flex flex-row lg:flex-col gap-1 sm:gap-2 lg:gap-4 shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)] w-full lg:w-51 shrink-0 lg:h-full grid grid-cols-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onTabChange(tab.value)}
            className={cn(
              "flex-1 lg:flex-none whitespace-nowrap px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 rounded-lg text-sm text-center lg:text-left transition-colors cursor-pointer shrink-0",
              isActive
                ? "bg-[#E9F1F6] text-[#1E6FA8] font-semibold"
                : "text-[#637381] font-normal hover:bg-gray-50"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default AccountTabSlider;
