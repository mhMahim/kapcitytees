"use client";

import { useState } from "react";
import { SearchIcon } from "@/assets/icons";
import ProductCard from "@/components/dashboard/product/ProductCard";
import type { Product } from "@/components/dashboard/product/ProductCard";
import QRCodeDialog from "@/components/dashboard/product/QRCodeDialog";
import { ChevronLeft, ChevronRight } from "lucide-react";

const sampleProducts: Product[] = Array.from({ length: 36 }, (_, i) => ({
  id: `product-${i + 1}`,
  name: "Premium Sea Salt Spray",
  category: "Hair Spray",
  price: 100,
  image: "https://i.ibb.co.com/twNWtDnz/ee8b8768c4c808174449d2fa9b316dcf1c2f3322.png",
}));

const ITEMS_PER_PAGE = 12;

const ProductPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = sampleProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleQrCodeClick = (product: Product) => {
    setSelectedProduct(product);
    setQrDialogOpen(true);
  };

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3, 4, 5, "...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Search Bar */}
      <div className="bg-white flex gap-5 items-center h-15 px-5 rounded-2xl shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)] overflow-hidden">
        <SearchIcon className="size-6 shrink-0" />
        <input
          type="text"
          placeholder="Search any product and get link"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="flex-1 text-base text-textPrimary placeholder:text-[#919EAB] leading-6 outline-none bg-transparent"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {paginatedProducts.map((product, index) => (
          <ProductCard
            key={`${product.id}-${index}`}
            product={product}
            onQrCodeClick={handleQrCodeClick}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5">
          {/* Previous */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="size-9 rounded-full flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[rgba(145,158,171,0.08)] transition-colors"
          >
            <ChevronLeft className="size-6 text-textPrimary" />
          </button>

          {/* Page Numbers */}
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="size-10 flex items-center justify-center text-base text-textPrimary"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`size-10 rounded-lg flex items-center justify-center text-base cursor-pointer transition-colors ${
                  currentPage === page
                    ? "bg-[rgba(145,158,171,0.16)] font-semibold text-textPrimary"
                    : "text-textPrimary hover:bg-[rgba(145,158,171,0.08)]"
                }`}
              >
                {page}
              </button>
            )
          )}

          {/* Next */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="size-9 rounded-full flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[rgba(145,158,171,0.08)] transition-colors"
          >
            <ChevronRight className="size-6 text-textPrimary" />
          </button>
        </div>
      )}

      {/* QR Code Dialog */}
      <QRCodeDialog
        open={qrDialogOpen}
        onOpenChange={setQrDialogOpen}
        productName={selectedProduct?.name}
      />
    </div>
  );
};

export default ProductPage;
