"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Container from "../shared/Container";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const contactFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phoneNumber: z.string().min(7, "Phone number is required"),
  email: z.string().email("Please enter a valid email address"),
  topic: z.string().min(1, "Please select a topic"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const TOPICS = [
  "General Inquiry",
  "Product Information",
  "Shipping & Delivery",
  "Refunds & Returns",
  "Other",
];

// ── Shared input class ───────────────────────────────────────────────────────
const inputCls =
  "w-full border border-[#DFE3E8] rounded-lg px-5 py-3 text-base text-[#0F2A3C] placeholder:text-[#919EAB] outline-none focus:border-[#1E6FA8] transition-colors bg-white";

const ContactFormSection = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      topic: "General Inquiry",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log("Contact form submission:", data);
    // TODO: wire up to API
  };

  return (
    <section className="w-full py-16">
      <Container>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* Row 1: Full Name + Phone Number */}
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-base font-semibold text-[#454F5B] leading-6">
                      Full Name <span className="text-[#DE5D56]">*</span>
                    </FormLabel>
                    <FormControl>
                      <input
                        placeholder="Enter your name"
                        className={inputCls}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-base font-semibold text-[#454F5B] leading-6">
                      Phone Number <span className="text-[#DE5D56]">*</span>
                    </FormLabel>
                    <FormControl>
                      <input
                        type="tel"
                        placeholder="123-456-7890"
                        className={inputCls}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Row 2: Email + Topic */}
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-base font-semibold text-[#454F5B] leading-6">
                      Email Address <span className="text-[#DE5D56]">*</span>
                    </FormLabel>
                    <FormControl>
                      <input
                        type="email"
                        placeholder="example@email.com"
                        className={inputCls}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-base font-semibold text-[#454F5B] leading-6">
                      Topic
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <select
                          className={cn(
                            inputCls,
                            "appearance-none pr-10 cursor-pointer",
                          )}
                          {...field}
                        >
                          {TOPICS.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={20}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0F2A3C] pointer-events-none"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Row 3: Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-base font-semibold text-[#454F5B] leading-6">
                    Your Message <span className="text-[#DE5D56]">*</span>
                  </FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="Describe Here"
                      rows={6}
                      className={cn(inputCls, "resize-none")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="bg-[#1E6FA8] hover:bg-[#1a5f91] transition-colors text-white font-semibold text-base leading-6 px-25 py-3 rounded-xl cursor-pointer"
              >
                Send Message
              </button>
            </div>
          </form>
        </Form>
      </Container>
    </section>
  );
};

export default ContactFormSection;

