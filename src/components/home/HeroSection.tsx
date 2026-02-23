import {
  TagLinkIcon,
  Value1Icon,
  Value2Icon,
  Value3Icon,
  Value4Icon,
} from "@/assets/icons";
import { Button } from "../ui/button";
import HeroImg from "@/assets/images/hero-img.png";
import Image from "next/image";
import Container from "../shared/Container";
import PredictedScoreCard from "./PredictedScoreCard";

interface StatsCardProps {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const HeroSection = () => {
  const infos = [
    {
      icon: Value1Icon,
      value: "8.5+",
      label: "Average Band Score",
    },
    {
      icon: Value2Icon,
      value: "15,000+",
      label: "Students Trained",
    },
    {
      icon: Value3Icon,
      value: "95%",
      label: "Success Rate",
    },
    {
      icon: Value4Icon,
      value: "30 Days",
      label: "Avg. Improvement Time",
    },
  ];

  return (
    <div className="pt-30 pb-12">
      <Container className="relative">
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 pt-5.5">
            <div className="bg-white rounded-full flex items-center gap-2 py-2 px-4 border border-[#FCFDFF] mb-4 w-fit">
              <TagLinkIcon />
              <p className="text-[#002B6B]">
                Your #1 Platform for IELTS and PTE
              </p>
            </div>
            <h1 className="text-[64px] font-bold leading-20 text-[#002B6B] mb-6">
              Master IELTS & PTE with AI-Powered Precision
            </h1>
            <p className="text-lg text-[#637381] mb-10">
              Pakistan&apos;s first intelligent exam preparation platform with
              instant scoring, personalized roadmaps, and guaranteed band
              improvement.
            </p>
            <div className="flex gap-4">
              <Button className="px-12">Start Free Trial</Button>
              <Button variant="outline" className="px-12">
                View Packages
              </Button>
            </div>
          </div>
          <div className="col-span-1">
            <Image src={HeroImg} alt="Hero Image" className="w-full" />
          </div>
        </div>
        <div className="flex  gap-12 -mt-10">
          <div className="col-span-1 grid grid-cols-2 gap-5 flex-6">
            {infos.map((info, index) => (
              <StatsCard key={index} {...info} />
            ))}
          </div>
          <div className="col-span-1 flex-5">
            <PredictedScoreCard />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeroSection;

const StatsCard: React.FC<StatsCardProps> = ({ value, label, icon: Icon }) => {
  return (
    <div className="flex h-full gap-5 items-center p-8 rounded-3xl w-full shadow-[0px_4px_8px_0px_rgba(204,204,204,0.12)] hover:bg-[#0066ff] bg-white transition-all duration-300 group">
      <div className="shrink-0 flex items-center justify-center">
        <Icon className="group-hover:text-white text-[#212B36]" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[32px] font-semibold leading-12 group-hover:text-white text-[#212b36]">
          {value}
        </span>
        <span className="text-[16px] leading-6 group-hover:text-[#e6f0ff] text-[#002b6b]">
          {label}
        </span>
      </div>
    </div>
  );
};
