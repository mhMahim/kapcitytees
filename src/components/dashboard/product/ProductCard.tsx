"use client";

import Image from "next/image";
import { Copy, Loader2, QrCode } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onCopyLinkClick: (product: Product) => void;
  onQrCodeClick: (product: Product) => void;
  isCopyPending?: boolean;
  isQrPending?: boolean;
}

const ProductCard = ({
  product,
  onCopyLinkClick,
  onQrCodeClick,
  isCopyPending = false,
  isQrPending = false,
}: ProductCardProps) => {

  return (
    <div className="bg-white flex flex-col sm:flex-row gap-3 sm:gap-4 2xl:gap-6 sm:items-end p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)] sm:h-44 lg:h-48 2xl:h-55.5">
      {/* Product Image */}
      <div className="h-44 sm:h-full w-full sm:w-auto aspect-video sm:aspect-square rounded-lg overflow-hidden shrink-0 bg-[#ededed] relative">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 sm:h-full justify-between pt-1 sm:pt-2 min-w-0 gap-3 sm:gap-0">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <h5 className="text-base sm:text-lg 2xl:text-xl font-medium text-[#454F5B] leading-6 sm:leading-7 2xl:leading-7.5 truncate">
              {product.name}
            </h5>
            <p className="text-base text-[#637381] leading-6">
              {product.category}
            </p>
          </div>
          <p className="text-xl sm:text-2xl 2xl:text-[32px] font-semibold text-[#1E6FA8] leading-8 sm:leading-10 2xl:leading-12">
            {product.price}$
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2.5 w-full">
          <button
            type="button"
            onClick={() => onCopyLinkClick(product)}
            disabled={isCopyPending}
            className="flex-1 bg-[#E9F1F6] rounded-lg sm:rounded-xl flex items-center justify-center gap-2 sm:gap-2.5 py-2.5 sm:py-3 px-3 sm:px-5 cursor-pointer hover:bg-[#dce8ef] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isCopyPending ? (
              <Loader2 className="size-5 text-[#1E6FA8] animate-spin" />
            ) : (
              <Copy className="size-5 text-[#1E6FA8]" />
            )}
            <span className="text-sm sm:text-base font-semibold text-[#1E6FA8] leading-5 sm:leading-6">
              {isCopyPending ? "Copying..." : "Copy Link"}
            </span>
          </button>
          <button
            type="button"
            onClick={() => onQrCodeClick(product)}
            disabled={isQrPending}
            className="bg-[#E9F1F6] rounded-lg sm:rounded-xl size-10 sm:size-12 shrink-0 flex items-center justify-center p-1 cursor-pointer hover:bg-[#dce8ef] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isQrPending ? (
              <Loader2 className="size-6 text-[#1E6FA8] animate-spin" />
            ) : (
              <QrCode className="size-6 text-[#1E6FA8]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
export type { Product };
