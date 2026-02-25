"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

interface ProfileEditSectionProps {
  defaultValues?: {
    fullName: string;
    phone: string;
    email: string;
    dateOfBirth: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

const ProfileEditSection = ({ defaultValues }: ProfileEditSectionProps) => {
  const router = useRouter();

  const rawDefaults = defaultValues ?? {
    fullName: "Johnathan Smith",
    phone: "+1 234 567 890",
    email: "johnathansmith@mail.com",
    dateOfBirth: "",
    address: "245 Greenfield Avenue, Apartment 12B",
    city: "New York",
    state: "United States",
    postalCode: "10001",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: rawDefaults.fullName,
      phone: rawDefaults.phone,
      email: rawDefaults.email,
      dateOfBirth: rawDefaults.dateOfBirth
        ? new Date(rawDefaults.dateOfBirth)
        : undefined,
      address: rawDefaults.address,
      city: rawDefaults.city,
      state: rawDefaults.state,
      postalCode: rawDefaults.postalCode,
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log("Profile saved:", data);
    // TODO: send data to API
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-[0px_4px_20px_0px_rgba(145,158,171,0.08)] px-10 py-8 flex flex-col gap-12 flex-1"
      >
        {/* Form Fields */}
        <div className="flex flex-col gap-8">
          {/* Row 1: Full name + Phone */}
          <div className="flex gap-6">
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
          <div className="flex gap-6">
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
          <div className="flex gap-6">
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
        <div className="flex justify-end gap-4.5">
          <button
            type="button"
            onClick={() => router.push("/account")}
            className="w-60 h-13 rounded-xl border border-[#B5BDC3] bg-white text-base font-semibold text-[#5E707C] tracking-[-0.32px] leading-7 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-60 h-13 rounded-xl bg-[#1E6FA8] text-base font-semibold text-white leading-6 hover:bg-[#1A5F91] transition-colors cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileEditSection;
