import Link from "next/link";
import Container from "../shared/Container";
import DashboardPreview from "./DashboardPreview";

const LandingHeroSection = () => {
  return (
    <section className="relative bg-[#E8F1F8] overflow-hidden">
      <Container className="py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Left content */}
          <div className="flex-1 flex flex-col gap-16 max-w-164.75">
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
                className="bg-[#1E6FA8] text-white font-semibold text-base leading-6 px-7 py-3.5 rounded-xl hover:bg-[#1a6091] transition-colors"
              >
                I&apos;m a Barber
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
          <div className="flex-1 relative lg:max-w-150">
            <DashboardPreview compact className="w-full shadow-2xl" />
          </div>
        </div>
      </Container>

      {/* Bottom gradient bar */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-linear-to-r from-[#E8F1F8] via-[#D0E4F2] to-[#E8F1F8]" />
    </section>
  );
};

export default LandingHeroSection;
