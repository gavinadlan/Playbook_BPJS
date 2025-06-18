import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  LayoutDashboard,
  Users,
  FileCheck,
  Settings,
  Home,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/sonner";
import AdminNavItem from "./AdminNavItem";
import Link from "next/link";

const AdminSidebar = ({
  isOpen,
  isMobile,
  currentPath,
  onClose,
}: {
  isOpen: boolean;
  isMobile: boolean;
  currentPath: string;
  onClose: () => void;
}) => {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logout berhasil");
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: isMobile ? -300 : 0 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`w-64 z-40 ${
              isMobile
                ? "fixed h-screen shadow-xl"
                : "sticky top-0 h-screen flex-shrink-0"
            } bg-gradient-to-b from-[rgb(39,68,124)] to-[rgb(73,163,90)]`}
            onClick={isMobile ? (e) => e.stopPropagation() : undefined}
          >
            <div className="flex flex-col h-full p-4 overflow-y-auto">
              {/* Logo Section */}
              <div className="mb-6 px-2 py-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  <span>Admin Portal</span>
                </h2>
                <p className="text-xs text-white/80 mt-1">BPJS Kesehatan</p>
              </div>

              {/* Navigation */}
              <nav className="flex-1 space-y-2">
                <AdminNavItem
                  href="/admin/dashboard"
                  icon={LayoutDashboard}
                  text="Dashboard"
                  currentPath={currentPath}
                />
                <AdminNavItem
                  href="/admin/users"
                  icon={Users}
                  text="Manajemen User"
                  currentPath={currentPath}
                />
                <AdminNavItem
                  href="/admin/pks"
                  icon={FileCheck}
                  text="Manajemen PKS"
                  currentPath={currentPath}
                />
              </nav>

              {/* User Info */}
              {user && (
                <div className="mt-4 p-3 bg-white/10 rounded-lg text-white text-sm">
                  <p className="font-medium truncate">{user.name}</p>
                  <p className="text-xs text-white/80 truncate">{user.email}</p>
                </div>
              )}

              {/* Logout Section */}
              <div className="mt-auto pt-4">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-red-200 hover:bg-white/10 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium">Logout</span>
                </button>

                {/* Back to main site */}
                <Link
                  href="/"
                  className="mt-2 w-full flex items-center gap-3 p-3 rounded-lg text-white hover:bg-white/10 transition-all"
                  onClick={onClose}
                >
                  <Home className="w-5 h-5" />
                  <span className="text-sm font-medium">Back to Site</span>
                </Link>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default AdminSidebar;
