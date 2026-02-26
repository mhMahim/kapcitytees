import Image from "next/image";
import Container from "../shared/Container";
import SectionHeaderWithLines from "../shared/SectionHeaderWithLines";

interface Step {
  number: number;
  title: string;
  description: string;
  image: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Consult Your Client",
    description: "Recommend top products.",
    image: "/images/landing/step-consult.svg",
  },
  {
    number: 2,
    title: "Client Orders Online",
    description: "We handle the rest",
    image: "/images/landing/step-order.svg",
  },
  {
    number: 3,
    title: "You Get Paid",
    description: "Collect commissions.",
    image: "/images/landing/step-paid.svg",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 lg:py-30">
      <Container>
        <div className="flex flex-col gap-12">
          <SectionHeaderWithLines title="How It Works" />

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {steps.map((step) => (
              <StepCard key={step.number} {...step} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HowItWorksSection;

const StepCard = ({ number, title, description, image }: Step) => (
  <div className="flex flex-col items-center gap-4 rounded-[20px] px-6 pt-6 pb-5">
    {/* Illustration */}
    <div className="w-25 h-25 lg:w-35 lg:h-35 relative">
      <Image
        src={image}
        alt={title}
        fill
        className="object-contain"
      />
    </div>

    {/* Text content */}
    <div className="flex flex-col items-center gap-2 text-center py-1 w-full">
      <h3 className="text-xl lg:text-[32px] font-bold leading-tight lg:leading-12 text-[#1E6FA8]">
        {number}. {title}
      </h3>
      <p className="text-base lg:text-lg font-medium leading-7 text-[#5E707C]">
        {description}
      </p>
    </div>
  </div>
);
