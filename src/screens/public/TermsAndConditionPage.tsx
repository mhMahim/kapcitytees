"use client";

import parse from "html-react-parser";
import Container from "@/components/shared/Container";
import useFetchData from "@/hooks/useFetchData";

const TermsAndConditionPage = () => {
  const { data, isLoading, isError } = useFetchData("/terms-and-condition");

  const content =
    data?.data?.data?.content || data?.data?.content || data?.content || "";

  return (
    <main className="bg-[#F4F8FB] min-h-screen pb-8 sm:pb-10 lg:pb-14">
      <Container>
        <section className="rounded-2xl sm:rounded-3xl overflow-hidden bg-linear-to-r from-[#0F2A3C] via-[#164768] to-[#1E6FA8] p-6 sm:p-8 lg:p-10 text-white shadow-[0_16px_40px_rgba(15,42,60,0.22)]">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
            Terms and Conditions
          </h1>
          <p className="text-sm sm:text-[15px] text-white/85 mt-3 sm:mt-4 max-w-3xl">
            Please read these terms carefully before using Barber Certificated.
            By accessing our services, you agree to these conditions.
          </p>
        </section>

        <section className="mt-6 sm:mt-8 lg:mt-10 rounded-2xl sm:rounded-3xl border border-[#D7E4ED] bg-white shadow-[0_14px_35px_rgba(15,42,60,0.08)] p-5 sm:p-7 lg:p-10">
          {isLoading ? (
            <div className="space-y-3 sm:space-y-4 animate-pulse">
              <div className="h-6 w-48 bg-[#EAF1F6] rounded" />
              <div className="h-4 w-full bg-[#EEF4F8] rounded" />
              <div className="h-4 w-[92%] bg-[#EEF4F8] rounded" />
              <div className="h-4 w-[84%] bg-[#EEF4F8] rounded" />
              <div className="h-4 w-full bg-[#EEF4F8] rounded" />
              <div className="h-4 w-[88%] bg-[#EEF4F8] rounded" />
            </div>
          ) : isError ? (
            <div className="rounded-xl border border-[#F1D6D8] bg-[#FFF7F8] px-4 py-4 sm:px-5 sm:py-5">
              <h2 className="text-[#8C2E35] font-semibold text-base sm:text-lg">
                Unable to load terms
              </h2>
              <p className="text-[#9C5760] text-sm sm:text-base mt-1">
                Please refresh this page or try again in a few moments.
              </p>
            </div>
          ) : content ? (
            <article
              className="text-[#2F3E4A] leading-7 sm:leading-8 text-sm sm:text-base
                [&_h1]:text-[#0F2A3C] [&_h1]:text-2xl sm:[&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:mb-4 sm:[&_h1]:mb-5
                [&_h2]:text-[#0F2A3C] [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-7 sm:[&_h2]:mt-9 [&_h2]:mb-3
                [&_h3]:text-[#0F2A3C] [&_h3]:text-lg sm:[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2
                [&_p]:mb-4 [&_strong]:text-[#102F44] [&_strong]:font-semibold
                [&_ul]:list-disc [&_ul]:pl-5 sm:[&_ul]:pl-6 [&_ul]:mb-4 [&_li]:mb-2
                [&_ol]:list-decimal [&_ol]:pl-5 sm:[&_ol]:pl-6 [&_ol]:mb-4
                [&_a]:text-[#1E6FA8] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#0F2A3C]
                [&_table]:w-full [&_table]:border-collapse [&_table]:rounded-lg [&_table]:overflow-hidden [&_table]:my-5
                [&_th]:bg-[#EDF4F9] [&_th]:text-left [&_th]:p-3 [&_th]:text-[#0F2A3C]
                [&_td]:border-t [&_td]:border-[#E6EEF4] [&_td]:p-3"
            >
              {parse(content)}
            </article>
          ) : (
            <div className="rounded-xl border border-dashed border-[#D7E4ED] bg-[#F9FCFE] px-4 py-4 sm:px-5 sm:py-5">
              <p className="text-[#637381] text-sm sm:text-base">
                Terms and conditions content is currently unavailable.
              </p>
            </div>
          )}
        </section>
      </Container>
    </main>
  );
};

export default TermsAndConditionPage;
