"use client";

import { useStateContext } from "@/hooks/useStateContext";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Logo = ({ className, path }: { className?: string; path?: string }) => {
  const { siteInfoData } = useStateContext();
  // console.log(siteInfoData);
  return (
    <Link
      href={path || "/"}
      className={cn("size-22 inline-block relative", className)}
    >
      {siteInfoData?.data?.data?.logo && (
        <Image
          src={siteInfoData?.data?.data?.logo}
          alt="Logo"
          fill
          className="h-full w-full object-contain"
        />
      )}
    </Link>
  );
};

export default Logo;
