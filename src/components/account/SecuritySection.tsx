"use client";

import { ChevronLeft } from "lucide-react";

const securityActions = [
  { label: "Log Out", action: "logout" },
  { label: "Change Password", action: "change-password" },
  { label: "Delete Account", action: "delete-account" },
] as const;

const SecuritySection = () => {
  const handleAction = (action: string) => {
    // Handle security actions
    console.log("Security action:", action);
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0px_4px_20px_0px_rgba(145,158,171,0.08)] p-8 flex flex-col flex-1">
      <div className="flex flex-col gap-6">
        {securityActions.map((item) => (
          <button
            key={item.action}
            onClick={() => handleAction(item.action)}
            className="border border-[#DFE3E8] rounded-xl px-6 py-4.5 flex items-center shadow-[0px_3px_50px_0px_rgba(211,211,211,0.2)] hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex-1 flex flex-col items-start">
              <p className="text-base font-semibold text-textPrimary leading-6">
                {item.label}
              </p>
            </div>
            <ChevronLeft className="size-6 text-[#637381] rotate-180" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SecuritySection;
