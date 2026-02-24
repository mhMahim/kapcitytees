"use client";

import { useState } from "react";
import { CheckIcon1 } from "@/assets/icons";
import { cn } from "@/lib/utils";

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
}

const ProductDescriptionTabs = ({ sections }: ProductDescriptionTabsProps) => {
  const [activeTab, setActiveTab] = useState<"description" | "review">(
    "description",
  );

  return (
    <div className="flex flex-col gap-0 w-full">
      {/* Tab Bar */}
      <div className="flex gap-14 items-center border-b-2 border-[#E7EAEC]">
        <button
          onClick={() => setActiveTab("description")}
          className={cn(
            "px-4 py-2.5 text-xl leading-7.5 transition-colors",
            activeTab === "description"
              ? "text-[#1E6FA8] font-semibold border-b-[3px] border-[#1E6FA8]"
              : "text-[#637381] font-normal",
          )}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("review")}
          className={cn(
            "px-4 py-2.5 text-xl leading-7.5 transition-colors",
            activeTab === "review"
              ? "text-[#1E6FA8] font-semibold border-b-[3px] border-[#1E6FA8]"
              : "text-[#637381] font-normal",
          )}
        >
          Review
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "description" && (
        <div className="flex flex-col gap-10 pt-14">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="flex flex-col gap-4">
              <h3 className="text-2xl font-semibold leading-9 text-[#0F2A3C]">
                {section.title}
              </h3>
              {section.paragraph && (
                <p className="text-base font-normal leading-6 text-[#5E707C] max-w-263.5">
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

      {activeTab === "review" && (
        <div className="pt-14">
          <p className="text-base font-normal leading-6 text-[#5E707C]">
            No reviews yet. Be the first to review this product.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductDescriptionTabs;
