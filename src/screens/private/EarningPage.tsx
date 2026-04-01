"use client";

import Image from "next/image";
import { Wallet } from "lucide-react";
import useFetchData from "@/hooks/useFetchData";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardWithdrawalHistorySection from "@/components/dashboard/DashboardWithdrawalHistorySection";

interface EarningsData {
  available_for_withdrawal: number;
  lifetime_income: number;
}

const EarningPage = () => {
  const {
    data: earningsResponse,
    isPending: isEarningsPending,
    isError: isEarningsError,
  } = useFetchData("/barber/earnings", true);

  const earningsData = earningsResponse?.data as EarningsData | undefined;
  const availableForWithdrawal = earningsData?.available_for_withdrawal ?? 0;
  const lifetimeIncome = earningsData?.lifetime_income ?? 0;

  const formatAmount = (value: number) =>
    new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="flex flex-col gap-6">
      {/* Top Cards */}
      {isEarningsPending ? (
        <div className="flex flex-col sm:flex-row gap-6 items-stretch">
          <div className="flex-1 rounded-2xl shadow-[0px_4px_21px_0px_rgba(75,140,185,0.32)] p-6 pb-5 flex flex-col gap-4 bg-linear-to-r from-[#328AC8] to-[#1E6FA8]">
            <Skeleton className="h-7 w-56 bg-white/30" />
            <div className="flex items-center justify-between">
              <Skeleton className="h-12 w-40 bg-white/30" />
              <Skeleton className="h-11 w-30 rounded-xl bg-white/70" />
            </div>
          </div>
          <div className="w-full sm:w-100.75 bg-white rounded-2xl shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)] px-5 sm:px-7 pt-4 pb-5 flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            <Skeleton className="h-10 w-36" />
          </div>
        </div>
      ) : isEarningsError ? (
        <div className="bg-white rounded-2xl shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)] px-5 py-4">
          <p className="text-sm sm:text-base font-semibold text-[#B42318]">
            Failed to load earnings summary. Please try again later.
          </p>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-6 items-stretch">
          {/* Available for Withdrawal Card */}
          <div className="flex-1 relative overflow-hidden rounded-2xl shadow-[0px_4px_21px_0px_rgba(75,140,185,0.32)] bg-linear-to-r from-[#328AC8] to-[#1E6FA8] p-6 pb-5 flex flex-col gap-2">
            {/* Background Wave */}
            <div className="absolute right-0 bottom-0 w-full sm:w-150 h-24 sm:h-32 pointer-events-none">
              <Image
                src="https://i.ibb.co.com/W48cvZYm/Group-1000004143.png"
                alt=""
                fill
                className=""
              />
            </div>

            {/* Title */}
            <p className="text-base sm:text-xl font-medium text-[#E9F1F6] leading-6 sm:leading-7.5 relative z-10">
              Available for Withdrawal
            </p>

            {/* Amount + Button */}
            <div className="flex items-center justify-between px-1 sm:px-2 relative z-10">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight sm:leading-16 bg-linear-to-r from-white/80 to-white bg-clip-text text-transparent">
                ${formatAmount(availableForWithdrawal)}
              </p>
              <button className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(27,101,153,0.2)] px-4 sm:px-5 py-2.5 sm:py-3 sm:w-37.25 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors shrink-0">
                <span className="text-sm sm:text-base font-semibold text-[#1E6FA8] leading-5 sm:leading-6">
                  Withdraw
                </span>
              </button>
            </div>
          </div>

          {/* Lifetime Income Card */}
          <div className="w-full sm:w-100.75 bg-white rounded-2xl shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)] px-5 sm:px-7 pt-4 pb-5 flex flex-col justify-between gap-2 sm:gap-0">
            <div className="flex items-center justify-between">
              <p className="text-sm sm:text-lg font-medium text-[#637381] leading-5 sm:leading-7">
                Lifetime income
              </p>
              <div className="p-1">
                <Wallet className="size-7 sm:size-10 text-[#1E6FA8]" />
              </div>
            </div>
            <p className="text-2xl sm:text-[32px] font-semibold text-[#3F5563] leading-tight sm:leading-12">
              {formatAmount(lifetimeIncome)}$
            </p>
          </div>
        </div>
      )}

      <DashboardWithdrawalHistorySection />
    </div>
  );
};

export default EarningPage;
