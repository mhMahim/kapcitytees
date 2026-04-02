"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import QRCodeDialog from "@/components/dashboard/product/QRCodeDialog";
import { Skeleton } from "@/components/ui/skeleton";
import useFetchData from "@/hooks/useFetchData";
import { cn } from "@/lib/utils";

type AffiliateStatus = "processing" | "delivered" | "cancelled" | "unknown";

interface Affiliate {
  id: string;
  name: string;
  avatar: string;
  date: string;
  product: string;
  quantity: number;
  click: number;
  revenue: string;
  status: AffiliateStatus;
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

const statusStyles: Record<AffiliateStatus, string> = {
  processing: "bg-[#FEF3C7] border-[#F59E0B] text-[#F59E0B]",
  delivered: "bg-[#D1FAE5] border-[#10B981] text-[#10B981]",
  cancelled: "bg-[#FEE2E2] border-[#EF4444] text-[#EF4444]",
  unknown: "bg-[#F4F6F8] border-[#DFE3E8] text-[#637381]",
};

const CopyIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className={cn("size-5", className)}
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
    className={cn("size-5.5", className)}
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

const columns = [
  { label: "Client", width: "w-65" },
  { label: "Date", width: "w-[14vw] lg:w-[12vw]" },
  { label: "Product", width: "w-[14vw] lg:w-[12vw]" },
  { label: "Quantity", width: "w-[10vw] lg:w-[8vw]" },
  { label: "Click", width: "w-[10vw] lg:w-[8vw]" },
  { label: "Revenue", width: "w-[10vw] lg:w-[8vw]" },
  { label: "Status", width: "w-[12vw] lg:w-[9vw]" },
  { label: "Product Link", width: "w-40" },
];

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

const normalizeStatus = (value: unknown): AffiliateStatus => {
  const normalized = String(value ?? "")
    .trim()
    .toLowerCase();

  if (["delivered", "completed", "success"].includes(normalized)) {
    return "delivered";
  }

  if (
    ["processing", "pending", "in_progress", "in progress"].includes(
      normalized,
    )
  ) {
    return "processing";
  }

  if (["cancelled", "canceled", "failed", "rejected"].includes(normalized)) {
    return "cancelled";
  }

  return "unknown";
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

const mapApiAffiliateToUi = (
  item: ApiAffiliateProduct,
  index: number,
): Affiliate => {
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
    id: String(item.id ?? `affiliate-${index}`),
    name: clientName,
    avatar:
      item.client_image ??
      item.client?.avatar ??
      item.avatar ??
      "/images/avatar-placeholder.png",
    date: formatDate(rawDate),
    product: productName,
    quantity: safeNumber(item.quantity ?? item.order_quantity),
    click: safeNumber(item.clicks ?? item.click ?? item.total_clicks),
    revenue: formatRevenue(item.revenue ?? item.total_revenue ?? item.commission),
    status: normalizeStatus(item.status),
    productLink,
    qrCode: item.qr_code ?? item.qrCode ?? null,
    productId: normalizedProductId,
  };
};

const TopAffiliatesSection = () => {
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedAffiliate, setSelectedAffiliate] =
    useState<Affiliate | null>(null);
  const [selectedQrCode, setSelectedQrCode] = useState<string | null>(null);
  const [copyPendingAffiliateId, setCopyPendingAffiliateId] = useState<
    string | null
  >(null);
  const [qrPendingAffiliateId, setQrPendingAffiliateId] = useState<
    string | null
  >(null);

  const { data, isPending, isError, error, refetch } = useFetchData(
    "/barber/affiliate-products",
    true,
  );

  const affiliates = useMemo(() => {
    const apiAffiliates = extractAffiliateProducts(
      data as ApiAffiliateProductsResponse | undefined,
    );

    return apiAffiliates
      .map((item, index) => mapApiAffiliateToUi(item, index))
      .slice(0, 5);
  }, [data]);

  const errorMessage =
    error instanceof Error
      ? error.message
      : "Unable to load affiliate products.";

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

  const resolveReferralData = async (affiliate: Affiliate) => {
    const fallbackReferralLink = affiliate.productLink || null;
    const fallbackQrCode = affiliate.qrCode;

    if (affiliate.productId === null) {
      return {
        referral_link: fallbackReferralLink,
        qr_code: fallbackQrCode,
      };
    }

    const referralData = await fetchReferralData(affiliate.productId);

    return {
      referral_link: referralData?.referral_link ?? fallbackReferralLink,
      qr_code: referralData?.qr_code ?? fallbackQrCode,
    };
  };

