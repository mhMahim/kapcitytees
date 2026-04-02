"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Copy, QrCode } from "lucide-react";
import { toast } from "sonner";
import { BelowIcon } from "@/assets/icons";
import { Skeleton } from "@/components/ui/skeleton";
import useFetchData from "@/hooks/useFetchData";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type FilterValue = "recent" | "oldest" | "this_week" | "this_month";

interface FilterOption {
  label: string;
  value: FilterValue;
}

const FILTER_OPTIONS: FilterOption[] = [
  { label: "Recent", value: "recent" },
  { label: "Oldest", value: "oldest" },
  { label: "This Week", value: "this_week" },
  { label: "This Month", value: "this_month" },
];

type OrderStatus = "Delivered" | "Processing" | "Cancelled" | "Unknown";

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

interface ApiAffiliateProduct {
  id?: number | string;
  client_name?: string;
  client_image?: string;
  customer_name?: string;
  avatar?: string;
  date?: string;
  created_at?: string;
  product_name?: string;
  product?: string;
  title?: string;
  quantity?: number | string;
  order_quantity?: number | string;
  clicks?: number | string;
  click?: number | string;
  total_clicks?: number | string;
  revenue?: number | string;
  total_revenue?: number | string;
  commission?: number | string;
  status?: string;
  product_link?: string;
  referral_link?: string;
  link?: string;
  client?: {
    name?: string;
    avatar?: string;
  };
}

interface ApiAffiliateProductsResponse {
  data?: {
    data?: ApiAffiliateProduct[] | { data?: ApiAffiliateProduct[] };
  };
}

const statusStyles: Record<OrderStatus, string> = {
  Delivered: "bg-[#E6FDF2] border-[#A5E6C6] text-[#0CAF60]",
  Processing: "bg-[#FEF3C7] border-[#F59E0B] text-[#F59E0B]",
  Cancelled: "bg-[#FEE2E2] border-[#EF4444] text-[#EF4444]",
  Unknown: "bg-[#F4F6F8] border-[#DFE3E8] text-[#637381]",
};

const StatusChip = ({ status }: { status: OrderStatus }) => (
  <span
    className={`inline-flex items-center justify-center px-3 py-1 rounded-md border text-xs leading-4.5 ${statusStyles[status]}`}
  >
    {status}
  </span>
);

