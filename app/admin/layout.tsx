"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LogOut,
  LayoutDashboard,
  Users,
  FileCheck,
  ChevronRight,
  Menu,
} from "lucide-react";

const hideHeaderFooterStyle = `
  header, footer {
    display: none !important;
  }
`;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const isAdmin = localStorage.getItem("isAdminLoggedIn") === "true";
      setIsLoggedIn(isAdmin);
      if (!isAdmin && pathname !== "/admin") {
        router.push("/admin");
      }
    };
    checkAuth();
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    router.push("/admin");
  };

  if (!isLoggedIn)
    return (
      <>
        <style jsx global>
          {hideHeaderFooterStyle}
        </style>
        {children}
      </>
    );

  const NavItem = ({
    href,
    icon: Icon,
    text,
  }: {
    href: string;
    icon: any;
    text: string;
  }) => (
    <Link
      href={href}
      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
        pathname === href
          ? "bg-white/10 text-white"
          : "hover:bg-white/5 text-gray-300"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm font-medium">{text}</span>
      {pathname === href && <ChevronRight className="w-4 h-4 ml-auto" />}
    </Link>
  );

  return (
    <>
      <style jsx global>
        {hideHeaderFooterStyle}
      </style>
      <div className="flex min-h-screen bg-gray-50">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-gray-800 text-white"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Sidebar - Fixed height 100vh to ensure full height */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="w-64 fixed h-screen z-40 lg:sticky lg:top-0 lg:block bg-gradient-to-b from-[rgb(39,68,124)] to-[rgb(73,163,90)] shadow-xl flex-shrink-0"
            >
              <div className="flex flex-col h-full p-4 overflow-y-auto">
                {/* Logo Section */}
                <div className="mb-8 px-2 py-4 border-b border-white/10">
                  <h2 className="text-xl font-bold text-white">Admin Portal</h2>
                  <p className="text-sm text-white/80 mt-1">
                    Management System
                  </p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-2">
                  <NavItem
                    href="/admin/dashboard"
                    icon={LayoutDashboard}
                    text="Dashboard"
                  />
                  <NavItem
                    href="/admin/users"
                    icon={Users}
                    text="User Management"
                  />
                  <NavItem
                    href="/admin/pks"
                    icon={FileCheck}
                    text="PKS Approval"
                  />
                </nav>

                {/* Logout Section */}
                <div className="mt-auto pt-4 border-t border-white/10">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-red-200 hover:bg-white/5 transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {/* Content Header */}
          <div className="bg-white shadow-sm">
            <div className="px-8 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-semibold text-gray-800 capitalize">
                    {pathname.split("/").pop()?.replace("-", " ")}
                  </h1>
                  <nav className="flex space-x-1 text-sm text-gray-500">
                    <Link
                      href="/admin/dashboard"
                      className="hover:text-[rgb(73,163,90)]"
                    >
                      Admin
                    </Link>
                    {pathname
                      .split("/")
                      .slice(2)
                      .map((path, index) => (
                        <span key={index}>
                          <span className="mx-1">/</span>
                          <span className="capitalize">
                            {path.replace("-", " ")}
                          </span>
                        </span>
                      ))}
                  </nav>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[rgb(73,163,90)] flex items-center justify-center text-white text-sm">
                    A
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
}
