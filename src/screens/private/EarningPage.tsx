"use client";

import Image from "next/image";
import { Wallet } from "lucide-react";

type PaymentStatus = "Pending" | "Complete" | "Declined";

interface PaymentRecord {
  id: string;
  date: string;
  amount: string;
  status: PaymentStatus;
}

const paymentHistory: PaymentRecord[] = [
  { id: "1", date: "10 / 1 / 2026", amount: "600$", status: "Pending" },
  { id: "2", date: "10 / 1 / 2026", amount: "600$", status: "Pending" },
  { id: "3", date: "10 / 1 / 2026", amount: "600$", status: "Complete" },
  { id: "4", date: "10 / 1 / 2026", amount: "600$", status: "Complete" },
  { id: "5", date: "10 / 1 / 2026", amount: "600$", status: "Complete" },
  { id: "6", date: "10 / 1 / 2026", amount: "600$", status: "Complete" },
  { id: "7", date: "10 / 1 / 2026", amount: "600$", status: "Complete" },
  { id: "8", date: "10 / 1 / 2026", amount: "600$", status: "Declined" },
];

const statusStyles: Record<PaymentStatus, string> = {
  Pending: "bg-[#FEF3C7] border-[#F59E0B] text-[#F59E0B]",
  Complete: "bg-[#E6FDF2] border-[#A5E6C6] text-[#0CAF60]",
  Declined: "bg-[rgba(255,72,66,0.1)] border-[#FF4842] text-[#D6342C]",
};

const StatusChip = ({ status }: { status: PaymentStatus }) => (
  <span
    className={`inline-flex items-center justify-center px-3 py-1 rounded-md border text-xs leading-4.5 ${statusStyles[status]}`}
  >
    {status}
  </span>
);

const EarningPage = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Top Cards */}
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
              $5,300
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
            10,000$
          </p>
        </div>
      </div>

      {/* Payment History Table */}
      <div className="bg-white rounded-2xl shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)] overflow-hidden pb-3">
        {/* Table Header */}
        <div className="flex items-center min-h-14 px-3 sm:px-4 py-3">
          <h3 className="text-base sm:text-lg font-semibold text-textPrimary leading-6">
            Payment History
          </h3>
        </div>

        {/* Table */}
        <div className="px-2 sm:px-3">
          {/* Column Headers — desktop only */}
          <div className="hidden sm:flex items-center px-1">
            <div className="w-64 bg-[#F9FAFB] px-3 py-2 rounded-l-lg">
              <p className="text-sm font-semibold text-[#637381]">Date</p>
            </div>
            <div className="flex-1 bg-[#F9FAFB] px-3 py-2 rounded-lg">
              <p className="text-sm font-semibold text-[#637381]">Amount</p>
            </div>
            <div className="w-54 bg-[#F9FAFB] px-3 py-2 rounded-r-lg text-center">
              <p className="text-sm font-semibold text-[#637381]">Status</p>
            </div>
          </div>

          {/* Rows */}
          {paymentHistory.map((record, index) => (
            <div
              key={record.id}
              className={`${
                index < paymentHistory.length - 1
                  ? "border-b border-[#F9FAFB]"
                  : ""
              }`}
            >
              {/* Mobile row */}
              <div className="sm:hidden flex items-center justify-between gap-3 py-3 px-2">
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="text-xs text-[#637381] leading-4">Date</p>
                  <p className="text-sm font-medium text-textPrimary leading-5 whitespace-nowrap">
                    {record.date}
                  </p>
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-xs text-[#637381] leading-4">Amount</p>
                  <p className="text-sm font-medium text-textPrimary leading-5">
                    {record.amount}
                  </p>
                </div>
                <StatusChip status={record.status} />
              </div>

              {/* Desktop row */}
              <div className="hidden sm:flex items-center py-1">
                <div className="w-64 h-16 flex items-center px-4">
                  <p className="text-base text-textPrimary leading-6">
                    {record.date}
                  </p>
                </div>
                <div className="flex-1 h-16 flex items-center px-4">
                  <p className="text-base text-textPrimary leading-6">
                    {record.amount}
                  </p>
                </div>
                <div className="w-54 h-16 flex items-center justify-center px-4">
                  <StatusChip status={record.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EarningPage;
