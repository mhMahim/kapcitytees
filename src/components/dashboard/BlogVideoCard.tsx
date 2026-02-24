import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { PlayCircleIcon } from "@/assets/icons";

export interface BlogVideoCardProps {
  title: string;
  description: string;
  thumbnail: string | StaticImageData;
  slug?: string;
  link?: string;
}

const BlogVideoCard = ({
  title,
  description,
  thumbnail,
  slug,
  link = "/dashboard/training/",
}: BlogVideoCardProps) => {
  const cardClassName =
    "bg-white flex flex-col gap-3 items-center p-3 rounded-2xl shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)] cursor-pointer hover:shadow-md transition-shadow";

  return (
    <Link href={`${link}${slug}`} className={cardClassName}>
      {/* Thumbnail with play button */}
      <div className="relative w-full h-50 rounded-lg overflow-hidden">
        <Image src={thumbnail} alt={title} fill className="object-cover" />
        {/* Play circle icon centered on the image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayCircleIcon className="size-14" />
        </div>
      </div>

      {/* Text content */}
      <div className="flex flex-col items-start px-2 py-3 w-full">
        <div className="flex flex-col gap-2 w-full">
          <h3 className="font-semibold text-xl leading-7.5 text-[#0F2A3C]">
            {title}
          </h3>
          <p className="font-normal text-sm leading-5.5 text-[#919EAB]">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogVideoCard;
