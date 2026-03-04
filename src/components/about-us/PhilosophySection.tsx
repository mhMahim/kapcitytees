import Image from "next/image";
import Container from "../shared/Container";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const PHILOSOPHY_IMAGE =
  "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=605&h=480&fit=crop";

const PhilosophySection = () => {
  return (
    <section className="w-full">
      <Container>
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 xl:gap-31.25">
          {/* Left Image */}
          <div className="relative w-full lg:w-151.25 h-56 sm:h-72 lg:h-120 rounded-2xl sm:rounded-[28px] lg:rounded-4xl overflow-hidden shrink-0">
            <Image
              src={PHILOSOPHY_IMAGE}
              alt="Grooming philosophy"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Right Content */}
          <div className="flex flex-col gap-4 sm:gap-6 py-0 lg:py-4 xl:py-8 flex-1">
            <div className="flex flex-col gap-3 sm:gap-4">
              <p className="text-sm sm:text-base font-medium leading-5 sm:leading-6 text-[#DE5D56] uppercase tracking-[3px]">
                OUR PHILOSOPHY
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-8 sm:leading-10 xl:leading-17 text-[#0F2A3C] max-w-full">
                We Help You Look Your Best Every Day
              </h2>
            </div>
            <p className="text-sm sm:text-base lg:text-lg font-normal leading-6 sm:leading-7 lg:leading-8 text-[#3F5563] opacity-80">
              {`You don't have to guess what works for your skin or style. Our grooming products are carefully selected and tested to deliver real results. Every formula is designed by experts using premium, skin-safe ingredients, so you can feel confident, fresh, and in control of your look.`}
            </p>
            <Link
              href="#"
              className="flex items-center gap-2 text-base font-normal leading-6 text-[#1E6FA8] hover:underline w-fit"
            >
              More Info
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PhilosophySection;
