import Link from "next/link";
import Container from "../shared/Container";
import DashboardPreview from "@/assets/images/dashboard.png";
import DashboardPreviewOverlay from "@/assets/images/overlays/overlay2.png";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const LandingHeroSection = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="bg-[#ECF2F8] rounded-2xl sm:rounded-3xl relative overflow-hidden">
        <Container className="pt-12 sm:pt-20 lg:pt-28 xl:pt-36 2xl:pt-40 pb-8 sm:pb-14 lg:pb-36 xl:pb-48 2xl:pb-65">
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-12">
            {/* Left content */}
            <div className="flex flex-col gap-8 sm:gap-10 xl:gap-16 lg:flex-1 max-w-167.5">
              <div className="flex flex-col gap-3 sm:gap-4">
                <h1 className="text-[28px] sm:text-4xl xl:text-5xl 2xl:text-[64px] font-bold leading-tight sm:leading-snug 2xl:leading-20 text-[#1E6FA8]">
                  Turn Your Chair Into a Revenue Engine.
                </h1>
                <p className="text-base sm:text-lg font-medium leading-6 sm:leading-7 text-[#637381]">
                  Barbers earn product margin without holding inventory.
                </p>
              </div>
              <div className="flex gap-3 sm:gap-4 flex-wrap">
                <Link
                  href="/register"
                  className="bg-[#1E6FA8] text-white font-semibold text-sm sm:text-base leading-6 px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl hover:bg-[#1a6091] transition-colors inline-flex items-center gap-2 group"
                >
                  Start Earning Today
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-200 -mr-1 sm:-mr-2" />
                </Link>
                <Link
                  href="/register"
                  className="border-2 border-[#689FC5] text-[#1E6FA8] font-semibold text-sm sm:text-base leading-6 px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl hover:bg-[#1E6FA8]/5 transition-colors"
                >
                  I&apos;m a Client
                </Link>
              </div>
            </div>

            {/* Mobile / tablet image — inline, hidden on lg+ where absolute image takes over */}
            <div className="relative lg:hidden w-full rounded-xl sm:rounded-2xl overflow-hidden aspect-16/10 sm:aspect-video">
              <Image
                src={DashboardPreview}
                alt="Dashboard Preview"
                fill
                className="object-cover object-top-left"
                sizes="(max-width: 1024px) 100vw"
                priority
              />
            </div>

            {/* Right spacer — desktop only, reserves room for absolute image */}
            <div className="hidden lg:block lg:flex-1 relative" />
          </div>
        </Container>

        {/* Desktop absolute images — hidden on mobile/tablet */}
        <Image
          src={DashboardPreview}
          alt="Dashboard Preview"
          className="hidden lg:block lg:max-w-180 xl:max-w-220 2xl:max-w-295 h-auto absolute bottom-0 right-0 translate-x-[30%] translate-y-[25%]"
          width={1180}
          height={850}
        />
        <Image
          src={DashboardPreviewOverlay}
          alt="Dashboard Preview Overlay"
          className="hidden lg:block absolute bottom-0 right-0 w-[50%]"
        />
      </div>
    </section>
  );
};

export default LandingHeroSection;
