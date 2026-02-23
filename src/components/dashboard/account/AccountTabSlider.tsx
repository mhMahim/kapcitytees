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
    <div className="bg-white rounded-xl p-4 flex flex-col gap-4 shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)] w-full lg:w-51 shrink-0 h-full">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onTabChange(tab.value)}
            className={cn(
              "px-5 py-3 rounded-lg text-sm text-left transition-colors cursor-pointer",
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
