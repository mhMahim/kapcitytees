"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";

interface ProductImageGalleryProps {
  images: (string | StaticImageData)[];
  productName: string;
  barberCertified?: boolean;
}

const ProductImageGallery = ({
  images,
  productName,
  barberCertified = false,
}: ProductImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex flex-col gap-6 w-full lg:w-[420px] xl:w-182.5 shrink-0">
      {/* Main Image */}
      <div className="relative w-full aspect-730/585 rounded-3xl overflow-hidden bg-[#F4F6F8]">
        {barberCertified && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-6 lg:right-6 z-10 w-10 h-11 sm:w-12 sm:h-13 lg:w-14 lg:h-15.5">
            <Image
              src="https://i.ibb.co.com/twtcsf1r/YPnixy-Qc3eo-Ln-Eg-Jd-Vbl-image-2.png"
              alt="Barber Certified"
              width={56}
              height={62}
              className="object-contain"
            />
          </div>
        )}
        <Image
          src={images[selectedIndex]}
          alt={productName}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnail Strip */}
      {/* <div className="flex gap-3 w-full">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`relative flex-1 aspect-square rounded-xl overflow-hidden bg-[#F4F6F8] border-2 transition-colors ${
              selectedIndex === index
                ? "border-[#1E6FA8]"
                : "border-transparent"
            }`}
          >
            <Image
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div> */}
    </div>
  );
};

export default ProductImageGallery;
