"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Switch from "@/components/ui/switch";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
            <NavLink href="/" label="Home" currentPath={pathname} />
            <NavLink
              href="/fitur-api"
              label="Fitur API"
              currentPath={pathname}
            />
            <NavLink href="/panduan" label="Panduan" currentPath={pathname} />
            <NavLink href="/faq" label="FAQ" currentPath={pathname} />
          </nav>
        </div>

        {/* Right Section - Switch & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          {/* Toggle Filter (dark/light) */}
          <div className="hidden md:block relative z-20">
            <Switch />
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden relative z-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white relative z-0">
          <nav className="flex flex-col p-4 space-y-2">
            <MobileNavLink
              href="/"
              label="Home"
              currentPath={pathname}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileNavLink
              href="/fitur-api"
              label="Fitur API"
              currentPath={pathname}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileNavLink
              href="/panduan"
              label="Panduan"
              currentPath={pathname}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileNavLink
              href="/faq"
              label="FAQ"
              currentPath={pathname}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="pt-2 relative z-20">
              <Switch />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

// Komponen untuk navigasi desktop
const NavLink = ({
  href,
  label,
  currentPath,
}: {
  href: string;
  label: string;
  currentPath: string;
}) => (
  <Button variant="ghost" asChild>
    <Link
      href={href}
      className={`px-3 ${
        currentPath.startsWith(href)
          ? "text-[#27447C]"
          : "text-gray-900 hover:text-[#27447C]"
      }`}
    >
      {label}
    </Link>
  </Button>
);

// Komponen untuk navigasi mobile
const MobileNavLink = ({
  href,
  label,
  currentPath,
  onClick,
}: {
  href: string;
  label: string;
  currentPath: string;
  onClick: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className={`px-4 py-2 rounded-md ${
      currentPath.startsWith(href)
        ? "text-[#27447C] bg-gray-100"
        : "text-gray-700 hover:bg-gray-100"
    }`}
  >
    {label}
  </Link>
);

export default Header;