const safeNumber = (value: unknown) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatDate = (value: string) => {
  if (!value) {
    return "-";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return `${parsed.getMonth() + 1} / ${parsed.getDate()} / ${parsed.getFullYear()}`;
};

const formatRevenue = (value: unknown) => {
  if (value === null || value === undefined || value === "") {
    return "$0";
  }

  if (typeof value === "number") {
    return `$${value}`;
  }

  const normalized = String(value).trim();
  return /^\d+(\.\d+)?$/.test(normalized) ? `$${normalized}` : normalized;
};

const normalizeStatus = (value: unknown): OrderStatus => {
  const normalized = String(value ?? "")
    .trim()
    .toLowerCase();

  if (["delivered", "completed", "success"].includes(normalized)) {
    return "Delivered";
  }

  if (
    ["processing", "pending", "in_progress", "in progress"].includes(normalized)
  ) {
    return "Processing";
  }

  if (["cancelled", "canceled", "failed", "rejected"].includes(normalized)) {
    return "Cancelled";
  }

  return "Unknown";
};

const extractAffiliateProducts = (
  apiData: ApiAffiliateProductsResponse | undefined,
) => {
  const primaryData = apiData?.data?.data;

  if (Array.isArray(primaryData)) {
    return primaryData;
  }

  if (Array.isArray(primaryData?.data)) {
    return primaryData.data;
  }

  return [];
};

const mapApiOrderToUiOrder = (
  item: ApiAffiliateProduct,
  index: number,
): ClientOrder => {
  const clientName =
    item.client_name ??
    item.client?.name ??
    item.customer_name ??
    "Unknown Client";

  const productName =
    item.product_name ?? item.product ?? item.title ?? "Product";
  const productLink =
    item.product_link ?? item.referral_link ?? item.link ?? "";
  const rawDate = item.date ?? item.created_at ?? "";

  return {
    id: String(item.id ?? `affiliate-order-${index}`),
    clientName,
    clientAvatar:
      item.client_image ??
      item.client?.avatar ??
      item.avatar ??
      "/images/avatar-placeholder.png",
    date: formatDate(rawDate),
    product: productName,
    quantity: safeNumber(item.quantity ?? item.order_quantity),
    clicks: safeNumber(item.clicks ?? item.click ?? item.total_clicks),
    revenue: formatRevenue(
      item.revenue ?? item.total_revenue ?? item.commission,
    ),
    status: normalizeStatus(item.status),
    productLink,
  };
};

const MyClientsPage = () => {
  const [filter, setFilter] = useState<FilterValue>("recent");
  const [filterOpen, setFilterOpen] = useState(false);

  const {
    data: affiliateProductsResponse,
    isPending: affiliateProductsApiPending,
    isError: affiliateProductsApiError,
    error: affiliateProductsApiErrorData,
    refetch: refetchAffiliateProducts,
  } = useFetchData(`/barber/affiliate-products?filter=${filter}`, true);

  const affiliateOrders = useMemo(() => {
    const apiOrders = extractAffiliateProducts(
      affiliateProductsResponse as ApiAffiliateProductsResponse | undefined,
    );

    return apiOrders.map((item, index) => mapApiOrderToUiOrder(item, index));
  }, [affiliateProductsResponse]);

  const selectedFilterLabel =
    FILTER_OPTIONS.find((option) => option.value === filter)?.label ?? "Recent";

  const errorMessage =
    affiliateProductsApiErrorData instanceof Error
      ? affiliateProductsApiErrorData.message
      : "Failed to load affiliate products.";

  const handleCopyLink = async (link: string) => {
    if (!link) {
      return;
    }

    try {
      await navigator.clipboard.writeText(link);
      toast.success("Product link copied.");
    } catch {
      toast.error("Unable to copy this product link.");
    }
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
                  {selectedFilterLabel}
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
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setFilter(option.value);
                    setFilterOpen(false);
                  }}
                  className={`text-left text-sm leading-5.5 cursor-pointer transition-colors px-2 py-1 rounded ${
                    filter === option.value
                      ? "text-[#1E6FA8] font-semibold"
                      : "text-[#637381] hover:text-[#454F5B]"
                  }`}
                >
                  {option.label}
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
            <div className="w-40 bg-[#F9FAFB] px-3 py-2 rounded-r-lg">
              <p className="text-sm font-semibold text-[#637381]">
                Product Link
              </p>
            </div>
          </div>

          {affiliateProductsApiPending ? (
            <div className="min-w-300">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={`my-clients-skeleton-${index}`}
                  className={`flex items-center py-1 ${
                    index < 7 ? "border-b border-[#F9FAFB]" : ""
                  }`}
                >
                  <div className="w-66 h-16 flex items-center gap-3 px-4 overflow-hidden">
                    <Skeleton className="size-12 rounded-full shrink-0" />
                    <Skeleton className="h-5 w-30" />
                  </div>
                  <div className="w-45 h-16 flex items-center px-4">
                    <Skeleton className="h-5 w-22" />
                  </div>
                  <div className="flex-1 h-16 flex items-center px-4">
                    <Skeleton className="h-5 w-32" />
                  </div>
                  <div className="w-33 h-16 flex items-center px-4">
                    <Skeleton className="h-5 w-10" />
                  </div>
                  <div className="w-37 h-16 flex items-center px-4">
                    <Skeleton className="h-5 w-12" />
                  </div>
                  <div className="w-37 h-16 flex items-center px-4">
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <div className="w-37 h-16 flex items-center px-4">
                    <Skeleton className="h-7 w-20 rounded-md" />
                  </div>
                  <div className="w-40 h-16 flex items-center gap-2.5 px-4 overflow-hidden">
                    <Skeleton className="h-5 flex-1" />
                    <Skeleton className="size-10 rounded-md" />
                    <Skeleton className="size-10 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          ) : affiliateProductsApiError ? (
            <div className="min-w-300 px-2 py-4 sm:py-6">
              <div className="rounded-xl border border-[#FECACA] bg-[#FFF2F2] p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">
                <p className="text-sm sm:text-base font-semibold text-[#B42318] leading-6">
                  Failed to load affiliate products.
                </p>
                <p className="text-xs sm:text-sm text-[#7A271A] leading-5">
                  {errorMessage}
                </p>
                <button
                  type="button"
                  onClick={() => refetchAffiliateProducts()}
                  className="w-fit h-10 px-4 rounded-lg bg-[#DE5D56] text-white text-sm font-semibold hover:bg-[#c14d47] transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : affiliateOrders.length === 0 ? (
            <div className="min-w-300 px-2 py-8 sm:py-10">
              <div className="rounded-xl border border-[#EAECF0] bg-[#F9FAFB] py-8 text-center px-4">
                <p className="text-sm sm:text-base text-[#637381] leading-6">
                  No affiliate products found for this filter.
                </p>
              </div>
            </div>
          ) : (
            affiliateOrders.map((order, index) => (
              <div
                key={order.id}
                className={`flex items-center py-1 min-w-300 ${
                  index < affiliateOrders.length - 1
                    ? "border-b border-[#F9FAFB]"
                    : ""
                }`}
              >
                {/* Client */}
                <div className="w-66 h-16 flex items-center gap-3 px-4 overflow-hidden">
                  <div className="size-12 rounded-full shrink-0 relative overflow-hidden bg-gray-200">
                    <Image
                      src={order.clientAvatar}
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
                <div className="w-40 h-16 flex items-center gap-2.5 px-4 overflow-hidden">
                  <button
                    type="button"
                    disabled={!order.productLink}
                    onClick={() => handleCopyLink(order.productLink)}
                    className="size-10 shrink-0 flex items-center justify-center border border-[#F4F6F8] rounded-md cursor-pointer hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Copy className="size-5 text-[#637381]" />
                  </button>
                  <button
                    type="button"
                    className="size-10 shrink-0 flex items-center justify-center border border-[#F4F6F8] rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <QrCode className="size-5.5 text-[#637381]" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyClientsPage;
