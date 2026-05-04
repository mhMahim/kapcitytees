"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import useFetchData from "@/hooks/useFetchData";
import { toast } from "sonner";
import axios from "axios";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  defaultEnabled: boolean;
}

interface NotificationSettingsResponse {
  success?: boolean;
  status?: number;
  message?: string;
  data?: Record<string, boolean>;
}

const notificationItems: NotificationItem[] = [
  {
    id: "notify_order_updates",
    title: "Order Updates",
    description:
      "Receive notifications about the status of your orders, including confirmations, shipping updates, and delivery notifications.",
    defaultEnabled: false,
  },
  {
    id: "notify_new_arrivals",
    title: "New Arrivals",
    description:
      "Get notified when new products are added to our store, so you can be the first to know about the latest trends and offerings.",
    defaultEnabled: false,
  },
];

const NotificationSection = () => {
  const [notifications, setNotifications] = useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(
        notificationItems.map((item) => [item.id, item.defaultEnabled]),
      ),
  );

  const buildPayload = (state: Record<string, boolean>) => ({
    notify_order_updates: state.notify_order_updates ? 1 : 0,
    notify_new_arrivals: state.notify_new_arrivals ? 1 : 0,
  });

  const toggleNotification = async (id: string) => {
    const nextState = {
      ...notifications,
      [id]: !notifications[id],
    };
    const payload = buildPayload(nextState);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const endpoint = baseUrl
      ? `${baseUrl}/notifications/settings`
      : "/notifications/settings";
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        endpoint,
        payload,
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
      );
      setNotifications(nextState);
    } catch (error) {
      console.error("Error updating notification setting:", error);
      toast.error("Failed to update notification setting. Please try again.");
    }
  };

  const { data, isPending, isError } = useFetchData(
    `/notifications/settings`,
    true,
  );

  const notificationSettings = (
    data as NotificationSettingsResponse | undefined
  )?.data;

  useEffect(() => {
    if (!notificationSettings) {
      return;
    }

    setNotifications((prev) => {
      const next = { ...prev };

      notificationItems.forEach((item) => {
        const nextValue = notificationSettings[item.id];
        if (typeof nextValue === "boolean") {
          next[item.id] = nextValue;
        }
      });

      return next;
    });
  }, [notificationSettings]);

  if (isPending) {
    return (
      <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 flex flex-col gap-6 sm:gap-8 w-full">
        {notificationItems.map((_, index) => (
          <div key={`notification-skeleton-${index}`}>
            <div className="flex items-center gap-4 sm:gap-6 lg:gap-10">
              <div className="flex-1 flex flex-col gap-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-[70%]" />
              </div>
              <Skeleton className="h-6 w-12 rounded-full" />
            </div>

            {index < notificationItems.length - 1 && (
              <div className="border-b border-[#DFE3E8] mt-6 sm:mt-8" />
            )}
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 flex flex-col gap-6 sm:gap-8 w-full">
        <div className="rounded-xl border border-[#FBC5C2] bg-[#FFF2F2] px-4 py-4 sm:px-5 sm:py-5">
          <p className="text-sm sm:text-base text-[#B42318]">
            Failed to load notification settings. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 flex flex-col gap-6 sm:gap-8 w-full">
      {notificationItems.map((item, index) => (
        <div key={item.id}>
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-10">
            {/* Text content */}
            <div className="flex-1 flex flex-col gap-2">
              <h4 className="text-base sm:text-lg lg:text-xl font-medium text-[#454F5B] leading-6 sm:leading-7 lg:leading-7.5">
                {item.title}
              </h4>
              <p className="text-sm sm:text-base text-[#454F5B] leading-5 sm:leading-6">
                {item.description}
              </p>
            </div>

            {/* Toggle Switch */}
            <Switch
              size="custom"
              checked={notifications[item.id]}
              onCheckedChange={() => toggleNotification(item.id)}
              disabled={isPending}
              className="data-[state=checked]:bg-[#1E6FA8] data-[state=unchecked]:bg-[#DFE3E8] cursor-pointer"
            />
          </div>

          {/* Divider (not after last item) */}
          {index < notificationItems.length - 1 && (
            <div className="border-b border-[#DFE3E8] mt-6 sm:mt-8" />
          )}
        </div>
      ))}
    </div>
  );
};

export default NotificationSection;
