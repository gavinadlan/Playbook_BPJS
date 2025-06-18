"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/layout/AdminHeader";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import { useAuth } from "@/context/AuthContext";
import { Menu, X } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  }, [pathname]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-[rgb(39,68,124)] text-white shadow-lg"
            aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          >
            {sidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        )}

        <AdminSidebar
          isOpen={sidebarOpen}
          isMobile={isMobile}
          currentPath={pathname}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 min-h-screen overflow-hidden">
          <AdminHeader
            isMobile={isMobile}
            currentPath={pathname}
            user={user}
            toggleSidebar={toggleSidebar}
          />

          {/* Content Area */}
          <div className="p-4 md:p-6 lg:p-8">
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
