import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeaderWithLinesProps {
  title: ReactNode;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
}

const SectionHeaderWithLines = ({
  title,
  subtitle,
  className,
  titleClassName,
}: SectionHeaderWithLinesProps) => {
  return (
    <div className={cn("flex flex-col items-center gap-2 w-full", className)}>
      <div className="flex items-center gap-4 lg:gap-8 w-full">
        <div className="flex-1 h-px bg-[#B9D2E4]" />
        <h2
          className={cn(
            "text-3xl lg:text-5xl font-bold leading-tight lg:leading-17 text-[#0F2A3C] text-center shrink-0",
            titleClassName
          )}
        >
          {title}
        </h2>
        <div className="flex-1 h-px bg-[#B9D2E4]" />
      </div>
      {subtitle && (
        <p className="text-base lg:text-lg font-medium leading-7 text-[#637381] text-center max-w-185">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeaderWithLines;
