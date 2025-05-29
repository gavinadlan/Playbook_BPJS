import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function DocsBreadcrumb() {
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-10">
      <Link href="/" className="hover:text-blue-600 transition-colors">
        Beranda
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span>Dokumentasi</span>
    </div>
  );
}
