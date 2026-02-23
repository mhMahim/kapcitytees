"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface ShopPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ShopPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: ShopPaginationProps) => {
  // Build visible pages: always show 1–5, ellipsis, then last
  const pages: (number | "...")[] = [];
  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1, 2, 3, 4, 5, "...");
  }

  return (
    <div className="flex items-center justify-center gap-1.5">
      {/* Prev */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-9 h-9 flex items-center justify-center rounded-full text-[#212B36] hover:bg-[rgba(145,158,171,0.16)] disabled:opacity-30 transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Pages */}
      {pages.map((page, i) =>
        page === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="w-10 h-10 flex items-center justify-center text-base text-[#212B36]"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`w-10 h-10 rounded-lg text-base font-${
              currentPage === page ? "semibold" : "normal"
            } transition-colors ${
              currentPage === page
                ? "bg-[rgba(145,158,171,0.16)] text-[#212B36]"
                : "text-[#212B36] hover:bg-[rgba(145,158,171,0.08)]"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-9 h-9 flex items-center justify-center rounded-full text-[#212B36] hover:bg-[rgba(145,158,171,0.16)] disabled:opacity-30 transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ShopPagination;
