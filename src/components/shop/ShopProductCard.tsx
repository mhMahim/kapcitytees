"use client";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

export interface ShopProductCardProps {
  id: string | number;
  name: string;
  category: string;
  price: number;
  image: string | StaticImageData;
  slug?: string;
  barberCertified?: boolean;
}

const ShopProductCard = ({
  id,
  name,
  category,
  price,
  image,
  slug,
  barberCertified = false,
}: ShopProductCardProps) => {
  return (
    <Link
      href={`/product/${slug ?? id}`}
      className="bg-white rounded-[20px] shadow-[0px_4px_20px_0px_rgba(145,158,171,0.08)] p-3 flex flex-col gap-1 relative"
    >
      {/* Barber Certified Badge */}
      {barberCertified && (
        <div className="absolute top-6 right-6 z-10 w-11 h-12">
          <Image
            src="https://i.ibb.co.com/twtcsf1r/YPnixy-Qc3eo-Ln-Eg-Jd-Vbl-image-2.png"
            alt="Barber Certified"
            width={44}
            height={48}
          />
        </div>
      )}

      {/* Product Image */}
      <div className="block w-full h-73.25 relative rounded-lg overflow-hidden bg-[#F4F6F8]">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-6 p-3 w-full">
        <div className="flex flex-col gap-1">
          <span className="text-base text-[#919EAB] font-normal">
            {category}
          </span>
          <h3 className="text-2xl font-semibold text-[#0F2A3C] leading-9">
            {name}
          </h3>
        </div>

        <div className="flex items-center justify-between w-full">
          <span className="text-[32px] font-semibold text-[#1E6FA8] leading-12">
            ${price}
          </span>
          <button
            aria-label={`Add ${name} to cart`}
            onClick={(e) => {
              e.preventDefault(); // Prevent default button behavior
            }}
            className="w-12 h-12 bg-[#1E6FA8] rounded-full flex items-center justify-center hover:bg-[#1A5F92] transition-colors cursor-pointer"
          >
            <Plus className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ShopProductCard;
