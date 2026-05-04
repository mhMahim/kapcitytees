"use client";

import { useState } from "react";
import AccountTabSlider, {
  type AccountTab,
} from "@/components/dashboard/account/AccountTabSlider";
import ProfileViewSection from "@/components/dashboard/account/ProfileViewSection";
import ProfileEditSection from "@/components/dashboard/account/ProfileEditSection";
import NotificationSection from "@/components/dashboard/account/NotificationSection";
import SecuritySection from "@/components/dashboard/account/SecuritySection";
import StripeConnectSection from "@/components/dashboard/account/StripeConnectSection";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState<AccountTab>("profile");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Tab Slider */}
      <AccountTabSlider
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setIsEditing(false);
        }}
      />

      {/* Content Area */}
      <div className="flex-1 min-w-0">
        {activeTab === "profile" && !isEditing && (
          <ProfileViewSection onEdit={() => setIsEditing(true)} />
        )}
        {activeTab === "profile" && isEditing && (
          <ProfileEditSection onCancel={() => setIsEditing(false)} />
        )}
        {activeTab === "notification" && <NotificationSection />}
        {activeTab === "payment" && <StripeConnectSection />}
        {activeTab === "security" && <SecuritySection />}
      </div>
    </div>
  );
};

export default AccountPage;
