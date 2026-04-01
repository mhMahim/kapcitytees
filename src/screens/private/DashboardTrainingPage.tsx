"use client";

import { useState } from "react";
import BlogVideoCard from "@/components/dashboard/BlogVideoCard";
import { TrainingIcon1 } from "@/assets/icons";
import blogThumbnail from "@/assets/images/blog-thumbnail-img.png";
import { cn } from "@/lib/utils";
import useFetchData from "@/hooks/useFetchData";
import { Skeleton } from "@/components/ui/skeleton";
import { useStateContext } from "@/hooks/useStateContext";

/* ────────────────────────── Data ────────────────────────── */

interface Module {
  id: string;
  name: string;
}

interface ApiModule {
  id: number;
  name: string;
  slug?: string;
}

interface Tutorial {
  id: number;
  title: string;
  slug: string;
  video_url?: string;
  thumbnail_url?: string;
}

/* ────────────────── Circular Progress ────────────────── */

interface CircularProgressProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
}

const CircularProgress = ({
  percent,
  size = 120,
  strokeWidth = 10,
}: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E9F1F6"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1E6FA8"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      {/* Center text */}
      <span className="absolute inset-0 flex items-center justify-center font-bold text-xl text-[#1E6FA8]">
        {percent}%
      </span>
    </div>
  );
};

/* ────────────────── Page Component ────────────────── */

