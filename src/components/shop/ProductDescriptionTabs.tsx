"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckIcon1, StarFilledIcon, StarEmptyIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";

// ─── Review sub-components ────────────────────────────────────────────────────

interface Review {
  id: number;
  name: string;
  date: string;
  rating: number;
  text: string;
  avatar: string;
}

const SAMPLE_REVIEWS: Review[] = [
  {
    id: 1,
    name: "Nicolas cage",
    date: "3 Days ago",
    rating: 5,
    avatar: "https://i.pravatar.cc/51?img=12",
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour",
  },
  {
    id: 2,
    name: "Nicolas cage",
    date: "3 Days ago",
    rating: 5,
    avatar: "https://i.pravatar.cc/51?img=33",
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour",
  },
  {
    id: 3,
    name: "Nicolas cage",
    date: "3 Days ago",
    rating: 5,
    avatar: "https://i.pravatar.cc/51?img=47",
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour",
  },
];

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="flex gap-6 items-start w-full">
    <div className="relative size-12.75 rounded-full overflow-hidden shrink-0">
      <Image
        src={review.avatar}
        alt={review.name}
        fill
        className="object-cover"
        unoptimized
      />
    </div>
    <div className="flex flex-col gap-5 flex-1 min-w-0">
      <div className="flex flex-col gap-2.5">
        <div className="flex gap-3 items-center">
          <p className="text-lg font-medium leading-7 text-[#0F2A3C]">
            {review.name}
          </p>
          <p className="text-xs font-normal leading-4.5 text-[#5E707C]">
            {review.date}
          </p>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) =>
            i < review.rating ? (
              <StarFilledIcon key={i} className="w-2.5 h-2.5" />
            ) : (
              <StarEmptyIcon key={i} className="w-2.5 h-2.5" />
            ),
          )}
        </div>
      </div>
      <p className="text-[15px] font-normal leading-6.5 text-[#667085]">
        {review.text}
      </p>
    </div>
  </div>
);

const ReviewTab = () => {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [thought, setThought] = useState("");

  const activeRating = hovered || selected;

  return (
    <div className="flex flex-col gap-20 pt-14">
      {/* Reviews List */}
      <div className="flex flex-col gap-12 max-w-245.5">
        <div className="flex flex-col gap-10">
          {SAMPLE_REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
        <button className="text-base font-normal text-[#1E6FA8] underline underline-offset-2 text-left hover:text-[#1A5F92] transition-colors cursor-pointer">
          View All Reviews
        </button>
      </div>

      {/* Rate this product form */}
      <div className="flex flex-col gap-12 items-end max-w-245.5">
        <div className="flex flex-col gap-5.25 w-full">
          <p className="text-2xl font-semibold leading-9 text-[#0F2A3C]">
            Rate this product
          </p>
          <div className="flex gap-3 items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                onMouseEnter={() => setHovered(i + 1)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => setSelected(i + 1)}
                aria-label={`Rate ${i + 1} star`}
                className="size-12 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
              >
                {i < activeRating ? (
                  <StarFilledIcon className="w-8 h-8" />
                ) : (
                  <StarEmptyIcon className="w-8 h-8 text-[#4B8CB9]" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full" style={{ height: 230 }}>
          <label className="text-base font-semibold leading-6 text-[#454F5B]">
            Write your Thought
          </label>
          <textarea
            value={thought}
            onChange={(e) => setThought(e.target.value)}
            placeholder="Enter your review..."
            className="flex-1 w-full bg-[#F9FAFB] border border-[#DFE3E8] rounded-xl px-5 py-3 text-base font-normal text-[#0F2A3C] placeholder:text-[#919EAB] resize-none focus:outline-none focus:border-[#1E6FA8] transition-colors"
          />
        </div>

        <button className="h-13 px-12 py-3 bg-[#1E6FA8] rounded-xl text-white text-base font-semibold leading-6 hover:bg-[#1A5F92] transition-colors shrink-0 cursor-pointer">
          Submit
        </button>
      </div>
    </div>
  );
};

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
            "px-4 py-2.5 text-xl leading-7.5 transition-colors border-b-2 translate-y-0.5 cursor-pointer",
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
            "px-4 py-2.5 text-xl leading-7.5 transition-colors border-b-2 translate-y-0.5 cursor-pointer",
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

      {activeTab === "review" && <ReviewTab />}
    </div>
  );
};

export default ProductDescriptionTabs;
