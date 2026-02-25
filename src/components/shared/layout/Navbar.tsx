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

const navLinks: any[] = [
  // { label: "Home", href: "/" },
  // { label: "Shop", href: "/shop" },
  // { label: "About us", href: "/about-us" },
  // { label: "Blog", href: "/blog" },
  // { label: "FAQ", href: "/faq" },
  // { label: "Contact Us", href: "/contact-us" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
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
        <div className="flex justify-end flex-1">
          {isLoggedIn ? (
            <div className="flex items-center gap-8">
              <Link
                href="/cart"
                className="text-[#637381] hover:text-[#0F2A3C] transition-colors"
              >
                <ShoppingCartIcon className="" />
              </Link>
              <NavbarProfilePopover />
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register?type=barber">Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
