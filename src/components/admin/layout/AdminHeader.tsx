import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { User } from "@/context/AuthContext";

const AdminHeader = ({
  isMobile,
  currentPath,
  user,
  toggleSidebar,
}: {
  isMobile: boolean;
  currentPath: string;
  user: User | null;
  toggleSidebar: () => void;
}) => {
  const getPageTitle = () => {
    const parts = currentPath.split("/").filter(Boolean);
    if (parts.length < 2) return "Dashboard";

    const lastPart = parts[parts.length - 1];
    return lastPart
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="bg-white shadow-sm">
      <div className="px-4 md:px-8 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className={isMobile ? "ml-10" : ""}>
            <h1 className="text-xl font-bold text-gray-800">
              {getPageTitle()}
            </h1>
            <nav className="flex items-center text-sm text-gray-500 mt-1">
              <Link
                href="/admin/dashboard"
                className="hover:text-[rgb(39,68,124)] flex items-center"
              >
                <LayoutDashboard className="w-4 h-4 mr-1" />
                Admin
              </Link>
              {currentPath
                .split("/")
                .slice(2)
                .map((path, index, arr) => (
                  <span key={index} className="flex items-center">
                    <span className="mx-2 text-gray-300">/</span>
                    <span
                      className={`${
                        index === arr.length - 1
                          ? "text-[rgb(73,163,90)] font-medium"
                          : ""
                      } capitalize`}
                    >
                      {path.replace("-", " ")}
                    </span>
                  </span>
                ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            {user && ( // Periksa apakah user ada
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500 truncate max-w-[160px]">
                  {user.email}
                </p>
              </div>
            )}
            <div className="w-10 h-10 rounded-full bg-[rgb(73,163,90)] flex items-center justify-center text-white font-medium">
              {user?.name?.charAt(0).toUpperCase() || "A"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
