import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  tag?: string;
  title: ReactNode;
  className?: string;
}

const SectionHeader = ({ tag, title, className }: SectionHeaderProps) => {
  return (
    <div className={cn("flex flex-col gap-4 items-center text-center", className)}>
      {tag && (
        <p className="text-base font-medium leading-6 text-[#DE5D56] uppercase tracking-[3px]">
          {tag}
        </p>
      )}
      <h2 className="text-5xl font-bold leading-17 text-[#0F2A3C]">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;
