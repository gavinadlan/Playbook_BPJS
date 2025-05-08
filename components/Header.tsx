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
    <header className="sticky top-0 left-0 w-full z-50 bg-white border-b border-gray-200 h-20">
      <div className="flex h-full items-stretch justify-between px-4 md:px-6">
        <div className="flex items-stretch gap-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image
              src="/images/logo.svg"
              alt="BPJS Kesehatan Logo"
              width={120}
              height={32}
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-stretch h-full gap-1">
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

        {/* Right Section - Actions */}
        <div className="flex items-center gap-4">
          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              className="border-[rgb(39,68,124)] text-[rgb(39,68,124)] hover:bg-[rgb(39,68,124)] hover:text-white transition-colors"
              asChild
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button
              className="bg-[rgb(73,163,90)] hover:bg-[rgb(63,143,80)] text-white transition-colors"
              asChild
            >
              <Link href="/registrasi">Register</Link>
            </Button>
          </div>

          {/* Toggle Switch */}
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

            {/* Mobile Buttons */}
            <div className="flex flex-col gap-2 pt-4">
              <Button
                variant="outline"
                className="w-full border-[rgb(39,68,124)] text-[rgb(39,68,124)] hover:bg-[rgb(39,68,124)] hover:text-white transition-colors"
                asChild
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                className="w-full bg-[rgb(73,163,90)] hover:bg-[rgb(63,143,80)] text-white transition-colors"
                asChild
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link href="/registrasi">Register</Link>
              </Button>
            </div>

            <div className="pt-4 relative z-20">
              <Switch />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

// Komponen untuk navigasi desktop (diupdate dengan border bawah)
const NavLink = ({
  href,
  label,
  currentPath,
}: {
  href: string;
  label: string;
  currentPath: string;
}) => {
  const isActive =
    href === "/" ? currentPath === href : currentPath.startsWith(href);

  return (
    <Link
      href={href}
      className={`
        relative flex items-center justify-center h-full px-6
        font-medium transition-colors
        ${
          isActive
            ? "text-[rgb(39,68,124)]"
            : "text-gray-600 hover:text-[rgb(39,68,124)]"
        }
      `}
    >
      {label}
      {isActive && (
        <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[rgb(39,68,124)]" />
      )}
    </Link>
  );
};

// Komponen untuk navigasi mobile (tetap sama)
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
}) => {
  const isActive =
    href === "/" ? currentPath === href : currentPath.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`px-4 py-3 w-full border-b last:border-b-0 ${
        isActive
          ? "text-[rgb(39,68,124)] font-medium border-[rgb(39,68,124)]"
          : "text-gray-600 border-transparent hover:border-gray-200"
      }`}
    >
      {label}
    </Link>
  );
};

export default Header;
