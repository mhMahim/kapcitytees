"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import useFetchData from "@/hooks/useFetchData";
import ReactHtmlParser from "react-html-parser";

// ─── Data ──────────────────────────────────────────────────────────────────
type FAQItem = {
  id?: number;
  question: string;
  answer: string;
};

type FAQCategory = {
  id: string;
  label: string;
  apiType: string;
};

const categories: FAQCategory[] = [
  {
    id: "orders-shipping",
    label: "Orders & Shipping",
    apiType: "orders_shipping",
  },
  { id: "payments", label: "Payments", apiType: "payments" },
  {
    id: "returns-refunds",
    label: "Returns & Refunds",
    apiType: "returns_refunds",
  },
  { id: "products", label: "Products", apiType: "products" },
  {
    id: "account-support",
    label: "Account & Support",
    apiType: "account_support",
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────
interface AccordionItemProps {
  index: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem = ({
  index,
  question,
  answer,
  isOpen,
  onToggle,
}: AccordionItemProps) => {
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="w-full">
      <button
        onClick={onToggle}
        className={cn(
          "w-full flex gap-3 sm:gap-5 text-left transition-colors cursor-pointer",
          isOpen
            ? "items-start p-3 sm:p-5"
            : "items-center px-3 py-3 sm:px-5 sm:py-4",
        )}
        aria-expanded={isOpen}
      >
        {/* Number */}
        <span
          className={cn(
            "shrink-0 text-sm sm:text-base lg:text-[18px] font-semibold leading-[1.35]",
            isOpen ? "text-[#1E6FA8]" : "text-[#170F49]",
          )}
        >
          {num}
        </span>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <div className="flex items-center justify-between gap-4">
            <p
              className={cn(
                "text-sm sm:text-base lg:text-[18px] font-semibold leading-[1.35]",
                isOpen ? "text-[#1E6FA8]" : "text-[#170F49]",
              )}
            >
              {question}
            </p>
            <span
              className={cn(
                "shrink-0 w-5 h-5 flex items-center justify-center transition-colors duration-300",
                isOpen ? "text-[#1E6FA8]" : "text-[#637381]",
              )}
            >
              <Plus
                size={20}
                className={cn(
                  "transition-all duration-300",
                  isOpen ? "rotate-45 " : "",
                )}
              />
            </span>
          </div>

          {/* Answer */}
          {isOpen && (
            <div className="text-[#3F5563] text-sm sm:text-base font-normal leading-[1.66] [&_p]:m-0">
              {ReactHtmlParser(answer)}
            </div>
          )}
        </div>
      </button>

      {/* Divider */}
      <div className="border-t border-[#F4F6F8]" />
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────
const FAQContent = () => {
  const [activeCategory, setActiveCategory] = useState("orders-shipping");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const activeType =
    categories.find((category) => category.id === activeCategory)?.apiType ??
    "orders_shipping";

  const { data: faqData, isPending } = useFetchData(
    `faqs?type=${activeType}`,
  );

  const faqs: FAQItem[] = Array.isArray(faqData?.data?.data)
    ? faqData.data.data
    : Array.isArray(faqData?.data)
      ? faqData.data
      : Array.isArray(faqData)
        ? faqData
        : [];

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setOpenIndex(null);
  };

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-8 sm:py-10 lg:py-16">
      <div className="max-w-382 mx-auto px-4 sm:px-5 lg:px-6 w-full">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
          {/* ── Sidebar ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex flex-row lg:flex-col gap-2 lg:gap-4 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 w-full lg:w-57.5 lg:shrink-0">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={cn(
                    "bg-white shrink-0 lg:w-full flex items-center gap-3 lg:gap-4 px-3 lg:px-6 py-2 lg:py-4 rounded-xl lg:rounded-2xl shadow-[0px_4px_20px_0px_rgba(145,158,171,0.08)] text-left transition-colors cursor-pointer",
                    isActive
                      ? "text-[#1E6FA8] font-semibold"
                      : "text-[#637381] font-medium hover:text-[#454F5B]",
                  )}
                >
                  <span className="text-sm sm:text-base lg:text-[18px] lg:leading-7 whitespace-nowrap">
                    {category.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Accordion Panel ── */}
          <div className="flex-1 bg-white rounded-2xl shadow-[0px_4px_20px_0px_rgba(145,158,171,0.08)] overflow-hidden min-h-40">
            {isPending ? (
              <div className="flex items-center justify-center h-40">
                <span className="text-sm text-[#637381]">Loading...</span>
              </div>
            ) : faqs.length === 0 ? (
              <div className="flex items-center justify-center h-40">
                <span className="text-sm text-[#637381]">
                  No FAQs available.
                </span>
              </div>
            ) : (
              faqs.map((faq, i) => (
                <AccordionItem
                  key={faq.id ?? i}
                  index={i}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === i}
                  onToggle={() => handleToggle(i)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQContent;
