"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { SearchIcon2, ShoppingCartIcon } from "@/assets/icons";
import Container from "../Container";
import Logo from "../Logo";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About us", href: "/about-us" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact-us" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const activePath = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur-md transition-all duration-200 ease-out",
        {
          "bg-white border-b border-[#E7EAEC]/60 shadow-sm": isScrolled,
          "bg-transparent border-b border-transparent": !isScrolled,
        },
      )}
    >
      <Container className="flex items-center justify-between py-5">
        {/* Logo */}
        <div className="flex-1">
          <Logo className="size-16" />
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex justify-center items-center gap-12 grow">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                activePath === link.href
                  ? "text-[#1E6FA8] font-semibold text-base"
                  : "text-[#637381] font-normal text-base hover:text-[#0F2A3C] transition-colors"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex justify-end items-center gap-8 flex-1">
          <button
            aria-label="Search"
            className="text-[#637381] hover:text-[#0F2A3C] transition-colors"
          >
            <SearchIcon2 />
          </button>
          <Link
            href="/cart"
            className="text-[#637381] hover:text-[#0F2A3C] transition-colors"
          >
            <ShoppingCartIcon className="" />
          </Link>
          <button
            aria-label="Profile"
            className="size-12 rounded-full bg-[#E7EAEC] overflow-hidden flex items-center justify-center"
          >
            <User className="w-5 h-5 text-[#637381]" />
          </button>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
