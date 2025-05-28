"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  UserCircle,
  LogOut,
  FileText,
  ClipboardList,
  FileCode2,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Switch from "@/components/ui/switch";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    // Hapus cookie auth
    document.cookie =
      "isAuthenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Hapus state dan local storage
    localStorage.removeItem("user");
    setUser(null);

    // Redirect ke halaman login
    window.location.href = "/login";
  };

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
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-full">
                  <div className="flex items-center gap-2 hover:bg-gray-100 rounded-full px-4 py-2 transition-colors duration-200">
                    <UserCircle className="h-7 w-7 text-[rgb(39,68,124)]" />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-800">
                        {user.name}
                      </p>
                      {user.email && (
                        <p className="text-xs text-gray-500 truncate max-w-[160px]">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-64 border-2 border-blue-50 shadow-xl rounded-xl py-2 bg-white"
                >
                  <DropdownMenuItem
                    onClick={() => router.push("/pengajuan-pks")}
                    className="cursor-pointer px-4 py-3 flex items-center gap-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200"
                  >
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <ClipboardList className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Pengajuan PKS</span>
                      <span className="text-xs text-gray-500">
                        Ajukan kerja sama baru
                      </span>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => router.push("/pengajuan-saya")}
                    className="cursor-pointer px-4 py-3 flex items-center gap-3 text-gray-700 hover:bg-green-50 transition-colors duration-200"
                  >
                    <div className="p-2 bg-green-100 rounded-lg">
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        Pengajuan Saya
                      </span>
                      <span className="text-xs text-gray-500">
                        Lihat status pengajuan
                      </span>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => router.push("/docs")}
                    className="cursor-pointer px-4 py-3 flex items-center gap-3 text-gray-700 hover:bg-purple-50 transition-colors duration-200"
                  >
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <FileCode2 className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        Dokumentasi API
                      </span>
                      <span className="text-xs text-gray-500">
                        Panduan integrasi sistem
                      </span>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-2 bg-gray-100 h-[2px]" />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer px-4 py-3 flex items-center gap-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <div className="p-2 bg-red-100 rounded-lg">
                      <LogOut className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Keluar</span>
                      <span className="text-xs text-gray-500">
                        Akhiri sesi ini
                      </span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
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
              </>
            )}
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
            {user && (
              <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                <UserCircle className="h-8 w-8 text-[rgb(39,68,124)]" />
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  {user.email && (
                    <p className="text-sm text-gray-500">{user.email}</p>
                  )}
                </div>
              </div>
            )}

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

            {/* Only show these navigation items when user is logged in */}
            {user && (
              <>
                <MobileNavLink
                  href="/pengajuan-pks"
                  label="Pengajuan PKS"
                  currentPath={pathname}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                <MobileNavLink
                  href="/pengajuan-saya"
                  label="Pengajuan Saya"
                  currentPath={pathname}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                <MobileNavLink
                  href="/docs"
                  label="Dokumentasi API"
                  currentPath={pathname}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              </>
            )}

            {/* Mobile Buttons */}
            <div className="flex flex-col gap-2 pt-4">
              {user ? (
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Keluar
                </Button>
              ) : (
                <>
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
                </>
              )}
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
