"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import Container from "@/components/shared/Container";
import SectionHeaderWithLines from "@/components/shared/SectionHeaderWithLines";

interface FAQItem {
  question: string;
  answer: string;
}

interface BarberFAQSectionProps {
  title?: string;
  faqs?: FAQItem[];
}

const defaultFaqs: FAQItem[] = [
  {
    question: "How does shipping work?",
    answer:
      "We ship all orders via trusted courier partners. Standard shipping takes 3–5 business days, and express shipping is available at checkout for 1–2 business days. You'll receive a tracking email as soon as your order dispatches.",
  },
  {
    question: "Are these products actually used by professional barbers?",
    answer:
      "Yes. Every product in our catalog is hand-selected and verified by our network of certified barbers. We only feature professional-grade formulas that the pros use daily in their shops.",
  },
  {
    question: "Why should I buy through my barber's link?",
    answer:
      "Purchasing through your barber's unique link lets you get the exact products they recommend for your hair and skin type. It also supports your barber directly by generating a small commission at no extra cost to you.",
  },
  {
    question: "Can I return a product if it's not right for me?",
    answer:
      "Absolutely. We accept returns within 30 days of delivery as long as the product is at least 75% unused and in its original packaging. See our Returns & Refunds policy for full details.",
  },
];

const BarberFAQSection = ({
  title = "Have Questions? We Have Answers",
  faqs = defaultFaqs,
}: BarberFAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="pt-10 pb-20 lg:pb-30">
      <Container>
        <div className="flex flex-col items-center gap-12">
          <SectionHeaderWithLines title={title} />

          {/* Accordion list */}
          <div className="w-full max-w-307.5">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                index={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BarberFAQSection;

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
          "w-full flex gap-5 text-left transition-colors cursor-pointer",
          isOpen ? "items-start p-5" : "items-center px-5 py-4"
        )}
        aria-expanded={isOpen}
      >
        {/* Number */}
        <span
          className={cn(
            "shrink-0 text-lg font-semibold leading-[1.35]",
            isOpen ? "text-[#1E6FA8] pt-0.5" : "text-[#170F49]"
          )}
        >
          {num}
        </span>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <div className="flex items-center justify-between gap-4">
            <p
              className={cn(
                "text-lg font-semibold leading-[1.35]",
                isOpen ? "text-[#1E6FA8]" : "text-[#170F49]"
              )}
            >
              {question}
            </p>
            <span
              className={cn(
                "shrink-0 w-5 h-5 flex items-center justify-center transition-colors duration-300",
                isOpen ? "text-[#1E6FA8]" : "text-[#637381]"
              )}
            >
              <Plus
                size={20}
                className={cn(
                  "transition-all duration-300",
                  isOpen && "rotate-45"
                )}
              />
            </span>
          </div>

          {/* Answer */}
          {isOpen && (
            <p className="text-[#3F5563] text-base font-normal leading-[1.66] max-w-156.75">
              {answer}
            </p>
          )}
        </div>
      </button>

      {/* Divider */}
      <div className="border-t border-[#F4F6F8]" />
    </div>
  );
};
