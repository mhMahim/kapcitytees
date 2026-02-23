"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { EyeOffIcon, EyeOnIcon } from "@/assets/icons";

interface PasswordInputProps extends Omit<
  React.ComponentProps<"input">,
  "type"
> {
  showToggle?: boolean;
}

function PasswordInput({
  className,
  showToggle = true,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        data-slot="input"
        className={cn(
          "w-full h-12 px-5 py-3 text-base font-normal leading-6",
          "bg-[#F9FAFB] border border-[#DFE3E8] rounded-lg",
          "text-[#454F5B] placeholder:text-[#919EAB]",
          "transition-colors outline-none",
          "focus:border-[#637381] focus:bg-white",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "aria-invalid:border-red-500",
          showToggle && "pr-12",
          className,
        )}
        {...props}
      />
      {showToggle && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-[#919EAB] hover:text-[#637381] transition-colors focus:outline-none cursor-pointer"
          tabIndex={-1}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOnIcon className="size-6" />
          ) : (
            <EyeOffIcon className="size-6" />
          )}
        </button>
      )}
    </div>
  );
}

export { PasswordInput };
