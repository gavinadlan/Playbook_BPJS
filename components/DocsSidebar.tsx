"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { API_CATEGORIES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const DocsSidebar = () => {
  const pathname = usePathname();
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null);

  const filteredData = () => {
    if (!searchTerm) return API_CATEGORIES;

    return API_CATEGORIES.map((category) => ({
      ...category,
      endpoints: category.endpoints.filter(
        (endpoint) =>
          endpoint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          endpoint.description?.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    })).filter(
      (category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.endpoints.length > 0
    );
  };

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  return (
    <div className="border-b">
      {/* Search Bar */}
      <div className="px-4 pt-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari dokumentasi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-md border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          />
        </div>
      </div>

      <ScrollArea className="w-full pb-2">
        <nav className="flex flex-nowrap px-4 gap-4">
          {filteredData().map((category) => (
            <div key={category.id} className="flex-shrink-0">
              <div className="flex flex-col space-y-2">
                {/* Category Button */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className={cn(
                    "flex items-center px-4 py-2 rounded-md text-sm font-medium",
                    openCategories[category.id]
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  {category.name}
                  <ChevronDown
                    className={cn(
                      "ml-2 h-4 w-4 transition-transform",
                      openCategories[category.id] && "rotate-180"
                    )}
                  />
                </button>

                {/* Endpoints */}
                {openCategories[category.id] && (
                  <div className="flex flex-nowrap gap-2 ml-2">
                    {category.endpoints.map((endpoint) => (
                      <div key={endpoint.id} className="flex-shrink-0">
                        <Link
                          href={`/docs/${category.id}/${endpoint.id}`}
                          onClick={() => setSelectedEndpoint(endpoint.id)}
                          className={cn(
                            "flex items-center px-4 py-2 rounded-md text-sm",
                            pathname === `/docs/${category.id}/${endpoint.id}`
                              ? "bg-blue-50 text-blue-600 font-medium"
                              : "text-gray-700 hover:bg-gray-100"
                          )}
                        >
                          <span
                            className={`inline-block w-12 text-xs text-center font-medium rounded mr-2 px-1.5 py-0.5 ${getMethodStyle(
                              endpoint.method
                            )}`}
                          >
                            {endpoint.method}
                          </span>
                          {endpoint.name}
                        </Link>

                        {/* Sub Content - Example implementation */}
                        {selectedEndpoint === endpoint.id && (
                          <div className="ml-4 mt-2 p-2 bg-gray-50 rounded-md">
                            {/* Add your sub content components here */}
                            <div className="text-xs text-gray-600">
                              Subkonten untuk {endpoint.name}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
};

// Fungsi styling method tetap sama
function getMethodStyle(method: string) {
  switch (method) {
    case "GET":
      return "bg-green-100 text-green-800";
    case "POST":
      return "bg-blue-100 text-blue-800";
    case "PUT":
      return "bg-yellow-100 text-yellow-800";
    case "PATCH":
      return "bg-purple-100 text-purple-800";
    case "DELETE":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default DocsSidebar;
