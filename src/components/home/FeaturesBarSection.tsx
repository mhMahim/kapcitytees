import {
  PremiumQualityIcon,
  BarberApprovedIcon,
  SkinSafeIcon,
  FastDeliveryIcon,
} from "@/assets/icons";
import Container from "../shared/Container";
import type { ComponentType } from "react";

interface FeatureItem {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    icon: PremiumQualityIcon,
    title: "Premium Quality",
    description:
      "High-performance grooming products made with safe ingredients.",
  },
  {
    icon: BarberApprovedIcon,
    title: "Barber Approved",
    description:
      "Tested and trusted by professional barbers for real results.",
  },
  {
    icon: SkinSafeIcon,
    title: "Skin-Safe Formulas",
    description:
      "No harsh chemicals. Gentle on skin, powerful in performance.",
  },
  {
    icon: FastDeliveryIcon,
    title: "Fast Delivery",
    description: "Quick, reliable shipping straight to your door.",
  },
];

const FeatureCard = ({ icon: Icon, title, description }: FeatureItem) => (
  <div className="flex-1 flex flex-col gap-5 items-center bg-[#F4F6F8] rounded-2xl p-8 min-w-0">
    <div className="flex items-center justify-center p-3 rounded-[10px] w-14 h-14 shadow-[0px_0px_11px_0px_rgba(183,231,255,0.08)]">
      <Icon />
    </div>
    <div className="flex flex-col gap-3 items-center text-center w-full">
      <h3 className="text-2xl font-semibold leading-9 text-[#0F2A3C]">
        {title}
      </h3>
      <p className="text-base font-normal leading-6 text-[#3F5563]">
        {description}
      </p>
    </div>
  </div>
);

const FeaturesBarSection = () => {
  return (
    <section className="w-full">
      <Container>
        <div className="bg-[#F4F6F8] rounded-3xl px-16 py-4 flex gap-10 items-center">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturesBarSection;
