import Image from "next/image";
import Container from "@/components/shared/Container";
import SectionHeaderWithLines from "@/components/shared/SectionHeaderWithLines";

interface PhaseCardData {
  phase: number;
  title: string;
  description: string;
  image: string;
  duration: string;
}

const phases: PhaseCardData[] = [
  {
    phase: 1,
    title: "Brand Alignment Review",
    description:
      "Evaluation of your business, presentation, and client communication",
    image: "/images/landing/phase-review.svg",
    duration: "2-3 Days",
  },
  {
    phase: 2,
    title: "Consultant Training",
    description:
      "One-time online course on customer engagement & product knowledge.",
    image: "/images/landing/phase-training.svg",
    duration: "1-2 Hours",
  },
  {
    phase: 3,
    title: "Earn & Scale",
    description:
      "Access products, start earning commissions, and track your performance.",
    image: "/images/landing/phase-earn.svg",
    duration: "Unlimited",
  },
];

const OnboardingPhasesSection = () => {
  return (
    <section className="py-10 sm:py-16 lg:py-30">
      <Container>
        <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
          <SectionHeaderWithLines
            title="Structured Onboarding for Professional Barbers"
            subtitle="Access is not open to everyone. We work with established barbers who align with our high standards of professionalism."
          />

          {/* Phase cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 2xl:gap-8">
            {phases.map((phase) => (
              <PhaseCard key={phase.phase} {...phase} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OnboardingPhasesSection;

const PhaseCard = ({
  phase,
  title,
  description,
  image,
  duration,
}: PhaseCardData) => (
  <div className="bg-white rounded-2xl shadow-[0px_12px_24px_-4px_rgba(145,158,171,0.10)] overflow-hidden flex flex-col">
    <div className="flex flex-col gap-6 px-4 xl:px-8 pt-6 pb-8 flex-1">
      {/* Phase label + divider */}
      <div className="flex flex-col gap-3 items-center">
        <p className="sm:text-lg xl:text-xl font-medium leading-7.5 text-[#637381] text-center">
          PHASE {phase}
        </p>
        <div className="w-full h-px bg-[#E9F1F6]" />
      </div>

      {/* Illustration */}
      <div className="flex justify-center">
        <div className="w-25 h-25 lg:w-35 lg:h-35 relative">
          <Image src={image} alt={title} fill className="object-contain" />
        </div>
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xl sm:text-2xl xl:text-3xl 2xl:text-[32px] font-semibold leading-tight 2xl:leading-12 text-[#1E6FA8]">
          {title}
        </h3>
        <p className="text-sm lg:text-base xl:text-lg font-medium xl:leading-7 text-[#637381]">
          {description}
        </p>
      </div>
    </div>

    {/* Duration badge */}
    <div className="mx-2 mb-2">
      <div className="bg-[#E9F1F6] rounded-lg py-2 sm:py-3 2xl:py-4 text-center">
        <p className="sm:text-lg lg:text-xl 2xl:text-2xl font-semibold xl:leading-9 text-[#4B8CB9]">
          {duration}
        </p>
      </div>
    </div>
  </div>
);
