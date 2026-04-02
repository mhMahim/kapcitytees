import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { PlayCircleIcon } from "@/assets/icons";
import { isValidUrl } from "@/lib/utils";

export interface BlogVideoCardProps {
  title: string;
  description: string;
  thumbnail: string | StaticImageData;
  slug?: string;
  link?: string;
  isCompleted?: boolean;
}

const BlogVideoCard = ({
  title,
  description,
  thumbnail,
  slug,
  link = "/dashboard/training/",
  isCompleted,
}: BlogVideoCardProps) => {
  const cardClassName =
    "bg-white flex flex-col gap-3 items-center p-3 rounded-2xl shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)] cursor-pointer hover:shadow-md transition-shadow";

  const hasStatus = typeof isCompleted === "boolean";
  const statusLabel = isCompleted ? "Watched" : "Not Watched";
  const statusClassName = isCompleted
    ? "bg-[#E8F7EF] text-[#1D9A5F]"
    : "bg-[#FFF2F2] text-[#B42318]";

  return (
    <Link href={`${link}${slug}`} className={cardClassName}>
      {/* Thumbnail with play button */}
      <div className="relative w-full h-36 sm:h-40 lg:h-44 2xl:h-50 rounded-lg overflow-hidden">
        <Image
          src={isValidUrl(thumbnail) ? thumbnail : "/default-thumbnail.png"}
          alt={title}
          fill
          className="object-cover"
        />
        {/* Play circle icon centered on the image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayCircleIcon className="size-10 sm:size-12 2xl:size-14" />
        </div>
      </div>

      {/* Text content */}
      <div className="flex flex-col items-start px-2 py-3 w-full">
        {hasStatus && (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold leading-4 mb-2 ${statusClassName}`}
          >
            {statusLabel}
          </span>
        )}
        <div className="flex flex-col gap-2 w-full">
          <h3 className="font-semibold text-base sm:text-lg 2xl:text-xl leading-6 sm:leading-7 2xl:leading-7.5 text-[#0F2A3C]">
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
