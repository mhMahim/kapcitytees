"use client";

import { useMemo } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import parse from 'html-react-parser';
import { PlayCircleIcon } from "@/assets/icons";
import blogThumbnail from "@/assets/images/blog-thumbnail-img.png";
import useFetchData from "@/hooks/useFetchData";
import { Skeleton } from "@/components/ui/skeleton";

interface TutorialDetails {
  id: number;
  title: string;
  slug: string;
  video_url?: string;
  thumbnail?: string;
  description?: string;
}

const BlogDetailsPage = () => {
  const params = useParams<{ slug: string }>();
  const tutorialId = params?.slug;

  const {
    data,
    isPending,
    isError,
  } = useFetchData(`/modules/tutorials/details/${tutorialId}`, true, {
    enabled: Boolean(tutorialId),
  });

  const tutorial = useMemo(() => {
    const detailsData = data?.data?.data;

    if (Array.isArray(detailsData)) {
      return detailsData[0] as TutorialDetails | undefined;
    }

    return detailsData as TutorialDetails | undefined;
  }, [data]);

  const thumbnailSrc = tutorial?.thumbnail
    ? tutorial.thumbnail.startsWith("http") || tutorial.thumbnail.startsWith("/")
      ? tutorial.thumbnail
      : `/${tutorial.thumbnail}`
    : blogThumbnail;

  if (isPending) {
    return (
      <div className="flex justify-center">
        <div className="flex flex-col gap-6 w-full max-w-307.5">
          <Skeleton className="w-full aspect-video rounded-xl" />
          <div className="flex flex-col gap-6 max-w-213.75">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-5 w-1/3" />
            <div className="flex flex-col gap-3">
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-2xl shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)]">
        <p className="text-[#B42318] text-base">
          Unable to load tutorial details right now.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-6">
        {/* Video Thumbnail */}
        <div className="relative w-full max-w-307.5 aspect-video rounded-xl overflow-hidden">
          <Image
            src={thumbnailSrc ? `https://kapcitytees.thewarriors.team/${thumbnailSrc}` : blogThumbnail}
            alt={tutorial?.title ?? "Tutorial thumbnail"}
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
              {tutorial?.title ?? "Tutorial"}
            </h2>
            <p className="text-sm leading-5.5 text-[#919EAB]">
              Tutorial details
            </p>
          </div>

          {/* Video Description */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-base leading-6 text-[#0F2A3C]">
              Video Description
            </h3>
            <p className="text-sm leading-5.5 text-[#3F5563]">
              {parse(tutorial?.description ??
                "Watch this training tutorial to improve your barbering skills.")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
