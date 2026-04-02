"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ShopProductCard, { ShopProductCardProps } from "./ShopProductCard";
import ShopPagination from "./ShopPagination";

const SORT_OPTIONS = [
  { label: "Popularity", value: "popularity" },
  { label: "Price: Low to High", value: "price_low_high" },
  { label: "Price: High to Low", value: "price_high_low" },
  { label: "Featured", value: "featured" },
];

interface ShopProductGridProps {
  products: ShopProductCardProps[];
  totalResults?: number;
  sort: string;
  onSortChange: (sort: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ShopProductGrid = ({
  products,
  totalResults = 50,
  sort,
  onSortChange,
  currentPage,
  totalPages,
  onPageChange,
}: ShopProductGridProps) => {
  const [sortOpen, setSortOpen] = useState(false);
  const selectedSortLabel =
    SORT_OPTIONS.find((option) => option.value === sort)?.label ||
    SORT_OPTIONS[0].label;

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 w-full">
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 min-w-0">
          <h2 className="text-base sm:text-xl lg:text-2xl font-semibold text-[#0F2A3C] leading-tight sm:leading-9 shrink-0">Products</h2>
          <p className="text-xs sm:text-sm text-[#5E707C] truncate">
            Showing {products.length} of {totalResults}
          </p>
        </div>

        {/* Sort dropdown */}
        <div className="relative shrink-0">
          <button
            className="flex items-center gap-1.5 sm:gap-2 bg-white border border-[#F4F6F8] rounded-xl px-3 py-2 sm:px-5 sm:py-3"
            onClick={() => setSortOpen((v) => !v)}
          >
            <span className="text-sm font-medium text-[#0F2A3C]">{selectedSortLabel}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#0F2A3C]" />
          </button>
          {sortOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-[#F4F6F8] rounded-xl shadow-lg z-20 py-1">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#F4F6F8] transition-colors ${
                    sort === option.value
                      ? "font-semibold text-[#1E6FA8]"
                      : "text-[#637381]"
                  }`}
                  onClick={() => {
                    onSortChange(option.value);
                    setSortOpen(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
        {products.map((product) => (
          <ShopProductCard key={product.id} {...product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <ShopPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ShopProductGrid;
