"use client";

import Link from "next/link";
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
import { ChevronLeftIcon } from "@/assets/icons";
import Logo from "@/components/shared/Logo";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const router = useRouter();

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordValues) => {
    console.log("Forgot password data:", data);
    router.push("/forgot-pass-verify");
  };

  return (
    <div className="flex items-center justify-center min-h-screen lg:col-span-4">
      <div className="max-w-132.5 w-full py-8 sm:py-10 lg:py-15 px-4 sm:px-6 lg:px-8 flex flex-col gap-8 sm:gap-10 lg:gap-12">
        <Logo className="2xl:hidden size-16 sm:size-18 lg:size-22 mx-auto" />
        <div className="space-y-4 sm:space-y-5 lg:space-y-6">
          <Link
            href="/login"
            className="flex items-center gap-2 text-[#637381] text-[13px] font-semibold hover:text-[#454F5B] transition-colors w-fit"
          >
            <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            Back
          </Link>

          <div className="flex flex-col gap-2 items-center text-center">
            <h1 className="text-2xl sm:text-[28px] lg:text-[32px] font-semibold leading-8 sm:leading-10 lg:leading-12 text-textPrimary">
              Forgot your password?
            </h1>
            <p className="text-sm sm:text-base leading-5 sm:leading-6 text-[#637381] font-normal">
              Please enter the email address associated with your account, and
              we&apos;ll email you 6-digit confirmation code to reset your
              password.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 sm:gap-7 lg:gap-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-11 sm:h-12 lg:h-13 bg-[#1E6FA8] hover:bg-[#1a5f8f] text-white font-semibold text-sm sm:text-base rounded-lg"
            >
              Send
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
