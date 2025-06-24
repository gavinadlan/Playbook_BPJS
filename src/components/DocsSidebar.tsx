"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, ArrowLeft, Search, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  loadApiCategories,
  loadEndpointsForCategory,
} from "@/lib/api-docs-loader";
import Loader from "@/components/ui/loading";
import { cn } from "@/utils/utils";
import type { ApiCategory, ApiEndpoint } from "@/lib/api-docs-loader";

interface DocsSidebarProps {
  onCloseMobile?: () => void;
}

const DocsSidebar = ({ onCloseMobile }: DocsSidebarProps) => {
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [apiCategories, setApiCategories] = useState<ApiCategory[]>([]);
  const [endpoints, setEndpoints] = useState<Record<string, ApiEndpoint[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileOpenCategories, setMobileOpenCategories] = useState<
    Record<string, boolean>
  >({});

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const categories = await loadApiCategories();
        setApiCategories(categories);
      } catch (err) {
        console.error("Failed to load API documentation data:", err);
        setError("Gagal memuat data dokumentasi");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Set initial selected category from URL
  useEffect(() => {
    if (apiCategories.length > 0 && pathname) {
      const pathParts = pathname.split("/");
      if (pathParts.length > 2) {
        setSelectedCategory(pathParts[2]);
      }
    }
  }, [pathname, apiCategories]);

  const getMethodStyle = (method: string) => {
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
  };

  const handleCategorySelect = async (categoryId: string) => {
    if (!endpoints[categoryId]) {
      try {
        const endpointsData = await loadEndpointsForCategory(categoryId);
        setEndpoints((prev) => ({
          ...prev,
          [categoryId]: endpointsData,
        }));
      } catch (err) {
        console.error(`Failed to load endpoints for ${categoryId}:`, err);
        setError(`Gagal memuat endpoint untuk ${categoryId}`);
      }
    }

    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const toggleMobileCategory = (categoryId: string) => {
    if (!endpoints[categoryId]) {
      loadEndpointsForCategory(categoryId)
        .then((endpointsData) => {
          setEndpoints((prev) => ({
            ...prev,
            [categoryId]: endpointsData,
          }));
        })
        .catch((err) => {
          console.error(`Failed to load endpoints for ${categoryId}:`, err);
          setError(`Gagal memuat endpoint untuk ${categoryId}`);
        });
    }

    setMobileOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden border-b">
        <div className="flex justify-between items-center">
          {onCloseMobile && (
            <button onClick={onCloseMobile}>
              <X className="h-6 w-6" />
            </button>
          )}
        </div>
        <div className="overflow-x-auto">
          <nav className="flex flex-nowrap p-4 gap-4 w-max">
            {apiCategories.map((category) => (
              <div key={category.id} className="flex-shrink-0">
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => toggleMobileCategory(category.id)}
                    className={cn(
                      "flex items-center px-4 py-2 rounded-md text-sm font-medium",
                      mobileOpenCategories[category.id]
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {category.name}
                    <ChevronDown
                      className={cn(
                        "ml-2 h-4 w-4 transition-transform",
                        mobileOpenCategories[category.id] && "rotate-180"
                      )}
                    />
                  </button>

                  {mobileOpenCategories[category.id] && (
                    <div className="flex flex-nowrap gap-2 ml-2 overflow-x-auto pb-2">
                      {endpoints[category.id]?.map((endpoint) => (
                        <div key={endpoint.id} className="flex-shrink-0">
                          <Link
                            href={`/docs/${category.id}/${endpoint.id}`}
                            onClick={() => onCloseMobile?.()}
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

      {/* Desktop Navigation */}
      <div className="hidden lg:block bg-white border-r w-80 flex-shrink-0 h-screen sticky top-0">
        <ScrollArea className="h-full">
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
                  onClick={() => setSelectedCategory(null)}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Semua Dokumentasi
                </Button>

                {apiCategories
                  .filter((category) => category.id === selectedCategory)
                  .map((category) => (
                    <div key={category.id}>
                      <h2 className="font-semibold mb-2 text-lg">
                        {category.name}
                      </h2>
                      <p className="text-sm text-gray-600 mb-4">
                        {category.description}
                      </p>

                      {endpoints[category.id]?.length > 0 ? (
                        <ul className="space-y-1">
                          {endpoints[category.id].map((endpoint) => (
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
                      ) : (
                        <div className="text-center py-4 text-gray-500">
                          Tidak ada endpoint tersedia
                        </div>
                      )}
                    </div>
                  ))}
              </>
            ) : (
              <ul className="space-y-1">
                {apiCategories.map((category) => (
                  <li key={category.id} className="pt-2 first:pt-0">
                    <div
                      className="flex items-center justify-between p-2 rounded-md cursor-pointer text-sm font-medium hover:bg-gray-100"
                      onClick={() => handleCategorySelect(category.id)}
                    >
                      <div>
                        <div className="font-medium">{category.name}</div>
                        <div className="text-xs text-gray-500">
                          {category.description}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 flex-shrink-0" />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </nav>
        </ScrollArea>
      </div>
    </>
  );
};

export default DocsSidebar;
