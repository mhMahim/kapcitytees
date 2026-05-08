"use client";

import type { Swiper as SwiperType } from "swiper";
import Image, { StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import { useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface ProductImageGalleryProps {
  images: (string | StaticImageData | null | undefined)[];
  productName: string;
  barberCertified?: boolean;
}

const ProductImageGallery = ({
  images,
  productName,
  barberCertified = false,
}: ProductImageGalleryProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const validImages = images.filter(Boolean) as (string | StaticImageData)[];
  const hasImages = validImages.length > 0;

  return (
    <div className="flex w-full min-w-0 flex-col gap-4 sm:gap-5 lg:gap-6">
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

        {hasImages ? (
          <Swiper
            style={
              {
                "--swiper-navigation-color": "#1E6FA8",
              } as CSSProperties
            }
            spaceBetween={10}
            navigation
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="h-full w-full"
          >
            {validImages.map((image, index) => (
              <SwiperSlide key={`main-${index}`} className="relative">
                <Image
                  src={image}
                  alt={`${productName} image ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 730px"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="h-full w-full grid place-items-center text-sm text-muted-foreground px-4 text-center">
            No product images available.
          </div>
        )}
      </div>

      {hasImages && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={12}
          freeMode
          watchSlidesProgress
          slidesPerView={4}
          breakpoints={{
            0: { slidesPerView: 3 },
            640: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          modules={[FreeMode, Thumbs]}
          className="w-full"
        >
          {validImages.map((image, index) => (
            <SwiperSlide key={`thumb-${index}`} className="h-auto!">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-[#F4F6F8] border-2 border-transparent transition-colors cursor-pointer [&.swiper-slide-thumb-active]:border-[#1E6FA8]">
                <Image
                  src={image}
                  alt={`${productName} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 120px"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ProductImageGallery;
