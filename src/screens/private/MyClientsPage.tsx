"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy, QrCode } from "lucide-react";
import { BelowIcon } from "@/assets/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type OrderStatus = "Delivered" | "Processing";

interface ClientOrder {
  id: string;
  clientName: string;
  clientAvatar: string;
  date: string;
  product: string;
  quantity: number;
  clicks: number;
  revenue: string;
  status: OrderStatus;
  productLink: string;
}

const sampleOrders: ClientOrder[] = Array.from({ length: 12 }, (_, i) => ({
  id: `order-${i + 1}`,
  clientName: "Alexa Johnson",
  clientAvatar: "/images/avatar-placeholder.png",
  date: "10 / 1 / 2026",
  product: "Beard Oil",
  quantity: 2,
  clicks: 20,
  revenue: "60$",
  status: (i % 3 === 2 ? "Processing" : "Delivered") as OrderStatus,
  productLink: "barbercertified.com/ref/...",
}));

const statusStyles: Record<OrderStatus, string> = {
  Delivered: "bg-[#E6FDF2] border-[#A5E6C6] text-[#0CAF60]",
  Processing: "bg-[#FEF3C7] border-[#F59E0B] text-[#F59E0B]",
};

const StatusChip = ({ status }: { status: OrderStatus }) => (
  <span
    className={`inline-flex items-center justify-center px-3 py-1 rounded-md border text-xs leading-4.5 ${statusStyles[status]}`}
  >
    {status}
  </span>
);

const FILTER_OPTIONS = ["Recent", "Oldest", "This Week", "This Month"] as const;
type FilterOption = (typeof FILTER_OPTIONS)[number];

const MyClientsPage = () => {
  const [filter, setFilter] = useState<FilterOption>("Recent");
  const [filterOpen, setFilterOpen] = useState(false);

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
  };

  return (
    <div className="flex flex-col">
      {/* Clients and Orders Table */}
      <div className="bg-white rounded-2xl shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)] overflow-hidden pb-3">
        {/* Table Top Bar */}
        <div className="flex items-center justify-between h-14 px-4 py-3">
          <h3 className="text-lg font-semibold text-textPrimary leading-6">
            Clients and Orders
          </h3>

          {/* Filter */}
          <Popover open={filterOpen} onOpenChange={setFilterOpen}>
            <PopoverTrigger asChild>
              <button className="flex gap-2 items-center border border-[#DFE3E8] rounded-lg pl-4 pr-3 py-2 cursor-pointer">
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

        {/* Table */}
        <div className="px-3 overflow-x-auto">
          {/* Column Headers */}
          <div className="flex items-center px-1 min-w-300">
            <div className="w-66 bg-[#F9FAFB] px-3 py-2 rounded-l-lg">
              <p className="text-sm font-semibold text-[#637381]">Client</p>
            </div>
            <div className="w-45 bg-[#F9FAFB] px-3 py-2">
              <p className="text-sm font-semibold text-[#637381]">Date</p>
            </div>
            <div className="flex-1 bg-[#F9FAFB] px-3 py-2">
              <p className="text-sm font-semibold text-[#637381]">Product</p>
            </div>
            <div className="w-33 bg-[#F9FAFB] px-3 py-2">
              <p className="text-sm font-semibold text-[#637381]">Quantity</p>
            </div>
            <div className="w-37 bg-[#F9FAFB] px-3 py-2">
              <p className="text-sm font-semibold text-[#637381]">Click</p>
            </div>
            <div className="w-37 bg-[#F9FAFB] px-3 py-2">
              <p className="text-sm font-semibold text-[#637381]">Revenue</p>
            </div>
            <div className="w-37 bg-[#F9FAFB] px-3 py-2">
              <p className="text-sm font-semibold text-[#637381]">Status</p>
            </div>
            <div className="w-79 bg-[#F9FAFB] px-3 py-2 rounded-r-lg">
              <p className="text-sm font-semibold text-[#637381]">
                Product Link
              </p>
            </div>
          </div>

          {/* Rows */}
          {sampleOrders.map((order, index) => (
            <div
              key={order.id}
              className={`flex items-center py-1 min-w-300 ${
                index < sampleOrders.length - 1
                  ? "border-b border-[#F9FAFB]"
                  : ""
              }`}
            >
              {/* Client */}
              <div className="w-66 h-16 flex items-center gap-3 px-4 overflow-hidden">
                <div className="size-12 rounded-full shrink-0 relative overflow-hidden bg-gray-200">
                  <Image
                    src="https://i.ibb.co.com/nM2hVbGn/702bb2f3c1bcf46faf694d21c0bdb941a1ec97d4.png"
                    alt={order.clientName}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-base font-semibold text-textPrimary leading-6 truncate">
                  {order.clientName}
                </p>
              </div>

              {/* Date */}
              <div className="w-45 h-16 flex items-center px-4">
                <p className="text-base text-textPrimary leading-6">
                  {order.date}
                </p>
              </div>

              {/* Product */}
              <div className="flex-1 h-16 flex items-center px-4">
                <p className="text-base font-semibold text-textPrimary leading-6">
                  {order.product}
                </p>
              </div>

              {/* Quantity */}
              <div className="w-33 h-16 flex items-center px-4">
                <p className="text-base text-textPrimary leading-6">
                  {order.quantity}
                </p>
              </div>

              {/* Click */}
              <div className="w-37 h-16 flex items-center px-4">
                <p className="text-base text-textPrimary leading-6">
                  {order.clicks}
                </p>
              </div>

              {/* Revenue */}
              <div className="w-37 h-16 flex items-center px-4">
                <p className="text-base text-textPrimary leading-6">
                  {order.revenue}
                </p>
              </div>

              {/* Status */}
              <div className="w-37 h-16 flex items-center px-4">
                <StatusChip status={order.status} />
              </div>

              {/* Product Link */}
              <div className="w-79 h-16 flex items-center gap-2.5 px-4 overflow-hidden">
                <p className="flex-1 text-base text-textPrimary leading-6 truncate min-w-0">
                  {order.productLink}
                </p>
                <button
                  onClick={() => handleCopyLink(order.productLink)}
                  className="size-10 shrink-0 flex items-center justify-center border border-[#F4F6F8] rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <Copy className="size-5 text-[#637381]" />
                </button>
                <button className="size-10 shrink-0 flex items-center justify-center border border-[#F4F6F8] rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                  <QrCode className="size-5.5 text-[#637381]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyClientsPage;
