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
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@/assets/icons";
import { Label } from "@/components/auth-ui/label";
import { PasswordInput } from "@/components/auth-ui/password-input";
import Logo from "@/components/shared/Logo";

const verificationSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type VerificationValues = z.infer<typeof verificationSchema>;

const ForgotPasswordVerifyPage = () => {
  const router = useRouter();

  const form = useForm<VerificationValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: VerificationValues) => {
    console.log("Verification code:", data);
    router.push("/password-updated");
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
            Enter your new password
          </h1>
          <p className="text-sm sm:text-base leading-5 sm:leading-6 text-[#637381] font-normal max-w-120">
            Secure Your Account with a New Password.
          </p>
        </div>

        {/* Form Section */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 sm:gap-10 lg:gap-12"
          >
            <div className="space-y-3 sm:space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <Label htmlFor="password">Password</Label>
                    <FormControl>
                      <PasswordInput
                        id="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <FormControl>
                      <PasswordInput
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full h-11 sm:h-12 lg:h-13 bg-[#1E6FA8] hover:bg-[#1a5f8f] text-white font-semibold text-sm sm:text-base rounded-lg"
            >
              Reset Password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordVerifyPage;
