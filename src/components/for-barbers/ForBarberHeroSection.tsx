import Link from "next/link";
import Container from "@/components/shared/Container";

const ForBarberHeroSection = () => {
  return (
    <section className="px-4 sm:px-5 lg:px-8">
      <div className="bg-[#ECF2F8] rounded-3xl overflow-hidden">
        <Container className="py-24 lg:py-45">
          <div className="flex flex-col items-center gap-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-4xl lg:text-[64px] font-bold leading-tight lg:leading-20 text-[#1E6FA8]">
                Here&apos;s How Barbers Join the Network
              </h1>
              <p className="text-lg lg:text-xl font-medium leading-7 lg:leading-7.5 text-[#637381] max-w-200">
                Gain access to verified products, exclusive marketing tools, and
                reliable earnings, no inventory risk ever
              </p>
            </div>
            <Link
              href="/register?type=barber"
              className="bg-[#1E6FA8] text-white font-semibold text-base leading-6 px-7 py-3.5 rounded-xl hover:bg-[#1B6599] transition-colors"
            >
              Apply Now
            </Link>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default ForBarberHeroSection;
