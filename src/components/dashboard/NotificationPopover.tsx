"use client";

import { useState } from "react";
import { BelowIcon } from "@/assets/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DollarSign,
  CreditCard,
  PackagePlus,
  ShieldCheck,
} from "lucide-react";

interface Notification {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
}

const notifications: Notification[] = [
  {
    id: "1",
    icon: <DollarSign className="size-6 text-[#1E6FA8]" />,
    title: "New Commission Earned!",
    description: "You earned $8.50 from a Matte Clay referral.",
    time: "2 hours ago",
  },
  {
    id: "2",
    icon: <CreditCard className="size-6 text-[#1E6FA8]" />,
    title: "Payout Processed",
    description: "$320.50 has been sent to your connected bank account.",
    time: "2 hours ago",
  },
  {
    id: "3",
    icon: <PackagePlus className="size-6 text-[#1E6FA8]" />,
    title: "New Product Added",
    description: "Professional Beard Oil is now available in your catalog.",
    time: "2 hours ago",
  },
  {
    id: "4",
    icon: <ShieldCheck className="size-6 text-[#1E6FA8]" />,
    title: "Password Updated Successfully",
    description:
      "Your account security has been updated. If this wasn't you, contact support immediately",
    time: "2 hours ago",
  },
];

const FILTER_OPTIONS = ["All time", "Today", "This Week", "This Month"] as const;
type FilterOption = (typeof FILTER_OPTIONS)[number];

const NotificationPopover = ({ children }: { children: React.ReactNode }) => {
  const [filter, setFilter] = useState<FilterOption>("All time");
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        // align="end"
        sideOffset={8}
        className="w-150 p-8 rounded-3xl border-0 shadow-[0px_8px_16px_0px_rgba(145,158,171,0.16)]"
      >
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-medium text-[#0F2A3C] leading-7.5">
              Notification
            </h3>
            <Popover open={filterOpen} onOpenChange={setFilterOpen}>
              <PopoverTrigger asChild>
                <button className="flex gap-2 items-center border border-[#DFE3E8] rounded-lg pl-4 pr-3 py-1 cursor-pointer">
                  <span className="text-sm font-semibold leading-5.5 text-[#454F5B]">
                    {filter}
                  </span>
                  <BelowIcon className="size-5" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="w-36 p-3 rounded-xl shadow-[0px_4px_16px_0px_rgba(145,158,171,0.16)] border-0 flex flex-col gap-2"
              >
                {FILTER_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setFilter(option);
                      setFilterOpen(false);
                    }}
                    className={`text-left text-sm leading-5.5 cursor-pointer transition-colors px-2 py-1 rounded ${
                      filter === option
                        ? "text-[#1E6FA8] font-semibold"
                        : "text-[#637381] hover:text-[#454F5B]"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </PopoverContent>
            </Popover>
          </div>

          {/* Notification List */}
          <div className="flex flex-col gap-6">
            {notifications.map((item, index) => (
              <div key={item.id}>
                <div className="flex gap-4 items-start">
                  {/* Icon */}
                  <div className="bg-[#E9F1F6] rounded-full size-12.5 shrink-0 flex items-center justify-center">
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col gap-1 min-w-0">
                    <p className="text-base font-semibold text-[#11161C] leading-6">
                      {item.title}
                    </p>
                    <p className="text-sm text-[#637381] leading-5.5">
                      {item.description}
                    </p>
                  </div>

                  {/* Time */}
                  <span className="text-xs text-[#637381] leading-4.5 shrink-0 text-right">
                    {item.time}
                  </span>
                </div>

                {/* Divider */}
                {index < notifications.length - 1 && (
                  <div className="border-b border-[#F4F6F8] mt-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;
