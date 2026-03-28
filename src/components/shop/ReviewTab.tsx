import React, { useMemo, useState } from "react";
import Image from "next/image";
import { StarFilledIcon, StarEmptyIcon } from "@/assets/icons";
import useFetchData from "@/hooks/useFetchData";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { toast } from "sonner";

interface Review {
  id: number;
  name: string;
  date?: string;
  rating: number;
  text: string;
  avatar: string;
}

interface ApiReviewItem {
  id: number;
  review: string;
  rating: number;
  user?: {
    id: number;
    name: string;
    avatar?: string;
  };
}

interface ApiReviewResponse {
  status: boolean;
  message?: string;
  data?: {
    data?: ApiReviewItem[];
  };
}

interface ReviewTabProps {
  productId: number | string;
}

const FALLBACK_AVATAR = "https://i.pravatar.cc/51?img=12";

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="flex gap-3 sm:gap-6 items-start w-full">
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
          <p className="text-base sm:text-lg font-medium leading-7 text-[#0F2A3C]">
            {review.name}
          </p>
          {review.date && (
            <p className="text-xs font-normal leading-4.5 text-[#5E707C]">
              {review.date}
            </p>
          )}
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

const ReviewTab = ({ productId }: ReviewTabProps) => {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [thought, setThought] = useState("");
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
  } = useFetchData(
    `/reviews/${productId}`,
    false,
    {
      enabled: Boolean(productId),
    },
  );

  const reviews = useMemo<Review[]>(() => {
    const apiReviews = (data as ApiReviewResponse | undefined)?.data?.data || [];

    return apiReviews.map((item) => ({
      id: item.id,
      name: item.user?.name || "Anonymous",
      date: "Recent review",
      rating: Math.max(0, Math.min(5, item.rating || 0)),
      text: item.review || "No review provided.",
      avatar: item.user?.avatar || FALLBACK_AVATAR,
    }));
  }, [data]);

  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  const errorMessage =
    axios.isAxiosError(error) &&
    typeof error.response?.data?.message === "string"
      ? error.response.data.message
      : "Unable to load reviews right now. Please try again.";

  const activeRating = hovered || selected;

  const handleSubmitReview = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const token = localStorage.getItem("token");
    const parsedProductId = Number(productId);

    if (!token) {
      toast.error("Please login to submit your review.");
      return;
    }

    if (!baseUrl) {
      toast.error("Base URL is not configured.");
      return;
    }

    if (!Number.isFinite(parsedProductId) || parsedProductId <= 0) {
      toast.error("Product is not available for review.");
      return;
    }

    if (!selected) {
      toast.error("Please select a rating before submitting.");
      return;
    }

    if (!thought.trim()) {
      toast.error("Please write your review before submitting.");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        product_id: parsedProductId,
        rating: selected,
        comment: thought.trim(),
      };

      const response = await axios.post(
        `${baseUrl}/reviews/store`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(
        typeof response.data?.message === "string"
          ? response.data.message
          : "Review submitted successfully.",
      );

      setThought("");
      setSelected(0);
      setHovered(0);

      await refetch();
    } catch (submitError) {
      const submitErrorMessage =
        axios.isAxiosError(submitError) &&
        typeof submitError.response?.data?.message === "string"
          ? submitError.response.data.message
          : "Failed to submit review. Please try again.";

      toast.error(submitErrorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 sm:gap-14 lg:gap-20 pt-8 sm:pt-10 lg:pt-14">
      {/* Reviews List */}
      <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12 max-w-full lg:max-w-245.5">
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
          {isPending &&
            Array.from({ length: 3 }).map((_, index) => (
              <div key={`review-skeleton-${index}`} className="flex gap-3 sm:gap-6 items-start w-full">
                <Skeleton className="size-12.75 rounded-full shrink-0" />
                <div className="flex flex-col gap-3 sm:gap-4 flex-1 min-w-0">
                  <Skeleton className="h-6 w-44 rounded-md" />
                  <Skeleton className="h-3 w-24 rounded-md" />
                  <Skeleton className="h-16 sm:h-20 w-full rounded-xl" />
                </div>
              </div>
            ))}

          {!isPending && isError && (
            <div className="bg-[#FDEBEC] border border-[#F3C1C4] rounded-xl px-4 py-3 sm:px-5 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-sm sm:text-base text-[#B42318]">{errorMessage}</p>
              <button
                onClick={() => {
                  void refetch();
                }}
                className="h-10 px-5 rounded-lg bg-white border border-[#F3C1C4] text-[#B42318] text-sm font-semibold hover:bg-[#FEE4E2] transition-colors w-fit cursor-pointer"
              >
                Try Again
              </button>
            </div>
          )}

          {!isPending && !isError && reviews.length === 0 && (
            <div className="bg-[#F9FAFB] border border-[#DFE3E8] rounded-xl px-4 py-5 sm:px-5 sm:py-6 text-center">
              <p className="text-sm sm:text-base text-[#637381]">
                No reviews yet. Be the first to share your thoughts about this product.
              </p>
            </div>
          )}

          {!isPending && !isError &&
            visibleReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
        </div>

        {!isPending && !isError && reviews.length > 3 && (
          <button
            onClick={() => setShowAllReviews((prev) => !prev)}
            className="text-base font-normal text-[#1E6FA8] underline underline-offset-2 text-left hover:text-[#1A5F92] transition-colors cursor-pointer"
          >
            {showAllReviews ? "Show Less" : "View All Reviews"}
          </button>
        )}
      </div>

      {/* Rate this product form */}
      <div className="flex flex-col gap-6 sm:gap-10 lg:gap-12 items-end max-w-full lg:max-w-245.5">
        <div className="flex flex-col gap-5.25 w-full">
          <p className="text-lg sm:text-xl lg:text-2xl font-semibold leading-9 text-[#0F2A3C]">
            Rate this product
          </p>
          <div className="flex gap-1.5 sm:gap-3 items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                onMouseEnter={() => setHovered(i + 1)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => setSelected(i + 1)}
                aria-label={`Rate ${i + 1} star`}
                className="size-9 sm:size-10 lg:size-12 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
              >
                {i < activeRating ? (
                  <StarFilledIcon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                ) : (
                  <StarEmptyIcon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#4B8CB9]" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label className="text-base font-semibold leading-6 text-[#454F5B]">
            Write your Thought
          </label>
          <textarea
            value={thought}
            onChange={(e) => setThought(e.target.value)}
            placeholder="Enter your review..."
            className="min-h-30 sm:min-h-43.75 lg:min-h-50 w-full bg-[#F9FAFB] border border-[#DFE3E8] rounded-xl px-5 py-3 text-base font-normal text-[#0F2A3C] placeholder:text-[#919EAB] resize-none focus:outline-none focus:border-[#1E6FA8] transition-colors"
          />
        </div>

        <button
          onClick={() => {
            void handleSubmitReview();
          }}
          disabled={isSubmitting}
          className="h-11 w-full sm:w-auto sm:h-12 lg:h-13 px-8 sm:px-12 py-3 bg-[#1E6FA8] rounded-xl text-white text-sm sm:text-base font-semibold leading-6 hover:bg-[#1A5F92] transition-colors shrink-0 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default ReviewTab;
