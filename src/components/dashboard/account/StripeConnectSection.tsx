"use client";

import { Skeleton } from "@/components/ui/skeleton";
import useFetchData from "@/hooks/useFetchData";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

interface StripeConnectSectionProps {
  isPending: boolean;
  isError: boolean;
  hasStripeAccount: boolean;
  onConnect?: () => void;
}

interface StripeConnectStatus {
  has_account: boolean;
  is_active: boolean;
}

const StripeConnectSection = () => {
  const { data, isPending, isError } = useFetchData(
    "/barber/stripe-connect/status",
    true,
  );

  const stripeStatus = data?.data as StripeConnectStatus | undefined;
  const hasStripeAccount = stripeStatus?.is_active ?? false;

  const [isStripeConnecting, setIsStripeConnecting] = useState(false);
  const handleStripeConnect = async () => {
    setIsStripeConnecting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/barber/stripe-connect/account`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data.data.onboarding_url) {
        // No state reset – page will unload
        window.location.href = response.data.data.onboarding_url;
        return; // prevents further execution (just to be safe)
      }

      // No URL – we stay on this page, so reset loading state
      setIsStripeConnecting(false);
      toast.error("Failed to get Stripe onboarding URL. Please try again.");
    } catch (error) {
      console.error("Error connecting to Stripe:", error);
      setIsStripeConnecting(false);
      toast.error("Failed to connect to Stripe. Please try again.");
    }
  };

  const [isStripeDashboardLinkGenerated, setIsStripeDashboardLinkGenerated] =
    useState(false);
  const handleStripeDashboardLinkGeneration = async () => {
    setIsStripeDashboardLinkGenerated(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/barber/stripe-dashboard`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data.data.dashboard_url) {
        // Page will unload — no state reset needed
        window.location.href = response.data.data.dashboard_url;
        return;
      }

      // No URL — staying on this page, so reset loading state
      setIsStripeDashboardLinkGenerated(false);
      toast.error("Failed to get Stripe dashboard URL. Please try again.");
    } catch (error) {
      console.error("Error connecting to Stripe:", error);
      setIsStripeDashboardLinkGenerated(false);
      toast.error(
        "Failed to generate Stripe dashboard link. Please try again.",
      );
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8">
      <h3 className="text-base sm:text-lg lg:text-xl font-medium text-[#454F5B] leading-6 sm:leading-7 lg:leading-7.5">
        Stripe Connect
      </h3>
      {isPending ? (
        <div className="mt-3 flex flex-col gap-4">
          <Skeleton className="h-6 w-[45%]" />
          <Skeleton className="h-12 w-[25%]" />
        </div>
      ) : isError ? (
        <p className="text-sm sm:text-base text-[#B42318] mt-3">
          Unable to load Stripe status. Please try again.
        </p>
      ) : hasStripeAccount ? (
        <div className="mt-3 flex flex-col gap-4">
          <p className="text-sm sm:text-base text-[#637381]">
            Your account is connected with Stripe.
          </p>
          <button
            type="button"
            onClick={handleStripeDashboardLinkGeneration}
            disabled={isStripeDashboardLinkGenerated}
            className="w-fit rounded-lg bg-[#1E6FA8] px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white transition-colors hover:bg-[#195f8f] cursor-pointer disabled:bg-gray-400 disabled:cursor-auto"
          >
            {isStripeDashboardLinkGenerated
              ? "Generating..."
              : "View Stripe Dashboard"}
          </button>
        </div>
      ) : (
        <div className="mt-3 flex flex-col gap-4">
          <p className="text-sm sm:text-base text-[#637381]">
            Connect your Stripe account to receive payouts.
          </p>
          <button
            type="button"
            onClick={handleStripeConnect}
            disabled={isStripeConnecting}
            className="w-fit rounded-lg bg-[#1E6FA8] px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white transition-colors hover:bg-[#195f8f] cursor-pointer disabled:bg-gray-400 disabled:cursor-auto"
          >
            {isStripeConnecting ? "Connecting..." : "Connect Stripe"}
          </button>
        </div>
      )}
    </div>
  );
};

export default StripeConnectSection;
