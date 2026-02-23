import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Container from "../shared/Container";
import { cn } from "@/lib/utils";
import { type StaticImageData } from "next/image";

interface BulletPoint {
  bold: string;
  text: string;
}

interface InfoSectionProps {
  tag: string;
  title: string;
  description: string;
  bullets: BulletPoint[];
  buttonText: string;
  buttonHref: string;
  imageSrc: StaticImageData;
  imageAlt: string;
  imagePosition?: "left" | "right";
  className?: string;
}

const InfoSection = ({
  tag,
  title,
  description,
  bullets,
  buttonText,
  buttonHref,
  imageSrc,
  imageAlt,
  imagePosition = "left",
  className,
}: InfoSectionProps) => {
  const imageBlock = (
    <div className="w-full lg:w-151.25 h-120 relative rounded-4xl overflow-hidden shrink-0">
      <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
    </div>
  );

  const contentBlock = (
    <div className="flex-1 flex flex-col gap-10 py-4 min-w-0">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <p className="text-base font-medium leading-6 text-[#DE5D56] uppercase tracking-[3px]">
            {tag}
          </p>
          <h2 className="text-5xl font-bold leading-17 text-[#0F2A3C]">
            {title}
          </h2>
        </div>
        <div className="flex flex-col gap-4 text-lg text-[#3F5563]">
          <p className="leading-8 opacity-80">{description}</p>
          <ul className="list-disc pl-7 flex flex-col gap-0 opacity-80">
            {bullets.map((bullet) => (
              <li key={bullet.bold} className="leading-8 text-lg">
                <span className="font-bold">{bullet.bold} </span>
                <span>{bullet.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Link
        href={buttonHref}
        className="bg-[#E9F1F6] rounded-xl px-7 py-3 flex items-center gap-2 w-fit hover:bg-[#d4e5ef] transition-colors"
      >
        <span className="text-base font-semibold text-[#1E6FA8] leading-6">
          {buttonText}
        </span>
        <ChevronRight className="w-4 h-4 text-[#1E6FA8]" />
      </Link>
    </div>
  );

  return (
    <section className={cn("w-full", className)}>
      <Container>
        <div className="flex gap-31.25 items-start relative">
          {/* Decorative background blob */}
          {imagePosition === "left" && (
            <div className="absolute -top-22.5 -left-17.5 w-143 h-89.25 bg-[#F4F6F8] rounded-[51px] -z-10" />
          )}
          {imagePosition === "right" && (
            <div className="absolute top-15 -right-17.5 w-lg h-63.5 bg-[#F4F6F8] rounded-[51px] -z-10" />
          )}

          {imagePosition === "left" ? (
            <>
              {imageBlock}
              {contentBlock}
            </>
          ) : (
            <>
              {contentBlock}
              {imageBlock}
            </>
          )}
        </div>
      </Container>
    </section>
  );
};

export default InfoSection;
