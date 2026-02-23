import React from "react";
import Container from "../shared/Container";
import WhyChooseUs from "@/assets/images/why-choose-us.png";
import {
  BrainIcon,
  ProgressIcon,
  RoadmapIcon,
  SpeakIcon,
  WriteIcon,
} from "@/assets/icons";
import Image from "next/image";

const WhyChooseSection: React.FC = () => {
  return (
    <Container as="section" className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-[32px] font-semibold text-[#212b36] mb-2">
          Why Choose Our Platform?
        </h2>
        <p className="text-[16px] text-[#333b42] leading-6">
          Advanced AI technology meets Pakistani learner needs
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex flex-col gap-6 lg:w-114.75">
          <FeatureCard
            icon={<BrainIcon />}
            title="AI Score Prediction"
            description="Know your exact band score after every practice test"
          />
          <FeatureCard
            icon={<SpeakIcon />}
            title="Speaking AI Evaluation"
            description="Instant pronunciation and fluency feedback"
          />
          <FeatureCard
            icon={<WriteIcon />}
            title="Writing Analysis"
            description="Grammar, coherence, and task achievement scoring"
          />
        </div>

        <div className="flex flex-col gap-5 lg:flex-1">
          <div className="h-75 lg:h-105 rounded-3xl bg-linear-to-br from-[#e6f0ff] to-[#cce0ff] flex items-center justify-center overflow-hidden">
            <Image
              src={WhyChooseUs}
              alt="Why Choose Us"
              className="object-cover h-full w-full object-top"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex-1">
              <FeatureCard
                icon={<RoadmapIcon />}
                title="Personalized Roadmap"
                description="Custom study plan based on your weaknesses"
              />
            </div>
            <div className="flex-1">
              <FeatureCard
                icon={<ProgressIcon />}
                title="Progress Tracking"
                description="Real-time skill improvement analytics"
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default WhyChooseSection;

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="bg-white rounded-3xl shadow-[0px_0px_4px_0px_rgba(204,204,204,0.06)] p-6 flex flex-col gap-6">
    <div className="size-13 bg-[rgba(176,208,255,0.6)] rounded-[26px] flex items-center justify-center">
      {icon}
    </div>
    <div className="flex flex-col gap-4">
      <h3 className="text-[24px] font-semibold text-[#161c24] leading-9">
        {title}
      </h3>
      <p className="text-[14px] text-[#454f5b]">{description}</p>
    </div>
  </div>
);
