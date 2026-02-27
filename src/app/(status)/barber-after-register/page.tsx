"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/auth-ui/input";
import { Label } from "@/components/auth-ui/label";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import Logo from "@/components/shared/Logo";

const barberApplicationSchema = z.object({
  shopName: z.string().min(2, "Shop name must be at least 2 characters"),
  address: z.string().min(3, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(3, "Zip code is required"),
  clientsPerMonth: z
    .string()
    .min(1, "Required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 1, {
      message: "Must be at least 1",
    }),
  phoneNumber: z.string().optional().or(z.literal("")),
  instagram: z.string().optional().or(z.literal("")),
  website: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => !val || /^https?:\/\/.+\..+/.test(val) || /^.+\..+/.test(val),
      { message: "Enter a valid URL" },
    ),
  other: z.string().optional().or(z.literal("")),
});

type BarberApplicationValues = z.infer<typeof barberApplicationSchema>;

const BarberAfterRegisterPage = () => {
  const router = useRouter();

  const form = useForm<BarberApplicationValues>({
    resolver: zodResolver(barberApplicationSchema),
    defaultValues: {
      shopName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      clientsPerMonth: "",
      phoneNumber: "",
      instagram: "",
      website: "",
      other: "",
    },
  });

  const onSubmit = (data: BarberApplicationValues) => {
    console.log("Barber Application data:", {
      ...data,
      clientsPerMonth: Number(data.clientsPerMonth),
    });
    router.push("/application-received");
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16 relative">
      {/* Logo */}
      <Logo className="lg:fixed top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 size-16 sm:size-18 lg:size-22 " />

      {/* Form Container */}
      <div className="w-full max-w-141 flex flex-col gap-6 sm:gap-7 lg:gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl sm:text-[28px] lg:text-[32px] font-semibold leading-8 sm:leading-10 lg:leading-12 text-textPrimary">
            Barber Application
          </h1>
          <p className="text-sm sm:text-base text-[#637381] font-semibold">
            Join our controlled distribution ecosystem. We review every
            application to ensure mutual success.
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 sm:gap-7 lg:gap-8"
          >
            <div className="flex flex-col gap-4">
              {/* Shop Name */}
              <FormField
                control={form.control}
                name="shopName"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <Label htmlFor="shopName">Shop Name *</Label>
                    <FormControl>
                      <Input
                        id="shopName"
                        type="text"
                        placeholder="Enter your shop name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location */}
              <div className="flex flex-col gap-2">
                <Label>Location *</Label>
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="address"
                            type="text"
                            placeholder="Enter your address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              id="city"
                              type="text"
                              placeholder="City"
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
                        <FormItem>
                          <FormControl>
                            <Input
                              id="state"
                              type="text"
                              placeholder="State"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              id="zipCode"
                              type="text"
                              placeholder="Zip code"
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

              {/* Clients Per Month */}
              <FormField
                control={form.control}
                name="clientsPerMonth"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <Label htmlFor="clientsPerMonth">Clients Per Month *</Label>
                    <FormControl>
                      <Input
                        id="clientsPerMonth"
                        type="number"
                        min={0}
                        placeholder="00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <FormControl>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="000 123 456"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Social Proof (Optional) */}
              <div className="flex flex-col gap-2">
                <Label>
                  Social Proof{" "}
                  <span className="text-[#919EAB] font-normal">(Optional)</span>
                </Label>
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="instagram"
                            type="text"
                            placeholder="Instagram profile"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="website"
                            type="url"
                            placeholder="Website"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="other"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="other"
                            type="text"
                            placeholder="Other"
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

            <Button
              type="submit"
              className="h-11 sm:h-12 lg:h-13 text-sm sm:text-base"
            >
              Submit Application
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BarberAfterRegisterPage;
