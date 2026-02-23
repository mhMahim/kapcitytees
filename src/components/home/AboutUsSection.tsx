import React from "react";
import Container from "../shared/Container";
import AboutUsImg from "@/assets/images/about-us-img.png";
import Image from "next/image";
import { StarIcon } from "@/assets/icons";

const AboutUsSection = () => {
  return (
    <Container as="section" className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-[32px] font-semibold text-[#212b36] leading-12 mb-2">
          About Us
        </h2>
        <p className="text-[16px] text-[#333b42] leading-6">
          Smart preparation. Real results. Built for exam success.
        </p>
      </div>

      <div className="flex gap-5">
        <div className="flex flex-col gap-5 lg:w-96.75">
          <div className="bg-white rounded-3xl shadow-[0px_4px_8px_0px_rgba(204,204,204,0.12)] p-6">
            <div className="flex items-center mb-6">
              {[1, 2, 3, 4].map((_, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 rounded-full bg-linear-to-br ${
                    index % 2 === 0
                      ? "from-[#e6f0ff] to-[#b0d0ff]"
                      : "from-[#ffeee6] to-[#ffccb0]"
                  } border-2 border-white ${index > 0 ? "-ml-4" : ""}`}
                />
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-[24px] font-semibold text-[#161c24] leading-9">
                50K+
              </h3>
              <p className="text-[18px] font-medium text-[#161c24] leading-7">
                Students Prepared Worldwide
              </p>
            </div>
          </div>

          <div className="bg-[#0066ff] rounded-3xl p-6">
            <div className="mb-6">
              <h3 className="text-[24px] font-semibold text-white leading-9 mb-4">
                WHAT WE DO
              </h3>
              <p className="text-[18px] font-medium text-[#f9fafb] leading-7">
                We help students improve faster with:
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {[
                "Accurate band prediction",
                "Automated speaking & writing evaluation",
                "Personalized daily study plans",
              ].map((text, index) => (
                <div key={index} className="flex items-center gap-2">
                  <StarIcon />
                  <span className="text-[14px] text-[#f9fafb]">{text}</span>
                </div>
              ))}
              <p className="text-[12px] text-white leading-4.5 mt-2">
                No guesswork. No blind practice.
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-0 relative">
          <div className="overflow-hidden rounded-3xl h-full absolute inset-0">
            <Image
              src={AboutUsImg}
              alt="About Us Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:w-96.75">
          <div className="bg-white rounded-3xl shadow-[0px_4px_8px_0px_rgba(204,204,204,0.12)] p-6">
            <div className="mb-6">
              <h3 className="text-[24px] font-semibold text-[#161c24] leading-9 mb-4">
                WHY WE EXIST
              </h3>
              <p className="text-[18px] font-medium text-[#161c24] leading-7">
                Most students:
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {[
                "Don't know their real band",
                "Get slow or unclear feedback",
                "Spend too much on coaching",
              ].map((text, index) => (
                <div key={index} className="flex items-center gap-2">
                  <StarIcon className="text-[#0066FF]" />
                  <span className="text-[14px] text-[#454f5b]">{text}</span>
                </div>
              ))}
              <p className="text-[12px] text-[#161c24] leading-4.5 mt-2">
                Instant. Consistent. Exam-Focused. Feedback.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-[0px_4px_8px_0px_rgba(204,204,204,0.12)] p-6">
            <h3 className="text-[24px] font-semibold text-[#161c24] leading-9 mb-5">
              WHO IT&apos;S FOR
            </h3>
            <div className="flex flex-col gap-4">
              {[
                "IELTS & PTE aspirants",
                "First-time test takers",
                "Repeat candidates stuck at the same band",
              ].map((text, index) => (
                <div key={index} className="flex items-center gap-2">
                  <StarIcon className="text-[#0066FF]" />
                  <span className="text-[14px] text-[#454f5b]">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AboutUsSection;
