"use client";

import { API_CATEGORIES } from "@/lib/mock-data";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, Search } from "lucide-react";

export default function AboutPage() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleCategory = (categoryName: string) => {
    setOpenCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  const filteredCategories = API_CATEGORIES.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const methodColors: { [key: string]: string } = {
    GET: "bg-green-100 text-green-800",
    POST: "bg-blue-100 text-blue-800",
    PUT: "bg-yellow-100 text-yellow-800",
    DELETE: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-8">
      {/* Full-width Banner */}
      <div className="w-full relative h-96 bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://png.pngtree.com/thumb_back/fh260/back_our/20190620/ourmid/pngtree-blue-digital-technology-electronic-banner-image_168524.jpg"
            alt="API Documentation Banner"
            className="w-full h-full object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/40" />
        </div>

        <div className="relative max-w-7xl mx-auto h-full px-4 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Dokumentasi API
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. At
              corrupti similique quo iusto maxime nobis praesentium non
              temporibus aspernatur et consequuntur, atque nam eum, vitae
              necessitatibus accusamus quam deleniti delectus?
            </p>
          </motion.div>
        </div>
      </div>

      {/* Full-width Header Section */}
      <div className="w-full border-b dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r text-[#27447C]">
              Kategori API
            </h2>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari Kategori..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 ring-primary/50 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 space-y-8 pb-12">
        <div className="space-y-4">
          {filteredCategories.map((category) => (
            <div key={category.name} className="group">
              <motion.div
                onClick={() => toggleCategory(category.name)}
                className="cursor-pointer flex justify-between items-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
                whileHover={{ scale: 1.005 }}
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {category.endpoints.length} endpoints available
                  </p>
                </div>
                <ChevronDown
                  className={`h-6 w-6 transition-transform ${
                    openCategory === category.name ? "rotate-180" : ""
                  } text-gray-500`}
                />
              </motion.div>

              {openCategory === category.name && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="ml-8 pl-4 border-l-2 border-gray-200 dark:border-gray-700 space-y-4 mt-4"
                >
                  {category.endpoints.map((endpoint) => (
                    <Card
                      key={endpoint.path}
                      className="hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-800"
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                methodColors[endpoint.method] ||
                                "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {endpoint.method}
                            </span>
                            <code className="font-mono text-sm text-blue-600 dark:text-blue-400">
                              {endpoint.path}
                            </code>
                          </div>
                          <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium flex items-center gap-1">
                            View Details{" "}
                            <ChevronDown className="h-4 w-4 rotate-90" />
                          </button>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                          {endpoint.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
