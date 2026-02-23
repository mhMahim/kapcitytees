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

const loginFormSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),

    barberLicense: z.string().optional().or(z.literal("")), // allow empty because it's optional field

    email: z.string().email("Invalid email address"),

    shopName: z.string().min(2, "Shop name is required"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type LoginFormValues = z.infer<typeof loginFormSchema>;

const BarberSignUpPage = () => {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      fullName: "",
      barberLicense: "",
      email: "",
      shopName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login data:", data);
    router.push("/application-received");
    // Handle login logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen col-span-4">
      <div className="max-w-160 w-full py-12 px-8 flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-[32px] font-semibold text-textPrimary">
            Partner with Barber Certified
          </h1>
          <p className="text-base text-[#637381] fonty-medium">
            Join the Barber Certified network. We ship, you earn.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-8"
            >
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <FormControl>
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Enter your Full name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="barberLicense"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <Label htmlFor="barberLicense">
                        Barber license{" "}
                        <span className="text-[#919EAB] font-normal">
                          (Optional)
                        </span>
                      </Label>
                      <FormControl>
                        <Input
                          id="barberLicense"
                          type="text"
                          placeholder="Enter your Barber license number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shopName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <Label htmlFor="shopName">Shop Name</Label>
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

              <Button type="submit">Create Account</Button>
            </form>
          </Form>

          <div className="flex justify-center">
            <p className="text-lg text-[#637381] text-center font-medium">
              Already Have an Account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#454F5B] inline-block w-fit relative after:content-[''] after:block after:w-full after:h-px after:bg-[#454F5B] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarberSignUpPage;
