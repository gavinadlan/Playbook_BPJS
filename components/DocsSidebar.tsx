"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  Menu,
  X,
  Search,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { API_CATEGORIES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const DocsSidebar = () => {
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null);

  useEffect(() => {
    const categoryId = pathname?.split("/")[2];
    setSelectedCategory(categoryId || null);

    const initialOpenState: Record<string, boolean> = {};
    API_CATEGORIES.forEach((category) => {
      const isActive = category.endpoints.some((endpoint) =>
        pathname?.includes(`/docs/${category.id}/${endpoint.id}`)
      );
      initialOpenState[category.id] = isActive;
    });
    setOpenCategories(initialOpenState);
  }, [pathname]);

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
    setSelectedCategory(categoryId);
  };

  const handleBackToAll = () => {
    setSelectedCategory(null);
    setOpenCategories({});
    setSearchTerm("");
  };

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden border-b">
        <div className="overflow-x-auto">
          <nav className="flex flex-nowrap p-4 gap-4 w-max">
            {filteredData().map((category) => (
              <div key={category.id} className="flex-shrink-0">
                <div className="flex flex-col space-y-2">
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

                  {openCategories[category.id] && (
                    <div className="flex flex-nowrap gap-2 ml-2 overflow-x-auto pb-2">
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
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Web Navigation */}
      <aside className="hidden lg:block bg-white border-r w-80 flex-shrink-0 h-screen sticky top-0">
        <ScrollArea className="h-full pt-16 lg:pt-0">
          <nav className="p-4">
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

            {selectedCategory ? (
              <>
                <Button
                  variant="ghost"
                  className="mb-4 text-sm w-full justify-start"
                  onClick={handleBackToAll}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Semua Dokumentasi
                </Button>

                {filteredData()
                  .filter((category) => category.id === selectedCategory)
                  .map((category) => (
                    <div key={category.id}>
                      <h2 className="font-semibold mb-2 text-lg">
                        {category.name}
                      </h2>
                      <ul className="space-y-1">
                        {category.endpoints.map((endpoint) => (
                          <li key={endpoint.id}>
                            <Link
                              href={`/docs/${category.id}/${endpoint.id}`}
                              className={`flex items-center p-2 rounded-md text-sm ${
                                pathname ===
                                `/docs/${category.id}/${endpoint.id}`
                                  ? "bg-blue-50 text-blue-600 font-medium"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              <span className="flex items-center">
                                <span
                                  className={`inline-block w-10 text-xs font-medium rounded mr-2 px-1.5 py-0.5 ${getMethodStyle(
                                    endpoint.method
                                  )}`}
                                >
                                  {endpoint.method}
                                </span>
                                {endpoint.name}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </>
            ) : (
              <ul className="space-y-1">
                {filteredData().map((category) => (
                  <li key={category.id} className="pt-2 first:pt-0">
                    <div
                      className="flex items-center justify-between p-2 rounded-md cursor-pointer text-sm font-medium hover:bg-gray-100"
                      onClick={() => toggleCategory(category.id)}
                    >
                      <span>{category.name}</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>

                    {searchTerm && (
                      <ul className="ml-4 mt-1 space-y-1">
                        {category.endpoints.map((endpoint) => (
                          <li key={endpoint.id}>
                            <Link
                              href={`/docs/${category.id}/${endpoint.id}`}
                              className={`flex items-center p-2 rounded-md text-sm ${
                                pathname ===
                                `/docs/${category.id}/${endpoint.id}`
                                  ? "bg-blue-50 text-blue-600"
                                  : "text-gray-600 hover:bg-gray-50"
                              }`}
                            >
                              <span className="flex items-center">
                                <span
                                  className={`inline-block w-10 text-xs font-medium rounded mr-2 px-1.5 py-0.5 ${getMethodStyle(
                                    endpoint.method
                                  )}`}
                                >
                                  {endpoint.method}
                                </span>
                                {endpoint.name}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}

                {filteredData().length === 0 && (
                  <div className="text-center text-gray-500 text-sm py-4">
                    Tidak ditemukan hasil untuk "{searchTerm}"
                  </div>
                )}
              </ul>
            )}
          </nav>
        </ScrollArea>
      </aside>
    </>
  );
};

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
