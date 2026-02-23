"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BelowIcon } from "@/assets/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const chartData = [
  { day: "01", revenue: 5.5, click: 3.5 },
  { day: "02", revenue: 5.0, click: 3.8 },
  { day: "03", revenue: 5.2, click: 4.5 },
  { day: "04", revenue: 5.8, click: 5.2 },
  { day: "05", revenue: 6.2, click: 6.0 },
  { day: "06", revenue: 6.5, click: 7.0 },
  { day: "07", revenue: 6.2, click: 8.5 },
  { day: "08", revenue: 5.8, click: 10.0 },
  { day: "09", revenue: 5.5, click: 11.0 },
  { day: "10", revenue: 5.5, click: 9.5 },
  { day: "11", revenue: 6.0, click: 7.5 },
  { day: "12", revenue: 6.5, click: 6.5 },
  { day: "13", revenue: 7.0, click: 6.0 },
  { day: "14", revenue: 7.5, click: 5.5 },
  { day: "15", revenue: 7.8, click: 5.0 },
  { day: "16", revenue: 7.5, click: 4.5 },
  { day: "17", revenue: 7.0, click: 4.0 },
  { day: "18", revenue: 6.5, click: 3.5 },
  { day: "19", revenue: 5.8, click: 3.0 },
  { day: "20", revenue: 5.0, click: 2.8 },
  { day: "21", revenue: 4.5, click: 3.0 },
  { day: "22", revenue: 4.0, click: 3.5 },
  { day: "23", revenue: 3.5, click: 4.0 },
  { day: "24", revenue: 3.0, click: 5.0 },
  { day: "25", revenue: 3.2, click: 4.5 },
  { day: "26", revenue: 3.5, click: 3.8 },
  { day: "27", revenue: 4.5, click: 3.5 },
  { day: "28", revenue: 6.0, click: 3.2 },
  { day: "29", revenue: 7.0, click: 3.5 },
  { day: "30", revenue: 7.5, click: 4.0 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number; dataKey: string }[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const revenueEntry = payload.find((p) => p.dataKey === "revenue");
    if (!revenueEntry) return null;
    return (
      <div className="flex flex-col items-center">
        <div className="bg-[#4B8CB9] text-white text-base font-semibold leading-6 px-7.25 py-1.75 rounded-[35px]">
          ${revenueEntry.value}
        </div>
        <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-[#4B8CB9]" />
      </div>
    );
  }
  return null;
};

const PERIOD_OPTIONS = ["This Month", "Last Month", "This Year", "Life time"] as const;
type Period = (typeof PERIOD_OPTIONS)[number];

const ActivityOverviewSection = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("This Month");
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white flex flex-col gap-4 p-8 rounded-2xl shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)] w-full">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-10 items-center">
          <h2 className="text-2xl font-semibold leading-9 text-[#0F2A3C]">
            Activity Overview
          </h2>
          <div className="flex gap-10 items-center">
            <div className="flex gap-1.5 items-center">
              <div className="size-4 rounded bg-[#4B8CB9]" />
              <span className="text-sm text-[#919EAB]">Revenue</span>
            </div>
            <div className="flex gap-1.5 items-center">
              <div className="size-4 rounded bg-[#DFE3E8]" />
              <span className="text-sm text-[#919EAB]">Click</span>
            </div>
          </div>
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button className="flex gap-2 items-center border border-[#DFE3E8] rounded-lg pl-4 pr-3 py-2 cursor-pointer">
              <span className="text-sm font-semibold leading-5.5 text-[#454F5B]">
                {selectedPeriod}
              </span>
              <BelowIcon className="size-5" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="w-40 p-4 rounded-xl shadow-[0px_4px_16px_0px_rgba(145,158,171,0.16)] border-0 flex flex-col gap-3"
          >
            {PERIOD_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setSelectedPeriod(option);
                  setOpen(false);
                }}
                className={`text-left text-base leading-6 cursor-pointer transition-colors ${
                  selectedPeriod === option
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

      {/* Chart */}
      <div className="w-full h-90.75">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 0, left: -20, bottom: 10 }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4B8CB9" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#4B8CB9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              horizontal={true}
              vertical={false}
              strokeDasharray="3 3"
              stroke="#F4F6F8"
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#637381", fontSize: 16, fontWeight: 400 }}
              dy={12}
            />
            <YAxis
              domain={[0, 12]}
              ticks={[0, 2, 4, 6, 8, 10, 12]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#637381", fontSize: 16, fontWeight: 400 }}
              dx={-4}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Area
              type="monotone"
              dataKey="click"
              stroke="#DFE3E8"
              strokeWidth={3}
              fill="transparent"
              dot={false}
              activeDot={false}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#4B8CB9"
              strokeWidth={3}
              fill="url(#revenueGradient)"
              dot={false}
              activeDot={{
                r: 8,
                fill: "#4B8CB9",
                stroke: "white",
                strokeWidth: 3,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityOverviewSection;
