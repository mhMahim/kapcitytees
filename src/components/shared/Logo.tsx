import LogoImg from "@/assets/images/logo.png";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn("size-22 inline-block", className)}>
      <Image
        src={LogoImg}
        alt="Logo"
        className="h-full w-full object-contain"
      />
    </Link>
  );
};

export default Logo;
