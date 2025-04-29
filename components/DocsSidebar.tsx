"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, ArrowLeft, Menu, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { API_CATEGORIES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const DocsSidebar = () => {
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openCategories, setOpenCategories] =
    useState<Record<string, boolean>>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // mobile toggle

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

  const toggleCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: true,
    }));
    setIsSidebarOpen(false); // auto-close on mobile after selecting
  };

  const handleBackToAll = () => {
    setSelectedCategory(null);
    setOpenCategories({});
  };

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        onClick={() => setIsSidebarOpen(true)}
        variant="ghost"
        size="sm"
        className="lg:hidden fixed top-4 right-4 z-50" // <-- ubah left-4 ke right-4
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Sidebar overlay untuk mobile */}
      <div
        className={cn(
          "fixed inset-0 bg-black/30 z-40 transition-opacity lg:hidden",
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsSidebarOpen(false)}
      />

      <aside
        className={cn(
          "bg-white border-r w-72 lg:w-80 flex-shrink-0 fixed lg:static top-0 left-0 h-full z-50 transition-transform duration-300",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:relative lg:z-0"
        )}
      >
        <ScrollArea className="h-full pt-16 lg:pt-0">
          <nav className="p-4">
            {/* Close Button (mobile only) */}
            <div className="flex justify-end mb-2 lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
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

                {API_CATEGORIES.filter(
                  (category) => category.id === selectedCategory
                ).map((category) => (
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
                              pathname === `/docs/${category.id}/${endpoint.id}`
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
                {API_CATEGORIES.map((category) => (
                  <li key={category.id} className="pt-2 first:pt-0">
                    <div
                      className="flex items-center justify-between p-2 rounded-md cursor-pointer text-sm font-medium hover:bg-gray-100"
                      onClick={() => toggleCategory(category.id)}
                    >
                      <span>{category.name}</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </li>
                ))}
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
