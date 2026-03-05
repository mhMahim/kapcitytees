import ShopProductCard, { ShopProductCardProps } from "./ShopProductCard";

interface RelatedProductsProps {
  title: string;
  products: ShopProductCardProps[];
}

const RelatedProducts = ({ title, products }: RelatedProductsProps) => {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 w-full">
      <h2 className="text-xl sm:text-2xl lg:text-[32px] font-semibold leading-tight sm:leading-9 lg:leading-12 text-[#1E1E1E]">
        {title}
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        {products.map((product) => (
          <ShopProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
