import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({
  categoryName,
  endpointName,
}: {
  categoryName: string;
  endpointName: string;
}) {
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
      <Link href="/" className="hover:text-blue-600 transition-colors">
        Home
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link href="/docs" className="hover:text-blue-600 transition-colors">
        Documentation
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span>{categoryName}</span>
      <ChevronRight className="h-4 w-4" />
      <span>{endpointName}</span>
    </div>
  );
}
