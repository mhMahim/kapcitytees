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

const ProductDetailPage = () => {
  return (
    <main className="min-h-screen">
      <Container className="pt-6 pb-50 flex flex-col gap-20">
        {/* Product Hero: Image Gallery + Info */}
        <div className="flex flex-col lg:flex-row gap-16">
          <ProductImageGallery
            images={productImages}
            productName="Beard Oil"
            barberCertified
          />
          <ProductInfo
            name="Beard Oil"
            category="Beard"
            breadcrumb="Home / Shop / Beard Oil"
            rating={4}
            reviewCount="100+ Review"
            description="Stop the itch and start the growth. Our barber-certified formula uses organic Argan and Jojoba oils to soften coarse whiskers while hydrating the skin underneath. Design for daily use to leave your beard smelling like fresh cedar and looking shop-fresh."
            price={49.99}
          />
        </div>

        {/* Description / Review Tabs */}
        <ProductDescriptionTabs sections={descriptionSections} />

        {/* Related Products */}
        <RelatedProducts
          title="Barber Certified Product"
          products={relatedProducts}
        />
      </Container>
    </main>
  );
};

export default ProductDetailPage;
