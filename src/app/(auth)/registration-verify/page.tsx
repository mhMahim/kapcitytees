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
    <div className="flex items-center justify-center min-h-screen col-span-4">
      <div className="w-125 border border-[#DFE3E8] rounded-[20px] shadow-[0px_0px_40px_0px_rgba(204,204,204,0.16)] p-12 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-[32px] font-semibold leading-12 text-[#212B36]">
            Email Verify
          </h1>
          <p className="text-base leading-6 text-[#333B42]">
            We&apos;ve sent a 6-digit code to your email. Please enter the code
            below to continue.
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
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
                      <InputOTPGroup className="gap-3 mx-auto">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
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
                className="flex-1"
              >
                Back
              </Button>
              <Button type="submit" className="flex-1">
                Verify
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegistrationVerifyPage;
