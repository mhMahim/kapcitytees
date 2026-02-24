"use client";

import Image, { StaticImageData } from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

export interface CartItemData {
  id: string | number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string | StaticImageData;
}

interface CartItemProps extends CartItemData {
  onIncrement: (id: string | number) => void;
  onDecrement: (id: string | number) => void;
  onRemove: (id: string | number) => void;
}

const CartItem = ({
  id,
  name,
  category,
  price,
  quantity,
  image,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemProps) => {
  return (
    <div className="bg-white flex items-center justify-between pl-4 pr-6 py-4 rounded-[20px] shadow-[0px_4px_20px_0px_rgba(145,158,171,0.08)] w-full">
      {/* Product info */}
      <div className="flex gap-5 items-center w-65">
        <div className="relative size-20 shrink-0 rounded-xl overflow-hidden bg-[#F4F6F8]">
          <Image src={image} alt={name} fill className="object-cover" unoptimized />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-semibold leading-9 text-[#0F2A3C]">{name}</p>
          <p className="text-base font-normal leading-6 text-[#5E707C]">{category}</p>
        </div>
      </div>

      {/* Quantity controls */}
      <div className="flex gap-6 items-center">
        <button
          onClick={() => onDecrement(id)}
          className="size-12 rounded-full bg-[#E9F1F6] flex items-center justify-center hover:bg-[#D5E5F0] transition-colors shrink-0"
          aria-label="Decrease quantity"
        >
          <Minus className="w-5 h-5 text-[#0F2A3C]" />
        </button>
        <span className="text-2xl font-semibold leading-9 text-[#37404A] min-w-6 text-center">
          {quantity}
        </span>
        <button
          onClick={() => onIncrement(id)}
          className="size-12 rounded-full bg-[#1E6FA8] flex items-center justify-center hover:bg-[#1A5F92] transition-colors shrink-0"
          aria-label="Increase quantity"
        >
          <Plus className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Price + Remove */}
      <div className="flex gap-8 items-center">
        <p className="text-2xl font-semibold leading-9 text-[#1E6FA8]">
          $ {price.toFixed(2)}
        </p>
        <button
          onClick={() => onRemove(id)}
          className="size-6 flex items-center justify-center text-[#DE5D56] hover:text-[#c04940] transition-colors"
          aria-label={`Remove ${name} from cart`}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
