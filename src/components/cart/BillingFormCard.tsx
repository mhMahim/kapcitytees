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

  const handleSubmit = (values: BillingFormValues) => {
    onSubmit?.(values);
  };

  const inputClass =
    "h-12 px-5 rounded-lg border-[#DFE3E8] placeholder:text-[#919EAB] text-base text-[#0F2A3C] focus-visible:border-[#1E6FA8] focus-visible:ring-[#1E6FA8]/20";
  const labelClass = "text-base font-semibold text-[#454F5B] mb-1";

  return (
    <div className="bg-white flex flex-col gap-10 p-8 rounded-[20px] shadow-[0px_4px_20px_0px_rgba(145,158,171,0.08)] flex-1 min-w-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-10"
        >
          {/* ── Billing Information ──────────────────────────────── */}
          <div className="flex flex-col gap-8">
            <h2 className="text-2xl font-semibold leading-9 text-[#0F2A3C]">
              Billing Information
            </h2>

            <div className="flex flex-col gap-4">
              {/* Full Name + Phone Number */}
              <div className="flex gap-4">
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
              <div className="flex gap-4">
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
            className="h-13 w-full bg-[#1E6FA8] rounded-xl text-white text-base font-semibold leading-6 hover:bg-[#1A5F92] transition-colors flex items-center justify-center cursor-pointer"
          >
            Pay Now
          </button>
        </form>
      </Form>
    </div>
  );
};

export default BillingFormCard;
