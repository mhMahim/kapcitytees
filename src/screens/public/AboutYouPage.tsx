"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const AboutYouPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    timezone: "",
    country: "",
    referral: "",
  });

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    // Validate that all fields are filled
    if (formData.timezone && formData.country && formData.referral) {
      console.log("Form data:", formData);
      // Navigate to next step
    }
  };

  const isFormValid = formData.timezone && formData.country && formData.referral;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen col-span-4 relative">
      {/* Logo */}
      <h1 className="text-[32px] font-semibold text-[#0066FF] text-center leading-12 mb-20">
        Logo Here
      </h1>

      {/* Main Card */}
      <div className="w-199.5 bg-white rounded-[20px] shadow-[0px_4px_8px_0px_rgba(204,204,204,0.12)] p-6 flex flex-col gap-8">
        {/* Title */}
        <h2 className="text-[32px] font-semibold text-[#212B36] text-center leading-12">
          About You
        </h2>

        {/* Form Fields */}
        <div className="flex flex-col gap-5">
          {/* Time Zone Dropdown */}
          <div className="relative">
            <select
              value={formData.timezone}
              onChange={(e) =>
                setFormData({ ...formData, timezone: e.target.value })
              }
              className="w-full h-13 px-4 py-2 rounded-xl border border-[#DFE3E8] border-solid bg-white text-base text-[#919EAB] appearance-none cursor-pointer focus:outline-none focus:border-[#0066FF] transition-all"
            >
              <option value="">Time Zone</option>
              <option value="UTC-12:00">UTC-12:00 (Baker Island)</option>
              <option value="UTC-11:00">UTC-11:00 (American Samoa)</option>
              <option value="UTC-10:00">UTC-10:00 (Hawaii)</option>
              <option value="UTC-09:00">UTC-09:00 (Alaska)</option>
              <option value="UTC-08:00">UTC-08:00 (Pacific Time)</option>
              <option value="UTC-07:00">UTC-07:00 (Mountain Time)</option>
              <option value="UTC-06:00">UTC-06:00 (Central Time)</option>
              <option value="UTC-05:00">UTC-05:00 (Eastern Time)</option>
              <option value="UTC-04:00">UTC-04:00 (Atlantic Time)</option>
              <option value="UTC-03:00">UTC-03:00 (Buenos Aires)</option>
              <option value="UTC-02:00">UTC-02:00 (Mid-Atlantic)</option>
              <option value="UTC-01:00">UTC-01:00 (Azores)</option>
              <option value="UTC+00:00">UTC+00:00 (London, UTC)</option>
              <option value="UTC+01:00">UTC+01:00 (Paris, Berlin)</option>
              <option value="UTC+02:00">UTC+02:00 (Cairo, Athens)</option>
              <option value="UTC+03:00">UTC+03:00 (Moscow, Istanbul)</option>
              <option value="UTC+04:00">UTC+04:00 (Dubai)</option>
              <option value="UTC+05:00">UTC+05:00 (Pakistan)</option>
              <option value="UTC+05:30">UTC+05:30 (India)</option>
              <option value="UTC+06:00">UTC+06:00 (Bangladesh, Dhaka)</option>
              <option value="UTC+07:00">UTC+07:00 (Bangkok, Jakarta)</option>
              <option value="UTC+08:00">UTC+08:00 (Singapore, Beijing)</option>
              <option value="UTC+09:00">UTC+09:00 (Tokyo, Seoul)</option>
              <option value="UTC+10:00">UTC+10:00 (Sydney)</option>
              <option value="UTC+11:00">UTC+11:00 (Solomon Islands)</option>
              <option value="UTC+12:00">UTC+12:00 (New Zealand)</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#919EAB] pointer-events-none" />
          </div>

          {/* Country Dropdown */}
          <div className="relative">
            <select
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
              className="w-full h-13 px-4 py-2 rounded-xl border border-[#DFE3E8] border-solid bg-white text-base text-[#919EAB] appearance-none cursor-pointer focus:outline-none focus:border-[#0066FF] transition-all"
            >
              <option value="">What is the country you live in?</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="NZ">New Zealand</option>
              <option value="IN">India</option>
              <option value="PK">Pakistan</option>
              <option value="BD">Bangladesh</option>
              <option value="SG">Singapore</option>
              <option value="MY">Malaysia</option>
              <option value="PH">Philippines</option>
              <option value="AE">United Arab Emirates</option>
              <option value="SA">Saudi Arabia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="IT">Italy</option>
              <option value="ES">Spain</option>
              <option value="NL">Netherlands</option>
              <option value="CH">Switzerland</option>
              <option value="SE">Sweden</option>
              <option value="NO">Norway</option>
              <option value="DK">Denmark</option>
              <option value="FI">Finland</option>
              <option value="IE">Ireland</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#919EAB] pointer-events-none" />
          </div>

          {/* Referral Dropdown */}
          <div className="relative">
            <select
              value={formData.referral}
              onChange={(e) =>
                setFormData({ ...formData, referral: e.target.value })
              }
              className="w-full h-13 px-4 py-2 rounded-xl border border-[#DFE3E8] border-solid bg-white text-base text-[#919EAB] appearance-none cursor-pointer focus:outline-none focus:border-[#0066FF] transition-all"
            >
              <option value="">How did you here about us?</option>
              <option value="google">Google Search</option>
              <option value="social">Social Media</option>
              <option value="friend">Friend or Family</option>
              <option value="advertisement">Advertisement</option>
              <option value="blog">Blog or Article</option>
              <option value="youtube">YouTube</option>
              <option value="other">Other</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#919EAB] pointer-events-none" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-5">
          <button
            onClick={handleBack}
            className="flex-1 px-4 py-4.25 bg-white hover:bg-[#F9FAFB] text-[#5570F1] border-[#5570F1] border-2 border-solid rounded-xl text-[20px] transition-all cursor-pointer"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!isFormValid}
            className="flex-1 px-4 py-4.25 bg-[#5570F1] hover:bg-[#4560E0] text-white rounded-xl shadow-[0px_4px_20px_0px_rgba(61,70,112,0.08)] text-[20px] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutYouPage;
