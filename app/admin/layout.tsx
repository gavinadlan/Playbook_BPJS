"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LogOut, LayoutDashboard, Users, FileCheck } from "lucide-react";

// Gaya CSS untuk menyembunyikan Header dan Footer
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

  return (
    <>
      <style jsx global>
        {hideHeaderFooterStyle}
      </style>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          className="w-64 bg-gray-800 text-white p-4 fixed h-full"
        >
          <div className="space-y-6">
            <h2 className="text-xl font-bold px-2">Admin Panel</h2>
            <nav className="space-y-2">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              <Link
                href="/admin/users"
                className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"
              >
                <Users size={18} />
                Users
              </Link>
              <Link
                href="/admin/pks"
                className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"
              >
                <FileCheck size={18} />
                PKS Approval
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 p-2 hover:bg-gray-700 rounded"
              >
                <LogOut size={18} />
                Logout
              </button>
            </nav>
          </div>
        </motion.aside>
        <main className="ml-64 flex-1 p-8">{children}</main>
      </div>
    </>
  );
}
