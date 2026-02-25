"use client";

import Link from "next/link";
import Logo from "../shared/Logo";
import Container from "../shared/Container";
import { ChevronRight } from "lucide-react";

const LandingNavbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/40 border-b border-transparent">
      <Container className="flex items-center justify-between py-5">
        <Logo className="size-16" />
        <Link
          href="/register"
          className="flex items-center gap-2 bg-[#1E6FA8] text-white font-semibold text-base leading-6 px-7 py-3 rounded-xl hover:bg-[#1a6091] transition-colors"
        >
          Get Started
          <ChevronRight className="w-4 h-4" />
        </Link>
      </Container>
    </header>
  );
};

export default LandingNavbar;
