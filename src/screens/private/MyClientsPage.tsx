"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { BelowIcon } from "@/assets/icons";
import QRCodeDialog from "@/components/dashboard/product/QRCodeDialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  qrCode: string | null;
  productId: number | null;
}

interface ApiAffiliateProduct {
  id?: number | string;
  product_id?: number | string;
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
  qr_code?: string;
  qrCode?: string;
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

interface ReferralLinkApiData {
  referral_link?: string | null;
  qr_code?: string | null;
}

interface ReferralLinkApiResponse {
  message?: string;
  data?: ReferralLinkApiData;
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

const CopyIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className={className}
  >
    <rect
      x="7"
      y="7"
      width="10"
      height="10"
      rx="2"
      stroke="#637381"
      strokeWidth="1.5"
    />
    <path
      d="M13 7V5C13 3.89543 12.1046 3 11 3H5C3.89543 3 3 3.89543 3 5V11C3 12.1046 3.89543 13 5 13H7"
      stroke="#637381"
      strokeWidth="1.5"
    />
  </svg>
);

const QRIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    className={className}
  >
    <rect
      x="2"
      y="2"
      width="7"
      height="7"
      rx="1"
      stroke="#637381"
      strokeWidth="1.5"
    />
    <rect
      x="13"
      y="2"
      width="7"
      height="7"
      rx="1"
      stroke="#637381"
      strokeWidth="1.5"
    />
    <rect
      x="2"
      y="13"
      width="7"
      height="7"
      rx="1"
      stroke="#637381"
      strokeWidth="1.5"
    />
    <rect x="4.5" y="4.5" width="2" height="2" rx="0.5" fill="#637381" />
    <rect x="15.5" y="4.5" width="2" height="2" rx="0.5" fill="#637381" />
    <rect x="4.5" y="15.5" width="2" height="2" rx="0.5" fill="#637381" />
    <path
      d="M13 13H16"
      stroke="#637381"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M13 16.5H16"
      stroke="#637381"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M18.5 13V16.5"
      stroke="#637381"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M13 20H20"
      stroke="#637381"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
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
  const parsedProductId = Number(item.product_id);
  const parsedId = Number(item.id);
  const normalizedProductId = Number.isFinite(parsedProductId)
    ? parsedProductId
    : Number.isFinite(parsedId)
      ? parsedId
      : null;

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
    qrCode: item.qr_code ?? item.qrCode ?? null,
    productId: normalizedProductId,
  };
};

