import Link from "next/link";
import { ChevronRight } from "lucide-react";

const AdminNavItem = ({
  href,
  icon: Icon,
  text,
  currentPath,
}: {
  href: string;
  icon: any;
  text: string;
  currentPath: string;
}) => (
  <Link
    href={href}
    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
      currentPath === href
        ? "bg-white text-[rgb(39,68,124)] shadow-sm"
        : "hover:bg-white/10 text-white"
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="text-sm font-medium">{text}</span>
    {currentPath === href && (
      <ChevronRight className="w-4 h-4 ml-auto text-[rgb(39,68,124)]" />
    )}
  </Link>
);

export default AdminNavItem;
