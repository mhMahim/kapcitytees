"use client";

import Image from "next/image";
import { Copy, QrCode } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onQrCodeClick: (product: Product) => void;
}

const ProductCard = ({ product, onQrCodeClick }: ProductCardProps) => {
  const handleCopyLink = () => {
    const link = `${window.location.origin}/product/${product.id}`;
    navigator.clipboard.writeText(link);
  };

  return (
    <div className="bg-white flex gap-6 items-end p-4 rounded-2xl shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)] h-55.5">
      {/* Product Image */}
      <div className="h-full aspect-square rounded-lg overflow-hidden shrink-0 bg-[#ededed] relative">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 h-full justify-between pt-2 min-w-0">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <h5 className="text-xl font-medium text-[#454F5B] leading-7.5 truncate">
              {product.name}
            </h5>
            <p className="text-base text-[#637381] leading-6">
              {product.category}
            </p>
          </div>
          <p className="text-[32px] font-semibold text-[#1E6FA8] leading-12">
            {product.price}$
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2.5 w-full">
          <button
            onClick={handleCopyLink}
            className="flex-1 bg-[#E9F1F6] rounded-xl flex items-center justify-center gap-2.5 py-3 px-5 cursor-pointer hover:bg-[#dce8ef] transition-colors"
          >
            <Copy className="size-5 text-[#1E6FA8]" />
            <span className="text-base font-semibold text-[#1E6FA8] leading-6">
              Copy Link
            </span>
          </button>
          <button
            onClick={() => onQrCodeClick(product)}
            className="bg-[#E9F1F6] rounded-xl size-12 shrink-0 flex items-center justify-center p-1 cursor-pointer hover:bg-[#dce8ef] transition-colors"
          >
            <QrCode className="size-6 text-[#1E6FA8]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
export type { Product };
