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
    <section className="pt-10 pb-20 lg:pb-30">
      <Container>
        <div className="flex flex-col lg:flex-row gap-12 items-center relative">
          {/* Decorative blurred shapes */}
          <div className="hidden lg:block absolute right-20 -top-10 w-156 h-65 bg-[#E9F1F6] opacity-80 rounded-[37px] -z-10" />
          <div className="hidden lg:block absolute -right-10 -bottom-10 w-136 h-65 bg-[#E9F1F6] opacity-80 rounded-[37px] -z-10" />

          {/* Left content */}
          <div className="flex flex-col gap-8 py-6 lg:py-12 max-w-170 shrink-0">
            <h2 className="text-3xl lg:text-5xl font-bold leading-tight lg:leading-17 text-[#0F2A3C]">
              Eligibility Requirements{"\n"}Professional Barbers Only
            </h2>

            <div className="flex flex-col gap-4">
              {requirements.map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <Image
                    src="/images/landing/checkmark.svg"
                    alt=""
                    width={32}
                    height={32}
                    className="shrink-0"
                  />
                  <p className="text-lg lg:text-xl font-medium leading-7.5 text-[#637381]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="flex-1 relative aspect-5/3 min-h-60 lg:min-h-110 rounded-2xl overflow-hidden">
            <Image
              src="https://i.ibb.co.com/XxjkKRPS/Frame-48095401.png"
              alt="Professional barber handshake"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default EligibilitySection;
