import Link from "next/link";
import Container from "../shared/Container";
import Image from "next/image";
import Gradient1 from "@/assets/images/gradient1.png";
import Gradient2 from "@/assets/images/gradient2.png";

const LandingCTASection = () => {
  return (
    <section className="mb-10 sm:mb-16 lg:mb-30">
      <Container>
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-br from-[#328AC8] to-[#1E6FA8] px-5 py-10 sm:px-8 sm:py-14 lg:p-18 xl:p-24 flex flex-col items-center gap-6 lg:gap-10 xl:gap-12">
          {/* Decorative background shapes */}
          <Image
            src={Gradient1}
            alt="Gradient 1"
            className="absolute top-0 left-0 opacity-0 lg:opacity-30 xl:opacity-100"
          />
          <Image
            src={Gradient2}
            alt="Gradient 2"
            className="absolute bottom-0 right-0 opacity-70 lg:opacity-100"
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-2 sm:gap-3 text-center">
            <h2 className="text-[26px] sm:text-4xl lg:text-5xl font-bold leading-tight lg:leading-17 text-white">
              Apply To Become Certified
            </h2>
            <p className="text-sm sm:text-base lg:text-lg font-medium leading-6 sm:leading-7 text-[#E9F1F6]">
              Join thousands of barbers already earning passive income with
              BarberCertified.
            </p>
          </div>

          <Link
            href="/register?type=barber"
            className="relative z-10 bg-white text-[#1E6FA8] font-semibold text-sm sm:text-base leading-6 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl hover:bg-[#F4F6F8] hover:scale-102 transition-all duration-100"
          >
            Apply Now
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default LandingCTASection;
