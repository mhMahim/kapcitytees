"use client";

import Link from "next/link";
import { ShoppingCartIcon } from "@/assets/icons";
import Container from "../Container";
import Logo from "../Logo";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useStateContext } from "@/hooks/useStateContext";
import NavbarProfilePopover from "../NavbarProfilePopover";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "For Barbers", href: "/for-barbers" },
  { label: "For Clients", href: "/for-clients" },
  // { label: "Blog", href: "/blog" },
  // { label: "FAQ", href: "/faq" },
  // { label: "Contact Us", href: "/contact-us" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoggedIn } = useStateContext();
  const activePath = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const solidBg = isScrolled || mobileMenuOpen;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur-md transition-all duration-200 ease-out",
        solidBg
          ? "bg-white border-b border-[#E7EAEC]/60 shadow-sm"
          : "bg-transparent border-b border-transparent",
      )}
    >
      {/* ─── Main bar ─────────────────────────────────────── */}
      <Container className="flex items-center justify-between py-3 sm:py-4 lg:py-5">
        {/* Logo */}
        <Logo className="size-11 sm:size-13 lg:size-16" />

        {/* Desktop nav — centred between logo and actions */}
        <nav className="hidden lg:flex flex-1 items-center justify-center gap-8 xl:gap-12 px-6">
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

        {/* Right: auth controls + hamburger */}
        <div className="flex items-center gap-3 sm:gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4 lg:gap-8">
              <Link
                href="/cart"
                className="text-[#637381] hover:text-[#0F2A3C] transition-colors"
              >
                <ShoppingCartIcon className="" />
              </Link>
              <NavbarProfilePopover />
            </div>
          ) : (
            <Button asChild className="text-sm sm:text-base px-4 sm:px-5 h-9 sm:h-10 lg:h-11">
              <Link href="/login">Sign In</Link>
            </Button>
          )}

          {/* Hamburger — hidden on lg+ */}
          <button
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden flex items-center justify-center size-9 rounded-lg text-[#637381] hover:text-[#0F2A3C] hover:bg-[#F4F6F8] transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </Container>

      {/* ─── Mobile menu drawer ───────────────────────────── */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E7EAEC]/60 bg-white">
          <Container className="py-3 sm:py-4">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-3 py-2.5 rounded-xl text-base font-medium transition-colors",
                    activePath === link.href
                      ? "text-[#1E6FA8] bg-[#ECF2F8] font-semibold"
                      : "text-[#637381] hover:text-[#0F2A3C] hover:bg-[#F4F6F8]",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
};

export default Navbar;
