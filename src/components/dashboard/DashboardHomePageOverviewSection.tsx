import {
  ClicksIcon5,
  LowerTrendIcon,
  RevenueIcon5,
  SettingsIcon5,
  ShoppingBagIcon5,
  UpperTrendIcon,
} from "@/assets/icons";
import { cn } from "@/lib/utils";

const DashboardHomePageOverviewSection = () => {
  const statsData = [
    {
      title: "Total Revenue",
      value: "$5,300",
      change: "2%",
      activeStatus: true,
      icon: RevenueIcon5,
      trendIcon: UpperTrendIcon,
    },
    {
      title: "Total Clicks",
      value: "4275",
      change: "2%",
      activeStatus: false,
      icon: ClicksIcon5,
      trendIcon: LowerTrendIcon,
    },
    {
      title: "Conversion",
      value: "312",
      change: "2%",
      activeStatus: false,
      icon: ShoppingBagIcon5,
      trendIcon: UpperTrendIcon,
    },
    {
      title: "Conversion rate",
      value: "11%",
      change: "2%",
      activeStatus: false,
      icon: SettingsIcon5,
      trendIcon: UpperTrendIcon,
    },
  ];

  return (
    <div className="flex gap-4">
      {statsData.map((item, i) => (
        <div
          key={i}
          className={cn(
            `flex p-6 flex-col gap-6 grow basis-0 rounded-2xl relative`,
            item.activeStatus
              ? "bg-[radial-gradient(171.85%_139.66%_at_100%_100%,#328AC8_0%,#1E6FA8_96.15%)] shadow-[0_4px_21px_0_rgba(75,140,185,0.32)]"
              : "bg-white shadow-[0_4px_21px_0_rgba(98,101,120,0.04)]",
          )}
        >
          <div className="flex justify-between items-center">
            <span
              className={cn(
                `text-lg font-medium`,
                item.activeStatus ? "text-white" : "text-[#637381]",
              )}
            >
              {item.title}
            </span>

            <item.icon
              className={cn("text-[#689FC5]", {
                "text-white": item.activeStatus,
              })}
            />
          </div>

          <div className="flex justify-between items-center">
            <span
              className={cn(
                `text-[32px] font-semibold`,
                item.activeStatus ? "text-white" : "text-[#0f2a3c]",
              )}
            >
              {item.value}
            </span>

            <div className="flex gap-1 items-center">
              <span
                className={cn(
                  `text-lg font-medium`,
                  item.activeStatus ? "text-[#e9f1f6]" : "text-[#637381]",
                )}
              >
                {item.change}
              </span>

              <item.trendIcon
                className={cn("", {
                  "text-white": item.activeStatus,
                })}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardHomePageOverviewSection;
