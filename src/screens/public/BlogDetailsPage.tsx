import Image from "next/image";
import { PlayCircleIcon } from "@/assets/icons";
import blogThumbnail from "@/assets/images/blog-thumbnail-img.png";

const BlogDetailsPage = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-6">
        {/* Video Thumbnail */}
        <div className="relative w-full max-w-307.5 aspect-video rounded-xl overflow-hidden">
          <Image
            src={blogThumbnail}
            alt="Barber's Guide to Using Beard Oil"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <PlayCircleIcon className="size-16" />
          </div>
        </div>

        {/* Title & Metadata */}
        <div className="flex flex-col gap-12 max-w-213.75">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-2xl leading-9 text-[#0F2A3C]">
              Barber&apos;s Guide to Using Beard Oil
            </h2>
            <p className="text-sm leading-5.5 text-[#919EAB]">
              Uploaded: 12th Feb, 2026 &nbsp;|&nbsp; 1,025 views
            </p>
          </div>

          {/* Video Description */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-base leading-6 text-[#0F2A3C]">
              Video Description
            </h3>
            <div className="text-sm leading-5.5 text-[#3F5563] space-y-4">
              <p>
                Learn the professional way to apply beard oil and transform your
                daily grooming routine. In this guide, our expert barber walks
                you through each step—from choosing the right amount of oil to
                properly massaging it into your beard and skin.
              </p>
              <p>
                Beard oil helps reduce itchiness, dryness, and beard dandruff
                while keeping your beard soft, shiny, and healthy. Whether
                you&apos;re growing a new beard or maintaining a full one, this
                video will show you simple techniques used by professionals to
                keep your beard looking its best.
              </p>
              <p>Follow along to:</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Improve beard softness and texture</li>
                <li>Keep your skin hydrated and irritation-free</li>
                <li>Achieve a clean, well-groomed look every day</li>
                <li>
                  This is a must-watch for anyone serious about beard care.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
