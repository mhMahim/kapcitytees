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
    <figure className="size-35">
      <Image src={image} alt={title} className="" />
    </figure>

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
