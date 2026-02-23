import { cn } from "@/lib/utils";
import Container from "../shared/Container";
import Image from "next/image";
import { ArrowRightIcon } from "@/assets/icons";
import Blog2 from "@/assets/images/blog2.jpg";

const RelatedArticlesSection = ({ title = "" }) => {
  return (
    <section className="py-20">
      <Container className="">
        <div className="text-center mb-12 px-6">
          <h2 className="text-[32px] font-semibold text-[#212b36] leading-12">
            {title || "Related Articles"}
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <SecondaryBlogCard
                title="Lorem ipsum dolor sit amet consectetur. Nibh elementum"
                description="Lorem ipsum dolor sit amet consectetur. Cras a nisl nisl euismod odio. Cras a nisl nisl euismod odio. Cras a nisl nisl euismod odio."
                date="Sep 27, 2023"
                key={index}
              />
            ))}
        </div>
      </Container>
    </section>
  );
};

export default RelatedArticlesSection;

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  className?: string;
  imageUrl?: string;
  isLarge?: boolean;
}

const SecondaryBlogCard = ({
  title,
  description,
  date,
  className,
}: BlogCardProps) => {
  return (
    <div
      className={cn(
        "bg-white rounded-3xl shadow-[0px_4px_8px_0px_rgba(204,204,204,0.12)] p-6 flex-1 flex flex-col items-start gap-6",
        className,
      )}
    >
      {/* Image Placeholder */}
      <div className="h-60 shrink-0 rounded-[20px] bg-linear-to-br from-[#e6f0ff] to-[#cce0ff] flex items-center justify-center">
        <figure className="w-full h-full overflow-hidden rounded-xl">
          <Image
            src={Blog2}
            alt="Blog Image"
            className="w-full h-full object-cover object-center"
          />
        </figure>
      </div>
      {/* Content */}
      <div className="flex flex-col justify-between h-full flex-1 gap-5">
        <div className="flex flex-col gap-4">
          <h3 className="text-[20px] font-medium text-[#161c24] line-clamp-2">
            {title}
          </h3>
          <p className="text-[16px] text-[#454f5b] leading-6 line-clamp-4">
            {description}
          </p>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#919eab]">{date}</span>
          <button className="flex items-center gap-2 text-[18px] font-medium text-[#0066ff] leading-7 group cursor-pointer">
            Learn More
            <ArrowRightIcon className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
