import React from "react";
import Container from "../shared/Container";
import Image from "next/image";
import JourneyCircleImg from "@/assets/images/journey-to-success-img.jpg";

interface JourneyStep {
  title: string;
  description: string;
  position: "left" | "right";
}

const JourneyToSuccessSection: React.FC = () => {
  const steps: JourneyStep[] = [
    {
      title: "Take Diagnostic Test",
      description: "Get your current band assessment in 30 minutes",
      position: "left",
    },
    {
      title: "Practice & Improve",
      description: "Use AI-powered tools for unlimited practice",
      position: "right",
    },
    {
      title: "Receive AI Analysis",
      description: "Understand your weak areas and improvement potential",
      position: "left",
    },
    {
      title: "Take Diagnostic Test",
      description: "Get your current band assessment in 30 minutes",
      position: "right",
    },
    {
      title: "Follow Smart Roadmap",
      description: "Study with personalized daily tasks and targets",
      position: "left",
    },
    {
      title: "Pass with Confidence",
      description: "Achieve your target score on exam day",
      position: "right",
    },
  ];

  return (
    <Container as="section" className="py-20">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-[32px] font-semibold text-[#212b36]">
          Your Journey to Success
        </h2>
      </div>

      {/* Journey Circle */}
      <div className="relative">
        {/* Circular Path - Desktop */}
        <div className="hidden lg:block relative">
          <div className="size-130 rounded-full border-2 border-dashed border-primary mx-auto p-5.5 relative">
            <div className="overflow-hidden rounded-full h-full w-full">
              <Image
                src={JourneyCircleImg}
                alt="Journey to Success"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Step 1 - Top Left */}
            <div className="absolute top-[12.5%] left-[12.5%]">
              <div className="size-6 bg-[#0066ff] rounded-full border-4 border-white shadow-lg" />
              <div className="text-right w-70 absolute top-0 -translate-y-1/2 right-[calc(100%+60px)]">
                <h3 className="text-[18px] font-medium text-[#161c24] leading-7 mb-3">
                  Take Diagnostic Test
                </h3>
                <p className="text-[14px] text-[#454f5b]">
                  Get your current band assessment in 30 minutes
                </p>
              </div>
            </div>

            {/* Step 2 - Top Right */}
            <div className="absolute top-[12.5%] right-[12.5%]">
              <div className="size-6 bg-[#0066ff] rounded-full border-4 border-white shadow-lg" />
              <div className="text-left w-70 absolute top-0 -translate-y-1/2 left-[calc(100%+60px)]">
                <h3 className="text-[18px] font-medium text-[#161c24] leading-7 mb-3">
                  Practice & Improve
                </h3>
                <p className="text-[14px] text-[#454f5b]">
                  Use AI-powered tools for unlimited practice
                </p>
              </div>
            </div>

            {/* Step 3 - Middle Left */}
            <div className="absolute top-1/2 right-full translate-x-1/2 -translate-y-1/2">
              <div className="size-6 bg-[#0066ff] rounded-full border-4 border-white shadow-lg" />
              <div className="text-right w-70 absolute top-0 -translate-y-1/2 right-[calc(100%+20px)]">
                <h3 className="text-[18px] font-medium text-[#161c24] leading-7 mb-3">
                  Receive AI Analysis
                </h3>
                <p className="text-[14px] text-[#454f5b]">
                  Understand your weak areas and improvement potential
                </p>
              </div>
            </div>

            {/* Step 4 - Middle Right */}
            <div className="absolute top-1/2 left-full -translate-x-1/2 -translate-y-1/2">
              <div className="size-6 bg-[#0066ff] rounded-full border-4 border-white shadow-lg" />
              <div className="text-left w-70 absolute top-0 -translate-y-1/2 left-[calc(100%+20px)]">
                <h3 className="text-[18px] font-medium text-[#161c24] leading-7 mb-3">
                  Take Diagnostic Test
                </h3>
                <p className="text-[14px] text-[#454f5b]">
                  Get your current band assessment in 30 minutes
                </p>
              </div>
            </div>

            {/* Step 5 - Bottom Left */}
            <div className="absolute bottom-[12.5%] left-[12.5%]">
              <div className="size-6 bg-[#0066ff] rounded-full border-4 border-white shadow-lg" />
              <div className="text-right w-70 absolute top-0 -translate-y-1/2 right-[calc(100%+60px)]">
                <h3 className="text-[18px] font-medium text-[#161c24] leading-7 mb-3">
                  Follow Smart Roadmap
                </h3>
                <p className="text-[14px] text-[#454f5b]">
                  Study with personalized daily tasks and targets
                </p>
              </div>
            </div>

            {/* Step 6 - Bottom Right */}
            <div className="absolute bottom-[12.5%] right-[12.5%]">
              <div className="size-6 bg-[#0066ff] rounded-full border-4 border-white shadow-lg" />
              <div className="text-left w-70 absolute top-0 -translate-y-1/2 left-[calc(100%+60px)]">
                <h3 className="text-[18px] font-medium text-[#161c24] leading-7 mb-3">
                  Pass with Confidence
                </h3>
                <p className="text-[14px] text-[#454f5b]">
                  Achieve your target score on exam day
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden">
          <div className="relative border-l-2 border-[#e6f0ff] pl-8 ml-4">
            {steps.map((step, index) => (
              <div key={index} className="relative mb-8 last:mb-0">
                <div className="absolute -left-10.25 top-0 size-5 bg-[#0066ff] rounded-full border-4 border-white shadow-lg" />
                <h3 className="text-[18px] font-medium text-[#161c24] leading-7 mb-2">
                  {step.title}
                </h3>
                <p className="text-[14px] text-[#454f5b]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default JourneyToSuccessSection;
