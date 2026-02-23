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
import PredictedScoreCard from "../home/PredictedScoreCard";

interface StatsCardProps {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const StatsSection = () => {
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
    <div className="pt-12 pb-20">
      <Container className="relative grid grid-cols-4 gap-5">
        {infos.map((info, index) => (
          <StatsCard key={index} {...info} />
        ))}
      </Container>
    </div>
  );
};

export default StatsSection;

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
