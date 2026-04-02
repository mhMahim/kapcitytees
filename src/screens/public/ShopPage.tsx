"use client";

import { useMemo, useState } from "react";
import ShopHeroBanner from "@/components/shop/ShopHeroBanner";
import ShopFilterSidebar from "@/components/shop/ShopFilterSidebar";
import ShopProductGrid from "@/components/shop/ShopProductGrid";
import { ShopProductCardProps } from "@/components/shop/ShopProductCard";
import Container from "@/components/shared/Container";
import useFetchData from "@/hooks/useFetchData";
import { Skeleton } from "@/components/ui/skeleton";

interface ApiProduct {
  id: number;
  title: string;
  price: string;
  thumbnail_url: string;
  slug: string;
  category?: {
    name?: string;
  };
}

interface ApiProductsPageData {
  data?: ApiProduct[];
  total?: number;
  last_page?: number;
}

interface ApiProductsResponse {
  data?: {
    data?: ApiProductsPageData;
  };
}

const ShopPage = () => {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(500);
  const [search] = useState("");
  const [sort, setSort] = useState("popularity");
  const [currentPage, setCurrentPage] = useState(1);
  const [size] = useState(10);

  // Build the dynamic query string
  const productsUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set("min_price", String(minPrice));
    params.set("max_price", String(maxPrice));
    params.set("sort", sort);
    params.set("categories", selectedCategoryIds.join(","));
    params.set("search", search);
    params.set("size", String(size));
    params.set("page", String(currentPage));
    return `/products?${params.toString()}`;
  }, [
    selectedCategoryIds,
    minPrice,
    maxPrice,
    search,
    sort,
    size,
    currentPage,
  ]);

  const {
    data: productsApiData,
    isPending: productsLoading,
    isError: productsError,
    error: productsErrorData,
    refetch: refetchProducts,
  } = useFetchData(productsUrl);

  const productsPageData = (productsApiData as ApiProductsResponse | undefined)
    ?.data?.data;

  const products = useMemo<ShopProductCardProps[]>(() => {
    const apiProducts = productsPageData?.data ?? [];

    return apiProducts.map((item) => ({
      id: item.id,
      name: item.title,
      category: item.category?.name || "",
      price: Number(item.price),
      image: item.thumbnail_url,
      slug: item.slug,
      barberCertified: false,
    }));
  }, [productsPageData]);

  const totalResults = productsPageData?.total ?? products.length;
  const totalPages = Math.max(productsPageData?.last_page ?? 1, 1);

  const errorMessage =
    productsErrorData instanceof Error
      ? productsErrorData.message
      : "Failed to load products. Please try again.";

  const handleCategoryChange = (categoryIds: number[]) => {
    setSelectedCategoryIds(categoryIds);
    setCurrentPage(1);
  };

  const handlePriceChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
    setCurrentPage(1);
  };

  const handleSortChange = (sortValue: string) => {
    setSort(sortValue);
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-[#F9FAFB] flex flex-col">
      {/* Hero banner */}
      <ShopHeroBanner />

      {/* Main content */}
      <Container className="py-6 sm:py-10 lg:py-14 flex flex-col lg:flex-row gap-6 lg:gap-8 flex-1">
        {/* Left: Filters — full-width stacked on mobile, fixed-width sidebar on lg+ */}
        <div className="w-full lg:w-88.75 shrink-0">
          <ShopFilterSidebar
            onCategoryChange={handleCategoryChange}
            onPriceChange={handlePriceChange}
          />
        </div>

        {/* Right: Products */}
        <div className="flex-1 min-w-0">
          {productsLoading ? (
            <div className="flex flex-col gap-6 w-full">
              <div className="flex items-start justify-between gap-3 w-full">
                <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 min-w-0">
                  <Skeleton className="h-8 w-32 sm:w-40" />
                  <Skeleton className="h-5 w-28 sm:w-40" />
                </div>
                <Skeleton className="h-10 sm:h-12 w-36 sm:w-48 rounded-xl" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={`product-skeleton-${index}`}
                    className="bg-white rounded-[20px] shadow-[0px_4px_20px_0px_rgba(145,158,171,0.08)] p-3 flex flex-col gap-3"
                  >
                    <Skeleton className="w-full h-44 sm:h-52 lg:h-60 xl:h-73.25 rounded-lg" />
                    <div className="flex flex-col gap-2 p-2 sm:p-3">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-6 w-3/4" />
                    </div>
                    <div className="flex items-center justify-between p-2 sm:p-3 pt-0">
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="size-10 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : productsError ? (
            <div className="rounded-2xl border border-[#FECACA] bg-[#FFF2F2] p-4 sm:p-6 flex flex-col gap-3">
              <p className="text-sm sm:text-base text-[#B42318] leading-6">
                Failed to load products. Please try again.
              </p>
              <p className="text-xs sm:text-sm text-[#7A271A] leading-5">
                {errorMessage}
              </p>
              <button
                type="button"
                onClick={() => refetchProducts()}
                className="w-fit h-10 px-4 rounded-lg bg-[#DE5D56] text-white text-sm font-semibold hover:bg-[#c14d47] transition-colors"
              >
                Retry
              </button>
            </div>
          ) : (
            <ShopProductGrid
              products={products}
              totalResults={totalResults}
              sort={sort}
              onSortChange={handleSortChange}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </Container>
    </main>
  );
};

export default ShopPage;
