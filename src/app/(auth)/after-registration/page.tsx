"use client";

import Link from "next/link";
import { useState } from "react";

const AfterRegistrationPage = () => {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);

  const testOptions = [
    { id: "pte-core", label: "PTE Core" },
    { id: "ielts-general", label: "IETLS General" },
    { id: "pte-academic", label: "PTE Academic" },
    { id: "ielts-academic", label: "IELTS Academic" },
  ];

  const handleTestSelect = (testId: string) => {
    setSelectedTest(testId);
  };

  const handleTryForFree = () => {
    if (selectedTest) {
      window.location.href = "/about-you";
    }
  };

  const handleViewPackages = () => {
    if (selectedTest) {
      window.location.href = "/view-packages";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen col-span-4 relative">
      {/* Logo */}
      <h1 className="text-[32px] font-semibold text-[#0066FF] text-center leading-12 mb-13.5">
        Logo Here
      </h1>

      {/* Main Card */}
      <div className="w-128.5 bg-white rounded-[20px] shadow-[0px_4px_8px_0px_rgba(204,204,204,0.12)] p-6 flex flex-col gap-10">
        {/* Title */}
        <h2 className="text-[32px] font-semibold text-[#212B36] text-center leading-12">
          Which Test Are You Taking
        </h2>

        {/* Content */}
        <div className="flex flex-col gap-6">
          {/* Test Options */}
          <div className="flex flex-col gap-5">
            {testOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleTestSelect(option.id)}
                className={`w-full h-13 px-4 py-2 rounded-xl border border-solid transition-all ${
                  selectedTest === option.id
                    ? "bg-[#E6F0FF] border-[#0066FF] border-2"
                    : "bg-white border-[#DFE3E8] hover:border-[#0066FF]"
                }`}
              >
                <p className="text-[18px] font-medium text-[#161C24] text-center leading-7">
                  {option.label}
                </p>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-5">
            <button
              onClick={handleTryForFree}
              disabled={!selectedTest}
              className="flex-1 px-4 py-4.25 bg-[#5570F1] hover:bg-[#4560E0] text-white rounded-xl shadow-[0px_4px_20px_0px_rgba(61,70,112,0.08)] text-[20px] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              Try For Free!
            </button>
            <button
              onClick={handleViewPackages}
              disabled={!selectedTest}
              className="flex-1 px-4 py-4.25 bg-white hover:bg-[#F9FAFB] text-[#5570F1] border-[#5570F1] border-2 border-solid rounded-xl text-[20px] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              View Packages
            </button>
          </div>
        </div>

        {/* Login Link */}
        <div className="flex gap-1 items-center justify-center text-[16px] leading-6">
          <p className="text-[#333B42]">Already A Member? Login</p>
          <Link
            href="/login"
            className="text-[#0066FF] font-semibold underline decoration-solid"
          >
            Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AfterRegistrationPage;
