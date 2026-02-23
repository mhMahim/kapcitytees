import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full h-12 px-5 py-3 text-base font-normal leading-6",
        "bg-[#F9FAFB] border border-[#DFE3E8] rounded-lg",
        "text-[#454F5B] placeholder:text-[#919EAB]",
        "transition-colors outline-none",
        "focus:border-[#637381] focus:bg-white",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-red-500",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
