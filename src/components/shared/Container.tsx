import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  fluid?: boolean;
  center?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  as,
  children,
  className,
  fluid = false,
  center = false,
  ...rest
}) => {
  const Component = as || "div";

  return (
    <Component
      className={cn(
        fluid ? "w-full px-4" : "max-w-382 mx-auto px-4 sm:px-5 lg:px-6 w-full", // max-w-[calc(1200px+64px)]
        center && "flex justify-center",
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Container;
