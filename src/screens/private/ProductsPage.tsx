"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { SearchIcon } from "@/assets/icons";
import ProductCard from "@/components/dashboard/product/ProductCard";
import type { Product } from "@/components/dashboard/product/ProductCard";
import QRCodeDialog from "@/components/dashboard/product/QRCodeDialog";
import useFetchData from "@/hooks/useFetchData";

interface ProductCategoryApiData {
  name?: string | null;
}

interface ProductApiData {
  id: number;
  title?: string | null;
  price?: string | number | null;
  thumbnail_url?: string | null;
  category?: ProductCategoryApiData | null;
}

interface ProductPaginationApiData {
  current_page?: number;
  last_page?: number;
  prev_page_url?: string | null;
  next_page_url?: string | null;
  data?: ProductApiData[];
}

interface ProductListApiResponse {
  message?: string;
  data?: {
    data?: ProductPaginationApiData;
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

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedQrCode, setSelectedQrCode] = useState<string | null>(null);
  const [copyPendingProductId, setCopyPendingProductId] = useState<number | null>(null);
  const [qrPendingProductId, setQrPendingProductId] = useState<number | null>(null);

  const productsUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(currentPage));

    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    }

    return `/products?${params.toString()}`;
  }, [currentPage, searchQuery]);

  const { data, isPending, isError, error, refetch } =
    useFetchData(productsUrl);

  const productsData = (data as ProductListApiResponse | undefined)?.data?.data;
  const currentApiPage = productsData?.current_page ?? 1;
  const totalPages = productsData?.last_page ?? 1;
  const hasPrevPage = Boolean(productsData?.prev_page_url);
  const hasNextPage = Boolean(productsData?.next_page_url);

  const products: Product[] = useMemo(
    () =>
      (productsData?.data ?? []).map((item) => ({
        id: item.id,
        name: item.title?.trim() || "Unnamed product",
        category: item.category?.name?.trim() || "Uncategorized",
        price: Number.parseFloat(String(item.price ?? 0)) || 0,
        image:
          item.thumbnail_url || "https://placehold.co/600x600?text=Product",
      })),
    [productsData],
  );

  const errorMessage =
    error instanceof Error
      ? error.message
      : "Something went wrong while loading products.";

  const fetchReferralData = async (productId: number) => {
    const token = localStorage.getItem("token");
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!token) {
      toast.error("Authentication required. Please log in again.");
      return null;
    }

    if (!baseUrl) {
      toast.error("Base URL is not configured.");
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
    } catch (apiError: any) {
      toast.error(
        apiError?.response?.data?.message || "Failed to load referral link.",
      );
      return null;
    }
  };

  const copyReferralLink = async (referralLink: string) => {
    try {
      await navigator.clipboard.writeText(referralLink);
      return true;
    } catch {
      toast.error("Failed to copy referral link.");
      return false;
    }
  };

  const handleCopyLinkClick = async (product: Product) => {
    setCopyPendingProductId(product.id);

    try {
      const referralData = await fetchReferralData(product.id);

      if (!referralData) {
        return;
      }

      if (!referralData.referral_link) {
        toast.error("Referral link is not available right now.");
        return;
      }

      const copied = await copyReferralLink(referralData.referral_link);

      if (copied) {
        toast.success("Referral link copied.");
      }
    } finally {
      setCopyPendingProductId(null);
    }
  };

  const handleQrCodeClick = async (product: Product) => {
    setQrPendingProductId(product.id);

    try {
      const referralData = await fetchReferralData(product.id);

      if (!referralData) {
        return;
      }

      if (!referralData.referral_link) {
        toast.error("Referral link is not available right now.");
        return;
      }

      const copied = await copyReferralLink(referralData.referral_link);

      if (copied) {
        toast.success("Referral link copied.");
      }

      if (!referralData.qr_code) {
        toast.error("QR code is not available right now.");
        return;
      }

      setSelectedProduct(product);
      setSelectedQrCode(referralData.qr_code);
      setQrDialogOpen(true);
    } finally {
      setQrPendingProductId(null);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentApiPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentApiPage - 1);
      const end = Math.min(totalPages - 1, currentApiPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentApiPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6 2xl:gap-8">
      {/* Search Bar */}
      <div className="bg-white flex gap-3 sm:gap-4 2xl:gap-5 items-center h-12 sm:h-13 2xl:h-15 px-3 sm:px-4 2xl:px-5 rounded-xl sm:rounded-2xl shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)] overflow-hidden">
        <SearchIcon className="size-5 sm:size-6 shrink-0" />
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 2xl:gap-6">
        {isPending ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={`product-skeleton-${index}`}
              className="bg-white rounded-xl sm:rounded-2xl shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)] h-44 lg:h-48 2xl:h-55.5 animate-pulse"
            />
          ))
        ) : isError ? (
          <div className="col-span-full bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)]">
            <p className="text-base sm:text-lg font-semibold text-[#DE5D56]">
              Something went wrong while loading products.
            </p>
            <p className="mt-2 text-sm sm:text-base text-[#637381]">
              {errorMessage}
            </p>
            <button
              onClick={() => refetch()}
              className="mt-5 h-11 px-6 rounded-xl bg-[#1E6FA8] text-white text-sm sm:text-base font-semibold hover:bg-[#1A5F92] transition-colors cursor-pointer"
            >
              Try Again
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)]">
            <p className="text-base sm:text-lg text-[#637381]">
              {searchQuery.trim()
                ? "No products found for your search."
                : "No products available right now."}
            </p>
          </div>
        ) : (
          products.map((product, index) => (
            <ProductCard
              key={`${product.id}-${index}`}
              product={product}
              onCopyLinkClick={handleCopyLinkClick}
              onQrCodeClick={handleQrCodeClick}
              isCopyPending={copyPendingProductId === product.id}
              isQrPending={qrPendingProductId === product.id}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {!isPending && !isError && products.length > 0 && totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5">
          {/* Previous */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentApiPage === 1 || !hasPrevPage}
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
                  currentApiPage === page
                    ? "bg-[rgba(145,158,171,0.16)] font-semibold text-textPrimary"
                    : "text-textPrimary hover:bg-[rgba(145,158,171,0.08)]"
                }`}
              >
                {page}
              </button>
            ),
          )}

          {/* Next */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentApiPage === totalPages || !hasNextPage}
            className="size-9 rounded-full flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[rgba(145,158,171,0.08)] transition-colors"
          >
            <ChevronRight className="size-6 text-textPrimary" />
          </button>
        </div>
      )}

      {/* QR Code Dialog */}
      <QRCodeDialog
        open={qrDialogOpen}
        onOpenChange={(open) => {
          setQrDialogOpen(open);

          if (!open) {
            setSelectedQrCode(null);
          }
        }}
        productName={selectedProduct?.name}
        qrCode={selectedQrCode}
      />
    </div>
  );
};

export default ProductsPage;