const DashboardTrainingPage = () => {
  const [activeModuleId, setActiveModuleId] = useState("");
  const {
    data: modulesResponse,
    isPending: isModulesPending,
    isError: isModulesError,
  } = useFetchData("/modules", true);

  const modules: Module[] = (
    (modulesResponse?.data?.data as ApiModule[] | undefined) ?? []
  ).map((module) => ({
    id: module.id.toString(),
    name: module.name,
  }));

  const selectedModuleId = modules.some(
    (module) => module.id === activeModuleId,
  )
    ? activeModuleId
    : (modules[0]?.id ?? "");

  const {
    data: tutorialsResponse,
    isPending: isTutorialsPending,
    isError: isTutorialsError,
  } = useFetchData(`/modules/tutorials/${selectedModuleId}`, true, {
    enabled: Boolean(selectedModuleId),
  });

  const tutorials: Tutorial[] =
    (tutorialsResponse?.data?.data as Tutorial[] | undefined) ?? [];

  const { userData } = useStateContext();

  const {
    data: tutorialsProgressResponse,
    isPending: isTutorialsProgressPending,
    isError: isTutorialsProgressError,
  } = useFetchData("/tutorials/overall-progress", true);

  const progressData = tutorialsProgressResponse?.data?.data ?? null;

  const completedModules = progressData?.completed_modules ?? 0;
  const totalModules = progressData?.total_modules ?? modules.length;
  const progressPercent = Math.max(
    0,
    Math.min(100, progressData?.percentage ?? 0),
  );

  const isTutorialIncompleteBarber =
    progressData?.is_tutorial_completed === false ||
    (userData &&
      userData?.data?.role === "barber" &&
      userData?.data?.is_tutorial_completed === false);

  return (
    <div className="flex flex-col gap-3 sm:gap-4 2xl:gap-5">
      {/* ── Warning Banner ── */}
      {isTutorialIncompleteBarber && (
        <div className="bg-white flex items-center gap-2 sm:gap-3 px-3 sm:px-4 lg:px-5 2xl:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)] overflow-hidden">
          <TrainingIcon1 />
          <p className="font-semibold text-sm sm:text-base leading-5 sm:leading-6 text-[#637381]">
            Please complete your training to get full access to the dashboard.
          </p>
        </div>
      )}

      {/* ── Progress Section ── */}
      {isTutorialsProgressPending ? (
        <div className="bg-white flex items-center gap-2 overflow-hidden rounded-xl sm:rounded-2xl px-4 sm:px-6 lg:px-8 2xl:pl-10 2xl:pr-20 py-4 sm:py-5 2xl:py-6 shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)]">
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-10 w-64 sm:w-80" />
          </div>
          <Skeleton className="h-30 w-30 rounded-full" />
        </div>
      ) : isTutorialsProgressError ? (
        <div className="bg-white flex items-center gap-2 overflow-hidden rounded-xl sm:rounded-2xl px-4 sm:px-6 lg:px-8 2xl:pl-10 2xl:pr-20 py-4 sm:py-5 2xl:py-6 shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)]">
          <div className="flex flex-col gap-2 flex-1">
            <p className="font-normal text-base leading-6 text-[#637381]">
              Your Progress
            </p>
            <p className="font-semibold text-xl sm:text-2xl 2xl:text-[32px] leading-8 sm:leading-10 2xl:leading-12 text-[#B42318]">
              Unable to load progress right now.
            </p>
          </div>
          <CircularProgress percent={0} />
        </div>
      ) : (
        <div className="bg-white flex items-center gap-2 overflow-hidden rounded-xl sm:rounded-2xl px-4 sm:px-6 lg:px-8 2xl:pl-10 2xl:pr-20 py-4 sm:py-5 2xl:py-6 shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)]">
          <div className="flex flex-col gap-2 flex-1">
            <p className="font-normal text-base leading-6 text-[#637381]">
              Your Progress
            </p>
            <p className="font-semibold text-xl sm:text-2xl 2xl:text-[32px] leading-8 sm:leading-10 2xl:leading-12 text-[#1E6FA8]">
              {completedModules}/{totalModules} Modules Completed
            </p>
          </div>
          <CircularProgress percent={progressPercent} />
        </div>
      )}

      {/* ── Modules + Videos ── */}
      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 2xl:gap-5 lg:items-start">
        {/* Modules Sidebar */}
        <div className="bg-white flex flex-col gap-3 sm:gap-4 2xl:gap-6 rounded-xl sm:rounded-2xl px-3 sm:px-4 lg:px-5 2xl:px-6 py-3 sm:py-4 shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)] w-full lg:w-60 xl:w-68 2xl:w-76 lg:shrink-0">
          <h2 className="font-semibold text-lg sm:text-xl 2xl:text-2xl leading-7 sm:leading-8 2xl:leading-9 text-[#0F2A3C]">
            Modules
          </h2>
          {isModulesPending ? (
            <div className="flex flex-col gap-2 sm:gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          ) : isModulesError ? (
            <div className="rounded-lg bg-[#FFF2F2] px-3 py-3">
              <p className="text-sm leading-5 text-[#B42318]">
                Failed to load modules. Please try again later.
              </p>
            </div>
          ) : (
            <div className="flex flex-row lg:flex-col gap-2 sm:gap-3 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
              {modules.map((mod, idx) => (
                <button
                  key={mod.id}
                  onClick={() => setActiveModuleId(mod.id)}
                  className={cn(
                    "flex flex-col items-start px-3 sm:px-4 py-2 sm:py-3 rounded-lg shrink-0 lg:shrink lg:w-full text-left transition-colors cursor-pointer",
                    mod.id === selectedModuleId
                      ? "bg-[#E9F1F6]"
                      : "hover:bg-[#F4F6F8]",
                  )}
                >
                  <span className="font-semibold text-base leading-6 text-[#0F2A3C]">
                    {idx + 1}. {mod.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Video Cards Grid */}
        <div className="flex-1 min-w-0">
          {isTutorialsPending ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 2xl:gap-5">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-64 w-full rounded-2xl" />
              ))}
            </div>
          ) : isTutorialsError ? (
            <div className="flex items-center justify-center h-64 bg-white rounded-2xl shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)]">
              <p className="text-[#B42318] text-base">
                Unable to load training data right now.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 2xl:gap-5">
                {tutorials.map((tutorial) => (
                  <BlogVideoCard
                    key={tutorial.id}
                    title={tutorial.title}
                    description="Watch this tutorial video."
                    thumbnail={
                      tutorial.thumbnail_url
                        ? tutorial.thumbnail_url
                        : blogThumbnail
                    }
                    slug={tutorial.id.toString()}
                  />
                ))}
              </div>

              {!selectedModuleId || tutorials.length === 0 ? (
                <div className="flex items-center justify-center h-64 bg-white rounded-2xl shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)]">
                  <p className="text-[#919EAB] text-base">
                    {selectedModuleId
                      ? "No videos available for this module yet."
                      : "No modules available right now."}
                  </p>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardTrainingPage;
