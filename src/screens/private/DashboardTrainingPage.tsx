"use client";

import { useState } from "react";
import BlogVideoCard from "@/components/dashboard/BlogVideoCard";
import { TrainingIcon1 } from "@/assets/icons";
import blogThumbnail from "@/assets/images/blog-thumbnail-img.png";
import { cn } from "@/lib/utils";

/* ────────────────────────── Data ────────────────────────── */

interface Module {
  id: string;
  name: string;
  category: string;
  videos: {
    id: number;
    slug: string;
    title: string;
    description: string;
  }[];
}

const modules: Module[] = [
  {
    id: "diagnosis",
    name: "4-Step Diagnosis System",
    category: "Diagnosis",
    videos: [
      {
        id: 1,
        slug: "barbers-guide-to-using-beard-oil",
        title: "Barber's Guide to Using Beard Oil",
        description:
          "Learn the correct way to apply beard oil to reduce itch, soften your beard, and keep your skin healthy. Simple steps for better daily grooming.",
      },
      {
        id: 2,
        slug: "barbers-guide-to-using-beard-oil-2",
        title: "Barber's Guide to Using Beard Oil",
        description:
          "Learn the correct way to apply beard oil to reduce itch, soften your beard, and keep your skin healthy. Simple steps for better daily grooming.",
      },
      {
        id: 3,
        slug: "barbers-guide-to-using-beard-oil-3",
        title: "Barber's Guide to Using Beard Oil",
        description:
          "Learn the correct way to apply beard oil to reduce itch, soften your beard, and keep your skin healthy. Simple steps for better daily grooming.",
      },
      {
        id: 4,
        slug: "barbers-guide-to-using-beard-oil-4",
        title: "Barber's Guide to Using Beard Oil",
        description:
          "Learn the correct way to apply beard oil to reduce itch, soften your beard, and keep your skin healthy. Simple steps for better daily grooming.",
      },
      {
        id: 5,
        slug: "barbers-guide-to-using-beard-oil-5",
        title: "Barber's Guide to Using Beard Oil",
        description:
          "Learn the correct way to apply beard oil to reduce itch, soften your beard, and keep your skin healthy. Simple steps for better daily grooming.",
      },
      {
        id: 6,
        slug: "barbers-guide-to-using-beard-oil-6",
        title: "Barber's Guide to Using Beard Oil",
        description:
          "Learn the correct way to apply beard oil to reduce itch, soften your beard, and keep your skin healthy. Simple steps for better daily grooming.",
      },
    ],
  },
  {
    id: "consultation",
    name: "Consultation Framework",
    category: "Consultation",
    videos: [],
  },
  {
    id: "conversion",
    name: "Conversion Scripts",
    category: "Conversion",
    videos: [],
  },
  {
    id: "product",
    name: "Product Knowledge",
    category: "Product",
    videos: [],
  },
];

const completedModules = 0;
const totalModules = modules.length;
const progressPercent = 70;

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
  const [activeModuleId, setActiveModuleId] = useState(modules[0].id);
  const activeModule =
    modules.find((m) => m.id === activeModuleId) ?? modules[0];

  return (
    <div className="flex flex-col gap-5">
      {/* ── Warning Banner ── */}
      <div className="bg-white flex items-center gap-3 px-6 py-4 rounded-2xl shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)] overflow-hidden">
        <TrainingIcon1 />
        <p className="font-semibold text-base leading-6 text-[#637381]">
          Please complete your training to get full access to the dashboard.
        </p>
      </div>

      {/* ── Progress Section ── */}
      <div className="bg-white flex items-center gap-2 overflow-hidden rounded-2xl pl-10 pr-20 py-6 shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)]">
        <div className="flex flex-col gap-2 flex-1">
          <p className="font-normal text-base leading-6 text-[#637381]">
            Your Progress
          </p>
          <p className="font-semibold text-[32px] leading-12 text-[#1E6FA8]">
            {completedModules}/{totalModules} Modules Completed
          </p>
        </div>
        <CircularProgress percent={progressPercent} />
      </div>

      {/* ── Modules + Videos ── */}
      <div className="flex gap-5 items-start">
        {/* Modules Sidebar */}
        <div className="bg-white flex flex-col gap-6 rounded-2xl px-6 py-4 shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)] w-76 shrink-0">
          <h2 className="font-semibold text-2xl leading-9 text-[#0F2A3C]">
            Modules
          </h2>
          <div className="flex flex-col gap-3">
            {modules.map((mod) => (
              <button
                key={mod.id}
                onClick={() => setActiveModuleId(mod.id)}
                className={cn(
                  "flex flex-col items-start px-4 py-3 rounded-lg w-full text-left transition-colors cursor-pointer",
                  mod.id === activeModuleId
                    ? "bg-[#E9F1F6]"
                    : "hover:bg-[#F4F6F8]",
                )}
              >
                <span className="font-semibold text-base leading-6 text-[#0F2A3C]">
                  {mod.name}
                </span>
                <span className="font-normal text-sm leading-5.5 text-[#919EAB]">
                  {mod.category}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeModule.videos.map((video) => (
              <BlogVideoCard
                key={video.id}
                title={video.title}
                description={video.description}
                thumbnail={blogThumbnail}
                slug={video.slug}
              />
            ))}
          </div>

          {activeModule.videos.length === 0 && (
            <div className="flex items-center justify-center h-64 bg-white rounded-2xl shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)]">
              <p className="text-[#919EAB] text-base">
                No videos available for this module yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardTrainingPage;
