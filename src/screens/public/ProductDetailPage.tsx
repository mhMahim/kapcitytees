import Container from "@/components/shared/Container";
import ProductImageGallery from "@/components/shop/ProductImageGallery";
import ProductInfo from "@/components/shop/ProductInfo";
import ProductDescriptionTabs from "@/components/shop/ProductDescriptionTabs";
import RelatedProducts from "@/components/shop/RelatedProducts";
import { ShopProductCardProps } from "@/components/shop/ShopProductCard";

// Placeholder product image — replace with real product images
const PRODUCT_IMG = "https://i.ibb.co.com/27rvh0W6/Rectangle-55.png";

// Sample product images for the gallery
const productImages = [
  PRODUCT_IMG,
  PRODUCT_IMG,
  PRODUCT_IMG,
  PRODUCT_IMG,
  PRODUCT_IMG,
];

// Description tab content
const descriptionSections = [
  {
    title: "Product Description",
    paragraph:
      "When it's colder than the far side of the moon and spitting rain too, you've still got to look good. From water-repellent leather to a rugged outsole, the Lunar Force 1 adapts AF-1 style, so you can keep your flame burning when the weather hits. Metal lace hardware and extended tongue bring mountain boot toughness, while the star-studded toe design gives your look the edge",
  },
  {
    title: "Benefits",
    bullets: [
      {
        text: "Durable leather is easily cleanable so you can keep your look fresh.",
      },
      {
        text: "Water-repellent finish and internal membrane help keep your feet dry.",
      },
      { text: "Toe piece with star pattern adds durability." },
      { text: "Synthetic insulation helps keep you warm." },
      {
        text: "Originally designed for performance hoops, the Air unit delivers lightweight cushioning.",
      },
      {
        text: "Plush tongue wraps over the ankle to help keep out the moisture and cold.",
      },
      {
        text: "Rubber outsole with aggressive traction pattern adds durable grip.",
      },
      {
        text: "Durable leather is easily cleanable so you can keep your look fresh.",
      },
    ],
  },
  {
    title: "Product Details",
    bullets: [
      { text: "Not intended for use as Personal Protective Equipment (PPE)" },
      {
        text: "Water-repellent finish and internal membrane help keep your feet dry.",
      },
    ],
  },
  {
    title: "More Details",
    bullets: [
      { text: "Lunarlon midsole delivers ultra-plush responsiveness" },
      { text: "Encapsulated Air-Sole heel unit for lightweight cushioning" },
      { text: "Colour Shown: Ale Brown/Black/Goldtone/Ale Brown" },
      { text: "Style: 805899-202" },
    ],
  },
];

// Related products
const relatedProducts: ShopProductCardProps[] = [
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
    barberCertified: true,
  },
  {
    id: 3,
    name: "Beard Oil",
    category: "Beard",
    price: 100,
    image: PRODUCT_IMG,
    barberCertified: true,
  },
  {
    id: 4,
    name: "Beard Oil",
    category: "Beard",
    price: 100,
    image: PRODUCT_IMG,
    barberCertified: true,
  },
];

import { Skeleton } from "@/components/ui/skeleton";

interface ProductDetailPageProps {
  product?: any;
  isPending?: boolean;
}

const ProductDetailPage = ({ product, isPending = false }: ProductDetailPageProps) => {
  console.log(product);
  if (isPending || !product) {
    return (
      <main className="min-h-screen">
        <Container className="pt-6 pb-16 sm:pb-24 lg:pb-50 flex flex-col gap-10 sm:gap-14 lg:gap-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            <div className="w-full lg:w-105 xl:w-182.5 shrink-0 flex flex-col gap-6">
              <Skeleton className="w-full aspect-730/585 rounded-3xl" />
              <div className="flex gap-3">
                <Skeleton className="flex-1 aspect-square rounded-xl" />
                <Skeleton className="flex-1 aspect-square rounded-xl" />
                <Skeleton className="flex-1 aspect-square rounded-xl" />
                <Skeleton className="flex-1 aspect-square rounded-xl" />
              </div>
            </div>
            <div className="flex flex-col gap-6 flex-1">
              <Skeleton className="w-1/3 h-5 rounded" />
              <div className="flex flex-col gap-8 sm:gap-14 lg:gap-18">
                <div className="flex flex-col gap-5 sm:gap-8">
                  <div className="flex flex-col gap-3">
                    <Skeleton className="w-2/3 h-10 rounded" />
                    <Skeleton className="w-1/4 h-5 rounded" />
                  </div>
                  <Skeleton className="w-full h-24 rounded" />
                </div>
                <Skeleton className="w-1/4 h-12 rounded" />
              </div>
            </div>
          </div>
          <Skeleton className="w-full h-96 rounded-3xl" />
        </Container>
      </main>
    );
  }

  // Dynamic values mapping
  const galleryImages = product?.thumbnail_url ? [product.thumbnail_url] : productImages;
  
  // Use regex to strip HTML for plain text fields, if needed. For descriptions you might want to render HTML instead, but for now we follow the existing format.
  const stripHtml = (html: string) => html ? html.replace(/<[^>]+>/g, '') : "";

  const dynamicSections = [
    {
      title: "Product Description",
      paragraph: stripHtml(product?.description) || "No description provided.",
    },
    ...descriptionSections.slice(1) // Keep remaining mock tabs for visual completeness if needed
  ];

  const dynamicRelated = (product?.related_products || []).map((item: any) => ({
    id: item.id,
    name: item.title,
    category: item.category?.name || "Uncategorized",
    price: parseFloat(item.price || "0"),
    image: item.thumbnail_url || PRODUCT_IMG,
    slug: item.slug,
    barberCertified: false,
  }));

  return (
    <main className="min-h-screen">
      <Container className="pt-6 pb-16 sm:pb-24 lg:pb-50 flex flex-col gap-10 sm:gap-14 lg:gap-20">
        {/* Product Hero: Image Gallery + Info */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <ProductImageGallery
            images={galleryImages}
            productName={product?.title || "Product"}
            barberCertified={false}
          />
          <ProductInfo
            productId={product?.id || ""}
            name={product?.title || "Product Title"}
            category={product?.category?.name || "Uncategorized"}
            image={product?.thumbnail_url || PRODUCT_IMG}
            slug={product?.slug || ""}
            breadcrumb={`Home / Shop / ${product?.title || ""}`}
            rating={5}
            reviewCount="No Reviews"
            description={stripHtml(product?.sort_description)}
            price={parseFloat(product?.price || "0")}
          />
        </div>

        {/* Description / Review Tabs */}
        <ProductDescriptionTabs
          sections={dynamicSections}
          productId={product?.id || ""}
        />

        {/* Related Products */}
        {dynamicRelated.length > 0 ? (
          <RelatedProducts
            title="Related Products"
            products={dynamicRelated}
          />
        ) : (
          <RelatedProducts
            title="Barber Certified Product"
            products={relatedProducts} // Fallback to mock if API returns empty array for demo purposes
          />
        )}
      </Container>
    </main>
  );
};

export default ProductDetailPage;
