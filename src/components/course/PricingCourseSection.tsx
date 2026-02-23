import { CheckCircleIcon, ArrowUpRightIcon } from "@/assets/icons";
import Container from "../shared/Container";
import { cn } from "@/lib/utils";

interface PricingFeature {
  text: string;
}

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: PricingFeature[];
  buttonText: string;
  isHighlighted?: boolean;
}

const PricingCard = ({
  title,
  price,
  description,
  features,
  buttonText,
  isHighlighted = false,
}: PricingCardProps) => {
  if (isHighlighted) {
    return (
      <div className="bg-[#0066ff] border border-[#0066ff] rounded-3xl p-8 flex flex-col justify-between flex-1 min-h-159 shadow-[0px_4px_16px_0px_rgba(51,133,255,0.48)]">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <h6 className="text-[18px] font-medium leading-7 text-[#e6f0ff]">
            {title}
          </h6>
          <div className="flex flex-col gap-2">
            <div className="flex items-end gap-2">
              <span className="text-[64px] font-bold leading-20 text-white">
                {price}
              </span>
              <span className="text-[16px] font-normal leading-6 text-[#b0d0ff]">
                / month
              </span>
            </div>
            <p className="text-[16px] font-normal leading-6 text-[#e6f0ff]">
              {description}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/20 w-full my-6" />

        {/* Features */}
        <div className="flex flex-col gap-5 flex-1">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckCircleIcon className="text-white w-5 h-5 shrink-0" />
              <span className="text-[16px] font-semibold leading-6 text-white">
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* Button */}
        <button
          className={cn(
            "mt-6 w-full flex items-center justify-between gap-4 rounded-full border border-white backdrop-blur-[5px] pl-6 pr-2 py-2 group cursor-pointer",
          )}
        >
          <span className="text-[15px] font-semibold leading-6.5 text-white">
            {buttonText}
          </span>
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-all duration-300">
            <ArrowUpRightIcon className="w-6 h-6 text-[#0066ff]" />
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#f4f6f8] border border-[#dfe3e8] rounded-3xl p-8 flex flex-col justify-between flex-1 min-h-149.5">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <h6 className="text-[18px] font-medium leading-7 text-[#212b36]">
          {title}
        </h6>
        <div className="flex flex-col gap-2">
          <div className="flex items-end gap-2">
            <span className="text-[64px] font-bold leading-20 text-[#212b36]">
              {price}
            </span>
            <span className="text-[16px] font-normal leading-6 text-[#333b42]">
              / month
            </span>
          </div>
          <p className="text-[16px] font-normal leading-6 text-[#333b42]">
            {description}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#dfe3e8] w-full my-6" />

      {/* Features */}
      <div className="flex flex-col gap-5 flex-1">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <CheckCircleIcon className="text-[#0066ff] w-5 h-5 shrink-0" />
            <span className="text-[16px] font-semibold leading-6 text-[#454f5b]">
              {feature.text}
            </span>
          </div>
        ))}
      </div>

      {/* Button */}
      <button className="mt-6 w-full flex items-center justify-between gap-4 rounded-full border border-[#323B42] backdrop-blur-[5px] pl-6 pr-2 py-2 bg-transparent group cursor-pointer">
        <span className="text-[15px] font-semibold leading-6.5 text-[#323B42]">
          {buttonText}
        </span>
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-all duration-300">
          <ArrowUpRightIcon className="w-6 h-6 text-[#212b36]" />
        </div>
      </button>
    </div>
  );
};

const PricingCourseSection = () => {
  const pricingPlans = [
    {
      title: "Personal",
      price: "$19",
      description: "All the basic features to boost your freelance career",
      features: [
        { text: "Full Access to Landingfolio" },
        { text: "100 GB Free Storage" },
        { text: "Unlimited Visitors" },
        { text: "10 Agents" },
        { text: "Live Chat Support" },
      ],
      buttonText: "Register Now",
      isHighlighted: false,
    },
    {
      title: "Professional",
      price: "$49",
      description: "All the basic features to boost your freelance career",
      features: [
        { text: "Full Access to Landingfolio" },
        { text: "100 GB Free Storage" },
        { text: "Unlimited Visitors" },
        { text: "10 Agents" },
        { text: "Live Chat Support" },
      ],
      buttonText: "Get 14 Days Free Trial",
      isHighlighted: true,
    },
    {
      title: "Business",
      price: "$99",
      description: "All the basic features to boost your freelance career",
      features: [
        { text: "Full Access to Landingfolio" },
        { text: "100 GB Free Storage" },
        { text: "Unlimited Visitors" },
        { text: "10 Agents" },
        { text: "Live Chat Support" },
      ],
      buttonText: "Get 14 Days Free Trial",
      isHighlighted: false,
    },
  ];

  return (
    <Container as="section" className="py-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h3 className="text-[32px] font-semibold leading-12 text-[#212b36] max-w-134.75 mx-auto">
          Choose the IELTS General Package that best fits you!
        </h3>
      </div>

      {/* Pricing Cards */}
      <div className="flex flex-col lg:flex-row gap-8 items-end justify-center">
        {pricingPlans.map((plan, index) => (
          <PricingCard
            key={index}
            title={plan.title}
            price={plan.price}
            description={plan.description}
            features={plan.features}
            buttonText={plan.buttonText}
            isHighlighted={plan.isHighlighted}
          />
        ))}
      </div>
    </Container>
  );
};

export default PricingCourseSection;
