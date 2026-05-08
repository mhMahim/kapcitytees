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
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import OrderSummary from "./OrderSummary";
import axios from "axios";
import { toast } from "sonner";
import { useEffect, useMemo, useState } from "react";
import {
  CHECKOUT_CONTEXT_STORAGE_KEY,
  getLocalCheckoutDetails,
} from "@/lib/cart";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { City, State } from "country-state-city";
import { Check, ChevronsUpDown } from "lucide-react";

const BILLING_DRAFT_SESSION_STORAGE_KEY = "kapcitytees-billing-draft";
const USA_COUNTRY_CODE = "US";
const US_POSTAL_CODES = [
  "00501",
  "02108",
  "07030",
  "10001",
  "19103",
  "20001",
  "30301",
  "33101",
  "48201",
  "60601",
  "73301",
  "85001",
  "90001",
  "94105",
  "98101",
];

const billingSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phoneNumber: z.string().min(7, "Enter a valid phone number"),
  email: z.email("Enter a valid email address"),
  deliveryAddress: z.string().min(5, "Enter a valid delivery address"),
  city: z.string().min(2, "Enter a valid city name"),
  state: z.string().min(2, "Enter a valid state name"),
  postal_code: z.string().min(3, "Select a valid postal code"),
});

type BillingFormValues = z.infer<typeof billingSchema>;
type ComboboxOption = { value: string; label: string };

interface BillingFormCardProps {
  subtotal: number;
  tax: number;
  shipping: number;
  onSubmit?: (values: BillingFormValues) => void;
}

interface SearchableComboboxProps {
  value: string;
  displayValue?: string;
  options: ComboboxOption[];
  placeholder: string;
  searchPlaceholder: string;
  emptyLabel: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  className?: string;
}

const SearchableCombobox = ({
  value,
  displayValue,
  options,
  placeholder,
  searchPlaceholder,
  emptyLabel,
  disabled = false,
  onChange,
  className,
}: SearchableComboboxProps) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);
  const selectedLabel = displayValue ?? selectedOption?.label ?? placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "h-12 w-full justify-between rounded-lg border-[#DFE3E8] bg-white px-5 text-base font-normal text-[#0F2A3C] hover:bg-white hover:text-[#0F2A3C] focus-visible:border-[#1E6FA8] focus-visible:ring-[#1E6FA8]/20",
            !selectedOption && "text-[#919EAB]",
            className,
          )}
        >
          <span className="truncate">{selectedLabel}</span>
          <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyLabel}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "size-4",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

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
      postal_code: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const selectedStateCode = form.watch("state");
  const selectedCity = form.watch("city");

  const usaStates = useMemo(
    () => State.getStatesOfCountry(USA_COUNTRY_CODE),
    [],
  );

  const cityOptions = useMemo(() => {
    if (!selectedStateCode) {
      return [];
    }

    return City.getCitiesOfState(USA_COUNTRY_CODE, selectedStateCode);
  }, [selectedStateCode]);

  const stateSelectOptions = useMemo<ComboboxOption[]>(
    () =>
      usaStates.map((stateItem) => ({
        value: stateItem.isoCode,
        label: stateItem.name,
      })),
    [usaStates],
  );

  const selectedStateOption = useMemo(
    () =>
      stateSelectOptions.find(
        (stateOption) => stateOption.value === selectedStateCode,
      ),
    [selectedStateCode, stateSelectOptions],
  );

  const citySelectOptions = useMemo<ComboboxOption[]>(
    () =>
      cityOptions.map((cityItem) => ({
        value: cityItem.name,
        label: cityItem.name,
      })),
    [cityOptions], 
  );

  const postalCodeOptions = useMemo<ComboboxOption[]>(
    () =>
      US_POSTAL_CODES.map((postalCode) => ({
        value: postalCode,
        label: postalCode,
      })),
    [],
  );

  useEffect(() => {
    const savedDraft = sessionStorage.getItem(
      BILLING_DRAFT_SESSION_STORAGE_KEY,
    );

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
        postal_code:
          typeof parsedDraft.postal_code === "string"
            ? parsedDraft.postal_code
            : "",
      });
    } catch {
      sessionStorage.removeItem(BILLING_DRAFT_SESSION_STORAGE_KEY);
    }
  }, [form]);

  useEffect(() => {
    form.setValue("city", "");
    form.setValue("postal_code", "");
  }, [selectedStateCode, form]);

  useEffect(() => {
    form.setValue("postal_code", "");
  }, [selectedCity, form]);

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

    const referralCache = JSON.parse(
      sessionStorage.getItem("referral-click-cache") || "{}",
    );

    const checkoutPayload = {
      referral_code: referralCache?.ref || null,
      full_name: values.fullName,
      phone: values.phoneNumber,
      email: values.email,
      city: values.city,
      state: selectedStateCode,
      postal_code: values.postal_code,
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

              {/* State + City */}
              <div className="flex flex-col sm:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className={labelClass}>State</FormLabel>
                      <FormControl>
                        <SearchableCombobox
                          value={field.value}
                          displayValue={selectedStateOption?.label}
                          options={stateSelectOptions}
                          placeholder="Select state"
                          searchPlaceholder="Search state..."
                          emptyLabel="No state found."
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className={labelClass}>City</FormLabel>
                      <FormControl>
                        <SearchableCombobox
                          value={field.value}
                          options={citySelectOptions}
                          placeholder={
                            selectedStateCode ? "Select city" : "Select state first"
                          }
                          searchPlaceholder="Search city..."
                          emptyLabel="No city found."
                          disabled={!selectedStateCode}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Postal code */}
              <div className="flex flex-col sm:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="postal_code"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className={labelClass}>Postal Code</FormLabel>
                      <FormControl>
                        <SearchableCombobox
                          value={field.value}
                          options={postalCodeOptions}
                          placeholder={
                            selectedCity
                              ? "Select postal code"
                              : "Select city first"
                          }
                          searchPlaceholder="Search postal code..."
                          emptyLabel="No postal code found."
                          disabled={!selectedCity}
                          onChange={field.onChange}
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
