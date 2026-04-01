"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Camera, User } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useStateContext } from "@/hooks/useStateContext";

interface ProfileEditSectionProps {
  onCancel: () => void;
}

const profileSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be at most 100 characters"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 characters")
    .regex(/^[+\d\s\-().]+$/, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email address"),
  shopName: z.string().min(1, "Shop name is required"),
  barberLicense: z.string().min(1, "Barber license is required"),
  shopAddress: z.string().min(5, "Shop address must be at least 5 characters"),
  avatar: z.custom<File | string | null>().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfileEditSection = ({ onCancel }: ProfileEditSectionProps) => {
  const { userData } = useStateContext();
  const profileData = userData?.data;
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const rawDefaults = useMemo(
    () => ({
      fullName: profileData?.name ?? "",
      phone: profileData?.phone ?? "",
      email: profileData?.email ?? "",
      shopName: profileData?.shop_name ?? "",
      barberLicense: profileData?.barber_license ?? "",
      shopAddress: profileData?.address ?? "",
      avatar: profileData?.avatar ?? "",
      gender: profileData?.gender ?? "",
      dob: profileData?.dob ?? "",
      city: profileData?.city ?? "",
      state: profileData?.state ?? "",
      postalCode: profileData?.postal_code ?? "",
      socialLink: profileData?.social_link ?? "",
      websiteLink: profileData?.website_link ?? "",
      otherLink: profileData?.other_link ?? "",
    }),
    [profileData],
  );

  const initialFormValues = useMemo(
    () => ({
      fullName: rawDefaults.fullName,
      phone: rawDefaults.phone,
      email: rawDefaults.email,
      shopName: rawDefaults.shopName,
      barberLicense: rawDefaults.barberLicense,
      shopAddress: rawDefaults.shopAddress,
      avatar: rawDefaults.avatar,
    }),
    [rawDefaults],
  );

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialFormValues,
  });

  useEffect(() => {
    if (!form.formState.isDirty) {
      form.reset(initialFormValues);
    }
  }, [form, initialFormValues]);

  const avatarValue = form.watch("avatar");

  const avatarPreviewUrl = useMemo(() => {
    if (avatarValue instanceof File) {
      return URL.createObjectURL(avatarValue);
    }

    return typeof avatarValue === "string" ? avatarValue : "";
  }, [avatarValue]);

  useEffect(() => {
    if (avatarValue instanceof File && avatarPreviewUrl) {
      return () => URL.revokeObjectURL(avatarPreviewUrl);
    }
  }, [avatarPreviewUrl, avatarValue]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0];
      if (selectedFile) {
        form.setValue("avatar", selectedFile, { shouldDirty: true });
      }
    },
    [form],
  );

  const { getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    disabled: isPending,
    multiple: false,
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    accept: {
      "image/*": [],
    },
    onDropRejected: () => {
      toast.error("Please upload an image up to 5MB.");
    },
  });

  const onSubmit = async (formValues: ProfileFormValues) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Authentication required. Please log in again.");
      return;
    }

    try {
      setIsPending(true);

      const payload = new FormData();
      payload.append("name", formValues.fullName);
      payload.append("phone", formValues.phone);
      payload.append("shop_name", formValues.shopName);
      payload.append("barber_license", formValues.barberLicense);
      payload.append("gender", rawDefaults.gender);
      payload.append("dob", rawDefaults.dob);
      payload.append("city", rawDefaults.city);
      payload.append("state", rawDefaults.state);
      payload.append("postal_code", rawDefaults.postalCode);
      payload.append("address", formValues.shopAddress);
      payload.append("social_link", rawDefaults.socialLink);
      payload.append("website_link", rawDefaults.websiteLink);
      payload.append("other_link", rawDefaults.otherLink);

      if (formValues.avatar instanceof File) {
        payload.append("avatar", formValues.avatar);
      }

      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/update`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success("Profile updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["/profile"] });
      onCancel();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.errors ||
          "Failed to update profile. Please try again.",
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit, () => {
        toast.error("Please fill all required fields correctly.");
      })}
      className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 flex flex-col gap-6 sm:gap-8 lg:gap-10 items-end w-full"
    >
      {/* Avatar + Name */}
      <div className="flex gap-4 sm:gap-6 items-center w-full">
        <div className="relative size-18 sm:size-25 lg:size-30 shrink-0">
          <Avatar className="size-full rounded-full overflow-hidden">
            <AvatarImage src={avatarPreviewUrl || undefined} alt="Profile" />
            <AvatarFallback className="bg-[#E7EAEC]">
              <User className="size-8 text-[#637381]" />
            </AvatarFallback>
          </Avatar>
          <input {...getInputProps()} />
          <button
            type="button"
            onClick={open}
            disabled={isPending}
            className="absolute bottom-0 right-0 bg-[#E9F1F6] rounded-2xl size-8 flex items-center justify-center cursor-pointer hover:bg-[#d5e3ed] transition-colors"
          >
            <Camera className="size-4 text-[#1E6FA8]" />
          </button>
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl sm:text-2xl lg:text-[32px] font-semibold text-[#4E545B] leading-8 sm:leading-10 lg:leading-12">
            {form.watch("fullName") || "Cameron Williamson"}
          </h2>
          <p className="text-sm sm:text-base text-[#747B81]">
            {form.watch("email") || "cameronwilliamson@email.com"}
          </p>
        </div>
      </div>

      {/* Profile Information Form */}
      <div className="flex flex-col gap-6 w-full rounded-2xl">
        {/* Section Header */}
        <div className="flex items-end pb-2 border-b border-[#F4F6F8]">
          <h3 className="text-lg font-medium text-[#454F5B] leading-7 flex-1">
            Profile Information
          </h3>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-8">
          {/* Row 1: Full Name + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FormField
              label="Full Name"
              value={form.register("fullName")}
              disabled={isPending}
            />
            <FormField
              label="Phone number"
              value={form.register("phone")}
              disabled={isPending}
            />
          </div>

          {/* Row 2: Email + Shop Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FormField
              label="Email"
              value={form.register("email")}
              disabled={isPending}
            />
            <FormField
              label="Shop name"
              value={form.register("shopName")}
              disabled={isPending}
            />
          </div>

          {/* Row 3: Barber License + Shop Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FormField
              label="Barber license"
              value={form.register("barberLicense")}
              disabled={isPending}
            />
            <FormField
              label="Shop address"
              value={form.register("shopAddress")}
              disabled={isPending}
              isTextArea
            />
          </div>
        </div>
      </div>

      {/* Save Changes Button */}
      <button
        type="submit"
        disabled={isPending}
        className="bg-[#1E6FA8] text-white font-semibold text-sm sm:text-base px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl hover:bg-[#1a5f92] transition-colors cursor-pointer"
      >
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

function FormField({
  label,
  value,
  disabled,
  isTextArea = false,
}: {
  label: string;
  value: ReturnType<typeof useForm<ProfileFormValues>>["register"] extends (
    ...args: any[]
  ) => infer R
    ? R
    : never;
  disabled?: boolean;
  isTextArea?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5 sm:gap-2">
      <label className="text-sm sm:text-base font-semibold text-[#454F5B] leading-5 sm:leading-6">
        {label}
      </label>
      {isTextArea ? (
        <textarea
          {...value}
          disabled={disabled}
          className="border border-[#DFE3E8] rounded-lg px-4 sm:px-5 py-3 text-sm sm:text-base lg:text-lg font-medium text-[#454F5B] leading-6 sm:leading-7 outline-none focus:border-[#1E6FA8] transition-colors resize-none min-h-20"
        />
      ) : (
        <input
          type="text"
          {...value}
          disabled={disabled}
          className="border border-[#DFE3E8] rounded-lg h-11 sm:h-12 px-4 sm:px-5 py-3 text-sm sm:text-base lg:text-lg font-medium text-[#454F5B] leading-6 sm:leading-7 outline-none focus:border-[#1E6FA8] transition-colors"
        />
      )}
    </div>
  );
}

export default ProfileEditSection;
