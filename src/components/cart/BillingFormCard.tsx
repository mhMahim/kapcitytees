"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod/v4";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import OrderSummary from "./OrderSummary";
import axios from "axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  CHECKOUT_CONTEXT_STORAGE_KEY,
  getLocalCheckoutDetails,
} from "@/lib/cart";
import { useRouter } from "next/navigation";

const BILLING_DRAFT_SESSION_STORAGE_KEY = "kapcitytees-billing-draft";

const billingSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phoneNumber: z.string().min(7, "Enter a valid phone number"),
  email: z.email("Enter a valid email address"),
  deliveryAddress: z.string().min(5, "Enter a valid delivery address"),
  city: z.string().min(2, "Enter a valid city name"),
  state: z.string().min(2, "Enter a valid state name"),
});

type BillingFormValues = z.infer<typeof billingSchema>;

interface BillingFormCardProps {
  subtotal: number;
  tax: number;
  shipping: number;
  onSubmit?: (values: BillingFormValues) => void;
}

const BillingFormCard = ({
  subtotal,
  tax,
  shipping,
  onSubmit,
}: BillingFormCardProps) => {
  const form = useForm<BillingFormValues>({
    resolver: zodResolver(billingSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      deliveryAddress: "",
      city: "",
      state: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedDraft = sessionStorage.getItem(BILLING_DRAFT_SESSION_STORAGE_KEY);

    if (!savedDraft) {
      return;
    }

    try {
      const parsedDraft = JSON.parse(savedDraft) as Partial<BillingFormValues>;

      form.reset({
        fullName:
          typeof parsedDraft.fullName === "string" ? parsedDraft.fullName : "",
        phoneNumber:
          typeof parsedDraft.phoneNumber === "string"
            ? parsedDraft.phoneNumber
            : "",
        email: typeof parsedDraft.email === "string" ? parsedDraft.email : "",
        deliveryAddress:
          typeof parsedDraft.deliveryAddress === "string"
            ? parsedDraft.deliveryAddress
            : "",
        city: typeof parsedDraft.city === "string" ? parsedDraft.city : "",
        state: typeof parsedDraft.state === "string" ? parsedDraft.state : "",
      });
    } catch {
      sessionStorage.removeItem(BILLING_DRAFT_SESSION_STORAGE_KEY);
    }
  }, [form]);

  const handleSubmit = async (values: BillingFormValues) => {
    onSubmit?.(values);

    const checkoutDetails = getLocalCheckoutDetails();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (checkoutDetails.items.length === 0) {
      toast.error("Your cart is empty. Add products before checkout.");
      return;
    }

    if (!baseUrl) {
      toast.error("Base URL is not configured.");
      return;
    }

    const checkoutPayload = {
      full_name: values.fullName,
      phone: values.phoneNumber,
      email: values.email,
      city: values.city,
      state: values.state,
      address: values.deliveryAddress,
      tax,
      shipping_charge: shipping,
      subtotal: checkoutDetails.subtotal,
      total: Number((checkoutDetails.subtotal + tax + shipping).toFixed(2)),
      total_items: checkoutDetails.total_items,
      items: checkoutDetails.items,
    };

    localStorage.setItem("billingInfo", JSON.stringify(checkoutPayload));
    localStorage.setItem(
      CHECKOUT_CONTEXT_STORAGE_KEY,
      JSON.stringify(checkoutPayload),
    );

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");
      if (!token) {
        sessionStorage.setItem(
          BILLING_DRAFT_SESSION_STORAGE_KEY,
          JSON.stringify(values),
        );
        sessionStorage.setItem(
          CHECKOUT_CONTEXT_STORAGE_KEY,
          JSON.stringify(checkoutPayload),
        );
        router.push("/login?redirect=/cart");
        toast.error("You need to be logged in to proceed with checkout.");
        return;
      }

      sessionStorage.removeItem(BILLING_DRAFT_SESSION_STORAGE_KEY);

      const authHeaders = token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined;

      const cartPayload = new URLSearchParams();
      checkoutDetails.items.forEach((item, index) => {
        cartPayload.append(
          `items[${index}][product_id]`,
          String(item.product_id),
        );
        cartPayload.append(`items[${index}][quantity]`, String(item.quantity));
      });

      await axios.post(`${baseUrl}/cart`, cartPayload, {
        headers: {
          ...(authHeaders ?? {}),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const response = await axios.post(
        `${baseUrl}/checkout/stripe`,
        checkoutPayload,
        {
          headers: authHeaders,
        },
      );
      window.location.href = response.data.url;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          (error.response?.data as { message?: string } | undefined)?.message ||
            "An error occurred while processing your payment. Please try again.",
        );

        return;
      }

      toast.error(
        "An error occurred while processing your payment. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "h-12 px-5 rounded-lg border-[#DFE3E8] placeholder:text-[#919EAB] text-base text-[#0F2A3C] focus-visible:border-[#1E6FA8] focus-visible:ring-[#1E6FA8]/20";
  const labelClass = "text-base font-semibold text-[#454F5B] mb-1";

  return (
    <div className="bg-white flex flex-col gap-10 p-4 sm:p-6 lg:p-8 rounded-[20px] shadow-[0px_4px_20px_0px_rgba(145,158,171,0.08)] flex-1 min-w-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-6 sm:gap-8 lg:gap-10"
        >
          {/* ── Billing Information ──────────────────────────────── */}
          <div className="flex flex-col gap-5 sm:gap-8">
            <h2 className="text-xl sm:text-2xl font-semibold leading-8 sm:leading-9 text-[#0F2A3C]">
              Billing Information
            </h2>

            <div className="flex flex-col gap-4">
              {/* Full Name + Phone Number */}
              <div className="flex flex-col sm:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className={labelClass}>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your name"
                          className={inputClass}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className={labelClass}>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+1 234 567 890"
                          className={inputClass}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>Email address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@mail.com"
                        className={inputClass}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Delivery Address */}
              <FormField
                control={form.control}
                name="deliveryAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>
                      Delivery Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your delivery address"
                        className={inputClass}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* City + State */}
              <div className="flex flex-col sm:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className={labelClass}>City</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your city name"
                          className={inputClass}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className={labelClass}>State</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your state name"
                          className={inputClass}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* ── Order Summary ─────────────────────────────────────── */}
          <OrderSummary subtotal={subtotal} tax={tax} shipping={shipping} />

          {/* ── Pay Now ───────────────────────────────────────────── */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-13 w-full bg-[#1E6FA8] rounded-xl text-white text-base font-semibold leading-6 hover:bg-[#1A5F92] transition-colors flex items-center justify-center cursor-pointer"
          >
            {isSubmitting ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </Form>
    </div>
  );
};

export default BillingFormCard;
