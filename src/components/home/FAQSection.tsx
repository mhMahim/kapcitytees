"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Container from "../shared/Container";
import SectionHeader from "../shared/SectionHeader";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "How does shipping and delivery work?",
    answer:
      "We partner with Amazon for fast, reliable shipping. Once your order is placed, you'll receive a tracking number via email. Most orders arrive within 3-5 business days.",
  },
  {
    question: "Are these products actually used by professional barbers?",
    answer:
      "Yes. Every product in our catalog is hand-selected and verified by our network of certified barbers. We only feature professional-grade formulas that the pros use daily in their shops.",
  },
  {
    question: "Why should I buy through my barber's link?",
    answer:
      "When you purchase through your barber's link, you get curated recommendations from someone who knows your hair and skin. Plus, you support your barber with a commission at no extra cost to you.",
  },
  {
    question: "Can I return a product if it's not right for me?",
    answer:
      "Absolutely. We offer a 30-day return policy on all products. If you're not satisfied, contact our support team and we'll arrange a hassle-free return.",
  },
];

interface AccordionItemProps {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem = ({
  item,
  index,
  isOpen,
  onToggle,
}: AccordionItemProps) => (
  <div className="border-b border-[#E7EAEC] last:border-b-0">
    <button
      onClick={onToggle}
      className="flex gap-5 items-start w-full px-5 py-4 text-left cursor-pointer"
    >
      <span
        className={cn(
          "text-lg font-semibold leading-[1.35] shrink-0",
          isOpen ? "text-[#1E6FA8]" : "text-[#170F49]",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="flex-1 flex items-center justify-between gap-4">
        <p
          className={cn(
            "text-lg font-semibold leading-[1.35]",
            isOpen ? "text-[#1E6FA8]" : "text-[#170F49]",
          )}
        >
          {item.question}
        </p>
        <div className="shrink-0">
          <Plus
            className={cn("w-5 h-5 transition-transform duration-300", isOpen ? "rotate-45 text-[#1E6FA8] " : "")}
          />
        </div>
      </div>
    </button>
    <div
      className={cn(
        "overflow-hidden transition-all duration-300",
        isOpen ? "max-h-96 pb-4" : "max-h-0",
      )}
    >
      <div className="pl-15 pr-5">
        <p className="text-base font-normal leading-[1.66] text-[#3F5563] max-w-156.75">
          {item.answer}
        </p>
      </div>
    </div>
  </div>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number>(1);

  return (
    <section className="w-full bg-white py-25">
      <Container>
        <div className="flex flex-col gap-16 items-center">
          <SectionHeader
            tag="Frequently Asked Questions"
            title="Common Questions"
          />
          <div className="w-full max-w-307.5 mx-auto">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.question}
                item={item}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FAQSection;
