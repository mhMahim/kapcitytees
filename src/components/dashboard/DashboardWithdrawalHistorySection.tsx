"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useFetchData from "@/hooks/useFetchData";
import { Skeleton } from "@/components/ui/skeleton";

interface WithdrawalHistoryRecord {
  id: number;
  date: string;
  amount: number | string;
  status: string;
}

interface WithdrawalHistoryPaginationData {
  current_page?: number;
  data?: WithdrawalHistoryRecord[];
  last_page?: number;
  prev_page_url?: string | null;
  next_page_url?: string | null;
}

interface WithdrawalHistoryApiResponse {
  status?: boolean;
  data?: WithdrawalHistoryPaginationData;
}

const statusStyles: Record<string, string> = {
  pending: "bg-[#FEF3C7] border-[#F59E0B] text-[#F59E0B]",
  complete: "bg-[#E6FDF2] border-[#A5E6C6] text-[#0CAF60]",
  declined: "bg-[rgba(255,72,66,0.1)] border-[#FF4842] text-[#D6342C]",
};

const StatusChip = ({ status }: { status: string }) => {
  const normalizedStatus = status?.toLowerCase() || "pending";
  const chipClassName =
    statusStyles[normalizedStatus] ||
    "bg-[#F4F6F8] border-[#DFE3E8] text-[#637381]";

  const displayStatus =
    normalizedStatus.charAt(0).toUpperCase() + normalizedStatus.slice(1);

  return (
    <span
      className={`inline-flex items-center justify-center px-3 py-1 rounded-md border text-xs leading-4.5 ${chipClassName}`}
    >
      {displayStatus}
    </span>
  );
};

const DashboardWithdrawalHistorySection = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: historyResponse,
    isPending: isHistoryPending,
    isError: isHistoryError,
  } = useFetchData(`/barber/withdrawal-history?page=${currentPage}`, true);

  const historyData = (
    historyResponse as WithdrawalHistoryApiResponse | undefined
  )?.data;

  const historyRecords = historyData?.data ?? [];
  const currentApiPage = historyData?.current_page ?? currentPage;
  const totalPages = historyData?.last_page ?? 1;
  const hasPrevPage = Boolean(historyData?.prev_page_url) || currentApiPage > 1;
  const hasNextPage =
    Boolean(historyData?.next_page_url) || currentApiPage < totalPages;

  const formatAmount = (value: number | string) => {
    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
      return `${value}$`;
    }

    return `${new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    }).format(numericValue)}$`;
  };

  const paginationItems = useMemo(() => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      for (let page = 1; page <= totalPages; page += 1) {
        pages.push(page);
      }

      return pages;
    }

    pages.push(1);

    if (currentApiPage > 3) {
      pages.push("...");
    }

    const startPage = Math.max(2, currentApiPage - 1);
    const endPage = Math.min(totalPages - 1, currentApiPage + 1);

    for (let page = startPage; page <= endPage; page += 1) {
      pages.push(page);
    }

    if (currentApiPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  }, [currentApiPage, totalPages]);

  const onPageChange = (page: number) => {
    const safePage = Math.max(1, Math.min(totalPages, page));
    setCurrentPage(safePage);
  };

  return (
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

        {isHistoryPending ? (
          <div className="flex flex-col">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`withdraw-history-skeleton-${index}`}
                className="border-b border-[#F9FAFB] last:border-b-0"
              >
                <div className="sm:hidden flex items-center justify-between gap-3 py-3 px-2">
                  <div className="flex flex-col gap-1 min-w-0 w-24">
                    <Skeleton className="h-3.5 w-10" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex flex-col gap-1 w-20">
                    <Skeleton className="h-3.5 w-12" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-6 w-20 rounded-md" />
                </div>
                <div className="hidden sm:flex items-center py-1">
                  <div className="w-64 h-16 flex items-center px-4">
                    <Skeleton className="h-5 w-32" />
                  </div>
                  <div className="flex-1 h-16 flex items-center px-4">
                    <Skeleton className="h-5 w-24" />
                  </div>
                  <div className="w-54 h-16 flex items-center justify-center px-4">
                    <Skeleton className="h-6 w-24 rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : isHistoryError ? (
          <div className="py-8 px-3 text-center">
            <p className="text-sm sm:text-base font-semibold text-[#B42318]">
              Failed to load withdrawal history. Please try again later.
            </p>
          </div>
        ) : historyRecords.length === 0 ? (
          <div className="py-8 px-3 text-center">
            <p className="text-sm sm:text-base text-[#637381]">
              No withdrawal history available yet.
            </p>
          </div>
        ) : (
          <>
            {historyRecords.map((record, index) => {
              console.log(record);
              return (
                <div
                  key={`${record.id}-${index}`}
                  className={`${
                    index < historyRecords.length - 1
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
                        {formatAmount(record.amount)}
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
                        {formatAmount(record.amount)}
                      </p>
                    </div>
                    <div className="w-54 h-16 flex items-center justify-center px-4">
                      <StatusChip status={record.status} />
                    </div>
                  </div>
                </div>
              );
            })}

            {totalPages > 1 ? (
              <div className="pt-4 px-2 sm:px-3">
                {/* Mobile Pagination */}
                <div className="sm:hidden flex items-center justify-between gap-2">
                  <button
                    onClick={() => onPageChange(currentApiPage - 1)}
                    disabled={!hasPrevPage || currentApiPage <= 1}
                    className="h-9 px-3 rounded-lg text-sm font-medium text-textPrimary border border-[#DFE3E8] disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Prev
                  </button>
                  <p className="text-sm font-medium text-[#637381]">
                    Page {currentApiPage} of {totalPages}
                  </p>
                  <button
                    onClick={() => onPageChange(currentApiPage + 1)}
                    disabled={!hasNextPage || currentApiPage >= totalPages}
                    className="h-9 px-3 rounded-lg text-sm font-medium text-textPrimary border border-[#DFE3E8] disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>

                {/* Desktop Pagination */}
                <div className="hidden sm:flex items-center justify-center gap-1.5">
                  <button
                    onClick={() => onPageChange(currentApiPage - 1)}
                    disabled={!hasPrevPage || currentApiPage <= 1}
                    className="size-9 rounded-full flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[rgba(145,158,171,0.08)] transition-colors"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="size-6 text-textPrimary" />
                  </button>

                  {paginationItems.map((page, index) =>
                    page === "..." ? (
                      <span
                        key={`history-ellipsis-${index}`}
                        className="size-10 flex items-center justify-center text-base text-textPrimary"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={`history-page-${page}`}
                        onClick={() => onPageChange(page)}
                        className={`size-10 rounded-lg flex items-center justify-center text-base cursor-pointer transition-colors ${
                          currentApiPage === page
                            ? "bg-[rgba(145,158,171,0.16)] font-semibold text-textPrimary"
                            : "text-textPrimary hover:bg-[rgba(145,158,171,0.08)]"
                        }`}
                        aria-label={`Go to page ${page}`}
                        aria-current={
                          currentApiPage === page ? "page" : undefined
                        }
                      >
                        {page}
                      </button>
                    ),
                  )}

                  <button
                    onClick={() => onPageChange(currentApiPage + 1)}
                    disabled={!hasNextPage || currentApiPage >= totalPages}
                    className="size-9 rounded-full flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[rgba(145,158,171,0.08)] transition-colors"
                    aria-label="Next page"
                  >
                    <ChevronRight className="size-6 text-textPrimary" />
                  </button>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardWithdrawalHistorySection;