const MyClientsPage = () => {
  const [filter, setFilter] = useState<FilterValue>("recent");
  const [filterOpen, setFilterOpen] = useState(false);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ClientOrder | null>(null);
  const [selectedQrCode, setSelectedQrCode] = useState<string | null>(null);
  const [copyPendingOrderId, setCopyPendingOrderId] = useState<string | null>(null);
  const [qrPendingOrderId, setQrPendingOrderId] = useState<string | null>(null);

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

  const fetchReferralData = async (productId: number) => {
    const token = localStorage.getItem("token");
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!token || !baseUrl) {
      return null;
    }

    try {
      const response = await axios.get<ReferralLinkApiResponse>(
        `${baseUrl}/barber/referral-link/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data?.data ?? null;
    } catch (apiError: unknown) {
      if (axios.isAxiosError(apiError)) {
        const apiErrorMessage = (
          apiError.response?.data as { message?: string } | undefined
        )?.message;

        toast.error(apiErrorMessage || "Failed to load referral link.");
      } else {
        toast.error("Failed to load referral link.");
      }

      return null;
    }
  };

  const copyReferralLink = async (link: string) => {
    if (!link) {
      return false;
    }

    try {
      await navigator.clipboard.writeText(link);
      return true;
    } catch {
      toast.error("Unable to copy this product link.");
      return false;
    }
  };

  const resolveReferralData = async (order: ClientOrder) => {
    const fallbackReferralLink = order.productLink || null;
    const fallbackQrCode = order.qrCode;

    if (order.productId === null) {
      return {
        referral_link: fallbackReferralLink,
        qr_code: fallbackQrCode,
      };
    }

    const referralData = await fetchReferralData(order.productId);

    return {
      referral_link: referralData?.referral_link ?? fallbackReferralLink,
      qr_code: referralData?.qr_code ?? fallbackQrCode,
    };
  };

  const handleCopyLinkClick = async (order: ClientOrder) => {
    setCopyPendingOrderId(order.id);

    try {
      const referralData = await resolveReferralData(order);

      if (!referralData.referral_link) {
        toast.error("Product link is not available right now.");
        return;
      }

      const copied = await copyReferralLink(referralData.referral_link);

      if (copied) {
        toast.success("Product link copied.");
      }
    } finally {
      setCopyPendingOrderId(null);
    }
  };

  const handleQrCodeClick = async (order: ClientOrder) => {
    setQrPendingOrderId(order.id);

    try {
      const referralData = await resolveReferralData(order);

      if (!referralData.referral_link) {
        toast.error("Product link is not available right now.");
        return;
      }

      const copied = await copyReferralLink(referralData.referral_link);

      if (copied) {
        toast.success("Product link copied.");
      }

      if (!referralData.qr_code) {
        toast.error("QR code is not available right now.");
        return;
      }

      setSelectedOrder(order);
      setSelectedQrCode(referralData.qr_code);
      setQrDialogOpen(true);
    } finally {
      setQrPendingOrderId(null);
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

        {/* Mobile cards (visible below lg) */}
        <div className="flex flex-col gap-4 lg:hidden px-4">
          {affiliateProductsApiPending ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`my-clients-card-skeleton-${index}`}
                className="rounded-2xl border border-[#E6EEF4] bg-white p-4 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-12 rounded-full shrink-0" />
                    <Skeleton className="h-5 w-28" />
                  </div>
                  <Skeleton className="h-6 w-20 rounded-md" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>

                <div className="flex items-center justify-end gap-2.5">
                  <Skeleton className="size-10 rounded-md" />
                  <Skeleton className="size-10 rounded-md" />
                </div>
              </div>
            ))
          ) : affiliateProductsApiError ? (
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
          ) : affiliateOrders.length === 0 ? (
            <div className="rounded-xl border border-[#EAECF0] bg-[#F9FAFB] py-8 text-center px-4">
              <p className="text-sm sm:text-base text-[#637381] leading-6">
                No affiliate products found for this filter.
              </p>
            </div>
          ) : (
            affiliateOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-[#E6EEF4] bg-white p-4 sm:p-5 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0 size-12 rounded-full overflow-hidden bg-gray-200">
                      <Image
                        src={order.clientAvatar}
                        alt={order.clientName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm sm:text-base font-semibold leading-6 text-textPrimary truncate">
                        {order.clientName}
                      </p>
                      <p className="text-xs sm:text-sm text-[#919EAB] truncate">
                        {order.date}
                      </p>
                    </div>
                  </div>
                  <StatusChip status={order.status} />
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1 col-span-3 sm:col-span-1">
                    <span className="text-xs text-[#919EAB]">Product</span>
                    <span className="text-sm font-semibold text-textPrimary truncate">
                      {order.product}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-[#919EAB]">Revenue</span>
                    <span className="text-sm text-textPrimary">{order.revenue}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-[#919EAB]">Quantity</span>
                    <span className="text-sm text-textPrimary">{order.quantity}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-[#919EAB]">Clicks</span>
                    <span className="text-sm text-textPrimary">{order.clicks}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs text-[#919EAB]">Product link</span>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      title="Copy link"
                      disabled={
                        copyPendingOrderId === order.id ||
                        (!order.productLink && order.productId === null)
                      }
                      onClick={() => handleCopyLinkClick(order)}
                      className="shrink-0 size-10 flex items-center justify-center border border-[#F4F6F8] rounded-md bg-white cursor-pointer hover:bg-[#F9FAFB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {copyPendingOrderId === order.id ? (
                        <Loader2 className="size-5 text-[#637381] animate-spin" />
                      ) : (
                        <CopyIcon className="size-5" />
                      )}
                    </button>
                    <button
                      type="button"
                      title="QR Code"
                      disabled={
                        qrPendingOrderId === order.id ||
                        (order.productId === null && !order.qrCode)
                      }
                      onClick={() => handleQrCodeClick(order)}
                      className="shrink-0 size-10 flex items-center justify-center border border-[#F4F6F8] rounded-md bg-white cursor-pointer hover:bg-[#F9FAFB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {qrPendingOrderId === order.id ? (
                        <Loader2 className="size-5 text-[#637381] animate-spin" />
                      ) : (
                        <QRIcon className="size-5.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop table (lg+) */}
        <div className="hidden lg:block px-3 overflow-x-auto">
          <Table className="min-w-180 lg:min-w-0">
            <TableHeader>
              <TableRow className="bg-[#F9FAFB] hover:bg-[#F9FAFB]">
                <TableHead className="px-4 text-xs sm:text-sm font-semibold text-[#637381] w-55">
                  Client
                </TableHead>
                <TableHead className="hidden lg:table-cell px-4 text-xs sm:text-sm font-semibold text-[#637381] w-35">
                  Date
                </TableHead>
                <TableHead className="hidden sm:table-cell px-4 text-xs sm:text-sm font-semibold text-[#637381] w-50">
                  Product
                </TableHead>
                <TableHead className="px-4 text-xs sm:text-sm font-semibold text-[#637381] w-22.5">
                  Quantity
                </TableHead>
                <TableHead className="px-4 text-xs sm:text-sm font-semibold text-[#637381] w-22.5">
                  Click
                </TableHead>
                <TableHead className="hidden md:table-cell px-4 text-xs sm:text-sm font-semibold text-[#637381] w-30 text-right">
                  Revenue
                </TableHead>
                <TableHead className="hidden md:table-cell px-4 text-xs sm:text-sm font-semibold text-[#637381] w-30">
                  Status
                </TableHead>
                <TableHead className="px-4 text-xs sm:text-sm font-semibold text-[#637381] w-40 text-right">
                  Product Link
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {affiliateProductsApiPending ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={`my-clients-skeleton-${index}`} className="border-[#F1F5F9] hover:bg-transparent">
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Skeleton className="size-12 rounded-full shrink-0" />
                        <Skeleton className="h-5 w-28" />
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell px-4 py-3">
                      <Skeleton className="h-5 w-20" />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell px-4 py-3">
                      <Skeleton className="h-5 w-24" />
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Skeleton className="h-5 w-10" />
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Skeleton className="h-5 w-10" />
                    </TableCell>
                    <TableCell className="hidden md:table-cell px-4 py-3 text-right">
                      <Skeleton className="h-5 w-14 ml-auto" />
                    </TableCell>
                    <TableCell className="hidden md:table-cell px-4 py-3">
                      <Skeleton className="h-7 w-20 rounded-md" />
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2.5">
                        <Skeleton className="size-10 rounded-md" />
                        <Skeleton className="size-10 rounded-md" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : affiliateProductsApiError ? (
                <TableRow className="border-[#F1F5F9] hover:bg-transparent">
                  <TableCell colSpan={8} className="px-4 py-6">
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
                  </TableCell>
                </TableRow>
              ) : affiliateOrders.length === 0 ? (
                <TableRow className="border-[#F1F5F9] hover:bg-transparent">
                  <TableCell colSpan={8} className="px-4 py-8">
                    <div className="rounded-xl border border-[#EAECF0] bg-[#F9FAFB] py-8 text-center px-4">
                      <p className="text-sm sm:text-base text-[#637381] leading-6">
                        No affiliate products found for this filter.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                affiliateOrders.map((order) => (
                  <TableRow key={order.id} className="border-[#F1F5F9]">
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative shrink-0 size-12 rounded-full overflow-hidden bg-gray-200">
                          <Image src={order.clientAvatar} alt={order.clientName} fill className="object-cover" />
                        </div>
                        <p className="text-sm sm:text-base font-semibold leading-6 text-textPrimary truncate">
                          {order.clientName}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell px-4 py-3">
                      <p className="text-sm sm:text-base font-normal leading-6 text-textPrimary truncate">
                        {order.date}
                      </p>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell px-4 py-3 max-w-55">
                      <p className="text-sm sm:text-base font-semibold leading-6 text-textPrimary truncate">
                        {order.product}
                      </p>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <p className="text-sm sm:text-base font-normal leading-6 text-textPrimary">
                        {order.quantity}
                      </p>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <p className="text-sm sm:text-base font-normal leading-6 text-textPrimary">
                        {order.clicks}
                      </p>
                    </TableCell>
                    <TableCell className="hidden md:table-cell px-4 py-3 text-right">
                      <p className="text-sm sm:text-base font-normal leading-6 text-textPrimary">
                        {order.revenue}
                      </p>
                    </TableCell>
                    <TableCell className="hidden md:table-cell px-4 py-3">
                      <span className={`inline-flex items-center justify-center px-3 py-1 rounded-md border text-xs leading-4.5 font-normal ${statusStyles[order.status]}`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2.5">
                        <button
                          type="button"
                          title="Copy link"
                          disabled={
                            copyPendingOrderId === order.id ||
                            (!order.productLink && order.productId === null)
                          }
                          onClick={() => handleCopyLinkClick(order)}
                          className="shrink-0 size-10 flex items-center justify-center border border-[#F4F6F8] rounded-md bg-white cursor-pointer hover:bg-[#F9FAFB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {copyPendingOrderId === order.id ? (
                            <Loader2 className="size-5 text-[#637381] animate-spin" />
                          ) : (
                            <CopyIcon className="size-5" />
                          )}
                        </button>
                        <button
                          type="button"
                          title="QR Code"
                          disabled={
                            qrPendingOrderId === order.id ||
                            (order.productId === null && !order.qrCode)
                          }
                          onClick={() => handleQrCodeClick(order)}
                          className="shrink-0 size-10 flex items-center justify-center border border-[#F4F6F8] rounded-md bg-white cursor-pointer hover:bg-[#F9FAFB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {qrPendingOrderId === order.id ? (
                            <Loader2 className="size-5 text-[#637381] animate-spin" />
                          ) : (
                            <QRIcon className="size-5.5" />
                          )}
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <QRCodeDialog
        open={qrDialogOpen}
        onOpenChange={(open) => {
          setQrDialogOpen(open);

          if (!open) {
            setSelectedQrCode(null);
            setSelectedOrder(null);
          }
        }}
        productName={selectedOrder?.product}
        qrCode={selectedQrCode}
      />
    </div>
  );
};

export default MyClientsPage;
