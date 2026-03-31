"use client";

import { useMemo } from "react";
import {
  ClicksIcon5,
  LowerTrendIcon,
  RevenueIcon5,
  SettingsIcon5,
  ShoppingBagIcon5,
  UpperTrendIcon,
} from "@/assets/icons";
import { Skeleton } from "@/components/ui/skeleton";
import useFetchData from "@/hooks/useFetchData";
import { cn } from "@/lib/utils";

interface ReferralStatsData {
  referral_code?: string;
  total_clicks?: number;
  conversion_rate?: number;
  total_commission?: number;
}

interface ReferralStatsResponse {
  status?: boolean;
  data?: ReferralStatsData;
}

const normalizeConversionRate = (rate: number) => {
  if (!Number.isFinite(rate) || rate <= 0) {
    return 0;
  }

  return rate <= 1 ? rate * 100 : rate;
};

const formatPercent = (value: number) => {
  return `${value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}%`;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

const DashboardHomePageOverviewSection = () => {
  const { data, isPending, isError, error, refetch } = useFetchData(
    "/barber/referral-stats",
    true,
  );

  const referralStats = (data as ReferralStatsResponse | undefined)?.data;
  const totalClicks = Number(referralStats?.total_clicks ?? 0);
  const rawConversionRate = Number(referralStats?.conversion_rate ?? 0);
  const conversionRate = normalizeConversionRate(rawConversionRate);
  const totalConversions = Math.round((totalClicks * conversionRate) / 100);
  const totalCommission = Number(referralStats?.total_commission ?? 0);

  const statsData = useMemo(
    () => [
      {
        title: "Total Commission",
        value: formatCurrency(totalCommission),
        change: "0%",
        activeStatus: true,
        icon: RevenueIcon5,
        trendIcon: totalCommission > 0 ? UpperTrendIcon : LowerTrendIcon,
      },
      {
        title: "Total Clicks",
        value: totalClicks.toLocaleString("en-US"),
        change: "0%",
        activeStatus: false,
        icon: ClicksIcon5,
        trendIcon: totalClicks > 0 ? UpperTrendIcon : LowerTrendIcon,
      },
      {
        title: "Conversion",
        value: totalConversions.toLocaleString("en-US"),
        change: formatPercent(conversionRate),
        activeStatus: false,
        icon: ShoppingBagIcon5,
        trendIcon: totalConversions > 0 ? UpperTrendIcon : LowerTrendIcon,
      },
      {
        title: "Conversion rate",
        value: formatPercent(conversionRate),
        change: `${totalConversions.toLocaleString("en-US")} %`,
        activeStatus: false,
        icon: SettingsIcon5,
        trendIcon: conversionRate > 0 ? UpperTrendIcon : LowerTrendIcon,
      },
    ],
    [totalCommission, totalClicks, totalConversions, conversionRate],
  );

  const errorMessage =
    error instanceof Error
      ? error.message
      : "Unable to load referral stats right now.";

  if (isPending) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-3.5 2xl:gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex p-4 sm:p-5 2xl:p-6 flex-col gap-4 sm:gap-5 2xl:gap-6 rounded-xl sm:rounded-2xl bg-white shadow-[0_4px_21px_0_rgba(98,101,120,0.04)]"
          >
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>

            <div className="flex justify-between items-center">
              <Skeleton className="h-9 w-20" />
              <div className="flex gap-1 items-center">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-5 w-5 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-3.5 2xl:gap-4">
        <div className="sm:col-span-2 xl:col-span-4 rounded-xl sm:rounded-2xl bg-[#FFF2F2] px-5 sm:px-6 py-6 sm:py-7 border border-[#FBC5C2]">
          <p className="text-base sm:text-lg font-semibold text-[#B42318]">
            Failed to load referral stats.
          </p>
          <p className="mt-2 text-sm sm:text-base text-[#7A271A]">
            {errorMessage}
          </p>
          <button
            onClick={() => refetch()}
            className="mt-5 h-10 px-5 rounded-xl bg-[#1E6FA8] text-white text-sm font-semibold hover:bg-[#1A5F92] transition-colors cursor-pointer"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-3.5 2xl:gap-4">
      {statsData.map((item, i) => (
        <div
          key={i}
          className={cn(
            `flex p-4 sm:p-5 2xl:p-6 flex-col gap-4 sm:gap-5 2xl:gap-6 rounded-xl sm:rounded-2xl relative`,
            item.activeStatus
              ? "bg-[radial-gradient(171.85%_139.66%_at_100%_100%,#328AC8_0%,#1E6FA8_96.15%)] shadow-[0_4px_21px_0_rgba(75,140,185,0.32)]"
              : "bg-white shadow-[0_4px_21px_0_rgba(98,101,120,0.04)]",
          )}
        >
          <div className="flex justify-between items-center">
            <span
              className={cn(
                `text-sm sm:text-base 2xl:text-lg font-medium`,
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
                `text-xl sm:text-2xl 2xl:text-[32px] font-semibold`,
                item.activeStatus ? "text-white" : "text-[#0f2a3c]",
              )}
            >
              {item.value}
            </span>

            {/* <div className="flex gap-1 items-center">
              <span
                className={cn(
                  `text-sm sm:text-base 2xl:text-lg font-medium`,
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
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardHomePageOverviewSection;
