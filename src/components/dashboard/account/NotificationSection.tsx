"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  defaultEnabled: boolean;
}

const notificationItems: NotificationItem[] = [
  {
    id: "order-updates",
    title: "Order Updates",
    description: "Get notified when a client buys a product using your link.",
    defaultEnabled: true,
  },
  {
    id: "payment-notifications",
    title: "Payment Notifications",
    description:
      "Receive an alert when commissions are added to your balance or sent to your bank.",
    defaultEnabled: true,
  },
  {
    id: "new-arrivals",
    title: "New Arrivals",
    description:
      "Be the first to know when we add new professional products to the catalog.",
    defaultEnabled: false,
  },
  {
    id: "account-security",
    title: "Account Security",
    description:
      "Important alerts about your login, password changes, or Stripe connection.",
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

  const toggleNotification = (id: string) => {
    setNotifications((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="bg-white rounded-xl p-6 lg:p-8 flex flex-col gap-8 w-full">
      {notificationItems.map((item, index) => (
        <div key={item.id}>
          <div className="flex items-center gap-10">
            {/* Text content */}
            <div className="flex-1 flex flex-col gap-2">
              <h4 className="text-xl font-medium text-[#454F5B] leading-7.5">
                {item.title}
              </h4>
              <p className="text-base text-[#454F5B] leading-6">
                {item.description}
              </p>
            </div>

            {/* Toggle Switch */}
            <Switch
              size="custom"
              checked={notifications[item.id]}
              onCheckedChange={() => toggleNotification(item.id)}
              className="data-[state=checked]:bg-[#1E6FA8] data-[state=unchecked]:bg-[#DFE3E8]"
            />
          </div>

          {/* Divider (not after last item) */}
          {index < notificationItems.length - 1 && (
            <div className="border-b border-[#DFE3E8] mt-8" />
          )}
        </div>
      ))}
    </div>
  );
};

export default NotificationSection;
