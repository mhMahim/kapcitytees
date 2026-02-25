import Image from "next/image";
import Container from "../shared/Container";
import HeroBgImg from "@/assets/images/hero-bg.jpg";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="w-full px-8">
      <div className="relative h-177 rounded-3xl overflow-hidden">
        <Container className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex flex-col gap-12 items-center justify-center text-center max-w-186.25 px-4">
            <div className="flex flex-col gap-4 items-center">
              <h1 className="text-[64px] font-bold leading-[1.4] text-white">
                Everything You Need to Look Your Best.
              </h1>
              <p className="text-lg font-medium leading-7 text-[#E9F1F6] max-w-140.25">
                From beard care to skincare essentials premium grooming made
                simple for modern men.
              </p>
            </div>
            <Link
              href="/shop"
              className="bg-white rounded-xl px-7 py-3 flex items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <span className="text-base font-semibold text-[#1E6FA8] leading-6">
                Shop Now
              </span>
              <ChevronRight className="w-4 h-4 text-[#1E6FA8]" />
            </Link>
          </div>
        </Container>
        <Image
          src={HeroBgImg}
          alt="Grooming products"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/15" />
      </div>
    </section>
  );
};

export default HeroSection;
