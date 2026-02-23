"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ShopProductCard, { ShopProductCardProps } from "./ShopProductCard";
import ShopPagination from "./ShopPagination";

const SORT_OPTIONS = [
  "Popularity",
  "Price: Low to High",
  "Price: High to Low",
  "Newest",
];

interface ShopProductGridProps {
  products: ShopProductCardProps[];
  totalResults?: number;
}

const ShopProductGrid = ({
  products,
  totalResults = 50,
}: ShopProductGridProps) => {
  const [sort, setSort] = useState("Popularity");
  const [sortOpen, setSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const TOTAL_PAGES = Math.ceil(totalResults / products.length);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header row */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-6">
          <h2 className="text-2xl font-semibold text-[#0F2A3C] leading-9">Products</h2>
          <p className="text-sm text-[#5E707C]">
            Showing {products.length} Result from total {totalResults}
          </p>
        </div>

        {/* Sort dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-2 bg-white border border-[#F4F6F8] rounded-xl px-5 py-3"
            onClick={() => setSortOpen((v) => !v)}
          >
            <span className="text-sm font-medium text-[#0F2A3C]">{sort}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#0F2A3C]" />
          </button>
          {sortOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-[#F4F6F8] rounded-xl shadow-lg z-20 py-1">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#F4F6F8] transition-colors ${
                    sort === option
                      ? "font-semibold text-[#1E6FA8]"
                      : "text-[#637381]"
                  }`}
                  onClick={() => {
                    setSort(option);
                    setSortOpen(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {products.map((product) => (
          <ShopProductCard key={product.id} {...product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <ShopPagination
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ShopProductGrid;
