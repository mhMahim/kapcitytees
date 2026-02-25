import { cn } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  MousePointerClick,
  BarChart3,
  Percent,
  LayoutDashboard,
  Package,
  Users,
  Wallet,
  UserCircle,
  Bell,
  ChevronDown,
} from "lucide-react";

interface DashboardPreviewProps {
  className?: string;
  compact?: boolean;
}

const DashboardPreview = ({
  className,
  compact = false,
}: DashboardPreviewProps) => {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-[0px_12px_24px_-4px_rgba(145,158,171,0.16)] border border-[#F4F6F8] overflow-hidden",
        className
      )}
    >
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-32.5 shrink-0 border-r border-[#F4F6F8] flex flex-col items-center py-5 gap-6">
          {/* Logo placeholder */}
          <div className="w-12 h-12 rounded-full bg-[#0F2A3C] flex items-center justify-center">
            <span className="text-white text-[8px] font-bold">BC</span>
          </div>

          {/* Nav items */}
          <div className="flex flex-col gap-1 w-full px-3">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
            <SidebarItem icon={Package} label="Product" />
            <SidebarItem icon={Users} label="My Clients" />
            <SidebarItem icon={Wallet} label="Earning" />
            <SidebarItem icon={UserCircle} label="Account" />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#F4F6F8]">
            <div>
              <h3 className="text-base font-semibold text-[#0F2A3C]">
                Dashboard
              </h3>
              <p className="text-[10px] text-[#637381]">
                Track today&apos;s growth.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell className="w-4 h-4 text-[#637381]" />
                <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#1E6FA8] rounded-full" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-[#E7EAEC]" />
                <div className="hidden sm:block">
                  <p className="text-[9px] font-medium text-[#0F2A3C]">
                    Alexa Johnson
                  </p>
                  <p className="text-[7px] text-[#637381]">
                    alexajohnson@mail.com
                  </p>
                </div>
                <ChevronDown className="w-2.5 h-2.5 text-[#637381]" />
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-2 p-4">
            <StatCard
              label="Total Revenue"
              value="$5,300"
              change="2%"
              up
              icon={DollarSign}
              highlighted
            />
            <StatCard
              label="Total Clicks"
              value="4275"
              change="2%"
              up={false}
              icon={MousePointerClick}
            />
            <StatCard
              label="Conversion"
              value="312"
              change="2%"
              up
              icon={BarChart3}
            />
            <StatCard
              label="Conversion rate"
              value="11%"
              change="2%"
              up
              icon={Percent}
            />
          </div>

          {/* Chart section */}
          {!compact && (
            <div className="px-4 pb-3">
              <div className="border border-[#F4F6F8] rounded-xl p-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-[#0F2A3C]">
                      Activity Overview
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-sm bg-[#1E6FA8]" />
                        <span className="text-[8px] text-[#637381]">
                          Revenue
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-sm bg-[#D7EFFF]" />
                        <span className="text-[8px] text-[#637381]">
                          Click
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[8px] text-[#637381] border border-[#F4F6F8] rounded px-1.5 py-0.5">
                    This Month
                    <ChevronDown className="w-2 h-2" />
                  </div>
                </div>
                {/* Chart placeholder */}
                <ChartPlaceholder />
              </div>
            </div>
          )}

          {/* Table section */}
          {!compact && (
            <div className="px-4 pb-4">
              <div className="border border-[#F4F6F8] rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-3">
                  <span className="text-xs font-semibold text-[#0F2A3C]">
                    Top Affiliates
                  </span>
                  <span className="text-[8px] text-[#637381]">View all</span>
                </div>
                <TablePreview />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;

/* Sub-components */

const SidebarItem = ({
  icon: Icon,
  label,
  active = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
}) => (
  <div
    className={cn(
      "flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-colors",
      active
        ? "bg-[#1E6FA8] text-white"
        : "text-[#637381] hover:text-[#0F2A3C]"
    )}
  >
    <Icon className="w-3 h-3" />
    <span>{label}</span>
  </div>
);

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  up: boolean;
  icon: React.ComponentType<{ className?: string }>;
  highlighted?: boolean;
}

const StatCard = ({
  label,
  value,
  change,
  up,
  icon: Icon,
  highlighted = false,
}: StatCardProps) => (
  <div
    className={cn(
      "rounded-xl p-2.5 border",
      highlighted
        ? "bg-[#1E6FA8] border-[#1E6FA8] text-white"
        : "bg-white border-[#F4F6F8]"
    )}
  >
    <div className="flex items-center justify-between mb-2">
      <span
        className={cn(
          "text-[8px]",
          highlighted ? "text-white/80" : "text-[#637381]"
        )}
      >
        {label}
      </span>
      <Icon
        className={cn(
          "w-3 h-3",
          highlighted ? "text-white/60" : "text-[#637381]"
        )}
      />
    </div>
    <div className="flex items-end justify-between">
      <span
        className={cn(
          "text-sm font-bold",
          highlighted ? "text-white" : "text-[#0F2A3C]"
        )}
      >
        {value}
      </span>
      <div className="flex items-center gap-0.5">
        <span
          className={cn(
            "text-[7px]",
            up ? "text-green-500" : "text-red-500",
            highlighted && up && "text-green-300",
            highlighted && !up && "text-red-300"
          )}
        >
          {change}
        </span>
        {up ? (
          <TrendingUp
            className={cn(
              "w-2 h-2",
              highlighted ? "text-green-300" : "text-green-500"
            )}
          />
        ) : (
          <TrendingDown
            className={cn(
              "w-2 h-2",
              highlighted ? "text-red-300" : "text-red-500"
            )}
          />
        )}
      </div>
    </div>
  </div>
);

const ChartPlaceholder = () => (
  <div className="relative h-30 w-full">
    {/* Y-axis labels */}
    <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[7px] text-[#637381] pr-2">
      <span>12</span>
      <span>10</span>
      <span>8</span>
      <span>6</span>
      <span>4</span>
      <span>2</span>
      <span>0</span>
    </div>
    {/* Chart area */}
    <div className="ml-5 h-full relative">
      {/* Grid lines */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="absolute w-full border-t border-[#F4F6F8]"
          style={{ top: `${(i / 6) * 100}%` }}
        />
      ))}
      {/* Revenue line (SVG) */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 120"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E6FA8" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#1E6FA8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,80 C30,70 60,50 100,55 C140,60 160,40 200,30 C240,20 260,25 300,35 C340,45 370,30 400,40"
          stroke="#1E6FA8"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M0,80 C30,70 60,50 100,55 C140,60 160,40 200,30 C240,20 260,25 300,35 C340,45 370,30 400,40 L400,120 L0,120 Z"
          fill="url(#revenueGrad)"
        />
        {/* Click line */}
        <path
          d="M0,90 C30,85 60,80 100,75 C140,70 160,65 200,60 C240,55 260,65 300,70 C340,75 370,55 400,60"
          stroke="#D7EFFF"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      {/* Tooltip */}
      <div
        className="absolute bg-[#1E6FA8] text-white text-[7px] px-1.5 py-0.5 rounded shadow-sm"
        style={{ left: "50%", top: "18%", transform: "translateX(-50%)" }}
      >
        $9.5
      </div>
    </div>
    {/* X-axis labels */}
    <div className="ml-5 mt-1 flex justify-between text-[6px] text-[#637381]">
      {Array.from({ length: 15 }, (_, i) => (
        <span key={i}>{String(i * 2 + 1).padStart(2, "0")}</span>
      ))}
    </div>
  </div>
);

const TablePreview = () => {
  const rows = Array(5).fill({
    client: "Alexa Johnson",
    date: "10 / 1 / 2026",
    product: "Beard Oil",
    qty: 2,
    clicks: 20,
    revenue: "60$",
    status: "Processing",
    link: "barbercertified.com/ref/...",
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[7px]">
        <thead>
          <tr className="border-t border-[#F4F6F8] text-[#637381]">
            <th className="text-left py-1.5 px-2 font-medium">Client</th>
            <th className="text-left py-1.5 px-2 font-medium">Date</th>
            <th className="text-left py-1.5 px-2 font-medium">Product</th>
            <th className="text-left py-1.5 px-2 font-medium">Quantity</th>
            <th className="text-left py-1.5 px-2 font-medium">Click</th>
            <th className="text-left py-1.5 px-2 font-medium">Revenue</th>
            <th className="text-left py-1.5 px-2 font-medium">Status</th>
            <th className="text-left py-1.5 px-2 font-medium">Product Link</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-[#F4F6F8]">
              <td className="py-2 px-2">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full bg-[#E7EAEC] shrink-0" />
                  <span className="text-[#0F2A3C]">{row.client}</span>
                </div>
              </td>
              <td className="py-2 px-2 text-[#637381]">{row.date}</td>
              <td className="py-2 px-2 text-[#0F2A3C]">{row.product}</td>
              <td className="py-2 px-2 text-[#637381]">{row.qty}</td>
              <td className="py-2 px-2 text-[#637381]">{row.clicks}</td>
              <td className="py-2 px-2 text-[#0F2A3C]">{row.revenue}</td>
              <td className="py-2 px-2">
                <span className="bg-[#FFF3E0] text-[#FF9800] px-1.5 py-0.5 rounded text-[6px] font-medium">
                  {row.status}
                </span>
              </td>
              <td className="py-2 px-2 text-[#637381]">{row.link}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
