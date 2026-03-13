"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useStateContext } from "@/hooks/useStateContext";
import { useQueryClient } from "@tanstack/react-query";

const profileSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be at most 100 characters"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 characters")
    .regex(/^[+\d\s\-().]+$/, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email address"),
  dateOfBirth: z.date({ error: "Date of birth is required" }),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  postalCode: z
    .string()
    .min(3, "Postal code must be at least 3 characters")
    .max(10, "Postal code must be at most 10 characters"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfileEditSection = () => {
  const router = useRouter();
  const { userData } = useStateContext();
  const profileData = userData?.data;
  const [isPending, setIsPending] = useState(false);

  const rawDefaults = useMemo(
    () => ({
      fullName: profileData?.name ?? "",
      phone: profileData?.phone ?? "",
      email: profileData?.email ?? "",
      dateOfBirth: profileData?.dob ?? "",
      address: profileData?.address ?? "",
      city: profileData?.city ?? "",
      state: profileData?.state ?? "",
      postalCode: profileData?.postal_code ?? "",
      shopName: profileData?.shop_name ?? "",
      barberLicense: profileData?.barber_license ?? "",
      gender: profileData?.gender ?? "",
      socialLink: profileData?.social_link ?? "",
      websiteLink: profileData?.website_link ?? "",
      otherLink: profileData?.other_link ?? "",
    }),
    [profileData],
  );

  const parsedDateOfBirth = useMemo(() => {
    if (!rawDefaults.dateOfBirth) return undefined;
    const parsedDate = new Date(rawDefaults.dateOfBirth);
    return Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate;
  }, [rawDefaults.dateOfBirth]);

  const initialFormValues = useMemo(
    () => ({
      fullName: rawDefaults.fullName,
      phone: rawDefaults.phone,
      email: rawDefaults.email,
      dateOfBirth: parsedDateOfBirth,
      address: rawDefaults.address,
      city: rawDefaults.city,
      state: rawDefaults.state,
      postalCode: rawDefaults.postalCode,
    }),
    [parsedDateOfBirth, rawDefaults],
  );

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialFormValues,
  });

  useEffect(() => {
    if (!form.formState.isDirty) {
      form.reset(initialFormValues);
    }
  }, [form, initialFormValues]);

  const queryClient = useQueryClient();

  const onSubmit = async (formValues: ProfileFormValues) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Authentication required. Please log in again.");
      return;
    }

    try {
      setIsPending(true);
      const payload = {
        name: formValues.fullName,
        phone: formValues.phone,
        shop_name: rawDefaults.shopName,
        barber_license: rawDefaults.barberLicense,
        gender: rawDefaults.gender,
        dob: format(formValues.dateOfBirth, "yyyy-MM-dd"),
        city: formValues.city,
        state: formValues.state,
        postal_code: formValues.postalCode,
        address: formValues.address,
        social_link: rawDefaults.socialLink,
        website_link: rawDefaults.websiteLink,
        other_link: rawDefaults.otherLink,
      };
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/update`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success("Profile updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["/profile"] });
      router.push("/account");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update profile. Please try again.",
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-[0px_4px_20px_0px_rgba(145,158,171,0.08)] px-4 py-5 sm:px-6 sm:py-6 lg:px-10 lg:py-8 flex flex-col gap-6 sm:gap-8 lg:gap-12 flex-1"
      >
        {/* Form Fields */}
        <div className="flex flex-col gap-5 sm:gap-6 lg:gap-8">
          {/* Row 1: Full name + Phone */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-base font-semibold leading-6 text-[#454F5B]">
                    Full name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border border-[#DFE3E8] rounded-lg px-4.5 py-4 h-14 text-base font-semibold text-[#0F2A3C] leading-6 outline-none focus-visible:ring-0 focus-visible:border-[#1E6FA8] transition-colors"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-base font-semibold leading-6 text-[#454F5B]">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border border-[#DFE3E8] rounded-lg px-4.5 py-4 h-14 text-base font-semibold text-[#0F2A3C] leading-6 outline-none focus-visible:ring-0 focus-visible:border-[#1E6FA8] transition-colors"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Row 2: Email + Date of Birth */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-base font-semibold leading-6 text-[#454F5B]">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      className="border border-[#DFE3E8] rounded-lg px-4.5 py-4 h-14 text-base font-semibold text-[#0F2A3C] leading-6 outline-none focus-visible:ring-0 focus-visible:border-[#1E6FA8] transition-colors"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-base font-semibold leading-6 text-[#454F5B]">
                    Date of Birth
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <button
                          type="button"
                          className={cn(
                            "border border-[#DFE3E8] rounded-lg px-4.5 py-4 h-14 w-full flex items-center gap-2.5 text-base font-semibold leading-6 outline-none focus:border-[#1E6FA8] transition-colors",
                            field.value ? "text-[#0F2A3C]" : "text-[#9CA3AF]",
                          )}
                        >
                          <span className="flex-1 text-left">
                            {field.value
                              ? format(field.value, "MM/dd/yyyy")
                              : "mm/dd/yyyy"}
                          </span>
                          <CalendarIcon className="size-6 text-[#637381] shrink-0" />
                        </button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        captionLayout="dropdown"
                        defaultMonth={field.value ?? new Date(2000, 0)}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Row 3: Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold leading-6 text-[#454F5B]">
                  Address
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border border-[#DFE3E8] rounded-lg px-4.5 py-4 h-14 text-base font-semibold text-[#0F2A3C] leading-6 outline-none focus-visible:ring-0 focus-visible:border-[#1E6FA8] transition-colors"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Row 4: City + State + Postal code */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-base font-semibold leading-6 text-[#454F5B]">
                    City
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border border-[#DFE3E8] rounded-lg px-4.5 py-4 h-14 text-base font-semibold text-[#0F2A3C] leading-6 outline-none focus-visible:ring-0 focus-visible:border-[#1E6FA8] transition-colors"
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
                  <FormLabel className="text-base font-semibold leading-6 text-[#454F5B]">
                    State
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border border-[#DFE3E8] rounded-lg px-4.5 py-4 h-14 text-base font-semibold text-[#0F2A3C] leading-6 outline-none focus-visible:ring-0 focus-visible:border-[#1E6FA8] transition-colors"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-base font-semibold leading-6 text-[#454F5B]">
                    Postal code
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border border-[#DFE3E8] rounded-lg px-4.5 py-4 h-14 text-base font-semibold text-[#0F2A3C] leading-6 outline-none focus-visible:ring-0 focus-visible:border-[#1E6FA8] transition-colors"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4.5">
          <button
            type="button"
            onClick={() => router.push("/account")}
            className="w-full sm:w-60 h-13 rounded-xl border border-[#B5BDC3] bg-white text-base font-semibold text-[#5E707C] tracking-[-0.32px] leading-7 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-60 h-13 rounded-xl bg-[#1E6FA8] text-base font-semibold text-white leading-6 hover:bg-[#1A5F91] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileEditSection;
