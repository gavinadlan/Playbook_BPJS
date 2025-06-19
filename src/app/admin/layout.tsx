"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/layout/AdminHeader";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import { useAuth } from "@/context/AuthContext";
import { Menu, X } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import Loader from "@/components/ui/loading";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, isAdmin, isLoading } = useAuth();
  const [accessChecked, setAccessChecked] = useState(false);

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

  // Pengecekan akses utama
  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (!isAdmin) {
      toast.error(
        "Akses ditolak: Hanya admin yang dapat mengakses halaman ini"
      );
      router.replace("/");
      return;
    }

    setAccessChecked(true);
  }, [user, isAdmin, isLoading, router]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Tampilkan loading jika masih checking atau bukan admin
  if (isLoading || !accessChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
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
  );
}
