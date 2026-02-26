"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Logo from "@/components/shared/Logo";

const verifySchema = z.object({
  otp: z.string().min(6, "Please enter all 6 digits"),
});

type VerifyFormValues = z.infer<typeof verifySchema>;

const RegistrationVerifyPage = () => {
  const router = useRouter();

  const form = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (data: VerifyFormValues) => {
    console.log("Verification code:", data);
    // Handle verification logic here
    router.push("/register-success");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex items-center justify-center min-h-screen lg:col-span-4">
      <div className="w-full max-w-125 px-4 sm:px-6 lg:px-0 py-8 sm:py-10 lg:py-12 flex flex-col gap-6 sm:gap-8">
        <Logo className="2xl:hidden size-16 sm:size-18 lg:size-22" />
        <div className="border border-[#DFE3E8] rounded-[20px] shadow-[0px_0px_40px_0px_rgba(204,204,204,0.16)] p-6 sm:p-8 lg:p-12 flex flex-col gap-6 sm:gap-7 lg:gap-8">
          <div className="flex flex-col gap-3 sm:gap-4">
            <h1 className="text-2xl sm:text-[28px] lg:text-[32px] font-semibold leading-8 sm:leading-10 lg:leading-12 text-textPrimary">
              Email Verify
            </h1>
            <p className="text-sm sm:text-base leading-5 sm:leading-6 text-[#333B42]">
              We&apos;ve sent a 6-digit code to your email. Please enter the
              code below to continue.
            </p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5 sm:gap-6"
            >
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        value={field.value}
                        onChange={field.onChange}
                        containerClassName="justify-between"
                      >
                        <InputOTPGroup className="gap-2 sm:gap-3 mx-auto">
                          <InputOTPSlot index={0} className="size-11 sm:size-14 lg:size-16 text-lg sm:text-xl lg:text-2xl" />
                          <InputOTPSlot index={1} className="size-11 sm:size-14 lg:size-16 text-lg sm:text-xl lg:text-2xl" />
                          <InputOTPSlot index={2} className="size-11 sm:size-14 lg:size-16 text-lg sm:text-xl lg:text-2xl" />
                          <InputOTPSlot index={3} className="size-11 sm:size-14 lg:size-16 text-lg sm:text-xl lg:text-2xl" />
                          <InputOTPSlot index={4} className="size-11 sm:size-14 lg:size-16 text-lg sm:text-xl lg:text-2xl" />
                          <InputOTPSlot index={5} className="size-11 sm:size-14 lg:size-16 text-lg sm:text-xl lg:text-2xl" />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Buttons */}
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleBack}
                  className="flex-1 h-11 sm:h-12 lg:h-14.5 text-sm sm:text-base"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-11 sm:h-12 lg:h-14.5 text-sm sm:text-base"
                >
                  Verify
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationVerifyPage;
