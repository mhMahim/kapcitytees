"use client";

import { useState } from "react";
import Container from "../shared/Container";
import { Plus } from "lucide-react";
import Image from "next/image";
import FaqImage from "@/assets/images/journey-to-success-img.jpg";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What is this platform?",
      answer:
        "This platform is an AI-powered IELTS training system designed to help you prepare for your IELTS exam with personalized feedback, practice tests, and comprehensive study materials.",
    },
    {
      question: "Is the diagnostic test really free?",
      answer:
        "Yes! Our diagnostic test is completely free. You can take it to assess your current IELTS level and identify areas for improvement without any cost.",
    },
    {
      question: "How accurate is the band prediction?",
      answer:
        "Our AI-powered band prediction system has been trained on thousands of real IELTS tests and achieves over 95% accuracy compared to actual IELTS scores.",
    },
    {
      question: "Does AI really check speaking and writing?",
      answer:
        "Yes, our advanced AI technology evaluates your speaking and writing responses based on IELTS criteria including fluency, coherence, vocabulary, grammar, and pronunciation for speaking tasks.",
    },
    {
      question: "Will this replace a human trainer?",
      answer:
        "While our AI provides excellent feedback and guidance, we recommend combining it with human instruction for the best results. The platform is designed to complement traditional learning methods.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-20">
      <Container>
        <div className="flex flex-col gap-12 items-center">
          <h2 className="text-[32px] font-semibold text-[#161C24] leading-12 text-center">
            Answers to frequently
            <br />
            asked questions
          </h2>

          <div className="flex gap-5 items-start w-full">
            {/* FAQ List */}
            <div className="flex flex-col gap-5 w-198.25">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-[20px] shadow-[0px_4px_8px_0px_rgba(204,204,204,0.12)] overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between px-6 py-5.75 text-left transition-colors cursor-pointer"
                  >
                    <h3 className="text-2xl font-semibold text-[#454F5B] leading-9">
                      {faq.question}
                    </h3>
                    <Plus
                      className={`w-6 h-6 text-[#454F5B] transition-transform duration-300 ${
                        openIndex === index ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-6 pt-2">
                      <p className="text-base text-[#637381] leading-6">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Image */}
            <div className="w-96.75 h-122.5 rounded-[20px] shadow-[0px_4px_8px_0px_rgba(204,204,204,0.12)] overflow-hidden relative shrink-0">
              <Image
                src={FaqImage}
                alt="FAQ Support"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FAQSection;
