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
  LayoutDashboard,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAdmin, isLoading } = useAuth(); // Gunakan isLoading dari context

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    router.push("/login");
  };

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-white border-b border-gray-200 h-20 shadow-sm">
      <div className="flex h-full items-stretch justify-between px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex items-stretch gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center"
            aria-label="Home"
          >
            <Image
              src="/images/logo.svg"
              alt="BPJS Kesehatan Logo"
              width={140}
              height={40}
              className="h-8 w-auto"
              priority
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
            {isLoading ? (
              // Skeleton untuk desktop saat loading
              <div className="flex items-center gap-2">
                <Skeleton className="h-7 w-7 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-full"
                  aria-label="Menu pengguna"
                >
                  <div className="flex items-center gap-2 hover:bg-gray-100 rounded-full px-4 py-2 transition-colors duration-200">
                    <UserCircle className="h-7 w-7 text-[rgb(39,68,124)]" />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-800 truncate max-w-[140px]">
                        {user.name}
                      </p>
                      {user.email && (
                        <p className="text-xs text-gray-500 truncate max-w-[140px]">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="min-w-[280px] border-2 border-blue-50 shadow-xl rounded-xl py-2 bg-white"
                >
                  {isAdmin && (
                    <DropdownMenuItem
                      onClick={() => router.push("/admin/dashboard")}
                      className="cursor-pointer px-4 py-3 flex items-center gap-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200 focus:bg-blue-50"
                    >
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <LayoutDashboard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          Admin Dashboard
                        </span>
                        <span className="text-xs text-gray-500">
                          Kelola sistem
                        </span>
                      </div>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem
                    onClick={() => router.push("/pengajuan-pks")}
                    className="cursor-pointer px-4 py-3 flex items-center gap-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200 focus:bg-blue-50"
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
                    className="cursor-pointer px-4 py-3 flex items-center gap-3 text-gray-700 hover:bg-green-50 transition-colors duration-200 focus:bg-green-50"
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
                    className="cursor-pointer px-4 py-3 flex items-center gap-3 text-gray-700 hover:bg-purple-50 transition-colors duration-200 focus:bg-purple-50"
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
                    className="cursor-pointer px-4 py-3 flex items-center gap-3 text-red-600 hover:bg-red-50 transition-colors duration-200 focus:bg-red-50"
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
                  className="border-[rgb(39,68,124)] text-[rgb(39,68,124)] hover:bg-[rgb(39,68,124)] hover:text-white transition-colors focus:ring-2 focus:ring-[rgb(39,68,124)] focus:ring-offset-2"
                  asChild
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  className="bg-[rgb(73,163,90)] hover:bg-[rgb(63,143,80)] text-white transition-colors focus:ring-2 focus:ring-[rgb(63,143,80)] focus:ring-offset-2"
                  asChild
                >
                  <Link href="/registrasi">Register</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden relative z-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white relative z-50 max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col">
            {isLoading ? (
              // Skeleton untuk mobile saat loading
              <div className="flex items-center gap-3 p-4 border-b border-gray-200">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
            ) : user ? (
              <div className="flex items-center gap-3 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <UserCircle className="h-9 w-9 text-[rgb(39,68,124)]" />
                <div>
                  <p className="font-medium text-gray-900 truncate max-w-[200px]">
                    {user.name}
                  </p>
                  {user.email && (
                    <p className="text-sm text-gray-500 truncate max-w-[200px]">
                      {user.email}
                    </p>
                  )}
                </div>
              </div>
            ) : null}

            <div className="p-2 space-y-1">
              <MobileNavLink
                href="/"
                label="Home"
                currentPath={pathname}
                onClick={handleMobileNavClick}
              />
              <MobileNavLink
                href="/fitur-api"
                label="Fitur API"
                currentPath={pathname}
                onClick={handleMobileNavClick}
              />
              <MobileNavLink
                href="/panduan"
                label="Panduan"
                currentPath={pathname}
                onClick={handleMobileNavClick}
              />
              <MobileNavLink
                href="/faq"
                label="FAQ"
                currentPath={pathname}
                onClick={handleMobileNavClick}
              />

              {/* Menu khusus pengguna */}
              {user && !isLoading && (
                <>
                  {isAdmin && (
                    <MobileNavLink
                      href="/admin/dashboard"
                      label="Admin Dashboard"
                      currentPath={pathname}
                      onClick={handleMobileNavClick}
                    />
                  )}
                  <MobileNavLink
                    href="/pengajuan-pks"
                    label="Pengajuan PKS"
                    currentPath={pathname}
                    onClick={handleMobileNavClick}
                  />
                  <MobileNavLink
                    href="/pengajuan-saya"
                    label="Pengajuan Saya"
                    currentPath={pathname}
                    onClick={handleMobileNavClick}
                  />
                  <MobileNavLink
                    href="/docs"
                    label="Dokumentasi API"
                    currentPath={pathname}
                    onClick={handleMobileNavClick}
                  />
                </>
              )}
            </div>

            {/* Mobile Buttons */}
            <div className="p-4 border-t border-gray-100">
              {isLoading ? (
                // Skeleton untuk tombol mobile saat loading
                <div className="grid grid-cols-2 gap-3">
                  <Skeleton className="h-10 rounded-md" />
                  <Skeleton className="h-10 rounded-md" />
                </div>
              ) : user ? (
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 px-4 py-3"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  <span className="font-medium">Keluar</span>
                </Button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="border-[rgb(39,68,124)] text-[rgb(39,68,124)] hover:bg-[rgb(39,68,124)] hover:text-white transition-colors"
                    asChild
                    onClick={handleMobileNavClick}
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button
                    className="bg-[rgb(73,163,90)] hover:bg-[rgb(63,143,80)] text-white transition-colors"
                    asChild
                    onClick={handleMobileNavClick}
                  >
                    <Link href="/registrasi">Register</Link>
                  </Button>
                </div>
              )}
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
        relative flex items-center justify-center h-full px-5
        font-medium transition-colors
        ${
          isActive
            ? "text-[rgb(39,68,124)] font-semibold"
            : "text-gray-600 hover:text-[rgb(39,68,124)]"
        }
      `}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
      {isActive && (
        <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[rgb(39,68,124)] rounded-t" />
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
      className={`
        px-4 py-3 rounded-lg mx-2 flex items-center
        text-base font-medium transition-colors
        ${
          isActive
            ? "bg-blue-50 text-[rgb(39,68,124)]"
            : "text-gray-700 hover:bg-gray-100"
        }
      `}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
    </Link>
  );
};

export default Header;
