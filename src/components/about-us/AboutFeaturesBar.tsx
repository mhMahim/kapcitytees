import Container from "../shared/Container";
import type { ComponentType } from "react";

interface FeatureItem {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const FreeShippingIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="64" height="64" rx="12" fill="#1E6FA8" fillOpacity="0.12" />
    <path
      d="M42 30H38V24H22C20.9 24 20 24.9 20 26V38H22C22 39.66 23.34 41 25 41C26.66 41 28 39.66 28 38H36C36 39.66 37.34 41 39 41C40.66 41 42 39.66 42 38H44V34L42 30ZM25 39.5C24.17 39.5 23.5 38.83 23.5 38C23.5 37.17 24.17 36.5 25 36.5C25.83 36.5 26.5 37.17 26.5 38C26.5 38.83 25.83 39.5 25 39.5ZM41.5 31L43.46 34H38V31H41.5ZM39 39.5C38.17 39.5 37.5 38.83 37.5 38C37.5 37.17 38.17 36.5 39 36.5C39.83 36.5 40.5 37.17 40.5 38C40.5 38.83 39.83 39.5 39 39.5Z"
      fill="#1E6FA8"
    />
  </svg>
);

const FlexiblePaymentIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="64" height="64" rx="12" fill="#1E6FA8" fillOpacity="0.12" />
    <path
      d="M42 24H22C20.89 24 20.01 24.89 20.01 26L20 38C20 39.11 20.89 40 22 40H42C43.11 40 44 39.11 44 38V26C44 24.89 43.11 24 42 24ZM42 38H22V32H42V38ZM42 28H22V26H42V28Z"
      fill="#1E6FA8"
    />
  </svg>
);

const Support247Icon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="64" height="64" rx="12" fill="#1E6FA8" fillOpacity="0.12" />
    <path
      d="M32 20C25.37 20 20 25.37 20 32V39C20 40.1 20.9 41 22 41H25V32H21.97C22.46 26.44 26.74 22 32 22C37.26 22 41.54 26.44 42.03 32H39V41H42C43.1 41 44 40.1 44 39V32C44 25.37 38.63 20 32 20Z"
      fill="#1E6FA8"
    />
    <path d="M25 34H23V39H25V34ZM41 34H39V39H41V34Z" fill="#1E6FA8" />
  </svg>
);

const features: FeatureItem[] = [
  {
    icon: FreeShippingIcon,
    title: "Free Shipping",
    description: "Free shipping for order above $180",
  },
  {
    icon: FlexiblePaymentIcon,
    title: "Flexible Payment",
    description: "Multiple secure payment options",
  },
  {
    icon: Support247Icon,
    title: "24x7 Support",
    description: "We support online all days.",
  },
];

const FeatureCard = ({ icon: Icon, title, description }: FeatureItem) => (
  <div className="flex-1 flex items-center gap-5 bg-[#E9F1F6] rounded-2xl p-12">
    <Icon />
    <div className="flex flex-col gap-2">
      <h3 className="text-2xl font-semibold leading-9 text-[#11161C]">
        {title}
      </h3>
      <p className="text-base font-normal leading-6 text-[#637381]">
        {description}
      </p>
    </div>
  </div>
);

const AboutFeaturesBar = () => {
  return (
    <section className="w-full">
      <Container>
        <div className="flex flex-col md:flex-row gap-12">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default AboutFeaturesBar;
