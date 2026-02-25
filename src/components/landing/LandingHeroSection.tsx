import Link from "next/link";
import Container from "../shared/Container";
import DashboardPreview from "@/assets/images/dashboard.png";
import DashboardPreviewOverlay from "@/assets/images/overlays/overlay2.png";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const LandingHeroSection = () => {
  return (
    <section className="px-8">
      <div className="bg-[#ECF2F8] rounded-3xl relative overflow-hidden">
        <Container className="pt-40 lg:pb-65">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
            {/* Left content */}
            <div className="flex-1 flex flex-col gap-16">
              <div className="flex flex-col gap-4">
                <h1 className="text-5xl lg:text-[64px] font-bold leading-tight lg:leading-20 text-[#1E6FA8]">
                  Turn Your Chair Into a Revenue Engine.
                </h1>
                <p className="text-lg font-medium leading-7 text-[#637381]">
                  Barbers earn product margin without holding inventory.
                </p>
              </div>
              <div className="flex gap-4">
                <Link
                  href="/register"
                  className="bg-[#1E6FA8] text-white font-semibold text-base leading-6 px-7 py-3.5 rounded-xl hover:bg-[#1a6091] transition-colors inline-flex items-center gap-2 group"
                >
                  Start Earning Today
                  <ChevronRight className="group-hover:translate-x-1 transition-transform duration-200 -mr-2" />
                </Link>
                <Link
                  href="/register"
                  className="border-2 border-[#689FC5] text-[#1E6FA8] font-semibold text-base leading-6 px-7 py-3.5 rounded-xl hover:bg-[#1E6FA8]/5 transition-colors"
                >
                  I&apos;m a Client
                </Link>
              </div>
            </div>

            {/* Right dashboard preview */}
            <div className="flex-1 relative"></div>
          </div>
        </Container>
        <Image
          src={DashboardPreview}
          alt="Dashboard Preview"
          className="max-w-295 h-auto absolute bottom-0 right-0 translate-x-[30%] translate-y-[25%]"
          width={1180}
          height={850}
        />
        <Image
          src={DashboardPreviewOverlay}
          alt="Dashboard Preview Overlay"
          className="absolute bottom-0 right-0 w-[50%]"
        />
      </div>
    </section>
  );
};

export default LandingHeroSection;
