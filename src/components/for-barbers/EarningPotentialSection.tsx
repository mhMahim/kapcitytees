"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const MIN_CLIENTS = 10;
const MAX_CLIENTS = 300;
const CONVERSION_RATE = 0.2; // 20%
const UNITS_PER_CONVERSION = 2;
const PRICE_PER_UNIT = 85;
const COMMISSION_RATE = 0.2; // 20%

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

const EarningPotentialSection = () => {
  const [clients, setClients] = useState(60);

  const units = Math.round(clients * CONVERSION_RATE * UNITS_PER_CONVERSION);
  const grossRevenue = units * PRICE_PER_UNIT;
  const monthlyEarnings = grossRevenue * COMMISSION_RATE;

  const fillPercent =
    ((clients - MIN_CLIENTS) / (MAX_CLIENTS - MIN_CLIENTS)) * 100;

  return (
    <section className="w-full py-10 sm:py-14 lg:py-15 px-4 sm:px-8 lg:px-14 flex flex-col gap-8 sm:gap-10 lg:gap-12 items-center">
      {/* Heading */}
      <div className="flex gap-6 sm:gap-8 items-center w-full max-w-5xl">
        <div className="flex-1 h-px bg-[#DFE3E8]" />
        <h2 className="font-bold text-2xl sm:text-3xl lg:text-[48px] leading-tight lg:leading-17 text-[#0F2A3C] text-center shrink-0">
          Your Earning Potential
        </h2>
        <div className="flex-1 h-px bg-[#DFE3E8]" />
      </div>

      {/* Calculator Card */}
      <div className="bg-white rounded-2xl w-full max-w-5xl px-6 sm:px-8 lg:px-10 py-6 sm:py-7 lg:py-8 flex flex-col gap-6 sm:gap-7 lg:gap-8 shadow-sm">
        {/* Slider Section */}
        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
          <p className="font-semibold text-lg sm:text-xl lg:text-2xl leading-9 text-[#454F5B]">
            Monthly Clients
          </p>
          <div className="flex flex-col gap-2">
            {/* Range slider */}
            <div className="relative h-4.25 flex items-center">
              <style>{`
                .earning-slider {
                  -webkit-appearance: none;
                  appearance: none;
                  width: 100%;
                  height: 8px;
                  border-radius: 10px;
                  outline: none;
                  cursor: pointer;
                  background: linear-gradient(
                    to right,
                    #1E6FA8 0%,
                    #1E6FA8 ${fillPercent}%,
                    #E7EAEC ${fillPercent}%,
                    #E7EAEC 100%
                  );
                }
                .earning-slider::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  width: 18px;
                  height: 18px;
                  border-radius: 50%;
                  background: white;
                  border: 2.5px solid #1E6FA8;
                  box-shadow: 0 0 0 2px rgba(30,111,168,0.15);
                  cursor: pointer;
                  transition: box-shadow 0.15s;
                }
                .earning-slider::-webkit-slider-thumb:hover {
                  box-shadow: 0 0 0 4px rgba(30,111,168,0.2);
                }
                .earning-slider::-moz-range-thumb {
                  width: 18px;
                  height: 18px;
                  border-radius: 50%;
                  background: white;
                  border: 2.5px solid #1E6FA8;
                  box-shadow: 0 0 0 2px rgba(30,111,168,0.15);
                  cursor: pointer;
                }
              `}</style>
              <input
                type="range"
                min={MIN_CLIENTS}
                max={MAX_CLIENTS}
                value={clients}
                onChange={(e) => setClients(Number(e.target.value))}
                className="earning-slider w-full"
              />
            </div>
            {/* Scale labels */}
            <div className="flex items-center justify-between px-1">
              <span className="text-sm sm:text-base text-[#637381]">
                {MIN_CLIENTS}
              </span>
              <span
                className={cn(
                  "text-sm sm:text-base font-bold text-[#454F5B] transition-all duration-150",
                )}
              >
                {clients}
              </span>
              <span className="text-sm sm:text-base text-[#637381]">
                {MAX_CLIENTS}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#DFE3E8] w-full" />

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          <div className="flex flex-col gap-1 sm:gap-2">
            <p className="text-sm sm:text-base lg:text-lg font-medium text-[#5E707C] leading-7">
              Conversion Rate
            </p>
            <p className="text-xl sm:text-2xl lg:text-[32px] font-semibold leading-tight lg:leading-12 text-[#1E6FA8]">
              {(CONVERSION_RATE * 100).toFixed(0)}%
            </p>
          </div>
          <div className="flex flex-col gap-1 sm:gap-2">
            <p className="text-sm sm:text-base lg:text-lg font-medium text-[#5E707C] leading-7">
              Units/Month
            </p>
            <p className="text-xl sm:text-2xl lg:text-[32px] font-semibold leading-tight lg:leading-12 text-[#1E6FA8]">
              {units}
            </p>
          </div>
          <div className="flex flex-col gap-1 sm:gap-2">
            <p className="text-sm sm:text-base lg:text-lg font-medium text-[#5E707C] leading-7">
              Commission Rate
            </p>
            <p className="text-xl sm:text-2xl lg:text-[32px] font-semibold leading-tight lg:leading-12 text-[#1E6FA8]">
              {(COMMISSION_RATE * 100).toFixed(0)}%
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#DFE3E8] w-full" />

        {/* Revenue Section */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Gross Monthly Revenue */}
          <div className="flex flex-col gap-1 sm:gap-2 px-1">
            <p className="text-sm sm:text-base lg:text-lg font-medium text-[#5E707C] leading-7">
              Gross Monthly Revenue
            </p>
            <p className="text-xl sm:text-2xl lg:text-[24px] font-semibold leading-9 text-[#D6342C]">
              {formatCurrency(grossRevenue)}
            </p>
          </div>

          {/* Monthly Earnings Highlight Box */}
          <div className="bg-[#E9F1F6] border border-[#B9D2E4] rounded-2xl px-4 sm:px-5 py-4 sm:py-5 flex flex-col gap-1 sm:gap-2">
            <p className="text-sm sm:text-base lg:text-lg font-medium text-[#5E707C] leading-7">
              Your Monthly Earnings
            </p>
            <p className="text-3xl sm:text-4xl lg:text-[48px] font-semibold leading-tight lg:leading-16 text-[#1E6FA8]">
              {formatCurrency(monthlyEarnings)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarningPotentialSection;
