"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Data ──────────────────────────────────────────────────────────────────
type FAQItem = {
  question: string;
  answer: string;
};

type FAQCategory = {
  id: string;
  label: string;
  faqs: FAQItem[];
};

const faqData: FAQCategory[] = [
  {
    id: "orders-shipping",
    label: "Orders & Shipping",
    faqs: [
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
      {
        question: "Do you offer free shipping?",
        answer:
          "Yes! Orders over $50 qualify for free standard shipping. The free shipping threshold is automatically applied at checkout when your cart qualifies.",
      },
      {
        question: "Can I change or cancel my order after placing it?",
        answer:
          "You can modify or cancel an order within 1 hour of placing it by contacting our support team. After that window, the order enters our fulfillment process and changes may not be possible.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Currently we ship within the continental US. International shipping is on our roadmap and will be announced via our newsletter — subscribe to be the first to know!",
      },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit and debit cards (Visa, Mastercard, Amex, Discover), PayPal, Apple Pay, and Google Pay.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Yes. All transactions are processed through PCI-DSS compliant payment gateways. We never store your full card details on our servers.",
      },
      {
        question: "Do you offer installment or buy-now-pay-later options?",
        answer:
          "We're working on integrating Klarna and Afterpay. Stay tuned — this feature will be available soon.",
      },
      {
        question: "Can I use multiple payment methods on one order?",
        answer:
          "Currently, orders can only be paid with a single payment method. We are evaluating split-payment support for a future update.",
      },
    ],
  },
  {
    id: "returns-refunds",
    label: "Returns & Refunds",
    faqs: [
      {
        question: "What is your return policy?",
        answer:
          "We accept returns within 30 days of delivery. Products must be at least 75% unused and in their original packaging. Final-sale and hygiene-sealed items are non-returnable.",
      },
      {
        question: "How do I initiate a return?",
        answer:
          "Log in to your account, navigate to Order History, and select 'Request Return' next to the relevant item. Our support team will email you a prepaid return label within 1 business day.",
      },
      {
        question: "How long does a refund take?",
        answer:
          "Once we receive and inspect your return, refunds are processed within 3–5 business days back to your original payment method.",
      },
      {
        question: "What if I received a damaged or wrong item?",
        answer:
          "We apologise for the inconvenience. Please contact support within 48 hours of delivery with a photo of the issue and we'll send a replacement or full refund right away.",
      },
    ],
  },
  {
    id: "products",
    label: "Products",
    faqs: [
      {
        question: "Are products tested on animals?",
        answer:
          "No. All products sold on our platform are cruelty-free. We partner only with brands that align with our ethical sourcing standards.",
      },
      {
        question: "What brands do you carry?",
        answer:
          "We carry a curated selection of professional grooming brands including Layrite, Uppercut Deluxe, Bevel, and more. Our catalog is constantly updated based on barber feedback.",
      },
      {
        question: "Are the products safe for sensitive skin?",
        answer:
          "We label each product with a skin-type guide. Products marked 'Skin-Safe' are formulated without harsh sulfates, parabens, or artificial fragrances — ideal for sensitive skin.",
      },
      {
        question: "Can I request a product you don't currently carry?",
        answer:
          "Yes! Use the 'Request a Product' form on our Contact page. We review all requests monthly and prioritize by community demand.",
      },
    ],
  },
  {
    id: "account-support",
    label: "Account & Support",
    faqs: [
      {
        question: "How do I create an account?",
        answer:
          "Click 'Sign Up' in the top navigation, enter your email and a secure password, and verify your email address. The whole process takes under a minute.",
      },
      {
        question: "How do I reset my password?",
        answer:
          "Click 'Forgot Password' on the login page. We'll send a reset link to your registered email address, valid for 24 hours.",
      },
      {
        question: "How do I become a barber partner?",
        answer:
          "Visit our 'Become a Partner' page and complete the partner application form. Our team reviews applications within 2–3 business days.",
      },
      {
        question: "How can I contact customer support?",
        answer:
          "You can reach us via the Contact Us page, by email at support@kapcitytees.com, or through live chat (available Mon–Fri, 9am–6pm EST).",
      },
    ],
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
          "w-full flex gap-5 text-left transition-colors cursor-pointer",
          isOpen ? "items-start p-5" : "items-center px-5 py-4",
        )}
        aria-expanded={isOpen}
      >
        {/* Number */}
        <span
          className={cn(
            "shrink-0 text-[18px] font-semibold leading-[1.35]",
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
                "text-[18px] font-semibold leading-[1.35]",
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
            <p className="text-[#3F5563] text-base font-normal leading-[1.66]">
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

// ─── Main Component ────────────────────────────────────────────────────────
const FAQContent = () => {
  const [activeCategory, setActiveCategory] = useState("orders-shipping");
  const [openIndex, setOpenIndex] = useState<number | null>(1); // 2nd item open by default

  const currentCategory = faqData.find((c) => c.id === activeCategory)!;

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setOpenIndex(null);
  };

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16">
      <div className="max-w-382 mx-auto px-4 sm:px-5 lg:px-6 w-full">
        <div className="flex gap-5 items-start">
          {/* ── Sidebar ── */}
          <div className="flex flex-col gap-4 shrink-0 w-57.5">
            {faqData.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={cn(
                    "bg-white w-full flex items-center gap-4 px-6 py-4 rounded-2xl shadow-[0px_4px_20px_0px_rgba(145,158,171,0.08)] text-left transition-colors cursor-pointer",
                    isActive
                      ? "text-[#1E6FA8] font-semibold"
                      : "text-[#637381] font-medium hover:text-[#454F5B]",
                  )}
                >
                  <span className="text-[18px] leading-7 whitespace-nowrap">
                    {category.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Accordion Panel ── */}
          <div className="flex-1 bg-white rounded-2xl shadow-[0px_4px_20px_0px_rgba(145,158,171,0.08)] overflow-hidden">
            {currentCategory.faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                index={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQContent;
