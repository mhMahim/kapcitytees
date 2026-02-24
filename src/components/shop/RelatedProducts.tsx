import ShopProductCard, { ShopProductCardProps } from "./ShopProductCard";

interface RelatedProductsProps {
  title: string;
  products: ShopProductCardProps[];
}

const RelatedProducts = ({ title, products }: RelatedProductsProps) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <h2 className="text-[32px] font-semibold leading-12 text-[#1E1E1E]">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <ShopProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