  const handleCopyLinkClick = async (affiliate: Affiliate) => {
    setCopyPendingAffiliateId(affiliate.id);

    try {
      const referralData = await resolveReferralData(affiliate);

      if (!referralData.referral_link) {
        toast.error("Product link is not available right now.");
        return;
      }

      const copied = await copyReferralLink(referralData.referral_link);

      if (copied) {
        toast.success("Product link copied.");
      }
    } finally {
      setCopyPendingAffiliateId(null);
    }
  };

  const handleQrCodeClick = async (affiliate: Affiliate) => {
    setQrPendingAffiliateId(affiliate.id);

    try {
      const referralData = await resolveReferralData(affiliate);

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

      setSelectedAffiliate(affiliate);
      setSelectedQrCode(referralData.qr_code);
      setQrDialogOpen(true);
    } finally {
      setQrPendingAffiliateId(null);
    }
  };

  return (
    <div className="bg-white flex flex-col overflow-clip p-4 sm:p-5 lg:p-6 2xl:p-8 rounded-xl sm:rounded-2xl shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)] w-full">
      <div className="flex items-center justify-between pb-2 sm:pb-3 h-12 sm:h-14">
        <h3 className="text-base sm:text-lg font-semibold leading-5 sm:leading-6 text-textPrimary">
          Top Affiliates
        </h3>
        <Link
          href="/dashboard/my-clients"
          className="text-sm font-normal leading-normal text-[#637381] underline"
        >
          View all
        </Link>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-225 lg:min-w-0 w-full">
          {/* Table Header */}
          <div className="flex items-start px-1">
            {columns.map((col, i) => (
              <div
                key={col.label}
                className={cn(
                  "bg-[#F9FAFB] px-3 py-2 overflow-hidden",
                  col.width,
                  i === 0 && "rounded-l-lg",
                  i === columns.length - 1 && "rounded-r-lg",
                )}
              >
                <p className="text-sm font-semibold leading-normal text-[#637381] truncate">
                  {col.label}
                </p>
              </div>
            ))}
          </div>

          {isPending ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div
                key={`top-affiliate-skeleton-${index}`}
                className={cn(
                  "flex items-center py-1",
                  index < 4 && "border-b border-[#F9FAFB]",
                )}
              >
                <div
                  className={cn(
                    "flex items-center gap-3 h-16 px-4 py-3 overflow-hidden",
                    columns[0].width,
                  )}
                >
                  <Skeleton className="size-12 rounded-full shrink-0" />
                  <Skeleton className="h-5 w-28" />
                </div>
                <div
                  className={cn(
                    "h-16 flex items-center px-4 py-3 overflow-hidden",
                    columns[1].width,
                  )}
                >
                  <Skeleton className="h-5 w-20" />
                </div>
                <div
                  className={cn(
                    "h-16 flex items-center px-4 py-3 overflow-hidden",
                    columns[2].width,
                  )}
                >
                  <Skeleton className="h-5 w-24" />
                </div>
                <div
                  className={cn(
                    "h-16 flex items-center px-4 py-3 overflow-hidden",
                    columns[3].width,
                  )}
                >
                  <Skeleton className="h-5 w-10" />
                </div>
                <div
                  className={cn(
                    "h-16 flex items-center px-4 py-3 overflow-hidden",
                    columns[4].width,
                  )}
                >
                  <Skeleton className="h-5 w-10" />
                </div>
                <div
                  className={cn(
                    "h-16 flex items-center px-4 py-3 overflow-hidden",
                    columns[5].width,
                  )}
                >
                  <Skeleton className="h-5 w-14" />
                </div>
                <div
                  className={cn(
                    "h-16 flex items-center px-4 py-3 overflow-hidden",
                    columns[6].width,
                  )}
                >
                  <Skeleton className="h-7 w-20 rounded-md" />
                </div>
                <div
                  className={cn(
                    "h-16 flex items-center gap-2.5 px-4 py-3 overflow-hidden",
                    columns[7].width,
                  )}
                >
                  <Skeleton className="h-5 flex-1" />
                  <Skeleton className="size-10 rounded-md" />
                  <Skeleton className="size-10 rounded-md" />
                </div>
              </div>
            ))
          ) : isError ? (
            <div className="px-2 py-4 sm:py-6 min-w-225 lg:min-w-0">
              <div className="rounded-xl border border-[#FECACA] bg-[#FFF2F2] p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">
                <p className="text-sm sm:text-base font-semibold text-[#B42318] leading-6">
                  Failed to load affiliate products.
                </p>
                <p className="text-xs sm:text-sm text-[#7A271A] leading-5">
                  {errorMessage}
                </p>
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="w-fit h-10 px-4 rounded-lg bg-[#DE5D56] text-white text-sm font-semibold hover:bg-[#c14d47] transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : affiliates.length === 0 ? (
            <div className="px-2 py-8 sm:py-10 min-w-225 lg:min-w-0">
              <div className="rounded-xl border border-[#EAECF0] bg-[#F9FAFB] py-8 text-center px-4">
                <p className="text-sm sm:text-base text-[#637381] leading-6">
                  No affiliate products found.
                </p>
              </div>
            </div>
          ) : (
            affiliates.map((affiliate, index) => (
              <div
                key={affiliate.id}
                className={cn(
                  "flex items-center py-1",
                  index < affiliates.length - 1 && "border-b border-[#F9FAFB]",
                )}
              >
                {/* Client */}
                <div
                  className={cn(
                    "flex items-center gap-3 h-16 px-4 py-3 overflow-hidden",
                    columns[0].width,
                  )}
                >
                  <div className="relative shrink-0 size-12 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src={affiliate.avatar}
                      alt={affiliate.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-base font-semibold leading-6 text-textPrimary truncate">
                    {affiliate.name}
                  </p>
                </div>

                {/* Date */}
                <div
                  className={cn(
                    "h-16 flex items-center px-4 py-3 overflow-hidden",
                    columns[1].width,
                  )}
                >
                  <p className="text-base font-normal leading-6 text-textPrimary truncate">
                    {affiliate.date}
                  </p>
                </div>

                {/* Product */}
                <div
                  className={cn(
                    "h-16 flex items-center px-4 py-3 overflow-hidden",
                    columns[2].width,
                  )}
                >
                  <p className="text-base font-semibold leading-6 text-textPrimary truncate">
                    {affiliate.product}
                  </p>
                </div>

                {/* Quantity */}
                <div
                  className={cn(
                    "h-16 flex items-center px-4 py-3 overflow-hidden",
                    columns[3].width,
                  )}
                >
                  <p className="text-base font-normal leading-6 text-textPrimary truncate w-full">
                    {affiliate.quantity}
                  </p>
                </div>

                {/* Click */}
                <div
                  className={cn(
                    "h-16 flex items-center px-4 py-3 overflow-hidden",
                    columns[4].width,
                  )}
                >
                  <p className="text-base font-normal leading-6 text-textPrimary">
                    {affiliate.click}
                  </p>
                </div>

                {/* Revenue */}
                <div
                  className={cn(
                    "h-16 flex items-center px-4 py-3 overflow-hidden",
                    columns[5].width,
                  )}
                >
                  <p className="text-base font-normal leading-6 text-textPrimary">
                    {affiliate.revenue}
                  </p>
                </div>

                {/* Status */}
                <div
                  className={cn(
                    "h-16 flex items-center px-4 py-3 overflow-hidden",
                    columns[6].width,
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex items-center justify-center px-3 py-1 rounded-md border text-xs leading-4.5 font-normal capitalize",
                      statusStyles[affiliate.status],
                    )}
                  >
                    {affiliate.status}
                  </span>
                </div>

                {/* Product Link */}
                <div
                  className={cn(
                    "h-16 flex items-center gap-2.5 px-4 py-3 overflow-hidden",
                    columns[7].width,
                  )}
                >
                  <button
                    type="button"
                    title="Copy link"
                    disabled={
                      copyPendingAffiliateId === affiliate.id ||
                      (!affiliate.productLink && affiliate.productId === null)
                    }
                    onClick={() => handleCopyLinkClick(affiliate)}
                    className="shrink-0 size-10 flex items-center justify-center border border-[#F4F6F8] rounded-md bg-white cursor-pointer hover:bg-[#F9FAFB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {copyPendingAffiliateId === affiliate.id ? (
                      <Loader2 className="size-5 text-[#637381] animate-spin" />
                    ) : (
                      <CopyIcon />
                    )}
                  </button>
                  <button
                    type="button"
                    title="QR Code"
                    disabled={
                      qrPendingAffiliateId === affiliate.id ||
                      (affiliate.productId === null && !affiliate.qrCode)
                    }
                    onClick={() => handleQrCodeClick(affiliate)}
                    className="shrink-0 size-10 flex items-center justify-center border border-[#F4F6F8] rounded-md bg-white cursor-pointer hover:bg-[#F9FAFB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {qrPendingAffiliateId === affiliate.id ? (
                      <Loader2 className="size-5 text-[#637381] animate-spin" />
                    ) : (
                      <QRIcon />
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <QRCodeDialog
        open={qrDialogOpen}
        onOpenChange={(open) => {
          setQrDialogOpen(open);

          if (!open) {
            setSelectedQrCode(null);
            setSelectedAffiliate(null);
          }
        }}
        productName={selectedAffiliate?.product}
        qrCode={selectedQrCode}
      />
    </div>
  );
};

export default TopAffiliatesSection;
