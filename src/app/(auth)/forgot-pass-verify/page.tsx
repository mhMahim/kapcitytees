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
    <div className="flex items-center justify-center min-h-screen col-span-4">
      <div className="max-w-132.5 w-full py-15 px-8 flex flex-col gap-12">
        {/* Back Button */}
        <Link
          href="/forgot-password"
          className="flex items-center gap-2 text-[#637381] text-[13px] font-semibold hover:text-[#454F5B] transition-colors"
        >
          <ChevronLeftIcon className="w-6 h-6" />
          Back
        </Link>

        {/* Header Section */}
        <div className="flex flex-col gap-2 items-center text-center">
          <h1 className="text-[32px] font-semibold leading-12 text-textPrimary">
            Please check your email!
          </h1>
          <p className="text-base leading-6 text-[#637381] font-normal max-w-120">
            We&apos;ve emailed a 6-digit confirmation code, please enter the
            code in below box to verify your email.
          </p>
        </div>

        {/* OTP Input Section */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-12"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center gap-4">
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      {...field}
                      containerClassName="gap-4"
                    >
                      <InputOTPGroup className="gap-4">
                        <InputOTPSlot
                          index={0}
                          className=" bg-[#F4F6F8] border-[#EAECEF] text-2xl font-semibold text-[#637381] rounded-lg data-[active=true]:border-[#1E6FA8]"
                        />
                        <InputOTPSlot
                          index={1}
                          className=" bg-[#F4F6F8] border-[#EAECEF] text-2xl font-semibold text-[#637381] rounded-lg data-[active=true]:border-[#1E6FA8]"
                        />
                        <InputOTPSlot
                          index={2}
                          className=" bg-[#F4F6F8] border-[#EAECEF] text-2xl font-semibold text-[#637381] rounded-lg data-[active=true]:border-[#1E6FA8]"
                        />
                        <InputOTPSlot
                          index={3}
                          className=" bg-[#F4F6F8] border-[#EAECEF] text-2xl font-semibold text-[#637381] rounded-lg data-[active=true]:border-[#1E6FA8]"
                        />
                        <InputOTPSlot
                          index={4}
                          className=" bg-[#F4F6F8] border-[#EAECEF] text-2xl font-semibold text-[#637381] rounded-lg data-[active=true]:border-[#1E6FA8]"
                        />
                        <InputOTPSlot
                          index={5}
                          className=" bg-[#F4F6F8] border-[#EAECEF] text-2xl font-semibold text-[#637381] rounded-lg data-[active=true]:border-[#1E6FA8]"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-5 items-center">
              <Button
                type="submit"
                className="w-full h-13 bg-[#1E6FA8] hover:bg-[#1a5f8f] text-white font-semibold text-base rounded-lg"
              >
                Verify
              </Button>

              <p className="text-lg text-[#637381] font-medium">
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
