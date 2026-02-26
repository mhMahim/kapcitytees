"use client";

import Link from "next/link";
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
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@/assets/icons";
import Logo from "@/components/shared/Logo";

const verificationSchema = z.object({
  code: z.string().min(6, "Please enter the 6-digit code"),
});

type VerificationValues = z.infer<typeof verificationSchema>;

const ForgotPasswordVerifyPage = () => {
  const router = useRouter();

  const form = useForm<VerificationValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = (data: VerificationValues) => {
    console.log("Verification code:", data);
    router.push("/reset-password");
  };

  const handleResendCode = () => {
    console.log("Resending code...");
    // Add resend logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen lg:col-span-4">
      <div className="max-w-132.5 w-full py-8 sm:py-10 lg:py-15 px-4 sm:px-6 lg:px-8 flex flex-col gap-8 sm:gap-10 lg:gap-12">
        <Logo className="2xl:hidden size-16 sm:size-18 lg:size-22 mx-auto" />
        {/* Back Button */}
        <Link
          href="/forgot-password"
          className="flex items-center gap-2 text-[#637381] text-[13px] font-semibold hover:text-[#454F5B] transition-colors w-fit"
        >
          <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          Back
        </Link>

        {/* Header Section */}
        <div className="flex flex-col gap-2 items-center text-center">
          <h1 className="text-2xl sm:text-[28px] lg:text-[32px] font-semibold leading-8 sm:leading-10 lg:leading-12 text-textPrimary">
            Please check your email!
          </h1>
          <p className="text-sm sm:text-base leading-5 sm:leading-6 text-[#637381] font-normal max-w-120">
            We&apos;ve emailed a 6-digit confirmation code, please enter the
            code in below box to verify your email.
          </p>
        </div>

        {/* OTP Input Section */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 sm:gap-10 lg:gap-12"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center gap-3 sm:gap-4">
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      {...field}
                      containerClassName="gap-2 sm:gap-3 lg:gap-4"
                    >
                      <InputOTPGroup className="gap-2 sm:gap-3 lg:gap-4">
                        {Array(6)
                          .fill(null)
                          .map((_, index) => (
                            <InputOTPSlot
                              key={index}
                              index={index}
                              className="size-11 sm:size-14 lg:size-16 bg-[#F4F6F8] border-[#EAECEF] text-lg sm:text-xl lg:text-2xl font-semibold text-[#637381] rounded-lg data-[active=true]:border-[#1E6FA8]"
                            />
                          ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-4 sm:gap-5 items-center">
              <Button
                type="submit"
                className="w-full h-11 sm:h-12 lg:h-13 bg-[#1E6FA8] hover:bg-[#1a5f8f] text-white font-semibold text-sm sm:text-base rounded-lg"
              >
                Verify
              </Button>

              <p className="text-base sm:text-lg text-[#637381] font-medium text-center">
                Didn&apos;t get the code?{" "}
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-[#454F5B] font-semibold hover:text-textPrimary transition-colors cursor-pointer w-fit relative after:content-[''] after:block after:w-full after:h-px after:bg-textPrimary after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                >
                  Resend code
                </button>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordVerifyPage;
