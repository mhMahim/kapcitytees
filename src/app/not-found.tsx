"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Container from "@/components/shared/Container";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <main className="flex-1 flex items-center justify-center py-20 lg:py-32 overflow-hidden relative">
        {/* Decorative Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
          <h1 className="text-[13rem] md:text-[18rem] lg:text-[30rem] xl:text-[35rem] 2xl:text-[40rem] font-bold text-primary/8 leading-none">
            404
          </h1>
        </div>

        <Container className="relative z-10 text-center">
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-2 animate-bounce">
              Error 404
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-textPrimary tracking-tight">
              Lost in the <br className="hidden md:block" /> Shop?
            </h2>

            <p className="text-[#637381] text-lg md:text-xl leading-relaxed max-w-lg mx-auto">
              Sorry, the page you&apos;re looking for doesn&apos;t exist or has
              been moved. Let&apos;s get you back on track to looking your best.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto px-10 h-14 text-base font-semibold group"
              >
                <Link href="/" className="flex items-center gap-2">
                  Back to Home
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-10 h-14 text-base font-semibold border-[#E7EAEC] text-textPrimary hover:bg-white hover:border-primary hover:text-primary"
              >
                <Link href="/contact-us">Contact Support</Link>
              </Button>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
};

export default NotFound;
