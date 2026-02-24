import Image from "next/image";
import Container from "../shared/Container";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const BARBER_MAIN =
  "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=424&h=462&fit=crop";
const BARBER_SMALL_1 =
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=169&h=243&fit=crop";
const BARBER_SMALL_2 =
  "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=169&h=243&fit=crop";

const BarberCertifiedSection = () => {
  return (
    <section className="w-full">
      <Container>
        <div className="flex flex-col lg:flex-row items-start gap-0">
          {/* Left Content */}
          <div className="flex flex-col gap-6 py-8 flex-1 max-w-171.75">
            <div className="flex flex-col gap-4">
              <p className="text-base font-medium leading-6 text-[#DE5D56] uppercase tracking-[3px]">
                BARBER CERTIFIED
              </p>
              <h2 className="text-5xl font-bold leading-17 text-[#0F2A3C] max-w-161.25">
                Tested by Barbers
                <span className="text-[#3F5563]">.</span> Trusted by Men
                <span className="text-[#3F5563]">.</span>
              </h2>
            </div>
            <p className="text-lg font-normal leading-8 text-[#3F5563] opacity-80">
              Our products are developed and approved by professional barbers
              who know men&apos;s grooming best. Every formula is tested in real
              barbershops to ensure performance, safety, and long-lasting
              results. If it doesn&apos;t meet a barber&apos;s standard, it
              doesn&apos;t make it to your shelf.
            </p>
            <Link
              href="#"
              className="flex items-center gap-2 text-base font-normal leading-6 text-[#1E6FA8] hover:underline w-fit"
            >
              More Info
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right Image Composition */}
          <div className="relative w-full lg:w-151.25 h-120 shrink-0">
            {/* Main center image */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-106 h-115.5 rounded-4xl overflow-hidden">
              <Image
                src={BARBER_MAIN}
                alt="Barber at work"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            {/* Small left image */}
            <div className="absolute -left-5 -bottom-5 w-42.25 h-60.75 rounded-2xl overflow-hidden border-16 border-[#F9FAFB]">
              <Image
                src={BARBER_SMALL_1}
                alt="Grooming detail"
                fill
                className="object-cover rounded-xl"
                unoptimized
              />
            </div>
            {/* Small right image */}
            <div className="absolute -right-5 -top-5 w-42.25 h-60.75">
              <Image
                src={BARBER_SMALL_2}
                alt="Barber tools"
                fill
                className="border-16 border-[#F9FAFB] rounded-3xl"
                unoptimized
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BarberCertifiedSection;
