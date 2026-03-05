import Image from "next/image";
import Container from "@/components/shared/Container";

const requirements = [
  "Established Business",
  "Professional Shop Environment",
  "Client-First Mentality",
  "Motivated to Increase Earnings",
];

const EligibilitySection = () => {
  return (
    <section className="pt-6 sm:pt-10 pb-10 sm:pb-16 lg:pb-30">
      <Container>
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-12 lg:items-center">
          {/* Left content */}
          <div className="flex flex-col gap-5 sm:gap-6 lg:gap-8 py-0 lg:py-12 max-w-full lg:max-w-170 flex-1">
            <h2 className="text-2xl sm:text-[28px] lg:text-4xl xl:text-5xl font-bold leading-tight lg:leading-17 text-[#0F2A3C]">
              Eligibility Requirements{"\n"}Professional Barbers Only
            </h2>

            <div className="flex flex-col gap-3 sm:gap-4">
              {requirements.map((item) => (
                <div key={item} className="flex items-center gap-2 sm:gap-2.5">
                  <Image
                    src="/images/landing/checkmark.svg"
                    alt=""
                    width={32}
                    height={32}
                    className="size-6 sm:size-8 shrink-0"
                  />
                  <p className="text-base sm:text-lg lg:text-xl font-medium leading-6 sm:leading-7.5 text-[#637381]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="relative flex-1">
            <div className="w-full relative aspect-5/3 min-h-52 lg:min-h-auto rounded-2xl overflow-hidden">
              <Image
                src="https://i.ibb.co.com/XxjkKRPS/Frame-48095401.png"
                alt="Professional barber handshake"
                fill
                className="object-cover"
              />
            </div>
            <div className="hidden xl:block absolute left-1/2 -translate-x-1/2 -top-10 w-156 h-65 bg-[#E9F1F6] opacity-80 rounded-[37px] -z-10" />
            <div className="hidden xl:block absolute -right-10 -bottom-10 w-136 h-65 bg-[#E9F1F6] opacity-80 rounded-[37px] -z-10" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default EligibilitySection;
