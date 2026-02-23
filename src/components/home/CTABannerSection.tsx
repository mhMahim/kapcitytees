import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Container from "../shared/Container";
import Image from "next/image";
import Gradient1 from "@/assets/images/gradient1.png";
import Gradient2 from "@/assets/images/gradient2.png";

const CTABannerSection = () => {
  return (
    <section className="w-full">
      <Container>
        <div className="relative w-full rounded-3xl overflow-hidden bg-[radial-gradient(171.85%_139.66%_at_100%_100%,#328AC8_0%,#1E6FA8_100%)] px-20 py-20 flex items-end justify-between gap-12">
          <Image
            src={Gradient1}
            alt="Gradient 1"
            className="absolute top-0 left-0"
          />
          <Image
            src={Gradient2}
            alt="Gradient 2"
            className="absolute bottom-0 right-0"
          />

          {/* Content */}
          <div className="flex-1 flex flex-col gap-3 relative z-10">
            <h2 className="text-5xl font-bold leading-17 text-white max-w-242.5">
              Grooming Essentials. Proven by Barbers. Certified for You.
            </h2>
            <p className="text-lg font-medium leading-7 text-[#E9F1F6] max-w-165">
              Shop the best in beard care, hairstyling, skincare, and shaving,
              all tested and recommended by professional barbers.
            </p>
          </div>

          {/* CTA Button */}
          <Link
            href="/shop"
            className="bg-white rounded-xl px-7 py-3 flex items-center gap-2 shadow-[0px_4px_16px_0px_rgba(27,101,153,0.4)] hover:bg-gray-50 transition-colors shrink-0 relative z-10"
          >
            <span className="text-base font-semibold text-[#1E6FA8] leading-6">
              Browse Products
            </span>
            <ChevronRight className="w-4 h-4 text-[#1E6FA8]" />
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default CTABannerSection;
