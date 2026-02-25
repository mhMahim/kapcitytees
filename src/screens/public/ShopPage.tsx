import ShopHeroBanner from "@/components/shop/ShopHeroBanner";
import ShopFilterSidebar from "@/components/shop/ShopFilterSidebar";
import ShopProductGrid from "@/components/shop/ShopProductGrid";
import { ShopProductCardProps } from "@/components/shop/ShopProductCard";
import Container from "@/components/shared/Container";

// Placeholder product image — replace with real product images
const PRODUCT_IMG = "https://i.ibb.co.com/27rvh0W6/Rectangle-55.png";

const products: ShopProductCardProps[] = [
  {
    id: 1,
    name: "Beard Oil",
    category: "Beard",
    price: 100,
    image: PRODUCT_IMG,
    barberCertified: true,
  },
  {
    id: 2,
    name: "Beard Oil",
    category: "Beard",
    price: 100,
    image: PRODUCT_IMG,
  },
  {
    id: 3,
    name: "Beard Oil",
    category: "Beard",
    price: 100,
    image: PRODUCT_IMG,
  },
  {
    id: 4,
    name: "Beard Oil",
    category: "Beard",
    price: 100,
    image: PRODUCT_IMG,
    barberCertified: true,
  },
  {
    id: 5,
    name: "Beard Oil",
    category: "Beard",
    price: 100,
    image: PRODUCT_IMG,
  },
  {
    id: 6,
    name: "Beard Oil",
    category: "Beard",
    price: 100,
    image: PRODUCT_IMG,
  },
  {
    id: 7,
    name: "Beard Oil",
    category: "Beard",
    price: 100,
    image: PRODUCT_IMG,
    barberCertified: true,
  },
  {
    id: 8,
    name: "Beard Oil",
    category: "Beard",
    price: 100,
    image: PRODUCT_IMG,
  },
  {
    id: 9,
    name: "Beard Oil",
    category: "Beard",
    price: 100,
    image: PRODUCT_IMG,
  },
  {
    id: 10,
    name: "Beard Oil",
    category: "Beard",
    price: 100,
    image: PRODUCT_IMG,
    barberCertified: true,
  },
  {
    id: 11,
    name: "Beard Oil",
    category: "Beard",
    price: 100,
    image: PRODUCT_IMG,
  },
  {
    id: 12,
    name: "Beard Oil",
    category: "Beard",
    price: 100,
    image: PRODUCT_IMG,
  },
];

const ShopPage = () => {
  return (
    <main className="min-h-screen bg-[#F9FAFB] flex flex-col">
      {/* Hero banner */}
      <ShopHeroBanner />

      {/* Main content */}
      <Container className="w-full px-6 lg:px-8 py-14 flex flex-col lg:flex-row gap-8 flex-1">
        {/* Left: Filters */}
        <div className="w-full lg:w-88.75 shrink-0">
          <ShopFilterSidebar />
        </div>

        {/* Right: Products */}
        <div className="flex-1 min-w-0">
          <ShopProductGrid products={products} totalResults={50} />
        </div>
      </Container>
    </main>
  );
};

export default ShopPage;
