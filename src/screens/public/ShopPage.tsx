"use client";

import { useEffect, useMemo, useState } from "react";
import ShopHeroBanner from "@/components/shop/ShopHeroBanner";
import ShopFilterSidebar from "@/components/shop/ShopFilterSidebar";
import ShopProductGrid from "@/components/shop/ShopProductGrid";
import { ShopProductCardProps } from "@/components/shop/ShopProductCard";
import Container from "@/components/shared/Container";
import useFetchData from "@/hooks/useFetchData";

const ShopPage = () => {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(500);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [size, setSize] = useState(10);

  // Build the dynamic query string
  const productsUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set("min_price", String(minPrice));
    params.set("max_price", String(maxPrice));
    // params.set("sort", sort);
    params.set("categories", selectedCategoryIds.join(","));
    params.set("search", search);
    params.set("size", String(size));
    return `/products?${params.toString()}`;
  }, [selectedCategoryIds, minPrice, maxPrice, search, sort, size]);

  const { data: productsApiData, isPending: productsLoading } =
    useFetchData(productsUrl);

  // Map API response to ShopProductCardProps[]
  const [products, setProducts] = useState<ShopProductCardProps[]>([]);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (productsApiData?.data?.data) {
      const apiProducts = productsApiData.data.data.data || [];
      const mapped: ShopProductCardProps[] = apiProducts.map((item: any) => ({
        id: item.id,
        name: item.title,
        category: item.category?.name || "",
        price: parseFloat(item.price),
        image: item.thumbnail_url,
        slug: item.slug,
        barberCertified: false,
      }));
      setProducts(mapped);
      setTotalResults(productsApiData.data.data.total || mapped.length);
    }
  }, [productsApiData]);

  const handlePriceChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
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
            onCategoryChange={setSelectedCategoryIds}
            onPriceChange={handlePriceChange}
          />
        </div>

        {/* Right: Products */}
        <div className="flex-1 min-w-0">
          {productsLoading ? (
            <div className="text-center py-10 text-[#919DA5]">
              Loading products...
            </div>
          ) : (
            <ShopProductGrid products={products} totalResults={totalResults} />
          )}
        </div>
      </Container>
    </main>
  );
};

export default ShopPage;
