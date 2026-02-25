import Container from "../shared/Container";

const steps = [
  {
    number: "1",
    title: "Barber consults client",
    description: "Sign up and build your professional barber profile",
  },
  {
    number: "2",
    title: "Client orders online",
    description: "Share your favorite products with clients",
  },
  {
    number: "3",
    title: "Barber earns commission",
    description: "Earn commission on every sale you generate",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="bg-white rounded-3xl py-20 lg:py-28">
      <Container>
        {/* Header */}
        <div className="flex flex-col items-center gap-3 mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight lg:leading-17 text-[#0F2A3C] text-center">
            How It Works
          </h2>
          <p className="text-lg font-medium leading-7 text-[#637381] text-center">
            Start earning in 3 simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute top-10.5 left-15 right-15 h-0.5 bg-[#1E6FA8]" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
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

interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

const StepCard = ({ number, title, description }: StepCardProps) => (
  <div className="relative flex flex-col items-start">
    {/* Background number */}
    <span className="text-[180px] lg:text-[204px] font-black leading-none text-[#D7EFFF]/30 tracking-tighter select-none pointer-events-none -mb-28 lg:-mb-32">
      {number}
    </span>

    {/* Dot indicator */}
    <div className="relative mb-12 z-10">
      <div className="w-16 h-16 rounded-[20px] bg-white shadow-[0px_4px_8px_rgba(0,0,0,0.06)] flex items-center justify-center">
        <div className="w-6 h-6 rounded-[10px] bg-[#1E6FA8]" />
      </div>
    </div>

    {/* Content */}
    <div className="flex flex-col gap-2">
      <h3 className="text-2xl lg:text-[32px] font-semibold leading-tight lg:leading-12 text-[#0F2A3C]">
        {title}
      </h3>
      <p className="text-lg font-medium leading-7 text-[#5E707C] max-w-77.25">
        {description}
      </p>
    </div>
  </div>
);
