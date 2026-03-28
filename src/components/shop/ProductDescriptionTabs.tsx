"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import ReviewTab from "./ReviewTab";
import { CheckIcon1 } from "@/assets/icons";

interface BulletItem {
  text: string;
}

interface DescriptionSection {
  title: string;
  paragraph?: string;
  bullets?: BulletItem[];
}

interface ProductDescriptionTabsProps {
  sections: DescriptionSection[];
  productId: number | string;
}

const ProductDescriptionTabs = ({
  sections,
  productId,
}: ProductDescriptionTabsProps) => {
  const [activeTab, setActiveTab] = useState<"description" | "review">(
    "description",
  );

  return (
    <div className="flex flex-col gap-0 w-full">
      {/* Tab Bar */}
      <div className="flex gap-4 sm:gap-8 lg:gap-14 items-center border-b-2 border-[#E7EAEC]">
        <button
          onClick={() => setActiveTab("description")}
          className={cn(
            "px-2 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base lg:text-xl leading-7.5 transition-colors border-b-2 translate-y-0.5 cursor-pointer",
            activeTab === "description"
              ? "text-[#1E6FA8] font-semibold border-[#1E6FA8]"
              : "text-[#637381] font-normal border-transparent",
          )}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("review")}
          className={cn(
            "px-2 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base lg:text-xl leading-7.5 transition-colors border-b-2 translate-y-0.5 cursor-pointer",
            activeTab === "review"
              ? "text-[#1E6FA8] font-semibold border-[#1E6FA8]"
              : "text-[#637381] font-normal border-transparent",
          )}
        >
          Review
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "description" && (
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 pt-8 sm:pt-10 lg:pt-14">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="flex flex-col gap-4">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold leading-9 text-[#0F2A3C]">
                {section.title}
              </h3>
              {section.paragraph && (
                <p className="text-base font-normal leading-6 text-[#5E707C] max-w-full lg:max-w-263.5">
                  {section.paragraph}
                </p>
              )}
              {section.bullets && (
                <div className="flex flex-col gap-4">
                  {section.bullets.map((bullet, bulletIndex) => (
                    <div
                      key={bulletIndex}
                      className="flex gap-3.5 items-center"
                    >
                      {/* <CheckIcon className="w-5 h-5 shrink-0" /> */}
                      <div className="size-5 bg-[#E9F1F6] rounded-full flex items-center justify-center shrink-0">
                        <CheckIcon1 />
                      </div>
                      <p className="text-base font-normal leading-6 text-[#5E707C]">
                        {bullet.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === "review" && <ReviewTab productId={productId} />}
    </div>
  );
};

export default ProductDescriptionTabs;
