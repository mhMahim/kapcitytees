import Image from "next/image";
import Container from "../shared/Container";

const MISSION_IMAGE =
  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=730&h=724&fit=crop";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ProGradeIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="64" height="64" rx="12" fill="#E9F1F6" />
    <path
      d="M32 18C28.134 18 25 21.134 25 25V28H22V46H42V28H39V25C39 21.134 35.866 18 32 18ZM28 25C28 22.791 29.791 21 32 21C34.209 21 36 22.791 36 25V28H28V25ZM39 43H25V31H39V43Z"
      fill="#1E6FA8"
    />
  </svg>
);

const ElitePerformanceIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="64" height="64" rx="12" fill="#E9F1F6" />
    <path
      d="M44 24L32 18L20 24V34C20 40.627 25.148 46.752 32 48C38.852 46.752 44 40.627 44 34V24ZM32 44C27.2 42.8 23 37.8 23 34V26L32 21.5L41 26V34C41 37.8 36.8 42.8 32 44Z"
      fill="#1E6FA8"
    />
    <path d="M29 33L31 35L36 30L34.5 28.5L31 32L30.5 31.5L29 33Z" fill="#1E6FA8" />
  </svg>
);

const FeatureItem = ({ icon, title, description }: FeatureProps) => (
  <div className="flex-1 flex flex-col items-start gap-5">
    {icon}
    <div className="flex flex-col gap-3">
      <h4 className="text-2xl font-semibold leading-9 text-[#0F2A3C]">
        {title}
      </h4>
      <p className="text-base font-normal leading-6 text-[#637381]">
        {description}
      </p>
    </div>
  </div>
);

const MissionSection = () => {
  return (
    <section className="w-full">
      <Container>
        <div className="flex flex-col lg:flex-row items-stretch gap-0 relative">
          {/* Left Content Card */}
          <div className="flex-1 bg-[rgba(231,234,236,0.4)] rounded-[32px] p-10 flex flex-col justify-between min-h-181">
            <div className="flex flex-col gap-4 max-w-148.75">
              <p className="text-base font-medium leading-6 text-[#DE5D56] uppercase tracking-[3px]">
                OUR COMMITMENT
              </p>
              <div className="flex flex-col gap-6">
                <h2 className="text-5xl font-bold leading-16 text-[#0F2A3C]">
                  Setting the Standard for Professional Grooming
                </h2>
                <p className="text-base font-normal leading-6 text-[#5E707C]">
                  We curate only the highest-grade tools and formulas used by
                  elite barbers worldwide. Elevate your daily routine with
                  products designed for precision, performance, and style.
                </p>
              </div>
            </div>

            <div className="flex gap-16 max-w-159.25">
              <FeatureItem
                icon={<ProGradeIcon />}
                title="Pro-Grade Tools"
                description="Engineered for maximum precision and durability to give you that shop-fresh look at home."
              />
              <FeatureItem
                icon={<ElitePerformanceIcon />}
                title="Elite Performance"
                description="Designed with comfort in mind for effortless styling and perfect lining every single time."
              />
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full lg:w-182.5 h-181 rounded-[32px] overflow-hidden lg:-ml-40.25">
            <Image
              src={MISSION_IMAGE}
              alt="Professional grooming standard"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MissionSection;
