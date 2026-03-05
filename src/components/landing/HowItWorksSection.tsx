import Image, { StaticImageData } from "next/image";
import Container from "../shared/Container";
import SectionHeaderWithLines from "../shared/SectionHeaderWithLines";
import WorkImg1 from "@/assets/images/work/work1.png";
import WorkImg2 from "@/assets/images/work/work2.png";
import WorkImg3 from "@/assets/images/work/work3.png";

interface Step {
  number: number;
  title: string;
  description: string;
  image: StaticImageData;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Consult Your Client",
    description: "Recommend top products.",
    image: WorkImg1,
  },
  {
    number: 2,
    title: "Client Orders Online",
    description: "We handle the rest",
    image: WorkImg2,
  },
  {
    number: 3,
    title: "You Get Paid",
    description: "Collect commissions.",
    image: WorkImg3,
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-10 sm:py-16 lg:py-30">
      <Container>
        <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
          <SectionHeaderWithLines title="How It Works" />

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
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
  <div className="flex flex-col items-center gap-3 sm:gap-4 rounded-[20px] px-4 sm:px-6 pt-5 sm:pt-6 pb-4 sm:pb-5">
    {/* Illustration */}
    <figure className="size-24 sm:size-28 lg:size-35">
      <Image src={image} alt={title} className="" />
    </figure>

    {/* Text content */}
    <div className="flex flex-col items-center gap-1 sm:gap-2 text-center py-1 w-full">
      <h3 className="text-lg sm:text-xl lg:text-[32px] font-bold leading-tight lg:leading-12 text-[#1E6FA8]">
        {number}. {title}
      </h3>
      <p className="text-sm sm:text-base lg:text-lg font-medium leading-6 sm:leading-7 text-[#5E707C]">
        {description}
      </p>
    </div>
  </div>
);
