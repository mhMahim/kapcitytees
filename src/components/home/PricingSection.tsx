import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  highlighted?: boolean;
}

const PricingCard = ({ tier }: { tier: PricingTier }) => {
  return (
    <div
      className={`flex-1 flex flex-col justify-between p-8 rounded-3xl border border-solid transition-all ${
        tier.highlighted
          ? "bg-[#0066FF] border-[#0066FF] shadow-[0px_4px_16px_0px_rgba(51,133,255,0.48)] h-159"
          : "bg-[#F4F6F8] border-[#DFE3E8] h-149.5"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col gap-4">
        <h3
          className={`text-lg font-medium leading-7 ${
            tier.highlighted ? "text-[#E6F0FF]" : "text-[#212B36]"
          }`}
        >
          {tier.name}
        </h3>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-end">
            <h2
              className={`text-[64px] font-bold leading-20 ${
                tier.highlighted ? "text-white" : "text-[#212B36]"
              }`}
            >
              {tier.price}
            </h2>
            <p
              className={`text-base leading-6 ${
                tier.highlighted ? "text-[#B0D0FF]" : "text-[#333B42]"
              }`}
            >
              / month
            </p>
          </div>
          <p
            className={`text-base leading-6 ${
              tier.highlighted ? "text-[#E6F0FF]" : "text-[#333B42]"
            }`}
          >
            {tier.description}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#DFE3E8] opacity-20" />

      {/* Features */}
      <div className="flex flex-col gap-5">
        {tier.features.map((feature, index) => (
          <div key={index} className="flex gap-3 items-center">
            <CheckCircle2
              className={`w-5 h-5 shrink-0 ${
                tier.highlighted ? "text-white" : "text-[#0066FF]"
              }`}
              fill={tier.highlighted ? "white" : "#0066FF"}
            />
            <p
              className={`text-base font-semibold leading-6 ${
                tier.highlighted ? "text-white" : "text-[#454F5B]"
              }`}
            >
              {feature}
            </p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <Link
        href="#"
        className="flex items-center justify-between w-full px-6 py-2 rounded-full border border-solid border-white backdrop-blur-sm hover:bg-white/10 transition-all group"
      >
        <span className="text-[15px] font-semibold leading-6.5 text-white">
          {tier.buttonText}
        </span>
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
          <ArrowUpRight className="w-6 h-6 text-[#212B36]" />
        </div>
      </Link>
    </div>
  );
};

const PricingSection = () => {
  const pricingTiers: PricingTier[] = [
    {
      name: "Personal",
      price: "$19",
      description: "All the basic features to boost your freelance career",
      features: [
        "Full Access to Landingfolio",
        "10 GB Free Storage",
        "Unlimited Visitors",
        "10 Agents",
        "Live Chat Support",
      ],
      buttonText: "Register Now",
    },
    {
      name: "Professional",
      price: "$49",
      description: "All the basic features to boost your freelance career",
      features: [
        "Full Access to Landingfolio",
        "50 GB Free Storage",
        "Unlimited Visitors",
        "10 Agents",
        "Live Chat Support",
      ],
      buttonText: "Get 14 Days Free Trial",
      highlighted: true,
    },
    {
      name: "Business",
      price: "$99",
      description: "All the basic features to boost your freelance career",
      features: [
        "Full Access to Landingfolio",
        "100 GB Free Storage",
        "Unlimited Visitors",
        "10 Agents",
        "Live Chat Support",
      ],
      buttonText: "Get 14 Days Free Trial",
    },
  ];

  return (
    <div className="flex flex-col gap-12 items-center w-full max-w-300 mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-3 items-center text-center w-full max-w-97.5">
        <h2 className="text-[32px] font-semibold leading-12 text-[#212B36]">
          Simple, transparent pricing
        </h2>
        <p className="text-base leading-6 text-[#333B42]">
          Discovcr the perfect plan tailored just for you.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="flex gap-8 items-end justify-center w-full">
        {pricingTiers.map((tier, index) => (
          <PricingCard key={index} tier={tier} />
        ))}
      </div>
    </div>
  );
};

export default PricingSection;
