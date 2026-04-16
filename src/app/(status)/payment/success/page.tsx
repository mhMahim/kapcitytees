"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { CheckCircle2, LoaderCircle, XCircle } from "lucide-react";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import {
  CHECKOUT_CONTEXT_STORAGE_KEY,
  clearLocalCart,
  getLocalCheckoutDetails,
} from "@/lib/cart";

interface StoredBillingInfo {
  full_name?: string;
  fullName?: string;
  phone?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  deliveryAddress?: string;
  city?: string;
  state?: string;
  tax?: number | string;
  shipping?: number | string;
  shippingCharge?: number | string;
  shipping_charge?: number | string;
  subtotal?: number | string;
  total?: number | string;
  total_items?: number | string;
  items?: unknown[];
}

type PaymentStatus = "loading" | "success" | "error";

const parseNumber = (value: unknown) => {
  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : 0;
};

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id") ?? "";

  const [status, setStatus] = useState<PaymentStatus>("loading");
  const [message, setMessage] = useState(
    "Please wait while we confirm your payment.",
  );

  const hasProcessed = useRef(false);

  const handlePaymentSuccess = useCallback(async () => {
    if (!sessionId) {
      setStatus("error");
      setMessage("Missing payment session id. Please try checkout again.");
      return;
    }

    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      setStatus("error");
      setMessage("Payment service is unavailable. Please contact support.");
      return;
    }

    try {
      const storedBillingData =
        localStorage.getItem(CHECKOUT_CONTEXT_STORAGE_KEY) ||
        localStorage.getItem("billingInfo");

      if (!storedBillingData) {
        setStatus("error");
        setMessage(
          "Billing information is missing. Please contact support if your card was charged.",
        );
        return;
      }

      const billingData = JSON.parse(storedBillingData) as StoredBillingInfo;
      const fallbackCheckoutDetails = getLocalCheckoutDetails();
      const checkoutItems = Array.isArray(billingData.items)
        ? billingData.items
        : fallbackCheckoutDetails.items;
      const subtotal =
        parseNumber(billingData.subtotal) || fallbackCheckoutDetails.subtotal;
      const totalItems =
        parseNumber(billingData.total_items) || fallbackCheckoutDetails.total_items;
      const totalAmount =
        parseNumber(billingData.total) ||
        Number(
          (
            subtotal +
            parseNumber(billingData.tax) +
            parseNumber(
              billingData.shipping_charge ??
                billingData.shippingCharge ??
                billingData.shipping,
            )
          ).toFixed(2),
        );

      const payload = {
        session_id: sessionId,
        tax: parseNumber(billingData.tax),
        shipping_charge: parseNumber(
          billingData.shipping_charge ??
            billingData.shippingCharge ??
            billingData.shipping,
        ),
        full_name: billingData.full_name ?? billingData.fullName ?? "",
        phone: billingData.phone ?? billingData.phoneNumber ?? "",
        email: billingData.email ?? "",
        city: billingData.city ?? "",
        state: billingData.state ?? "",
        address: billingData.address ?? billingData.deliveryAddress ?? "",
        subtotal,
        total: totalAmount,
        total_items: totalItems,
        items: checkoutItems,
      };

      const token = localStorage.getItem("token");

      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/stripe/success`,
        payload,
        {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
        },
      );

      localStorage.removeItem("billingInfo");
      localStorage.removeItem(CHECKOUT_CONTEXT_STORAGE_KEY);
      clearLocalCart();

      setStatus("success");
      setMessage(
        "Thank you for your purchase. Your payment has been verified and your order is now being processed.",
      );
    } catch (error) {
      const apiErrorMessage =
        axios.isAxiosError(error) &&
        typeof error.response?.data?.message === "string"
          ? error.response.data.message
          : "We couldn't verify your payment at the moment. Please contact support if this keeps happening.";

      setStatus("error");
      setMessage(apiErrorMessage);
    }
  }, [sessionId]);

  useEffect(() => {
    if (hasProcessed.current) {
      return;
    }

    hasProcessed.current = true;

    const verificationTimer = window.setTimeout(() => {
      void handlePaymentSuccess();
    }, 0);

    return () => {
      window.clearTimeout(verificationTimer);
    };
  }, [handlePaymentSuccess]);

  const title =
    status === "loading"
      ? "Confirming Payment"
      : status === "success"
        ? "Payment Successful!"
        : "Payment Verification Failed";

  return (
    <div className="bg-[#F9FAFB] min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="bg-white px-6 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-18 flex flex-col items-center rounded-4xl space-y-6 sm:space-y-7 lg:space-y-8 w-full max-w-150">
        <Logo className="size-20 sm:size-24 lg:size-32" />

        <div
          className={`flex items-center justify-center rounded-full size-16 sm:size-18 lg:size-20 ${
            status === "loading"
              ? "bg-[#E6F0F7]"
              : status === "success"
                ? "bg-[#E8F7EF]"
                : "bg-[#FDEBEC]"
          }`}
        >
          {status === "loading" ? (
            <LoaderCircle
              color="#1E6FA8"
              className="size-12 sm:size-14 lg:size-16 animate-spin"
            />
          ) : status === "success" ? (
            <CheckCircle2
              color="#1D9A5F"
              className="size-12 sm:size-14 lg:size-16"
            />
          ) : (
            <XCircle
              color="#D14343"
              className="size-12 sm:size-14 lg:size-16"
            />
          )}
        </div>

        <div className="space-y-3 sm:space-y-4 text-center">
          <h1 className="text-2xl sm:text-[28px] lg:text-[32px] font-semibold text-[#0F2A3C]">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-[#637381]">{message}</p>
        </div>

        {status === "loading" ? (
          <Button
            disabled
            className="h-11 sm:h-12 lg:h-14.5 text-sm sm:text-base w-full sm:w-80"
          >
            Verifying payment...
          </Button>
        ) : status === "success" ? (
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              asChild
              className="h-11 sm:h-12 lg:h-14.5 text-sm sm:text-base"
            >
              <Link href="/for-clients" className="px-8 sm:px-10">
                Continue Shopping
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-11 sm:h-12 lg:h-14.5 text-sm sm:text-base"
            >
              <Link href="/account/orders" className="px-8 sm:px-10">
                View Your Orders
              </Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              asChild
              className="h-11 sm:h-12 lg:h-14.5 text-sm sm:text-base"
            >
              <Link href="/cart" className="px-8 sm:px-10">
                Back to Cart
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-11 sm:h-12 lg:h-14.5 text-sm sm:text-base"
            >
              <Link href="/contact-us" className="px-8 sm:px-10">
                Contact Support
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const PaymentSuccessFallback = () => {
  return (
    <div className="bg-[#F9FAFB] min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="bg-white px-6 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-18 flex flex-col items-center rounded-4xl space-y-6 sm:space-y-7 lg:space-y-8 w-full max-w-150">
        <Logo className="size-20 sm:size-24 lg:size-32" />

        <div className="flex items-center justify-center rounded-full size-16 sm:size-18 lg:size-20 bg-[#E6F0F7]">
          <LoaderCircle
            color="#1E6FA8"
            className="size-12 sm:size-14 lg:size-16 animate-spin"
          />
        </div>

        <div className="space-y-3 sm:space-y-4 text-center">
          <h1 className="text-2xl sm:text-[28px] lg:text-[32px] font-semibold text-[#0F2A3C]">
            Confirming Payment
          </h1>
          <p className="text-sm sm:text-base text-[#637381]">
            Please wait while we confirm your payment.
          </p>
        </div>

        <Button
          disabled
          className="h-11 sm:h-12 lg:h-14.5 text-sm sm:text-base w-full sm:w-80"
        >
          Verifying payment...
        </Button>
      </div>
    </div>
  );
};

const page = () => {
  return (
    <Suspense fallback={<PaymentSuccessFallback />}>
      <PaymentSuccessPage />
    </Suspense>
  );
};

export default page;
