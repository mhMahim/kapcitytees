"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { StarFilledIcon, StarEmptyIcon } from "@/assets/icons";
import Link from "next/link";

interface ProductInfoProps {
  name: string;
  category: string;
  breadcrumb: string;
  rating: number;
  reviewCount: string;
  description: string;
  price: number;
}

const ProductInfo = ({
  name,
  category,
  breadcrumb,
  rating,
  reviewCount,
  description,
  price,
}: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex flex-col gap-6 flex-1">
      {/* Breadcrumb */}
      <p className="text-sm sm:text-base font-normal leading-6 text-[#919EAB]">
        {breadcrumb}
      </p>

      <div className="flex flex-col gap-8 sm:gap-14 lg:gap-18">
        {/* Product Details */}
          <div className="flex flex-col gap-5 sm:gap-8">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-semibold text-[#0F2A3C] tracking-[-0.8px]">
              {name}
            </h1>
            <div className="flex flex-col gap-4">
              <p className="text-xs sm:text-sm lg:text-base font-normal leading-6 text-[#5E707C]">
                Category: {category}
              </p>
              <div className="flex gap-3 sm:gap-6 items-center">
                {/* Star Rating */}
                <div className="flex gap-1 items-center">
                  {Array.from({ length: 5 }).map((_, i) =>
                    i < rating ? (
                      <StarFilledIcon key={i} className="w-4.5 h-4.5" />
                    ) : (
                      <StarEmptyIcon key={i} className="w-4.5 h-4.5" />
                    )
                  )}
                </div>
                <p className="text-sm sm:text-base font-normal leading-6 text-[#5E707C]">
                  ({reviewCount})
                </p>
              </div>
            </div>
          </div>
          <p className="text-sm sm:text-base font-normal leading-6 text-[#5E707C]">
            {description}
          </p>
        </div>

        {/* Price & Actions */}
        <div className="flex flex-col gap-6 sm:gap-10 lg:gap-12">
          <p className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight sm:leading-12 lg:leading-16 text-[#1E6FA8]">
            $ {price.toFixed(2)}
          </p>

          <div className="flex gap-4 sm:gap-8 lg:gap-16 items-center flex-wrap">
            {/* Quantity Selector */}
            <div className="flex gap-3 sm:gap-4 lg:gap-6 items-center">
              <button
                onClick={handleDecrement}
                className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-[#E9F1F6] flex items-center justify-center hover:bg-[#D5E5F0] transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-[#0F2A3C]" />
              </button>
              <span className="text-lg sm:text-xl lg:text-2xl font-semibold leading-7 lg:leading-9 text-[#37404A] min-w-8 sm:min-w-10 text-center">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-[#1E6FA8] flex items-center justify-center hover:bg-[#1A5F92] transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 sm:gap-4 items-center flex-wrap">
              <button className="h-11 sm:h-12 lg:h-13 px-5 sm:px-10 lg:px-15 py-3 bg-[#1E6FA8] rounded-xl text-white text-sm sm:text-base font-semibold leading-6 hover:bg-[#1A5F92] transition-colors cursor-pointer">
                Add to Cart
              </button>
              <Link
                href="/cart"
                className="h-11 sm:h-12 lg:h-13 lg:w-52.5 px-5 sm:px-8 lg:px-0 flex items-center justify-center py-3 bg-[#E9F1F6] rounded-xl text-[#1E6FA8] text-sm sm:text-base font-semibold leading-6 hover:bg-[#D5E5F0] transition-colors"
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
