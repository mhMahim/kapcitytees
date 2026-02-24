"use client";

import FAQPage from "@/screens/public/FAQPage";
import Image from "next/image";

const page = () => {
  return (
    <>
      <FAQPage />
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="customCardShape" clipPathUnits="objectBoundingBox">
            <path d="M0.785,0.361 C0.785,0.378 0.785,0.395 0.786,0.408 C0.788,0.422 0.791,0.438 0.799,0.453 C0.811,0.474 0.830,0.492 0.854,0.503 C0.869,0.510 0.891,0.515 0.910,0.515 C0.923,0.515 0.930,0.515 0.935,0.516 C0.968,0.520 0.994,0.544 0.999,0.574 C1.000,0.579 1.000,0.585 1.000,0.597 L1.000,0.889 C1.000,0.928 1.000,0.947 0.992,0.962 C0.985,0.975 0.973,0.986 0.959,0.992 C0.943,1.000 0.922,1.000 0.879,1.000 L0.226,1.000 C0.203,1.000 0.184,0.982 0.184,0.961 L0.184,0.604 C0.184,0.589 0.184,0.575 0.183,0.564 C0.182,0.551 0.179,0.538 0.170,0.526 C0.158,0.507 0.139,0.492 0.116,0.483 C0.099,0.476 0.081,0.472 0.059,0.472 C0.026,0.472 0.000,0.448 0.000,0.418 L0.000,0.111 C0.000,0.072 0.000,0.053 0.008,0.038 C0.015,0.025 0.027,0.014 0.041,0.008 C0.057,0.000 0.078,0.000 0.121,0.000 L0.664,0.000 C0.707,0.000 0.728,0.000 0.744,0.008 C0.758,0.014 0.770,0.025 0.777,0.038 C0.785,0.053 0.785,0.072 0.785,0.111 L0.785,0.361 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Responsive Card */}
      <figure
        className="relative w-400 aspect-424/462 overflow-hidden"
        style={{
          clipPath: "url(#customCardShape)",
        }}
      >
        <Image
          src="https://i.ibb.co/XxRVQ8nJ/home-banner.png"
          alt="Banner"
          className="w-full h-full object-cover"
          width={424}
          height={462}
          unoptimized
        />
        {/* <img
          src="https://i.ibb.co/XxRVQ8nJ/home-banner.png"
          alt="Banner"
          className="w-full h-full object-cover"
        /> */}
      </figure>
    </>
  );
};

export default page;
