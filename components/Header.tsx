"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Style untuk button aktif
  const activeButtonStyle = {
    color: "#27447C",
  };

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-white border-b border-gray-200">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left Section - Logo + Navigation */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.svg"
              alt="BPJS Kesehatan Logo"
              width={120}
              height={32}
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Button variant={pathname === "/" ? "ghost" : "ghost"} asChild>
              <Link
                href="/"
                className={`px-3 ${
                  pathname === "/"
                    ? "text-[#27447C]"
                    : "text-gray-700 hover:text-[#27447C]"
                }`}
              >
                Home
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link
                href="/fitur-api"
                className={`px-3 ${
                  pathname.startsWith("/fitur-api")
                    ? "text-[#27447C]"
                    : "text-gray-700 hover:text-[#27447C]"
                }`}
              >
                Fitur API
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link
                href="/panduan"
                className={`px-3 ${
                  pathname.startsWith("/panduan")
                    ? "text-[#27447C]"
                    : "text-gray-700 hover:text-[#27447C]"
                }`}
              >
                Panduan
              </Link>
            </Button>
          </nav>
        </div>

        {/* Right Section - Hamburger Menu */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
            <nav className="flex flex-col p-4 space-y-2">
              <Link
                href="/"
                className={`px-4 py-2 ${
                  pathname === "/"
                    ? "text-[#27447C] bg-gray-100"
                    : "text-gray-700 hover:bg-gray-100"
                } rounded-md`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/fitur-api"
                className={`px-4 py-2 ${
                  pathname.startsWith("/fitur-api")
                    ? "text-[#27447C] bg-gray-100"
                    : "text-gray-700 hover:bg-gray-100"
                } rounded-md`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Fitur API
              </Link>
              <Link
                href="/panduan"
                className={`px-4 py-2 ${
                  pathname.startsWith("/panduan")
                    ? "text-[#27447C] bg-gray-100"
                    : "text-gray-700 hover:bg-gray-100"
                } rounded-md`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Panduan
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
