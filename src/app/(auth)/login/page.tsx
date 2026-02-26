"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/auth-ui/input";
import { Label } from "@/components/auth-ui/label";
import { PasswordInput } from "@/components/auth-ui/password-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import React from "react";
import { GoogleLoginBtn } from "@/assets/icons";
import { useStateContext } from "@/hooks/useStateContext";
import Logo from "@/components/shared/Logo";

interface RegisterPageProps {
  searchParams: Promise<{ type?: string }>;
}

const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginPage = ({ searchParams }: RegisterPageProps) => {
  const { setIsLoggedIn } = useStateContext();
  const { type } = React.use(searchParams);
  console.log(type);
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login data:", data);
    setIsLoggedIn(true);
    router.push("/account");
    // Handle login logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen lg:col-span-4">
      <div className="max-w-140 lg:max-w-160 w-full py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-7 lg:gap-8">
        <Logo className="2xl:hidden size-16 sm:size-18 lg:size-22" />
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-[28px] lg:text-[32px] font-semibold text-textPrimary">
            Welcome Back
          </h1>
          <p className="text-sm sm:text-base text-[#637381] font-medium">
            Log in to track your earnings.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:gap-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6 sm:gap-7 lg:gap-8"
            >
              <div className="flex flex-col gap-4">
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
                <div>
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
                  <div className="flex justify-end mt-2">
                    <Link
                      href="/forgot-password"
                      className="text-sm text-[#637381] relative after:content-[''] after:block after:w-full after:h-px after:bg-[#637381] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="h-11 sm:h-12 lg:h-14.5 text-sm sm:text-base"
              >
                Login
              </Button>
            </form>
          </Form>

          <div className="flex items-center gap-3 sm:gap-4 w-full">
            <div className="flex-1 h-px bg-[#EAECEF]"></div>
            <p className="text-nowrap text-[#C4CDD5]">or</p>
            <div className="flex-1 h-px bg-[#EAECEF]"></div>
          </div>

          <div className="border border-[#EAECEF] flex items-center justify-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-lg bg-[#EAECEF] hover:scale-102 active:scale-98 transition-transform cursor-pointer select-none">
            <GoogleLoginBtn />
            <p className="text-[#454F5B] text-base sm:text-lg font-medium">
              Log in with Google
            </p>
          </div>

          <div className="flex justify-center">
            <p className="text-base sm:text-lg text-[#637381] text-center font-medium">
              New here?{" "}
              <Link
                href="/choose-role"
                className="font-semibold text-[#454F5B] inline-block w-fit relative after:content-[''] after:block after:w-full after:h-px after:bg-[#454F5B] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
